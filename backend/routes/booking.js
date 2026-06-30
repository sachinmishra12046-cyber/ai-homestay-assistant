const express = require("express");
const router = express.Router();
const bookings = [];

router.post("/", (req, res) => {
  const { homestayId, guestName, checkIn, checkOut } = req.body;
  if (!homestayId || !guestName || !checkIn || !checkOut) {
    return res.status(400).json({ success: false, error: "All fields required" });
  }
  const booking = { id: bookings.length + 1, homestayId, guestName, checkIn, checkOut, status: "confirmed" };
  bookings.push(booking);
  res.status(201).json({ success: true, data: booking });
});

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: bookings });
});

module.exports = router;