const products = [
  { id: 1, name: "Haylou Solar Neo 2 Smart Watch", cat: "Watch", price: 3369, old: 4499, off: "-25%", rate: "4.9 (2365)", icon: "⌚", seller: "Shop Pro BD", review: "কম দামের মধ্যে অনেক ভালো হয়েছে প্রোডাক্টটা, ধন্যবাদ সেলারকে।" },
  { id: 2, name: "Premium Cotton Winter Hoodie", cat: "Fashion", price: 410, old: 840, off: "-51%", rate: "4.7 (412)", icon: "🧥", seller: "Dhaka Fashion Hub", review: "কাপড়ের মান খুবই ভালো এবং আরামদায়ক।" },
  { id: 3, name: "Lotto Super Light Running Shoes", cat: "Fashion", price: 967, old: 1290, off: "-25%", rate: "4.8 (890)", icon: "👟", seller: "Lotto Official", review: "অরিজিনাল প্রোডাক্ট, পায়ে দিয়ে খুব আরাম।" },
  { id: 4, name: "TWS Wireless Noise Cancelling Buds", cat: "Gadgets", price: 890, old: 1450, off: "-38%", rate: "4.6 (530)", icon: "🎧", seller: "Gadget Mart BD", review: "সাউন্ড কোয়ালিটি ও ব্যাটারি ব্যাকআপ অসাধারণ।" },
  { id: 5, name: "NOVA 2L Electric Kettle - Steel", cat: "Gadgets", price: 659, old: 845, off: "-22%", rate: "4.7 (2365)", icon: "🫖", seller: "Nova Official", review: "খুব দ্রুত পানি গরম হয়, একদম পারফেক্ট।" },
  { id: 6, name: "RGB Mechanical Gaming Keyboard", cat: "Gadgets", price: 1850, old: 2500, off: "-26%", rate: "4.9 (195)", icon: "⌨️", seller: "Tech Zone BD", review: "গেমিং এবং টাইপিংয়ের জন্য সেরা কিবোর্ড।" }
];

const categories = {
  "Just for You": [{ n: "Smart Watch", i: "⌚", c: "Watch" }, { n: "Winter Hoodie", i: "🧥", c: "Fashion" }, { n: "Earbuds", i: "🎧", c: "Gadgets" }],
  "Men's Fashion": [{ n: "Hoodies", i: "🧥", c: "Fashion" }, { n: "Running Shoes", i: "👟", c: "Fashion" }, { n: "Watches", i: "⌚", c: "Watch" }],
  "Electronic Devices": [{ n: "TWS Buds", i: "🎧", c: "Gadgets" }, { n: "Keyboards", i: "⌨️", c: "Gadgets" }, { n: "Electric Kettle", i: "🫖", c: "Gadgets" }],
  "Home & Lifestyle": [{ n: "Kitchen Kettle", i: "🫖", c: "Gadgets" }, { n: "Water Bottle", i: "🍶", c: "Gadgets" }]
};

let cart = [];
let orders = JSON.parse(localStorage.getItem('jinneee_orders') || '[]');
