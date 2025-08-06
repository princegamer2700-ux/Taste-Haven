import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Serve static files from React build
app.use(express.static(path.join(__dirname, "client/dist")));

// Your API routes here...
// app.get("/api", (req, res) => { ... })

// All other routes → React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});