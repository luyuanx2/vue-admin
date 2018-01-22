<template>
  <div class="login-container">
    <el-form  autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
              label-width="0px"
              class="card-box login-form">
      <h3 class="title">后台管理系统</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账户密码登录" name="first">
          <el-form-item prop="qwe">
            <el-input
              placeholder="用户名"
              prefix-icon="el-icon-search">
            </el-input>
          </el-form-item>
          <el-form-item prop="rty">
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-search">
            </el-input>
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="手机号登录" name="second">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-mobile-phone" name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="手机号"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input  class="message-code" prefix-icon="el-icon-message" name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="验证码"></el-input>
            <el-button style="display: inline-block" type="default">
              获取验证码
            </el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
      <div style="text-align: left;margin-top: 24px;line-height: 22px;font-size: 14px;color: rgba(0,0,0,.65);">
        其他登录方式<svg-icon icon-class="wechat"/>
      </div>
    </el-form>


   <!-- <div style="width: 420px;height:450px; position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    /*background-color: #fff;*/
    /*box-shadow: 0 2px 10px #999;*/
    /*border-radius: 4px;*/
    ">
    <iframe  style="width: 100%;height: 100%;display: block;background: transparent" key="tag"
            :src="weixinUrl" frameborder="0"></iframe>
    </div>-->

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
    /*position: fixed;*/
    height: 100%;
    width: 100%;
    /*background-color: $bg;*/
    background: #f0f2f5;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    .title {
      font-size: 25px;
      font-weight: 600;
      color: #606266;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .login-form {
      background-color: #fff;
      box-shadow: 0 2px 10px #999;
      border-radius: 5px;
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  .el-tabs__content .el-form-item {
    margin-bottom: 24px;
  }
  .el-tabs__content .message-code {
    width: calc(100% - 116px);
  }
  .svg-icon {
    font-size: 24px;
    margin-left: 16px;
    vertical-align: middle !important;
    color: rgba(0,0,0,.2);
    cursor: pointer;
    transition: color .3s;
  }
</style>
