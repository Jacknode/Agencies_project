<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">产品信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>筛选:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <input type="text" placeholder="输入内容" v-model="content">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>商户名称</th>
          <th>旅行社栏目</th>
          <th>产品标题</th>
          <th>产品价格</th>
          <th>产品过期时间</th>
          <th>是否可售</th>
          <th>产品内容</th>
          <th>备注</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in initTravelAgencyProducts">
          <td>{{item.UserName}}</td>
          <td>{{item.ItemName}}</td>
          <td>{{item.gl_Title}}</td>
          <td>¥ {{item.gl_Price}}</td>
          <td>{{item.gl_ExpireTime}}</td>
          <td>{{item.availableName}}</td>
          <td>{{item.gl_Content?item.gl_Content:'暂无内容'}}</td>
          <td>{{item.gl_Remark?item.gl_Remark:'暂无备注'}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="addTravelAgencyProductsUser"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;" @click="updateTravelAgencyProducts(item.gl_ID)"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;" @click="deleteTravelAgencyProducts(item.gl_ID)"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--添加产品-->
    <el-dialog title="添加产品" :visible.sync="addTravelAgencyProducts">
      <el-form :model="AddTravelAgencyProducts">
        <el-form-item label="产品编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddTravelAgencyProducts.glID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旅行社商户名称" :label-width="'130px'" :required="isOff">
          <el-select v-model="scenicUsersKeyWordVal" placeholder="请选择旅行社商户">
            <el-option
              v-for="item in scenicUsersKeyWord"
              :key="item.tb_UserID"
              :label="item.tb_Name"
              :value="item.tb_UserID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品栏目名称" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="TravelAgencyVal" placeholder="请选择产品栏目">
            <el-option
              v-for="item in managementUserKeyWord"
              :key="item.ii_ID"
              :label="item.ii_ItemName"
              :value="item.ii_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品标题" :label-width="formLabelWidth">
          <el-input v-model="AddTravelAgencyProducts.glTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddTravelAgencyProducts.glPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth"  label="产品过期时间"  :required="isOff">
          <el-date-picker
            v-model="AddTravelAgencyProducts.dateVal"
            type="date"
            placeholder="请选择产品过期时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否可售" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="AddTravelAgencyProducts.addTravelAgencyVal" placeholder="请选择是否可售">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品内容" :label-width="formLabelWidth">
          <el-input v-model="AddTravelAgencyProducts.glContent" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="AddTravelAgencyProducts.glRemark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTravelAgencyProducts = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddTravelAgencyProducts">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改产品-->
    <el-dialog title="修改产品" :visible.sync="updateTravelAgency">
      <el-form :model="UpdateTravelAgencyProducts">
        <el-form-item label="产品编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="UpdateTravelAgencyProducts.gl_ID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旅行社商户名称" :label-width="'130px'" :required="isOff">
          <el-select v-model="scenicUsersKeyWordVal" placeholder="请选择旅行社商户">
            <el-option
              v-for="item in scenicUsersKeyWord"
              :key="item.tb_UserID"
              :label="item.tb_Name"
              :value="item.tb_UserID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品栏目名称" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="TravelAgencyVal" placeholder="请选择产品栏目">
            <el-option
              v-for="item in managementUserKeyWord"
              :key="item.ii_ID"
              :label="item.ii_ItemName"
              :value="item.ii_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品标题" :label-width="formLabelWidth">
          <el-input v-model="UpdateTravelAgencyProducts.gl_Title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="UpdateTravelAgencyProducts.gl_Price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth"  label="产品过期时间"  :required="isOff">
          <el-date-picker
            v-model="UpdateTravelAgencyProducts.gl_ExpireTime"
            type="date"
            placeholder="请选择产品过期时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否可售" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="UpdateTravelAgencyProducts.updateAgencyVal" placeholder="请选择是否可售">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品内容" :label-width="formLabelWidth">
          <el-input v-model="UpdateTravelAgencyProducts.gl_Content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="UpdateTravelAgencyProducts.gl_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateTravelAgency = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdateTravelAgencyProducts">确 定</el-button>
      </div>
    </el-dialog>
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
  </div>
</template>
<script>
  //旅行社产品信息
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  import {JudgeInput} from '../assets/js/universal'
  import {POST} from '../assets/js/universal'
  export default{
    name: '',
    data(){
      return {
        total:0,
        currentPage1:1,
        isOff:true,
        initTravel:'',//初始化搜索
        options: [
          {
            value: '1',
            label: '商户名称查询'
          },
          {
            value: '2',
            label: '栏目查询'
          },
          {
            value: '3',
            label: '标题查询'
          },
          {
            value: '',
            label: '全部'
          }
        ],
        optionVals:[],
        value: '',
        content:'',
        addTravelAgencyProducts:false,
        updateTravelAgency:false,
        formLabelWidth:'120px',
        scenicUsersKeyWordVal:'',
        TravelAgencyVal:'',
        AddTravelAgencyProducts:{
          glID:'',
          glTitle:'',
          glPrice:'',
          dateVal:'',
          addTravelAgencyVal:'',
          glContent:'',
          glRemark:''
        }
      }
    },
    computed:mapGetters([
        'initTravelAgencyProducts',
        'managementUserKeyWord',
        'scenicUsersKeyWord',
        'UpdateTravelAgencyProducts'
    ]),
    methods:{
      handleCurrentChange(num){
        this.initData(num,{title:'',username:'',itemName:''})
      },
      //添加
      addTravelAgencyProductsUser(){
        this.addTravelAgencyProducts = true;
        this.$store.commit('setTranstionFalse')
      },
      initData(page,options){
        POST('http://114.55.248.116:1111/TravelAgentService.asmx/SelectGoodList',{
          loginUserID:'huileyou',
          loginUserPass:123,
          UserName:options.username,
          ItemName:options.itemName,
          Title:options.title,
          IsDelete:0,
          Page:page,
          Rows:5
        },(data)=>{
          var data = JSON.parse(data);
          publicInit.isBackCode(data,this)
          this.total = Number(data.total);
          if(Number(data.backCode)==200){
            if(!data.goodsList.length){
              this.$message({
                showClose: true,
                message: '获取产品列表失败,对应名称不正确！',
                type: 'error'
              });
              this.$store.commit('clearTravelAgency');
              return;
            }
            this.$message({
              showClose: true,
              message: data.backResult,
              type: 'success'
            });
            this.$store.commit('initTravelAgency',data.goodsList);
          }
        })
      },
      //筛选
      search(){
        switch (Number(this.value)){
          case 1:
            this.initData(1,{title:'',username:this.content,itemName:''})
            break;
          case 2:
            this.initData(1,{title:'',username:'',itemName:this.content})
            break;
          case 3:
            this.initData(1,{title:this.content,username:'',itemName:''})
            break;
          default:
            this.initData(1,{title:'',username:'',itemName:''})
            break;
        }
      },
      //添加产品提交
      dialogAddTravelAgencyProducts(){
        JudgeInput(this,{
          scenicUsersKeyWordVal:this.scenicUsersKeyWordVal,
          TravelAgencyVal:this.TravelAgencyVal,
          glID:this.AddTravelAgencyProducts.glID,
          glTitle:this.AddTravelAgencyProducts.glTitle,
          glPrice:this.AddTravelAgencyProducts.glPrice,
          dateVal:this.AddTravelAgencyProducts.dateVal,
          addTravelAgencyVal:this.AddTravelAgencyProducts.addTravelAgencyVal,
          glContent:this.AddTravelAgencyProducts.glContent,
          glRemark:this.AddTravelAgencyProducts.glRemark,
        },'addTravelAgencyProducts')

        POST('http://114.55.248.116:1111/TravelAgentService.asmx/AddGood',{
          loginUserID:'huileyou',
          loginUserPass:123,
          glID:this.AddTravelAgencyProducts.glID,
          glTitle:this.AddTravelAgencyProducts.glTitle,
          glPrice:this.AddTravelAgencyProducts.glPrice,
          glExpireTime:this.AddTravelAgencyProducts.dateVal,
          glRemark:this.AddTravelAgencyProducts.glRemark,
          glCanSell:this.AddTravelAgencyProducts.addTravelAgencyVal,
          glContent:this.AddTravelAgencyProducts.glContent,
          glTouristBussinessID:this.scenicUsersKeyWordVal,
          glItemInfoID:this.TravelAgencyVal,
          glShowImage1URL:'',
          glShowImage2URL:'',
          glShowImage3URL:''
        },(data)=>{
          var code = JSON.parse(data);
          publicInit.isBackCode(code,this)
          if(Number(code.backCode)==200){
            this.$message({
              showClose: true,
              message: code.backResult,
              type: 'success'
            });
            this.initData(1,{title:'',username:'',itemName:''})
//            this.$store.commit('addAgencyProducts',{
//              glID:this.AddTravelAgencyProducts.glID,
//              glTitle:this.AddTravelAgencyProducts.glTitle,
//              glPrice:this.AddTravelAgencyProducts.glPrice,
//              glExpireTime:this.AddTravelAgencyProducts.dateVal,
//              glRemark:this.AddTravelAgencyProducts.glRemark,
//              glCanSell:this.AddTravelAgencyProducts.addTravelAgencyVal,
//              glContent:this.AddTravelAgencyProducts.glContent,
//              glTouristBussinessID:this.scenicUsersKeyWordVal,
//              glItemInfoID:this.TravelAgencyVal,
//              glShowImage1URL:'',
//              glShowImage2URL:'',
//              glShowImage3URL:''
//            })
          }
          this.addTravelAgencyProducts = false
        })
      },
      //修改初始化
      updateTravelAgencyProducts(id){
        this.$store.commit('setTranstionFalse')
        this.updateTravelAgency = true;
        this.$store.commit('updateInitTravelAgency',id)
      },
      //修改产品提交
      dialogUpdateTravelAgencyProducts(){
        POST('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateGood',{
          loginUserID:'huileyou',
          loginUserPass:123,
          glID:this.UpdateTravelAgencyProducts.gl_ID,
          glTitle:this.UpdateTravelAgencyProducts.gl_Title,
          glPrice:this.UpdateTravelAgencyProducts.gl_Price,
          glExpireTime:this.UpdateTravelAgencyProducts.gl_ExpireTime,
          glRemark:this.UpdateTravelAgencyProducts.gl_Remark,
          glCanSell:this.UpdateTravelAgencyProducts.updateAgencyVal,
          glContent:this.UpdateTravelAgencyProducts.gl_Content,
          glTouristBussinessID:this.scenicUsersKeyWordVal,
          glItemInfoID:this.TravelAgencyVal,
          glShowImage1URL:'',
          glShowImage2URL:'',
          glShowImage3URL:''
        },(data)=>{
          var code = JSON.parse(data);
          publicInit.isBackCode(code,this)
          if(Number(code.backCode)==200) {
            this.$message({
              showClose: true,
              message: code.backResult,
              type: 'success'
            });
            this.initData(1,{title:'',username:'',itemName:''})
//            this.$store.commit('updateNewTravelAgency',Object.assign(this.UpdateTravelAgencyProducts,{TravelAgencyVal:this.TravelAgencyVal,scenicUsersKeyWordVal:this.scenicUsersKeyWordVal}))
          }
          this.updateTravelAgency = false;
        })
      },
      //删除产品
      deleteTravelAgencyProducts(id){
        POST('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteGood',{
          loginUserID:'huileyou',
          loginUserPass:123,
          gl_ID:id
        },(data)=>{
          var code = JSON.parse(data);
          publicInit.isBackCode(code,this)
          if(Number(code.backCode)==200){
            this.$message({
              showClose: true,
              message: code.backResult,
              type: 'success'
            });
            this.initData(1,{title:'',username:'',itemName:''})
            this.$store.commit('filterTravelAgency',id);
          }
        })
      }
    }
  }
</script>
<style scoped>
  .block{
    margin-bottom: 20px;
  }
</style>
