import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Explore.css";

const stateLanguageMap = {
  INRJ: "hi-IN", INGJ: "hi-IN", INUP: "hi-IN", INMP: "hi-IN", INCT: "hi-IN",
  INHR: "hi-IN", INDL: "hi-IN", INCH: "hi-IN", INPB: "pa-IN", INJK: "ur-IN",
  INLA: "hi-IN", INUT: "hi-IN", INJH: "hi-IN", INOR: "or-IN",
  INKL: "ml-IN", INTN: "ta-IN", INTG: "te-IN", INKA: "kn-IN", INMH: "mr-IN",
  INAS: "bn-IN", INWB: "bn-IN", INTR: "bn-IN", INML: "ml-IN", INMN: "en-IN",
  INAR: "as-IN", INNL: "en-IN", INMZ: "en-IN", INGA: "en-IN", INLD: "ml-IN",
  INAN: "en-IN", INDH: "en-IN", INPY: "en-IN", INSK: "en-IN", INAP: "te-IN"
};

const speakerVoiceMap = {
  "hi-IN": "shubh", "pa-IN": "shubh", "ur-IN": "shubh", "or-IN": "shubh",
  "ml-IN": "shubh", "ta-IN": "shubh", "te-IN": "shubh", "kn-IN": "shubh",
  "mr-IN": "shubh", "bn-IN": "shubh", "as-IN": "shubh", "en-IN": "shubh"
};

const stateNames = {
  INAN: "Andaman and Nicobar", INAP: "Andhra Pradesh", INAR: "Arunachal Pradesh",
  INAS: "Assam", INBR: "Bihar", INCH: "Chandigarh", INCT: "Chhattisgarh",
  INDH: "Dadra and Nagar Haveli", INDL: "Delhi", INGA: "Goa", INGJ: "Gujarat",
  INHP: "Himachal Pradesh", INHR: "Haryana", INJH: "Jharkhand", INJK: "Jammu & Kashmir",
  INKA: "Karnataka", INKL: "Kerala", INLA: "Ladakh", INLD: "Lakshadweep",
  INMH: "Maharashtra", INML: "Meghalaya", INMN: "Manipur", INMP: "Madhya Pradesh",
  INMZ: "Mizoram", INNL: "Nagaland", INOR: "Odisha", INPB: "Punjab",
  INPY: "Puducherry", INRJ: "Rajasthan", INSK: "Sikkim", INTG: "Telangana",
  INTN: "Tamil Nadu", INTR: "Tripura", INUP: "Uttar Pradesh", INUT: "Uttarakhand",
  INWB: "West Bengal"
};

