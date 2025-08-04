require("dotenv").config();
const express = require("express");
const { exec } = require("child_process");
const hre = require("hardhat");
const { deployGBT } = require("./deploy");

const app = express();
app.use(express.json());

app.post("/deploy", async (req, res) => {
  try {
    const { priceFeed } = req.body;
    if (!priceFeed) return res.status(400).json({ error: "Missing priceFeed" });

    const contractAddress = await deployGBT(priceFeed);
    res.json({ success: true, contractAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Deployment failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server live at http://localhost:${PORT}`);
});
