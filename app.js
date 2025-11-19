// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Mock data
const topics = [
  {
    name: "Business",
    desc: "Grow your entrepreneurial mindset with modern skills.",
    subtopics: [
      { name: "Digital Marketing", expert: "Sanjana Joshi", initials: "SJ", price: "599", desc: "Master social media, SEO, and campaigns. 72 days course" },
      { name: "Management", expert: "Arun Mehta", initials: "AM", price: "499", desc: "Lead teams, projects, and products. 60 days course" },
      { name: "Analytics", expert: "Praveen Kumar", initials: "PK", price: "699", desc: "Turn data into growth strategies. 70 days course" }
    ]
  },
  {
    name: "Trading",
    desc: "Achieve financial freedom and market expertise.",
    subtopics: [
      { name: "Stock Market", expert: "Vinay Rao", initials: "VR", price: "699", desc: "Beginners to advanced strategies. 72 days course" },
      { name: "Crypto", expert: "Shreya Patil", initials: "SP", price: "799", desc: "Blockchain, coins, DeFi investing. 90 days course" }
    ]
  },
  {
    name: "Design",
    desc: "Create visuals that connect and inspire.",
    subtopics: [
      { name: "UI/UX", expert: "Rohan Gupta", initials: "RG", price: "999", desc: "Design products users love. 102 days course" },
      { name: "Graphic Design", expert: "Manvi Jain", initials: "MJ", price: "459", desc: "Branding, illustration, and more. 92 days course" }
    ]
  },
  {
    name: "Freelancer",
    desc: "Launch your career with real client work.",
    subtopics: [
      { name: "Platforms", expert: "Sneha Das", initials: "SD", price: "899", desc: "Upwork, Fiverr, find top gigs. 80 days course" }
    ]
  },
  {
    name: "Film making",
    desc: "Unlock your creativity and productivity.",
    subtopics: [
      { name: "film making", expert: "Abhay S.", initials: "AS", price: "999", desc: "Techniques for effective life balance. 72 days course" },
      { name: "short film", expert: "Rekha S.", initials: "RS", price: "599", desc: "Reduce stress, improve focus. 72 days course" }
    ]
  }
];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/topic/:topic", (req, res) => {
  const topicObj = topics.find(t => t.name.toLowerCase() === req.params.topic.toLowerCase());
  if (!topicObj) return res.send("Topic not found");
  res.render("subtopic", { topic: topicObj.name, desc: topicObj.desc, subtopics: topicObj.subtopics });
});

// Course detail page for every subtopic
app.get('/course/:topic/:subtopic', (req, res) => {
  const topicObj = topics.find(t => t.name.toLowerCase() === req.params.topic.toLowerCase());
  if (!topicObj) return res.send("Topic not found");
  const subtopicObj = topicObj.subtopics.find(s => s.name.toLowerCase() === req.params.subtopic.toLowerCase());
  if (!subtopicObj) return res.send("Subtopic not found");
  res.render('details', { course: subtopicObj, topic: req.params.topic });
});

// Payment page, with correct details for every course
app.get("/buy/:topic/:subtopic", (req, res) => {
  const topicObj = topics.find(t => t.name.toLowerCase() === req.params.topic.toLowerCase());
  if (!topicObj) return res.send("Topic not found");
  const subtopicObj = topicObj.subtopics.find(s => s.name.toLowerCase() === req.params.subtopic.toLowerCase());
  if (!subtopicObj) return res.send("Subtopic not found");
  res.render("payment", { course: subtopicObj, topic: req.params.topic });
});

// Add your other routes for index, about, help, etc. below

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
