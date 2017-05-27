import React,{Component} from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';


export default class SignInOrSignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: 'signIn'
    }
  }
  
  render(){
    return(
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
              <SignUpForm formData={this.props.formData}
                onSubmit={this.props.onSignUp}
                onChange={this.props.onChange} 
              />
              : null}
            {this.state.selected === 'signIn' ? 
              <SignInForm formData={this.props.formData}
                onSubmit={this.props.onSignIn}
                onChange={this.props.onChange}
                onForgotPassword={this.props.onForgotPassword}
              />
              : null}           
          </div>
        </div>  
    )
  }
  
  componentDidUpdate(){
    this.changeColor(this.state.selected);      
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
  

  switchOpt(e){
    this.setState({
      selected: e.target.value
    });  
  }
  
}































