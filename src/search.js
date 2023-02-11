"use strict";
import "./search.css";

import React from "react";
import ReactDOM from "react-dom";

class Search extends React.Component {
  render() {
    return <div className="search-text">Search Text</div>;
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
