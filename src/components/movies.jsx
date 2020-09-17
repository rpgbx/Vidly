/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import MoviesTable from "../components/moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
	getPageData = () => {
		// first, do object destructuring to grab the states.
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			allMovies, // alias "allMovies" to avoid any confusion with "movies" declared twice
		} = this.props;

		/*
		Before we paginate, we need to see if there has been a selected genre - this will determine the number of pages that should be rendered. We use the ternary operator here.
		If movies.genre_id is equal to selectedGenre._id, then that movie genre is the selectedGenre.
		Otherwise, it will display allMovies.
		*/

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		/*
		Additionally, before we paginate our data, we need to SORT. Note the ORDER of these events - you have to filter through what movies you want first (defined above as 'filtered'), THEN you need to sort it (defined below as 'sorted'), and FINALLY you paginate the data (defined under that as 'movies' that calls the paginate function from utils.)
		
		We use lodash to return a new array of movies that has already been sorted.
		*/
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		// Finally, we paginate the data by creating a constant 'movies', and setting it to call the paginate function. We pass in our sorted list, the current page number, and the page size.)
		const movies = paginate(sorted, currentPage, pageSize);

		// The last step in getPageData is to return an object, where the totalCount and movies data is returned.)
		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const {
			length: count,
			movies,
			onDelete,
			onGenreSelect,
			onLike,
			onPageChange,
			onSort,
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			totalCount,
		} = this.props; // object destructuring

		let moviesTable = null; // initialize moviesTable

		// this code executes if there are no movies in the database.
		if (count === 0) {
			moviesTable = <p className="m-4">There are no movies in the database.</p>;
		} else if (totalCount === 0) {
			// this code executes if there are no movies of the selected genre.
			moviesTable = (
				<p className="m-4">
					There are no {selectedGenre.name.toLowerCase()} movies in the
					database.
				</p>
			);
		} else {
			// otherwise, if there is data available, it renders the table and pagination components.
			moviesTable = (
				<div>
					<p className="m-4">Showing {totalCount} movies in the database.</p>

					<MoviesTable
						movies={movies} // array of movies, passed in props
						sortColumn={sortColumn} // object with key:value pairs of the column's path and order
						onLike={onLike} // event handler for like button
						onDelete={onDelete} // event handler for delete button
						onSort={onSort} // event handler for clicking on sort
					/>

					<Pagination
						itemsCount={totalCount} // number of pages that have been filtered
						pageSize={pageSize} // size of page
						currentPage={currentPage} // current page number
						onPageChange={onPageChange} // event handler when someone clicks to change pages
					/>
				</div>
			);
		}

		return (
			/*
			This return includes high-level components, with <ListGroup />, <MoviesTable />, and <Pagination />.
			Everything else that is low-level stuff (e.g. the parts of the table itself like <thead> and <th>) should be a separate component.
			This is because we don't want to mix high-level and low-level information.
			*/

			<div>
				{/* using these divs implements a grid layout. */}
				<div className="row">
					<div className="col-2 m-4">
						<ListGroup // writing the code this way keeps the list on the page REGARDLESS of if there are movies or not in the database that match the criteria.
							items={this.genres} // pass the array of genres
							selectedItem={selectedGenre} // pass the object that contains the key:value pair from selectedGenre
							onItemSelect={onGenreSelect} // calls event handler when someone selects a new genre. Updates the state of the selected genre.
						/>
					</div>
					<div className="col">{moviesTable}</div>
				</div>{" "}
				{/* we set {moviesTable} as the second column - this will render based on
				whether we have movies data or not. If there is, <Table /> and{" "}
				<Pagination /> will render. Otherwise, neither will render and a message
				will show up instead. */}
			</div>
		);
	}
}

export default Movies;
