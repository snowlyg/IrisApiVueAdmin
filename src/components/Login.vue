<template>
  <div class='loginBox'>
    <div class="login_main">
      <div class='login'>
        <h1 style="color: #002446">IrisAdminApi</h1>
        <h3 class="logoText">develop from snowlyg</h3>
        <div class="form text-center loginForm">
          <el-row>
            <el-col class="margin-bottom">
              <el-input class="inputTypein" v-model="Toform.name" placeholder="请输入用户名"
                        prefix-icon="el-icon-erp-icon-account"></el-input>
            </el-col>
            <el-col class="margin-bottom">
              <el-input class="inputTypein" v-model="Toform.password" type="password" placeholder="请输入密码"
                        prefix-icon="el-icon-erp-icon-lock"></el-input>
            </el-col>
            <el-col class="margin-bottom">
              <el-button type="primary" class="loginBtn" @click="login" :loading="loading">登录</el-button>
            </el-col>

            <el-col class="margin-bottom">
             <p>演示账号： username</p>
             <p>演示密码： password</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import utils from '@/utils'

    export default {
        name: 'Login',
        data() {
            return {
                loading: false,
                Toform: {
                    name: '',
                    password: ''
                }
            }
        },
        computed: {
            // ...mapState([
            //     'UserProfile'
            // ])
        },
        methods: {
            ...mapActions([
                'getUserProfile'
            ]),
            async login() {
                if (this.Toform.name == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入账号'
                    })
                    return false
                }
                if (this.Toform.password == '') {
                    this.$message({
                        type: 'info',
                        message: '请输入密码'
                    })
                    return false
                }
                this.loading = true
                const data = await utils.getToken(this.Toform);
                if (!data.data.status) {
                    this.$message({
                        type: 'info',
                        message: data.data.msg
                    })
                    this.loading = false
                    return false
                } else {
                    utils.setCookie('token', data.data.data.access_token, null);
                    await this.getUserProfile();
                    this.loading = false
                    this.$router.replace({
                        name: 'Home'
                    })
                }
            }
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/login_bg.svg);
    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .loginForm {
  }

  .logoText {
    margin-bottom: 1.6rem;
    color: rgb(140, 141, 143);
    font-weight: normal;
  }

  .login_main {
    margin-top: -10%;
  }

  .login {
    padding: 40px;
    width: 300px;
    text-align: center;
  }

  .logoImg {
    width: 150px;
  }

  .loginBtn {
    width: 100%;
  }
</style>
