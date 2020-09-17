import React, { Component } from "react";

// INTERFACE OF THIS COMPONENT
// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
	// will raise the sort to the handleSort method from movies.jsx to update the sort
	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn }; // clone the column

		// if the path clicked is already the selected path, we reverse the order from ascending to descending, or descending to ascending
		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";

			// otherwise, we want to update to the new path, and set the order to ascending
		} else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}

		// lastly, we set the props to the current column
		this.props.onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;

		if (
			column.path !== sortColumn.path ||
			column.key === "delete" ||
			column.key === "like"
		)
			return null;

		if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
		return <i className="fa fa-sort-desc"></i>;
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							className="clickable"
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}
							scope="col"
						>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
