import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Timer from "./Timer";

describe("Timer", () => {
  it("renders initial time", () => {
    render(<Timer />);

    expect(screen.getByRole("timer")).toBeInTheDocument();
  });

  describe("plays with time", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("starts counting down after clicking start", () => {
      render(<Timer duration={900000} />);

      toggleTimer();
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByRole("timer")).toHaveTextContent("14:59");
    });

    it("stops when reaching 0", () => {
      render(<Timer duration={1000} />);

      toggleTimer();
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.getByRole("timer")).toHaveTextContent("00:00");
    });

    it("can be stoped white running", () => {
      render(<Timer duration={900000} />);

      toggleTimer();
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      toggleTimer();
      jest.advanceTimersByTime(1000);

      expect(screen.getByRole("timer")).toHaveTextContent("14:59");
    });

    it("can be triggered through keyboard", () => {
      render(<Timer />);

      toggleTimerUsingKeyboard();

      expect(
        screen.getByRole("button", {
          name: "Toggle pomodoro timer",
          pressed: true,
        })
      ).toBeInTheDocument();
    });

    it("shows reset button when reaching 0", () => {
      render(<Timer duration={1000} />);

      toggleTimer();
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(
        screen.getByRole("button", { name: "Reset pomodoro timer" })
      ).toBeInTheDocument();
    });

    it("shows initial duration after resetting counter", () => {
      render(<Timer duration={1000} />);

      toggleTimer();
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      resetTimer();

      expect(screen.getByRole("timer")).toHaveTextContent("00:01");
    });
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

  const resetTimer = () => {
    const resetButton = screen.getByRole("button", {
      name: "Reset pomodoro timer",
    });
    fireEvent.click(resetButton);
  };
});
