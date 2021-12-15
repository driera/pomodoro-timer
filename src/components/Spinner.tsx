import classes from "./Spinner.module.css";

type SpinnerProps = {
  elapsed: number;
  total: number;
  color: string;
};

const Spinner = ({ elapsed, total, color }: SpinnerProps): JSX.Element => {
  return (
    <svg viewBox="0 0 100 100" className={classes.spinner}>
      <linearGradient id="dark" x1="1" y1="0.5" x2="0" y2="0.5">
        <stop offset="0%" stopColor="var(--black-color)" />
        <stop offset="30%" stopColor="transparent" />
      </linearGradient>
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="310 310"
        strokeDashoffset={310 + (310 * elapsed) / total}
      />
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="none"
        stroke="url(#dark)"
        strokeWidth={2.1}
        strokeDasharray="310 310"
        strokeDashoffset={(220 * elapsed) / total}
        style={{
          transform: `rotate(-${(360 * elapsed) / total}deg)`,
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  );
};

export default Spinner;
