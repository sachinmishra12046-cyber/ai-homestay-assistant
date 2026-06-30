// backend/controllers/homestayController.js
const homestays = require("../data/homestays");

// GET /api/homestays
const getAllHomestays = (req, res) => {
  try {
    res.status(200).json({ success: true, count: homestays.length, data: homestays });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// GET /api/homestays/search?q=
const searchHomestays = (req, res) => {
  try {
    const q = req.query.q?.toLowerCase() || "";
    const results = homestays.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q)
    );
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// GET /api/homestays/:id
const getHomestayById = (req, res) => {
  try {
    const homestay = homestays.find((h) => h.id === parseInt(req.params.id));
    if (!homestay) return res.status(404).json({ success: false, error: "Homestay not found" });
    res.status(200).json({ success: true, data: homestay });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// POST /api/homestays
const createHomestay = (req, res) => {
  try {
    const { title, location, price, category, amenities } = req.body;
    if (!title || !location || !price || !category) {
      return res.status(400).json({ success: false, error: "title, location, price, category are required" });
    }
    const newHomestay = {
      id: homestays.length + 1,
      title,
      location,
      price,
      rating: 0,
      reviews: 0,
      category,
      amenities: amenities || [],
      available: true,
    };
    homestays.push(newHomestay);
    res.status(201).json({ success: true, data: newHomestay });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// PUT /api/homestays/:id
const updateHomestay = (req, res) => {
  try {
    const index = homestays.findIndex((h) => h.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, error: "Homestay not found" });
    homestays[index] = { ...homestays[index], ...req.body };
    res.status(200).json({ success: true, data: homestays[index] });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// DELETE /api/homestays/:id
const deleteHomestay = (req, res) => {
  try {
    const index = homestays.findIndex((h) => h.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, error: "Homestay not found" });
    homestays.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = {
  getAllHomestays,
  searchHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
};