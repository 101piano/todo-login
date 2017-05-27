import React,{Component} from 'react';
import './css/UserDialog.css';
import {signUp,signIn} from './leanCloud';
import {deepCopy} from './App';

class UserDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: 'signIn',
      formData: {
        email:'',
        username: '',
        password: '',     
      }
    };
  }
  componentDidUpdate(){
    this.changeColor(this.state.selected);
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
    let signUpForm=(
      <form className='signUp' onSubmit={this.signUp.bind(this)}>
        <div className='row inputbtn'>
          <label>邮箱</label>
          <input type='text' value={this.state.formData.email} 
            onChange={this.changeFormData.bind(this,'email')}/>
        </div>
        <div className='row inputbtn'>
          <label>用户名</label>
          <input type='text' value={this.state.formData.username} 
            onChange={this.changeFormData.bind(this,'username')}/>
        </div>
        <div className='row inputbtn'>
          <label>设置密码</label>
          <input type='password' value={this.state.formData.password} 
            onChange={this.changeFormData.bind(this,'password')}/>
        </div>
        <div className='row actions'>
          <button type='submit'>注册</button>
        </div>
      </form>   
    );
    let signInForm=(
      <form className='signUp' onSubmit={this.signIn.bind(this)}> 
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe62f;</i>
          <input type='text' value={this.state.formData.username}
            onChange={this.changeFormData.bind(this,'username')}/>
        </div>
        <div className='row inputbtn'>
          <i className='iconfont'>&#xe678;</i>
          <input type='password' value={this.state.formData.password} 
            onChange={this.changeFormData.bind(this,'password')}/>
        </div>
        <div className='row actions'>
          <a href='javascript:;'>忘记密码</a>
          <button type='submit'>登录</button>
        </div>
      </form>
    );
    
    return (
      <div className='UserDialog-Wrapper'>
        <div className='UserDialog'>
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
            {this.state.selected === 'signUp' ? signUpForm: null}
            {this.state.selected === 'signIn' ? signInForm: null}           
          </div>
        </div>
      </div>   
    )
  }
}

export default UserDialog

































