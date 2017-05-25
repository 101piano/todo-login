import React,{Component} from 'react';
import TodoInput from './child/TodoInput';
import TodoItem from './child/TodoItem';
import './css/ToDo.css';
import AV from 'leancloud-storage';
import {signOut,getCurrentUser,getUserFromAVUser} from './leanCloud';
import {deepCopy} from './App';

class ToDo extends Component{
  constructor(props){
    super(props);
    this.state={
      newTodo: '',
      todoList:[]
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
              });
    let dones=this.state.todoList
              .filter((item)=> !item.delete && item.status==='completed')
              .map((item,index)=>{
                return(
                  <li key={index} className='doneItem'>
                    <TodoItem todo={item}
                     onToggle={this.toggle.bind(this)}
                     onDelete={this.delete.bind(this)} />
                  </li>
                )
              });
    let user=this.props.user;
 
    return (
      <div className='myToDo'>
        <h1>
          {user.username || '我'}的待办
          {user.id ? <button className='quit' onClick={this.signOut.bind(this)}>tuichu</button> : null}
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
   
  componentDidUpdate(){
    
  } 

  
  //与todo相关的函数 
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
    this.save();
  }
  
  toggle(e,todo){
    todo.status=todo.status==='completed' ? '':'completed';
    this.setState(this.state);
  }
  
  delete(e,todo){
    todo.delete=true;
    this.setState(this.state);    
  }
  
  //与leanCloud相关的函数 
  signOut(){
    signOut();
    let stateCopy=JSON.parse(JSON.stringify(this.state));
    console.log('退出成功');
    stateCopy.user={};
    this.setState(stateCopy);//修改状态
  }
  
  //保存todo
  /*save(){
    let user=getCurrentUser();
    console.log('开始保存');
    console.log(user.id);
    let todo = AV.Object.createWithoutData('_User', user.id);
    todo.set('todo',deepCopy(this.state.todoList));
    todo.save();//保存到云端
  }*/
  
 
 
}
    
export default ToDo;

let id=0;
function idMaker(){
  id+=1;
  return id;
}


















