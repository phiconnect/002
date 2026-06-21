// Starter vocabulary for the flashcard app.
// Each entry: { en, th, pos, example, category }
// pos = part of speech (optional), example = English example sentence (optional)
const STARTER_WORDS = [
  // ชีวิตประจำวัน (Everyday)
  { en: "morning", th: "ตอนเช้า", pos: "n.", example: "I drink coffee every morning.", category: "ชีวิตประจำวัน" },
  { en: "house", th: "บ้าน", pos: "n.", example: "Their house is near the river.", category: "ชีวิตประจำวัน" },
  { en: "friend", th: "เพื่อน", pos: "n.", example: "She is my best friend.", category: "ชีวิตประจำวัน" },
  { en: "sleep", th: "นอนหลับ", pos: "v.", example: "I usually sleep eight hours.", category: "ชีวิตประจำวัน" },
  { en: "money", th: "เงิน", pos: "n.", example: "He saves his money carefully.", category: "ชีวิตประจำวัน" },
  { en: "clean", th: "สะอาด / ทำความสะอาด", pos: "adj./v.", example: "Please keep the room clean.", category: "ชีวิตประจำวัน" },
  { en: "buy", th: "ซื้อ", pos: "v.", example: "I want to buy a new phone.", category: "ชีวิตประจำวัน" },
  { en: "busy", th: "ยุ่ง", pos: "adj.", example: "I am very busy today.", category: "ชีวิตประจำวัน" },

  // อาหาร (Food)
  { en: "rice", th: "ข้าว", pos: "n.", example: "We eat rice with almost every meal.", category: "อาหาร" },
  { en: "water", th: "น้ำ", pos: "n.", example: "Can I have a glass of water?", category: "อาหาร" },
  { en: "delicious", th: "อร่อย", pos: "adj.", example: "This soup is delicious.", category: "อาหาร" },
  { en: "hungry", th: "หิว", pos: "adj.", example: "I am hungry, let's eat.", category: "อาหาร" },
  { en: "spicy", th: "เผ็ด", pos: "adj.", example: "Thai food is often spicy.", category: "อาหาร" },
  { en: "vegetable", th: "ผัก", pos: "n.", example: "Eat more vegetables for your health.", category: "อาหาร" },
  { en: "sweet", th: "หวาน", pos: "adj.", example: "The mango is very sweet.", category: "อาหาร" },
  { en: "breakfast", th: "อาหารเช้า", pos: "n.", example: "Breakfast is my favorite meal.", category: "อาหาร" },

  // การเดินทาง (Travel)
  { en: "airport", th: "สนามบิน", pos: "n.", example: "We arrived at the airport early.", category: "การเดินทาง" },
  { en: "ticket", th: "ตั๋ว", pos: "n.", example: "I bought a train ticket.", category: "การเดินทาง" },
  { en: "map", th: "แผนที่", pos: "n.", example: "Let me check the map.", category: "การเดินทาง" },
  { en: "luggage", th: "กระเป๋าเดินทาง / สัมภาระ", pos: "n.", example: "My luggage is very heavy.", category: "การเดินทาง" },
  { en: "hotel", th: "โรงแรม", pos: "n.", example: "The hotel is near the beach.", category: "การเดินทาง" },
  { en: "arrive", th: "มาถึง", pos: "v.", example: "What time does the bus arrive?", category: "การเดินทาง" },
  { en: "abroad", th: "ต่างประเทศ", pos: "adv.", example: "She is studying abroad.", category: "การเดินทาง" },
  { en: "journey", th: "การเดินทาง", pos: "n.", example: "It was a long journey.", category: "การเดินทาง" },

  // อารมณ์/ความรู้สึก (Emotions)
  { en: "happy", th: "มีความสุข / ดีใจ", pos: "adj.", example: "I am happy to see you.", category: "อารมณ์" },
  { en: "sad", th: "เศร้า", pos: "adj.", example: "She felt sad about the news.", category: "อารมณ์" },
  { en: "angry", th: "โกรธ", pos: "adj.", example: "Don't be angry with me.", category: "อารมณ์" },
  { en: "tired", th: "เหนื่อย", pos: "adj.", example: "I am tired after work.", category: "อารมณ์" },
  { en: "afraid", th: "กลัว", pos: "adj.", example: "He is afraid of dogs.", category: "อารมณ์" },
  { en: "excited", th: "ตื่นเต้น (ดีใจ)", pos: "adj.", example: "We are excited about the trip.", category: "อารมณ์" },
  { en: "bored", th: "เบื่อ", pos: "adj.", example: "The kids are bored at home.", category: "อารมณ์" },
  { en: "proud", th: "ภูมิใจ", pos: "adj.", example: "I am proud of you.", category: "อารมณ์" },

  // การงาน (Work)
  { en: "meeting", th: "การประชุม", pos: "n.", example: "We have a meeting at 9 a.m.", category: "การงาน" },
  { en: "deadline", th: "กำหนดส่งงาน", pos: "n.", example: "The deadline is tomorrow.", category: "การงาน" },
  { en: "salary", th: "เงินเดือน", pos: "n.", example: "He got a higher salary.", category: "การงาน" },
  { en: "manager", th: "ผู้จัดการ", pos: "n.", example: "Ask the manager for help.", category: "การงาน" },
  { en: "improve", th: "ปรับปรุง / พัฒนา", pos: "v.", example: "I want to improve my English.", category: "การงาน" },
  { en: "skill", th: "ทักษะ", pos: "n.", example: "Communication is an important skill.", category: "การงาน" },
  { en: "report", th: "รายงาน", pos: "n./v.", example: "Please send me the report.", category: "การงาน" },
  { en: "experience", th: "ประสบการณ์", pos: "n.", example: "She has years of experience.", category: "การงาน" }
];
