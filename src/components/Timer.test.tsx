import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Timer from "./Timer";

describe("Timer", () => {
  it("renders initial time", () => {
    render(<Timer />);

    expect(screen.getByRole("timer")).toBeInTheDocument();
  });

  it("starts counting down after clicking start", async () => {
    jest.useFakeTimers();
    render(<Timer />);

    toggleTimer();
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByRole("timer")).toHaveTextContent("14:59");
    jest.useRealTimers();
  });

  it("can be stoped white running", () => {
    jest.useFakeTimers();
    render(<Timer />);

    toggleTimer();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    toggleTimer();
    jest.advanceTimersByTime(1000);

    expect(screen.getByRole("timer")).toHaveTextContent("14:59");
    jest.useRealTimers();
  });

  it("can be triggered through keyboard", () => {
    jest.useFakeTimers();
    render(<Timer />);

    toggleTimerUsingKeyboard();

    expect(
      screen.getByRole("button", {
        name: "Toggle pomodoro timer",
        pressed: true,
      })
    ).toBeInTheDocument();
    jest.useRealTimers();
  });

  const toggleTimer = () => {
    const toggleButton = screen.getByRole("button", {
      name: "Toggle pomodoro timer",
    });
    fireEvent.click(toggleButton);
  };

  const toggleTimerUsingKeyboard = () => {
    fireEvent.keyDown(window, { code: "Space" });
  };
});
