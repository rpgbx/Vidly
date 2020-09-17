import React from "react";

/* Input: liked: boolean (has it been liked or not?)
// Output: when we click the heart icon, we want to raise an onClick event. This will toggle the like property of the given object and save it to the database.
NOTE: This toggle doesn't know anything about movies. This is just checking the prop status of 'liked'.
*/

const Like = (props) => {
	let classes = "fa fa-heart";
	if (!props.liked) classes += "-o";
	return (
		<i
			onClick={props.onClick}
			className={classes + " clickable"}
			aria-hidden="true"
		></i>
	);
};

export default Like;
