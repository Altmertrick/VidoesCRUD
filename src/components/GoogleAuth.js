import React from 'react';



class GoogleAuth extends React.Component{

  state = { isSignedIn: null}

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
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
        //Listen fro changing signing in or out
        this.auth.isSignedIn.listen(this.AuthOnChange);
      })
    });
  }

  AuthOnChange = () =>{
    this.setState({isSignedIn: this.auth.isSignedIn.get()});
  }

  onSignInClick = () =>{
    this.auth.signIn();
  }

  onSignOutClick = ()=>{
    this.auth.signOut();
  }

  renderAuthButton(){
    if(this.state.isSignedIn === null){
      return null;
    }
    if(this.state.isSignedIn){
      return (
        <button 
        onClick={this.onSignOutClick}
        className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    }
    if(!this.state.isSignedIn){
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
    return(
    <div>
    Google Auth
      {this.renderAuthButton()}
    </div>
    )
  }
}

export default GoogleAuth;