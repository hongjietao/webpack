"use strict";

import React from "react";
import { createRoot } from "react-dom/client";
import "./search.less";
import WebpackIcon from "./assets/images/webpack-icon.svg";

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        Search Text Search Text Search Text
        <br />
        <img className="img-size" src={WebpackIcon} />
      </div>
    );
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<Search />);
