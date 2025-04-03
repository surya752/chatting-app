// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// app.get("/avatar/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await axios.get(`https://api.multiavatar.com/${id}.svg`, {
//       responseType: "text", // Ensures SVG format
//     });

//     res.setHeader("Content-Type", "image/svg+xml");
//     res.send(response.data);
//   } catch (error) {
//     console.error("Error fetching avatar:", error);
//     res.status(500).send("Error fetching avatar");
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
