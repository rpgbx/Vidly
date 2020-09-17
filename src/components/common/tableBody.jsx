import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
	renderCell = (item, column) => {
		if (column.path === "dailyRentalRate") {
			return this.formatRate(item);
		} else if (column.content) {
			return column.content(item);
		} else {
			return _.get(item, column.path);
		}
	};

	formatRate = (item) => {
		return `$${item.dailyRentalRate.toFixed(2)}`;
	};

	createKey = (item, column) => {
		return item._id + (column.path || column.key);
	};

	render() {
		const { data, columns } = this.props;

		return (
			<tbody>
				{data.map((item) => (
					<tr key={item._id}>
						{columns.map((column) => (
							<td key={this.createKey(item, column)}>
								{this.renderCell(item, column)}
							</td>
						))}
						{/* We use LODASH to access these properties. Accessing properties using bracket notation only works if it's a simple property. However, we're going to need to call movies.genre.name which is a nested property - so lodash has an easy way to access nested properties. We pass the object we want to access info from, and then the target property. */}
					</tr>
				))}
			</tbody>
		);
	}
}

export default TableBody;
