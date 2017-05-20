import React,{Component} from 'react';
import './css/UserDialog.css';
import {signUp,signIn} from './leanCloud';

class UserDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: 'signIn',
      formData: {
        username: '',
        password: ''
      }
    };
  }
  
  switch(e){
    this.setState({
      selected: e.target.value
    });
  }
  
  signUp(e){
    e.preventDefault();
    let {username,password}=this.state.formData;
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
    signUp(username,password,success,error);
  }
  
  signIn(e){
    e.preventDefault();
    let {username,password}=this.state.formData;
    let success=(user)=>{
      this.props.onSignIn.call(null,user);
    };
    let error=(error)=>{
      switch(error.code){
        case 210:
          alert('用户名与密码不匹配');
          break;
        default:
          alert(error);
          break;
      }
    };
    signIn(username,password,success,error);
  }
  
  changeFormData(key,e){
    let stateCopy=JSON.parse(JSON.stringify(this.state));
    stateCopy.formData[key]=e.target.value;
    this.setState(stateCopy);
  }

  
  render(){
    let signUpForm=(
      <form className='signUp' onSubmit={this.signUp.bind(this)}> {/*注册*/}
        <div className='row'>
          <i className='iconfont'>&#xe62f;</i>
          <input type='text' value={this.state.formData.username} 
            onChange={this.changeFormData.bind(this,'username')}/>
        </div>
        <div className='row'>
          <i className='iconfont'>&#xe678;</i>
          <input type='password' value={this.state.formData.password} 
            onChange={this.changeFormData.bind(this,'password')}/>
        </div>
        <div className='row actions'>
          <button type='submit'>signUp</button>
        </div>
      </form>   
    );
    let signInForm=(
      <form className='signUp' onSubmit={this.signIn.bind(this)}> {/*登录*/}
        <div className='row'>
          <i className='iconfont'>&#xe62f;</i>
          <input type='text' value={this.state.formData.username}
            onChange={this.changeFormData.bind(this,'username')}/>
        </div>
        <div className='row'>
          <i className='iconfont'>&#xe678;</i>
          <input type='password' value={this.state.formData.password} 
            onChange={this.changeFormData.bind(this,'password')}/>
        </div>
        <div className='row actions'>
          <button type='submit'>signIn</button>
        </div>
      </form>
    );
    
    return (
      <div className='UserDialog-Wrapper'>
        <div className='UserDialog'>
          <nav>
            <label>
              <input type='radio' value='signIn' 
                checked={this.state.selected==='signIn'}  
                onChange={this.switch.bind(this)}/>signIn
            </label>
            <label>
              <input type='radio' value='signUp' 
                checked={this.state.selected==='signUp'}  
                onChange={this.switch.bind(this)} />signUp
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
































