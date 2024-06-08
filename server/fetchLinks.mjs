import fetch from "node-fetch";
import cheerio from "cheerio";

async function fetchGifLinks(url) {
  try {
    // Perform the GET request
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `Failed to retrieve the webpage. Status code: ${response.status}`,
      );
    }

    // Get the response text (HTML content)
    const htmlText = await response.text();

    // Parse the HTML content using Cheerio
    const $ = cheerio.load(htmlText);
    const gifLinks = [];
    const snowLinks = [];
    const rainLinks = [];

    // Find all the links to GIF files
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      // Put all the links into gifLinks
      if (href && href.endsWith(".gif")) {
        gifLinks.push(href);
      }
      // Put all the links that include SNOW and dont include A11Y
      if (href && href.includes("SNOW") && !href.includes("A11Y")) {
        snowLinks.push(href);
      }
      // Put all the links that include SNOW and dont include A11Y
      if (href && href.includes("RAIN") && !href.includes("A11Y")) {
        rainLinks.push(href);
      }
      if (
        href &&
        href.includes("Snow") &&
        !href.includes("A11Y") &&
        !href.includes("Contingency")
      ) {
        snowLinks.push(href);
      }
      // Put all the links that include SNOW and dont include A11Y
      if (
        href &&
        href.includes("Rain") &&
        !href.includes("A11Y") &&
        !href.includes("Contingency")
      ) {
        rainLinks.push(href);
      }
    });

    // console.log(snowLinks);
    return { snowLinks: snowLinks, rainLinks: rainLinks };
    // Print the list of GIF files
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Get the data for cappi and dpqpe and compile it into an object
export default async function linkData() {
  const cappi = await fetchGifLinks(
    "https://dd.meteo.gc.ca/radar/CAPPI/GIF/CASKR/",
  );
  const dpqpe = await fetchGifLinks(
    "https://dd.meteo.gc.ca/radar/DPQPE/GIF/CASKR/",
  );
  return {
    dpqpe: dpqpe,
    cappi: cappi,
  };
}
