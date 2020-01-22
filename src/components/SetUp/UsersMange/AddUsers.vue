<template>
  <div>
    <div class="page-title">
      <i class="iconfont icon-arrow-left cursor" @click="$router.go(-1)"/> {{ $route.meta.title }}
    </div>
    <div class="know-container" v-loading="loading">
      <div class="auditDaka">
        <el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition"
                 label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

          <el-form-item prop="Username" class="margin-left-lg margin-top must" label="姓名">
            <el-input class="form-input-h" v-model="ruleForm.Username" placeholder="请输入"/>
            <p class="form_p_g">输入账号使用者的姓名！</p>
          </el-form-item>

          <el-form-item prop="Name" class="margin-left-lg margin-top must" label="账号名">
            <el-input class="form-input-h" v-model="ruleForm.Name" placeholder="请输入"/>
            <p class="form_p_g">输入账号名，用于后台登录！</p>
          </el-form-item>

          <el-form-item prop="Password" class="margin-left-lg margin-top must" label="密码">
            <el-input class="form-input-h" v-model="ruleForm.Password" placeholder="请输入" maxlength="20"
                      type="password"/>
            <p class="form_p_g">输入账号的密码，6-20位字符不限！</p>
          </el-form-item>


          <el-form-item label="选择角色" prop="RoleIds" class="margin-left-lg margin-top must">
            <el-select v-model="ruleForm.RoleIds" multiple  placeholder="请选择角色">
              <el-option v-for="item,index in RolesData.ListData" :key="index" :label="item.DisplayName" :value="item.Id"/>
            </el-select>
          </el-form-item>

          <el-form-item class="text-center margin-top-lg">
            <el-button :disabled="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import utils from '@/utils'

    export default {
        data() {
            var validatePass3 = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('请正确输入密码'))
                } else {
                    callback()
                }
            };
            return {
                data: [],
                labelPosition: 'right',
                ruleForm: {
                    Username: '',
                    Name: '',
                    Password: '',
                    RoleIds: [],
                    Id: this.$route.params.id
                },
                rules: {
                    Username: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    Name: [{
                        required: true,
                        message: '请输入账号名',
                        trigger: 'blur'
                    }],
                    Password: [{
                        required: true,
                        validator: validatePass3,
                        trigger: 'blur'
                    }],
                    RoleIds: [{
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                    }],
                },
                loading: false,
                resetdata: false,
            }
        },
        computed: {
            ...mapState([
                'RolesData'
            ])
        },
        methods: {
            ...mapActions([
                'getRoles'
            ]),
            async getData() {

                if (this.$route.params.id) {
                    this.loading = true
                    const data = await utils.getAdminsDetail(this.$route.params.id);
                    await this.getRoles()
                    this.ruleForm.Username = data.data.data.Username;
                    this.ruleForm.Name = data.data.data.Name;
                    this.ruleForm.RoleIds = data.data.data.RoleIds;

                } else {
                    await this.getRoles()
                }

        this.loading = false
      },
      //提交表单
      submitForm(formName) {
        let id = this.$route.params.id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (id) {
              this.putAdmins()
            } else {
              this.postAdmins()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async postAdmins() {
        this.loading = true
        const data = await utils.postAdmins(this.ruleForm);
        if (data.data.status) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
           this.$router.push({
              name: 'UsersMange'
          })
        } else {
          this.$message({
            type: 'info',
            message: data.data.msg
          })
        }
        this.loading = false
      },
      async putAdmins() {
        this.loading = true
        const data = await utils.putAdmins(this.ruleForm);
        if (data.data.status) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
          await this.$router.push({
              name: 'UsersMange'
          })
        } else {
          this.$message({
            type: 'info',
            message: data.data.msg
          })
        }
        this.loading = false
      },
      resetForm(formName) {
        if (this.resetdata) {
          this.$confirm('真的要退出此次编辑？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.$router.go(-1)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          this.$router.go(-1)
        }
      },
    },
    mounted: function () {
      this.getData()
    },
    watch: {
      ruleForm: {
        handler(curVal, oldVal) {
          this.resetdata = true
        },
        deep: true
      }
    }
  }
</script>
<style lang="less" scoped>
  .auditDaka {
    &-arrow {
      & .icon-07jiantouxiangzuo {
        vertical-align: middle;
        font-size: 24px;
        color: #444444;
      }
    }
  }
</style>
<style scoped>
  .form-input-h {
    width: 400px
  }

  .form_p_g {
    font-size: 14px;
    color: #888;
    clear: both
  }

  .tree-box {
    margin-top: 10px;
    border: 1px solid #E3E3E3;
    border-radius: 4px;
    width: 800px;
    padding: 10px;
    min-height: 220px
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
    line-height: 1
  }

  .avatar-uploader:hover {
    border-color: #409EFF
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block
  }

  .colrecom_form {
    width: 200px;
    border: 1px solid #ccc;
    line-height: initial;
    display: inline-block;
    position: relative;
    margin: 0 15px 1rem 0;
    float: left;
    height: 141px;
    border-radius: 4px
  }

  .colrecom_form_add {
    width: 200px;
    border: 1px dotted #ccc;
    line-height: initial;
    display: inline-block;
    position: relative;
    margin: 0 15px 1rem 0;
    float: left;
    height: 141px;
    text-align: center;
    border-radius: 4px
  }

  .colrecom_form_add > .el-icon-plus {
    height: 80px
  }

  .colrecom_form > img {
    width: 100%
  }

  .colrecom_form > p {
    line-height: normal;
    text-align: center;
    padding: 0 3px;
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: justify
  }

  .colrecom_form > .el-icon-error {
    color: #ff7043;
    position: absolute;
    top: -7px;
    right: -7px;
    font-size: 18px
  }

  .input_search_video {
    width: 50%
  }

  .span_search_video {
    color: #888;
    margin-left: 5%
  }

  .select_show_video {
    width: 685px;
    margin: 0 auto
  }

  .show_page {
    margin-top: 2rem;
    text-align: center
  }
</style>
