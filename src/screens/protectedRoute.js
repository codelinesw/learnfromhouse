import React from 'react';
import { Route , Redirect } from 'react-router-dom';
import SimpleCrypto from "simple-crypto-js";

export const IsJsonString = (str) => {
  try {
	JSON.parse(str);
  } catch (e) {
	    return false;
  }

  return true;
}

export const checkProperty = (res) => {
  return res != null ? true : false;
}

export const  _desenvolver_ = (d) => {
   	let _saludar_ = 's1z2a';
	let simpleCrypto = new SimpleCrypto(_saludar_);
	return simpleCrypto.decrypt(d);
}

export const ProtectedRoute = ({ component : Component, isAuth,  ...rest }) => {
	return(
		<Route
			{...rest}
			render = { props => {
				if(isAuth === undefined || isAuth === null || isAuth === "undefined"){
					return (<Redirect to={'/'}/>);
				}else{
					if(isAuth !== undefined && isAuth !== null){
						if(IsJsonString(isAuth)){
							isAuth = JSON.parse(isAuth);
							if(isAuth.length > 0){
								if(checkProperty(isAuth[0])){
									if(isAuth[0].status === undefined){
										return (<Redirect to={'/'}/>)
									}else{
										let status = _desenvolver_(isAuth[0].status);
										console.log(status);
										if (status != 1){
									 	  return (<Redirect to={'/'}/>);
										}else{
											return <Component {...props} />;
										}
									}
								}else{
									return (<Redirect to={'/'}/>)
								}
							}else{
								return (<Redirect to={'/'}/>)
							}
						}else{
				    		return (<Redirect to={'/'}/>)
				    	}
					}
				}
				
			}}
		/>
	);
}

