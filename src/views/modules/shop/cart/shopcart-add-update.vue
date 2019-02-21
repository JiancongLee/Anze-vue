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
        <el-form-item label="sessionId" prop="sessionId">
            <el-input v-model="dataForm.sessionId" placeholder="sessionId"></el-input>
        </el-form-item>
        <el-form-item label="商品Id" prop="goodsId">
            <el-input v-model="dataForm.goodsId" placeholder="商品Id"></el-input>
        </el-form-item>
        <el-form-item label="商品序列号" prop="goodsSn">
            <el-input v-model="dataForm.goodsSn" placeholder="商品序列号"></el-input>
        </el-form-item>
        <el-form-item label="产品Id" prop="productId">
            <el-input v-model="dataForm.productId" placeholder="产品Id"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="goodsName">
            <el-input v-model="dataForm.goodsName" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
            <el-input v-model="dataForm.marketPrice" placeholder="市场价"></el-input>
        </el-form-item>
        <el-form-item label="零售价格" prop="retailPrice">
            <el-input v-model="dataForm.retailPrice" placeholder="零售价格"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
            <el-input v-model="dataForm.number" placeholder="数量"></el-input>
        </el-form-item>
        <el-form-item label="规格属性组成的字符串，用来显示用" prop="goodsSpecifitionNameValue">
            <el-input v-model="dataForm.goodsSpecifitionNameValue" placeholder="规格属性组成的字符串，用来显示用"></el-input>
        </el-form-item>
        <el-form-item label="product表对应的goods_specifition_ids" prop="goodsSpecifitionIds">
            <el-input v-model="dataForm.goodsSpecifitionIds" placeholder="product表对应的goods_specifition_ids"></el-input>
        </el-form-item>
        <el-form-item label="Checked" prop="checked">
            <el-input v-model="dataForm.checked" placeholder="Checked"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="listPicUrl">
            <el-input v-model="dataForm.listPicUrl" placeholder="商品图片"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" prop="addTime">
            <el-date-picker
                    v-model="dataForm.addTime"
                    type="date"
                    placeholder="添加时间">
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
          id: '',
          userId: '',
          sessionId: '',
          goodsId: '',
          goodsSn: '',
          productId: '',
          goodsName: '',
          marketPrice: '',
          retailPrice: '',
          number: '',
          goodsSpecifitionNameValue: '',
          goodsSpecifitionIds: '',
          checked: '',
          listPicUrl: '',
          addTime: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sessionId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsSn: [{ required: true, message: '不能为空', trigger: 'blur' }],
          productId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          marketPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          retailPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          number: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsSpecifitionNameValue: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsSpecifitionIds: [{ required: true, message: '不能为空', trigger: 'blur' }],
          checked: [{ required: true, message: '不能为空', trigger: 'blur' }],
          listPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          addTime: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopcart.id
                this.dataForm.userId = data.shopcart.userId
                this.dataForm.sessionId = data.shopcart.sessionId
                this.dataForm.goodsId = data.shopcart.goodsId
                this.dataForm.goodsSn = data.shopcart.goodsSn
                this.dataForm.productId = data.shopcart.productId
                this.dataForm.goodsName = data.shopcart.goodsName
                this.dataForm.marketPrice = data.shopcart.marketPrice
                this.dataForm.retailPrice = data.shopcart.retailPrice
                this.dataForm.number = data.shopcart.number
                this.dataForm.goodsSpecifitionNameValue = data.shopcart.goodsSpecifitionNameValue
                this.dataForm.goodsSpecifitionIds = data.shopcart.goodsSpecifitionIds
                this.dataForm.checked = data.shopcart.checked
                this.dataForm.listPicUrl = data.shopcart.listPicUrl
                this.dataForm.addTime = data.shopcart.addTime
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
                'userId': this.dataForm.userId,
                'sessionId': this.dataForm.sessionId,
                'goodsId': this.dataForm.goodsId,
                'goodsSn': this.dataForm.goodsSn,
                'productId': this.dataForm.productId,
                'goodsName': this.dataForm.goodsName,
                'marketPrice': this.dataForm.marketPrice,
                'retailPrice': this.dataForm.retailPrice,
                'number': this.dataForm.number,
                'goodsSpecifitionNameValue': this.dataForm.goodsSpecifitionNameValue,
                'goodsSpecifitionIds': this.dataForm.goodsSpecifitionIds,
                'checked': this.dataForm.checked,
                'listPicUrl': this.dataForm.listPicUrl,
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
