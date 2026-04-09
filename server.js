const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const serviceAccount = require("/etc/secrets/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/wpforms", async (req, res) => {
  try {
    if (req.headers['x-api-key'] !== 'MY_SECRET_KEY') {
      return res.status(403).send("Unauthorized");
    }

    const data = req.body;

    await admin.firestore().collection("wpforms_entries").add({
      ...data,
      createdAt: new Date(),
    });

    res.send("Saved");
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Server running"));
