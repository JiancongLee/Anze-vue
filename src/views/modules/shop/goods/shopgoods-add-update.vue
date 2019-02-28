<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="商品名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌id" prop="brandId">
            <el-input v-model="dataForm.brandId" placeholder="品牌id"></el-input>
        </el-form-item>
        <el-form-item label="商品类别ID" prop="categoryId">
            <el-input v-model="dataForm.categoryId" placeholder="商品类别ID"></el-input>
        </el-form-item>
        <el-form-item label="序列号" prop="goodsNumber">
            <el-input v-model="dataForm.goodsNumber" placeholder="序列号"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
            <el-input v-model="dataForm.keywords" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item label="专柜价格" prop="counterPrice">
            <el-input v-model="dataForm.counterPrice" placeholder="专柜价格"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="dataForm.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsBrief">
            <el-input v-model="dataForm.goodsBrief" placeholder="商品简介"></el-input>
        </el-form-item>
        <el-form-item label="商品详细介绍" prop="goodsDesc">
            <el-input v-model="dataForm.goodsDesc" placeholder="商品详细介绍"></el-input>
        </el-form-item>
        <el-form-item label="SortOrder" prop="sortOrder">
            <el-input v-model="dataForm.sortOrder" placeholder="SortOrder"></el-input>
        </el-form-item>
        <el-form-item label="商品单位" prop="goodsUnit">
            <el-input v-model="dataForm.goodsUnit" placeholder="商品单位"></el-input>
        </el-form-item>
        <el-form-item label="商品主图" prop="primaryPicUrl">
            <el-input v-model="dataForm.primaryPicUrl" placeholder="商品主图"></el-input>
        </el-form-item>
        <el-form-item label="商品列表图" prop="listPicUrl">
            <el-input v-model="dataForm.listPicUrl" placeholder="商品列表图"></el-input>
        </el-form-item>
        <el-form-item label="是否新品：0否 1是" prop="isNew">
            <el-input v-model="dataForm.isNew" placeholder="是否新品：0否 1是"></el-input>
        </el-form-item>
        <el-form-item label="是否在售:0否 1是" prop="isOnSale">
            <el-input v-model="dataForm.isOnSale" placeholder="是否在售:0否 1是"></el-input>
        </el-form-item>
        <el-form-item label="是否热销：0否 1是" prop="isHot">
            <el-input v-model="dataForm.isHot" placeholder="是否热销：0否 1是"></el-input>
        </el-form-item>
        <el-form-item label="软删除：0否 1是" prop="isDelete">
            <el-input v-model="dataForm.isDelete" placeholder="软删除：0否 1是"></el-input>
        </el-form-item>
        <el-form-item label="创建人ID" prop="createUserId">
            <el-input v-model="dataForm.createUserId" placeholder="创建人ID"></el-input>
        </el-form-item>
        <el-form-item label="CreateTime" prop="createTime">
            <el-date-picker
                    v-model="dataForm.createTime"
                    type="date"
                    placeholder="CreateTime">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="修改人ID" prop="updateUserId">
            <el-input v-model="dataForm.updateUserId" placeholder="修改人ID"></el-input>
        </el-form-item>
        <el-form-item label="修改时间" prop="updateTime">
            <el-date-picker
                    v-model="dataForm.updateTime"
                    type="date"
                    placeholder="修改时间">
            </el-date-picker>
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
          brandId: '',
          categoryId: '',
          goodsNumber: '',
          keywords: '',
          counterPrice: '',
          price: '',
          goodsBrief: '',
          goodsDesc: '',
          sortOrder: '',
          goodsUnit: '',
          primaryPicUrl: '',
          listPicUrl: '',
          isNew: '',
          isOnSale: '',
          isHot: '',
          isDelete: '',
          createUserId: '',
          createTime: '',
          updateUserId: '',
          updateTime: ''
        },
        dataRule: {
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          brandId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          categoryId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsNumber: [{ required: true, message: '不能为空', trigger: 'blur' }],
          keywords: [{ required: true, message: '不能为空', trigger: 'blur' }],
          counterPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          price: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsBrief: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsUnit: [{ required: true, message: '不能为空', trigger: 'blur' }],
          primaryPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          listPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isNew: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isOnSale: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isHot: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isDelete: [{ required: true, message: '不能为空', trigger: 'blur' }],
          createUserId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          createTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateUserId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateTime: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopgoods/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.shopgoods.name
                this.dataForm.brandId = data.shopgoods.brandId
                this.dataForm.categoryId = data.shopgoods.categoryId
                this.dataForm.goodsNumber = data.shopgoods.goodsNumber
                this.dataForm.keywords = data.shopgoods.keywords
                this.dataForm.counterPrice = data.shopgoods.counterPrice
                this.dataForm.price = data.shopgoods.price
                this.dataForm.goodsBrief = data.shopgoods.goodsBrief
                this.dataForm.goodsDesc = data.shopgoods.goodsDesc
                this.dataForm.sortOrder = data.shopgoods.sortOrder
                this.dataForm.goodsUnit = data.shopgoods.goodsUnit
                this.dataForm.primaryPicUrl = data.shopgoods.primaryPicUrl
                this.dataForm.listPicUrl = data.shopgoods.listPicUrl
                this.dataForm.isNew = data.shopgoods.isNew
                this.dataForm.isOnSale = data.shopgoods.isOnSale
                this.dataForm.isHot = data.shopgoods.isHot
                this.dataForm.isDelete = data.shopgoods.isDelete
                this.dataForm.createUserId = data.shopgoods.createUserId
                this.dataForm.createTime = data.shopgoods.createTime
                this.dataForm.updateUserId = data.shopgoods.updateUserId
                this.dataForm.updateTime = data.shopgoods.updateTime
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
              url: this.$http.adornUrl(`/shopgoods/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'brandId': this.dataForm.brandId,
                'categoryId': this.dataForm.categoryId,
                'goodsNumber': this.dataForm.goodsNumber,
                'keywords': this.dataForm.keywords,
                'counterPrice': this.dataForm.counterPrice,
                'price': this.dataForm.price,
                'goodsBrief': this.dataForm.goodsBrief,
                'goodsDesc': this.dataForm.goodsDesc,
                'sortOrder': this.dataForm.sortOrder,
                'goodsUnit': this.dataForm.goodsUnit,
                'primaryPicUrl': this.dataForm.primaryPicUrl,
                'listPicUrl': this.dataForm.listPicUrl,
                'isNew': this.dataForm.isNew,
                'isOnSale': this.dataForm.isOnSale,
                'isHot': this.dataForm.isHot,
                'isDelete': this.dataForm.isDelete,
                'createUserId': this.dataForm.createUserId,
                'createTime': this.dataForm.createTime,
                'updateUserId': this.dataForm.updateUserId,
                'updateTime': this.dataForm.updateTime
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
