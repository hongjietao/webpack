"use strict";

import React, { useState, lazy, Suspense } from "react";
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
      const newText = await lazy(() => import("./text"));
      // element.innerHTML = <newText />;
      console.log("newText:", newText);

      setText(newText);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Suspense fallback={<div>loaidng</div>}>
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
    </Suspense>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Search />);
