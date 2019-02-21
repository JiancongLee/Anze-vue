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
        <el-form-item label="类型" prop="typeId">
            <el-input v-model="dataForm.typeId" placeholder="类型"></el-input>
        </el-form-item>
        <el-form-item label="ValueId" prop="valueId">
            <el-input v-model="dataForm.valueId" placeholder="ValueId"></el-input>
        </el-form-item>
        <el-form-item label="储存为base64编码" prop="content">
            <el-input v-model="dataForm.content" placeholder="储存为base64编码"></el-input>
        </el-form-item>
        <el-form-item label="记录时间" prop="addTime">
            <el-input v-model="dataForm.addTime" placeholder="记录时间"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-input v-model="dataForm.status" placeholder="状态"></el-input>
        </el-form-item>
        <el-form-item label="会员Id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="会员Id"></el-input>
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
          typeId: '',
          valueId: '',
          content: '',
          addTime: '',
          status: '',
          userId: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          typeId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          valueId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          content: [{ required: true, message: '不能为空', trigger: 'blur' }],
          addTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          status: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopcomment/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopcomment.id
                this.dataForm.typeId = data.shopcomment.typeId
                this.dataForm.valueId = data.shopcomment.valueId
                this.dataForm.content = data.shopcomment.content
                this.dataForm.addTime = data.shopcomment.addTime
                this.dataForm.status = data.shopcomment.status
                this.dataForm.userId = data.shopcomment.userId
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
              url: this.$http.adornUrl(`/shopcomment/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'typeId': this.dataForm.typeId,
                'valueId': this.dataForm.valueId,
                'content': this.dataForm.content,
                'addTime': this.dataForm.addTime,
                'status': this.dataForm.status,
                'userId': this.dataForm.userId
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
