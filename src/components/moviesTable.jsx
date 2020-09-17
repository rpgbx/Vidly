import React, { Component } from "react";
import { Link } from "react-router-dom";
import Delete from "./common/delete";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
	// define an array of objects called "columns" for each column in <MoviesTable />

	columns = [
		// for the first four objects in the array, each one has the keys 'path' and 'label', with the appropriate path for the information gathered from fakeMovieService.js.
		{
			path: "title",
			label: "Title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },

		// for the next two objects in the array - the Like button and the Delete button - these don't have paths or labels. Therefore, the keys we create are called 'key' and 'content'. Their values are what they are, and the corresponding component respectively.
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<Delete movie={movie} onClick={() => this.props.onDelete(movie)} />
			),
		},
	];

	render() {
		const { movies, onSort, sortColumn } = this.props;

		return (
			<Table
				columns={this.columns}
				data={movies}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
