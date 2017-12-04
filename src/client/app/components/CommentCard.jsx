import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route,
	Link }
	from 'react-router-dom';

/**
*TODO
*
*/
class CommentCard extends React.Component {
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
			<div className="card post-card mt-3">
				<div className="card-body container">
					<div className="row">
						<div className="col-sm-12">
							<h6 className="mt-2">
								{this.props.bodyText}
							</h6>
							<h6 className="card-subtitle text-muted">
								<Link 
									to={`/users/${this.props.userId}`}  
									className="text-muted" >
									@{this.props.username}
								</Link> 
								{this.props.createDate}
							</h6>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CommentCard;
