<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="会员Id" prop="memberId">
            <el-input v-model="dataForm.memberId" placeholder="会员Id"></el-input>
        </el-form-item>
        <el-form-item label="商品Id" prop="goodsId">
            <el-input v-model="dataForm.goodsId" placeholder="商品Id"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
            <!--<el-input v-model="dataForm.number" placeholder="数量"></el-input>-->
          <el-input-number v-model="dataForm.number" :min="0" label="数量"></el-input-number>
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
          memberId: '',
          goodsId: '',
          number: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          memberId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          number: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/shopcart/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopcart.id
                this.dataForm.memberId = data.shopcart.memberId
                this.dataForm.goodsId = data.shopcart.goodsId
                this.dataForm.number = data.shopcart.number
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
              url: this.$http.adornUrl(`/shopcart/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'memberId': this.dataForm.memberId,
                'goodsId': this.dataForm.goodsId,
                'number': this.dataForm.number
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
