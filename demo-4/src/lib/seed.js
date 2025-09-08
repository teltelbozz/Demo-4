export const embeddedSeed = {
  meta: { name: "Demo-4", version: "0.2-embedded" },
  users: [
    { id: "uF01", display_name: "Aki",  gender: "female", age_range: "28-32", job_cat: "教育", tags: ["グルメ","アウトドア","美術館"] },
    { id: "uF02", display_name: "Mina", gender: "female", age_range: "26-30", job_cat: "営業", tags: ["カフェ","グルメ","アウトドア"] },
    { id: "uF03", display_name: "Yui",  gender: "female", age_range: "24-28", job_cat: "公共", tags: ["スポーツ","音楽","グルメ"] },
    { id: "uM01", display_name: "Ken",  gender: "male",   age_range: "28-32", job_cat: "IT",   tags: ["お酒","映画","旅行"] },
    { id: "uM02", display_name: "Sora", gender: "male",   age_range: "30-34", job_cat: "金融", tags: ["カフェ","スポーツ","読書"] },
    { id: "uM03", display_name: "Hiro", gender: "male",   age_range: "26-30", job_cat: "商社", tags: ["音楽","アウトドア","美術館"] },
  ],
  venues: [
    { id: "v_shibuya_1", name: "渋谷ラウンジ（仮）", area: "渋谷", address: "渋谷区…", price_band: "¥¥" },
    { id: "v_shinjuku_1", name: "新宿ラウンジ（仮）", area: "新宿", address: "新宿区…", price_band: "¥¥" }
  ],
  slots: [
    { id: "s_2025-09-09_1900_2100_shibuya", date: "2025-09-09", time_range: "19:00-21:00", area: "渋谷", venue_id: "v_shibuya_1", status: "open", participants: [], waitlist: [] },
    { id: "s_2025-09-10_2000_2200_shinjuku", date: "2025-09-10", time_range: "20:00-22:00", area: "新宿", venue_id: "v_shinjuku_1", status: "open", participants: [], waitlist: [] },
  ]
};
