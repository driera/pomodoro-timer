import classes from "./App.module.css";
import Timer from "./components/Timer";

function App() {
  return (
    <div className={classes.app}>
      <Timer initialTime="15:05"></Timer>
    </div>
  );
}

export default App;
