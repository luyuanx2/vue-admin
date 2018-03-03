<template>
  <div>
    <el-card class="box-card-user">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-button @click="addUser" style="float: right; padding: 3px 0" type="text">新增用户</el-button>
      </div>
      <div>
        <div class="small-filter-container">
          <el-form ref="searchForm" size="small" :inline="true" :model="listQuery" class="demo-form-inline">
            <el-form-item prop="username">
              <el-input  @keyup.enter.native="handleFilter"
                        placeholder="用户名"
                        v-model="listQuery.username">
              </el-input>
            </el-form-item>
            <el-form-item prop="telephone">
              <el-input @keyup.enter.native="handleFilter"
                        placeholder="手机"
                        v-model="listQuery.telephone">
              </el-input>
            </el-form-item>
            <el-form-item prop="status">
              <el-select clearable style="width: 100px" v-model="listQuery.status"
                         placeholder="状态">
                <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name"
                           :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                查 询
              </el-button>
              <el-button type="default" v-waves icon="el-icon-refresh" @click="resetForm('searchForm')">
                重 置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-wrapper">
          <div class="table-head-wrapper">
          </div>
          <div class="table-body-wrapper">
            <el-table size="small"
                      :key='tableKey'
                      :data="list"
                      v-loading="listLoading"
                      element-loading-text="玩命加载中..."
                      :header-row-style="tableHeadBgd"
                      border
                      fit
                      highlight-current-row>
              <el-table-column align="center" label="ID" width="50">
                <template slot-scope="scope">
                  <span>{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="用户名" width="100">
                <template slot-scope="scope">
                  <span>{{scope.row.username}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="部门" width="100">
                <template slot-scope="scope">
                  <span v-text="deptFilter(scope.row.deptId)"></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="手机" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.telephone}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="邮箱">
                <template slot-scope="scope">
                  <span>{{scope.row.mail}}</span>
                </template>
              </el-table-column>
              <el-table-column class-name="status-col" label="状态" width="80">
                <template slot-scope="scope">
                  <status :status="scope.row.status | typeFilter" :text="scope.row.status | statusFilter"></status>
                </template>
              </el-table-column>
              <el-table-column align="center" label="备注">
                <template slot-scope="scope">
                  <span>{{scope.row.remark}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" class-name="small-padding" width="120">
                <template slot-scope="scope">
                  <el-button class="table-operate-button"  @click.stop="edit(scope.row)" type="primary" size="mini">编辑</el-button>
                  <el-button class="table-operate-button" @click.stop="deleteUser(scope.row)" size="mini" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.pageNo"
                             :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog width="480px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form size="medium" :rules="rules" ref="userForm" :model="temp" label-width="70px" style="padding:0 24px">
        <el-form-item label="部门">
          <el-input disabled v-model="currentDeptName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input type="number" v-model="temp.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="temp.mail"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select clearable style="width: 150px" v-model="temp.status"
                     placeholder="状态">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="medium" v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button size="medium" v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { isvalidTelephone } from '@/utils/validate'
  import Status from 'base/Status'
  import {getUserList, addUser, updateUser, deleteUser} from 'api/user'
  import waves from 'common/js/directive/waves' // 水波纹指令
  import {Message} from 'element-ui'
  import { statusOptions, textMap, statusKeyValue, statusTypeMap } from 'common/js/common'


  export default {
    directives: {
      waves
    },
    props: {
      deptMap: {
        type: Object,
        required: true
      },
      deptId: {
        type: Number,
        default: undefined
      },
      text: {
        type: String,
        required: false
      }
    },
    components: {
      Status
    },
    data() {
      const validateTelephone = (rule, value, callback) => {
        if (!isvalidTelephone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
      return {
        currentDeptName: undefined,
        tableHeadBgd: 'background-color:#eee !important',
        tableKey: 1,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          deptId: this.deptId,
          pageNo: 1,
          pageSize: 20,
          status: undefined,
          username: undefined,
          telephone: undefined
        },
        temp: {
          id: undefined,
          username: '',
          mail: '',
          telephone: '',
          remark: '',
          status: undefined,
          deptId: undefined
        },
        statusOptions,
        dialogFormVisible: false,
        textMap,
        dialogStatus: '',
        rules: {
          username: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 1, max: 20, message: '用户名长度需要在20个字以内', trigger: 'blur' }
          ],
          telephone: [
            { required: true, trigger: 'blur',validator: validateTelephone}
          ],
          remark: [
            { min: 1, max: 200, message: '备注长度需要在200个字以内', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '必须指定用户的状态', trigger: 'change' },
            { type: 'number', message: '必须是数字', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱不允许为空', trigger: 'blur' },
            { min: 5, max: 50, message: '邮箱长度需要在5 - 50个字符以内', trigger: 'blur' }
          ]
        },
        downloadLoading: false
      }
    },
    filters: {
      statusFilter(status) {
        return statusKeyValue[status]
      },
      typeFilter(status) {
        return statusTypeMap[status]
      }
    },
    watch: {
      deptId(newDeptId) {
        if(newDeptId === 0){
          this.listQuery.deptId = undefined
        } else {
          this.currentDeptName = this.deptMap[newDeptId].name
          this.listQuery.deptId = newDeptId
        }
        this.handleFilter()
      }
    },
    created() {
      this.getList()
    },
    methods: {
      deleteUser(row) {
        this.$confirm(`删除${row.username}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser({id: row.id}).then(() => {
            Message.success('删除成功')
          })
        }).catch(() => {
          Message.info('已取消删除')
        });
      },
      deptFilter(deptId) {
        let dept = this.deptMap[deptId]
        return dept.name
      },
      editTemp(row) {
        this.temp.id = row.id
        this.temp.username = row.username
        this.temp.mail = row.mail
        this.temp.remark = row.remark
        this.temp.status = row.status
        this.temp.telephone = row.telephone
        this.temp.deptId = row.deptId
      },
      edit(row) {
        this.currentDeptName = this.deptMap[row.deptId].name
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.editTemp(row)
        this.$nextTick(() => {
          this.$refs.userForm.clearValidate()
        })
      },
      addUser() {
        if(!this.deptId || this.deptId === 0) {
          Message.warning('请选择部门')
          return
        }
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.userForm.clearValidate()
        })
      },
      createData() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.createOrUpdate(addUser(this.temp), function (data) {
              Message.success('添加成功')
            }, null);
          }
        })
      },
      updateData() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.createOrUpdate(updateUser(this.temp), function (data) {
              Message.success('编辑成功')
            }, null);
          }
        })
      },
      createOrUpdate(method, successCallback, failCallback) {
        method.then((result) => {
          if (result.code === 2000) {
            this.dialogFormVisible = false
            this.getList()
            if (successCallback) {
              successCallback(result)
            }
          } else {
            if (failCallback) {
              failCallback(result)
            }
          }
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          username: '',
          mail: '',
          telephone: '',
          remark: '',
          status: 1,
          deptId: this.deptId
        }
      },
      getList() {
        this.listLoading = true
        getUserList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      resetForm(form) {
        this.$refs[form].resetFields()
      },
      handleFilter() {
        this.listQuery.pageNo = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
        this.getList()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card-user {
    width: calc(100% - 270px);
    display: inline-block;
  }
</style>

