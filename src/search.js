"use strict";
import "./search.less";

import React from "react";
import { createRoot } from "react-dom/client";

class Search extends React.Component {
  render() {
    return <div className="search-text">Search Text</div>;
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<Search />);
