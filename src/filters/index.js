/**
 * Created by leibo on 17/11/13.
 */
//获取日期 格式年-月-日
export const getNewDate = (value) => {
  let reg = /\d+/g
  if(value){
    var num = value.match(reg)[0];
    var date = new Date(Number(num));
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

};
//获取状态
export const getStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '空闲';
    case 1:
      return '锁定';
    default:
      return '使用'
  }
};
//获取启用状态
export const getDelete = (value) => {
  if (Number(value) == 0) {
    return '启用'
  } else {
    return '不启用'
  }
}
//获取入住状态
export const getUseStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未入住';
    case 1:
      return '已入住';
    case 2:
      return '已退房';
    default:
      return '未知';
  }
}
export const useStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已离店';
    default:
      return '未知';
  }
}
export const getGrade = (value) => {
  switch (Number(value)) {
    case 0:
      return '差评';
    case 1:
      return '中评';
    case 2:
      return '好评'
    default:
      return '未评级';
  }
}
