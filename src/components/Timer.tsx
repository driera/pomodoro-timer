import { useCallback, useEffect, useState } from "react";
import GearIcon from "./icons/gear";
import classes from "./Timer.module.css";
import Trigger from "./Trigger";

type Props = {
  duration?: number;
};

const Timer = ({ duration = 3000 }: Props): JSX.Element => {
  const [timer, setTimer] = useState<number>(duration);
  const [status, setStatus] = useState<"idle" | "play" | "reset">("idle");
  const [intervalId, setIntervalId] = useState<number>();

  const handleToggle = useCallback(() => {
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

  const handleReset = useCallback(() => {
    setTimer(duration);
    setStatus("idle");
  }, [duration]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        if (status === "reset") {
          handleReset();
        } else {
          setStatus(status === "idle" ? "play" : "idle");
          handleToggle();
        }
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleReset, handleToggle, status, timer]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalId);
      setStatus("reset");
      setTimer(0);
    }
  }, [intervalId, timer]);

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

        <Trigger
          onToggle={handleToggle}
          onReset={handleReset}
          status={status}
        />
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
