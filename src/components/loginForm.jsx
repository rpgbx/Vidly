import React, { Component } from "react";

class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
	};

	// handleSubmit takes an event, and uses .preventDefault() to prevent the page from accessing the Server and slowing our application down.
	handleSubmit = (e) => {
		e.preventDefault();

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
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							value={account.username}
							onChange={this.handleChange} // this will handle any changes - whatever the user types in.
							autoFocus
							id="username"
							name="username"
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							value={account.password}
							onChange={this.handleChange}
							id="password"
							name="password"
							type="text"
							className="form-control"
						/>
					</div>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
