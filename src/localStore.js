
export function save(key,value){
  return window.localStorage.setItem(key,JSON.stringify(value));
}

export function load(key){
  return JSON.parse(window.localStorage.getItem(key));
}


//ÿ���û���������ʱ��������todo���ַ�������ʽ������localStorage��
//ÿ���û�����ҳ��ʱ����localStorage������ַ�����Ϊ���󣬸�ֵ��todoList

/*
setItem()��ΪStorage�ӿڵķ����������һ��������ֵ��Ϊ�����������
������ӵ��洢�У���������Ѵ��ڣ���������Ӧ��ֵ
*/

/*
getItem()��ΪStorage�ӿڵķ���������һ��������Ϊ�����������ض�Ӧ������ֵ
*/

/*
JSON.
*/






























