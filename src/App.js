import React, { Component } from 'react';
import ToDo from './ToDo';
import './css/App.css';
import 'normalize.css';
import './css/reset.css';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut} from './leanCloud';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user: getCurrentUser() || {} ,
    };
  }
 
  render() {  
   //console.log(this.state.user);
   //console.log(JSON.stringify(this.state.user));
   console.log('你好');
    return (
      <div className='App'>       
        {this.state.user.id ? 
          <ToDo user={JSON.stringify(this.state.user)}/> : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}  
      </div>
    );
  }
  

  /*与注册登录相关的函数*/
  onSignUpOrSignIn(user){
    let stateCopy=JSON.parse(JSON.stringify(this.state));
    stateCopy.user=user;
    this.setState(stateCopy);
  }
  signOut(){
    signOut();
    let stateCopy=JSON.parse(JSON.stringify(this.state));
    console.log(stateCopy);
    stateCopy.user={};
    this.setState(stateCopy);
  }
  
  
  /*与todo相关的函数*/
} 

export default App













