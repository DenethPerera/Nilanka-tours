const mongoose = require('mongoose');
const Tour = require('./models/Tour');
require('dotenv').config();

const dummyTours = [
  {
    title: "Yala Wildlife Safari Adventure",
    description: "Witness the majestic leopards and elephants in their natural habitat. Includes a 4x4 jeep safari, luxury camping experience, and BBQ dinner under the stars.",
    duration: "2 Days",
    locations: ["Yala National Park", "Tissamaharama"],
    price: 180,
    image: "https://i.pinimg.com/1200x/a0/8b/38/a08b3885606cc980f7160fb565d49433.jpg"
  },
  {
    title: "Sigiriya & Cultural Triangle",
    description: "Climb the 8th wonder of the world, Sigiriya Lion Rock. Visit the ancient city of Polonnaruwa and experience the rich history of Sri Lanka.",
    duration: "3 Days",
    locations: ["Sigiriya", "Dambulla", "Polonnaruwa"],
    price: 250,
    image: "https://i.pinimg.com/736x/b5/f9/cc/b5f9cce095f1ff6cfa08168801dbe6e5.jpg"
  },
  {
    title: "Ella Scenic Train & Hike",
    description: "The famous blue train journey through tea plantations. Hike Little Adam's Peak and visit the Nine Arch Bridge for the perfect Instagram shot.",
    duration: "2 Days",
    locations: ["Kandy", "Nuwara Eliya", "Ella"],
    price: 150,
    image: "https://i.pinimg.com/1200x/3f/38/c3/3f38c352f8902c3632f478496b45a346.jpg"
  },
  {
    title: "Mirissa Beach & Whales",
    description: "Relax on the golden sands of Mirissa. Go whale watching to see blue whales and enjoy fresh seafood by the beach.",
    duration: "4 Days",
    locations: ["Galle", "Mirissa", "Unawatuna"],
    price: 300,
    image: "https://i.pinimg.com/736x/26/cf/68/26cf685b0b3f2c8c08588da681fefcb8.jpg"
  },
  {
    title: "Nuwara Eliya – Misty Mountains",
   description: "Experience the chill of 'Little England'. Visit lush tea plantations, Gregory Lake, and enjoy the breathtaking views of the Ramboda waterfalls.",
    duration: "2 Days",
    locations: ["Gregory Lake", "Hakgala Garden", "Tea Estates"],
    price: 150,
    image: "https://i.pinimg.com/736x/fc/da/d1/fcdad1ed9f25dacf9b6e58e5fb2de7d3.jpg"
},
{
    title: "Colombo Modern City Tour",
    description: "Explore the commercial heart of Sri Lanka. Visit the Lotus Tower, Gangaramaya Temple, and enjoy the evening sunset at Galle Face Green.",
    duration: "1 Day",
    locations: ["Lotus Tower", "Galle Face Green", "Pettah Market"],
    price: 50,
    image: "https://i.pinimg.com/1200x/7e/1b/aa/7e1baa0b9aa324c784c27a108bcea403.jpg"
},
{
    title: "Galle Heritage & Coastal Walk",
    description: "Walk through the historic Galle Fort, a UNESCO World Heritage site. Explore Dutch architecture, boutique shops, and the iconic lighthouse.",
    duration: "1 Day",
    locations: ["Galle Fort", "Lighthouse", "Dutch Hospital"],
    price: 80,
    image: "https://i.pinimg.com/736x/42/6a/7c/426a7c600b8958994d16a273773a43b1.jpg"
}
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');
    // Delete existing tours to prevent duplicates
    await Tour.deleteMany({}); 
    // Add new tours
    await Tour.insertMany(dummyTours); 
    console.log('✅ Dummy Tours Added Successfully!');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });