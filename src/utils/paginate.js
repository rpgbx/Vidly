import _ from "lodash";

// pass in items to render, current page number, and number of items displayed per page (pageSize)
export const paginate = (items, pageNumber, pageSize) => {
	const startIndex = (pageNumber - 1) * pageSize; // this is the index to start at. For example, if we're at Page 2, then 1 * 4 is 4 -- this makes sense, since index 0 to 3 will appear on Page 1. Therefore, we should start at index 4.

	return _(items).slice(startIndex).take(pageSize).value();
	/* a few notes...
        _() returns a lodash object. this lets us chain multiple lodash methods together. we pass in items since we're turning items into a lodash object.
        
        .slice() slices the array starting at the given index. we pass in the starting index, since it will return a slice of the array.
        
        .take() specifies the total # of items to take. we pass in pageSize, since that's the total number of items to render.
        
        Finally, .value() converts our lodash wrapper object back to a regular JavaScript array.
    */
};
