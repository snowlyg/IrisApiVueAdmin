<template>
  <div>
    <div class="page-title">{{ $route.meta.title }}</div>
    <div class="know-container" v-loading="loading">
      <div class="puhnu-p">
        <p>关注回复设置</p>
      </div>
      <div class="member_first">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="回复内容" prop="index_count">
            <vue-html5-editor :content="ruleForm.index_count" @change="updateData" :z-index="10"
                              :auto-height="true"></vue-html5-editor>
            <p class="form_p_g">设置新用户关注公众号的欢迎词，字数不超过600字，按下Enter键换行</p>
          </el-form-item>
          <el-form-item class="text_reply">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      return {
        data: [],
        ruleForm: {
          index_count: '',
        },
        rules: {
          index_count: [{
            required: true,
            message: '请填写回复内容',
            trigger: 'blur'
          }]
        },
        loading: false
      }
    },
    computed: {
      ...mapState([
        'FindWechatSettingsData'
      ])
    },
    methods: {
      ...mapActions([
        'getFindWechatSettings'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.patchFindWechatSettings()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async patchFindWechatSettings() {
        this.loading = true
        const data = await utils.patchFindWechatSettings(this.ruleForm)
        if (data.status == 'error') {
          this.$message.error(data.msg)
        } else {
          this.$message.success(data.msg)
        }
        this.loading = false
      },
      //获取数据
      async getData() {
        if (this.FindWechatSettingsData.length == 0) {
          this.loading = true
        }
        await this.getFindWechatSettings()
        this.ruleForm.index_count = this.FindWechatSettingsData.value;
        this.loading = false
      },
      updateData(data) {
        this.ruleForm.index_count = data
      }
    },
    watch: {},
    mounted() {
      this.getData();
    }
  }
</script>
<style scoped>
  .member_first {
    padding: 60px
  }

  .text_reply {
    text-align: center
  }

  .form_p_g {
    color: #888
  }

  .puhnu-p {
    color: rgb(24, 144, 255);
    font-size: 18px;
    padding: 30px 0 0 30px;
  }
</style>
