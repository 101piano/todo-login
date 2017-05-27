import React,{Component} from 'react';
import './css/UserDialog.css';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud';
import {deepCopy} from './App';
import SignUpForm from './child/SignUpForm';
import SignInForm from './child/SignInForm';

class UserDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: 'signIn',
      selectedTab: 'signInOrSignUp',
      formData: {
        email:'',
        username: '',
        password: '',     
      }
    };
  }
  componentDidUpdate(){
    if(this.state.selectedTab==='signInOrSignUp'){
      this.changeColor(this.state.selected);
    }    
  }
    
  switchOpt(e){
    this.setState({
      selected: e.target.value
    });  
  }
  
  changeColor(selected){
    let nav0=document.getElementsByTagName('nav')[0];
    if(selected==='signIn'){   
      nav0.getElementsByTagName('label')[0].classList.add('active');
      nav0.getElementsByTagName('label')[1].classList.remove('active');
    }else if(selected==='signUp'){
      nav0.getElementsByTagName('label')[1].classList.add('active');
      nav0.getElementsByTagName('label')[0].classList.remove('active');
    }
  } 
  
  signUp(e){
    e.preventDefault();
    let {email,username,password}=this.state.formData;
    let success=(user)=>{
      this.props.onSignIn.call(null,user);
    };
    let error=(error)=>{
      switch(error.code){
        case 202:
          alert('用户名已被占用');
          break;
        default:
          alert(error);
          break;
      }
    };
    signUp(email,username,password,success,error);
  }
  
  signIn(e){
    e.preventDefault();
    let {username,password}=this.state.formData;
    let success=(user)=>{
      this.props.onSignIn.call(null,user);
    };
    let error=(error)=>{
      switch(error.code){
        case 200:
          alert('请输入用户名');
          break;
        case 201:
          alert('请输入密码');
          break;
        case 210:
          alert('用户名与密码不匹配');
          break;
        case 211:
          alert('找不到用户');
          break;
        default:
          alert(error);
          break;
      }
    };
    signIn(username,password,success,error);
  }
  
  changeFormData(key,e){
    let stateCopy=deepCopy(this.state);
    stateCopy.formData[key]=e.target.value;
    this.setState(stateCopy);
  }
  
  
  render(){
    let signInOrSignUp=(    
        <div className='signInOrSignUp'>
          <nav>
            <label  className='active'>
              <input type='radio' value='signIn'
                checked={this.state.selected==='signIn'}  
                onChange={this.switchOpt.bind(this)}/>登录
            </label>
            <label>
              <input type='radio' value='signUp' 
                checked={this.state.selected==='signUp'}  
                onChange={this.switchOpt.bind(this)} />注册
            </label>
          </nav>
          <div className='panes'>
            {this.state.selected === 'signUp' ? 
              <SignUpForm formData={this.state.formData}
                onSubmit={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)} />
              : null}
            {this.state.selected === 'signIn' ? 
              <SignInForm formData={this.state.formData}
                onSubmit={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}/>
              : null}           
          </div>
        </div>  
    );
    let forgotPassword=(
      <div className='forgotPassword'>
        <h3>重置密码</h3>
        <form className='forgotPassword' onSubmit={this.resetPassword.bind(this)}>
          <div  className='row'>
            <label>邮箱</label>
            <input type='text' value={this.state.formData.email}
              onChange={this.changeFormData.bind(this,'email')}/>
          </div>
          <div className='row actions'>
            <button type='submit'>发送重置邮件</button>
            <a href='#' onClick={this.returnToSignIn.bind(this)}>返回登录</a>
          </div>
        </form>
      </div>
    );
    return (
      <div className='UserDialog-Wrapper'>
        <div className='UserDialog'>
          {this.state.selectedTab==='signInOrSignUp' ? signInOrSignUp : forgotPassword }
        </div>
      </div>   
    )
  }
  
  showForgotPassword(){
    let stateCopy=deepCopy(this.state);
    stateCopy.selectedTab='forgotPassword';
    this.setState(stateCopy);
  }
  
  resetPassword(e){
    e.preventDefault();
    sendPasswordResetEmail(this.state.formData.email);
  }
  
  returnToSignIn(){
    let stateCopy=deepCopy(this.state);
    stateCopy.selectedTab='signInOrSignUp';
    this.setState(stateCopy);
  }
}

export default UserDialog

































