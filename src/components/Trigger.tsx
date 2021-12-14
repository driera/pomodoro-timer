import classes from "./Trigger.module.css";

type TriggerProps = {
  status: "idle" | "play" | "reset";
  onToggle: () => void;
  onReset: () => void;
};

const Trigger = ({ status, onToggle, onReset }: TriggerProps): JSX.Element => {
  if (status === "reset") {
    return (
      <button
        className={classes.trigger}
        onClick={onReset}
        aria-label="Reset pomodoro timer"
      >
        reset
      </button>
    );
  }
  return (
    <button
      className={classes.trigger}
      onClick={onToggle}
      aria-label="Toggle pomodoro timer"
      aria-pressed={status === "play"}
    >
      {status === "idle" ? "start" : "stop"}
    </button>
  );
};

export default Trigger;
