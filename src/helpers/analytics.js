// src/analytics.js
import ReactGA from 'react-ga4';

// Your GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-CJ5BNXGKSK'; // ✅ Replace with your actual ID

// Initialize GA
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID
  //   ,{ 
  //   gaOptions: {
  //     debug_mode: true,
  //   },
  //   gtagOptions: {
  //     debug_mode: true,
  //   },
  // }
);
  
};

// Send pageview manually
export const trackPageView = (url) => {
  ReactGA.send({ hitType: 'pageview', page: url });
};

// Custom event example
export const trackEvent = ({ category, action, label, value }) => {
  console.log(`Sending analytics for ${category}: ${action} -- ${label}`);
  
  ReactGA.event({ category, action, label, value });
};
export const trackAddToCart = (itemName,price,quantity) => {
  console.log("GA4 Add to Cart event sent:", { itemName, price, quantity });
  ReactGA.event('add_to_cart', {
    currency: 'INR', // or your currency code, e.g., 'INR'
    value: price,        // total value of the item(s) added
    items: [
      {
        item_name: itemName,
        price: price,
        quantity: quantity
      }
    ]
  });
};