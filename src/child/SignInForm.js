import React,{Component}from 'react';

export default class SignUpForm extends Component {
  render(){
    return (
      <form className='signUp' onSubmit={this.props.onSubmit}> 
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe62f;</i>
          <input type='text' value={this.props.formData.username}
            onChange={this.props.onChange.bind(null,'username')}/>
        </div>
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe678;</i>
          <input type='password' value={this.props.formData.password} 
            onChange={this.props.onChange.bind(null,'password')}/>
        </div>
        <div className='row actions'>
          <a href='#' onClick={this.props.onForgotPassword.bind(this)}>忘记密码</a>
          <button type='submit'>登录</button>
        </div>
      </form>
    )    
  }
      
  
}