const monumentData = {
  INRJ: [
    { title: "Hawa Mahal", content: "Built in 1799 by Maharaja Sawai Pratap Singh, the Hawa Mahal is a stunning palace in Jaipur known as the 'Palace of Winds'. It features 953 intricately carved windows (jharokhas) that allowed royal ladies to observe street celebrations without being seen. The pink sandstone structure rises five stories tall with a pyramidal façade and honeycomb windows designed for ventilation and cool air circulation." },
    { title: "Amer Fort", content: "Amer Fort, built in 1592 by Raja Man Singh I, is a magnificent fort-palace in Jaipur. Known for its artistic Hindu architecture, it features stunning mirror work (Sheesh Mahal), intricate carvings, and breathtaking views of the city. The fort has four sections with gates and courtyards, and visitors can ride elephants or jeeps to the entrance." },
    { title: "City Palace", content: "The City Palace in Jaipur was built by Maharaja Sawai Jai Singh II between 1729 and 1732. It complex includes the Chandra Mahal, Mubarak Mahal, and various courtyards. The palace showcases a blend of Rajasthani and Mughal architecture, with beautiful gardens, fountains, and the famous 'Peacock Gate' adorned with intricate gold work." },
    { title: "Jal Mahal", content: "Jal Mahal (Water Palace) is a stunning palace in the middle of the Man Sagar Lake in Jaipur. Built in 1734 by Maharaja Jai Singh II, it appears to float on the water with its five stories, of which four are underwater. The palace features beautiful chhatris and is surrounded by hills, making it a perfect spot for photography." },
    { title: "Jaisalmer Fort", content: "Jaisalmer Fort, also known as Sonar Quila, is one of the few 'living forts' in the world where around 3,000 people still reside. Built in 1156 by Rawal Jaisal, it's made of yellow sandstone and rises from the desert like a golden mirage. The fort houses temples, palaces, and havelis with intricate carvings." }
  ],
  INUP: [
    { title: "Taj Mahal", content: "The Taj Mahal, built between 1631-1653 by Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, is one of the Seven Wonders of the World. This white marble masterpiece combines Islamic, Persian, Ottoman Turkish, and Indian architectural styles. Over 20,000 artisans worked on its construction, and the Taj changes color throughout the day - pink at dawn, white during day, and golden under moonlight." },
    { title: "Agra Fort", content: "Agra Fort, a UNESCO World Heritage Site, was built by Emperor Akbar in 1565 and later expanded by Shah Jahan. This massive red sandstone fort features the Jahangir's Palace, Sheesh Mahal (Mirror Palace), and the Diwan-i-Khalset. It was the main residence of the Mughals until the capital moved to Delhi." },
    { title: "Varanasi Ghats", content: "The ghats of Varanasi are sacred riverfront steps along the Ganges, with over 100 ghats. The most famous are Dashashwamedh Ghat, where the Ganga Aarti ceremony takes place, and Manikarnika Ghat, one of the most sacred cremation ghats. These ghats have been integral to Hindu rituals for thousands of years." },
    { title: "Ayodhya Ram Mandir", content: "The newly constructed Ram Mandir in Ayodhya is a magnificent Hindu temple dedicated to Lord Rama. Built at a cost of around ₹1,800 crore, the temple spans 2.7 acres and features seven shrines. The foundation was laid in August 2020, and the temple was consecrated in January 2024, marking the fulfillment of a centuries-old dream." },
    { title: "Vijayanagar Temple", content: "The Vitthala Temple in Hampi (Vijayanagara) is the largest and most celebrated monument in Hampi. Built in the 15th century during the reign of King Deva Raya II, it is dedicated to Lord Vitthala (a form of Vishnu). The temple complex features the famous stone chariot, musical pillars, and magnificent gateways." }
  ],
  INMH: [
    { title: "Gateway of India", content: "The Gateway of India was built in 1924 to commemorate the landing of King George V and Queen Mary in Mumbai. This iconic basalt arch stands 26 meters high and overlooks the Arabian Sea. It was designed in Indo-Saracenic style and was the first structure to be built in the city." },
    { title: "Ajanta Caves", content: "The Ajanta Caves are ancient Buddhist rock-cut cave monuments dating from the 2nd century BCE to about 480 CE. Located in Aurangabad district, these 30 caves contain some of the best preserved ancient Indian wall paintings and sculptures. They depict the life of Buddha and various Jataka tales." },
    { title: "Ellora Caves", content: "The Ellora Caves are a rock-cut cave complex representing Buddhist, Hindu, and Jain traditions, built between 600-1000 AD. The 34 caves include the massive Kailasha Temple, carved from a single rock, which is the largest single monolithic structure in the world. Ellora is a UNESCO World Heritage Site." },
    { title: "Siddhivinayak Temple", content: "The Siddhivinayak Temple in Mumbai is dedicated to Lord Ganesha. Built in 1801, this temple is one of the most visited religious sites in Mumbai. The inner roof is gold-plated, and the sanctum houses a black stone idol of Ganesha with four arms holding a modak (sweet)." },
    { title: "Shaniwar Wada", content: "Shaniwar Wada in Pune is a historical fortification built in 1732 by Bajirao I. It was the seat of the Peshwas of the Maratha Empire. The fort features a palace with stunning architecture, fountains, and gardens. A famous legend surrounds it - the cries of the murdered prince can still be heard on full moon nights." }
  ],
  INKL: [
    { title: "Padmanabhaswamy Temple", content: "The Sree Padmanabhaswamy Temple in Thiruvananthapuram is one of the richest temples in the world. Built in the 16th century by King Marthanda Varma, it features a seven-story gopuram (tower) and houses massive treasures discovered in 2011 worth over ₹1 lakh crore. The temple is dedicated to Lord Vishnu in his cosmic form of Anantha Padmanabha." },
    { title: "St. Francis CSI Church", content: "Built in 1503 by the Portuguese, St. Francis CSI Church in Kochi is one of the oldest churches in India. Vasco da Gama, the Portuguese explorer, was buried here in 1524 before his remains were taken to Portugal. The church features beautiful Gothic architecture and is a protected monument." },
    { title: "Bekal Fort", content: "Bekal Fort in Kerala is the largest fort in Kerala, built in the 17th century by Tipu Sultan. This historic fort stands on a headland with the Arabian Sea on three sides. The fort's keyhole-shaped beach is a popular tourist attraction, and it offers stunning sunset views." },
    { title: "Kochi Fort", content: "Kochi Fort, built in 1503 by the Portuguese, is one of the oldest European settlements in India. The fort features St. Francis Church, the Santa Cruz Basilica, and the iconic Chinese fishing nets. The area is now a heritage zone with colonial buildings, spice markets, and modern cafes." },
    { title: "Hill Palace Museum", content: "The Hill Palace in Tripunithura was the royal residence of the Cochin royal family. Built in 1865, it is the largest archaeological museum in Kerala with 49 exhibits including royal belongings, paintings, sculptures, and ancient weapons. The palace complex has 32 buildings in traditional Kerala style." }
  ],
  INTN: [
    { title: "Meenakshi Temple", content: "The Meenakshi Temple in Madurai is a historic Hindu temple dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar (Shiva). Built in the 6th century BCE and expanded over centuries, it features 14 gopurams (gateway towers), the tallest being 51.9 meters. The temple complex has 14 towers with thousands of colorful sculptures." },
    { title: "Brihadeeswarar Temple", content: "The Brihadeeswarar Temple in Thanjavur, built by Raja Raja I Chola in 1010 CE, is a UNESCO World Heritage Site. This magnificent temple is dedicated to Lord Shiva and features the tallest vimana (temple tower) in South India at 66 meters. The inner walls have beautiful frescoes and inscriptions." },
    { title: "Mahabalipuram", content: "Mahabalipuram (Mamallapuram) is a UNESCO World Heritage Site known for its rock-cut caves, stone carvings, and Shore Temple. Built during the Pallava dynasty in the 7th-8th centuries, it features the famous 'Arjuna's Penance' - the world's largest open-air rock relief, and the five Rathas (chariots)." },
    { title: "Vivekananda Rock Memorial", content: "Located on a small island in Kanyakumari, the Vivekananda Rock Memorial was built in 1970 in honor of Swami Vivekananda. The memorial features a 133-foot tall statue of Vivekananda and the Shripada Parvati, where it is believed Goddess Parvati meditated. It offers spectacular views of the confluence of three seas." }
  ],
  INKA: [
    { title: "Mysore Palace", content: "Mysore Palace, the official residence of the Wadiyar dynasty, was built in 1912 in Indo-Saracenic style. This magnificent palace features stunning architecture, beautiful paintings, and the world's largest collection of silver. The palace is illuminated with 97,000 bulbs during the Dasara festival." },
    { title: "Hampi", content: "Hampi, a UNESCO World Heritage Site, was the capital of the Vijayanagara Empire in the 14th-16th centuries. The ruins include the Virupaksha Temple, Vittala Temple with its famous stone chariot, the Royal Enclosure with step wells, and the stunning Lotus Mahal. It's one of the largest open-air museums in the world." },
    { title: "Gol Gumbaz", content: "The Gol Gumbaz in Bijapur is the mausoleum of Mohammed Adil Shah, built in 1656. It features the world's largest dome (44 meters diameter) and remarkable acoustic properties - a whisper at one end can be heard clearly at the other. The tomb has musical galleries and intricate architecture." }
  ],
  INGJ: [
    { title: "Rani ki Vav", content: "Rani ki Vav in Patan is a UNESCO World Heritage Stepwell built in the 11th century by Queen Udayamati and King Bhimdev. This seven-tiered stepwell is 64 meters long, 27 meters wide, and 23 meters deep, featuring over 500 principal sculptures and more than a thousand minor ones depicting Hindu deities." },
    { title: "Sun Temple", content: "The Sun Temple in Modhera was built in 1026 by King Bhimdev I. This UNESCO World Heritage Site is dedicated to the Sun God and features stunning architecture with exquisitely carved walls. The temple is arranged so that at equinoxes, the first rays of the sun illuminate the idol in the sanctum." },
    { title: "Akshardham", content: "Akshardham in Gandhinagar is one of the largest Hindu temples in the world, built in 2006. The complex features a 7-foot tall statue of Lord Swaminarayan, carved from 2,000 tons of Italian marble. The temple is known for its intricate carvings depicting Indian culture and values." }
  ],
  default: [
    { title: "Ancient Temples", content: "India is home to thousands of ancient temples showcasing exquisite architecture, intricate carvings, and spiritual significance. From the cave temples of Ellora to the vimanas of South India, each temple tells a story of devotion, art, and engineering excellence. These sacred spaces have been centers of worship, learning, and community for centuries." },
    { title: "Historic Forts", content: "India's historic forts are monuments to the country's rich military and royal history. From the massive walls of Agra Fort to the desert fortress of Jaisalmer, these fortifications witnessed countless battles, royal intrigues, and architectural marvels. Many forts now serve as museums and tourist attractions, offering insights into India's past." },
    { title: "Palaces & Museums", content: "India's royal palaces showcase the wealth and artistic sensibilities of different dynasties. The City Palaces of Rajasthan, the Victoria Memorial in Kolkata, and the Falaknuma Palace in Hyderabad represent architectural excellence. Many palaces have been converted into heritage hotels, allowing visitors to experience royal living." }
  ]
};

