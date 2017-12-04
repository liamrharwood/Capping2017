import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Logo from '../components/Logo.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: PropTypes.Array,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount(){
    this.fetchCommunities(this.props);
  }

  fetchCommunities(props){

    axios({
      method:'get',
      url: `${this.props.uri}/communities`,
      headers:{
        'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
      },
      responseType: 'json',
    })  
      .then(res => {
        const data = res.data;
        this.setState({ data });
      }).catch(function (error) {
        if (error.response) {
          if(error.response.status == 401){
              props.unauth();
          }
        }
      });

  }

  renderCommunitiesDropdown() {

    if(this.state.data && this.state.data.length > 0){
      return (
        this.state.data.map(this.renderCommunityOption)
      );
    } else if (this.state.data){
        return (<a className="dropdown-item" >You do not follow any communities.</a>);
    } else {
      return (<a className="dropdown-item" >Loading Communities...</a>)
    }
  }
  
  renderCommunityOption(data) {
    return(<Link to={`/communities/${data.communityId}`} key={data.communityId} className="dropdown-item">{data.name}</Link>)
  }

  handleSearch(){
    var search = ReactDOM.findDOMNode(this.refs.search).value;
    var encodedSearch = encodeURIComponent(search);

    this.props.history.push(`/search/${encodedSearch}`);
  }

  keyPress(e){
    if(e.keyCode == 13){
         this.handleSearch();
      }
  }

  render() {
    return (
     <nav className="navbar navbar-expand-lg navbar-dark nav-purple position-fixed">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           <li className= {`nav-item ${this.props.home}`}>
            <Link to="/home" className="nav-link"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;Home</Link>
           </li>
           <li className={`nav-item dropdown ${this.props.communities}`}>
             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Your Communities
             </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.renderCommunitiesDropdown()}

                <div className="dropdown-divider"></div>
                <Link to={`/communities/create`} className="dropdown-item">Create your own community!</Link>


                </div>
           </li>
         </ul>
         <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" ref="search" type="search" placeholder="Search" aria-label="Search" onKeyDown={this.keyPress} />
          <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={this.handleSearch}>Search</button>
         </form>
         <ul className = "navbar-nav my-1 my-lg-0 ml-lg-4">
          <li className = {`nav-item ${this.props.profile}`}><Link to={`/profile`} className="nav-link"><i className="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp; Profile</Link></li>
        </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = {`nav-item ${this.props.settings}`}><Link to="/settings" className="nav-link"><i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Settings</Link></li>
         </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = {`nav-item ${this.props.logOut}`}><Link to="/login" onClick={this.props.unauth} className="nav-link"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Log Out</Link></li>
         </ul>
      </div>
     </nav>
    );
  }

}

export default Navbar;
