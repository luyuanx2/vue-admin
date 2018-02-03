<template>
  <div class="authredirect-wrapper">
    <el-dialog width="360px" :before-close="handleClose" title="绑定账号" :visible.sync="showDialog" append-to-body>
      <el-form :model="bindForm" :rules="rules" ref="socialForm">
        <el-form-item>
          <div style="text-align: center">
            <span>微信昵称：{{nickname}}</span>
          </div>
          <div style="text-align: center">
            <span class="wechat-avatar"><img :src="bindForm.headimg"/></span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-form-item prop="username">
              <el-input type="text" placeholder="用户名" name="username" v-model="bindForm.username">
                <i slot="prefix" class="el-input__icon iconfont yy-yonghu"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item prop="password">
              <el-input placeholder="密码" name="password" type="password" v-model="bindForm.password">
                <i slot="prefix" class="el-input__icon iconfont yy-password"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="bindSocial">
            绑 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { getQueryObject } from '@/utils'
  import { bindSocial } from 'api/login'
  import {Message} from 'element-ui'
    export default {
      name: 'authredirect',
      data () {
        return {
          bindForm: {
            headimg: '',
            username: 'admin',
            password: '123456'
          },
          nickname: '',
          showDialog: false,
          rules: {
            username: [
              { required: true, message: '请输入登录名称', trigger: 'blur' },
              { min: 1, max: 20, message: '用户名长度需要在20个字以内', trigger: 'blur' }
            ],
            password: [{ required: true, trigger: 'blur', message: '密码不能为空'}]
          }
        }
      },
      methods: {
        bindSocial() {
          this.$refs.socialForm.validate(valid => {
            if(valid) {
              bindSocial(this.bindForm).then((res) => {
                if(res.code === 2000) {
                  Message.success(res.message)
                  this.showDialog = false
                  this.$router.push({path: '/login'})
                }
              }).catch(err => {
                console.log(err)
                Message.error('系统异常')
              })
            }
          })
        },
        handleClose(done) {
          done();
          this.$router.push({path: '/login'})
        }
      },
      created() {
        const hash = window.location.search.slice(1)
////        const hash = window.location.hash.split("?")[1];
////        const hash = window.location.href.split("?")[1];
//        alert('hash'+hash)
////        alert('hash'+window.location.search)
//        window.opener.location.href = window.location.origin + '/login#' + hash
////        window.opener.location.href =  window.location.origin + '/login#' + new Date().getTime().toString()
//        window.close()
//        const hash = window.location.hash.slice(1)
        const hashObj = getQueryObject(hash)
        const originUrl = window.location.origin
        history.replaceState({}, '', originUrl)
        const codeMap = {
          wechat: 'code',
          tencent: 'code'
        }
        const codeName = hashObj['code']
//        alert(codeName)
        if (!codeName) {
          Message.error('第三方登录失败')
        } else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$store.dispatch('LoginByThirdparty', codeName).then((response) => {
            if (response.code === 4001) {
              this.showDialog = true
              this.bindForm.headimg = response.data.headimg
              this.nickname = response.data.nickname
            }
            if (response.code === 2000) {
              this.$router.push({path: '/'})
            }
            loading.close()
          })
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
  .authredirect-wrapper {
    /*position: fixed;*/
    height: 100%;
    width: 100%;
    /*background-color: $bg;*/
    background: #f0f2f5;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  }
  .wechat-avatar {
    font-size: 14px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-block;
    text-align: center;
    background: #ccc;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 132px;
    height: 132px;
    line-height: 132px;
    border-radius: 70px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

</style>
