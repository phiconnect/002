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

  // ===== ชีวิตประจำวัน — ระดับกลาง (Everyday · Intermediate) =====
  // คำที่เจอบ่อยในชีวิตจริงแต่ยากขึ้นอีกนิด เหมาะกับคนที่ผ่านชุดพื้นฐานแล้ว
  { en: "appointment", th: "การนัดหมาย", pos: "n.", example: "I have a doctor's appointment at 3.", category: "ระดับกลาง" },
  { en: "schedule", th: "ตารางเวลา / กำหนดการ", pos: "n./v.", example: "Let's schedule a call for Monday.", category: "ระดับกลาง" },
  { en: "remind", th: "เตือนความจำ", pos: "v.", example: "Please remind me to call her.", category: "ระดับกลาง" },
  { en: "borrow", th: "ยืม", pos: "v.", example: "Can I borrow your pen?", category: "ระดับกลาง" },
  { en: "lend", th: "ให้ยืม", pos: "v.", example: "She lent me some money.", category: "ระดับกลาง" },
  { en: "afford", th: "มีเงินพอจ่าย", pos: "v.", example: "I can't afford a new car right now.", category: "ระดับกลาง" },
  { en: "complain", th: "บ่น / ร้องเรียน", pos: "v.", example: "He always complains about the weather.", category: "ระดับกลาง" },
  { en: "apologize", th: "ขอโทษ", pos: "v.", example: "I apologize for being late.", category: "ระดับกลาง" },
  { en: "decide", th: "ตัดสินใจ", pos: "v.", example: "We need to decide soon.", category: "ระดับกลาง" },
  { en: "suggest", th: "แนะนำ / เสนอ", pos: "v.", example: "Can you suggest a good restaurant?", category: "ระดับกลาง" },
  { en: "explain", th: "อธิบาย", pos: "v.", example: "Let me explain the plan.", category: "ระดับกลาง" },
  { en: "realize", th: "ตระหนัก / เพิ่งรู้ตัว", pos: "v.", example: "I didn't realize it was so late.", category: "ระดับกลาง" },
  { en: "prepare", th: "เตรียมตัว", pos: "v.", example: "I need to prepare for the exam.", category: "ระดับกลาง" },
  { en: "avoid", th: "หลีกเลี่ยง", pos: "v.", example: "Try to avoid traffic in the morning.", category: "ระดับกลาง" },
  { en: "manage", th: "จัดการ / รับมือ", pos: "v.", example: "She manages her time well.", category: "ระดับกลาง" },
  { en: "available", th: "ว่าง / พร้อมใช้งาน", pos: "adj.", example: "Are you available tomorrow?", category: "ระดับกลาง" },
  { en: "convenient", th: "สะดวก", pos: "adj.", example: "Is this time convenient for you?", category: "ระดับกลาง" },
  { en: "comfortable", th: "สบาย", pos: "adj.", example: "This chair is very comfortable.", category: "ระดับกลาง" },
  { en: "similar", th: "คล้ายกัน", pos: "adj.", example: "Our ideas are quite similar.", category: "ระดับกลาง" },
  { en: "necessary", th: "จำเป็น", pos: "adj.", example: "Sleep is necessary for health.", category: "ระดับกลาง" },
  { en: "enough", th: "เพียงพอ", pos: "adj./adv.", example: "Do we have enough time?", category: "ระดับกลาง" },
  { en: "almost", th: "เกือบ", pos: "adv.", example: "I'm almost finished.", category: "ระดับกลาง" },
  { en: "actually", th: "จริง ๆ แล้ว", pos: "adv.", example: "Actually, I changed my mind.", category: "ระดับกลาง" },
  { en: "instead", th: "แทนที่จะ", pos: "adv.", example: "Let's stay home instead.", category: "ระดับกลาง" },
  { en: "although", th: "ถึงแม้ว่า", pos: "conj.", example: "Although it rained, we had fun.", category: "ระดับกลาง" },
  { en: "however", th: "อย่างไรก็ตาม", pos: "adv.", example: "It's expensive; however, it's worth it.", category: "ระดับกลาง" },
  { en: "increase", th: "เพิ่มขึ้น", pos: "v.", example: "Prices increase every year.", category: "ระดับกลาง" },
  { en: "reduce", th: "ลดลง", pos: "v.", example: "We should reduce plastic waste.", category: "ระดับกลาง" },
  { en: "improve", th: "ทำให้ดีขึ้น", pos: "v.", example: "Reading helps improve your vocabulary.", category: "ระดับกลาง" },
  { en: "depend", th: "ขึ้นอยู่กับ", pos: "v.", example: "It depends on the weather.", category: "ระดับกลาง" },

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
