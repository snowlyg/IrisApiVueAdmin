<template>
  <div>
    <div class="page-title">
      <i class="iconfont icon-arrow-left cursor" @click="$router.go(-1)"/> {{ $route.meta.title }}
    </div>
    <div class="know-container" v-loading="loading">
      <div class="auditDaka">
        <el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px"
                 :model="ruleForm" ref="ruleForm" :rules="rules">

          <el-form-item prop="DisplayName" class="margin-left-lg margin-top must" label="角色名">
            <el-input class="form-input-h" v-model="ruleForm.DisplayName" placeholder="请输入"/>
            <p class="form_p_g">给角色起个名字吧！</p>
          </el-form-item>

          <el-form-item prop="Name" class="margin-left-lg margin-top must" label="标识">
            <el-input class="form-input-h" v-model="ruleForm.Name" placeholder="请输入"/>
            <p class="form_p_g">为角色起个标识！</p>
          </el-form-item>

          <el-form-item prop="rolement" class="margin-left-lg margin-top rolement" label="选择权限">
            <div class="tree-box">
              <!--  :default-expanded-keys="[2, 3]" -->
              <!-- 默认展开的的节点 -->
              <el-tree ref="tree" :data="data" show-checkbox node-key="Id" :props="defaultProps"
                       :default-checked-keys="per_ids">
              </el-tree>
            </div>
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
      const coltitle2 = (rule, value, callback) => {
        if (this.$refs.tree.getCheckedKeys() == '') {
          return callback(new Error('请勾选权限'))
        } else {
          callback()
        }
      }
      return {
        data: [],
        labelPosition: 'right',
        per_ids: [],
        ruleForm: {
          DisplayName: '',
          Name: '',
          ID: this.$route.params.id
        },
        rules: {
          DisplayName: [{
            required: true,
            message: '请输入角色名',
            trigger: 'blur'
          }],
          Name: [{
            required: true,
            message: '请输入标识',
            trigger: 'blur'
          }],
          rolement: [{
            required: true,
            validator: coltitle2,
            trigger: 'blur'
          }]
        },
        loading: false,
        resetdata: false,
        defaultProps: {
          children: 'children',
          label: 'Description'
        },
      }
    },
    computed: {
      ...mapState([
        'PermissionsData'
      ])
    },
    methods: {
      ...mapActions([
        'getPermissions'
      ]),
      async getData() {
        if (this.$route.params.id) {
          this.loading = true
          const data = await utils.getRolesDetail(this.$route.params.id);
          const permissions = await utils.getPermissions();
          this.data = permissions.data.data;
            let ruleForm = data.data.data;
            this.ruleForm = ruleForm;

          if (ruleForm.Perms) {
              ruleForm.Perms.forEach(e => {
              this.per_ids.push(e.Id)
            })
          }
        } else {
          const permissions = await utils.getPermissions();
          this.data = permissions.data.data;
          this.data.forEach(e => {
            this.per_ids.push(e.Id)
          })
        }

        this.loading = false
      },
      //提交表单
      submitForm(formName) {
        let id = this.$route.params.id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (id) {
              this.putRoles()
            } else {
              this.postRoles()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async postRoles() {
        this.loading = true
        this.ruleForm.permissions_ids = this.$refs.tree.getCheckedKeys()
        const data = await utils.postRoles(this.ruleForm)
        if (data.data.status) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
           this.$router.push({
              name: 'RoleMange'
          })
        } else {
          this.$message({
            type: 'info',
            message: data.data.msg
          })
        }
        this.loading = false
      },
      async putRoles() {
        this.loading = true
        this.ruleForm.permissions_ids = this.$refs.tree.getCheckedKeys()
        const data = await utils.putRoles(this.ruleForm)
        if (data.data.status) {
          this.$message({
            type: 'success',
            message: data.data.msg
          });
          await this.$router.push({
              name: 'RoleMange'
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
    min-height: 220px;
    max-height: 500px;
    overflow: scroll;
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
