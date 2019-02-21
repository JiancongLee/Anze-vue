<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="Id" prop="id">
            <el-input v-model="dataForm.id" placeholder="Id"></el-input>
        </el-form-item>
        <el-form-item label="CategoryId" prop="categoryId">
            <el-input v-model="dataForm.categoryId" placeholder="CategoryId"></el-input>
        </el-form-item>
        <el-form-item label="GoodsSn" prop="goodsSn">
            <el-input v-model="dataForm.goodsSn" placeholder="GoodsSn"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
            <el-input v-model="dataForm.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="BrandId" prop="brandId">
            <el-input v-model="dataForm.brandId" placeholder="BrandId"></el-input>
        </el-form-item>
        <el-form-item label="GoodsNumber" prop="goodsNumber">
            <el-input v-model="dataForm.goodsNumber" placeholder="GoodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="Keywords" prop="keywords">
            <el-input v-model="dataForm.keywords" placeholder="Keywords"></el-input>
        </el-form-item>
        <el-form-item label="GoodsBrief" prop="goodsBrief">
            <el-input v-model="dataForm.goodsBrief" placeholder="GoodsBrief"></el-input>
        </el-form-item>
        <el-form-item label="GoodsDesc" prop="goodsDesc">
            <el-input v-model="dataForm.goodsDesc" placeholder="GoodsDesc"></el-input>
        </el-form-item>
        <el-form-item label="IsOnSale" prop="isOnSale">
            <el-input v-model="dataForm.isOnSale" placeholder="IsOnSale"></el-input>
        </el-form-item>
        <el-form-item label="AddTime" prop="addTime">
            <el-date-picker
                    v-model="dataForm.addTime"
                    type="date"
                    placeholder="AddTime">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="SortOrder" prop="sortOrder">
            <el-input v-model="dataForm.sortOrder" placeholder="SortOrder"></el-input>
        </el-form-item>
        <el-form-item label="IsDelete" prop="isDelete">
            <el-input v-model="dataForm.isDelete" placeholder="IsDelete"></el-input>
        </el-form-item>
        <el-form-item label="AttributeCategory" prop="attributeCategory">
            <el-input v-model="dataForm.attributeCategory" placeholder="AttributeCategory"></el-input>
        </el-form-item>
        <el-form-item label="专柜价格" prop="counterPrice">
            <el-input v-model="dataForm.counterPrice" placeholder="专柜价格"></el-input>
        </el-form-item>
        <el-form-item label="附加价格" prop="extraPrice">
            <el-input v-model="dataForm.extraPrice" placeholder="附加价格"></el-input>
        </el-form-item>
        <el-form-item label="IsNew" prop="isNew">
            <el-input v-model="dataForm.isNew" placeholder="IsNew"></el-input>
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
        <el-form-item label="零售价格" prop="retailPrice">
            <el-input v-model="dataForm.retailPrice" placeholder="零售价格"></el-input>
        </el-form-item>
        <el-form-item label="销售量" prop="sellVolume">
            <el-input v-model="dataForm.sellVolume" placeholder="销售量"></el-input>
        </el-form-item>
        <el-form-item label="主sku　product_id" prop="primaryProductId">
            <el-input v-model="dataForm.primaryProductId" placeholder="主sku　product_id"></el-input>
        </el-form-item>
        <el-form-item label="单位价格，单价" prop="unitPrice">
            <el-input v-model="dataForm.unitPrice" placeholder="单位价格，单价"></el-input>
        </el-form-item>
        <el-form-item label="PromotionDesc" prop="promotionDesc">
            <el-input v-model="dataForm.promotionDesc" placeholder="PromotionDesc"></el-input>
        </el-form-item>
        <el-form-item label="PromotionTag" prop="promotionTag">
            <el-input v-model="dataForm.promotionTag" placeholder="PromotionTag"></el-input>
        </el-form-item>
        <el-form-item label="APP专享价" prop="appExclusivePrice">
            <el-input v-model="dataForm.appExclusivePrice" placeholder="APP专享价"></el-input>
        </el-form-item>
        <el-form-item label="是否是APP专属" prop="isAppExclusive">
            <el-input v-model="dataForm.isAppExclusive" placeholder="是否是APP专属"></el-input>
        </el-form-item>
        <el-form-item label="IsLimited" prop="isLimited">
            <el-input v-model="dataForm.isLimited" placeholder="IsLimited"></el-input>
        </el-form-item>
        <el-form-item label="IsHot" prop="isHot">
            <el-input v-model="dataForm.isHot" placeholder="IsHot"></el-input>
        </el-form-item>
        <el-form-item label="MarketPrice" prop="marketPrice">
            <el-input v-model="dataForm.marketPrice" placeholder="MarketPrice"></el-input>
        </el-form-item>
        <el-form-item label="创建人ID" prop="createUserId">
            <el-input v-model="dataForm.createUserId" placeholder="创建人ID"></el-input>
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
        <el-form-item label="CreateUserDeptId" prop="createUserDeptId">
            <el-input v-model="dataForm.createUserDeptId" placeholder="CreateUserDeptId"></el-input>
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
          categoryId: '',
          goodsSn: '',
          name: '',
          brandId: '',
          goodsNumber: '',
          keywords: '',
          goodsBrief: '',
          goodsDesc: '',
          isOnSale: '',
          addTime: '',
          sortOrder: '',
          isDelete: '',
          attributeCategory: '',
          counterPrice: '',
          extraPrice: '',
          isNew: '',
          goodsUnit: '',
          primaryPicUrl: '',
          listPicUrl: '',
          retailPrice: '',
          sellVolume: '',
          primaryProductId: '',
          unitPrice: '',
          promotionDesc: '',
          promotionTag: '',
          appExclusivePrice: '',
          isAppExclusive: '',
          isLimited: '',
          isHot: '',
          marketPrice: '',
          createUserId: '',
          updateUserId: '',
          updateTime: '',
          createUserDeptId: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          categoryId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsSn: [{ required: true, message: '不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          brandId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsNumber: [{ required: true, message: '不能为空', trigger: 'blur' }],
          keywords: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsBrief: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isOnSale: [{ required: true, message: '不能为空', trigger: 'blur' }],
          addTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isDelete: [{ required: true, message: '不能为空', trigger: 'blur' }],
          attributeCategory: [{ required: true, message: '不能为空', trigger: 'blur' }],
          counterPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          extraPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isNew: [{ required: true, message: '不能为空', trigger: 'blur' }],
          goodsUnit: [{ required: true, message: '不能为空', trigger: 'blur' }],
          primaryPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          listPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          retailPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sellVolume: [{ required: true, message: '不能为空', trigger: 'blur' }],
          primaryProductId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          unitPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          promotionDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          promotionTag: [{ required: true, message: '不能为空', trigger: 'blur' }],
          appExclusivePrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isAppExclusive: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isLimited: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isHot: [{ required: true, message: '不能为空', trigger: 'blur' }],
          marketPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          createUserId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateUserId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          createUserDeptId: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopgoods.id
                this.dataForm.categoryId = data.shopgoods.categoryId
                this.dataForm.goodsSn = data.shopgoods.goodsSn
                this.dataForm.name = data.shopgoods.name
                this.dataForm.brandId = data.shopgoods.brandId
                this.dataForm.goodsNumber = data.shopgoods.goodsNumber
                this.dataForm.keywords = data.shopgoods.keywords
                this.dataForm.goodsBrief = data.shopgoods.goodsBrief
                this.dataForm.goodsDesc = data.shopgoods.goodsDesc
                this.dataForm.isOnSale = data.shopgoods.isOnSale
                this.dataForm.addTime = data.shopgoods.addTime
                this.dataForm.sortOrder = data.shopgoods.sortOrder
                this.dataForm.isDelete = data.shopgoods.isDelete
                this.dataForm.attributeCategory = data.shopgoods.attributeCategory
                this.dataForm.counterPrice = data.shopgoods.counterPrice
                this.dataForm.extraPrice = data.shopgoods.extraPrice
                this.dataForm.isNew = data.shopgoods.isNew
                this.dataForm.goodsUnit = data.shopgoods.goodsUnit
                this.dataForm.primaryPicUrl = data.shopgoods.primaryPicUrl
                this.dataForm.listPicUrl = data.shopgoods.listPicUrl
                this.dataForm.retailPrice = data.shopgoods.retailPrice
                this.dataForm.sellVolume = data.shopgoods.sellVolume
                this.dataForm.primaryProductId = data.shopgoods.primaryProductId
                this.dataForm.unitPrice = data.shopgoods.unitPrice
                this.dataForm.promotionDesc = data.shopgoods.promotionDesc
                this.dataForm.promotionTag = data.shopgoods.promotionTag
                this.dataForm.appExclusivePrice = data.shopgoods.appExclusivePrice
                this.dataForm.isAppExclusive = data.shopgoods.isAppExclusive
                this.dataForm.isLimited = data.shopgoods.isLimited
                this.dataForm.isHot = data.shopgoods.isHot
                this.dataForm.marketPrice = data.shopgoods.marketPrice
                this.dataForm.createUserId = data.shopgoods.createUserId
                this.dataForm.updateUserId = data.shopgoods.updateUserId
                this.dataForm.updateTime = data.shopgoods.updateTime
                this.dataForm.createUserDeptId = data.shopgoods.createUserDeptId
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
                'id': this.dataForm.id,
                'categoryId': this.dataForm.categoryId,
                'goodsSn': this.dataForm.goodsSn,
                'name': this.dataForm.name,
                'brandId': this.dataForm.brandId,
                'goodsNumber': this.dataForm.goodsNumber,
                'keywords': this.dataForm.keywords,
                'goodsBrief': this.dataForm.goodsBrief,
                'goodsDesc': this.dataForm.goodsDesc,
                'isOnSale': this.dataForm.isOnSale,
                'addTime': this.dataForm.addTime,
                'sortOrder': this.dataForm.sortOrder,
                'isDelete': this.dataForm.isDelete,
                'attributeCategory': this.dataForm.attributeCategory,
                'counterPrice': this.dataForm.counterPrice,
                'extraPrice': this.dataForm.extraPrice,
                'isNew': this.dataForm.isNew,
                'goodsUnit': this.dataForm.goodsUnit,
                'primaryPicUrl': this.dataForm.primaryPicUrl,
                'listPicUrl': this.dataForm.listPicUrl,
                'retailPrice': this.dataForm.retailPrice,
                'sellVolume': this.dataForm.sellVolume,
                'primaryProductId': this.dataForm.primaryProductId,
                'unitPrice': this.dataForm.unitPrice,
                'promotionDesc': this.dataForm.promotionDesc,
                'promotionTag': this.dataForm.promotionTag,
                'appExclusivePrice': this.dataForm.appExclusivePrice,
                'isAppExclusive': this.dataForm.isAppExclusive,
                'isLimited': this.dataForm.isLimited,
                'isHot': this.dataForm.isHot,
                'marketPrice': this.dataForm.marketPrice,
                'createUserId': this.dataForm.createUserId,
                'updateUserId': this.dataForm.updateUserId,
                'updateTime': this.dataForm.updateTime,
                'createUserDeptId': this.dataForm.createUserDeptId
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
