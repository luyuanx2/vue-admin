<template>
  <div class="login-container">
    <!--<el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"-->
             <!--label-width="0px"-->
             <!--class="card-box login-form">-->
      <!--<h3 class="title">vue-element-admin</h3>-->
      <!--<el-form-item prop="username">-->
        <!--<span class="svg-container svg-container_login">-->
          <!--<svg-icon icon-class="user"/>-->
        <!--</span>-->
        <!--<el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="password">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="password"></svg-icon>-->
        <!--</span>-->
        <!--<el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"-->
                  <!--autoComplete="on"-->
                  <!--placeholder="password"></el-input>-->
        <!--<span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">-->
          <!--Sign in-->
        <!--</el-button>-->
      <!--</el-form-item>-->
      <!--<div class="tips">-->
        <!--<span style="margin-right:20px;">username: admin</span>-->
        <!--</span> password: admin</span>-->
      <!--</div>-->
      <!--<el-button class="thirdparty-button" type="primary" @click="showDialog=true">第三方登录</el-button>-->
    <!--</el-form>-->
    <div style="width: 420px;height:450px; position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;background-color: #fff;
    box-shadow: 0 2px 10px #999;border-radius: 4px;">
    <iframe  style="width: 100%;height: 100%;display: block" key="tag"
            :src="weixinUrl" frameborder="0"></iframe></div>
    <social-sign />
    <el-dialog title="第一次请绑定账号" :visible.sync="showDialog">
      <img :src="img">
      <input v-model="nickname"/>
      <br/>
      <br/>
      <br/>
    </el-dialog>

  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'
  import SocialSign from './socialsignin'
  import { getQueryObject } from '@/utils'
  import openWindow from '@/utils/openWindow'
  export default {
    name: 'login',
    components: { SocialSign },
    data () {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        weixinUrl: '',
        img: '',
        nickname: '',
        loginForm: {
          username: 'admin',
          password: '1111111'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        loading: false,
        showDialog: false
      }
    },
    methods: {
      hashCli() {

        window.location.hash = new Date().getTime().toString()
      },
      showPwd () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
              // this.showDialog = true
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      afterQRScan() {
        console.log('aaaaaaaaaaaa')
        const hash = window.location.hash.slice(1)
        const hashObj = getQueryObject(hash)
        const originUrl = window.location.origin
        history.replaceState({}, '', originUrl)
        const codeMap = {
          wechat: 'code',
          tencent: 'code'
        }
        const codeName = hashObj['code']
        alert(codeName)
        if (!codeName) {
          alert('第三方登录失败')
        } else {
          this.$store.dispatch('LoginByThirdparty', codeName).then((response) => {
              if(response.status === 401) {
                this.showDialog = true
                this.img = response.data.headimg
                this.nickname = response.data.nickname
              }else {
                this.$router.push({ path: '/' })
              }
          })
        }
      }
    },
//    mounted() {
//      const appid = 'wxd99431bbff8305a0'
//      const redirect_uri = encodeURIComponent('http://www.pinzhi365.com/manage/redirect?redirect=' + window.location.origin + '/authredirect')
//      const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
//      openWindow(url, 'wechat', 450, 450)
//    },
    created () {
      const appid = 'wxd99431bbff8305a0'
      const redirect_uri = encodeURIComponent('http://www.pinzhi365.com/manage/redirect?redirect=' + window.location.origin + '/authredirect')
      const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
      this.weixinUrl = url
       window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed () {
       window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    /*background-color: $bg;*/
    background: #f0f2f5;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
