<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <div class="app-container">
        <el-card class="box-card-role">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              添 加
            </el-button>
          </div>
          <div>
            <div class="table-wrapper">
              <div class="table-body-wrapper">
                <el-table size="small"
                          @row-click="rowClick"
                          :key='tableKey'
                          :data="list"
                          v-loading="listLoading"
                          element-loading-text="玩命加载中..."
                          :header-row-style="tableHeadBgd"
                          border
                          fit
                          highlight-current-row>
                  <el-table-column align="center" label="角色名称">
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="角色类型">
                    <template slot-scope="scope">
                      <span v-text="roleTypeFilter(scope.row.type)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column class-name="status-col" label="状态">
                    <template slot-scope="scope">
                      <status :status="scope.row.status | typeFilter" :text="scope.row.status | statusFilter"></status>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" class-name="small-padding" width="110">
                    <template slot-scope="scope">
                      <el-button class="table-operate-button" type="primary" size="mini">编辑</el-button>
                      <el-button class="table-operate-button" size="mini" type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="pagination-container">
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 small
                                 :current-page.sync="listQuery.page"
                                 :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                                 layout="total, prev, pager, next" :total="total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-card>
          <el-card class="box-card-acl">
            <div slot="header" class="clearfix">
              <span>角色与权限</span>
              <el-button @click="changeAcls" style="float: right; padding: 3px 0" type="text">
                保 存
              </el-button>
            </div>
            <div>
            <el-tree
              :data="roleTreeData"
              ref="roleTree"
              :props="{
                  key: 'id',
                  label: 'name',
                  children: 'aclList'
                  }"
              show-checkbox
              node-key="id"
              :default-expanded-keys="expandedKeys"
              default-expand-all
              :default-checked-keys="checkedKeys">
            </el-tree>
            </div>
          </el-card>
          <el-card class="box-card-user">
            <div slot="header" class="clearfix">
              <span>角色与用户</span>
              <el-button @click="changeUsers" style="float: right; padding: 3px 0" type="text">
                保 存
              </el-button>
            </div>
            <div style="text-align: center">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入用户名"
                :titles="['待选用户列表', '已选用户列表']"
                v-model="selected"
                :data="users"
                :props="{
                  key: 'id',
                  label: 'username'
                  }">
              </el-transfer>
            </div>
          </el-card>
      </div>
    </keep-alive>
  </transition>
</template>

<script>
  import Status from 'base/Status'
  import {getRoleList, getRoleUserList, getRoleTreeData, changeAcls, changeUsers} from 'api/role'
  import {Message} from 'element-ui'
  import { mergeArray } from '@/utils'

  const statusOptions = [
    {key: 1, display_name: '有效'},
    {key: 2, display_name: '无效'}
  ]

  export default {
    components: {
      Status
    },
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        currentRoleId: undefined,
        expandedKeys: [],
        checkedKeys: [],
        users: [],
        selected: [],
        tableKey: 'role',
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        roleTreeData: undefined,
        filterMethod(query, item) {
          return item.username.indexOf(query) > -1;
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '有效',
          2: '无效'
        }
        return statusMap[status]
      },
      typeFilter(status) {
        const statusTypeMap = {
          1: 'success',
          2: 'error'
        }
        return statusTypeMap[status]
      }
    },
    watch: {

    },
    created() {
      this.getList()
    },
    methods: {
      createData() {

      },
      updateData() {

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
      roleTypeFilter(type){
        const roleTypeMap = {
          1: '管理员',
          2: '其他'
        }
        return roleTypeMap[type]
      },
      getList() {
          this.listLoading = true
          getRoleList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      getTransferData(roleId) {
        getRoleUserList(roleId).then(response => {
          this.selected =  response.data.selected
          this.users = response.data.users
        })
      },
      getRoleTreeData(roleId) {
        getRoleTreeData(roleId).then(response => {
          this.roleTreeData =  response.data
          this.recursiveRenderRoleTree(this.roleTreeData)
        })
      },
      recursiveRenderRoleTree(data) {
        data.forEach((item) =>{
          if (item.checked && item.aclList.length === 0) {
            this.checkedKeys.push(item.id)
          }
          this.recursiveRenderRoleTree(item.aclList)
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      rowClick(row, event, column) {
        this.currentRoleId = row.id
        //根据角色id查找角色树
        this.getRoleTreeData(this.currentRoleId);
        //根据角色id绑定的用户
        this.getTransferData(this.currentRoleId)
      },
      changeAcls() {
        if(!this.currentRoleId){
          Message.warning('请选择角色')
          return
        }
        let checkedKes = this.$refs.roleTree.getCheckedKeys()
//        let halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
        changeAcls({
            roleId: this.currentRoleId,
            aclIds: checkedKes.join(',')
        }).then(response => {
          if (response.code === 2000) {
            Message.success('保存成功')
          }
        })
      },
      changeUsers() {
        if(!this.currentRoleId){
          Message.warning('请选择角色')
          return
        }
        let checkedKes = this.$refs.roleTree.getCheckedKeys()
//        let halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
        alert(this.selected.join(','))
        changeUsers({
          roleId: this.currentRoleId,
          userIds: this.selected.join(',')
        }).then(response => {
          if (response.code === 2000) {
            Message.success('保存成功')
          }
        })
      },
      tableHeadBgd() {
        return 'background-color:#eee !important'
      },
      resetForm(form) {
        this.$refs[form].resetFields()
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

  .box-card-role {
    float: left;
    width: calc(100% - 810px);
    display: inline-block;
  }

  .box-card-acl {
    width: 270px;
    float: left;
    display: inline-block;
  }

  .box-card-user {
    width: 540px;
    display: inline-block;
  }

</style>
