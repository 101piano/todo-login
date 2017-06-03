import React from 'react';

export default function (props) {
  if(!props.userLogout) {
    return null;
  }
  return (
    <ul className='user'>
      <li>
        {props.user.username}
      </li>
      <li className='iconfont'>
        &#xe600;
      </li>
      <li className='quit'>
        {props.user.id ? 
          <p  
            onClick={signOut.bind(null,props)}>退出
          </p> 
          :null
        }
      </li>
    </ul>  
  ) 
  

}

  function signOut(props,e){
    props.onClick(e);
  }
