<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="TemplateId" prop="templateId">
            <el-input v-model="dataForm.templateId" placeholder="TemplateId"></el-input>
        </el-form-item>
        <el-form-item label="文件内容" prop="file">
            <el-input v-model="dataForm.file" placeholder="文件内容"></el-input>
        </el-form-item>
        <el-form-item label="文件类型" prop="fileType">
            <el-input v-model="dataForm.fileType" placeholder="文件类型"></el-input>
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
          templateId: '',
          file: '',
          fileType: ''
        },
        dataRule: {
          templateId: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          file: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          fileType: [
              { required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/codetemplatefile/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.templateId = data.codetemplatefile.templateId
                this.dataForm.file = data.codetemplatefile.file
                this.dataForm.fileType = data.codetemplatefile.fileType
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
              url: this.$http.adornUrl(`/codetemplatefile/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'templateId': this.dataForm.templateId,
                'file': this.dataForm.file,
                'fileType': this.dataForm.fileType
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
