import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import NavBar from "./components/common/navBar";
import NotFound from "./components/common/notFound";
import Rentals from "./components/rentals";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import "./App.css";

class App extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		selectedGenre: this.props.selectedItem, // from default props
		totalCount: 0,
		pageSize: 4, // default page size is 4 items per page
		sortColumn: { path: "title", order: "asc" }, // default sorting is by Title and ascending
	};

	componentDidMount() {
		// called when instance is rendered in the DOM.

		// create a variable called genres. This stores a key-value pair called 'name' with the value 'All Genres,' which is set in the state, and also clones the key-value pairs using the getGenres() function.
		const genres = [this.state.selectedGenre, ...getGenres()];
		const movies = getMovies();

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

	render() {
		const {
			movies,
			genres,
			currentPage,
			selectedGenre,
			pageSize,
			sortColumn,
		} = this.state;

		return (
			<React.Fragment>
				<NavBar />
				<main className="container">
					<Switch>
						<Route path="/login" component={LoginForm} />
						<Route path="/movies/:id" component={MovieForm} />
						<Route
							path="/movies"
							component={Movies}
							movies={movies}
							genres={genres}
							currentPage={currentPage}
							pageSize={pageSize}
							selectedGenre={selectedGenre}
							sortColumn={sortColumn}
							onLike={this.handleLike}
							onPageChange={this.handlePageChange}
							onGenreSelect={this.handleGenreSelect}
							onSort={this.handleSort}
						/>
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect exact from="/" to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;

// turns the "All Genres" button in <ListGroup /> blue on default when rendering the component - because we set this as our initial state, in <ListGroup /> the selectedGenre is always automatically blue.
Movies.defaultProps = {
	selectedItem: { name: "All Genres" },
};
