import React, { Component } from 'react';
import ToDo from './ToDo';
import './css/App.css';
import 'normalize.css';
import './css/reset.css';
import UserDialog from './UserDialog';
import {getCurrentUser,TodoModel} from './leanCloud';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user: getCurrentUser() || {},
      todoList:[]
    };
    //加载leancloud数据
    if(this.state.user) {
      TodoModel.getByUser(this.state.user,(todos) => {
        let stateCopy=deepCopy(this.state)
        stateCopy.todoList=todos
        this.setState(stateCopy)
        console.log(stateCopy.todoList);
      })
    }     
  }
 
  render() {  
    return (
      <div className='App'>    
        {this.state.user.id ? 
          <ToDo user={deepCopy(this.state.user)} todoList={deepCopy(this.state.todoList)}/> : 
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
    if(this.state.user) {
      TodoModel.getByUser(this.state.user,(todos) => {
        let stateCopy=deepCopy(this.state)
        stateCopy.todoList=todos
        this.setState(stateCopy)
      })
    }    
  }
} 


export default App;


 //封装 JSON.parse(JSON.stringfy(xxx))
export function deepCopy(user){
    return JSON.parse(JSON.stringify(user));
  }



  



