import React,{Component}from 'react';

export default function (props){
  return (
    <form className='signUp' onSubmit={this.props.onSubmit.bind(this)}>
      <div className='row inputbtn'>
        <label>邮箱</label>
        <input type='text' value={this.props.formData.email} 
          onChange={this.props.onChange.bind(null,'email')}/>
      </div>
      <div className='row inputbtn'>
        <label>用户名</label>
        <input type='text' value={this.props.formData.username} 
          onChange={this.props.onChange.bind(null,'username')}/>
      </div>
      <div className='row inputbtn'>
        <label>设置密码</label>
        <input type='password' value={this.props.formData.password} 
          onChange={this.props.onChange.bind(null,'password')}/>
      </div>
      <div className='row actions'>
        <button type='submit'>注册</button>
      </div>
    </form>  
    
  )
}