const folkloreData = {
  INRJ: [
    { title: "The Legend of Panna Dai", content: "Panna Dai was a brave Rajput woman who saved the life of infant Prince Udai Singh II, the founder of Udaipur. When the Mughals attacked, Panna Dai disguised the prince as her own child and fled. When discovered, she chose to sacrifice her own son to save the prince, allowing the Mewar dynasty to continue. Her sacrifice is commemorated in folk songs and tales throughout Rajasthan." },
    { title: "The Mystery of Bhangarh", content: "The abandoned city of Bhangarh is famous for being one of India's most haunted places. Legend says that a sorcerer (singh) fell in love with the princess of Bhangarh and tried to use black magic to win her. The princess cursed the city, leading to its abandonment. Locals say that no one can stay in Bhangarh after sunset, and those who have tried report strange occurrences." },
    { title: "The Golden Treasure of Amer Fort", content: "Local folklore speaks of a hidden treasure beneath Amer Fort that has never been fully discovered. It is said that the royal family concealed their wealth in secret passages during times of invasion. Even today, treasure hunters and locals speak of mysterious sounds and glimpses of gold in the fort's tunnels." },
    { title: "The Flying Fairies of Nathdwara", content: "The town of Nathdwara, home to Lord Shrinathji, has a unique folklore about flying lights seen near the temple at night. Devotees believe these are the souls of departed saints or divine beings guarding the Lord. The temple, built in the 17th century, is a major pilgrimage site for Vaishnavites." },
    { title: "The Curse of Keoladeo", content: "The Keoladeo National Park (Bharatpur Bird Sanctuary) has a folklore about a cursed sage. Legend says that the sage was denied shelter by the villagers, and he cursed the village to become a barren land. Years later, when the area transformed into a lush bird sanctuary, locals saw it as a blessing from nature." }
  ],
  INUP: [
    { title: "The Ghost of Bateshwar", content: "The Bateshwar temples in Uttar Pradesh are said to be guarded by spirits. According to local legend, the temples were built by a wealthy merchant who was betrayed by his wife. After his death, his spirit is believed to roam the temple complex, protecting the treasures hidden within. Archaeological surveys have found over 200 temples." },
    { title: "The Mystery of Sravasti", content: "Sravasti, where Lord Buddha spent most of his sermons, has numerous legends about miraculous events. The famous Jetavana Garden is said to be where Buddha performed miracles to convert skeptics. Local monks still recount stories of Buddha's 18 miraculous manifestations." },
    { title: "The Legend of Braj", content: "The Braj region around Mathura and Vrindavan is steeped in legends of Lord Krishna's childhood. Every village has stories of Krishna's divine plays - his stealing butter, his dance with the gopis, and his cosmic form (Vishvarupa). These tales are enacted in the famous Raslila performances." },
    { title: "The Saint of Varanasi", content: "Varanasi is said to be lord Shiva's favorite city. Legend states that those who die in Varanasi achieve moksha (liberation). The city is also home to numerous saints and spiritual leaders who have attained enlightenment within its sacred ghats." },
    { title: "The Treasure of Ayodhya", content: "Ayodhya is believed to have divine treasures hidden since ancient times. The Ramayana describes the city's grandeur, and locals believe sacred artifacts from Lord Rama's time remain hidden beneath the soil. The recent discovery of a massive stone structure during temple preparations has renewed interest in these legends." }
  ],
  INKL: [
    { title: "The Legend of Mahabali", content: "Once a wise and benevolent demon king, Mahabali ruled Kerala with justice and prosperity. He performed severe penance and conquered the heavens. Vishnu, in his Vamana avatar, tricked him and pushed him to the underworld, but granted him one wish - to visit his people once a year. This is celebrated as Onam, when Kerala comes alive with flowers, feasts, and joy to welcome their beloved king." },
    { title: "The Mystery of Padmanabha's Treasure", content: "The Padmanabhaswamy Temple made headlines in 2011 when massive treasure was discovered in its vaults - worth over ₹1 lakh crore. But legends speak of a curse: whoever opens all the chambers will face destruction. Ancient prophecies warn that opening the hidden chamber (Kallara) could bring calamity to the region." },
    { title: "The Snake Boat Race Legend", content: "The legendary snake boat race of Nehru Trophy has a folklore origin. Once, two rival kingdoms in Kerala had a fierce battle on the waters. To resolve it, they agreed to a boat race. The winning boat became the prototype for the famous champakulam boat race, with each boat carrying the golden image of the deity." },
    { title: "The Weeping Stone of Kottayam", content: "A unique stone in Kottayam is said to cry on certain auspicious days. Locals believe it marks the spot where a queen performed last rites for her husband. The stone is said to weep tears of grief on their wedding anniversary, and devotees come to witness this phenomenon." }
  ],
  INMH: [
    { title: "The Phantom Lights of Mahabaleshwar", content: "The hill station of Mahabaleshwar is famous for phantom lights - mysterious luminous spheres appearing at night. Legend says these are the spirits of travelers who lost their way in the forest. Scientists attribute them to bio-luminescence, but locals insist they are supernatural." },
    { title: "The Crying Prince of Shaniwar Wada", content: "Shaniwar Wada in Pune has a haunting legend. The palace was built in 1732, and in 1797, a brutal murder took place where the young prince was attacked by his uncle. It is said that on full moon nights, the cries of 'Kaka, mali aahe' (Uncle, come here) can still be heard." },
    { title: "The Treasure of Sindhudurg", content: "Sindhudurg Fort, built by Shivaji Maharaj, is said to have hidden treasure that was never found. Legend says that a curse protects the treasure - whoever finds it will face destruction. To this day, treasure hunters are discouraged by locals who fear awakening ancient curses." },
    { title: "The Mummy of Theur", content: "The town of Theur has a temple where a 'living mummy' is worshipped. Santhalinga Swamigal, a saint who attained samadhi in 1880, is believed to be in a state of eternal meditation. His body remains preserved without any special treatment - a phenomenon that has baffled scientists and devotees alike." }
  ],
  INAS: [
    { title: "The Ghost of Kaziranga", content: "Kaziranga National Park has legends of a ghost tiger that protects the park. Poachers who entered with evil intentions are said to have vanished. Local folklore speaks of the spirit of a forest goddess who takes the form of a white tiger to guard her territory." },
    { title: "The Lost Kingdom of Pragjyotishpur", content: "Ancient Assam was known as Pragjyotishpur, the 'City of Eastern Light'. Legends describe a kingdom with flying vimanas (aircraft) and advanced technology. The city was supposedly founded by King Narakasura, and references to it appear in ancient Hindu epics." },
    { title: "The Mystery of Dimapur", content: "The ancient ruins of Dimapur (literally 'city of the people') have numerous legends. The Ahom kings built this city, and folklore says the massive stone monoliths scattered around are markers for treasure vaults. Locals avoid certain areas at night, believing spirits guard ancient secrets." }
  ],
  INJK: [
    { title: "The Floating Stones of Vaishno Devi", content: "At Vaishno Devi Temple, there's a legend about floating stones. Devotees believe that the rocks used to build the cave temple floated magically to the location. Scientifically, this refers to pumice stones from volcanic eruptions, but pilgrims see it as divine intervention." },
    { title: "The Amarnath Yatra Mystery", content: "The Amarnath Cave has an ice stalagmite that naturally forms into the shape of a Shiva lingam. Legend says that Shiva revealed the secret of immortality to Parvati here. Every year, the lingam grows and shrinks with the moon, and those who witness it are said to be blessed." },
    { title: "The Haunted Lakes of Kashmir", content: "Kashmir has numerous lakes with mystical legends. Lake Tosamaidan is said to be the site of an ancient battle between demons and gods. Local shepherds still avoid certain shores after sunset, believing supernatural beings emerge from the waters." }
  ],
  default: [
    { title: "The Ghost of the Banyan Tree", content: "Across India, banyan trees are considered sacred and are often home to spirits. Folklore tells of ghosts or spirits that protect the tree and the surrounding area. People tie sacred threads around banyan trees and offer prayers, believing that benevolent spirits reside within." },
    { title: "The Legend of the Flying Witch", content: "Many villages in India have legends of witches or chudails who fly at night. These folklore tales were often used to explain strange occurrences and keep children indoors after dark. Some villages still have 'witch trees' where these spirits are believed to gather." },
    { title: "The Treasure Guardians", content: "Indian villages often have legends of hidden treasure guarded by supernatural beings. These stories usually involve a snake (Naga) or a divine creature protecting ancient caches. Treasure hunters in folklore are often warned not to disturb these guardians, or face dire consequences." }
  ]
};

