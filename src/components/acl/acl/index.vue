<template>
  <div class="app-container">
    <div class="table-wrapper">
      <div class="table-head-wrapper">
          <el-button size="small" class="table-head-button" type="primary">展开所有</el-button>
          <el-button size="small" class="table-head-button" type="primary">收缩所有</el-button>
          <el-button size="small" class="table-head-button" type="primary"
                     @click="refresh">刷新</el-button>
      </div>
      <div class="table-body-wrapper">
    <tree-table :data="data"
                :evalFunc="func"
                :columns="columns"
                :evalArgs="args"
                :expandAll="expandAll"
                :props="defaultProps"
                border>
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
      <el-table-column align="center" label="操作" class-name="small-padding" width="180">
        <template slot-scope="scope">
          <el-button class="table-operate-button" v-if="scope.row.type !== 3" type="primary"
                     size="mini"  @click="add(scope.row.id,scope.row.type)">添加</el-button>
          <el-button class="table-operate-button" type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button class="table-operate-button" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
      </div>
    </div>
    <el-dialog width="600px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form size="medium" :rules="rules" ref="aclForm" :model="temp" label-width="80px" style="padding:0 24px">
        <el-form-item label="类型" prop="type">
        <el-radio-group v-model="temp.type">
          <el-radio v-if="contentShow" :label="1">目录</el-radio>
          <el-radio v-if="menuShow" :label="2">菜单</el-radio>
          <el-radio v-if="bottonShow" :label="3">按钮</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="父级权限" prop="parentId">
          <el-select v-model.number="parentId" placeholder="请选择">

          </el-select>
        </el-form-item>

        <el-form-item label="权限名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item v-if="temp.type === 1 || temp.type === 2 || temp.type === 4" label="图标">
          <el-input v-model="temp.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="temp.type === 3 || temp.type === 2 || temp.type === 4" label="URL" prop="url">
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
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from 'base/TreeTable'
import treeToArray from './aclEval'
import { getAclTree, addAcl, updateAcl} from 'api/acl'
import {Message} from 'element-ui'
const statusOptions = [
  {key: 1, display_name: '有效'},
  {key: 2, display_name: '无效'}
]
export default {
  name: 'acl',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: true,
      data: [],
      columns: [
        {
          text: '权限名称',
          value: 'name',
          width: 250
        }
      ],
      defaultProps: {
        children: 'aclList'
      },
      args: [null, null],
      dialogFormVisible: false,
      textMap: {
        update: '编辑权限',
        create: '新增权限'
      },
      dialogStatus: '',
      statusOptions,
      contentShow: false,
      menuShow: false,
      bottonShow: false,
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '权限名称长度需要在2-20个字之间', trigger: 'blur' }
        ],
        parentId: [
          { required: true, trigger: 'blur',message: '父级权限不能为空'},
          { type: 'number', message: '必须是数字', trigger: 'blur' }
        ],
        remark: [
          { min: 1, max: 200, message: '备注长度需要在200个字以内', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '必须指定用户的状态', trigger: 'change' },
          { type: 'number', message: '必须是数字', trigger: 'blur' }
        ],
//        icon: [
//          { required: true, message: '图标不允许为空', trigger: 'blur' },
//          { min: 1, max: 30, message: '图标名称长度需要在30个字符以内', trigger: 'blur' }
//        ],
        url: [
          { required: true, message: 'url不允许为空', trigger: 'blur' },
          { min: 6, max: 100, message: '权限URL长度需要在6-100个字符之间', trigger: 'blur' }
        ],
        seq: [{required: true, message: '顺序不能为空'}, {type: 'number', message: '必须为数字值', trigger: 'blur'}],
      },
      temp: {
        id: undefined,
        type: undefined,
        parentId: undefined,
        name: '',
        icon: undefined,
        url: undefined,
        remark: '',
        status: undefined,
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
    modalType(type) {
      if (type === 1) { // 目录下面只能添加菜单和目录
        this.contentShow = true
        this.menuShow = true
        this.bottonShow = false
        this.temp.type = 1
      }
      if (type === 2) { // 菜单下面只能添加按钮
        this.contentShow = false
        this.menuShow = false
        this.bottonShow = true
        this.temp.type = 3
      }
    },
    editTemp(row) {
      this.temp.id = row.id
      this.temp.type = row.type
      this.temp.parentId = row.parentId
      this.temp.name = row.name
      this.temp.icon = row.icon
      this.temp.url = row.url
      this.temp.remark = row.remark
      this.temp.status = row.status
      this.temp.seq = row.seq
    },
    edit(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      switch(row.type)
      {
        case 1:
          this.contentShow = true
          this.menuShow = false
          this.bottonShow = false
          break;
        case 2:
          this.contentShow = false
          this.menuShow = true
          this.bottonShow = false
          break;
        case 3:
          this.contentShow = false
          this.menuShow = false
          this.bottonShow = true
          break;
        default:
          break;
      }
      this.editTemp(row)
      this.$nextTick(() => {
        this.$refs.aclForm.clearValidate()
      })
    },
    add(parentId,type) {
      this.resetTemp()
      this.temp.parentId = parentId
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.modalType(type)
      this.$nextTick(() => {
        this.$refs.aclForm.clearValidate()
      })
    },
    updateData() {
      this.$refs.aclForm.validate((valid) => {
        if (valid) {
          this.createOrUpdate(updateAcl(this.temp), function (data) {
            Message.success('编辑成功')
          }, null)
        }
      })
    },
    createData() {
      this.$refs.aclForm.validate((valid) => {
        if (valid) {
          this.createOrUpdate(addAcl(this.temp), function (data) {
            Message.success('添加成功')
          }, null)
        }
      })
    },
    createOrUpdate(method, successCallback, failCallback) {
      method.then((result) => {
        if (result.code === 2000) {
          this.dialogFormVisible = false
          this.getAclTree()
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
        type: undefined,
        parentId: undefined,
        name: '',
        icon: undefined,
        url: undefined,
        remark: '',
        status: 1,
        seq: undefined
      }
    },
    refresh() {
      this.getAclTree()
    },
    message(row) {
      this.$message.info(row.event)
    }
  }
}
</script>
