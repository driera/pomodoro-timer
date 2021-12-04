import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders", () => {
  render(<App></App>);

  const text = screen.getByText(/Pomodoro Timer/);
  expect(text).toBeInTheDocument();
});