const foodData = {
  INRJ: [
    { title: "Daal Baati Churma", content: "The quintessential Rajasthani dish consisting of lentil curry (daal), baked wheat balls (baati), and sweetened broken wheat (churma). A must-try for its rich flavors.", restaurant: "Chokhi Dhani (Jaipur)", restaurantLink: "https://www.zomato.com/jaipur/chokhi-dhani-multuisine" },
    { title: "Laal Maas", content: "A fiery red meat curry made with Mathania red chilies, garlic, and ghee. This dish is a favorite among non-vegetarians in Rajasthan.", restaurant: "Mohan Lal Mehmood Kachori (Jaipur)", restaurantLink: "https://www.zomato.com/jaipur/mohan-lal-mahendra-kachori" },
    { title: "Gatte ki Sabzi", content: "Curry made with gram flour dumplings (gatte) in a spicy yogurt-based gravy. A popular vegetarian dish from Rajasthan.", restaurant: "Rawat Misthan Bhandar (Jaipur)", restaurantLink: "https://www.zomato.com/jaipur/rawat-mishthan-bhandar" },
    { title: "Pyaz Kachori", content: "Crispy deep-fried pastries filled with spiced onion mixture. A popular snack from Jodhpur, best enjoyed with mint and tamarind chutney.", restaurant: "Mohan Lal Kachori (Jodhpur)", restaurantLink: "https://www.zomato.com/jodhpur/mohan-lal-mahendra-kachori" }
  ],
  INUP: [
    { title: "Awadhi Biryani", content: "Fragrant basmati rice layered with spiced meat, saffron, and caramelized onions. Originated in Lucknow's royal kitchens with Nizami influence.", restaurant: "Tunday Kababi (Lucknow)", restaurantLink: "https://www.zomato.com/lucknow/tunday-kababi" },
    { title: "Chaat", content: "Crispy snacks topped with yogurt, chutneys, and spices. Includes aloo tikki, papdi chaat, and fruit chaat - a street food lover's paradise.", restaurant: "Dasaprakash (Varanasi)", restaurantLink: "https://www.zomato.com/varanasi/dasaprakash" },
    { title: "Tundey Kebab", content: "Minced meat kebabs made with over 160 spices. The secret recipe is said to have been passed down for generations in Lucknow.", restaurant: "Tunday Kababi (Lucknow)", restaurantLink: "https://www.zomato.com/lucknow/tunday-kababi" },
    { title: "Petha", content: "Famous translucent sweet made from ash gourd (petha). Available in various flavors including saffron, cardamom, and chocolate.", restaurant: "Petha Wala (Agra)", restaurantLink: "https://www.zomato.com/agra/harihar-petha" }
  ],
  INKL: [
    { title: "Sadya", content: "A traditional Kerala feast served on a banana leaf with over 26 dishes including rice, sambar, avial, pachadi, and payasam. A culinary experience of a lifetime.", restaurant: "Hotel Kerala (Kochi)", restaurantLink: "https://www.zomato.com/kochi/hotel-kerala-cafe" },
    { title: "Malabar Biryani", content: "Aromatic biryani from Kerala's Malabar coast with chicken, spices, and fried onions. Known for its unique cooking style called 'Dum'.", restaurant: "Halal Kitchen (Kozhikode)", restaurantLink: "https://www.zomato.com/kozhikode/halal-kitchen" },
    { title: "Puttu and Kadala Curry", content: "Steamed rice cake (puttu) served with spiced black chickpea curry (kadala). A popular breakfast in Kerala.", restaurant: "Saravana Bhavan (Thiruvananthapuram)", restaurantLink: "https://www.zomato.com/thiruvananthapuram/saravana-bhavan" },
    { title: "Appam with Stew", content: "Lace-edged rice pancakes (appam) served with mild coconut stew with vegetables or meat. A signature Kerala dish.", restaurant: "Kashi Art Cafe (Kochi)", restaurantLink: "https://www.zomato.com/kochi/kashi-art-cafe" }
  ],
  INMH: [
    { title: "Vada Pav", content: "The iconic Mumbai street food - spiced potato fritter in a bread bun with chutneys. Often called the 'Indian burger'.", restaurant: "Ashok Vada Pav (Mumbai)", restaurantLink: "https://www.zomato.com/mumbai/ashok-vada-pav" },
    { title: "Pav Bhaji", content: "Spiced mashed vegetable curry served with buttered bread rolls. A Mumbai street food classic.", restaurant: "Sardar Pav Bhaji (Mumbai)", restaurantLink: "https://www.zomato.com/mumbai/sardar-pav-bhaji" },
    { title: "Misal Pav", content: "Spicy sprout curry topped with farsan (crunchy mix), onions, and lemon, served with bread. A breakfast staple from Maharashtra.", restaurant: "Bedekar Misal (Mumbai)", restaurantLink: "https://www.zomato.com/mumbai/bedekar-misal" },
    { title: "Puran Poli", content: "Sweet flatbread stuffed with jaggery and lentil filling. A traditional Maharashtrian festive treat.", restaurant: "Konkan Kitchen (Mumbai)", restaurantLink: "https://www.zomato.com/mumbai/konkan-kitchen" }
  ],
  INTN: [
    { title: "Chettinad Biryani", content: "Aromatic biryani from the Chettinad region with unique spices and fiery curries. Known for its distinct flavor profile.", restaurant: "Anjappar (Chennai)", restaurantLink: "https://www.zomato.com/chennai/anjappar-chettinad" },
    { title: "Dosa", content: "Crispy fermented rice and lentil crepe served with sambar and variety of chutneys. South India's most famous dish.", restaurant: "Sathyabama Grand (Chennai)", restaurantLink: "https://www.zomato.com/chennai/sathyabama-grand" },
    { title: "Idli Sambar", content: "Soft steamed rice cakes (idli) served with lentil stew (sambar) and coconut chutney. A healthy South Indian breakfast.", restaurant: "Madhav's Tiffin (Chennai)", restaurantLink: "https://www.zomato.com/chennai/madhava-idli-shop" },
    { title: "Kothu Parotta", content: "Minced parotta (layered flatbread) stir-fried with eggs, vegetables, and spices. A popular dinner dish from Tamil Nadu.", restaurant: "Parotta Stall (Madurai)", restaurantLink: "https://www.zomato.com/madurai/star-parotta" }
  ],
  INKA: [
    { title: "Bisi Bele Bath", content: "A hot, spicy rice dish with lentils, vegetables, and spices. Known as the 'deliciously hot' dish of Karnataka.", restaurant: "Mavalli Tiffin Room (Bengaluru)", restaurantLink: "https://www.zomato.com/bangalore/mavalli-tiffin-room" },
    { title: "Dosa", content: "Crispy rice-lentil crepes served with sambar and chutneys. A staple of Karnataka cuisine.", restaurant: "Vidyarthi Bhavan (Bengaluru)", restaurantLink: "https://www.zomato.com/bangalore/vidyarthi-bhavan" },
    { title: "Mysore Pak", content: "A rich sweet made from ghee, sugar, and gram flour. A specialty from Mysore that's crunchy and delicious.", restaurant: "Guru Sweet Mart (Mysore)", restaurantLink: "https://www.zomato.com/mysore/guru-sweets" },
    { title: "Neer Dosa", content: "Thin, soft rice crepes from Mangalore, served with coconut curry or fish curry. Light and fermented.", restaurant: "Kote (Mangalore)", restaurantLink: "https://www.zomato.com/mangalore/kote" }
  ],
  default: [
    { title: "Butter Chicken", content: "Creamy tomato-based curry with tender chicken pieces. One of India's most popular dishes worldwide.", restaurant: "Local Punjabi Kitchen", restaurantLink: "" },
    { title: "Biryani", content: "Fragrant rice layered with spiced meat or vegetables. Each region has its unique style.", restaurant: "Local Restaurant", restaurantLink: "" },
    { title: "Samosa", content: "Crispy triangular pastry filled with spiced potatoes or meat. A popular Indian snack.", restaurant: "Local Street Vendor", restaurantLink: "" }
  ]
};

