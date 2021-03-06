﻿import React,{Component} from 'react';
import TodoInput from './child/TodoInput';
import TodoItem from './child/TodoItem';
import UserLogout from './child/UserLogout';
import './css/ToDo.css';
import {signOut,TodoModel} from './leanCloud';
import {deepCopy} from './App';


class ToDo extends Component{
  constructor(props){
    super(props);
    this.state={
      newTodo: '',
      showUserLogout: false,
      onshowTodoInput: false
    };    
  }
   
  render(){
    let todos=this.props.todoList
              .filter((item)=> !item.delete && !(item.status==='completed'))
              .map((item,index)=>{
                return(
                  <li key={index}>
                    <TodoItem todo={item} 
                      onToggle={this.toggle.bind(this)}
                      onDelete={this.delete.bind(this)}/>
                  </li>
                )
              });
    let dones=this.props.todoList
              .filter((item)=> !item.delete && item.status==='completed')
              .map((item,index)=>{
                return(
                  <li key={index} className='doneItem'>
                    <TodoItem todo={item}
                      onToggle={this.toggle.bind(this)}
                      onDelete={this.delete.bind(this)} 
                    />
                  </li>
                )
              });
    let date=new Date(),
        year=date.getFullYear(),//年
        month=date.getMonth()+1,//月，0-11
        day=date.getDate(), //日，1-31
        week=date.getDay();//星期，0-6
    switch(week){
      case 1:
        week = '一';
        break;
      case 2:
        week = '二';
        break;
      case 3:
        week = '三';
        break;
      case 4:
        week = '四';
        break;
      case 5:
        week = '五';
        break;
      case 6:
        week = '六';
        break;
      case 0:
        week = '日';
        break;
      default:break;
    }
             
    return (
      <div className='myToDo'>      
        <div className='header'> 
          <div className='sidebar'>
            <p className='iconfont' onClick={this.handleToggleClick.bind(this)}>
              {this.state.showUserLogout ? false: true }
              &#xe682;
            </p>
            <UserLogout
              userLogout={this.state.showUserLogout} 
              user={this.props.user}
              onClick={this.signOut.bind(this)}
            />
          </div>
          <div className='logo-word'>
            <p>Your</p>
            <p>Things</p>
          </div>        
          <div className='date-num'> 
            <ul>
              <li>
                <p>{year}-{month}-{day}</p>
                <p>星期{week}</p>
              </li>
              <li>
                <p className='num'>{todos.length}</p>
                <p>未完成</p>
              </li>
              <li>
                <p className='num'>{dones.length}</p>
                <p>已完成</p>
              </li>
            </ul>          
          </div>         
        </div>       
        <div className='to-doing'>
          <h2>正在进行</h2>
          <ol className='todoList'>
            {todos}
          </ol>
        </div>
        <div className='have-done'>
          <h2>已经完成</h2>
          <ol className='doneList'>
            {dones}
          </ol>
        </div>
        <div className='add-wrap'>
          <div className='add-button'>
            <p className='iconfont' onClick={this.showTodoInput.bind(this)}>&#xe6ad;
              {this.state.onshowTodoInput ? false:true}
            </p>
          </div> 
        </div> 
        <TodoInput content={this.state.newTodo}       
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)}
          onxx={this.state.onshowTodoInput}
          onyy={this.showTodoInput.bind(this)}
        />
      </div>      
    )
  }
  
  handleToggleClick(){
    this.setState(prevState => ({
      showUserLogout: !prevState.showUserLogout
    }));
  }
  
  showTodoInput(){
    this.setState(prevState => ({
      onshowTodoInput: !prevState.onshowTodoInput
    }));
  } 
  //与todo相关的函数 
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.props.todoList
    });
  }
  
  addTodo(e){
    /*this.state.todoList.push({
      id:idMaker(),
      title:e.target.value,
      status: null,
      deleted: false
    });
    this.setState({
      newTodo:'',
      tododList:this.state.todoList
    }); */
    let newTodo={
      title: e.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo,(id) => {
      newTodo.id = id     
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.props.todoList
      })
    },(error) => {
      console.log(error);
    })
  }
  
  toggle(e,todo){
    let oldStatus=todo.status;
    todo.status=todo.status==='completed' ? '':'completed';
    TodoModel.update(todo,() => {
      this.setState(this.state);
    },(error) => {
      todo.status=oldStatus;
      this.setState(this.state);
    })
    
  }
  
  delete(e,todo){
    TodoModel.destroy(todo.id,() => {
      todo.delete=true;
      this.setState(this.state); 
    })     
  }
  
  //与leanCloud相关的函数 
  signOut(e){
    this.props.onClick(e);
  }

 
}
    
export default ToDo;


