/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types"; // helps us check the TYPE of property. e.g.: if you want to use a number, but you enter a string, there is no TypeError raised unless you have this installed.
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
	const pagesCount = Math.ceil(itemsCount / pageSize); // use Math.ceil to return the smallest integer greater or equal to its argument. This is for the edge case where we have 9 items and 10 items in the PageSize - it comes back as 0.9, so Math.ceil() will round it up to 1.

	// if there are not enough entries to make multiple pages, we won't render the pagination.
	if (pagesCount === 1) {
		return null;
	}

	const pages = _.range(1, pagesCount + 1); //use underscore to call the lodash library. Add 1 for fencepost bug. This returns an array.

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination m-4">
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"} // makes the active page blue
					>
						<a className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

// make sure .propTypes is lowercase here.
Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired, // .isRequired makes a propType required.
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired, // this should be a function
};

export default Pagination;
