import React,{Component} from 'react';
import TodoInput from './child/TodoInput';
import TodoItem from './child/TodoItem';
import './css/ToDo.css';
import {signOut,TodoModel,getCurrentUser} from './leanCloud';
import {deepCopy} from './App';


class ToDo extends Component{
  constructor(props){
    super(props);
    this.state={
      newTodo: '',
      todoList:[]
    }; 
    let user = getCurrentUser();
    if(user) {
      TodoModel.getByUser(user,(todos) => {
        let stateCopy=deepCopy(this.state)
        stateCopy.todoList=todos
        this.setState(stateCopy)
      })
    }
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
                      onDelete={this.delete.bind(this)} 
                    />
                  </li>
                )
              });
    let user=this.props.user;
 
    return (
      <div className='myToDo'>
        <h1>
          {user.username || '我'}的待办
          {user.id ? <button className='quit' onClick={this.signOut.bind(this)}>退出</button> : null}
        </h1>
        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo}       
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}
          />
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
     
  //与todo相关的函数 
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
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
      status: null,
      deleted: false
    }
    TodoModel.create(newTodo,(id) => {
      console.log(id);
      newTodo.id = id     
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    },(error) => {
      console.log(error);
    })
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
    stateCopy.user={};
    this.setState(stateCopy);//修改状态
  }

 
}
    
export default ToDo;

/*let id=0;
function idMaker(){
  id+=1;
  return id;
}*/

















































