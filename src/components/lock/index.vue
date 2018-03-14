<template>
  <div class="lock-container pull-height">
    <div class="lock-form animated bounceInDown">
      <div class="animated" :class="{'shake':passwdError,'bounceOut':pass}">
        <div style="text-align: center;margin-bottom: 20px;color: #fff;">
          <h3>{{name}}</h3>
        </div>
        <div style="text-align: center;margin-bottom: 40px">
          <span class="avatar"><img src="../../common/image/default.png"/></span>
        </div>
        <el-input placeholder="请输入解锁密码" type="password" class="input-with-select animated" v-model="passwd" @keyup.enter.native="handleLogin">
          <el-button slot="append" @click="handleLogin">
            <i class="iconfont yy-jiesuo"></i>
          </el-button>
          <el-button slot="append" @click="handleLogout">
            <i class="iconfont yy-tuichu"></i>
          </el-button>
        </el-input>
      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "lock",
  data() {
    return {
      passwd: "",
      passwdError: false,
      pass: false
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      name: state => state.user.name
    }),
    ...mapGetters(["visitedViews","cachedViews", "lockPasswd"])
  },
  props: [],
  methods: {
    handleLogout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //清除屏幕锁
        this.$store.commit("CLEAR_LOCK");
        this.$store.dispatch("FedLogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    handleLogin() {
      if (this.passwd != this.lockPasswd) {
        this.passwd = "";
        this.$message({
          message: "解锁密码错误,请重新输入",
          type: "error"
        });
        this.passwdError = true;
        setTimeout(() => {
          this.passwdError = false;
        }, 1000);
        return;
      }
      this.pass = true;
      setTimeout(() => {
        this.$store.commit("CLEAR_LOCK");
        this.$router.push({ path: this.visitedViews.pop().path || "/" });
      }, 1000);
    }
  },
  components: {}
};
</script>

<style lang="scss">
  .lock-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    position: relative;
  }
  .lock-container::before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-size: cover;
  }
  .lock-form {
    width: 300px;
  }
  .avatar {
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
    width: 100px;
    height: 100px;
    line-height: 132px;
    border-radius: 70px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

</style>
