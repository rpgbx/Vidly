import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
	/*
	CONTROLLED COMPONENTS VERSUS UNCONTROLLED COMPONENTS
	-----------------------------------------------------
	Components are either controlled or uncontrolled. When we create forms, we typically want them to be *controlled.* We have better control over the form elements and data when we use a state.

	A controlled component is bound to a value, which means we set its value here - in the state.

	If we want to update the state:
		1) Use the onChange property that calls a handleChange function
		2) The handleChange() function is where we set the new state
		3) Set the new state by using setState() in handleChange()
	NOTE: 'undefined' or 'null' cannot be used as values of a controlled element. Because 'null' is not a valid input, if we want to set a value prop so that it's empty:
		--> Controlled Components: Use an "" to clear the component
		--> Uncontrolled Components: Use 'undefined' ('undefined' is okay for uncontrolled components. (Uncontrolled Components are ones where form data is handled directly by the DOM and updated using a 'ref'.)
	LAST NOTE: Uncontrolled Components are not suggested for form data because it does not allow validation control, and has limited control over the form elements and data.
	*/

	state = {
		account: { username: "", password: "" },

		// the key-value pairs in errors MAP to the name of our input fields in account.
		errors: {},
	};

	validate = () => {
		const errors = {};

		const { account } = this.state; // destructure account set in state.

		if (account.username.trim() === "") {
			errors.username = "Username is required.";
		}
		if (account.password.trim() === "") {
			errors.password = "Password is required.";
		}
	};

	// handleSubmit takes an event, and uses .preventDefault() to prevent the page from accessing the Server and slowing our application down.
	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors }); // update the state of errors here, which will rerender with our error message. If there are no errors, validate() returns 'null'.

		if (errors) return; // this will return immediately, so it won't call the server.

		console.log("Submitted");
	};

	// handles when a user types anything into field. We've destructured the currentTarget that gets passed in, and given it an alias of input.
	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account }; // clone the account object set in the state.

		account[input.name] = input.value;
		// This returns the value from the current input field. So, if we are currently in "username", it will set the new value of "username" to whatever is typed in - also known as the "current target".
		// Also, if we are in "password", it will set the new value of "password" to whatever is typed in.
		//This is how we create a dynamic handler.

		this.setState({ account }); // finally, set the state of the account.
	};

	render() {
		const { account } = this.state;

		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="username"
						value={account.username}
						label="Username"
						onChange={this.handleChange}
					/>

					<Input
						name="password"
						value={account.password}
						label="Password"
						onChange={this.handleChange}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
