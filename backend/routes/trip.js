import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const buildFallbackItinerary = ({
  destination,
  budget,
  duration,
  interests,
  travelers,
  pace,
}) => {
  const durationDays = Math.max(1, toNumber(duration, 1));
  const totalBudget = Math.max(1000, toNumber(budget, 1000));

  const stay = Math.round(totalBudget * 0.4);
  const food = Math.round(totalBudget * 0.2);
  const localTransport = Math.round(totalBudget * 0.15);
  const activities = Math.round(totalBudget * 0.2);
  const buffer = Math.max(0, totalBudget - (stay + food + localTransport + activities));
  const perDayEstimate = Math.max(500, Math.floor((stay + food + localTransport + activities) / durationDays));

  const days = Array.from({ length: durationDays }, (_, idx) => {
    const day = idx + 1;
    return {
      day,
      title: `Explore ${destination} - Day ${day}`,
      estimatedCost: perDayEstimate,
      activities: [
        `Start early with local sightseeing in ${destination}`,
        `Visit one major attraction and one local neighborhood`,
        `Evening walk through market/heritage zone`,
      ],
      foodPlan: [
        "Breakfast at a local cafe",
        "Lunch at a budget-friendly regional restaurant",
        "Dinner at a well-reviewed local spot",
      ],
      staySuggestion: "Choose clean budget hotels/homestays near city center",
      transportNote: "Prefer public transport/cabs with daily cap to control cost",
    };
  });

  return {
    destination,
    budget: totalBudget,
    durationDays,
    overview: `Budget-first ${durationDays}-day plan for ${destination}. Designed for ${travelers || "travelers"} with ${pace || "balanced"} pace and interests in ${interests || "general sightseeing"}.`,
    totalEstimatedCost: stay + food + localTransport + activities,
    budgetBreakdown: [
      { category: "Stay", amount: stay },
      { category: "Food", amount: food },
      { category: "Local Transport", amount: localTransport },
      { category: "Activities", amount: activities },
      { category: "Buffer", amount: buffer },
    ],
    tips: [
      "Pre-book stay and intercity tickets for better rates",
      "Keep 10-15% emergency buffer",
      "Use local transport pass where available",
      "Eat at popular local places during non-peak time",
    ],
    days,
  };
};

const buildPrompt = ({ destination, budget, duration, interests, travelers, pace }) => {
  return `
You are an expert India travel planner.
Create a practical trip plan based on user constraints.

Rules:
- Respect the budget strictly in INR.
- Keep plan realistic for ${duration} days in ${destination}.
- Give affordable local options first.
- Avoid vague suggestions. Include concrete day structure and estimated costs.
- Ensure total estimated cost is less than or equal to budget.

User Details:
- Destination: ${destination}
- Budget (INR): ${budget}
- Duration (days): ${duration}
- Travelers: ${travelers || "not specified"}
- Interests: ${interests || "mixed sightseeing"}
- Pace: ${pace || "balanced"}

Return ONLY valid JSON in this exact shape:
{
  "destination": "string",
  "budget": number,
  "durationDays": number,
  "overview": "string",
  "totalEstimatedCost": number,
  "budgetBreakdown": [
    { "category": "Stay", "amount": number },
    { "category": "Food", "amount": number },
    { "category": "Local Transport", "amount": number },
    { "category": "Activities", "amount": number },
    { "category": "Buffer", "amount": number }
  ],
  "tips": ["string"],
  "days": [
    {
      "day": number,
      "title": "string",
      "estimatedCost": number,
      "activities": ["string"],
      "foodPlan": ["string"],
      "staySuggestion": "string",
      "transportNote": "string"
    }
  ]
}
`;
};

router.post("/plan", protect, async (req, res) => {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ message: "OPENAI_API_KEY is missing in backend .env" });
    }

    const { destination, budget, duration, interests, travelers, pace } = req.body;
    const normalizedInput = {
      destination: destination?.trim() || "",
      budget: toNumber(budget, 0),
      duration: toNumber(duration, 0),
      interests: interests?.trim(),
      travelers: travelers?.trim(),
      pace: pace?.trim(),
    };

    if (!normalizedInput.destination || !normalizedInput.budget || !normalizedInput.duration) {
      return res
        .status(400)
        .json({ message: "destination, budget, and duration are required" });
    }

    const payload = {
      model: OPENAI_MODEL,
      input: buildPrompt({
        destination: normalizedInput.destination,
        budget: normalizedInput.budget,
        duration: normalizedInput.duration,
        interests: normalizedInput.interests,
        travelers: normalizedInput.travelers,
        pace: normalizedInput.pace,
      }),
      max_output_tokens: 1400,
    };

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      let parsedError;
      try {
        parsedError = JSON.parse(errorText);
      } catch {
        parsedError = null;
      }

      const errorCode = parsedError?.error?.code || "";
      const shouldFallback =
        errorCode === "insufficient_quota" ||
        errorCode === "invalid_api_key" ||
        aiResponse.status >= 500;

      if (shouldFallback) {
        const itinerary = buildFallbackItinerary(normalizedInput);
        return res.json({
          itinerary,
          warning:
            "AI service is temporarily unavailable for this account. Showing a smart budget fallback plan.",
          source: "fallback",
        });
      }

      return res.status(502).json({ message: "OpenAI request failed", error: errorText });
    }

    const result = await aiResponse.json();
    const outputText = result.output_text?.trim();

    if (!outputText) {
      const itinerary = buildFallbackItinerary(normalizedInput);
      return res.json({
        itinerary,
        warning: "AI returned an empty response. Showing a smart fallback plan.",
        source: "fallback",
      });
    }

    let itinerary;
    try {
      itinerary = JSON.parse(outputText);
    } catch {
      const fallbackItinerary = buildFallbackItinerary(normalizedInput);
      return res.json({
        itinerary: fallbackItinerary,
        warning: "AI response format was invalid. Showing a smart fallback plan.",
        source: "fallback",
      });
    }

    return res.json({ itinerary, source: "openai" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
