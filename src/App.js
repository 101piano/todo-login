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
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    };
  }
  
  render() {  
    return (
      <div className='App'>
        <ToDo />
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp.bind(this)}/> }  
      </div>
    );
  }
  

  /*与注册登录相关的函数*/
  onSignUp(user){
    let stateCopy=JSON.parse(JSON.stringfy(this.state));
    stateCopy.user=user;   
    this.setState(stateCopy);
  }
  signOut(){
    signOut();
    let stateCopy=JSON.parse(JSON.stringify(this.state));
    stateCopy.user={};
    this.setState(stateCopy);
  }
  
  
  /*与todo相关的函数*/
} 

export default App













