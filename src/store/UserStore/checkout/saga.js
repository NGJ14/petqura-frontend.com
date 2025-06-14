import { call, put, takeLatest } from "redux-saga/effects";
import { add, get } from "../../../helpers/api_helpers";
import {
  addCheckoutPrepaidOrderBegin,
  addCheckoutPrepaidOrderSuccess,
  addCheckoutPrepaidOrderFail,
  getCheckoutPrepaidOrderBegin,
  getCheckoutPrepaidOrderSuccess,
  getCheckoutPrepaidOrderFail,
  addCheckoutCODOrderBegin,
  addCheckoutCODOrderSuccess,
  addCheckoutCODOrderFail,
  getRewardPointsSuccess,
  getRewardPointsBegin,
  getRewardPointsFail,
} from "./action";
import {
  ADD_CHECKOUT_COD_ORDER,
  ADD_CHECKOUT_PREPAID_ORDER,
  GET_CHECKOUT_PREPAID_ORDER,
  GET_REWARD_POINTS,
} from "./actionType";

function* addCheckoutPrepaidOrder(response) {
  try {
    yield put(addCheckoutPrepaidOrderBegin());
    const response1 = yield call(
      add,
      "/complete_prepaid_order",
      response?.payload
    );
    if (response1) {
      yield put(addCheckoutPrepaidOrderSuccess(response1.result));
      response?.closePaytm && response?.closePaytm();
      if (response?.history) {
        response?.history.push({
          pathname: `/store/success/${response1?.result?.order_id}`,
          state: { fromCheckout: true },
        });
      }
      response?.scroll && response?.scroll();
    }
  } catch (error) {
    console.log(error);
    if (response?.history) {
      response?.history.push({
        pathname: `/store-payment/fail`,
        state: { fromCheckout: true },
      });
    }
    yield put(addCheckoutPrepaidOrderFail(error));
  }
}

// function* getCheckoutPrepaidOrder({ data, callback }) {
//   try {
//     yield put(getCheckoutPrepaidOrderBegin());
//     const response = yield call(add, "/cashfree/create-order", data);
//     if (response) {
//       yield put(getCheckoutPrepaidOrderSuccess(response.result));
//       callback &&
//         callback(
//           response?.result?.payment_id,
//           response?.result?.paytm_token,
//           response?.result?.amount
//         );
//     }
//   } catch (error) {
//     yield put(getCheckoutPrepaidOrderFail(error));
//     console.log(error);
//   }
// }

export function* getCheckoutPrepaidOrder({ data, callback }) {
  try {
    yield put(getCheckoutPrepaidOrderBegin());

    // 🔧 call your backend API to create the Cashfree order
    const response = yield call(add, "/cashfree/create-order", data);

    if (response?.response?.payment_session_id) {
      const sessionId = response.response.payment_session_id;

      // ✅ dispatch success action
      yield put(getCheckoutPrepaidOrderSuccess(sessionId));

      // ✅ call the redirect/handler
      if (callback) {
        callback(sessionId); // you can expand this if needed
      }
    } else {
      throw new Error("Missing session ID in response");
    }

  } catch (error) {
    console.error("Cashfree order error:", error);
    yield put(getCheckoutPrepaidOrderFail(error));
  }
}


function* addCheckoutCODOrder({ data, callback }) {
  try {
    yield put(addCheckoutCODOrderBegin());
    const response1 = yield call(add, "/checkout_cod_order", data);
    if (response1) {
      yield put(addCheckoutCODOrderSuccess(response1.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addCheckoutCODOrderFail(error));
  }
}

function* getRewardPoints() {
  try {
    yield put(getRewardPointsBegin());
    const response = yield call(get, "/reward_points");
    if (response) {
      yield put(getRewardPointsSuccess(response.result));
    }
  } catch (error) {
    yield put(getRewardPointsFail(error));
    console.log(error);
  }
}

function* CheckoutSaga() {
  yield takeLatest(ADD_CHECKOUT_PREPAID_ORDER, addCheckoutPrepaidOrder);
  yield takeLatest(GET_CHECKOUT_PREPAID_ORDER, getCheckoutPrepaidOrder);
  yield takeLatest(ADD_CHECKOUT_COD_ORDER, addCheckoutCODOrder);
  yield takeLatest(GET_REWARD_POINTS, getRewardPoints);
}

export default CheckoutSaga;
