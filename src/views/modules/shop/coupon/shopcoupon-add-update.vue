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
        <el-form-item label="名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="类型金额" prop="typeMoney">
            <el-input v-model="dataForm.typeMoney" placeholder="类型金额"></el-input>
        </el-form-item>
        <el-form-item label="下发类型" prop="sendType">
            <el-input v-model="dataForm.sendType" placeholder="下发类型"></el-input>
        </el-form-item>
        <el-form-item label="最小数量" prop="minAmount">
            <el-input v-model="dataForm.minAmount" placeholder="最小数量"></el-input>
        </el-form-item>
        <el-form-item label="最大数量" prop="maxAmount">
            <el-input v-model="dataForm.maxAmount" placeholder="最大数量"></el-input>
        </el-form-item>
        <el-form-item label="下发开始时间" prop="sendStartDate">
            <el-date-picker
                    v-model="dataForm.sendStartDate"
                    type="date"
                    placeholder="下发开始时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="下发结束时间" prop="sendEndDate">
            <el-date-picker
                    v-model="dataForm.sendEndDate"
                    type="date"
                    placeholder="下发结束时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="使用开始时间" prop="useStartDate">
            <el-date-picker
                    v-model="dataForm.useStartDate"
                    type="date"
                    placeholder="使用开始时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="使用结束时间" prop="useEndDate">
            <el-date-picker
                    v-model="dataForm.useEndDate"
                    type="date"
                    placeholder="使用结束时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="货物数量" prop="minGoodsAmount">
            <el-input v-model="dataForm.minGoodsAmount" placeholder="货物数量"></el-input>
        </el-form-item>
        <el-form-item label="转发次数" prop="minTransmitNum">
            <el-input v-model="dataForm.minTransmitNum" placeholder="转发次数"></el-input>
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
          typeMoney: '',
          sendType: '',
          minAmount: '',
          maxAmount: '',
          sendStartDate: '',
          sendEndDate: '',
          useStartDate: '',
          useEndDate: '',
          minGoodsAmount: '',
          minTransmitNum: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          typeMoney: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sendType: [{ required: true, message: '不能为空', trigger: 'blur' }],
          minAmount: [{ required: true, message: '不能为空', trigger: 'blur' }],
          maxAmount: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sendStartDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sendEndDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
          useStartDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
          useEndDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
          minGoodsAmount: [{ required: true, message: '不能为空', trigger: 'blur' }],
          minTransmitNum: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopcoupon/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopcoupon.id
                this.dataForm.name = data.shopcoupon.name
                this.dataForm.typeMoney = data.shopcoupon.typeMoney
                this.dataForm.sendType = data.shopcoupon.sendType
                this.dataForm.minAmount = data.shopcoupon.minAmount
                this.dataForm.maxAmount = data.shopcoupon.maxAmount
                this.dataForm.sendStartDate = data.shopcoupon.sendStartDate
                this.dataForm.sendEndDate = data.shopcoupon.sendEndDate
                this.dataForm.useStartDate = data.shopcoupon.useStartDate
                this.dataForm.useEndDate = data.shopcoupon.useEndDate
                this.dataForm.minGoodsAmount = data.shopcoupon.minGoodsAmount
                this.dataForm.minTransmitNum = data.shopcoupon.minTransmitNum
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
              url: this.$http.adornUrl(`/shopcoupon/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'name': this.dataForm.name,
                'typeMoney': this.dataForm.typeMoney,
                'sendType': this.dataForm.sendType,
                'minAmount': this.dataForm.minAmount,
                'maxAmount': this.dataForm.maxAmount,
                'sendStartDate': this.dataForm.sendStartDate,
                'sendEndDate': this.dataForm.sendEndDate,
                'useStartDate': this.dataForm.useStartDate,
                'useEndDate': this.dataForm.useEndDate,
                'minGoodsAmount': this.dataForm.minGoodsAmount,
                'minTransmitNum': this.dataForm.minTransmitNum
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
