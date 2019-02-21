<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="主键" prop="id">
            <el-input v-model="dataForm.id" placeholder="主键"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="listPicUrl">
            <el-input v-model="dataForm.listPicUrl" placeholder="图片"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="simpleDesc">
            <el-input v-model="dataForm.simpleDesc" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="picUrl">
            <el-input v-model="dataForm.picUrl" placeholder="图片"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
            <el-input v-model="dataForm.sortOrder" placeholder="排序"></el-input>
        </el-form-item>
        <el-form-item label="显示" prop="isShow">
            <el-input v-model="dataForm.isShow" placeholder="显示"></el-input>
        </el-form-item>
        <el-form-item label="FloorPrice" prop="floorPrice">
            <el-input v-model="dataForm.floorPrice" placeholder="FloorPrice"></el-input>
        </el-form-item>
        <el-form-item label="app显示图片" prop="appListPicUrl">
            <el-input v-model="dataForm.appListPicUrl" placeholder="app显示图片"></el-input>
        </el-form-item>
        <el-form-item label="新品牌" prop="isNew">
            <el-input v-model="dataForm.isNew" placeholder="新品牌"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="newPicUrl">
            <el-input v-model="dataForm.newPicUrl" placeholder="图片"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="newSortOrder">
            <el-input v-model="dataForm.newSortOrder" placeholder="排序"></el-input>
        </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: '',
          name: '',
          listPicUrl: '',
          simpleDesc: '',
          picUrl: '',
          sortOrder: '',
          isShow: '',
          floorPrice: '',
          appListPicUrl: '',
          isNew: '',
          newPicUrl: '',
          newSortOrder: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          listPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          simpleDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          picUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isShow: [{ required: true, message: '不能为空', trigger: 'blur' }],
          floorPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          appListPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isNew: [{ required: true, message: '不能为空', trigger: 'blur' }],
          newPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          newSortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/shopbrand/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopbrand.id
                this.dataForm.name = data.shopbrand.name
                this.dataForm.listPicUrl = data.shopbrand.listPicUrl
                this.dataForm.simpleDesc = data.shopbrand.simpleDesc
                this.dataForm.picUrl = data.shopbrand.picUrl
                this.dataForm.sortOrder = data.shopbrand.sortOrder
                this.dataForm.isShow = data.shopbrand.isShow
                this.dataForm.floorPrice = data.shopbrand.floorPrice
                this.dataForm.appListPicUrl = data.shopbrand.appListPicUrl
                this.dataForm.isNew = data.shopbrand.isNew
                this.dataForm.newPicUrl = data.shopbrand.newPicUrl
                this.dataForm.newSortOrder = data.shopbrand.newSortOrder
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/shopbrand/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'name': this.dataForm.name,
                'listPicUrl': this.dataForm.listPicUrl,
                'simpleDesc': this.dataForm.simpleDesc,
                'picUrl': this.dataForm.picUrl,
                'sortOrder': this.dataForm.sortOrder,
                'isShow': this.dataForm.isShow,
                'floorPrice': this.dataForm.floorPrice,
                'appListPicUrl': this.dataForm.appListPicUrl,
                'isNew': this.dataForm.isNew,
                'newPicUrl': this.dataForm.newPicUrl,
                'newSortOrder': this.dataForm.newSortOrder
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
