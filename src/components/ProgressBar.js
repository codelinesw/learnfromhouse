import React from 'react';

export default class ProgressBar extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		
		return(
			<div className="container-progressbar bg-gray rounded_20 xh8">
				<div className="progressbar bg-blue-light- rounded_20 xh8 active"></div>
			</div>
		)
	}
}

