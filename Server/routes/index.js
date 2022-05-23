const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Working like charm <3" }).status(200);
});

module.exports = router;