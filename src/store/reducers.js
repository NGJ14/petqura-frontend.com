import { combineReducers } from "redux";
import Register from "./UserRegister/reducer";
import Login from "./UserStore/Login/reducer";
import Profile from "./UserStore/Profile/reducer";
import Pet from "./UserStore/Pet/reducer";
import Product from "./serviceProvider/Seller/reducer";
import Address from "./UserStore/Address/reducer";
import Carer from "./carer/reducer";
import Shop from "./UserStore/Shop/reducer";
import CarerRegister from "./CarerRegister/reducer";
import Cart from "./UserStore/Cart/reducer";
import Coupon from "./UserStore/Coupon/reducer";
import Checkout from "./UserStore/checkout/reducer";
import Reviews from "./UserStore/Reviews/reducer";
import Order from "./serviceProvider/Seller/orders/reducer";
import Guest from "./UserStore/Guest/reducer";
import Slot from "./serviceProvider/Clinic/reducer";
import Clinic from "./UserStore/Clinic/reducer";
import UserOrder from "./UserStore/UserOrders/reducer";
import Appointment from "./UserStore/Appointments/reducer";
import Delivery from "./UserStore/delivery/reducer";
import ContactUs from "./UserStore/ContactUs/reducer";
import Donation from "./UserStore/donation/reducer";
import AdImage from "./UserStore/AdImage/reducer";
import PageContent from "./UserStore/PageContent/reducer";

const rootReducer = combineReducers({
  Register,
  Login,
  Profile,
  Pet,
  Address,
  Product,
  Carer,
  Shop,
  CarerRegister,
  Cart,
  Coupon,
  Checkout,
  Reviews,
  Order,
  Guest,
  Slot,
  Clinic,
  UserOrder,
  Appointment,
  Delivery,
  ContactUs,
  Donation,
  AdImage,
  PageContent,
});

export default rootReducer;
