const AUTH_STORAGE_KEY = "auth";
const GUIDE_PROFILE_KEY = "guide_profile";
const GUIDE_PENDING_KEY = "guide_pending_profiles";

export const saveAuth = (token, user) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      user,
    })
  );
};

export const getAuth = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
  const auth = getAuth();
  return Boolean(auth?.token && auth?.user);
};

export const saveGuideProfile = (profile) => {
  const profileWithStatus = {
    ...profile,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(GUIDE_PROFILE_KEY, JSON.stringify(profileWithStatus));
  
  const pendingProfiles = getPendingGuideProfiles();
  pendingProfiles.push(profileWithStatus);
  localStorage.setItem(GUIDE_PENDING_KEY, JSON.stringify(pendingProfiles));
};

export const getGuideProfile = () => {
  const raw = localStorage.getItem(GUIDE_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearGuideProfile = () => {
  localStorage.removeItem(GUIDE_PROFILE_KEY);
};

export const getPendingGuideProfiles = () => {
  const raw = localStorage.getItem(GUIDE_PENDING_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const approveGuideProfile = (profileEmail) => {
  const approvedProfiles = getApprovedGuideProfiles();
  const pending = getPendingGuideProfiles();
  const profileToApprove = pending.find(p => p.email === profileEmail);
  
  if (profileToApprove) {
    const approved = {
      ...profileToApprove,
      status: "approved",
      approvedAt: new Date().toISOString(),
    };
    approvedProfiles.push(approved);
    localStorage.setItem("guide_approved_profiles", JSON.stringify(approvedProfiles));
    
    const updatedPending = pending.filter(p => p.email !== profileEmail);
    localStorage.setItem(GUIDE_PENDING_KEY, JSON.stringify(updatedPending));
  }
};

export const rejectGuideProfile = (profileEmail) => {
  const pending = getPendingGuideProfiles();
  const updatedPending = pending.filter(p => p.email !== profileEmail);
  localStorage.setItem(GUIDE_PENDING_KEY, JSON.stringify(updatedPending));
};

export const getApprovedGuideProfiles = () => {
  const raw = localStorage.getItem("guide_approved_profiles");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};
