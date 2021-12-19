import classes from "./App.module.css";
import Timer from "./components/Timer";

function App() {
  return (
    <div className={classes.app}>
      <Timer duration={1500000}></Timer>
    </div>
  );
}

export default App;
