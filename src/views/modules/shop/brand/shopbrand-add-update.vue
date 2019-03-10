<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="品牌名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="品牌名称"></el-input>
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
          simpleDesc: '',
          picUrl: '',
          sortOrder: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          simpleDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          picUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.shopbrand.name
                this.dataForm.simpleDesc = data.shopbrand.simpleDesc
                this.dataForm.picUrl = data.shopbrand.picUrl
                this.dataForm.sortOrder = data.shopbrand.sortOrder
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
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'simpleDesc': this.dataForm.simpleDesc,
                'picUrl': this.dataForm.picUrl,
                'sortOrder': this.dataForm.sortOrder
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
