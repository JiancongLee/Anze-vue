<template>
  <div class="mod-config">
    <div ref="shopcategoryFrom" >
      <el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()"><icon-svg name="chaxun" class="icon"></icon-svg> 查询</el-button>
          <el-button v-if="isAuth('shopcategory:add')" type="primary" @click="addOrUpdateHandle()"><icon-svg name="addNew" class="icon"></icon-svg>  新增</el-button>
          <!--<el-button v-if="isAuth('shopcategory:add')" type="primary" @click="uploadExcel()"><icon-svg name="yunduanshangchuan" class="icon"></icon-svg>  导入</el-button>-->
          <el-button v-if="isAuth('shopcategory:add')" type="primary" :disabled="this.downloadDisable" @click="exportExcel()"><icon-svg name="yunduanxiazai" class="icon"></icon-svg>  导出</el-button>
          <el-button v-if="isAuth('shopcategory:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0"><icon-svg name="shanchu1" class="icon"></icon-svg> 批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="parentId"
        header-align="center"
        align="center"
        label="父级id">
      </el-table-column>
      <table-tree-column
        prop="name"
        header-align="center"
        treeKey="id"
        width="250"
        label="名称">
      </table-tree-column>
      <el-table-column
        prop="level"
        header-align="center"
        align="center"
        label="级别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 0" size="small" type="info">L1</el-tag>
          <el-tag v-if="scope.row.level === 1" size="small" type="success">L2</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="keywords"
        header-align="center"
        align="center"
        label="关键字">
      </el-table-column>
      <el-table-column
        prop="desc"
        header-align="center"
        align="center"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="sortOrder"
        header-align="center"
        align="center"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="isShow"
        header-align="center"
        align="center"
        label="是否显示">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isShow === 0" size="small" type="danger">否</el-tag>
          <el-tag v-if="scope.row.isShow === 1" size="small" type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="bannerUrl"
        header-align="center"
        align="center"
        label="banner图片">
      </el-table-column>
      <el-table-column
        prop="iconUrl"
        header-align="center"
        align="center"
        label="icon图片">
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        header-align="center"
        align="center"
        label="图片">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click.stop="addOrUpdateHandle(scope.row.id)"> <icon-svg name="bianjisekuai" class="icon"></icon-svg>修改</el-button>
          <el-button type="text" size="small"  class="red" v-on:click.stop="deleteHandle(scope.row.id)"><icon-svg name="shanchu" class="icon"></icon-svg>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
      <!--弹窗上传-->
      <upload v-if="uploadVisible" ref="upload"></upload>
  </div>
</template>

<script>
  import AddOrUpdate from './shopcategory-add-update'
  import TableTreeColumn from '@/components/table-tree-column'
  import { treeDataTranslate } from '@/utils'
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
      AddOrUpdate,
      TableTreeColumn
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
      this.offsetHeight = this.$refs.shopcategoryFrom.offsetHeight
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/shopcategory/list'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = treeDataTranslate(data.list, 'id')
            console.log(this.dataList)
          } else {
            this.dataList = []
          }
          this.tableHight = this.$store.state.common.documentClientHeight - this.offsetHeight - 169
          this.dataListLoading = false
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
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
          url: this.$http.adornUrl(`/shopcategory/export?token=${this.$cookie.get('token')}`),
          method: 'GET',
          responseType: 'blob',
          params: {
            id: '',
            parentId: '',
            name: '',
            level: '',
            keywords: '',
            desc: '',
            sortOrder: '',
            isShow: '',
            bannerUrl: '',
            iconUrl: '',
            imgUrl: '',
            updateTime: '',
            createTime: ''
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
            url: this.$http.adornUrl('/shopcategory/delete'),
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
      }
    }
  }
</script>
<style scoped>
    .red{
        color: #ff0000;
    }
</style>
