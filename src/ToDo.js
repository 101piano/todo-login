import React,{Component} from 'react';
import TodoInput from './child/TodoInput';
import TodoItem from './child/TodoItem';
import './css/ToDo.css';
import {signOut,TodoModel} from './leanCloud';
import {deepCopy} from './App';


class ToDo extends Component{
  constructor(props){
    super(props);
    this.state={
      newTodo: '',   
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
  
    return (
      <div className='myToDo'>      
        <div className='header'> 
          <div className='iconfont'>&#xe682;
            <ul className='user'>
              <li>
                {this.props.user.username}
              </li>
              <li>
                设置
              </li>
              <li>
                {this.props.user.id ? 
                  <button className='quit' onClick={this.signOut.bind(this)}>退出</button> 
                  :null
                }
              </li>
            </ul>
          </div>
          <div className='logo-word'>
            <p>Your</p>
            <p>Things</p>
          </div>        
          <div className='time'><p>时间</p></div>
          <div className='calculate'> 
            <ul>
              <li>
                <p className='num'>xx</p>
                <p>已完成</p>
              </li>
              <li>
                <p className='num'>xx</p>
                <p>未完成</p>
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
        <div className='haveDone'>
          <h2>已经完成</h2>
          <ol className='doneList'>
            {dones}
          </ol>
        </div>
      

        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo}       
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}
          />
        </div>  
      </div>  


    
      
    )
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
  signOut(){
    console.log('我点退出了哦');
    signOut();
    let stateCopy=deepCopy(this.state);
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





