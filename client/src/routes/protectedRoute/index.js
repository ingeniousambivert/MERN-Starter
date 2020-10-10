import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@slices/auth";

import RedirectSignin from "@pages/signin/redirect";

const ProtectedRoute = (props) => {
	const { component: Component, ...rest } = props;
	let isUserAuthenticated = useSelector(selectIsAuthenticated);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isUserAuthenticated) {
					return <Component {...props} />;
				} else {
					return <RedirectSignin />;
				}
			}}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element //for a single component/element
	]).isRequired
};

export default ProtectedRoute;