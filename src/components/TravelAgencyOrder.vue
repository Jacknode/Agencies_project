<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">订单信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>订单号筛选:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <input type="text" placeholder="输入内容" v-model="initUser">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>商家名称</th>
          <th>订单号</th>
          <th>下单用户名</th>
          <th>出售价格</th>
          <th>订单支付码</th>
          <th>支付状态</th>
          <th>使用状态</th>
          <th>订单支付方式</th>
          <th>订单支付时间</th>
          <th class="text-center">操作</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="item in initTravelAgencyOrder" v-if="initTravelAgencyOrder.length">
          <td>{{item.to_TouristBussinessName}}</td>
          <td>{{item.to_OrderID}}</td>
          <td>{{item.to_UserInfoName}}</td>
          <td>{{"¥ " +item.to_SellPrice}}</td>
          <td>{{item.to_PayStr}}</td>
          <td>{{item.to_PayStatus==0?"未支付":"已支付"}}</td>
          <td>{{item.to_UseStatus==0?"未使用":"已使用"}}</td>
          <td>{{item.to_PayWay}}</td>
          <td>{{item.to_PayTime}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <!--<li><a href="javascript:;" @click="addOrders"><i class="icon-add"></i>添加 </a></li>-->
                  <!--<li><a href="javascript:;" @click="updateOrders(item.to_OrderID,item.to_UserInfoID)"><i class="icon-pencil"></i> 修改</a></li>-->
                  <li><a href="javascript:;" @click="deleteOrder(item.to_OrderID)"><i class="icon-delicious"></i> 注销</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>

      <!--<el-pagination layout="prev, pager, next" :page-size="20" :total="total" style="float:right;">-->
      <!--</el-pagination>-->
    </div>
    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
    <!--&lt;!&ndash;添加订单&ndash;&gt;-->
    <!--<el-dialog title="添加订单" :visible.sync="addOrdersDialog">-->
      <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">-->
        <!--<el-form-item label="旅行社商户名称" :label-width="'130px'">-->
          <!--<el-select v-model="ruleForm.scenicUsersKeyWordVal" placeholder="请选择旅行社商户">-->
            <!--<el-option-->
              <!--v-for="item in scenicUsersKeyWord"-->
              <!--:key="item.tb_UserID"-->
              <!--:label="item.tb_Name"-->
              <!--:value="item.tb_UserID">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="订单号" prop="name">-->
          <!--<el-input v-model="ruleForm.name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="下单用户名称" prop="name">-->
          <!--<el-input v-model="ruleForm.nextName"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="出售价格" prop="name">-->
          <!--<el-input v-model="ruleForm.salePrice"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="订单支付码" prop="name">-->
          <!--<el-input v-model="ruleForm.paymentCode"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="支付状态">-->
          <!--<el-select v-model="ruleForm.PaymentStatus" placeholder="请选择支付状态">-->
            <!--<el-option label="已支付" value="1"></el-option>-->
            <!--<el-option label="未支付" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="使用状态">-->
          <!--<el-select v-model="ruleForm.useState" placeholder="请选择使用状态">-->
            <!--<el-option label="已使用" value="1"></el-option>-->
            <!--<el-option label="未使用" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-dialog>-->

    <!--&lt;!&ndash;修改订单&ndash;&gt;-->
    <!--<el-dialog title="修改订单" :visible.sync="updateOrdersDialog">-->
      <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">-->
        <!--<el-form-item label="旅行社商户名称" :label-width="'130px'">-->
          <!--<el-select v-model="ruleForm.scenicUsersKeyWordVal" placeholder="请选择旅行社商户">-->
            <!--<el-option-->
              <!--v-for="item in scenicUsersKeyWord"-->
              <!--:key="item.tb_UserID"-->
              <!--:label="item.tb_Name"-->
              <!--:value="item.tb_UserID">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="订单号" prop="name">-->
          <!--<el-input v-model="ruleForm.name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="下单用户名称" prop="name">-->
          <!--<el-input v-model="ruleForm.nextName" :disabled="true"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="出售价格" prop="name">-->
          <!--<el-input v-model="ruleForm.salePrice"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="订单支付码" prop="name">-->
          <!--<el-input v-model="ruleForm.paymentCode"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="支付状态">-->
          <!--<el-select v-model="ruleForm.PaymentStatus" placeholder="请选择支付状态">-->
            <!--<el-option label="已支付" value="1"></el-option>-->
            <!--<el-option label="未支付" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="使用状态">-->
          <!--<el-select v-model="ruleForm.useState" placeholder="请选择使用状态">-->
            <!--<el-option label="已使用" value="1"></el-option>-->
            <!--<el-option label="未使用" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="updateOrdersDialog = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogUpdateOrderProducts">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  import {POST,postPromise} from '../assets/js/universal'
  export default{
    name: '',
    data(){
      return {
        total:0,
        currentPage1:1,
        isOff:true,
        ruleForm: {
          scenicUsersKeyWordVal:'',
          orderNumber:'',
          nextName:'',
          salePrice:'',
          PaymentStatus:'',
          paymentCode:'',
          useState:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入订单号', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ],
        },
//        total:3000,总页数
//        addOrdersDialog:false,//添加弹窗
//        updateOrdersDialog:false,//修改弹窗
        initUser:'',//初始化搜索
        value:'',
        options: [
          {
            value: '1',
            label: '订单号查询'
          },
          {
            value: '2',
            label: '商户名称查询'
          },
          {
            value: '3',
            label: '栏目名称查询'
          },
          {
            value: '4',
            label: '产品名称查询'
          },
          {
            value: '',
            label: '全部'
          }
        ],
      }
    },
    computed:mapGetters([
        'scenicUsersKeyWord',
        'initTravelAgencyOrder'
    ]),
    methods:{
      handleCurrentChange(num){
        this.initData(num,{})
      },
      initData(num,options){
        postPromise('http://114.55.248.116:1111/TravelAgentService.asmx/GetSceneryOrderList',{
          loginUserID:'huileyou',
          loginUserPass:123,
          OrderID:options.OrderID?options.OrderID:'',//订单号
          TouristBussinessName:options.TouristBussinessName?options.TouristBussinessName:'',//商户名称
          GoodsListName:options.GoodsListName?options.GoodsListName:'',//产品名称
          UserInfoName:options.username?options.username:'',//订单用户
          CreateFrom:'',
          CreateTo:'',
          IsDelete:0,
          Page:num,
          Rows:5
        })
          .then(data=>{
            var data = JSON.parse(data);
            this.total = Number(data.total);
            if(Number(data.backCode)==200){
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.$store.commit('setInitTravelAgencyOrder',data.travelOrderList)
            }
          })
      },
      //筛选
      search(){
        this.initUser = this.initUser.trim()
        switch (Number(this.value)){
          case 1:
            this.initData(1,{OrderID:this.initUser,username:'',GoodsListName:'',TouristBussinessName:''})
            break;
          case 2:
            this.initData(1,{OrderID:'',username:this.initUser,GoodsListName:'',TouristBussinessName:''})
            break;
          case 3:
            this.initData(1,{OrderID:'',username:'',GoodsListName:this.initUser,TouristBussinessName:''})
            break;
          case 4:
            this.initData(1,{OrderID:'',username:'',GoodsListName:'',TouristBussinessName:this.initUser})
            break;
          default:
            this.initData(1,{OrderID:'',username:'',GoodsListName:'',TouristBussinessName:''})
            break;
        }
      },
      //注销订单
      deleteOrder(orderId){
        POST('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteSceneryOrder',{
          loginUserID:'huileyou',
          loginUserPass:123,
          orderID:orderId,
        },(data)=>{
          var data = JSON.parse(data);
          if(data.backCode ==200){
            this.$message({
              showClose: true,
              message: data.backResult,
              type: 'success'
            });
            this.total = 0;
            this.initData(1,{OrderID:'',username:'',GoodsListName:'',TouristBussinessName:''})
          }
        })
      }
//      //添加订单
//      addOrders(){
//        this.$store.commit('setTranstionFalse')
//        this.addOrdersDialog = true;
//      },
//      //修改初始化
//      updateOrders(orderId,userId){
//        console.log(userId)
//        this.$store.commit('setTranstionFalse')
//        this.updateOrdersDialog = true
//        this.$store.commit('initOrderUpdateObj',orderId)
//        POST('http://114.55.248.116:1001/Service.asmx/GetUserInfoList',{
//          condition:'UserCode',
//          key:userId
//        },(data)=>{
//          console.log(data)
//          var data = JSON.parse(data);
//          if(data.backCode ==200){
//            this.$store.commit('setUsers',data.userInfo)
//          }
//        })
//      },
//      //修改提交
//      dialogUpdateOrderProducts(){
//
//      }
    }
  }
</script>
<style scoped>
</style>
