import { render } from "@testing-library/react";
import Timer from "./Timer";

it("renders a time", () => {
  render(<Timer initialTime={"00:05"} />);
});
