import React from "react";

/* Input: liked: boolean (has it been liked or not?)
// Output: when we click the heart icon, we want to raise an onClick event. This will toggle the like property of the given object and save it to the database.
NOTE: This toggle doesn't know anything about movies. This is just checking the prop status of 'liked'.
*/

const Delete = (props) => {
	return (
		<span type="button" className="btn btn-danger" onClick={props.onClick}>
			Delete
		</span>
	);
};

export default Delete;
