import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
*TODO
*
*/
class PostSubmitter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showSubmitter: false,             //TODO
			submitterClass: "hideSubmitter",  //TODO
			titleText: "",                    //TODO
			bodyText: "",                     //TODO
			communities: PropTypes.Array,     //TODO
			selectedCommunities: [],          //TODO
		}

		this.showSubmitter = this.showSubmitter.bind(this);
		this.hideSubmitter = this.hideSubmitter.bind(this);
		this.submitPost = this.submitPost.bind(this);
		this.handleBodyTextChange = this.handleBodyTextChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
	}

	/**
	*TODO
	*
	*/
	componentDidMount(){
		this.fetchCommunities();
	}

	/**
	*TODO
	*
	*/
	showSubmitter () {
		this.setState({
			showSubmitter: true, 
			submitterClass: "showSubmitter"
		})
	}

	/**
	*TODO
	*
	*/
	hideSubmitter () {
		this.setState({showSubmitter: false, submitterClass: "hideSubmitter"})
	}

	/**
	*TODO
	*
	*@param {} e -
	*/
	handleBodyTextChange(e) {
		this.setState({ bodyText: e.target.value });
	}

	/**
	*TODO
	*
	*@param {} e -
	*/
	handleTitleChange(e) {
		this.setState({ titleText: e.target.value});
	}

	/**
	*TODO
	*
	*/
	submitPost () {

		axios({
			method:'post',
			url: `${this.props.uri}/posts`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			data: {
				title: this.state.titleText,
				bodyText: this.state.bodyText,
				imgPath: '',
				communityIds: this.state.selectedCommunities,
			}
		}).then(res => {	        
			this.hideSubmitter();
			this.props.fetchFunction();
			ReactDOM.findDOMNode(this.refs.title).value = ""
			ReactDOM.findDOMNode(this.refs.body).value = ""
			this.setState({ selectedCommunities: [] });   
		}).catch(function (error) {
			if (error.response) {

			}
		});
	}

	/**
	*TODO
	*
	*/
	fetchCommunities(){
		axios({
			method:'get',
			url: `${this.props.uri}/communities`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			const data = res.data;
			this.setState({ communities: data });
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	/**
	*TODO
	*
	*@param {} communities -
	*@param {} selectedCommunities -
	*@return {} - 
	*/
	renderCommunitySelect(communities, selectedCommunities){
		if(communities){
			return communities.map((x) => {
				if(selectedCommunities.includes(x.communityId)){
					return this.generateCommunityButton(x, true);
				} else {
					return this.generateCommunityButton(x, false);
				}
			})
		} else {
			return <p>Loading Communities...</p>
		}
	}

	/**
	*TODO
	*
	*@param {} community -
	*@param {} selected -
	*@return {} -
	*/
	generateCommunityButton(community, selected){

		var id = community.communityId

		if(selected){
			return(
				<button 
					type="button" 
					key={ id }
					id={`communityButton-${id}`}
					className="list-group-item list-group-item-action active" 
					ref={`communityButton-${id}`}
					onClick={ () => this.selectCommunity(id)}
				>
				{community.name}
				</button>
			);
		} else {
			return(
				<button 
					type="button" 
					key={ id }
					id={`communityButton-${id}`}
					className="list-group-item list-group-item-action" 
					ref={`communityButton-${id}`}
					onClick={() => this.selectCommunity(id)}
				>
				{community.name}
				</button>
			);
		}
	}

	/**
	*TODO
	*
	*@param {} id -
	*/
	selectCommunity(id){

		var selectedCommunities = this.state.selectedCommunities

		if(selectedCommunities.includes(id)){

			var index = selectedCommunities.indexOf(id);

			if(index > -1){

				selectedCommunities.splice(index,1);
				this.setState({ selectedCommunities });
			}

		} else {

			selectedCommunities.push(id);
			this.setState({ selectedCommunities });

		}
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	render () {
		return (
			<div className= "card mb-4">
				<div className="input-group" style={{zIndex: 0}}>
					<input 
						type="text" 
						ref="title" 
						className="form-control" 
						onChange={this.handleTitleChange} 
						maxLength="140" 
						placeholder="New Post Title" 
						aria-label="New Post Title" 
					/>
					<span className="input-group-btn">
						<button 
							className="btn btn-secondary" 
							type="button" 
							onClick={this.showSubmitter}>
							Next
						</button>
					</span>
				</div>
				<div className={`card-body submitter ${this.state.submitterClass}`}>
					<form className="postForm container">
						<div className="row">
							<div className="form-group col-sm-6 col-12">
								<label 
									htmlFor="postBodyText">
									Post Text
								</label>
								<textarea 
									ref="body" 
									className="form-control" 
									id="postBodyText" 
									onChange = {this.handleBodyTextChange} 
									style={{ height: 150 }} 
									maxLength="5000" 
									placeholder = "Enter your post's body text" 
									aria-label="Enter your post's body text" 
								/>
							</div>
							<div className="col-12 col-sm-6">
								<label 
									htmlFor="postBodyText">
									Select Communities
								</label>
								<div className="communityBox list-group">
									{this.renderCommunitySelect(this.state.communities, this.state.selectedCommunities)}
								</div>
							</div>
						</div>
						<div className ="row mt-3">
							<div className="col-12">
								<button 
									type="button" 
									className="btn btn-secondary" 
									onClick = {this.hideSubmitter}>
									Close
								</button>
								<button 
									type="button" 
									className="btn btn-primary ml-4" 
									onClick = {this.submitPost}>
									Submit New Post
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>	 
		);
	}
}

export default PostSubmitter;
