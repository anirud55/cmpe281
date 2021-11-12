import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns, keyAtt } = this.props;
    return (
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item[keyAtt]}>
              {columns.map((column) => (
                <td
                  key={column.path}
                  style={{
                    fontSize: "18px",
                    paddingLeft: "25px",
                    fontFamily: "Courier",
                  }}
                >
                  {_.get(item, column.path)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    );
  }
}

export default TableBody;
