// Starter vocabulary for the flashcard app.
// Each entry: { en, th, pos, example, category }
// pos = part of speech (optional), example = English example sentence (optional)
//
// The "ชีวิตประจำวัน" (Everyday) category is intentionally the largest — it is the
// app's main focus and the default category shown on load (see js/app.js).
const STARTER_WORDS = [
  // ===== ชีวิตประจำวัน (Everyday) — คำที่ใช้บ่อยที่สุดในแต่ละวัน =====

  // กิจวัตรประจำวัน (Daily routine verbs)
  { en: "wake up", th: "ตื่นนอน", pos: "v.", example: "I wake up at 6 a.m. every day.", category: "ชีวิตประจำวัน" },
  { en: "sleep", th: "นอนหลับ", pos: "v.", example: "I usually sleep eight hours.", category: "ชีวิตประจำวัน" },
  { en: "eat", th: "กิน", pos: "v.", example: "Let's eat dinner together.", category: "ชีวิตประจำวัน" },
  { en: "drink", th: "ดื่ม", pos: "v.", example: "I drink water every morning.", category: "ชีวิตประจำวัน" },
  { en: "wash", th: "ล้าง / ซัก", pos: "v.", example: "Please wash your hands.", category: "ชีวิตประจำวัน" },
  { en: "brush", th: "แปรง (ฟัน/ผม)", pos: "v.", example: "I brush my teeth twice a day.", category: "ชีวิตประจำวัน" },
  { en: "cook", th: "ทำอาหาร", pos: "v.", example: "She likes to cook on weekends.", category: "ชีวิตประจำวัน" },
  { en: "clean", th: "สะอาด / ทำความสะอาด", pos: "adj./v.", example: "Please keep the room clean.", category: "ชีวิตประจำวัน" },
  { en: "buy", th: "ซื้อ", pos: "v.", example: "I want to buy a new phone.", category: "ชีวิตประจำวัน" },
  { en: "pay", th: "จ่ายเงิน", pos: "v.", example: "Can I pay by card?", category: "ชีวิตประจำวัน" },
  { en: "walk", th: "เดิน", pos: "v.", example: "I walk to the office every day.", category: "ชีวิตประจำวัน" },
  { en: "drive", th: "ขับรถ", pos: "v.", example: "She drives to work.", category: "ชีวิตประจำวัน" },
  { en: "wait", th: "รอ", pos: "v.", example: "Please wait a moment.", category: "ชีวิตประจำวัน" },
  { en: "rest", th: "พักผ่อน", pos: "v./n.", example: "You should rest when you are sick.", category: "ชีวิตประจำวัน" },

  // เวลา (Time)
  { en: "morning", th: "ตอนเช้า", pos: "n.", example: "I drink coffee every morning.", category: "ชีวิตประจำวัน" },
  { en: "afternoon", th: "ตอนบ่าย", pos: "n.", example: "We have a class in the afternoon.", category: "ชีวิตประจำวัน" },
  { en: "evening", th: "ตอนเย็น", pos: "n.", example: "I relax in the evening.", category: "ชีวิตประจำวัน" },
  { en: "night", th: "กลางคืน", pos: "n.", example: "It gets cold at night.", category: "ชีวิตประจำวัน" },
  { en: "today", th: "วันนี้", pos: "adv.", example: "What are you doing today?", category: "ชีวิตประจำวัน" },
  { en: "tomorrow", th: "พรุ่งนี้", pos: "adv.", example: "See you tomorrow.", category: "ชีวิตประจำวัน" },
  { en: "yesterday", th: "เมื่อวาน", pos: "adv.", example: "I was busy yesterday.", category: "ชีวิตประจำวัน" },
  { en: "early", th: "เช้า / แต่เนิ่น ๆ", pos: "adj./adv.", example: "I woke up early today.", category: "ชีวิตประจำวัน" },
  { en: "late", th: "สาย / ดึก", pos: "adj./adv.", example: "Sorry, I am late.", category: "ชีวิตประจำวัน" },

  // บ้านและของใช้ (Home & things)
  { en: "house", th: "บ้าน", pos: "n.", example: "Their house is near the river.", category: "ชีวิตประจำวัน" },
  { en: "room", th: "ห้อง", pos: "n.", example: "My room is small but tidy.", category: "ชีวิตประจำวัน" },
  { en: "door", th: "ประตู", pos: "n.", example: "Please close the door.", category: "ชีวิตประจำวัน" },
  { en: "key", th: "กุญแจ", pos: "n.", example: "I can't find my key.", category: "ชีวิตประจำวัน" },
  { en: "phone", th: "โทรศัพท์", pos: "n.", example: "My phone battery is low.", category: "ชีวิตประจำวัน" },
  { en: "clothes", th: "เสื้อผ้า", pos: "n.", example: "I need to wash my clothes.", category: "ชีวิตประจำวัน" },
  { en: "bag", th: "กระเป๋า", pos: "n.", example: "I left my bag at home.", category: "ชีวิตประจำวัน" },
  { en: "money", th: "เงิน", pos: "n.", example: "He saves his money carefully.", category: "ชีวิตประจำวัน" },

  // คน & การพบปะ (People & social)
  { en: "friend", th: "เพื่อน", pos: "n.", example: "She is my best friend.", category: "ชีวิตประจำวัน" },
  { en: "family", th: "ครอบครัว", pos: "n.", example: "I live with my family.", category: "ชีวิตประจำวัน" },
  { en: "neighbor", th: "เพื่อนบ้าน", pos: "n.", example: "My neighbor is very kind.", category: "ชีวิตประจำวัน" },
  { en: "help", th: "ช่วยเหลือ", pos: "v./n.", example: "Can you help me, please?", category: "ชีวิตประจำวัน" },
  { en: "talk", th: "พูดคุย", pos: "v.", example: "Let's talk later.", category: "ชีวิตประจำวัน" },
  { en: "meet", th: "พบ / เจอ", pos: "v.", example: "Nice to meet you.", category: "ชีวิตประจำวัน" },

  // คำที่ใช้บ่อย (Common adjectives)
  { en: "busy", th: "ยุ่ง", pos: "adj.", example: "I am very busy today.", category: "ชีวิตประจำวัน" },
  { en: "free", th: "ว่าง / ฟรี", pos: "adj.", example: "Are you free this evening?", category: "ชีวิตประจำวัน" },
  { en: "easy", th: "ง่าย", pos: "adj.", example: "This game is very easy.", category: "ชีวิตประจำวัน" },
  { en: "difficult", th: "ยาก", pos: "adj.", example: "The exam was difficult.", category: "ชีวิตประจำวัน" },
  { en: "cheap", th: "ถูก (ราคา)", pos: "adj.", example: "This shirt is cheap.", category: "ชีวิตประจำวัน" },
  { en: "expensive", th: "แพง", pos: "adj.", example: "That car is too expensive.", category: "ชีวิตประจำวัน" },
  { en: "near", th: "ใกล้", pos: "adj./prep.", example: "The shop is near my house.", category: "ชีวิตประจำวัน" },
  { en: "far", th: "ไกล", pos: "adj./adv.", example: "The station is far from here.", category: "ชีวิตประจำวัน" },

  // ===== อาหาร (Food) =====
  { en: "rice", th: "ข้าว", pos: "n.", example: "We eat rice with almost every meal.", category: "อาหาร" },
  { en: "water", th: "น้ำ", pos: "n.", example: "Can I have a glass of water?", category: "อาหาร" },
  { en: "delicious", th: "อร่อย", pos: "adj.", example: "This soup is delicious.", category: "อาหาร" },
  { en: "hungry", th: "หิว", pos: "adj.", example: "I am hungry, let's eat.", category: "อาหาร" },
  { en: "spicy", th: "เผ็ด", pos: "adj.", example: "Thai food is often spicy.", category: "อาหาร" },
  { en: "vegetable", th: "ผัก", pos: "n.", example: "Eat more vegetables for your health.", category: "อาหาร" },
  { en: "sweet", th: "หวาน", pos: "adj.", example: "The mango is very sweet.", category: "อาหาร" },
  { en: "breakfast", th: "อาหารเช้า", pos: "n.", example: "Breakfast is my favorite meal.", category: "อาหาร" },

  // ===== การเดินทาง (Travel) =====
  { en: "airport", th: "สนามบิน", pos: "n.", example: "We arrived at the airport early.", category: "การเดินทาง" },
  { en: "ticket", th: "ตั๋ว", pos: "n.", example: "I bought a train ticket.", category: "การเดินทาง" },
  { en: "map", th: "แผนที่", pos: "n.", example: "Let me check the map.", category: "การเดินทาง" },
  { en: "luggage", th: "กระเป๋าเดินทาง / สัมภาระ", pos: "n.", example: "My luggage is very heavy.", category: "การเดินทาง" },
  { en: "hotel", th: "โรงแรม", pos: "n.", example: "The hotel is near the beach.", category: "การเดินทาง" },
  { en: "arrive", th: "มาถึง", pos: "v.", example: "What time does the bus arrive?", category: "การเดินทาง" },
  { en: "abroad", th: "ต่างประเทศ", pos: "adv.", example: "She is studying abroad.", category: "การเดินทาง" },
  { en: "journey", th: "การเดินทาง", pos: "n.", example: "It was a long journey.", category: "การเดินทาง" },

  // ===== อารมณ์/ความรู้สึก (Emotions) =====
  { en: "happy", th: "มีความสุข / ดีใจ", pos: "adj.", example: "I am happy to see you.", category: "อารมณ์" },
  { en: "sad", th: "เศร้า", pos: "adj.", example: "She felt sad about the news.", category: "อารมณ์" },
  { en: "angry", th: "โกรธ", pos: "adj.", example: "Don't be angry with me.", category: "อารมณ์" },
  { en: "tired", th: "เหนื่อย", pos: "adj.", example: "I am tired after work.", category: "อารมณ์" },
  { en: "afraid", th: "กลัว", pos: "adj.", example: "He is afraid of dogs.", category: "อารมณ์" },
  { en: "excited", th: "ตื่นเต้น (ดีใจ)", pos: "adj.", example: "We are excited about the trip.", category: "อารมณ์" },
  { en: "bored", th: "เบื่อ", pos: "adj.", example: "The kids are bored at home.", category: "อารมณ์" },
  { en: "proud", th: "ภูมิใจ", pos: "adj.", example: "I am proud of you.", category: "อารมณ์" },

  // ===== การงาน (Work) =====
  { en: "meeting", th: "การประชุม", pos: "n.", example: "We have a meeting at 9 a.m.", category: "การงาน" },
  { en: "deadline", th: "กำหนดส่งงาน", pos: "n.", example: "The deadline is tomorrow.", category: "การงาน" },
  { en: "salary", th: "เงินเดือน", pos: "n.", example: "He got a higher salary.", category: "การงาน" },
  { en: "manager", th: "ผู้จัดการ", pos: "n.", example: "Ask the manager for help.", category: "การงาน" },
  { en: "improve", th: "ปรับปรุง / พัฒนา", pos: "v.", example: "I want to improve my English.", category: "การงาน" },
  { en: "skill", th: "ทักษะ", pos: "n.", example: "Communication is an important skill.", category: "การงาน" },
  { en: "report", th: "รายงาน", pos: "n./v.", example: "Please send me the report.", category: "การงาน" },
  { en: "experience", th: "ประสบการณ์", pos: "n.", example: "She has years of experience.", category: "การงาน" }
];
