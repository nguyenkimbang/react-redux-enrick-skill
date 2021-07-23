import React from 'react';
import 'assets/css/login.css';
import { withRouter } from "react-router";
import * as loginAction from './../actions/loginAction'

import {connect} from 'react-redux';

class Login extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {
			loginData: {
				email: '',
				loginType: ''
			},
			errMsg: ''
		};

		this.changeUsername = this.changeUsername.bind(this);
		this.changeLoginType = this.changeLoginType.bind(this);
	}

	componentDidMount () {
		if (localStorage.getItem('token')) {
		  // this.props.history.push('/')
		}
	}

	changeUsername (e) {
		this.setState({loginData: {...this.state.loginData, email: e.target.value}});
	}

	changeLoginType (e) {
		this.setState({loginData: {...this.state.loginData, loginType: e.target.value}});
	}

	// shouldComponentUpdate (nextProps) {
	// 	if (nextProps.loginInfo.is_logged === true) {
	// 		this.props.history.push('/')
	// 		return false;
	// 	}
	// 	return true;
	// }

	render () {
		return (
			<div className="container">
				<div className="login-page w-50">
					<div className="col-12 text-center mb-4 login-page-header">
						<h1>Login Page</h1>
					</div>
					<div className="form-group mb-2">
						<label className="form-label" htmlFor="username">Username</label>
						<input type="email" value={this.state.loginData.email} onChange={this.changeUsername} className="form-control"/>
					</div>
					<div className="form-group mb-1">
						<label className="form-label" htmlFor="passw">Password</label>
						<select className="form-control" value={this.state.loginData.loginType} onChange={this.changeLoginType}>
							<option value="">Select type</option>
							<option value="customer">Customer</option>
							<option value="staff">Staff</option>
						</select>
					</div>
					<div className="col-12">
						<small className="text-danger row">{this.props.messages.error.message}</small>
					</div>
					<div className="col-12 text-center mt-4">
						<button className="btn btn-primary" onClick={() => this.props.doLogin( {...this.state.loginData})}>Login</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProp = currentState => {
	return {
		loginInfo: {is_logged: currentState.stateLogin.loginSuccess},
		messages: {...currentState.stateMessage}
	}
}

const mapDispatchToProps = dispatch => ({
	doLogin: (loginInfo) => dispatch(loginAction.doLoginAction(loginInfo))
})

export default  connect(mapStateToProp, mapDispatchToProps)(withRouter(Login));