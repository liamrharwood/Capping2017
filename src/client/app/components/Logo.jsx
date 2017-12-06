import React from 'react';
import 'react-bootstrap'

/**
*Logo component
*
*Used in some views
*/
class Logo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	/**
	*When component is mounted
	*
	*@return {React Component} - logo
	*/
	render() {
		return (
			<div className =  "logo">
				<img src= "../images/large-logo.png"/>
			</div>
		);
	}
}

export default Logo;