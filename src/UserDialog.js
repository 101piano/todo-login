import React,{Component} from 'react';
import './css/UserDialog.css';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud';
import {deepCopy} from './App';
import ForgotPasswordForm from './child/ForgotPasswordForm';
import SignInOrSignUp from './child/SignInOrSignUp';  


class UserDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'signInOrSignUp',
      formData: {
        email:'',
        username: '',
        password: '',     
      }
    };
  }
     
  render(){
    return (
      <div className='UserDialog-Wrapper'>
        <div className='UserDialog'>
          {this.state.selectedTab==='signInOrSignUp' ? 
            <SignInOrSignUp 
              formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)} 
            />: 
            <ForgotPasswordForm 
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)} 
              onChange={this.changeFormData.bind(this)} 
              onSignIn={this.returnToSignIn.bind(this)}
              onSignUp={this.returnToSignUp.bind(this)}
            />
          }
        </div>
      </div>   
    )
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
        case 203:
          alert('电子邮箱地址已经被占用');
        default:
          alert(error);
          break;
      }
    };
    if(!isValidEmail(email)) {
      alert('请提供有效的邮箱地址');
    }
    if(!isValidUsername(username)){
      alert('请提供有效的用户名');
    }
    if(!isValidPassword(password)){
      alert('请提供有效的密码');
    }
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
  
  
  showForgotPassword(){
   // debugger;
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
  returnToSignUp(){
    let stateCopy=deepCopy(this.state);
    stateCopy.selectedTab='signInOrSignUp';
    this.setState(stateCopy);
  }
}

export default UserDialog


//判断邮箱
function isValidEmail(str){
  let result=/^[a-zA-Z0-9]\w+@[a-zA-Z0-9]+(\.com)$/.test(str);
  return result;
}

//判断用户名
function isValidUsername(str){
  let result=/[^\r\n]{3,10}/.test(str);
  return result;
}

//判断密码
function isValidPassword(str) {
  if(str.legnth<6 || str.length>10 || /\W/.test(str))
    return false;
  var cond=0;
  if(/[A-Z]/.test(str)) cond++;
  if(/[a-z]/.test(str)) cond++;
  if(/[0-9]/.test(str)) cond++;
  if(/_/.test(str)) cond++;
  if(cond>=2) {
    return true;
  }else {
    return false;
  }
}



