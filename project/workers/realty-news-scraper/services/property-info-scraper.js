require('dotenv').config();
const fetch = require('node-fetch');

const headers = {
  "accept": "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9,ru;q=0.8",
  "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
  "sec-ch-ua-mobile": "?0",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
};

const getJsonData = async (endpoint) => {
  const response = await fetch(endpoint, {
    headers: headers,
    "referrer": process.env.REALTY_SOURCE_DATA_REFERRER,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

  return await response.json();
};

const getPropertyInfo = async ({ home }) => {
  
  const propertyDetails = await getPropertyDetails({ property_id: home.id });
  const latestSale = await getLatestPropertySale({ property_id: home.id });
  
  const fullInfo = Object.assign({
      id: home.id,
      state: home.state,
      point: home.point,
      price: home.price,
      display_price_short: home.display_price_short,
      url: home.url,
    },
    propertyDetails,
    latestSale);
  
  return fullInfo;
};

const getPropertyDetails = async ({ property_id }) => {
  const endpoint = `${process.env.REALTY_API_PROPERTY_DETAILS}?property_id=${property_id}`
  const data = await getJsonData(endpoint);
  const property = data.property;
  
  return {
		num_bathrooms: property.num_bathrooms || property.bath_estimate,
		num_bedrooms: property.num_bedrooms || property.bed_estimate,
    num_car_spaces: property.num_car_spaces,
		decade_built: property.decade_built,
		building_construction: property.building_construction,
		building_condition: property.building_condition,
		floor_area: property.floor_area,
		land_area: property.land_area,
    mass_total_living_area: property.mass_total_living_area,
		legal_description: property.legal_description,
		view_type: property.view_type,
		view_scope: property.view_scope,
		zone: property.zone,
		contour: property.contour,
		land_use: property.land_use,
		capital_value: property.capital_value,
		improvement_value: property.improvement_value,
		land_value: property.land_value,
		current_revision_date: property.current_revision_date,
		estimated_lower_value: property.estimated_lower_value,
		estimated_upper_value: property.estimated_upper_value,
		estimated_value: property.estimated_value,
		estimated_rental_lower_value: property.estimated_rental_lower_value,
		estimated_rental_upper_value: property.estimated_rental_upper_value,
		suburb_name: property.suburb_name,
		city_name: property.city_name,
		image_urls: property.image_urls,
  } 
};

const getLatestPropertySale = async ({ property_id }) => {
  const endpoint = `${process.env.REALTY_API_PROPERTY}/${property_id}/timeline`
  const data = await getJsonData(endpoint);

  const saleEvents = data.events.filter((event) => (event.key === 'property_sale'))
  
  if (saleEvents.length < 1) {
    console.warn(`Property ${property_id} doesn't have any sale records at all!`)
    return { sale_type: 'none' };
  } 

  const saleInfo = saleEvents[0].data;
  return {
    sale_type: saleInfo.sale_type,
    price_on: saleInfo.price_on,
    price: saleInfo.price,
    display_price: saleInfo.display_price,
    council_confirmed: saleInfo.council_confirmed
  }
};

module.exports = { getPropertyInfo };