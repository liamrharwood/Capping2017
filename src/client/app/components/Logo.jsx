import React from 'react';
import 'react-bootstrap'

/**
*TODO
*
*/
class Logo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	/**
	*TODO
	*
	*@return {} -
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