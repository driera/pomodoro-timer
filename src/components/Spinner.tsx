import classes from "./Spinner.module.css";

type SpinnerProps = {
  elapsed: number;
  total: number;
  color: string;
};

const Spinner = ({ elapsed, total, color }: SpinnerProps): JSX.Element => {
  return (
    <svg viewBox="0 0 100 100" className={classes.spinner}>
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
    </svg>
  );
};

export default Spinner;
