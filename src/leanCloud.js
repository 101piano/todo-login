
import AV from 'leancloud-storage';
var APP_ID = 'LzQW0DEPEdxCqtgo9ePKkzsm-gzGzoHsz';
var APP_KEY = 'F4tJ4JqjmUChkRhLNsAbt99r';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  var user=new AV.User();
  //设置用户名
  user.setUsername(username);
  //设置密码
  user.setPassword(password);
  //设置邮箱
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error);
  });
  return undefined
}

export function getCurrentUser(){
  let user=AV.User.current();
  if(user){
    return getUserFromAVUser(user);
  }else {
    return null
  }
}

export function signOut(){
  AV.User.logOut();
  return undefined;
}

export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}





















































