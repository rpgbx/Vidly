/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import MoviesTable from "../components/moviesTable";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		selectedGenre: this.props.selectedItem, // from default props
		pageSize: 4, // default page size is 4 items per page
		sortColumn: { path: "title", order: "asc" }, // default sorting is by Title and ascending
	};

	componentDidMount() {
		// called when instance is rendered in the DOM.

		// create a variable called genres. This stores a key-value pair called 'name' with the value 'All Genres,' which is set in the state, and also clones the key-value pairs using the getGenres() function.
		const genres = [this.state.selectedGenre, ...getGenres()];
		const movies = getMovies();
		console.log(movies);
		console.log(this.componentDidMount);

		this.setState({ movies, genres }); // this populates the movies array with the movies available, and genres with the selected genre + genre list.
	}

	// will handle the delete when clicking delete button
	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	// will handle the like button. This updates the UI (the view), but we should also make sure it updates in the backend so the changes persist.
	handleLike = (movie) => {
		const movies = [...this.state.movies]; // clone the movies array from state
		const index = movies.indexOf(movie); // retrieve the index of the movie passed in
		movies[index] = { ...movies[index] }; //clone the movie index passed in
		movies[index].liked = !movies[index].liked; // if it is already true, it becomes false, and if it's false, it becomes true. That's why we use the ! operand.
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page }); // sets the state of 'currentPage' to the page being passed in. Remember, setting the state causes a new render!
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 }); // sets the state of 'selectedGenre' to the genre selected, and updates the state of currentPage to 1 -- this is because we want the component to render starting on the first page -- if we're on page 3, for example, and there's not enough entries to get to page 3, you'll get a blank page.
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn }); // sets the state of 'sortColumn'. This is called from the onSort prop in MoviesTable > Table > TableHeader - (onClick property raises the raiseSort helper function and gets passed the column that has been clicked.)
	};

	getPageData = () => {
		// first, do object destructuring to grab the states.
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			movies: allMovies, // alias "allMovies" to avoid any confusion with "movies" declared twice
		} = this.state;

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
		const { length: count } = this.state.movies; // initialize the length and give it the alias of 'count'

		const { pageSize, currentPage, sortColumn, selectedGenre } = this.state; // object destructuring

		let moviesTable = null; // initialize moviesTable

		// We do object destructuring where the getPageData() function is called. The function returns the totalCount and data. We give 'data' the alias of 'movies', since our data in this case is the array of movies.
		const { totalCount, data: movies } = this.getPageData();

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
			// otherwise, if there is adata available, it renders the table and pagination components.
			moviesTable = (
				<div>
					<p className="m-4">Showing {totalCount} movies in the database.</p>

					<MoviesTable
						movies={movies} // array of movies, set in state
						sortColumn={sortColumn} // object with key:value pairs of the column's path and order, set in state
						onLike={this.handleLike} // event handler for like button
						onDelete={this.handleDelete} // event handler for delete button
						onSort={this.handleSort} // event handler for clicking on sort
					/>

					<Pagination
						itemsCount={totalCount} // number of pages that have been filtered, set in state
						pageSize={pageSize} // size of page, set in state
						currentPage={currentPage} // current page number, set in state
						onPageChange={this.handlePageChange} // event handler when someone clicks to change pages
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
							items={this.state.genres} // pass the array of genres from state
							selectedItem={this.state.selectedGenre} // pass the object that contains the key:value pair from selectedGenre, set in state.
							onItemSelect={this.handleGenreSelect} // calls event handler when someone selects a new genre. Updates the state of the selected genre.
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

// turns the "All Genres" button in <ListGroup /> blue on default when rendering the component - because we set this as our initial state, in <ListGroup /> the selectedGenre is always automatically blue.
Movies.defaultProps = {
	selectedItem: { name: "All Genres" },
};

export default Movies;
