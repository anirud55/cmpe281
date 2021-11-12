import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead style={{ backgroundColor: "#F2F8FA" }}>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path}
              style={{
                fontSize: "22px",
                paddingLeft: "25px",
                fontFamily: "Courier",
              }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
