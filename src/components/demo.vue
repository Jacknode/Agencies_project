<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">订单信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>订单号筛选:</span>
        <input type="text" placeholder="订单号" v-model="initUser">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>订单类型</th>
          <th>订单号</th>
          <th>订单价格</th>
          <th>订单创建时间</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>gggggg</td>
          <td>fafafa</td>
          <td>dadadaa</td>
          <td class="time">dadaa</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  export default{
    name: '',
    data(){
      return {
        initUser:''//初始化搜索
      }
    },
    computed:mapGetters([]),
    methods:{
      //筛选
      search(){}
    }
  }
</script>
<style scoped>

</style>
