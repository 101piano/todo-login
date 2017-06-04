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
          onChange={props.onChange.bind(null,'username')}
          placeholder='3-10个字符'
        />
      </div>
      <div className='row inputbtn'>
        <label>设置密码</label>
        <input type='password' value={props.formData.password}
          placeholder='至少两种字符组合，6-10个字符'
          onChange={props.onChange.bind(null,'password')}
        />
      </div>
      <div className='row actions'>
        <button type='submit'>注册</button>
      </div>
    </form>  
    
  )
}


