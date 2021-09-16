import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Edit, Home } from '../../pages';

const Routes = () => {
  const history = createBrowserHistory();
	return (
		<Router history={history}>
			<Switch >
				<Route
					path='/home'
					component={Home}
				/>
				<Route exact path='/edicao/:id' component={Edit} />
				<Route
					path='/'
				  render={() =>	<Redirect to="/home" />}
				/>
			</Switch >
		</Router>
	)
};

export default Routes;
