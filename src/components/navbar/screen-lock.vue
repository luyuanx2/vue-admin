<template>
    <span>
      <span @click="handleLock">
      <svg-icon icon-class="screenlock" />
        </span>
        <!--<i class="el-icon-rank" @click="handleLock"></i>-->
        <el-dialog title="设置锁屏密码" :visible.sync="dialogFormVisible" width="500px">
            <el-form size="medium" :model="form" ref="form" label-width="80px" style="padding:0 24px">
                <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空'}]">
                    <el-input v-model="form.passwd" placeholder="请输入锁屏密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
              <el-button size="medium" type="primary" @click="handleSetLock">确 定</el-button>
            </span>
        </el-dialog>
    </span>
</template>

<script>
import { fullscreenToggel } from '@/utils';
import { validateNull } from '@/utils'
import { mapGetters } from "vuex";
export default {
  name: "screen-lock",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        passwd: ""
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["lockPasswd"])
  },
  props: [],
  methods: {
    handleSetLock() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store.commit("SET_LOCK_PASSWD", this.form.passwd);
          this.handleLock();
        }
      });
    },
    handleLock() {
      if (validateNull(this.lockPasswd)) {
        this.dialogFormVisible = true;
        return;
      }
      this.$store.commit("SET_LOCK");
      setTimeout(() => {
        this.$router.push({ path: "/lock" });
      }, 100);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>

</style>
