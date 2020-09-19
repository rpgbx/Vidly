import React from "react";

const Input = ({ name, label, onChange, value }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				value={value}
				onChange={onChange} // this will handle any changes - whatever the user types in.
				autoFocus
				id={name}
				name={name}
				type="text"
				className="form-control"
			/>
		</div>
	);
};

export default Input;
