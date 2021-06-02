import * as React from "react";
import * as ReactDOM from "react-dom";
import Canvas from "./canvas";

const App = () => {
  return (
    <div>
      <Canvas />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
