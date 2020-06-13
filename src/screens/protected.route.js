import React from 'react';
import { Route , Redirect } from 'react-router-dom';


export const ProtectedRoute = ({ component : Component, isAuthenticated,  ...rest }) => {
	return(
		<Route
			{...rest}
			render= { props => {
				if (isAuthenticated) {
					console.log("props::", isAuthenticated);
					return <Component {...props} />;
				}else{
					return <Redirect to={
						{
							pathname: "/",
							state: {
								from: props.location
							}
						}
						
					}
					/>
				}
			}}
		/>
	);
}

