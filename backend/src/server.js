const express = require("express");
const cors = require("cors");

const groceryRoutes = require("./routes/groceryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "homesync-backend" });
});

// Grocery routes
app.use("/api/items", groceryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ HomeSync backend running on http://localhost:${PORT}`);
});
