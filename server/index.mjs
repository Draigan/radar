import express from "express";
import linkData from "./fetchLinks.mjs";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5174",
  optionsSuccessStatus: 200,
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function setGetLinks() {
  const gifLinks = await linkData();

  app.get("/", cors(corsOptions), (req, res) => {
    res.json(gifLinks);
  });
}

setGetLinks();
