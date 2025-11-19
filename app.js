// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Mock data - can be easily extended!
const topics = [
  {
    name: "Business",
    desc: "Grow your entrepreneurial mindset with modern skills.",
    subtopics: [
      { name: "Digital Marketing", expert: "Sanjana Joshi", initials: "SJ", price: "599", desc: "Master social media, SEO, and campaigns. 72 days course" },
      { name: "Management", expert: "Arun Mehta", initials: "AM", price: "499", desc: "Lead teams, projects, and products. 60 days course" },
      { name: "Analytics", expert: "Praveen Kumar", initials: "PK", price: "699", desc: "Turn data into growth strategies.  70 days course" }
    ]
  },
  {
    name: "Trading",
    desc: "Achieve financial freedom and market expertise.",
    subtopics: [
      { name: "Stock Market", expert: "Vinay Rao", initials: "VR", price: "699", desc: "Beginners to advanced strategies.  72 days course" },
      { name: "Crypto", expert: "Shreya Patil", initials: "SP", price: "799", desc: "Blockchain, coins, DeFi investing.  90 days course" }
    ]
  },
  {
    name: "Design",
    desc: "Create visuals that connect and inspire.",
    subtopics: [
      { name: "UI/UX", expert: "Rohan Gupta", initials: "RG", price: "999", desc: "Design products users love,  102 days course" },
      { name: "Graphic Design", expert: "Manvi Jain", initials: "MJ", price: "459", desc: "Branding, illustration, and more , 92 days course" }
    ]
  },
  {
    name: "Freelancer",
    desc: "Launch your career with real client work.",
    subtopics: [
      { name: "Platforms", expert: "Sneha Das", initials: "SD", price: "899", desc: "Upwork, Fiverr, find top gigs,  80 days course" }
    ]
  },
  {
    name: "Film making",
    desc: "Unlock your creativity and productivity.",
    subtopics: [
      { name: "film making", expert: "Abhay S.", initials: "AS", price: "999", desc: "Techniques for effective life balance. 72 days course" },
      { name: "short film", expert: "Rekha S.", initials: "RS", price: "599", desc: "Reduce stress, improve focus.  72 days course" }
    ]
  }
];

// Testimonials & Flash messages
const testimonials = [
  { name: "Ria", msg: "GuidanceX changed my career path—loved the UI/UX course!", avatar: "🧑‍💻" },
  { name: "Rahul", msg: "Trading course was hands-on and easy, highly recommend.", avatar: "📈" },
  { name: "Anjali", msg: "Mentors are top-notch! Got my first freelance client after learning here.", avatar: "🎨" }
];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Flash message
let flashMsg = null;

app.get("/", (req, res) => res.render("index", { testimonials }));
app.get("/login", (req, res) => res.render("login", { error: null }));
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "charan" && password === "srm123") {
    flashMsg = "Welcome back, Charan!";
    res.redirect("/welcome");
  } else {
    res.render("login", { error: "Invalid login. Try again!" });
  }
});
app.get("/welcome", (req, res) => {
  const msg = flashMsg;
  flashMsg = null;
  res.render("welcome", { msg });
});
app.get("/topics", (req, res) => res.render("topics", { topics }));
app.get("/topic/:topic", (req, res) => {
  const topicObj = topics.find(t => t.name.toLowerCase() === req.params.topic.toLowerCase());
  if (!topicObj) return res.send("Topic not found");
  res.render("subtopic", { topic: topicObj.name, desc: topicObj.desc, subtopics: topicObj.subtopics });
});




// The Express route to render course details dynamically
app.get('/course/:topic/:subtopic', (req, res) => {
  const { topic, subtopic } = req.params;

  if(coursesData[topic] && coursesData[topic][subtopic]) {
    const course = {...coursesData[topic][subtopic], topicName: topic};
    res.render('course', { course });
  } else {
    res.status(404).send('Course not found');
  }
});

const coursesData = {
  business: {
    marketing: {
      name: "Marketing Mastery",
      expertName: "Alice Johnson",
      expertPhoto: "/images/experts/alice_johnson.jpg",
      duration: 30,
      price: 4000,
      description: "Master modern marketing techniques with digital channels and branding."
    },
    finance: {
      name: "Finance Foundations",
      expertName: "Bob Lee",
      expertPhoto: "/images/experts/bob_lee.jpg",
      duration: 25,
      price: 3500,
      description: "Understand financial principles, planning, and investment strategies."
    },
    analytics: {
      name: "Business Analytics",
      expertName: "Catherine Green",
      expertPhoto: "/images/experts/catherine_green.jpg",
      duration: 35,
      price: 4200,
      description: "Learn data analytics and visualization for better business decisions."
    }
  },
  // Add other topics with subtopics similarly
};



// Example course data for subtopics in topics

// The Express route to render course details dynamically




  

const toUrlKey = str => str.toLowerCase().replace(/\s+/g, '');



app.get("/buy/:topic/:subtopic", (req, res) => {
  const topicObj = topics.find(t => t.name.toLowerCase() === req.params.topic.toLowerCase());
  if (!topicObj) return res.send("Topic not found");
  const subtopicObj = topicObj.subtopics.find(s => s.name.toLowerCase() === req.params.subtopic.toLowerCase());
  if (!subtopicObj) return res.send("Subtopic not found");
  res.render("payment", { course: subtopicObj });
});
app.post("/payment", (req, res) => {
  flashMsg = "Payment successful! You are enrolled. 🚀";
  res.redirect("/success");
});
app.get('/payment/:topic/:course', (req, res) => {
  // You can handle payment logic or integrate a gateway here
  res.send("Payment page for " + req.params.course);
});

app.get("/success", (req, res) => {
  const msg = flashMsg;
  flashMsg = null;
  res.render("success", { msg });
});

app.get('/payment/:topic/:course', (req, res) => {
  const topic = req.params.topic.toLowerCase();
  const courseName = req.params.course.toLowerCase().replace(/\s+/g, '');
  if (coursesData[topic] && coursesData[topic][courseName]) {
    const course = coursesData[topic][courseName];
    res.render('payment', { course });
  } else {
    res.status(404).send('Course not found');
  }
});


app.get('/about', (req, res) => res.render('about'));
app.get('/help', (req, res) => {
  res.render('help');
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/buy/:topic/:subtopic", (req, res) => {
  const topicObj = topics.find(t => t.name.toLowerCase() === req.params.topic.toLowerCase());
  if (!topicObj) return res.send("Topic not found");
  const subtopicObj = topicObj.subtopics.find(s => s.name.toLowerCase() === req.params.subtopic.toLowerCase());
  if (!subtopicObj) return res.send("Subtopic not found");
  res.render("payment", { course: subtopicObj });
});

app.get("/buy/:topic/:subtopic", (req, res) => {
  // finds course and renders payment.ejs with correct details
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
