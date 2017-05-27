import React,{Component}from 'react';

export default class SignUpForm extends Component {
  render(){
    return (
      <form className='signUp' onSubmit={this.props.onSubmit.bind(this)}>
        <div className='row inputbtn'>
          <label>����</label>
          <input type='text' value={this.state.formData.email} 
            onChange={this.props.onChange.bind(null,'email')}/>
        </div>
        <div className='row inputbtn'>
          <label>�û���</label>
          <input type='text' value={this.state.formData.username} 
            onChange={this.props.onChange.bind(null,'username')}/>
        </div>
        <div className='row inputbtn'>
          <label>��������</label>
          <input type='password' value={this.state.formData.password} 
            onChange={this.props.onChange.bind(null,'password')}/>
        </div>
        <div className='row actions'>
          <button type='submit'>ע��</button>
        </div>
      </form>  
    
    )
  }
}