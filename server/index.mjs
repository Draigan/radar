import express from "express";
import linkData from "./fetchLinks.mjs";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
  optionsSuccessStatus: 200,
};

let gifLinks = {};

async function fetchAndSetGifLinks() {
  gifLinks = await linkData();

  console.log(Date());
  console.log("Cappi");
  console.log(
    gifLinks.cappi.rainLinks.length,
    " First Rain Link: ",
    gifLinks.cappi.rainLinks[0],
  );
  console.log(
    gifLinks.cappi.snowLinks.length,
    " First Snow Link:",
    gifLinks.cappi.snowLinks[0],
  );
  console.log("Dpqpe");
  console.log(
    gifLinks.dpqpe.rainLinks.length,
    " First Rain Link: ",
    gifLinks.dpqpe.rainLinks[0],
  );
  console.log(
    gifLinks.dpqpe.snowLinks.length,
    " First Snow Link: ",
    gifLinks.dpqpe.snowLinks[0],
  );
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json(gifLinks);
  console.log("Received request for links");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  fetchAndSetGifLinks();
  setInterval(fetchAndSetGifLinks, 30000);
});
