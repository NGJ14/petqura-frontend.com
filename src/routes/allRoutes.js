import React from "react";
import { Redirect } from "react-router-dom";
import CarerDashboard from "../pages/CarerAdminPanel/Seller/Dashboard";
import Product from "../pages/CarerAdminPanel/Seller//productManagement";
import CarerRegister from "../pages/CarerAdminPanel/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AddAddress from "../pages/Profile/Address/addAddress";
import EditAddress from "../pages/Profile/Address/editAddress";
import ViewAddress from "../pages/Profile/Address/viewAddress";
import AddPet from "../pages/Profile/pet/addPet";
import EditPet from "../pages/Profile/pet/editPet";
import PetDetails from "../pages/Profile/pet/petDetails";
import AddProduct from "../pages/CarerAdminPanel/Seller/productManagement/AddProduct";

// import Dashboard from "../pages/dashboard";

import Shop from "../pages/shop";
import ProductDetails from "../pages/shop/productDetails";
import EditProduct from "../pages/CarerAdminPanel/Seller/productManagement/EditProduct";
import CarerProfile from "../pages/CarerAdminPanel/Profile";
import ShopCart from "../pages/shop/shopCart";
import ProfileCompletion from "../pages/CarerAdminPanel/ProfileCompletion";
import AddProductImages from "../pages/CarerAdminPanel/Seller/productManagement/AddProductImages";
import EditVariant from "../pages/CarerAdminPanel/Seller/productManagement/EditVariant";
import AddVariant from "../pages/CarerAdminPanel/Seller/productManagement/AddVariant";
import CarerLogin from "../pages/CarerAdminPanel/Register/login";
import CarerForgotPassword from "../pages/CarerAdminPanel/Register/forgotPassword";
import UnderVerification from "../pages/utils/underVerification";
import ShopCheckout from "../pages/shop/shopCheckout";
import Order from "../pages/CarerAdminPanel/Seller/OrderManagement";
import EditOrder from "../pages/CarerAdminPanel/Seller/OrderManagement/EditOrder";
// import SellerInvoice from "../pages/CarerAdminPanel/Seller/OrderManagement/SellerInvoice";
import SalesReport from "../pages/CarerAdminPanel/Seller/OrderManagement/SalesReport";
import Clinics from "../pages/clinics";
import ClinicDashboard from "../pages/CarerAdminPanel/Clinic/Dashboard";
import Slots from "../pages/CarerAdminPanel/Clinic/SlotManagement";
import AddSlots from "../pages/CarerAdminPanel/Clinic/SlotManagement/AddSlots";
import EditSlot from "../pages/CarerAdminPanel/Clinic/SlotManagement/EditSlot";
import { getLocalStorage } from "../helpers/utils";
import ComingSoon from "../pages/utils/comingSoon";
import BookingPayment from "../pages/clinics/BookingPayment";
import Appointments from "../pages/CarerAdminPanel/Clinic/AppointmentManagement";
import SuccessPage from "../pages/clinics/successPage";
import SuccessShopping from "../pages/shop/successShopping";
import OrderDetails from "../pages/Profile/orders/orderDetails";
import AppointmentDetails from "../pages/Profile/Appointments/AppointmentDetails";
import ClinicDetail from "../pages/clinics/ClinicDetail";
import AddDoctor from "../pages/CarerAdminPanel/Clinic/DoctorManagement/AddDoctor";
import Doctors from "../pages/CarerAdminPanel/Clinic/DoctorManagement";
import EditDoctor from "../pages/CarerAdminPanel/Clinic/DoctorManagement/EditDoctor";
import Services from "../pages/CarerAdminPanel/Clinic/ServiceManagement";
import EditService from "../pages/CarerAdminPanel/Clinic/ServiceManagement/EditService";
import AddService from "../pages/CarerAdminPanel/Clinic/ServiceManagement/AddService";
import AddFeatures from "../pages/CarerAdminPanel/Seller/productManagement/AddFeatures";
import CheckOutAddress from "../pages/shop/CheckOutAddress";
import PageNotFound from "../pages/utils/404";
import EditProductImages from "../pages/CarerAdminPanel/Seller/productManagement/EditImage";
import Invoice from "../pages/shop/invoice";
import Donation from "../pages/Donation";
import EditFeatures from "../pages/CarerAdminPanel/Seller/productManagement/EditFeatures";
import ChangePassword from "../pages/CarerAdminPanel/ChangePassword";
import TermsOfServices from "../pages/Policy/TermsOfServices";
import Cookies from "../pages/Policy/Cookies";
import ShoppingFail from "../pages/shop/Fail";
import FailClinicPage from "../pages/clinics/Fail";
import AboutUs from "../pages/Policy/AboutUs";
import RefundAndCancellation from "../pages/Policy/RefundAndCancellation";
import ContactUs from "../pages/ContactUs";

const auth = getLocalStorage("AUTH_DETAILS");

