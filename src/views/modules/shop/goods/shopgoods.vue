<template>
  <div class="mod-config">
    <div ref="shopgoodsFrom" >
      <el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()"><icon-svg name="chaxun" class="icon"></icon-svg> 查询</el-button>
          <el-dropdown @command="handleCommand" trigger="click">
            <el-button v-if="isAuth('shopgoods:add')" type="primary"> 新增<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="composeValue(0,'')">百货</el-dropdown-item>
              <el-dropdown-item :command="composeValue(1,'')">食品</el-dropdown-item>
              <el-dropdown-item :command="composeValue(2,'')">器械设备</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button v-if="isAuth('shopgoods:add')" type="primary" @click="uploadExcel()"><icon-svg name="yunduanshangchuan" class="icon"></icon-svg>  导入</el-button>
          <el-button v-if="isAuth('shopgoods:add')" type="primary" :disabled="this.downloadDisable" @click="exportExcel()"><icon-svg name="yunduanxiazai" class="icon"></icon-svg>  导出</el-button>
          <el-button v-if="isAuth('shopgoods:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0"><icon-svg name="shanchu1" class="icon"></icon-svg> 批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="dataList"
      border
      stripe
      :height="tableHight"
      ref="shopgoodsTable"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      @row-click="toggleSelection"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="brandId"
        header-align="center"
        align="center"
        label="品牌id">
      </el-table-column>
      <el-table-column
        prop="categoryId"
        header-align="center"
        align="center"
        label="商品类别ID">
      </el-table-column>
      <el-table-column
        prop="goodsNumber"
        header-align="center"
        align="center"
        label="序列号">
      </el-table-column>
      <el-table-column
        prop="primaryPicUrl"
        header-align="center"
        align="center"
        label="商品主图">
      </el-table-column>
      <el-table-column
        prop="isNew"
        header-align="center"
        align="center"
        label="是否新品">
      </el-table-column>
      <el-table-column
        prop="isOnSale"
        header-align="center"
        align="center"
        label="是否在售">
      </el-table-column>
      <el-table-column
        prop="isHot"
        header-align="center"
        align="center"
        label="是否热销">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click.stop="addOrUpdateHandle(scope.row.kind,scope.row.id)"> <icon-svg name="bianjisekuai" class="icon"></icon-svg>修改</el-button>
          <el-button type="text" size="small"  class="red" v-on:click.stop="deleteHandle(scope.row.id)"><icon-svg name="shanchu" class="icon"></icon-svg>删除</el-button>
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
      <!--弹窗上传-->
      <upload v-if="uploadVisible" ref="upload"></upload>
  </div>
</template>

<script>
  import AddOrUpdate from './shopgoods-add-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        uploadVisible: false,
        downloadDisable: false,
        offsetHeight: 0,
        tableHight: 0
      }
    },
    components: {
      AddOrUpdate
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight }
      }
    },
    watch: {
      documentClientHeight: function (val) {
        this.tableHight = val - this.offsetHeight - 169
      }
    },
    activated () {
      this.getDataList()
    },
    mounted () {
      this.offsetHeight = this.$refs.shopgoodsFrom.offsetHeight
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/shopgoods/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.tableHight = this.$store.state.common.documentClientHeight - this.offsetHeight - 169
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
      // 触发一行的
      toggleSelection (row) {
        if (row) {
          this.$refs.shopgoodsTable.toggleRowSelection(row)
        } else {
          this.$refs.shopgoodsTable.clearSelection()
        }
      },
      // 新增 / 修改
      addOrUpdateHandle (type, id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
        console.log(type, id)
      },
      uploadExcel (id) {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.$refs.upload.init()
        })
      },
      exportExcel () {
        this.$notify({
          title: '警告',
          message: '开始下载，请勿多次点击',
          type: 'warning'
        })
        this.$axios({
          url: this.$http.adornUrl(`/shopgoods/export?token=${this.$cookie.get('token')}`),
          method: 'GET',
          responseType: 'blob',
          params: {
            id: '',
            name: '',
            brandId: '',
            categoryId: '',
            goodsNumber: '',
            keywords: '',
            counterPrice: '',
            price: '',
            goodsBrief: '',
            goodsDesc: '',
            sortOrder: '',
            goodsUnit: '',
            primaryPicUrl: '',
            listPicUrl: '',
            isNew: '',
            isOnSale: '',
            isHot: '',
            isDelete: '',
            createUserId: '',
            createTime: '',
            updateUserId: '',
            updateTime: ''
          }
        }).then((response) => {
          const blob = new Blob([response.data], {type: response.data.type})
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          let name = decodeURI(response.headers['name'])
          let fileName = 'unknown'
          if (name) {
            fileName = decodeURI(name)
          }
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          link.remove()
          window.URL.revokeObjectURL(url)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/shopgoods/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
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
        })
      },
      handleCommand (result) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(result.id, result.command)
        })
      },
      composeValue (command, id) {
        return {
          'command': command,
          'id': id
        }
      }
    }
  }
</script>
<style scoped>
    .red{
        color: #ff0000;
    }
</style>
