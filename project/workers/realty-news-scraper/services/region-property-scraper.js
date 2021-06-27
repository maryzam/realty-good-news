require('dotenv').config();
const fetch = require("node-fetch");

const getRegionProperties = async ({ region }) => {
    if (!region || !region.length) {
        throw new Error($`Region is missing!`);
    }

    const request = {
        polylines:[ region ],
        limit:1000,
        display_rentals:false,
        for_rent:false,
        for_sale:true,
        just_sold:true,
        off_market:true,
        sort:{ order:"date", direction:"asc" },
        off_market_max: 2000000
    };

    const response = await fetch(
      process.env.REALTY_API_REGION_PROPERTIES, {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,ru;q=0.8",
          "content-type": "application/json",
          "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrer: process.env.REALTY_SOURCE_DATA_REFERRER,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(request),
        method: "POST",
        mode: "cors"
      });

      const data = await response.json();
      return data.map_items.filter((item) => !item.featured_at);

}

module.exports = { getRegionProperties };