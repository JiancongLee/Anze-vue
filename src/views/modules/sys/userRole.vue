<template>
  <el-container>
    <el-aside width="300px">


      <div class="left_lis_title">
        角色列表
      </div>
      <div class="left_list_box">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          @check-change="handleNodeCheck"
          ref="role_tree"
          show-checkbox
        >
        </el-tree>
      </div>

    </el-aside>
    <el-main>
      <div class="mod-user">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
          <el-form-item>
            <el-input v-model="dataForm.userName" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="getDataList()">查询</el-button>
            <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
            <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="dataList"
          border
          :height="tableViewHight"
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="userId"
            header-align="center"
            align="center"
            width="80"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="username"
            header-align="center"
            align="center"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="email"
            header-align="center"
            align="center"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="mobile"
            header-align="center"
            align="center"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
              <el-tag v-else size="small">正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            width="180"
            label="创建时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
              <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import AddOrUpdate from './user-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          userName: ''
        },
        filterText: '',
        treeData: [],
        roleList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight }
      },
      tableViewHight: {
        get () {
          let tableHight = this.documentClientHeight - 267
          this.tableViewHight = tableHight
          return tableHight
        },
        set (val) {}
      }
    },
    watch: {
      filterText (val) {
        this.$refs.role_tree.filter(val)
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.getTreeData()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/user/rolelist'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.userName,
            'roleList': this.roleList.join(',')
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      handleNodeClick (data, node, self) {
        if (node.checked) {
          this.$refs.role_tree.setChecked(node, false, true)
        } else {
          this.$refs.role_tree.setChecked(node, true, true)
        }
      },
      handleNodeCheck (data, node, self) {
        if (node) {
          this.roleList.push(data.id)
          this.getDataList()
        } else {
          this.roleList = this.roleList.filter(item => item !== data.id)
          this.getDataList()
        }
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getTreeData () {
        this.$http.get(this.$http.adornUrl('/sys/role/all'))
          .then(({data}) => {
            if (data) {
              this.treeData = data.list
            }
          })
      },
      // 删除
      deleteHandle (id) {
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/user/delete'),
            method: 'post',
            data: this.$http.adornData(userIds, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped>
  .left_lis_title {
    width: 90%;
    /* height: 56px; */
    margin: 0 auto;
    padding: 30px 0 10px 0;
    font-size: 16px;
    /* line-height: 42px; */
    color: #000;
    /* border-bottom: 1px solid #DFE3E9; */
  }
  .left_list_box {
    width: 90%;
    height: 70%;
    /* max-height: 100%; */
    margin: 0 auto;
    border: 1px  solid #B9C0CA;
    border-radius: 4px;
    overflow: auto;
  }

</style>
