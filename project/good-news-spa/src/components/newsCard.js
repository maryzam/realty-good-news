import React from 'react';
import PropertyGallery from "./gallery";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getMonth = (date) => (monthNames[date.getMonth()]); 
const getPropertyType = (info) => {
  if (info.land_use.indexOf('_') < 0) {
    return info.land_use;
  } 
  if (info.land_use.startsWith('home') && info.land_area === 0) {
    return 'home';
  }
  return info.land_use.replace('_', ' ');
}

const getPrice = (info) => {
  const confidencePrefix = info.is_accurate_price ? '' : 'about ';
  const price = info.price > 1000000
    ? `$${(info.price / 1000000)}M`
    : `$${info.price / 1000}K`
  return `${confidencePrefix}${price}`;
};

const getPropertyDescription = ({ 
  num_bedrooms, 
  num_bathrooms,
  floor_area,
  land_area,
  price,
  estimated_value
 }) => {
   const bedrooms = `${num_bedrooms} bedroom${num_bedrooms > 1 ? 's' : ''}`;
   const bathrooms = `${num_bathrooms} bathroom${num_bathrooms > 1 ? 's' : ''}`;
   let description = `This lovely place has ${bedrooms} and ${bathrooms}.`;
   description += ` The floor area is about ${floor_area} sq meters in total.`
   description += (floor_area < 70) ? 
    ' Yeah, not the largest place, but so cozy and easy to warm up in winters!' :
    ' Quite spacious place, isn\'t it? There are plenty of space for everyone!';
    if (estimated_value > price) {
      const discount = (estimated_value - price) / 1000;
      description += ` Btw, it was sold for $${discount}K less than estimated price! 🎉`
    }
    return description;
 }

const NewsCard = ({ news }) => {
  const propertyType = getPropertyType(news);
  const month = getMonth(new Date(news.sold_on));
  const price = getPrice(news); 
  const detailsUrl = `https://homes.co.nz/address${news.url}`;
  const propertyDescription = getPropertyDescription(news);
  return (
      <div>
        <div>
            <p>Just look at this nice <a href={detailsUrl} target="_blank">{news.num_bedrooms}-bedroom {propertyType}</a> in {news.suburb}.</p>
            <p className={ "description"}>
              { propertyDescription }
            </p>
        </div>
        <PropertyGallery images={news.images}/>
        <div>
          <p>Someone bought it for <strong>{price}</strong> in <strong>{month}</strong> this year.</p>
          <p>🍀 So, you'll be able to do it as well! 🍀</p>
        </div>
      </div>
    );
} 

export default NewsCard;