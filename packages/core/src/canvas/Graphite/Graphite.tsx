import { forwardRef } from "react";
import Screen from "../Screen";

import "./style.css";

const Graphite = forwardRef(() => {
  return (
    <div className="container">
      <Screen>graphite</Screen>
    </div>
  );
});

Graphite.displayName = "Graphite";

export default Graphite;
