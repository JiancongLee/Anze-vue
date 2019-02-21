<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="主键" prop="msgId">
            <el-input v-model="dataForm.msgId" placeholder="主键"></el-input>
        </el-form-item>
        <el-form-item label="会员Id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="会员Id"></el-input>
        </el-form-item>
        <el-form-item label="会员会员名称" prop="userName">
            <el-input v-model="dataForm.userName" placeholder="会员会员名称"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
            <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="反馈类型" prop="feedType">
            <el-input v-model="dataForm.feedType" placeholder="反馈类型"></el-input>
        </el-form-item>
        <el-form-item label="详细内容" prop="content">
            <el-input v-model="dataForm.content" placeholder="详细内容"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-input v-model="dataForm.status" placeholder="状态"></el-input>
        </el-form-item>
        <el-form-item label="反馈时间" prop="addTime">
            <el-date-picker
                    v-model="dataForm.addTime"
                    type="date"
                    placeholder="反馈时间">
            </el-date-picker>
        </el-form-item>

        <el-row>
            <el-col :span="12">
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>


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
          msgId: '',
          userId: '',
          userName: '',
          mobile: '',
          feedType: '',
          content: '',
          status: '',
          addTime: ''
        },
        dataRule: {
          msgId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          mobile: [{ required: true, message: '不能为空', trigger: 'blur' }],
          feedType: [{ required: true, message: '不能为空', trigger: 'blur' }],
          content: [{ required: true, message: '不能为空', trigger: 'blur' }],
          status: [{ required: true, message: '不能为空', trigger: 'blur' }],
          addTime: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopfeedback/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.msgId = data.shopfeedback.msgId
                this.dataForm.userId = data.shopfeedback.userId
                this.dataForm.userName = data.shopfeedback.userName
                this.dataForm.mobile = data.shopfeedback.mobile
                this.dataForm.feedType = data.shopfeedback.feedType
                this.dataForm.content = data.shopfeedback.content
                this.dataForm.status = data.shopfeedback.status
                this.dataForm.addTime = data.shopfeedback.addTime
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
              url: this.$http.adornUrl(`/shopfeedback/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'msgId': this.dataForm.msgId,
                'userId': this.dataForm.userId,
                'userName': this.dataForm.userName,
                'mobile': this.dataForm.mobile,
                'feedType': this.dataForm.feedType,
                'content': this.dataForm.content,
                'status': this.dataForm.status,
                'addTime': this.dataForm.addTime
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
