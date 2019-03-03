<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>

    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="序列号" prop="goodsNumber">
          <el-input v-model="dataForm.goodsNumber" placeholder="序列号"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="11">
            <el-form-item label="品牌" prop="brandId">
              <el-select v-model="dataForm.categoryId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="商品类别" prop="categoryId">
              <el-select v-model="dataForm.categoryId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="价格" prop="price">
              <el-input v-model="dataForm.price" placeholder="价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="专柜价格" prop="counterPrice">
              <el-input v-model="dataForm.counterPrice" placeholder="专柜价格"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="关键字">
          <el-tag v-for="tag in keywords" :key="tag" closable type="primary" @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            v-if="newKeywordVisible"
            ref="newKeywordInput"
            v-model="newKeyword"
            class="input-new-keyword"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"/>
          <el-button v-else class="button-new-keyword" size="small" type="primary" @click="showInput">+ 增加</el-button>
        </el-form-item>

        <el-form-item label="是否在售" prop="isOnSale">
          <el-radio-group v-model="dataForm.isOnSale">
            <el-radio :label=0>否</el-radio>
            <el-radio :label=1>是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热销" prop="isHot">
          <el-radio-group v-model="dataForm.isHot">
            <el-radio :label=0>否</el-radio>
            <el-radio :label=1>是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否新品" prop="isNew">
          <el-radio-group v-model="dataForm.isNew">
            <el-radio :label=0>否</el-radio>
            <el-radio :label=1>是</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品简介" prop="goodsBrief">
          <el-input v-model="dataForm.goodsBrief" placeholder="商品简介"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="goodsDesc">
          <!--<el-input v-model="dataForm.goodsDesc" placeholder="商品详情"></el-input>-->


          <editor :init="editorInit" v-model="dataForm.goodsDesc"/>

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

        <el-card class="box-card">
          <h3>商品参数</h3>
          <div v-if="dataForm.kind==0">
            <el-form-item label="尺码" prop="size">
              <el-input v-model="dataForm.size" placeholder="尺码"></el-input>
            </el-form-item>
            <el-form-item label="颜色分类" prop="color">
              <el-input v-model="dataForm.color" placeholder="颜色分类"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-input v-model="dataForm.type" placeholder="类型"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="amount">
              <el-input v-model="dataForm.amount" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="款式" prop="style">
              <el-input v-model="dataForm.style" placeholder="款式"></el-input>
            </el-form-item>
          </div>
          <div v-if="dataForm.kind==1">
            <el-form-item label="净含量" prop="netWeight">
              <el-input v-model="dataForm.netWeight" placeholder="净含量"></el-input>
            </el-form-item>
            <el-form-item label="包装方式" prop="packagingMethod">
              <el-input v-model="dataForm.packagingMethod" placeholder="包装方式"></el-input>
            </el-form-item>
            <el-form-item label="保质期" prop="qualityGuaranteePeriod">
              <el-input v-model="dataForm.qualityGuaranteePeriod" placeholder="保质期"></el-input>
            </el-form-item>
            <el-form-item label="系列" prop="series">
              <el-input v-model="dataForm.series" placeholder="系列"></el-input>
            </el-form-item>
            <el-form-item label="存储方法" prop="storageMethod">
              <el-input v-model="dataForm.storageMethod" placeholder="存储方法"></el-input>
            </el-form-item>
          </div>
          <div v-if="dataForm.kind==2">
            <el-form-item label="型号" prop="model">
              <el-input v-model="dataForm.model" placeholder="型号"></el-input>
            </el-form-item>
            <el-form-item label="保修期" prop="defectsLiabilityPeriod">
              <el-input v-model="dataForm.defectsLiabilityPeriod" placeholder="保修期"></el-input>
            </el-form-item>
          </div>
        </el-card>

      </el-form>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // import Editor from '@tinymce/tinymce-vue'
  import Editor from '@tinymce/tinymce-vue'
  // import 'tinymce/themes/modern/theme'
  export default {
    components: { Editor },
    data () {
      return {
        visible: false,
        newKeywordVisible: false,
        dataForm: {
          id: '',
          kind: '',
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
        newKeyword: '',
        keywords: [],
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
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        editorInit: {
          anguage_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          convert_urls: false,
          plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
          toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
          images_upload_handler: function (blobInfo, success, failure) {
            // const formData = new FormData()
            // formData.append('file', blobInfo.blob())
            // createStorage(formData).then(res => {
            //   success(res.data.data.url)
            // }).catch(() => {
            //   failure('上传失败，请重新上传')
            // })
            console.log(blobInfo)
          }
        }
      }
    },
    methods: {
      init (id, kind) {
        this.dataForm.id = id || ''
        this.dataForm.kind = kind || ''
        this.visible = true
        this.newKeyword = ''
        this.keywords = []
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
          let data = {
            'id': this.dataForm.id || undefined,
            'name': this.dataForm.name,
            'kind': this.dataForm.kind,
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
          }
          if (this.dataForm.kind === 0) {
            console.log('0')
          } else if (this.dataForm.kind === 1) {
            console.log('1')
          } else if (this.dataForm.kind === 1) {
            console.log('2')
          }
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/shopgoods/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData(data)
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
      },
      handleInputConfirm () {
        const newKeyword = this.newKeyword
        if (newKeyword) {
          this.keywords.push(newKeyword)
          this.dataForm.keywords = this.keywords.toString()
        }
        this.newKeywordVisible = false
        this.newKeyword = ''
      },
      handleClose (tag) {
        this.keywords.splice(this.keywords.indexOf(tag), 1)
        this.dataForm.keywords = this.keywords.toString()
      },
      showInput () {
        this.newKeywordVisible = true
        this.$nextTick(_ => {
          this.$refs.newKeywordInput.$refs.input.focus()
        })
      }
    }
  }
</script>

<style>
  .el-card {
    margin-bottom: 10px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
