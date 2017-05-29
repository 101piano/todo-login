import AV from 'leancloud-storage';


var APP_ID = 'LzQW0DEPEdxCqtgo9ePKkzsm-gzGzoHsz';
var APP_KEY = 'F4tJ4JqjmUChkRhLNsAbt99r';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel={
  create({status,title,deleted},successFn,errorFn){
    let Todo=AV.Object.extend('Todo')
    let todo=new Todo()
    todo.set('title',title)
    todo.set('status',status)
    todo.set('deleted',deleted)
    todo.save().then(function(response){
      console.log(response.id);
      successFn.call(null,response.id)
    },function(error){
      errorFn && errorFn.call(null,error)
    });
  },
  update(){
    
  },
  destroy(){
    
  }
  
}

//注册
export function signUp(email,username,password,successFn,errorFn){
  let user=new AV.User();
  //设置用户名
  user.setUsername(username);
  //设置密码
  user.setPassword(password);
  //设置邮箱
  user.setEmail(email);
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null,user);  
  },function(error){
    errorFn.call(null,error);
  });
  return undefined
}


//登录
export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user);
  }, function (error) {
    errorFn.call(null, error);
  })
}

export function getCurrentUser(){
  let user=AV.User.current();
  if(user){
    return getUserFromAVUser(user);
  }else {
    return null;
  }
}

export function signOut(){
  AV.User.logOut();
  return undefined;
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function(success){
    successFn.call();
  },function(error){
    errorFn.call(null,error);
  });
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}






















































