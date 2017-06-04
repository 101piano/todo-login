import React from 'react';

export default function(props){
  return (
      <form className='signIn' onSubmit={props.onSubmit}> 
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe627;</i>
          <input type='text' value={props.formData.username}
            placeholder='用户名'
            onChange={props.onChange.bind(null,'username')}
          />
        </div>
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe65e;</i>
          <input type='password' value={props.formData.password}
             placeholder='密码'
            onChange={props.onChange.bind(null,'password')}
          />
        </div>
        <div className='row actions'>
          <a href='#' onClick={props.onForgotPassword}>忘记密码</a>
          <button type='submit'>登录</button>
        </div>
      </form>
    )    
}

  
