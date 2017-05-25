import React, { Component } from 'react';
import ToDo from './ToDo';
import './css/App.css';
import 'normalize.css';
import './css/reset.css';
import UserDialog from './UserDialog';
import {getCurrentUser} from './leanCloud';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user: getCurrentUser() || {} 
    };
  }
 
  render() {  
    return (
      <div className='App'>    
        {this.state.user.id ? 
          <ToDo user={deepCopy(this.state.user)}/> : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}  
      </div>
    );
  }
  

  /*与注册登录相关的函数*/
  onSignUpOrSignIn(user){    //不直接把this.state赋值给stateCopy，先深拷贝一份再进行修改
    let stateCopy=deepCopy(this.state);
    stateCopy.user=user;
    this.setState(stateCopy);
  }
  
} 

export default App;


 //封装 JSON.parse(JSON.stringfy(xxx))
export function deepCopy(user){
    return JSON.parse(JSON.stringify(user));
  }











