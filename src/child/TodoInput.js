import React from 'react';
import './../css/TodoInput.css';


function submit(props,e) {
  //console.log(e);//代理Proxy
  //console.log(props);//Object，包含content,onChange(),onSubmit
  //console.log(this);//null
  if(e.target.value.trim() !== '' && e.key==='Enter'){
    props.onSubmit(e);
  }
}

function changeTitle(props,e) {
  props.onChange(e);
}

export default function (props){
  return (
    <div className='TodoInput'>
      <div className='header'>
        <ul>
          <li className='iconfont'>&#xe72f;</li>
          <li className='add-thing'>添加待办事项</li>
          <li className='iconfont'>&#xe6d2;</li>
        </ul>     
      </div>
      <div className='logo-img'>
       
      </div>
      <div className='inputs'>
        <input type='text'  placeholder='私事？公事？'/>
        <input type='text' value={props.content} 
          className='todo-input'
          placeholder='待办事项'
          onChange={changeTitle.bind(null,props)}
          onKeyPress={submit.bind(null,props)}
        />
        <input type='text'  placeholder='时间'/>
        <button className='add'>添加</button>
      </div>
      
      
    </div>
    
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
























