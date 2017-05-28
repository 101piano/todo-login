import React from 'react';

export default function(props){
  return (
      <form className='signIn' onSubmit={props.onSubmit}> 
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe62f;</i>
          <input type='text' value={props.formData.username}
            onChange={props.onChange.bind(null,'username')}/>
        </div>
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe678;</i>
          <input type='password' value={props.formData.password} 
            onChange={props.onChange.bind(null,'password')}/>
        </div>
        <div className='row actions'>
          <a href='#' onClick={props.onForgotPassword}>忘记密码</a>
          <button type='submit'>登录</button>
        </div>
      </form>
    )    
}

  
