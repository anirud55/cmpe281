import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, keyAtt }) => {
  return (
    <table className="table table-borderless">
      <TableHeader columns={columns}></TableHeader>
      <TableBody data={data} columns={columns} keyAtt={keyAtt}></TableBody>
    </table>
  );
};

export default Table;
