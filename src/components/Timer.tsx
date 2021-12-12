import { useCallback, useEffect, useState } from "react";
import GearIcon from "./icons/gear";
import classes from "./Timer.module.css";

const Timer = (): JSX.Element => {
  const [timer, setTimer] = useState<number>(900000);
  const [status, setStatus] = useState<"idle" | "play">("idle");
  const [intervalId, setIntervalId] = useState<number>();

  const handleStart = useCallback(() => {
    if (status === "play") {
      clearInterval(intervalId);
      setStatus("idle");
      return;
    }
    setIntervalId(
      // @ts-expect-error TODO
      setInterval(() => setTimer((prevState) => prevState - 1000), 1000)
    );
    setStatus("play");
  }, [intervalId, status]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        setStatus(status === "idle" ? "play" : "idle");
        handleStart();
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleStart, status, timer]);

  return (
    <div className={classes.container} aria-label="Pomodoro Timer">
      <div className={classes.inner}>
        <div
          className={classes.counter}
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {msToTime(timer)}
        </div>
        <button
          className={classes.trigger}
          onClick={handleStart}
          aria-label="Toggle pomodoro timer"
          aria-pressed={status === "play"}
        >
          {status === "idle" ? "start" : "stop"}
        </button>
        <div className={classes.config}>
          <GearIcon />
        </div>
      </div>
    </div>
  );
};

const msToTime = (time: number): string => {
  const s = Math.floor(time / 1000) % 60;
  const m = Math.floor(time / 60000) % 60;

  const readableMinutes = m < 10 ? `0${m}` : m;
  const readableSeconds = s < 10 ? `0${s}` : s;

  return `${readableMinutes}:${readableSeconds}`;
};

export default Timer;
