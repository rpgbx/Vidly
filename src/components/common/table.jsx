import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, onSort, sortColumn, data }) => {
	return (
		<table className="table m-4">
			<TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

			<TableBody columns={columns} data={data} />
		</table>
	);
};

export default Table;
