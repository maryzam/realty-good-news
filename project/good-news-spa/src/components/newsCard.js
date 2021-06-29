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
}

const NewsCard = ({ news }) => {
  const propertyType = getPropertyType(news);
  const month = getMonth(new Date(news.sold_on));
  const price = getPrice(news); 
  const detailsUrl = `https://homes.co.nz/address${news.url}`
  return (
      <div>
        <div>
            <p>Look at this nice <a href={detailsUrl} target="_blank">{news.num_bedrooms}-bedroom {propertyType}</a> in {news.suburb}.</p>
            <p>Someone bought it for <strong>{price}</strong> in <strong>{month}</strong> this year.</p>
        </div>
        <PropertyGallery images={news.images}/>
        <div>
          <p>🍀 So, you'll be able to do it as well! 🍀</p>
        </div>
      </div>
    );
} 

export default NewsCard;