import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/home/Home';
import AllQuotes from './pages/all-quotes/AllQuotes';

const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/all-quotes'>
						<AllQuotes />
					</Route>
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