const festivalData = {
  INRJ: [
    { title: "Diwali", content: "The Festival of Lights celebrates Lord Rama's return to Ayodhya after 14 years of exile. Homes are decorated with diyas (oil lamps), rangolis, and lights. Families gather for Lakshmi Puja, share sweets, and burst fireworks. Steps: 1) Clean the house thoroughly. 2) Decorate with diyas and rangoli. 3) Perform Lakshmi Puja in the evening. 4) Share sweets with neighbors. 5) Light fireworks and celebrate." },
    { title: "Holi", content: "The Festival of Colors celebrates the victory of good over evil and the arrival of spring. People throw colored powders and water at each other. Steps: 1) Light a bonfire on Holi eve (Holika Dahan). 2) Apply colors to elders for blessings. 3) Play with colors with friends. 4) Enjoy traditional sweets like gujiya. 5) Visit friends and family." },
    { title: "Gangaur", content: "A festival dedicated to Goddess Gauri (Parvati) and Lord Shiva, celebrated by married women for marital bliss. Steps: 1) Women fast for 18 days. 2) Create clay idols of Gangaur. 3) Procession through the village. 4) Offer prayers for husband's long life. 5) Break fast with festive foods." }
  ],
  INUP: [
    { title: "Kumbh Mela", content: "The world's largest religious gathering where millions bathe in sacred rivers for spiritual cleansing. Held every 12 years at Prayagraj, Haridwar, Nashik, and Ujjain. Steps: 1) Take a holy dip at the specified confluence. 2) Perform rituals at sunrise. 3) Seek blessings from sadhus. 4) Participate in spiritual discourses. 5) Donate food and clothes to the needy." },
    { title: "Mahashivratri", content: "A night-long festival dedicated to Lord Shiva, celebrating his marriage to Parvati. Steps: 1) Fast throughout the day. 2) Visit Shiva temples at night. 3) Perform 'Jagaran' - all-night vigil with chanting. 4) Offer bel leaves and milk to the Shivling. 5) Meditate and pray for blessings." },
    { title: "Ram Leela", content: "A dramatic enactment of the Ramayana story, performed across North India especially in Varanasi and Ayodhya. Steps: 1) Set up open-air theater with elaborate stages. 2) Actors perform episodes from Ramayana. 3) Use of fireworks for battle scenes. 4) Audience participates by chanting 'Jai Sri Ram'. 5) Conclude with 'Ravan Dahan' - burning of effigies." }
  ],
  INKL: [
    { title: "Onam", content: "The harvest festival celebrating King Mahabali's annual visit to Kerala. Features flower carpets, boat races, and grand feasts. Steps: 1) Clean and decorate homes with flowers. 2) Create Pookalam (flower rangoli). 3) Attend Snake Boat Race. 4) Wear new clothes (Onappudava). 5) Enjoy Onam Sadya - a grand feast on banana leaves." },
    { title: "Thiruvathira", content: "A classical dance festival dedicated to Lord Shiva, performed by women for marital happiness. Steps: 1) Women observe fasting. 2) Wear new silk sarees. 3) Perform Thiruvathira Kali dance in circles. 4) Sing devotional songs. 5) Offer prayers at Shiva temples." },
    { title: "Vishu", content: "The Malayalam New Year celebration symbolizing prosperity. Steps: 1) Prepare Vishukkanni - arrangement of rice, fruits, flowers, and coins. 2) View the arrangement first thing in the morning. 3) Give new clothes (Vishu Padakkam). 4) Burst fireworks. 5) Enjoy feast with family." }
  ],
  INMH: [
    { title: "Ganesh Chaturthi", content: "The 10-day festival celebrating Lord Ganesha's birthday with huge idol installations. Steps: 1) Install Ganesha idol at home or public pandals. 2) Perform daily puja with modaks (his favorite sweet). 3) Sing 'Jai Ganesh Jai Ganesh Deva'. 4) On the last day, perform Visarjan - immersion in water. 5) Carry the idol in procession with dancing and drums." },
    { title: "Mahashivratri", content: "Night-long celebration dedicated to Lord Shiva with fasting and prayers. Steps: 1) Keep fast throughout the day. 2) Visit Shiva temple in the evening. 3) Perform 'Bilva Thilva' - offering bel leaves. 4) All-night vigil with chanting 'Om Namah Shivaya'. 5) Break fast next morning with light food." }
  ],
  INTN: [
    { title: "Pongal", content: "A four-day harvest festival thanking the Sun God and farm animals. Steps: 1) Bhogi - discard old belongings and light bonfires. 2) Pongal - boil milk and rice together, letting it overflow. 3) Mattu Pongal - honor cattle with decorations. 4) Kaanum Pongal - family gatherings and outings. 5) Offer Pongal rice to Sun God." },
    { title: "Thiruvathira", content: "A dance festival dedicated to Lord Shiva, performed by women in Tamil Nadu. Steps: 1) Women observe strict fasting. 2) Wear golden-colored traditional attire. 3) Perform Thiruvathira Kali - a graceful dance in circles. 4) Sing traditional Thiruvathira songs. 5) Visit Shiva temples." },
    { title: "Tamil New Year", content: "Celebrated as 'Puthandu', it marks the first day of the Tamil calendar. Steps: 1) Clean the house and create Kolam (rangoli). 2) View the 'Kani' - first sight of auspicious items. 3) Wear new clothes. 4) Visit temple for prayers. 5) Enjoy special meal with family." }
  ],
  INJK: [
    { title: "Ladakh Festival", content: "A three-day festival showcasing Ladakhi culture with dance, music, and polo. Steps: 1) Watch traditional Cham dance by lamas. 2) Enjoy folk music performances. 3) Witness archery and polo matches. 4) Shop for local handicrafts. 5) Taste local cuisine." },
    { title: "Hemis Festival", content: "Celebrates the birth of Guru Padmasambhava at Hemis Monastery. Steps: 1) Witness the famous Cham dance performance. 2) See the unfolding of the sacred Thangka. 3) Participate in religious prayers. 4) Enjoy traditional Ladakhi food. 5) Buy local handicrafts." }
  ],
  default: [
    { title: "Diwali", content: "The Festival of Lights celebrates the victory of light over darkness. Steps: 1) Clean and decorate homes. 2) Light diyas and candles. 3) Perform Lakshmi Puja. 4) Share sweets with neighbors. 5) Light fireworks." },
    { title: "Holi", content: "The Festival of Colors celebrates spring and good over evil. Steps: 1) Holika Dahan - light bonfire. 2) Apply colors to each other. 3) Play with water colors. 4) Enjoy traditional sweets. 5) Visit friends and family." }
  ]
};

