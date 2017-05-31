import React,{Component}from 'react';

export default class ForgotPasswordForm extends Component{
  render(){
    return(
      <div className='forgotPassword'>
        <div className='header'>
          <h2>My Todo</h2>
          <h3>找回密码</h3>
          <ul>
            <li><a href='#' onClick={this.props.onSignUp}>注册</a></li>
            <li><a href='#' onClick={this.props.onSignIn}>登录</a></li>
          </ul>
        </div>
        <form className='forgotPasswordoform' onSubmit={this.props.onSubmit}>
          <div className='row'>
            <label>邮箱:</label>
            <input type='text' value={this.props.formData.email}
              onChange={this.props.onChange.bind(null,'email')}/>
          </div>
          <div className='row actions'>
            <button type='submit'>发送重置邮件</button>
          </div>
        </form>
      </div>
    )
  }
}


































