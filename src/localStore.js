
export function save(key,value){
  return window.localStorage.setItem(key,JSON.stringify(value));
}

export function load(key){
  return JSON.parse(window.localStorage.getItem(key));
}


//每次用户更新数据时，将所有todo以字符串的形式保存在localStorage里
//每次用户访问页面时，将localStorage里面的字符串变为对象，赋值给todoList

/*
setItem()作为Storage接口的方法，会接受一个键名和值作为参数，将会把
键名添加到存储中，如果键名已存在，则更新其对应的值
*/

/*
getItem()作为Storage接口的方法，接受一个键名作为参数，并返回对应键名的值
*/

/*
JSON.
*/






