const costumeData = {
  INRJ: [
    { title: "Ghaghra Choli", content: "The traditional Rajasthani attire for women featuring a long flared skirt (ghaghra) and fitted blouse (choli) with a dupatta. Often adorned with mirror work, bandhani (tie-dye), and embroidery. Women wear heavy silver jewelry including chooda (bangles), raag (nose ring), and jhumkas (earrings). The colors are vibrant - red, pink, yellow, and orange." },
    { title: "Dhoti Kurta", content: "Traditional men's wear in Rajasthan - a white or colored dhoti wrapped around the waist with a long tunic (kurta) and often a safa (turban). The safa varies by region - the Jaipur safa is triangular, Jodhpur safa has feathers. Men also wear angavastram (cloth across the shoulder)." },
    { title: "Mojari", content: "Traditional Rajasthani footwear - intricately embroidered leather shoes with pointed curled toes. Often made with colorful threads and mirror work. Both men and women wear mojaris, with women's versions having more elaborate designs and small bells." }
  ],
  INUP: [
    { title: "Chikankari Kurta", content: "Lucknow's famous white kurta with intricate shadow embroidery (chikankari). The delicate hand Embroidery uses white thread on fine muslin or cotton. Different stitches include jaali, bakhiya, and shadow work. The kurta is often paired with churidar pajamas or palazzos." },
    { title: "Banarasi Saree", content: "The iconic silk saree from Varanasi with gold and silver brocade work. Features intricate motifs of flowers, peacock, and mango patterns. The pallu is heavily embellished. Banarasi sarees are a must for brides and are worn during weddings and festivals." },
    { title: "Kurta Pyjama", content: "Traditional everyday wear for men in Uttar Pradesh. The kurta is a long tunic worn over loose-fitting pyjama pants. Often in white, cream, or light colors for daily wear, and rich colors for festivals. Sometimes paired with a sherwani for special occasions." }
  ],
  INKL: [
    { title: "Mundu", content: "The traditional attire for men in Kerala - a white or cream-colored dhoti worn wrapped around the waist. The mundu is typically worn with a shirt (often white or with colored borders) and is the standard dress for formal occasions. Women's version is called 'mundum neriyathu' with matching blouse." },
    { title: "Saree", content: "Kerala women traditionally wear the simple, elegant Kasavu saree - off-white or cream with gold borders (kasavu). Worn with a matching or contrasting blouse, it's the attire for festivals like Onam and Vishu. The traditional style is draped without pleats." },
    { title: "Shirt and Lungi", content: "Everyday casual wear for men in Kerala. The lungi is a wrapped cloth around the waist, often in checks or dark colors. Paired with a formal shirt for work or a casual vest for home. Popular among fishermen and working class." }
  ],
  INMH: [
    { title: "Nauvari Saree", content: "The traditional nine-yard saree worn by Maharashtrian women, also called 'Kashta'. Draped in a unique style without pleats, it allows free movement. Usually in bright colors with gold borders (saaj). Paired with a cholis (blouse) and worn for festivals and weddings." },
    { title: "Dhoti", content: "Traditional men's wear in Maharashtra - white cotton dhoti worn in the 'Kacche' style (tucked at the back). Paired with a shirt or bare torso for traditional occasions. The 'Petni' style has pleats at the front. Often worn with a Gandhi cap for formal events." },
    { title: "Paithani", content: "A luxurious silk saree from Maharashtra with peacock motifs and gold borders. The pallu features elaborate designs. Originating in Paithan, these sarees are highly prized and often worn by brides. Colors include bright yellow, magenta, and red." }
  ],
  INTN: [
    { title: "Madisar", content: "Traditional nine-yard saree draped in the classic Tamil style. Worn by Tamil women for formal occasions and festivals. The pleats are tucked at the back, and the pallu goes over the shoulder. Usually in silk or cotton with traditional motifs. The style has remained unchanged for centuries." },
    { title: "Veshti", content: "Traditional Tamil men's wear - a white dhoti worn for formal occasions. The veshti has a single broad border (kannadi) in gold or colors. Worn with angavastram (cloth across shoulders) and often a sacred thread. The preferred fabric is silk for weddings, cotton for daily wear." },
    { title: "Shair", content: "Traditional long coat worn by Tamil men, especially musicians and dancers. Features elaborate embroidery and buttons. Worn over a veshti (dhoti) for classical dance performances and Carnatic music concerts. The design has Persian influences." }
  ],
  INKA: [
    { title: "Mysore Silk Saree", content: "Famous silk sarees from Mysore with elegant gold borders and traditional motifs. Known for their lustrous silk and fine gold zari work. Usually in solid colors with minimal designs - the elegance lies in the quality of silk and zari. A must for South Indian brides." },
    { title: "Lungi", content: "The everyday wear for men in Karnataka - a wrapped cloth around the waist, usually in dark colors or checks. Unlike other states, Karnataka lugis often have checks. Worn casually at home or in markets. Paired with a shirt for work." },
    { title: "Ilkal Saree", content: "Traditional sarees from Ilkal in Karnataka, known for their unique pallu technique and temple border designs. Usually in cotton with colorful borders. The pallu is woven separately and attached. Popular among rural women and for daily wear." }
  ],
  INGJ: [
    { title: "Chaniya Choli", content: "The vibrant traditional attire for women in Gujarat - a long skirt (chaniya) with fitted blouse (choli) and flowing dupatta. Heavily embroidered with mirror work, beads, and shells. Worn during Navratri with jhumkas (earrings), bangles, and anklets. Colors are bright - red, orange, yellow, green." },
    { title: "Dhoti", content: "Traditional men's wear in Gujarat - white cotton dhoti worn in the 'Rajasthani style' (tucked at sides). Paired with a short or long tunic (anjana). Often worn with a pagdi (turban) for weddings. The embroidery and draping style differs from other states." },
    { title: "Bandhani", content: "The famous tie-dye technique from Gujarat and Rajasthan. Bandhani sarees and dupattas feature patterns created by tying cloth before dyeing. Different patterns include 'Bhekhadiya' (dots), 'Chandani' (moons), and 'Dodi' (squares). The Bandhani from Jamnagar is world-famous." }
  ],
  default: [
    { title: "Saree", content: "The iconic Indian attire for women - a five to nine-yard fabric draped elegantly. Each region has its unique draping style - Nauvari (Maharashtra), Madisar (Tamil Nadu), Bengali style, etc. Made from various fabrics - silk, cotton, georgette, chiffon. An all-occasion garment." },
    { title: "Kurta Pyjama", content: "Classic Indian wear for men - a long tunic (kurta) with loose pants (pyjama). Worn casually and formally. Available in cotton for summer, silk for winters. Can be plain, embroidered, or printed. The quintessential Indian dress for festivals and family gatherings." },
    { title: "Sherwani", content: "The grand Indian outfit for men, especially for weddings. A long coat-like garment worn over a kurta and churidar. Heavily embroidered with gold/silver work (gota patti). Usually in rich colors - gold, maroon, royal blue. Paired with a safa (turban) and mojaris (shoes)." }
  ]
};

