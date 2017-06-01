import React from 'react';

export default function (props){
  return (
    <form className='signUp' onSubmit={props.onSubmit.bind(this)}>
      <div className='row inputbtn'>
        <label>邮箱</label>
        <input type='text' value={props.formData.email} 
          onChange={props.onChange.bind(null,'email')}/>
      </div>
      <div className='row inputbtn'>
        <label>用户名</label>
        <input type='text' value={props.formData.username} 
          onChange={props.onChange.bind(null,'username')}/>
      </div>
      <div className='row inputbtn'>
        <label>设置密码</label>
        <input type='password' value={props.formData.password} 
          onChange={props.onChange.bind(null,'password')}/>
      </div>
      <div className='row actions'>
        <a href='#' onClick={props.onForgotPassword}></a>
        <button type='submit'>注册</button>
      </div>
    </form>  
    
  )
}



