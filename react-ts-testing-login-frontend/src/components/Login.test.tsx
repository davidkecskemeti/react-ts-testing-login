import { fireEvent, waitFor } from "@testing-library/react";
import ReactDOM from "react-dom";
import { LoginService } from "../services/LoginService";
import { Login } from "./Login";

describe("Login component tests", () => {
  let container: HTMLDivElement;
  const loginServiceSpy = jest.spyOn(LoginService.prototype, "login");

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
    expect(inputs[0].name).toBe("login");
    expect(inputs[1].name).toBe("password");
    expect(inputs[2].value).toBe("Login");

    const label = container.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });

  it("Renders correctly initial document with data-test query", () => {
    expect(
      container.querySelector("[data-test='login-form']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-test='login-input']")?.getAttribute("name")
    ).toBe("login");
  });

  it("Passes credentials correctly", () => {
    const inputs = container.querySelectorAll("input");
    const loginInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(loginInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    expect(loginServiceSpy).toBeCalledWith("someUser", "somePassword");
  });

  it("Renders correctly status label -invalid login", async () => {
    loginServiceSpy.mockResolvedValueOnce(false);

    const inputs = container.querySelectorAll("input");
    const loginButton = inputs[2];

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(container.querySelector("label")).toBeInTheDocument();
      expect(container.querySelector("label")).toHaveTextContent(
        "Login failed"
      );
    });
  });

  it("Renders correctly status label -invalid login", async () => {
    loginServiceSpy.mockResolvedValueOnce(true);

    const inputs = container.querySelectorAll("input");
    const loginButton = inputs[2];

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(container.querySelector("label")).toBeInTheDocument();
      expect(container.querySelector("label")).toHaveTextContent(
        "Login successful"
      );
    });
  });
});
