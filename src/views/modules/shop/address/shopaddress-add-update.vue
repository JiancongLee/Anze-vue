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
        <el-form-item label="会员ID" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="会员ID"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" prop="userName">
            <el-input v-model="dataForm.userName" placeholder="收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telNumber">
            <el-input v-model="dataForm.telNumber" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postalCode">
            <el-input v-model="dataForm.postalCode" placeholder="邮编"></el-input>
        </el-form-item>
        <el-form-item label="收货地址国家码" prop="nationalCode">
            <el-input v-model="dataForm.nationalCode" placeholder="收货地址国家码"></el-input>
        </el-form-item>
        <el-form-item label="省" prop="provinceName">
            <el-input v-model="dataForm.provinceName" placeholder="省"></el-input>
        </el-form-item>
        <el-form-item label="市" prop="cityName">
            <el-input v-model="dataForm.cityName" placeholder="市"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="countyName">
            <el-input v-model="dataForm.countyName" placeholder="区"></el-input>
        </el-form-item>
        <el-form-item label="详细收货地址信息" prop="detailInfo">
            <el-input v-model="dataForm.detailInfo" placeholder="详细收货地址信息"></el-input>
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
          userName: '',
          telNumber: '',
          postalCode: '',
          nationalCode: '',
          provinceName: '',
          cityName: '',
          countyName: '',
          detailInfo: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          telNumber: [{ required: true, message: '不能为空', trigger: 'blur' }],
          postalCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
          nationalCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
          provinceName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          cityName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          countyName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          detailInfo: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopaddress/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopaddress.id
                this.dataForm.userId = data.shopaddress.userId
                this.dataForm.userName = data.shopaddress.userName
                this.dataForm.telNumber = data.shopaddress.telNumber
                this.dataForm.postalCode = data.shopaddress.postalCode
                this.dataForm.nationalCode = data.shopaddress.nationalCode
                this.dataForm.provinceName = data.shopaddress.provinceName
                this.dataForm.cityName = data.shopaddress.cityName
                this.dataForm.countyName = data.shopaddress.countyName
                this.dataForm.detailInfo = data.shopaddress.detailInfo
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
              url: this.$http.adornUrl(`/shopaddress/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'userId': this.dataForm.userId,
                'userName': this.dataForm.userName,
                'telNumber': this.dataForm.telNumber,
                'postalCode': this.dataForm.postalCode,
                'nationalCode': this.dataForm.nationalCode,
                'provinceName': this.dataForm.provinceName,
                'cityName': this.dataForm.cityName,
                'countyName': this.dataForm.countyName,
                'detailInfo': this.dataForm.detailInfo
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
