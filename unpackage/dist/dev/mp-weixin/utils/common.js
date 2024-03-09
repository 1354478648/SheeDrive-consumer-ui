"use strict";
const formatPrice = (price) => {
  const formattedPrice = parseFloat(price).toFixed(2);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const priceWithCommas = formattedPrice.replace(regex, ",");
  return "￥" + priceWithCommas;
};
const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
};
const calculateDistance = (userLongitude, userLatitude, targetLongitude, targetLatitude) => {
  const earthRadiusKm = 6371;
  const userLongitudeRad = degreesToRadians(userLongitude);
  const userLatitudeRad = degreesToRadians(userLatitude);
  const targetLongitudeRad = degreesToRadians(targetLongitude);
  const targetLatitudeRad = degreesToRadians(targetLatitude);
  const deltaLongitude = targetLongitudeRad - userLongitudeRad;
  const deltaLatitude = targetLatitudeRad - userLatitudeRad;
  const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) + Math.cos(userLatitudeRad) * Math.cos(targetLatitudeRad) * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;
  return distance;
};
exports.calculateDistance = calculateDistance;
exports.formatPrice = formatPrice;
