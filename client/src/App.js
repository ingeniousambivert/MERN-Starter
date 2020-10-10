import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./assets/less/App.less";
import "./assets/scss/style.scss";

import LandingRoute from "./components/landing/utils/LandingRoute";
import LandingLayout from "./components/landing/layout/LandingLayout";
import Landing from "./pages/landing";

import Routes from "./routes";

const App = () => {
	return (
		<Router>
			<Switch>
				<LandingRoute exact path="/" component={Landing} layout={LandingLayout} />
				<Route component={Routes} />
			</Switch>
		</Router>
	);
};

export default App;