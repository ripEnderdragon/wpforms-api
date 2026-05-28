const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

console.log("Starting server...");

const app = express();

app.use(cors());
app.use(express.json());

try {
  admin.initializeApp();
  console.log("Firebase initialized");
} catch (err) {
  console.error("Firebase initialization failed:", err);
}

app.get("/", (req, res) => {
  res.send("Cloud Run works");
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.post("/wpforms", async (req, res) => {
  try {

    if (req.headers["x-api-key"] !== process.env.API_KEY) {
      return res.status(403).send("Unauthorized");
    }

    const payload = req.body;

    await admin.firestore().collection("wpforms_entries").add({
      form_id: payload.form_id,
      entry_id: payload.entry_id,
      data: payload.data,
      createdAt: new Date(),
    });

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.toString()
    });

  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});