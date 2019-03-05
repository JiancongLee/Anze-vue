<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="附件类型：0图片 1文件" prop="annexType">
            <el-input v-model="dataForm.annexType" placeholder="附件类型：0图片 1文件"></el-input>
        </el-form-item>
        <el-form-item label="文件类型" prop="fileType">
            <el-input v-model="dataForm.fileType" placeholder="文件类型"></el-input>
        </el-form-item>
        <el-form-item label="附件名称" prop="annexName">
            <el-input v-model="dataForm.annexName" placeholder="附件名称"></el-input>
        </el-form-item>
        <el-form-item label="基础路径" prop="basePath">
            <el-input v-model="dataForm.basePath" placeholder="基础路径"></el-input>
        </el-form-item>
        <el-form-item label="日期分类路径" prop="datePath">
            <el-input v-model="dataForm.datePath" placeholder="日期分类路径"></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="fileName">
            <el-input v-model="dataForm.fileName" placeholder="文件名称"></el-input>
        </el-form-item>
        <el-form-item label="上传时间" prop="uploadDate">
            <el-date-picker
                    v-model="dataForm.uploadDate"
                    type="date"
                    placeholder="上传时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="附件绝对路径" prop="absolutePath">
            <el-input v-model="dataForm.absolutePath" placeholder="附件绝对路径"></el-input>
        </el-form-item>
        <el-form-item label="上传人id" prop="uploadUserId">
            <el-input v-model="dataForm.uploadUserId" placeholder="上传人id"></el-input>
        </el-form-item>
        <el-form-item label="上传人姓名" prop="uploadUserName">
            <el-input v-model="dataForm.uploadUserName" placeholder="上传人姓名"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate">
            <el-date-picker
                    v-model="dataForm.updateDate"
                    type="date"
                    placeholder="更新时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人id" prop="updateUserId">
            <el-input v-model="dataForm.updateUserId" placeholder="更新人id"></el-input>
        </el-form-item>
        <el-form-item label="更新人姓名" prop="updateUserName">
            <el-input v-model="dataForm.updateUserName" placeholder="更新人姓名"></el-input>
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
          annexType: '',
          fileType: '',
          annexName: '',
          basePath: '',
          datePath: '',
          fileName: '',
          uploadDate: '',
          absolutePath: '',
          uploadUserId: '',
          uploadUserName: '',
          updateDate: '',
          updateUserId: '',
          updateUserName: ''
        },
        dataRule: {
          annexType: [{ required: true, message: '不能为空', trigger: 'blur' }],
          fileType: [{ required: true, message: '不能为空', trigger: 'blur' }],
          annexName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          basePath: [{ required: true, message: '不能为空', trigger: 'blur' }],
          datePath: [{ required: true, message: '不能为空', trigger: 'blur' }],
          fileName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          uploadDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
          absolutePath: [{ required: true, message: '不能为空', trigger: 'blur' }],
          uploadUserId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          uploadUserName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateUserId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateUserName: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/baseannex/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.annexType = data.baseannex.annexType
                this.dataForm.fileType = data.baseannex.fileType
                this.dataForm.annexName = data.baseannex.annexName
                this.dataForm.basePath = data.baseannex.basePath
                this.dataForm.datePath = data.baseannex.datePath
                this.dataForm.fileName = data.baseannex.fileName
                this.dataForm.uploadDate = data.baseannex.uploadDate
                this.dataForm.absolutePath = data.baseannex.absolutePath
                this.dataForm.uploadUserId = data.baseannex.uploadUserId
                this.dataForm.uploadUserName = data.baseannex.uploadUserName
                this.dataForm.updateDate = data.baseannex.updateDate
                this.dataForm.updateUserId = data.baseannex.updateUserId
                this.dataForm.updateUserName = data.baseannex.updateUserName
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
              url: this.$http.adornUrl(`/baseannex/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'annexType': this.dataForm.annexType,
                'fileType': this.dataForm.fileType,
                'annexName': this.dataForm.annexName,
                'basePath': this.dataForm.basePath,
                'datePath': this.dataForm.datePath,
                'fileName': this.dataForm.fileName,
                'uploadDate': this.dataForm.uploadDate,
                'absolutePath': this.dataForm.absolutePath,
                'uploadUserId': this.dataForm.uploadUserId,
                'uploadUserName': this.dataForm.uploadUserName,
                'updateDate': this.dataForm.updateDate,
                'updateUserId': this.dataForm.updateUserId,
                'updateUserName': this.dataForm.updateUserName
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
