import AV from 'leancloud-storage';


var APP_ID = 'LzQW0DEPEdxCqtgo9ePKkzsm-gzGzoHsz';
var APP_KEY = 'F4tJ4JqjmUChkRhLNsAbt99r';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel={
  getByUser(user,successFn,errorFn){
    let query=new AV.Query('Todo');
    query.equalTo('deleted',false);
    query.find().then((response) => {
      let array=response.map((t) => {
        return {
          id:t.id,
          ...t.attributes
        }
      })
      successFn.call(null,array)
    },(error) => {
      errorFn && errorFn.call(null,error)
    })
  },
  create({status,title,deleted},successFn,errorFn){
    let Todo=AV.Object.extend('Todo')
    let todo=new Todo()
    todo.set('title',title)
    todo.set('status',status)
    todo.set('deleted',deleted)    
    //新建一个ACL实例
    let acl=new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setReadAccess(AV.User.current(),true);
    acl.setWriteAccess(AV.User.current(),true);
    
    todo.setACL(acl);
  
    todo.save().then(function(response){
      successFn.call(null,response.id)
    },function(error){
      errorFn && errorFn.call(null,error)
    });
  },
  update({id,title,status,deleted},successFn,errorFn){
    let todo=AV.Object.createWithoutData('Todo',id);
    title !== undefined && todo.set('title',title);
    status !== undefined && todo.set('status',status);
    deleted !== undefined && todo.set('deleted',deleted);
    todo.save().then((response) => {
      successFn && successFn.call(null)
    },(error) => errorFn && errorFn.call(null,error))
  },
  destroy(todoId,successFn,errorFn){
    /*let todo=AV.Object.createWithoutData('Todo',todoId);
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)
    },function(error){
      errorFn && errorFn.call(null,error)
    })*/
    TodoModel.update({id:todoId,deleted: true},successFn,errorFn)
  }
  
}

//注册
export function signUp(email,username,password,successFn,errorFn){ 
  let user=new AV.User();
  //设置邮箱
  user.setEmail(email);
  //设置用户名
  user.setUsername(username);
  //设置密码
  user.setPassword(password);  
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








