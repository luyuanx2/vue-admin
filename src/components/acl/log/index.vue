<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <div class="app-container">
        <div class="filter-container">
          <el-form ref="logSearchForm" size="small" :inline="true" :model="listQuery" class="demo-form-inline">
            <el-form-item prop="operator">
              <el-input  @keyup.enter.native="handleFilter"
                         placeholder="操作人"
                         v-model="listQuery.operator">
              </el-input>
            </el-form-item>
            <el-form-item prop="type">
              <el-select clearable style="width: 100px" v-model="listQuery.type"
                         placeholder="类型">
                <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name"
                           :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="beforeSeg">
              <el-input @keyup.enter.native="handleFilter"
                        placeholder="操作前的值"
                        v-model="listQuery.beforeSeg">
              </el-input>
            </el-form-item>
            <el-form-item prop="afterSeg">
              <el-input @keyup.enter.native="handleFilter"
                        placeholder="操作后的值"
                        v-model="listQuery.afterSeg">
              </el-input>
            </el-form-item>

            <el-form-item prop="defaultDateTime">
              <el-date-picker
                v-model="defaultDateTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="操作开始时间"
                end-placeholder="操作结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right">
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleFilter">
                查 询
              </el-button>
              <el-button type="default" icon="el-icon-refresh" @click="resetForm('logSearchForm')">
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
                      fit
                      highlight-current-row>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div>
                    <el-col :span="11">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>操作前的值</span>
                        </div>
                        <div>
                          <pre>
                          {{ props.row.oldValue | prettyJson}}
                          </pre>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col class="line" :span="2">
                      <button type="button" class="el-button el-button--primary el-transfer__button">
                        <span><i class="el-icon-d-arrow-right"></i></span>
                      </button>
                    </el-col>
                    <el-col :span="11">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>操作后的值</span>
                        </div>
                        <div>
                          <pre>
                          {{ props.row.newValue | prettyJson}}
                          </pre>
                        </div>
                      </el-card>
                    </el-col>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作者" width="100">
                <template slot-scope="scope">
                  <span>{{scope.row.operator}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作类型" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.type | typeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作时间" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.operateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作前的值">
                <template slot-scope="scope">
                  <span class="operateValue">{{scope.row.oldValue}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作后的值">
                <template slot-scope="scope">
                  <span class="operateValue">{{scope.row.newValue}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" class-name="small-padding" width="100">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status === 0" class="table-operate-button"  @click="recover(scope.row.id)" type="success" size="mini">还原</el-button>
                  <el-button v-if="scope.row.status === 1" class="table-operate-button"  disabled type="success" size="mini">已还原</el-button>
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
    </keep-alive>
  </transition>
</template>

<script>
  import { Message } from 'element-ui'
  import { parseTime, pickerOptions, prettyJson } from '@/utils'
  import { getLogList, recover } from 'api/log'
  const typeOptions = [
    {key: 1, display_name: '部门'},
    {key: 2, display_name: '用户'},
    {key: 3, display_name: '权限'},
    {key: 4, display_name: '角色'},
    {key: 5, display_name: '角色用户关系'},
    {key: 6, display_name: '角色权限关系'}
  ]

  // arr to obj ,such as { 1 : "正常", 2 : "冻结" }
  const typeKeyValue = typeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    data() {
      return {
        defaultDateTime: [],
        tableKey: 3,
        list: null,
        total: null,
        listLoading: true,
        typeOptions,
        pickerOptions: {
          shortcuts: pickerOptions
        },
        listQuery: {
          type: undefined,
          pageNo: 1,
          pageSize: 20,
          beforeSeg: undefined,
          afterSeg: undefined,
          operator: undefined,
          beginTime: this.defaultDateTime.length > 0 ?this.defaultDateTime[0]:undefined,
          endTime: this.defaultDateTime.length > 0 ?this.defaultDateTime[1]:undefined
        },
      }
    },
    filters: {
      parseTime,
      prettyJson,
      typeFilter(type) {
        return typeKeyValue[type]
      }
    },
    watch: {

    },
    created() {
      this.getList()
    },
    methods: {
      tableHeadBgd() {
        return 'background-color:#eee !important'
      },
      getList() {
        this.listLoading = true
        getLogList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
        })
      },
      recover(logId) {
        this.$confirm('还原操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recover({id: logId}).then((response) => {
            if (response.code === 2000) {
              Message.success('还原成功')
              this.getList()
            }
          })
        }).catch(() => {
          Message.info('已取消')
        });
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
      },
      resetForm(form) {
        this.$refs[form].resetFields()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .operateValue{
   width: 50px;  /*必须设置宽度*/
   overflow: hidden;  /*溢出隐藏*/
   text-overflow: ellipsis; /*以省略号...显示*/
   white-space: nowrap;  /*强制不换行*/
 }
</style>
