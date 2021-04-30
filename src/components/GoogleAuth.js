import React from 'react';
import {connect} from 'react-redux';

import { signIn, signOut } from '../actions'



class GoogleAuth extends React.Component{

  componentDidMount(){
    //Wire gapi library and load additional content code to that library:7
    window.gapi.load('client:auth2', ()=>{
      //initialize auth client with Id and ask for a scope of email: 
      window.gapi.client.init({
        clientId:
        "711156101960-4dt8u2ruqi7f7spq406lp0fokmvtqou6.apps.googleusercontent.com",
        scope: 'email'
      }).then(()=>{
        this.auth = window.gapi.auth2.getAuthInstance();  
        this.AuthOnChange(this.auth.isSignedIn.get());     
        //Listen for changing signing in or out
        this.auth.isSignedIn.listen(this.AuthOnChange);
      })
    });
  }

  AuthOnChange = (isSignedIn) =>{
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  }

  onSignInClick = () =>{
    this.auth.signIn();
  }

  onSignOutClick = ()=>{
    this.auth.signOut();
  }

  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    }
    
    if(this.props.isSignedIn){
      return (
        <button 
        onClick={this.onSignOutClick}
        className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    }
    if(!this.props.isSignedIn){
      return(
        <button
         onClick={this.onSignInClick}
         className="ui blue google button">
          <i className="google icon" />
          Sign In
        </button>
      )
    }
  }

  render(){
    console.log(this.props.isSignedIn)
    return(
    <div>
    Google Auth
      {this.renderAuthButton()}
    </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);