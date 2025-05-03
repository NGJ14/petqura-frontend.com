import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { INIT_STATE } from "../../store/faqManagement/reducer";
import faq from "../../store/faqManagement/reducer";
import FaqModule from "../faqManagement/index";

const renderWithRedux = (
  component,
  { initialState, store = createStore(faq, INIT_STATE) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

afterEach(cleanup);

it("Render Faq List", () => {
  const { getByTestId } = renderWithRedux(<FaqModule />);
  expect(getByTestId("component-faqList")).toBeInTheDocument();
});
