// const express = require("express");
// const admin = require("firebase-admin");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// app.get("/", (req, res) => {
//   res.send("API running");
// });

// app.post("/wpforms", async (req, res) => {
//   try {
//     if (req.headers['x-api-key'] !== 'MY_SECRET_KEY') {
//       return res.status(403).send("Unauthorized");
//     }

//     const data = req.body;

//     await admin.firestore().collection("wpforms_entries").add({
//       ...data,
//       createdAt: new Date(),
//     });

//     res.send("Saved");
//   } catch (err) {
//     res.status(500).send(err.toString());
//   }
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on ${PORT}`);
// });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cloud Run works");
});

app.get("/test", (req, res) => {
  res.json({
    success: true
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on ${PORT}`);
});