const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/homestays", require("./routes/stays"));
app.use("/api/bookings", require("./routes/booking"));

app.get("/", (req, res) => {
  res.json({ message: "StayNest API is running!" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 StayNest Backend running on http://localhost:${PORT}`);
});
