<template>
  <div class="app-container">

    <tree-table :data="data" :evalFunc="func" :columns="columns" :evalArgs="args" :expandAll="expandAll" border>
      <el-table-column align="center" label="图标">
        <template slot-scope="scope">
          <span><svg-icon :icon-class="scope.row.icon" /></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.type | typeFilter" v-text="typeTextFilter(scope.row.type)">
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.seq}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="URL">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="add(scope.row.id)">添加</el-button>
          <el-button type="success" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <el-dialog width="600px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form size="medium" :rules="rules" ref="aclForm" :model="temp" label-width="70px" style="padding:0 24px">
        <el-form-item label="类型" prop="type">
        <el-radio-group v-model="temp.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="父级权限" prop="parentId">
          <el-select v-model="parentId" placeholder="请选择">

          </el-select>
        </el-form-item>

        <el-form-item label="权限名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="temp.icon"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select clearable style="width: 150px" v-model="temp.status"
                     placeholder="状态">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序" prop="seq">
          <el-input type="number" v-model.number="temp.seq"></el-input>
        </el-form-item>
        <el-form-item label="备注">
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
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from 'base/TreeTable'
import treeToArray from './aclEval'
import { getAclTree } from 'api/acl'
export default {
  name: 'customTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: true,
      data: null,
      columns: [
        {
          text: '权限名称',
          value: 'name',
          width: 250
        }
      ],
      args: [null, null, 'timeLine'],
      dialogFormVisible: false,
      textMap: {
        update: '编辑权限',
        create: '新增权限'
      },
      dialogStatus: '',
      temp: {
        type: undefined,
        parentId: undefined,
        name: '',
        icon: '',
        url: '',
        remark: '',
        status: '',
        seq:undefined
      }
    }
  },
  created() {
    this.getAclTree()
  },
  filters: {
    typeFilter(type) {
      const typesMap = {
        1: '',
        2: 'success',
        3: 'warning',
        4: 'info'
      }
      return typesMap[type]
    }
  },
  methods: {
    getAclTree(){
      getAclTree().then(response => {
        this.data = response.data
      })
    },
    typeTextFilter(type) {
      const typeTextMap = {
        1: '目录',
        2: '菜单',
        3: '按钮',
        4: '其他'
      }
      return typeTextMap[type]
    },
    edit(id) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.aclForm.clearValidate()
      })
    },
    add(parentId) {
//      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.aclForm.clearValidate()
      })
    },
    updateData() {

    },
    createData() {

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
    message(row) {
      this.$message.info(row.event)
    }
  }
}
</script>
