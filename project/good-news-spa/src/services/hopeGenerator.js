import dbClient from "../dbclient/dbconfig";

const getRandomInt = (max) => (Math.floor(Math.random() * max));

const getGoodNews = async({
    suburb = 'Parnell',
    max_price = 20000000,
    property_type,
    min_floor_area = 60,
    min_bedrooms = 2,
    min_bathrooms = 1
}) => {

    const nearDate = new Date();
    const mm = nearDate.getMonth(); // a month ago
    const yy = nearDate.getFullYear();
    const closeEnoughDate = `${yy}-${mm}-%`;

    const query = `select * from good_news_schema.property_details where suburb_name = '${suburb}' and price_on LIKE '2021-%'`;
    try {
        const response = await dbClient.query(query)
        let bestNews = response.data
        .filter(property => (property.floor_area > 0))
        .map((property) => ({
          property_id: property.id,
          sold_on: Date.parse(property.price_on),
          price: property.price || property.estimated_value,
          estimated_value: property.estimated_value,
          is_accurate_price: !!property.price,
          land_use: property.land_use,
          num_bedrooms: property.num_bedrooms,
          num_bathrooms: property.num_bathrooms,
          images: property.image_urls,
          floor_area: property.floor_area,
          land_area: property.land_area,
          url: property.url,
          suburb: property.suburb_name
        }));
        
        return bestNews[getRandomInt(bestNews.length)];
      } catch(err) {
        console.log(err);
      }
};

export default {
    getGoodNews
};