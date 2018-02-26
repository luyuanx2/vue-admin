<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <div class="app-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>部门列表</span>
            <el-button style="float: right; padding: 3px 0" type="text"
                       v-html="expandBtn"
                       @click="expandOrShrink">
            </el-button>
          </div>
          <div>
            <el-input
              size="small"
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>

            <el-tree
              @node-click="selectNode"
              class="filter-tree"
              :data="data2"
              :props="defaultProps"
              :default-expand-all="isExpand"
              node-key="id"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              highlight-current="true"
              :render-content="renderContent"
              ref="tree2">
            </el-tree>
          </div>
        </el-card>
        <user-list v-if="deptMap" :deptMap="deptMap" :deptId="deptId"></user-list>
        <el-dialog width="410px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form size="medium" :rules="rules" ref="dataForm" :model="temp" label-width="50px" style="padding:0 24px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
            <el-form-item label="顺序" prop="seq">
              <el-input type="number" v-model.number="temp.seq"></el-input>
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
    </keep-alive>
  </transition>
</template>

<script>
  import UserList from 'components/acl/user/UserList'
  import {listDept, addDept, deleteDept, updateDept} from 'api/dept'
  import {Message} from 'element-ui'
  export default {
    components: {
      UserList
    },
    computed: {
      expandAll() {
        return this.isExpand
      },
      expandBtn() {
        if (this.isExpand) {
          return '全部收缩'
        }
        return '全部展开'
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    methods: {
      selectNode(a, node, c) {
        if(node.level !== 1) {
          this.deptId = node.key
        } else {
          this.deptId = 0
        }
      },
      _recursiveRenderDept(deptList) {
        deptList.forEach((dept) => {
          this.deptMap[dept.id] = dept
          this._recursiveRenderDept(dept.deptList)
        })
      },
      _listDept() {
        listDept().then(response => {
          this.data2 = response.data
          this._recursiveRenderDept(response.data)
        })
      },
      expandOrShrink() {
        for (var i = 0; i < this.$refs.tree2.store._getAllNodes().length; i++) {
          this.$refs.tree2.store._getAllNodes()[i].expanded = !this.isExpand;
        }
        this.isExpand = !this.isExpand
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          parentId: '',
          remark: '',
          name: '',
          seq: ''
        }
      },
      editTemp(editDept) {
        this.temp.id = editDept.id
        this.temp.parentId = editDept.parentId
        this.temp.remark = editDept.remark
        this.temp.name = editDept.name
        this.temp.seq = editDept.seq
      },
      edit(node, data, e) {
        e.preventDefault()
        e.stopPropagation()
        let deptId = node.key
        let editDept = this.deptMap[deptId]
        this.editTemp(editDept)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.dataForm.clearValidate()
        })
      },
      append(node, data, e) {
        e.preventDefault()
        e.stopPropagation()
        this.treeData = data
        this.resetTemp()
        this.temp.parentId = node.key
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.dataForm.clearValidate()
        })
      },
      createTreeNode(id, label) {
        const newChild = {id: id, label: label, children: []}
        if (!this.treeData.children) {
          this.$set(this.treeData, 'children', [])
        }
        this.treeData.children.push(newChild)
      },
      updateData() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.createOrUpdate(updateDept(this.temp), function (data) {
              Message.success('编辑成功')
            }, null);
            /*updateDept(this.temp).then(() => {
             this._listDept();
             this.dialogFormVisible = false
             //              this.$notify({
             //                title: '成功',
             //                message: '编辑成功',
             //                type: 'success',
             //                duration: 2000
             //              })
             this.$message({
             type: 'success',
             message: '编辑成功!'
             });
             })*/
          }
        })
      },
      createData() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.createOrUpdate(addDept(this.temp), function (data) {
//              this.createTreeNode(res.data,this.temp.name)
              Message.success('添加成功')
            }, null);
//            addDept(this.temp).then((res) => {
//             this.list.unshift(this.temp)
//             this.createTreeNode(res.data,this.temp.name)
//              this.dialogFormVisible = false
//              this.$message({
//                type: 'success',
//                message: '添加成功!'
//              });
//            })
          }
        })
      },
      createOrUpdate(method, successCallback, failCallback) {
        method.then((result) => {
          if (result.code === 2000) {
            this.dialogFormVisible = false
            this._listDept()
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
      remove(node, data, e) {
        e.preventDefault()
        e.stopPropagation()
        let deptId = node.key
        this.$confirm('删除部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDept({id: deptId}).then(() => {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
            delete this.deptMap[deptId]
            Message.success('删除成功')
          })
        }).catch(() => {
          Message.info('已取消删除')
        });
      },
      renderContent(h, {node, data, store}) {
        if (node.level === 1) {
          return (<span style = "flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 27px;" > < span >
            <span>{node.label}</span ></span><span>
          <el-button style = "font-size: 12px;" type = "text" on-click = {()=>this.edit(node, data, event)}><i class= "el-icon-edit"></i></el-button>
            <el-button style = "font-size: 12px;margin-left: 5px;" type ="text" on-click = {()=>this.append(node, data, event)}>
        <i class= "el-icon-plus"></i></el-button>
            </span></span>)
        }
        return (<span style = "flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" > < span >
          <span>{node.label}</span></span><span>
        <el-button style = "font-size: 12px;" type = "text" on-click = {()=>this.edit(node, data, event)}>
      <i class="el-icon-edit"></i></el-button>
          <el-button style = "font-size: 12px;margin-left: 5px;" type = "text" on-click = {()=>this.append(node, data, event)}>
      <i class="el-icon-plus"></i></el-button >
          <el-button style = "font-size: 12px;margin-left: 5px;" type = "text" on-click = {()=>
        this.remove(node, data, event)
      }><i class="el-icon-minus"></i></el-button></span></span>)
      }
    },
    created() {
      this._listDept()
    },
    data() {
      return {
        deptId: undefined,
        deptMap: {},
        treeData: null,
        rules: {
          name: [{required: true, message: '部门名称不能为空', trigger: 'blur'}],
          seq: [{required: true, message: '顺序不能为空'}, {type: 'number', message: '必须为数字值', trigger: 'blur'}],
          remark: [
            { min: 1, max: 200, message: '备注长度需要在200个字以内', trigger: 'blur' }
          ]
        },
        temp: {
          id: undefined,
          remark: '',
          name: '',
          seq: ''
        },
        dialogFormVisible: false,
        textMap: {
          update: '编辑部门',
          create: '新增部门'
        },
        dialogStatus: '',
        isExpand: true,
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'deptList',
          label: 'name'
        }
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

  .box-card {
    float: left;
    width: 270px;
    height: 100%;
    display: inline-block;
  }

</style>
