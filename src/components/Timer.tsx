import { useState } from "react";
import GearIcon from "./icons/gear";
import classes from "./Timer.module.css";

const Timer = (): JSX.Element => {
  const [timer, setTimer] = useState<number>(900000);

  const handleStart = () => {
    setInterval(() => setTimer((previous) => previous - 1000), 1000);
  };

  return (
    <div className={classes.container} aria-label="Pomodoro Timer">
      <div className={classes.inner}>
        <div className={classes.counter}>{msToTime(timer)}</div>
        <button className={classes.trigger} onClick={handleStart}>
          start
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
