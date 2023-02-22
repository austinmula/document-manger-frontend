import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

test("take page snapshot and compare", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();

  const login = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(login).toMatchSnapshot();
});
