<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">商户信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>商户名称筛选:</span>
        <input type="text" placeholder="商户名称" v-model="initUser">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="dialogAddFormVisibleUser">添加</a>
      </div>
      <template>
        <el-table
          :data="scenicUsersKeyWord"
          style="width: 100%"
          v-loading="isLoading"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商家编号:">
                  <span>{{ props.row.tb_UserID }}</span>
                </el-form-item>
                <el-form-item label="商家名称:">
                  <span>{{ props.row.tb_Name }}</span>
                </el-form-item>
                <el-form-item label="商家身份证号码:">
                  <span>{{ props.row.tb_CertNo }}</span>
                </el-form-item>
                <el-form-item label="商家电话号码:">
                  <span>{{ props.row.tb_Phone }}</span>
                </el-form-item>
                <el-form-item label="旅行社商家创建时间:">
                  <span>{{ props.row.tb_CreateTime }}</span>
                </el-form-item>
                <el-form-item label="商家到期时间:">
                  <span>{{ props.row.tb_EndTime }}</span>
                </el-form-item>
                <el-form-item label="是否删除:">
                  <span>{{ props.row.tb_IsDelete==0?"未删除":"已删除" }}</span>
                </el-form-item>
                <el-form-item label="所属省份:">
                  <span>{{ props.row.tb_Provice }}</span>
                </el-form-item>
                <el-form-item label="所属市:">
                  <span>{{ props.row.tb_City }}</span>
                </el-form-item>
                <el-form-item label="所属县:">
                  <span>{{ props.row.tb_Contry }}</span>
                </el-form-item>
                <el-form-item label="详细地址:">
                  <span>{{ props.row.tb_Address }}</span>
                </el-form-item>
                <el-form-item label="商家地址描述:">
                  <span>{{ props.row.tb_AddressDescribe }}</span>
                </el-form-item>
                <el-form-item label="商家展示图片:">
                  <!--<div v-if="props.row.tb_ImageURLList.length">-->
                    <!--<p v-for="item in props.row.touristBussinessList">{{item}}</p>-->
                  <!--</div>-->
                  <div v-if="props.row.tb_ImageURLList">
                    <p v-for="item in props.row.tb_ImageURLList" style="font-size: 10px;">
                      <img :src="item" alt="" style="height: 300px;width: 400px"/>
                      <!--<span style="'background-image: url('+'item'+') no-repeat;display:block'"></span>-->
                    </p>

                  </div>
                  <div v-else>
                    {{props.row.tb_ImageURLList}}
                  </div>
                  <!--<span>{{ props.row.tb_ImageURL }}</span>-->
                </el-form-item>
                <el-form-item label="营业执照图片:">
                  <span  style="font-size: 10px;">{{ props.row.tb_BussinessLicenceURL }}</span>
                </el-form-item>
                <el-form-item label="坐标:">
                  <span>{{ props.row.tb_Position }}</span>
                </el-form-item>
                <el-form-item label="级别:">
                  <span>{{ props.row.tb_Level }}</span>
                </el-form-item>
                <el-form-item label="备注:">
                  <span>{{ props.row.tb_Remark?props.row.tb_Remark:'暂无备注' }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="商家编号"
            prop="tb_UserID">
          </el-table-column>
          <el-table-column
            label="商家名称"
            prop="tb_Name">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogUpdateFormVisible(scope.row.tb_UserID)">修改</el-button>
              <el-button
                size="mini"
                @click="updatePasswordBusiness(scope.row.tb_UserID)">密码修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="dialogDeleteFormVisible(scope.row.tb_UserID)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!--商户添加-->
    <el-dialog title="商户添加" :visible.sync="dialogAddFormVisible">
      <el-form :model="BusinessUser">
        <el-form-item label="商家编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="BusinessUser.tb_UserID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="BusinessUser.tb_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" :label-width="formLabelWidth" :required="isOff">
          <el-input type="password" v-model="BusinessUser.tb_Password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码确认" :label-width="formLabelWidth">
          <el-input type="password" v-model="BusinessUser.tb_confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家身份证号码" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_CertNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Provice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属市" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_City" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属县" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Contry" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家地址描述" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_AddressDescribe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="坐标" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">展示图片上传
            <input type="file" name=""  ref="upload"  accept="image/*">
          </a>
          <span>{{ImageURL?ImageURL:""}}</span>
        </el-form-item>
        <el-form-item label="营业执照图:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">营业执照上传
            <input type="file" name=""  ref="upload1"  accept="image/*">
          </a>
          <span>{{tbBussinessLicenceURL?tbBussinessLicenceURL:""}}</span>
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Level" auto-complete="off"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">选择商家到期日期</span>
          <el-date-picker
            v-model="BusinessUser.dateVal"
            type="date"
            placeholder="商家到期日期"
            value-format="yyyy-MM-dd"
            :label-width="formLabelWidth"
            >
          </el-date-picker>
        </div>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Remark" auto-complete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :plain="true">提交</el-button>
      </div>
    </el-dialog>
    <!--商户修改-->
    <el-dialog title="商户修改" :visible.sync="dialogUpdateForm">
      <el-form :model="updateBusinessUser">
        <el-form-item label="商家编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_UserID" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家身份证号码" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_CertNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_Phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_Provice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属市" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_City" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属县" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_Contry" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_Address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家地址描述" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_AddressDescribe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">展示图片上传
            <input type="file" name=""  ref="upload"  accept="image/*" multiple>
          </a>
          <p v-for="item in ImageURL" v-show="ImageURL.length">{{item?item:""}}</p>
        </el-form-item>
        <el-form-item label="营业执照图:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">营业执照上传
            <input type="file" name=""  ref="upload1"  accept="image/*">
          </a>
          <span>{{tbBussinessLicenceURL?tbBussinessLicenceURL:""}}</span>
        </el-form-item>
        <el-form-item label="坐标" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_Position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth">
          <el-input v-model="updateBusinessUser.tb_Level" auto-complete="off"></el-input>
        </el-form-item>
        <div class="block" >
          <span class="demonstration">选择商家到期日期</span>
          <el-date-picker
            v-model="updateBusinessUser.tb_EndTime"
            type="date"
            placeholder="商家到期日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <el-form-item label="是否删除" :label-width="formLabelWidth">
          <el-select v-model="updateBusinessUser.tb_IsDelete" placeholder="请选择是否删除">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
          <span style="color: blue;">温馨提示:  <i style="color: green;">0:否</i> <i style="color: green;">1:是</i></span>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="updateBusinessUser.tb_Remark" auto-complete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateForm = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit" :plain="true">提交</el-button>
      </div>
    </el-dialog>
    <!--密码修改-->
    <el-dialog title="修改密码" :visible.sync="dialogFormUpdatePassword">
      <el-form :model="formPassword">
        <el-form-item label="商家编号" :label-width="formLabelWidth">
          <el-input v-model="formPassword.userCode" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="formPassword.oldPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="formPassword.newPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdatePassword = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdatePassword">确 定</el-button>
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
  //景区商户信息
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  import dateFormat from '../assets/js/dateFormat'
  import {IdentityCodeValid} from '../assets/js/date'//身份证验证
  import {checkPhone} from '../assets/js/date'//电话号码验证
  import {getObj} from '../assets/js/date'//电话号码验证
  import {POST} from '../assets/js/universal'

  export default{
    computed:mapGetters([
      'scenicUsersKeyWord',
      'updateBusinessUser'
    ]),
    name: '',
    data(){
      return {
        ImageURL:[],//旅行社商家展示图片地址
        tbBussinessLicenceURL:'',//旅行社营业执照图
        isLoading:false,
        isOff:true,
        total:0,
        currentPage1:1,
        initUser:'',//初始化搜索
        dialogAddFormVisible:false,//初始化景区用户添加
        BusinessUser:{
          tb_UserID:'',
          tb_Name:'',
          tb_Password:'',
          tb_CertNo:'',
          tb_Phone:'',
          tb_Remark:'',
          dateVal:'',
          tb_confirmPassword:'',
          tb_Provice:'',
          tb_City:'',
          tb_Contry:'',
          tb_Address:'',
          tb_AddressDescribe:'',
          tb_Position:'',
          tb_Level:''
        },
        formPassword:{
          userCode:'',
          oldPassword:'',
          newPassword:''
        },
        dialogUpdateForm:false,
        dialogFormUpdatePassword:false,
        formLabelWidth:'120px',
        uploadImgs:[]
      }
    },
    methods:{
      //图片转二进制
      uploadImg(file){
        return new Promise(function (relove,reject) {
          lrz(file)
          .then(data=>{
            relove(data.base64.split(',')[1])
          })
        })
      },
      handleCurrentChange(num){
        this.initData(num);
      },
      uploaNode(){
        setTimeout(()=>{
          this.$refs.upload.addEventListener('change',data=>{
            console.log(this.$refs.upload.files)
            for(var i=0;i<this.$refs.upload.files.length;i++){
              this.uploadImg(this.$refs.upload.files[i]).then(data=>{
                this.$store.dispatch('uploadImgs',{
                  imageString:data
                })
                .then(data=>{
                  if(data){
                    this.ImageURL.push(data);
                  }else{
                    this.$notify({
                      message: '图片地址不存在!',
                      type: 'error'
                    });
                  }
                })
              })
            }
          })
          this.$refs.upload1.addEventListener('change',data=>{
            this.uploadImg(this.$refs.upload1.files[0]).then(data=>{
              this.$store.dispatch('uploadImgs',{
                imageString:data
              })
              .then(data=>{
                if(data){
                  this.tbBussinessLicenceURL = data;
                }else{
                  this.$notify({
                    message: '图片地址不存在!',
                    type: 'error'
                  });
                }
              })
            })
          })
        },30)
      },
      //添加
      dialogAddFormVisibleUser(){
        this.$store.commit('setTranstionFalse')
        this.dialogAddFormVisible = true;
        this.uploaNode()
      },
      initData(num,name){
        var GetSceneryList = {
          loginUserID:'huileyou',
          loginUserPass:123,
          userID:'',
          name:name?name:'',
          isDelete:'',
          createFrom:'',
          createTo:'',
          page:num,
          rows:5,
        }
        this.isLoading = true
        this.$store.dispatch('initAgenciesUsers',GetSceneryList)
          .then((total)=>{
            this.total = total;
            this.isLoading = false
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //筛选
      search(){
        this.initData(1,this.initUser.trim())
      },
      //添加商户提交
      addSubmit(){

        if(this.BusinessUser.tb_CertNo.trim()==''
          ||this.BusinessUser.tb_Phone.trim()==''
          ||this.BusinessUser.tb_UserID.trim()==''
          ||this.BusinessUser.tb_Name.trim()==''
          ||this.BusinessUser.tb_Password.trim()==''
          ||this.BusinessUser.tb_confirmPassword.trim()==''){
          this.$message({
            showClose: true,
            message: '不能输入空',
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }
        if(this.BusinessUser.tb_Password.trim()!==this.BusinessUser.tb_confirmPassword.trim()){
          this.$message({
            showClose: true,
            message: '两次输入密码不一致',
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }

        if(!checkPhone(this.BusinessUser.tb_Phone)){
          this.$message({
            showClose: true,
            message: '电话号码格式不对',
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }

        if(IdentityCodeValid(this.BusinessUser.tb_CertNo).code!=200){
          this.$message({
            showClose: true,
            message: IdentityCodeValid(this.BusinessUser.tb_CertNo).msg,
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }else{
          var AddTouristBussiness = {
            loginUserID:'huileyou',
            loginUserPass:123,
            tbUserID:this.BusinessUser.tb_UserID,
            tbName:this.BusinessUser.tb_Name,
            tbPassword:this.BusinessUser.tb_Password,
            tbCertNo:this.BusinessUser.tb_CertNo,
            tbPhone:this.BusinessUser.tb_Phone,
            tbEndTime:this.BusinessUser.dateVal,
            tbRemark:this.BusinessUser.tb_Remark,
            tbProvice:this.BusinessUser.tb_Provice,
            tbCity:this.BusinessUser.tb_City,
            tbContry:this.BusinessUser.tb_Contry,
            tbAddress:this.BusinessUser.tb_Address,
            tbAddressDescribe:this.BusinessUser.tb_AddressDescribe,
            tbPosition:this.BusinessUser.tb_Position,
            tbLevel:this.BusinessUser.tb_Level,
            tbImageURL:this.ImageURL.toString(),
            tbBussinessLicenceURL:this.tbBussinessLicenceURL
          }
          //添加商户信息请求
          this.$store .dispatch('addUserInformation',AddTouristBussiness)
            .then(()=>{
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
            },err=>{
              this.$message({
                message: err,
                type: 'error'
              });
            })
          this.dialogAddFormVisible = false;
        }
      },
      //初始化修改数据
      dialogUpdateFormVisible(id){
        this.$store.commit('setTranstionFalse')
        this.dialogUpdateForm = true;
        this.uploaNode()
        this.$store.commit('initUpdateBusiness',id);
      },
      //修改商户
      updateSubmit(){
        let newObj = getObj(this.updateBusinessUser);
//        if(IdentityCodeValid(newObj.tb_CertNo.trim()).code!=200){
//          this.$message({
//            showClose: true,
//            message: IdentityCodeValid(newObj.tb_CertNo).msg,
//            type: 'error'
//          });
//          this.dialogUpdateForm = false;
//          return
//        }
        if(!checkPhone(newObj.tb_Phone.trim())){
          this.$message({
            showClose: true,
            message: '电话号码格式不对',
            type: 'error'
          });
          this.dialogUpdateForm = false;
          return
        }
        var UpdateTouristBussiness = {
          loginUserID:'huileyou',
          loginUserPass:123,
          tbUserID:newObj.tb_UserID,
          tbName:newObj.tb_Name,
          tbCertNo:newObj.tb_CertNo,
          tbPhone:newObj.tb_Phone.trim(),
          tbEndTime:newObj.tb_EndTime,
          tbRemark:newObj.tb_Remark,
          tbIsDelete:newObj.tb_IsDelete,
          tbProvice:newObj.tb_Provice,
          tbCity:newObj.tb_City,
          tbContry:newObj.tb_Contry,
          tbAddress:newObj.tb_Address,
          tbAddressDescribe:newObj.tb_AddressDescribe,
          tbPosition:newObj.tb_Position,
          tbLevel:newObj.tb_Level+'',
          tbImageURL:this.ImageURL.toString(),
          tbBussinessLicenceURL:this.tbBussinessLicenceURL
        }

        this.$store.dispatch('modifyUser',UpdateTouristBussiness)
          .then((total)=>{
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
        this.dialogUpdateForm = false;
      },
      //删除商户
      dialogDeleteFormVisible(id){
        var DeleteScenery = {
          loginUserID:'huileyou',
          loginUserPass:123,
          tbUserID:id
        }
        this.$store.dispatch('deleteUser',DeleteScenery)
          .then(total=>{
              this.$message({
                showClose: true,
                message: '商户删除成功！',
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //密码修改
      updatePasswordBusiness(id){
        this.$store.commit('setTranstionFalse')
        this.dialogFormUpdatePassword = true;
        this.formPassword.userCode = id;
      },
      dialogUpdatePassword(){
        if(this.formPassword.oldPassword.trim()==''||this.formPassword.newPassword.trim()==''){
          this.$message({
            showClose: true,
            message: '密码不能为空！',
            type: 'error'
          });
          this.dialogFormUpdatePassword = false;
          return;
        }
        var UpdateSceneryPassword = {
          loginUserID:'huileyou',
          loginUserPass:123,
          tbUserID:this.formPassword.userCode,
          oldPassword:this.formPassword.oldPassword,
          newPassword:this.formPassword.newPassword
        }
        this.$store.dispatch('modifyPassword',UpdateSceneryPassword)
          .then(total=>{
            this.$message({
              message: '密码修改成功！',
              type: 'success'
            });
            this.total = 0;
            this.initData(1)
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
        this.dialogFormUpdatePassword = false;
      }
    },
    created(){
    },
    mounted(){
    }
  }
</script>
<style scoped>

  .block{
    margin-bottom: 20px;
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
  .file {
    position: relative;
    display: inline-block;
    background: #409EFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    font-size:12px;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
