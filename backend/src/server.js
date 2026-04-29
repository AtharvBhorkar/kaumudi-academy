import express from "express";
import cors from "cors";
import http from "http";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

const dummyCourses = [
  {
    id: 1,
    title: "Beginner Sanskrit",
    description: "Start with Devanagari and core vocabulary.",
    price: 999,
    level: "Beginner",
    duration: "6 weeks",
    image: { url: "" },
    category: "Sanskrit",
  },
  {
    id: 2,
    title: "Panini Grammar Mastery",
    description: "Dive deep into the Ashtadhyayi.",
    price: 1499,
    level: "Premium",
    duration: "12 weeks",
    image: { url: "" },
    category: "Grammar",
  },
  {
    id: 3,
    title: "Spoken Sanskrit",
    description: "Practice live conversations.",
    price: 1299,
    level: "Interactive",
    duration: "8 weeks",
    image: { url: "" },
    category: "Speaking",
  },
];

// All courses
app.get("/course", (req, res) => res.json(dummyCourses));
app.get("/api/course", (req, res) => res.json(dummyCourses));

// Single course
app.get("/course/:id", (req, res) => {
  const course = dummyCourses.find(c => c.id === parseInt(req.params.id)) || dummyCourses[0];
  res.json(course);
});

// Progress
app.get("/progress/:id", (req, res) => {
  res.json({ progress: 0, completed: false });
});
app.post("/progress/update", (req, res) => {
  res.json({ success: true });
});

// Auth
app.post("/auth/login", (req, res) => {
  res.json({ token: "dummy-token", role: req.body.role });
});
app.post("/auth/student/register", (req, res) => {
  res.json({ success: true, message: "Registered!" });
});

// Enrollment
app.get("/enrollment/my", (req, res) => res.json([]));
app.get("/enrollment/check/:id", (req, res) => {
  res.json({ enrolled: false });
});

// Profile
app.get("/profile/me", (req, res) => {
  res.json({ name: "Test User", email: "test@test.com" });
});
app.get("/profile/stats", (req, res) => {
  res.json({ totalCourses: 0, completed: 0 });
});
app.get("/profile/enrollments", (req, res) => res.json([]));

// Testimonials
app.get("/testimonial", (req, res) => res.json([]));

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});