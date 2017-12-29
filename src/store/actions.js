/**
 * Created by leibo on 17/11/6.
 */
import $ from 'jquery'
import axios from 'axios'
export default {
  //初始化商户信息
  initAgenciesUsers({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetSceneryList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) ==200){
            relove(Number(data.total))
            for(var i=0;i<data.touristBussinessList.length;i++){
              if(data.touristBussinessList[i].tb_ImageURL.includes(',')){
                data.touristBussinessList[i].tb_ImageURLList = data.touristBussinessList[i].tb_ImageURL.split(',')
              }else{
                data.touristBussinessList[i].tb_ImageURLList = data.touristBussinessList[i].tb_ImageURL
              }
            }
            commit('initAgencies',data.touristBussinessList)
            commit('initAgenciesKeyWord',data.touristBussinessList)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //添加商户信息
  addUserInformation({conmmit},data){
    return new Promise(function (relove,reject) {
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/AddTouristBussiness',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode)==200){
            relove()
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //修改商户请求
  modifyUser({conmmit},data){
    return new Promise(function (relove,reject) {
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateTouristBussiness',{
         paramJson: JSON.stringify(data)
       },{
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         }
       })
        .then(data=>{
           var data= data.data;
           if(Number(data.backCode)==200){
             relove()
           }else{
             reject(data.backResult)
           }
      })
    })
  },
  //删除商户请求
  deleteUser({conmmit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteScenery',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //密码修改请求
  modifyPassword({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateSceneryPassword',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //查询旅行社商户
  travelUserSeach({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetSceneryList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            relove(data);
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //添加旅行社商户
  addColumn({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/AddAgentItem',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode == 200) ){
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //修改栏目提交
  modifyColumnSubmit({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateAgentItem',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.backCode) == 200) {
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //删除栏目
  deleteColumn({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteAgentItem',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.backCode) == 200) {
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //查询旅行社管理项目
  travelSeachProject({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetAgentItemList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200) {
            commit('initManagement',data.itemInfoList)
            relove(Number(data.total));
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //查询并添加旅行社产品列表
  addTravelProductList({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/SelectGoodList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            relove(data);
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //修改产品提交
  Tmodifyravelroduct({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateGood',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          console.log(data)
          if( Number(data.backCode) == 200 ){
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //删除产品
  deleteProducts({commit},data){
    return new Promise(function(relove, reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteGood',{
         paramJson: JSON.stringify(data)
       },{
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         }
       })
        .then(data=>{
          var data = data.data;
          if (Number(data.backCode) == 200) {
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //查询旅行社订单
  initOrderList({commit},data){
    return new Promise((relove,reject)=>{
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetSceneryOrderList', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.resultcode) == 200 ){
            commit('initOrderParentList',data.data.parentList)
            commit('initOrderChildList',data.data.childList)
            relove()
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //注销订单
  deleteOrder({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteSceneryOrder', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;

          console.log(data)
          if( Number(data.resultcode) == 200 ){
            relove();
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //商户上传图片
  uploadImgs(store,data){
    return new Promise((relove,reject)=>{
      // $.post('http://image.1000da.com.cn/ImageOperate.asmx/ImageDeal',data,data=>{
      //   console.log(data)
      // })
      axios.post('http://image.1000da.com.cn/ImageOperate.asmx/ImageDeal',data,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        relove(data.data)
      })
    })
  }
}
