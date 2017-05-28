import React,{Component} from 'react';
import './../css/TodoInput.css';


function submit(props,e) {
  console.log(e);//代理Proxy
  console.log(props);//Object，包含content,onChange(),onSubmit
  console.log(this);//null
  if(props.content && e.key==='Enter'){
    props.onSubmit(e);
  }
}

function changeTitle(props,e) {
  props.onChange(e);
}

export default function (props){
  return (
    <input type='text' value={props.content} 
      className='TodoInput'
      placeholder='输入待办事项，回车'
      onChange={changeTitle.bind(null,props)}
      onKeyPress={submit.bind(null,props)}
    />
  )
}




/*class TodoInput extends Component {
  render(){
    return (
      <input type='text' value={this.props.content} 
        className='TodoInput'
        placeholder='输入待办事项，按回车'
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}
      />
    )
  }
  
  changeTitle(e){
    this.props.onChange(e);
  }
  submit(e){   
  console.log(e);//代理Proxy
  console.log(this);//指TodoInput组件
  console.log(this.props);//Object，包含content,onChange(),onSubmit
    if(this.props.content && e.key==='Enter'){
      this.props.onSubmit(e);
    }
  }
}
export default TodoInput*/
