const Explore = () => {
  const { id } = useParams();
  const stateName = stateNames[id] || "State";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const getLanguageCode = () => stateLanguageMap[id] || "en-IN";
  const getSpeaker = () => speakerVoiceMap[getLanguageCode()] || "en-IN";

  const handleSpeak = async (article, e) => {
    e.stopPropagation();
    if (playingId === article.title) {
      setPlayingId(null);
      return;
    }
    
    setPlayingId(article.title);
    
    const text = `${article.title}. ${article.content}`;
    const langCode = getLanguageCode();
    const speaker = getSpeaker();
    
    try {
      console.log("Calling TTS API...");
      
      const response = await fetch("http://localhost:5001/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          target_language_code: langCode,
          speaker: speaker
        })
      });
      
      const data = await response.json();
      console.log("API Response:", data);
      
      if (data.audios && data.audios[0]) {
        const audioBytes = Uint8Array.from(atob(data.audios[0]), c => c.charCodeAt(0));
        const blob = new Blob([audioBytes], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setPlayingId(null);
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.play();
      } else {
        setPlayingId(null);
        alert("Could not generate audio. Please check your Sarvam API key.");
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setPlayingId(null);
      alert("Error generating speech. Please check your Sarvam API key in .env file.");
    }
  };

  const getFolkloreArticles = () => folkloreData[id] || folkloreData.default;
  const getMonumentArticles = () => monumentData[id] || monumentData.default;
  const getFoodArticles = () => foodData[id] || foodData.default;
  const getFestivalArticles = () => festivalData[id] || festivalData.default;
  const getCostumeArticles = () => costumeData[id] || costumeData.default;

  const categories = [
    { id: "monument", name: "Monument", icon: "🏛️", description: "Historical monuments, temples, forts, and landmarks" },
    { id: "folklore", name: "Folklore", icon: "📖", description: "Traditional stories, legends, and folk tales" },
    { id: "food", name: "Food", icon: "🍛", description: "Local cuisine and famous restaurants" },
    { id: "festival", name: "Festival", icon: "🎉", description: "Festivals and how to celebrate them" },
    { id: "costume", name: "Costume", icon: "👘", description: "Traditional attire and clothing" }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedArticle(null);
  };

  const handleArticleClick = (article) => setSelectedArticle(article);
  const handleBack = () => {
    if (selectedArticle) setSelectedArticle(null);
    else if (selectedCategory) setSelectedCategory(null);
  };

  const renderArticles = (articles, categoryTitle) => (
    <div className="articles-container">
      <button className="back-btn" onClick={handleBack}>← Back to Categories</button>
      <h2>{categoryTitle} of {stateName}</h2>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card" onClick={() => handleArticleClick(article)}>
            <div className="article-header">
              <h3>{article.title}</h3>
              <button 
                className={`speaker-btn ${playingId === article.title ? 'playing' : ''}`}
                onClick={(e) => handleSpeak(article, e)}
                title="Listen to article"
              >
                {playingId === article.title ? '⏹️' : '🔊'}
              </button>
            </div>
            <p>{article.content.substring(0, 120)}...</p>
            {article.restaurant && <div className="restaurant-info"><span>📍 {article.restaurant}</span></div>}
            <span className="read-more">Read more →</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="explore-page">
      <div className="page-header">
        <h1>Explore - {stateName}</h1>
        <p>Discover culture, traditions, and heritage of {stateName}</p>
      </div>

      {!selectedCategory ? (
        <div className="sections-container">
          {categories.map((cat) => (
            <div key={cat.id} className="explore-section" onClick={() => handleCategoryClick(cat.id)}>
              <div className="section-icon">{cat.icon}</div>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      ) : selectedCategory === "monument" && !selectedArticle ? (
        renderArticles(getMonumentArticles(), "Monuments")
      ) : selectedCategory === "folklore" && !selectedArticle ? (
        renderArticles(getFolkloreArticles(), "Folklore")
      ) : selectedCategory === "food" && !selectedArticle ? (
        renderArticles(getFoodArticles(), "Famous Foods")
      ) : selectedCategory === "festival" && !selectedArticle ? (
        renderArticles(getFestivalArticles(), "Festivals")
      ) : selectedCategory === "costume" && !selectedArticle ? (
        renderArticles(getCostumeArticles(), "Traditional Costumes")
      ) : selectedArticle ? (
        <div className="article-detail">
          <button className="back-btn" onClick={handleBack}>← Back to Articles</button>
          <div className="article-detail-header">
            <h2>{selectedArticle.title}</h2>
            <button 
              className={`speaker-btn large ${playingId === selectedArticle.title ? 'playing' : ''}`}
              onClick={(e) => handleSpeak(selectedArticle, e)}
              title="Listen to article"
            >
              {playingId === selectedArticle.title ? '⏹️ Stop' : '🔊 Listen'}
            </button>
          </div>
          <p>{selectedArticle.content}</p>
          {selectedArticle.restaurant && (
            <div className="restaurant-detail">
              <h3>📍 Best Place to Try</h3>
              <p>{selectedArticle.restaurant}</p>
              {selectedArticle.restaurantLink && (
                <a href={selectedArticle.restaurantLink} target="_blank" rel="noopener noreferrer" className="restaurant-link">
                  View on Zomato →
                </a>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="coming-soon">
          <button className="back-btn" onClick={handleBack}>← Back to Categories</button>
          <h2>{categories.find(c => c.id === selectedCategory)?.name} of {stateName}</h2>
          <p>Coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
