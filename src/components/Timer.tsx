import { useState } from "react";
import GearIcon from "./icons/gear";
import classes from "./Timer.module.css";

type Props = {
  initialTime: string;
};

const Timer = ({ initialTime }: Props): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.counter}>{timer}</div>
        <div className={classes.trigger}>START</div>
        <div className={classes.config}>
          <GearIcon />
        </div>
      </div>
    </div>
  );
};
