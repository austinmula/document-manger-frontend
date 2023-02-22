import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";

const onSubmit = jest.fn();

beforeEach(() => {
  const {} = render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );
  onSubmit.mockClear();
});

test("testing login form", async () => {
  const eMail = screen.getByTestId("text-input-element");
  const password = screen.getByTestId("password-input-element");
  userEvent.type(email, "fillWithTestUsername");
  userEvent.type(password, "fillWithTestPassword");

  userEvent.click(screen.getByTestId("login-button-element"));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
