import React,{Component} from 'react';
import './../css/TodoInput.css';

class TodoInput extends Component {
  render(){
    return (
      <input type='text' value={this.props.content} 
        className='TodoInput'
        placeholder='add ToDo, enter'
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}
      />
    )
  }
  
  changeTitle(e){
    this.props.onChange(e);
  }
  submit(e){   
    if( this.props.content && e.key==='Enter'){
      this.props.onSubmit(e);
    }
  }
}
export default TodoInput