const userRoutes = [
  // this route should be at the end of all other routes
  { path: "/profile", component: Profile },

  { path: "/viewpets/:id", component: PetDetails },
  { path: "/editpets/:id", component: EditPet },
  { path: "/addPet", component: AddPet },

  { path: "/view-address/:id", component: ViewAddress },
  { path: "/edit-address/:id", component: EditAddress },
  { path: "/add-address", component: AddAddress },

  { path: "/view-order/:id", component: OrderDetails },

  { path: "/view-appointment/:id", component: AppointmentDetails },

  { path: "/cart", component: ShopCart },
  { path: "/checkout/summary/:id", component: ShopCheckout },
  { path: "/checkout/summary/:id/:billingaddressid", component: ShopCheckout },
  { path: "/checkout/address", component: CheckOutAddress },
  { path: "/store/success/:id", component: SuccessShopping },
  { path: "/store-payment/fail", component: ShoppingFail },
  { path: "/clinic-payment/fail", exact: true, component: FailClinicPage },
  { path: "/invoice/:id", component: Invoice },

  { path: "/clinic/payment/:id", component: BookingPayment },
  { path: "/clinic/success/:id", component: SuccessPage },
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },

  { path: "/page-not-found", component: PageNotFound },
];

const authRoutes = [
  { path: "/home", exact: true, component: Home },

  { path: "/terms-of-service", exact: true, component: TermsOfServices },

  { path: "/privacy-policy", exact: true, component: Cookies },

  { path: "/about-us", exact: true, component: AboutUs },

  { path: "/contact-us", exact: true, component: ContactUs },

  {
    path: "/refund-and-cancellation",
    exact: true,
    component: RefundAndCancellation,
  },

  // Shop
  { path: "/store", exact: true, component: Shop },
  { path: "/store-cart", exact: true, component: ShopCart },
  { path: "/product/:id", exact: true, component: ProductDetails },

  // Clinic
  { path: "/clinic", exact: true, component: Clinics },
  { path: "/clinic/:id", component: ClinicDetail },

  // Service
  // { path: "/services", exact: true, component: ComingSoon },

  { path: "/page-not-found", component: PageNotFound },

  { path: "/hands4paws", component: Donation },
];

const carerNonRoutes = [
  { path: "/carer/register", component: CarerRegister },
  { path: "/carer/login", component: CarerLogin },
  { path: "/carer/forgot-password", component: CarerForgotPassword },

  { path: "/page-not-found", component: PageNotFound },
];

const carerAuthRoutes = [
  {
    path: "/carer/",
    exact: true,
    component: () => (
      <Redirect
        to={`/carer/${
          auth?.user?.role == "seller"
            ? "seller"
            : auth?.user?.role == "clinic"
            ? "clinic"
            : "carer"
        }/dashboard`}
      />
    ),
  },
  { path: "/carer/complete-profile", component: ProfileCompletion },
  { path: "/carer/profile", component: CarerProfile },
  { path: "/carer/under-verification", component: UnderVerification },
  { path: "/carer/change-password", component: ChangePassword },

  // Seller
  { path: "/carer/seller/dashboard", component: CarerDashboard },

  { path: "/carer/seller/sales-report", component: SalesReport },

  { path: "/carer/seller/order-management", component: Order },
  { path: "/carer/seller/order-edit/placed/:id", component: EditOrder },
  { path: "/carer/seller/order-edit/completed/:id", component: EditOrder },
  { path: "/carer/seller/order-edit/shipped/:id", component: EditOrder },

  { path: "/carer/seller/product-management", component: Product },

  { path: "/carer/seller/product-addNew", component: AddProduct },
  { path: "/carer/seller/product-variant-addNew/:id", component: AddVariant },
  { path: "/carer/seller/product-image-add/:id", component: AddProductImages },
  { path: "/carer/seller/product-addFeatures/:id", component: AddFeatures },

  { path: "/carer/seller/product-edit/:id", component: EditProduct },
  { path: "/carer/seller/product-editFeatures/:id", component: EditFeatures },
  {
    path: "/carer/seller/product-image-edit/:id",
    component: EditProductImages,
  },
  { path: "/carer/seller/product-variant-edit/:id", component: EditVariant },
  { path: "/carer/invoice/:id", component: Invoice },
  // {
  //   path: "/carer/seller",
  //   exact: true,
  //   component: () => <Redirect to="/carer/seller/dashboard" />,
  // },

  //Clinic

  { path: "/carer/clinic/dashboard", component: ClinicDashboard },

  { path: "/carer/clinic/slots", component: Slots },
  { path: "/carer/clinic/add-slot", component: AddSlots },
  { path: "/carer/clinic/slot-edit/:id", component: EditSlot },

  { path: "/carer/clinic/appointments", component: Appointments },

  { path: "/carer/clinic/add-doctor", component: AddDoctor },
  { path: "/carer/clinic/doctor-edit/:id", component: EditDoctor },
  { path: "/carer/clinic/doctors", component: Doctors },

  { path: "/carer/clinic/add-service", component: AddService },
  { path: "/carer/clinic/service-edit/:id", component: EditService },
  { path: "/carer/clinic/services", component: Services },

  // { path: "/page-not-found", component: PageNotFound },
];

export { userRoutes, authRoutes, carerNonRoutes, carerAuthRoutes };
