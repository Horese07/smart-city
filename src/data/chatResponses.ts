export interface ChatQA {
  keywords: string[];
  response: string;
}

export const CHAT_RESPONSES: ChatQA[] = [
  {
    keywords: ["surf", "surfing", "tomorrow", "waves", "lesson"],
    response:
      "🏄 In Tamraght you have several great options: **Surf Tamraght**, **Ocean Ride Surf Camp**, **Atlantic Surf Academy**, and **Tamraght Yoga & Surf**. Imourann beach is the main spot. For tomorrow, check with Surf Tamraght or Ocean Ride for availability — both offer rentals and lessons. Best to book via WhatsApp!",
  },
  {
    keywords: ["café", "cafe", "coffee", "best café", "near me"],
    response:
      "☕ Try **Café Panorama** for ocean views and fresh juices, **Sunset Café** for the best sunset and mint tea, **Mint Café** for coffee and Wi-Fi, or **Coast Coffee** for specialty coffee and healthy bowls. All are within walking distance in the village.",
  },
  {
    keywords: ["traditional", "food", "moroccan", "tagine", "couscous", "eat"],
    response:
      "🍲 For traditional Moroccan food: **Dar Tamraght** (tagine, couscous, fish), **Riad Tamraght** (rooftop, chicken tagine), and **Fisherman's Table** (daily catch, family-run). Friday couscous at Dar Tamraght is popular!",
  },
  {
    keywords: ["hostel", "sleep", "stay", "accommodation", "room"],
    response:
      "🛏️ **Tamraght Hostel** (budget, rooftop), **Surf House Tamraght** (surfer-friendly, board storage), **Beach House Hostel** (by the beach), and **Rooftop Hostel** (sea view). Prices from ~12€/night for a dorm.",
  },
  {
    keywords: ["shop", "buy", "souvenir", "craft", "argan"],
    response:
      "🛍️ **Village Shop Tamraght** (crafts, argan oil), **Wave Rider Shop** (surf gear), **Berber Artisan** (rugs, jewelry), and **Souk Tamraght** (spices, dates). Great for gifts and essentials.",
  },
  {
    keywords: ["beach", "where", "swim"],
    response:
      "🏖️ The main beach is **Imourann**, right by Tamraght. It’s great for swimming and surfing. You can walk from the village or get a lift from hostels like Beach House. Sunset Café has a nice view over the coast.",
  },
  {
    keywords: ["hello", "hi", "hey", "help"],
    response:
      "👋 Hi! I’m your Tamraght assistant. Ask me things like: *Where can I surf tomorrow?* • *Best café near me?* • *Traditional food nearby?* • *Where to stay?* • *Shops and souvenirs?*",
  },
];

export function getResponseForMessage(message: string): string {
  const lower = message.toLowerCase().trim();
  for (const qa of CHAT_RESPONSES) {
    if (qa.keywords.some((k) => lower.includes(k))) return qa.response;
  }
  return "I’m a demo assistant — I can only answer questions about surfing, cafés, food, hostels, and shops in Tamraght. Try: *Best café near me?* or *Where can I surf?*";
}
