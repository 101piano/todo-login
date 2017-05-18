import React,{Component} from 'react';
import './css/TodoItem.css';

class TodoItem extends Component {
  render(){
    return(
      <div className='TodoItem'>
        <input type='checkbox' checked={this.props.todo.status==='completed'}
          onChange={this.toggle.bind(this)}/>
        <span className='title'>{this.props.todo.title}</span>
        <div  className='delete' onClick={this.delete.bind(this)}>
          <div className='circle'><p>-</p></div>         
        </div>
      </div>
    )
  }
  
  toggle(e,todo){
    this.props.onToggle(e,this.props.todo);
  }
  delete(e,todo,done){
    this.props.onDelete(e,this.props.todo);
  }
}
export default TodoItem