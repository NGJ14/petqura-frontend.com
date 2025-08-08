// src/analytics.js
import ReactGA from 'react-ga4';

// Your GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-CJ5BNXGKSK'; // ✅ Replace with your actual ID

// Initialize GA
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// Send pageview manually
export const trackPageView = (url) => {
  ReactGA.send({ hitType: 'pageview', page: url });
};

// Custom event example
export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({ category, action, label, value });
};
