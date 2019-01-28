<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="dataForm.templateName" placeholder="模板名称"></el-input>
        </el-form-item>
        <el-form-item label="模板地址" prop="templatePath">
            <el-input v-model="dataForm.templatePath" placeholder="模板地址"></el-input>
        </el-form-item>
        <el-form-item label="TemplateDesc" prop="templateDesc">
            <el-input v-model="dataForm.templateDesc" placeholder="TemplateDesc"></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="fileName">
            <el-input v-model="dataForm.fileName" placeholder="文件名称"></el-input>
        </el-form-item>
        <el-form-item label="组ID" prop="groupId">
            <el-input v-model="dataForm.groupId" placeholder="组ID"></el-input>
        </el-form-item>
        <el-form-item label="本地路径" prop="localPath">
            <el-input v-model="dataForm.localPath" placeholder="本地路径"></el-input>
        </el-form-item>
        <el-form-item label="模板类型" prop="templateType">
            <el-input v-model="dataForm.templateType" placeholder="模板类型"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="crtUserId">
            <el-input v-model="dataForm.crtUserId" placeholder="创建人"></el-input>
        </el-form-item>
        <el-form-item label="原ID" prop="originalId">
            <el-input v-model="dataForm.originalId" placeholder="原ID"></el-input>
        </el-form-item>
        <el-form-item label="版本 1 正常版本 2 历史版本" prop="version">
            <el-input v-model="dataForm.version" placeholder="版本 1 正常版本 2 历史版本"></el-input>
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
          templateName: '',
          templatePath: '',
          templateDesc: '',
          fileName: '',
          groupId: '',
          localPath: '',
          templateType: '',
          crtUserId: '',
          originalId: '',
          version: ''
        },
        dataRule: {
          templateName: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          templatePath: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          templateDesc: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          fileName: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          groupId: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          localPath: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          templateType: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          crtUserId: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          originalId: [
              { required: true, message: '不能为空', trigger: 'blur' }],
          version: [
              { required: true, message: '不能为空', trigger: 'blur' }] }
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
              url: this.$http.adornUrl(`/codetemplate/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.templateName = data.codetemplate.templateName
                this.dataForm.templatePath = data.codetemplate.templatePath
                this.dataForm.templateDesc = data.codetemplate.templateDesc
                this.dataForm.fileName = data.codetemplate.fileName
                this.dataForm.groupId = data.codetemplate.groupId
                this.dataForm.localPath = data.codetemplate.localPath
                this.dataForm.templateType = data.codetemplate.templateType
                this.dataForm.crtUserId = data.codetemplate.crtUserId
                this.dataForm.originalId = data.codetemplate.originalId
                this.dataForm.version = data.codetemplate.version
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
              url: this.$http.adornUrl(`/codetemplate/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'templateName': this.dataForm.templateName,
                'templatePath': this.dataForm.templatePath,
                'templateDesc': this.dataForm.templateDesc,
                'fileName': this.dataForm.fileName,
                'groupId': this.dataForm.groupId,
                'localPath': this.dataForm.localPath,
                'templateType': this.dataForm.templateType,
                'crtUserId': this.dataForm.crtUserId,
                'originalId': this.dataForm.originalId,
                'version': this.dataForm.version
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
