import { all, fork } from "redux-saga/effects";
import AddressSaga from "./UserStore/Address/saga";
import LoginUserSaga from "./UserStore/Login/saga";
import PetSaga from "./UserStore//Pet/saga";
import ProfileSaga from "./UserStore//Profile/saga";
import RegisterSaga from "./UserRegister/saga";
import ProductSaga from "./serviceProvider/Seller/saga";
import CarerSaga from "./carer/saga";
import ShopSaga from "./UserStore//Shop/saga";
import RegisterCarerSaga from "./CarerRegister/saga";
import CartSaga from "./UserStore//Cart/saga";
import CouponSaga from "./UserStore//Coupon/saga";
import CheckoutSaga from "./UserStore//checkout/saga";
import ReviewsSaga from "./UserStore//Reviews/saga";
import GuestSaga from "./UserStore/Guest/saga";
import OrderSaga from "./serviceProvider/Seller/orders/saga";
import SlotSaga from "./serviceProvider/Clinic/saga";
import ClinicSaga from "./UserStore/Clinic/saga";
import UserOrderSaga from "./UserStore/UserOrders/saga";
import AppointmentSaga from "./UserStore/Appointments/saga";
import DeliverySaga from "./UserStore/delivery/saga";
import ContactUsSaga from "./UserStore/ContactUs/saga";
import DonationSaga from "./UserStore/donation/saga";
import ADIMAGESaga from "./UserStore/AdImage/saga";
import PAGESaga from "./UserStore/PageContent/saga";

export default function* rootSaga() {
  yield all([
    fork(RegisterSaga),
    fork(LoginUserSaga),
    fork(ProfileSaga),
    fork(PetSaga),
    fork(AddressSaga),
    fork(ProductSaga),
    fork(CarerSaga),
    fork(ShopSaga),
    fork(RegisterCarerSaga),
    fork(CartSaga),
    fork(CouponSaga),
    fork(CheckoutSaga),
    fork(ReviewsSaga),
    fork(ReviewsSaga),
    fork(OrderSaga),
    fork(GuestSaga),
    fork(SlotSaga),
    fork(ClinicSaga),
    fork(UserOrderSaga),
    fork(AppointmentSaga),
    fork(DeliverySaga),
    fork(ContactUsSaga),
    fork(DonationSaga),
    fork(ADIMAGESaga),
    fork(PAGESaga),
  ]);
}
