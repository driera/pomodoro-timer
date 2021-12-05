import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Timer from "./Timer";

describe("Timer", () => {
  it("renders initial time", () => {
    render(<Timer />);

    const counter = screen.getByText("15:00");
    expect(counter).toBeInTheDocument();
  });

  it("starts counting down after clicking start", async () => {
    jest.useFakeTimers();
    render(<Timer />);

    const startButton = screen.getByRole("button", { name: "start" });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const counter = screen.getByText("14:59");
    expect(counter).toBeInTheDocument();
    jest.useRealTimers();
  });
});
