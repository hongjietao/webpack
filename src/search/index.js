"use strict";

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.less";
import WebpackIcon from "../assets/images/webpack-icon.svg";
import common from "../../common";
import { a } from "./tree-shaking";

const Search = () => {
  const [Text, setText] = useState(null);

  const handleLoadComponent = async () => {
    try {
      const element = document.createElement("div");
      const newText = await import("./text");
      // element.innerHTML = <newText />;
      console.log("newText:", newText);

      setText(newText.default);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="search-text">
      {Text ? <Text /> : null}
      <br />
      Search Text Search Text Search Text666
      <br />
      <img
        className="img-size"
        src={WebpackIcon}
        onClick={handleLoadComponent}
      />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Search />);
