import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
*Post Submitter component
*Used on the dashboard
*/
class PostSubmitter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showSubmitter: false,             //display post submitter?
			submitterClass: "hideSubmitter",  //submitter option
			titleText: "",                    //title of submission
			bodyText: "",                     //body of submission
			communities: PropTypes.Array,     //community list
			selectedCommunities: [],          //chosen communities
		}

		this.showSubmitter = this.showSubmitter.bind(this);
		this.hideSubmitter = this.hideSubmitter.bind(this);
		this.submitPost = this.submitPost.bind(this);
		this.handleBodyTextChange = this.handleBodyTextChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.selectAll = this.selectAll.bind(this);
	}

	/**
	*After component is mounted
	*Triggers re-rendering
	*/
	componentDidMount(){
		this.fetchCommunities();
	}

	/**
	*Displays submitter
	*updates state
	*/
	showSubmitter () {
		this.setState({
			showSubmitter: true, 
			submitterClass: "showSubmitter"
		})
	}

	/**
	*Hides submitter
	*updates state
	*/
	hideSubmitter () {
		this.setState({
			showSubmitter: false, 
			submitterClass: "hideSubmitter"
		})
	}

	/**
	*Displays user input
	*updates state
	*
	*@param {String} e - user input
	*/
	handleBodyTextChange(e) {
		this.setState({ 
			bodyText: e.target.value 
		});
	}

	/**
	*Displays user input
	*updates state
	*
	*@param {String} e - user input
	*/
	handleTitleChange(e) {
		this.setState({ 
			titleText: e.target.value
		});
	}

	/**
	*Submits post to selected communities
	*updates state
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
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	/**
	*Acquires communities that can be posted to (followed communities)
	*JSON
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
	*Selection box for communities, using buttons from generateCommunityButton component
	*
	*@param {Array} communities - list of followed communities
	*@param {List} selectedCommunities -
	*@return {React Component} - list of communities, or loading message
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
	*Creates buttons for renderCommunitySelect
	*
	*@param {String} community - community name
	*@param {Boolean} selected - is community selected?
	*@return {React Component} - button for community
	*/
	generateCommunityButton(community, selected){

		var id = community.communityId;

		if(selected){
			return(
				<button 
					type="button" 
					key={ id }
					id={`communityButton-${id}`}
					className="list-group-item list-group-item-action active community-selector-button" 
					ref={`communityButton-${id}`}
					onClick={ () => this.selectCommunity(id)}
				>
				{community.name.length > 25 ? community.name.substring(0,24) + "..." : community.name}
				</button>
			);
		} else {
			return(
				<button 
					type="button" 
					key={ id }
					id={`communityButton-${id}`}
					className="list-group-item list-group-item-action community-selector-button" 
					ref={`communityButton-${id}`}
					onClick={() => this.selectCommunity(id)}
				>
				{community.name.length > 25 ? community.name.substring(0,24) + "..." : community.name}
				</button>
			);
		}
	}

	/**
	*Is a community selected?
	*
	*@param {} id - selected community's id
	*/
	selectCommunity(id){

		var selectedCommunities = this.state.selectedCommunities;

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
	*Select all communities
	*updates state
	*/
	selectAll(){


		var allCommunities = [];

		for(var i = 0; i < this.state.communities.length; i++){
			allCommunities.push(this.state.communities[i].communityId);
		}

		this.setState({ 
			selectedCommunities: allCommunities 
		})
	}

	/**
	*When component is mounted
	*@return {React Component} - post submitter
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
								<button type="button" className="btn btn-outline-primary select-all-button ml-2" onClick={this.selectAll} >Select All</button>
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
