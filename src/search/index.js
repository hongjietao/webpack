"use strict";

import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import "./index.less";
import WebpackIcon from "../assets/images/webpack-icon.svg";

const Search = () => {
  console.log("%c this is a message", "color:red;");
  console.log(
    "%c this %c is a %c message",
    "color:#f00;",
    "font-size:20px;",
    "color:blue;background:yellow;"
  );
  return (
    <div className="search-text">
      Search Text Search Text Search Text666
      <br />
      <img className="img-size" src={WebpackIcon} />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Search />);
