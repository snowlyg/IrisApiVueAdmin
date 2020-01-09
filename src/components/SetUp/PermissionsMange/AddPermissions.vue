<template>
  <div>
    <div class="page-title">
      <i class="iconfont icon-arrow-left cursor" @click="$router.go(-1)"/> {{ $route.meta.title }}
    </div>
    <div class="know-container" v-loading="loading">
      <div class="auditDaka">
        <el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px"
                 :model="ruleForm" ref="ruleForm" :rules="rules">

          <el-form-item prop="display_name" class="margin-left-lg margin-top must" label="权限名称">
            <el-input class="form-input-h" v-model="ruleForm.DisplayName" placeholder="请输入"/>
            <p class="form_p_g">为权限起个好听的名字吧，字数不限！</p>
          </el-form-item>

          <el-form-item prop="name" class="margin-left-lg margin-top must" label="权限路由">
            <el-input class="form-input-h" v-model="ruleForm.Name" placeholder="请输入"
                      :disabled="!!$route.params.id"/>
          </el-form-item>

          <el-form-item prop="description" class="margin-left-lg margin-top must" label="说明">
            <el-input class="form-input-h" v-model="ruleForm.Description" placeholder="请输入"/>
            <p class="form_p_g">这里可以为权限填写相关备注，字数不限！</p>
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
  import utils from '@/utils'

  export default {
    data() {
      return {
        data: [],
        labelPosition: 'right',
        nav_names: [],
        ruleForm: {
          DisplayName: '',
          Name: '',
          Description: '',
          ID: this.$route.params.id
        },
        rules: {
          DisplayName: [{
            required: true,
            message: '请输入权限名称',
            trigger: 'blur'
          }],
          Name: [{
            required: true,
            message: '请输入权限路由',
            trigger: 'blur'
          }],
          Description: [{
            required: true,
            message: '请输入说明',
            trigger: 'blur'
          }]
        },
        loading: false,
        resetdata: false
      }
    },
    computed: {},
    methods: {

      async getData() {
        this.loading = true;
        const data = await utils.getPermissionsDetail(this.$route.params.id);
        this.ruleForm = data.data.data;
        this.loading = false
      },
      //提交表单
      submitForm(formName) {
        let id = this.$route.params.id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (id) {
              this.putPermissions();
            } else {
              this.postPermissions();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async postPermissions() {
        this.loading = true
        const data = await utils.postPermissions(this.ruleForm);
        if (data.data.status) {
          this.$message({
            type: 'success',
            message: data.data.msg
          });
          await this.$router.push({
              name: 'PermissionsMange'
          })
        } else {
          this.$message({
            type: 'info',
            message: data.data.msg
          })
        }
        this.loading = false
      },
      async putPermissions() {
        this.loading = true;
        const data = await utils.putPermissions(this.ruleForm);
        if (data.data.status) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
          await this.$router.push({
              name: 'PermissionsMange'
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
        //this.$refs[formName].resetFields();
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
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        this.getData()
      }

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
