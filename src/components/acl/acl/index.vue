<template>
  <div class="app-container">

    <tree-table :data="data" :evalFunc="func" :evalArgs="args" :expandAll="expandAll" border>
      <el-table-column align="center" label="权限名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图标">
        <template slot-scope="scope">
          <span>{{scope.row.icon}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
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
      <el-table-column align="center" label="操作" class-name="small-padding" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
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
      expandAll: false,
      data: null,
      args: [null, null, 'timeLine']
    }
  },
  created() {
    this.getAclTree()
  },
  methods: {
    getAclTree(){
      getAclTree().then(response => {
        this.data = response.data
      })
    },
    message(row) {
      this.$message.info(row.event)
    }
  }
}
</script>
