<template>
  <div class="login-container">
    <el-form  v-if="isForm" autoComplete="on" :model="loginForm"
              :rules="loginRules" ref="loginForm" label-position="left"
              class="card-box login-form">
      <h3 class="title">后台管理系统</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账户密码登录" name="password">
          <el-form-item prop="username" v-if="isPassword">
            <el-input
              placeholder="用户名" name="username" type="text"
              v-model="loginForm.username" autoComplete="on">
              <i slot="prefix" class="el-input__icon iconfont yy-yonghu"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-if="isPassword">
            <el-input
              placeholder="密码" name="password" :type="pwdType" @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              autoComplete="on">
              <i slot="prefix" class="el-input__icon iconfont yy-password"></i>
            </el-input>
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="手机号登录" name="mobile">
          <el-form-item prop="telephone" v-if="isMobile">
            <el-input prefix-icon="el-icon-mobile-phone" name="telephone" type="text"
                      v-model.number="loginForm.telephone" autoComplete="on" placeholder="手机号"/>
          </el-form-item>
          <el-form-item prop="authCode" v-if="isMobile">
            <el-input  class="message-code" prefix-icon="el-icon-message" name="authCode" :type="pwdType"
                       @keyup.enter.native="handleLogin" v-model.number="loginForm.authCode"
                      placeholder="验证码">
              <template slot="append" class="message-code">
                <el-button type="default" :disabled="disabled" @click.native="sendCode">
                {{sendCodeText}}
              </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
      <div style="text-align: left;margin-top: 24px;line-height: 22px;font-size: 14px;color: rgba(0,0,0,.65);">
        其他登录方式<svg-icon @click.native="wechatShow" className="svg-icon-weixin" icon-class="weixin"/>
        <svg-icon className="svg-icon-qq" icon-class="qq"/>
      </div>
    </el-form>


    <div  v-if="isSocial" style="width: 420px;height:450px; position: absolute;
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
    </div>

  </div>
</template>

<script>
  import { isvalidTelephone, isvalidAuthCode } from '@/utils/validate'
  import { sendCode } from 'api/login'
  import SocialSign from './socialsignin'
  import { getQueryObject } from '@/utils'
  import openWindow from '@/utils/openWindow'
  const PASSWORD_MODE = 'password'
  const MOBILE_MODE = 'mobile'
  import {Message} from 'element-ui'
  export default {
    name: 'login',
    components: { SocialSign },
    data () {
      const validateTelephone = (rule, value, callback) => {
        if (!isvalidTelephone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
      const validateAuthCode = (rule, value, callback) => {
        if (!isvalidAuthCode(value)) {
          callback(new Error('请输入正确的验证码'))
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
        isForm: true,
        isSocial: false,
        isPassword: true,
        isMobile: false,
        time: 0,
        timer: '',
        sendCodeText: '获取验证码',
        disabled: false,
        activeName: 'password',
        weixinUrl: '',
        loginForm: {
          username: 'admin',
          password: '1111111',
          telephone: 15675505060,
          authCode: 123456
        },
        loginRules: {
          username: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 1, max: 20, message: '用户名长度需要在20个字以内', trigger: 'blur' }
          ],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          telephone: [{ type: 'number', message: '必须是数字', trigger: 'blur' },
            { required: true, trigger: 'blur',validator: validateTelephone}],
          authCode: [{ type: 'number', message: '必须是数字', trigger: 'blur' },
            { required: true, trigger: 'blur',validator: validateAuthCode }]
        },
        pwdType: 'password',
        loading: false
      }
    },
    methods: {
      wechatShow() {
        this.isForm = false
        this.isSocial = true
      },
      sendCode() {
        if (!this.disabled) {
          clearTimeout(this.timer)
          this.$refs.loginForm.validateField('telephone',valid => {
            if (valid === '') {
              this.disabled = true
              sendCode(this.loginForm.telephone).then(() => {
                  Message.success('发送成功')
                  this.time = 60
                  this.countDown()
                })
                .catch(err => {
                  this.disabled = false
                  Message.error('系统异常')
                })
              }
          })
        }
      },
      countDown() {
        if (this.time > 0) {
          this.time--
          this.sendCodeText = `${this.time} s后发送`
          this.timer = setTimeout(this.countDown, 1000)
        } else {
          this.disabled = false
          this.sendCodeText = '获取验证码'
          clearTimeout(this.timer)
        }
      },
      handleClick(tab, event) {
        this.activeName = tab.name
        if (tab.name === PASSWORD_MODE) {
            this.isPassword = true
            this.isMobile = false
        }else {
          this.isPassword = false
          this.isMobile = true
        }
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
           if(this.activeName === PASSWORD_MODE) {
             this.commonLogin('LoginByUsername')
           } else {
             this.commonLogin('LoginByMobile')
           }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      commonLogin(loginMethod) {
        this.$store.dispatch(loginMethod, this.loginForm).then(() => {
          this.loading = false
          this.$router.push({ path: '/' })
          // this.showDialog = true
        }).catch(() => {
          this.loading = false
        })
      },
      afterQRScan() {
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
    created () {
      const appid = 'wxd99431bbff8305a0'
      const redirect_uri = encodeURIComponent('http://www.pinzhi365.com/manage/redirect?redirect=' + window.location.origin + '/authredirect')
      const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
      this.weixinUrl = url
//       window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed () {
//       window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $dark_gray: #889aa4;
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
  .el-button.is-disabled, .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
     background-color: transparent;
     border-color: transparent;
  }

  .el-tabs__content .message-code
  .el-input-group__append {
    background-color: #fff;
    padding: 0 15px;
  }
  .svg-icon-weixin, .svg-icon-qq {
    font-size: 24px;
    margin-left: 16px;
    vertical-align: middle !important;
    color: rgba(0,0,0,.2);
    cursor: pointer;
    transition: color .3s;
  }
  .svg-icon-qq:hover,.svg-icon-qq.active {
    color: #00b0fb;
  }
  .svg-icon-weixin:hover,.svg-icon-weixin.active {
    color: #46D800;
  }
</style>
