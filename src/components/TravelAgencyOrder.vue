<template>
  <section id="wrap">
    <h1 class="userClass">旅行社订单管理</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <span>订单号查询:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="orderParentList"
      style="width: 100%;"
      v-loading="isLoading"
      @row-click="rowClick"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号:">
              <span>{{ props.row.ts_to_OrderID }}</span>
            </el-form-item>
            <el-form-item label="商家编码:">
              <span>{{ props.row.ts_to_TouristTraderID }}</span>
            </el-form-item>
            <el-form-item label="商家名称:">
              <span>{{ props.row.ts_to_TouristTraderName }}</span>
            </el-form-item>
            <el-form-item label="凭证码:">
              <span>{{ props.row.ts_to_Password }}</span>
            </el-form-item>
            <el-form-item label="张数:">
              <span>{{ props.row.ts_to_TicketCount }}</span>
            </el-form-item>
            <el-form-item label="总价格:">
              <span>{{ props.row.ts_to_SumPrice }}</span>
            </el-form-item>
            <el-form-item label="总服务费:">
              <span>{{ props.row.ts_to_SumService }}</span>
            </el-form-item>
            <el-form-item label="是否有效:">
              <span v-if="props.row.ts_to_od_IsDelete" style="color: green;">有效</span>
              <span v-else style="color: red;">无效</span>
            </el-form-item>
            <el-form-item label="出单:">
              <span>{{ props.row.ts_to_OutStatus }}</span>
            </el-form-item>
            <el-form-item label="售票方编码:">
              <span>{{ props.row.ts_to_SellID }}</span>
            </el-form-item>
            <el-form-item label="售票方:">
              <span>{{ props.row.ts_to_SellName }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.ts_to_CreateTime | getNewDate }}</span>
            </el-form-item>
            <el-form-item label="支付时间:">
              <span>{{ props.row.ts_to_PayTime | getNewDate }}</span>
            </el-form-item>
            <el-form-item label="支付方式:">
              <span>{{ props.row.ts_to_PayWay }}</span>
            </el-form-item>
            <el-form-item label="支付参数:">
              <span>{{ props.row.ts_to_PayParam }}</span>
            </el-form-item>
            <el-form-item label="支付状态:">
              <span>{{ props.row.ts_to_PayState }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.ts_to_Remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单号:"
        prop="ts_to_OrderID">
      </el-table-column>
      <el-table-column
        label="商家名称:"
        prop="ts_to_TouristTraderName">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >注销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="screenOrderChildArray"
      style="width: 100%; margin-top: 100px;"
      v-loading="toLoading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号:">
              <span>{{ props.row.ts_to_od_OrderID }}</span>
            </el-form-item>
            <el-form-item label="商家编码:">
              <span>{{ props.row.ts_to_od_TouristTraderID }}</span>
            </el-form-item>
            <el-form-item label="商家名称:">
              <span>{{ props.row.ts_to_od_TouristTraderName }}</span>
            </el-form-item>
            <el-form-item label="订单用户:">
              <span>{{ props.row.ts_to_od_GoodsListID }}</span>
            </el-form-item>
            <el-form-item label="用户姓名:">
              <span>{{ props.row.ts_to_od_GoodsListName }}</span>
            </el-form-item>
            <el-form-item label="电话:">
              <span>{{ props.row.ts_to_od_Phone }}</span>
            </el-form-item>
            <el-form-item label="身份证号码:">
              <span>{{ props.row.ts_to_od_CertNo }}</span>
            </el-form-item>
            <el-form-item label="售价:">
              <span>{{ props.row.ts_to_od_SellPrice }}</span>
            </el-form-item>
            <el-form-item label="服务费:">
              <span>{{ props.row.ts_to_od_ServiceFee }}</span>
            </el-form-item>
            <el-form-item label="使用状态:">
              <span>{{ props.row.ts_to_od_UseStatus }}</span>
            </el-form-item>
            <el-form-item label="是否有效:">
              <span v-if="props.row.ts_to_od_IsDelete" style="color: green;">有效</span>
              <span v-else style="color: red;">无效</span>
            </el-form-item>
            <el-form-item label="售票方编码:">
              <span>{{ props.row.ts_to_od_SellID }}</span>
            </el-form-item>
            <el-form-item label="售票方名称:">
              <span>{{ props.row.ts_to_od_SellName }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.ts_to_od_CreateTime | getNewDate }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单号:"
        prop="ts_to_od_OrderID">
      </el-table-column>
      <el-table-column
        label="商家名称:"
        prop="ts_to_od_TouristTraderName">
      </el-table-column>
    </el-table>
  </section>
</template>
<script>

  import {mapGetters} from 'vuex'

  export default {
    computed:mapGetters([
      'orderParentList',
      'screenOrderChildArray'
    ]),
    data() {
      return {
        filters: {
          name: ''
        },
        isLoading:false,
        toLoading:false

      }
    },
    methods: {
      initData(orderID) {
        var options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "orderID": orderID?orderID:''
        }
        this.isLoading = true
        this.$store.dispatch('initOrderList',options)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '查询成功！',
              type: 'success'
            });
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        this.isLoading = false
      },
      rowClick(row){
        this.toLoading = true;
        this.$store.commit('screenOrderChildList',row.ts_to_OrderID);
        this.toLoading = false;
      },
      search() {
        this.initData('')
      },
      handleDelete(row) {
        var DeleteSceneryOrder = {
          loginUserID:'huileyou',
          loginUserPass:123,
          orderID: row.ts_to_OrderID
        };
        this.$store.dispatch('deleteOrder',DeleteSceneryOrder)
          .then(()=> {
            this.$message({
              showClose: true,
              message: '注销成功！',
              type: 'success'
            });
            this.initData()
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }

    }
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    background: #fff;
    overflow: hidden;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
