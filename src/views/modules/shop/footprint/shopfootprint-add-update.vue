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
        <el-form-item label="会员Id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="会员Id"></el-input>
        </el-form-item>
        <el-form-item label="商品id" prop="goodsId">
            <el-input v-model="dataForm.goodsId" placeholder="商品id"></el-input>
        </el-form-item>
        <el-form-item label="记录时间" prop="addTime">
            <el-date-picker
                    v-model="dataForm.addTime"
                    type="date"
                    placeholder="记录时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="转发人" prop="referrer">
            <el-input v-model="dataForm.referrer" placeholder="转发人"></el-input>
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
          userId: '',
          goodsId: '',
          addTime: '',
          referrer: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          addTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          referrer: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopfootprint/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopfootprint.id
                this.dataForm.userId = data.shopfootprint.userId
                this.dataForm.goodsId = data.shopfootprint.goodsId
                this.dataForm.addTime = data.shopfootprint.addTime
                this.dataForm.referrer = data.shopfootprint.referrer
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
              url: this.$http.adornUrl(`/shopfootprint/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'userId': this.dataForm.userId,
                'goodsId': this.dataForm.goodsId,
                'addTime': this.dataForm.addTime,
                'referrer': this.dataForm.referrer
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
