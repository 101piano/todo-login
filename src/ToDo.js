import React,{Component} from 'react';
import TodoInput from './child/TodoInput';
import TodoItem from './child/TodoItem';
import {signOut} from './leanCloud';

class ToDo extends Component{
  constructor(props){
    super(props);
    this.state={
      newTodo: '',
      todoList: []
    }; 
  }
  
  render(){
    let todos=this.state.todoList
              .filter((item)=> !item.delete && !(item.status==='completed'))
              .map((item,index)=>{
                return(
                  <li key={index}>
                    <TodoItem todo={item} 
                      onToggle={this.toggle.bind(this)}
                      onDelete={this.delete.bind(this)}/>
                  </li>
                )
              }),
        dones=this.state.todoList
              .filter((item)=> !item.delete && item.status==='completed')
              .map((item,index)=>{
                return(
                  <li key={index} className='doneItem'>
                    <TodoItem todo={item}
                     onToggle={this.toggle.bind(this)}
                     onDelete={this.delete.bind(this)} />
                  </li>
                )
              }),
        user=JSON.parse(this.props.user);
      console.log(user.id);
 
    return (
      <div className='myToDo'>
        <h1>
          {user.username || '我'}的待办
          {user.id ? <button onClick={this.signOut.bind(this)}>quite</button> : null}
        </h1>
        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo}
          
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <div className='toDoing'>
          <h2>正在进行</h2>
          <ol className='todoList'>
            {todos}
          </ol>
        </div>
        <div className='haveDone'>
          <h2>已经完成</h2>
          <ol className='doneList'>
            {dones}
          </ol>
        </div>
      </div>   
    )
  }
   
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    });
  }
  
  addTodo(e){
    this.state.todoList.push({
      id:idMaker(),
      title:e.target.value,
      status: null,
      deleted: false
    });
    this.setState({
      newTodo:'',
      tododList:this.state.todoList
    }); 
  }
  
  toggle(e,todo){
    todo.status=todo.status==='completed' ? '':'completed';
    this.setState(this.state);
  }
  
  delete(e,todo){
    todo.delete=true;
    this.setState(this.state);
  }
  
  signOut(){
    signOut();
  }
  
}
  

export default ToDo;

let id=0;
function idMaker(){
  id+=1;
  return id;
}
