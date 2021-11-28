import React from 'react';
import Login from '../pages/login';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import Dashboard from '../pages/dashboard';
import useLoadUser from '../hooks/useLoadUser';
import Register from '../pages/register';
import { shallowEqual, useSelector } from 'react-redux';

function Routes() {

	useLoadUser();

	const user = useSelector(state => state.user, shallowEqual);

	return (
		<Router>
			<Switch >
				<Route path="/login" render={() => {
					return user ? <Redirect to="/" /> : <Login />
				}} />

				<Route path="/register">
					<Register />
				</Route>

				<Route path="/">
					<Dashboard />
				</Route>

			</Switch>
		</Router>
	);
}

export default Routes;
