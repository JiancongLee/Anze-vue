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
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="商品类别" prop="categoryId">
              <el-cascader
                :options="options"
                change-on-select
                style="width: 200px">
              </el-cascader>
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
          <el-tag v-for="tag in stringToList(dataForm.keywords)" :key="tag" closable type="primary" @close="handleClose(tag)">
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

        <el-form-item label="商品单位" prop="goodsUnit">
          <el-input v-model="dataForm.goodsUnit" placeholder="商品单位"></el-input>
        </el-form-item>





        <el-form-item label="商品主图" prop="primaryPicId">
          <img v-if="dataForm.primaryPicId" :src="reversedMessage(dataForm.primaryPicId)" class="avatar" width="148px" height="148px" @click="aaa">
          <el-upload
            :action="uploadUrl"
            :limit="1"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="reversedMessage(dataForm.primaryPicId)" alt="">
          </el-dialog>
        </el-form-item>




        <el-form-item label="列表图" prop="listPicIds">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleList">
            <img width="100%" :src="dataForm.listPicIds" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品简介" prop="goodsBrief">
          <el-input v-model="dataForm.goodsBrief" placeholder="商品简介"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="goodsDesc">
          <tinymce ref="richText" v-model="dataForm.goodsDesc"></tinymce>
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
  import tinymce from '@/components/Tinymce'
  window.tinymce.baseURL = '/static/tinymce' // 需要调用tinymce的组件中得加入这，不然会报错
  export default {
    components: { tinymce },
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
          primaryPicId: '',
          listPicUrl: '',
          isNew: '',
          isOnSale: '',
          isHot: '',
          // 0
          size: '',
          color: '',
          type: '',
          amount: '',
          style: '',
          // 1
          netWeight: '',
          packagingMethod: '',
          qualityGuaranteePeriod: '',
          series: '',
          storageMethod: '',
          // 2
          model: '',
          defectsLiabilityPeriod: ''
        },
        newKeyword: '',
        keywords: [],
        dataRule: {
          // name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // brandId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // categoryId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // goodsNumber: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // keywords: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // counterPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // price: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // goodsBrief: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // goodsDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // goodsUnit: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // primaryPicId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // listPicUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // isNew: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // isOnSale: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // isHot: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        value: '',
        dialogImageUrl: '',
        dialogVisible: false,
        dialogVisibleList: false,
        uploadUrl: this.$http.adornUrl(`/baseannex/multiupload?token=${this.$cookie.get('token')}`),
        brandList: [],
        options1: [{
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
        value1: ''
      }
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      aaa () {
        this.dialogVisible = true
      },
      reversedMessage (id) {
        return this.$http.adornUrl(`/baseannex/viewImage?id=` + id + `&token=${this.$cookie.get('token')}`)
      },
      init (id, kind) {
        this.dataForm.id = id || ''
        this.dataForm.kind = kind
        this.visible = true
        this.newKeyword = ''
        this.keywords = []
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/viewshopgoods/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.viewshopgoods.id
                this.dataForm.name = data.viewshopgoods.name
                this.dataForm.kind = data.viewshopgoods.kind
                this.dataForm.brandId = data.viewshopgoods.brandId
                this.dataForm.categoryId = data.viewshopgoods.categoryId
                this.dataForm.goodsNumber = data.viewshopgoods.goodsNumber
                this.dataForm.keywords = data.viewshopgoods.keywords
                this.dataForm.counterPrice = data.viewshopgoods.counterPrice
                this.dataForm.price = data.viewshopgoods.price
                this.dataForm.goodsBrief = data.viewshopgoods.goodsBrief
                this.dataForm.sortOrder = data.viewshopgoods.sortOrder
                this.dataForm.goodsUnit = data.viewshopgoods.goodsUnit
                this.dataForm.primaryPicId = data.viewshopgoods.primaryPicId
                this.dataForm.listPicIds = data.viewshopgoods.listPicIds
                this.dataForm.isNew = data.viewshopgoods.isNew
                this.dataForm.isOnSale = data.viewshopgoods.isOnSale
                this.dataForm.isHot = data.viewshopgoods.isHot
                // 0
                this.dataForm.size = data.viewshopgoods.size
                this.dataForm.color = data.viewshopgoods.color
                this.dataForm.type = data.viewshopgoods.type
                this.dataForm.amount = data.viewshopgoods.amount
                this.dataForm.style = data.viewshopgoods.style
                // 1
                this.dataForm.netWeight = data.viewshopgoods.netWeight
                this.dataForm.packagingMethod = data.viewshopgoods.packagingMethod
                this.dataForm.qualityGuaranteePeriod = data.viewshopgoods.qualityGuaranteePeriod
                this.dataForm.series = data.viewshopgoods.series
                this.dataForm.storageMethod = data.viewshopgoods.storageMethod
                // 2
                this.dataForm.model = data.viewshopgoods.model
                this.dataForm.defectsLiabilityPeriod = data.viewshopgoods.defectsLiabilityPeriod
              }
            })
          }
        })
        // 获取品牌列表
        this.getBrandList()
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
            'primaryPicId': this.dataForm.primaryPicId,
            'listPicUrl': this.dataForm.listPicUrl,
            'isNew': this.dataForm.isNew,
            'isOnSale': this.dataForm.isOnSale,
            'isHot': this.dataForm.isHot
          }
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/shopgoods/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData(data)
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data)
                let temp = {'id': !this.dataForm.id ? data.goods.id : this.dataForm.id}
                let postUrl = ''
                if (this.dataForm.kind === 0) {
                  this.$set(temp, 'size', this.dataForm.size)
                  this.$set(temp, 'color', this.dataForm.color)
                  this.$set(temp, 'type', this.dataForm.type)
                  this.$set(temp, 'amount', this.dataForm.amount)
                  this.$set(temp, 'style', this.dataForm.style)
                  postUrl = this.$http.adornUrl(`/shopgoodsgeneralmerchandise/${!this.dataForm.id ? 'add' : 'update'}`)
                } else if (this.dataForm.kind === 1) {
                  this.$set(temp, 'netWeight', this.dataForm.netWeight)
                  this.$set(temp, 'packagingMethod', this.dataForm.packagingMethod)
                  this.$set(temp, 'qualityGuaranteePeriod', this.dataForm.qualityGuaranteePeriod)
                  this.$set(temp, 'series', this.dataForm.series)
                  this.$set(temp, 'storageMethod', this.dataForm.storageMethod)
                  postUrl = this.$http.adornUrl(`/shopgoodsfood/${!this.dataForm.id ? 'add' : 'update'}`)
                } else if (this.dataForm.kind === 2) {
                  this.$set(temp, 'model', this.dataForm.model)
                  this.$set(temp, 'defectsLiabilityPeriod', this.dataForm.defectsLiabilityPeriod)
                  postUrl = this.$http.adornUrl(`/shopgoodsmechanicalequipment/${!this.dataForm.id ? 'add' : 'update'}`)
                }
                this.$http({
                  url: postUrl,
                  method: 'post',
                  data: this.$http.adornData(temp)
                }).then(({data}) => {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.visible = false
                      this.$emit('refreshDataList')
                    }
                  })
                })
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 增加标签
      handleInputConfirm () {
        const newKeyword = this.newKeyword
        if (newKeyword) {
          if (this.dataForm.keywords === '') {
            this.keywords = []
          } else {
            let temp = this.stringToList(this.dataForm.keywords)
            this.keywords = temp.concat()
          }
          this.keywords.push(newKeyword)
          this.dataForm.keywords = this.keywords.toString()
        }
        this.newKeywordVisible = false
        this.newKeyword = ''
      },
      // 删除标签
      handleClose (tag) {
        this.keywords.splice(this.keywords.indexOf(tag), 1)
        this.dataForm.keywords = this.keywords.toString()
      },
      // 弹出标签输入框
      showInput () {
        this.newKeywordVisible = true
        this.$nextTick(_ => {
          this.$refs.newKeywordInput.$refs.input.focus()
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogVisible = true
      },
      /**
       * 主图成功上传回调函数
       * @param res
       * @param file
       */
      handleAvatarSuccess (res, file) {
        this.dataForm.primaryPicId = res.batch[0].id
      },
      beforeAvatarUpload (file) {
        // 文件类型进行判断
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      getBrandList () {
        this.$http({
          url: this.$http.adornUrl('/shopbrand/list'),
          method: 'get'
        }).then(({data}) => {
          console.log(data)
          this.brandList = data.list
        })
      },
      stringToList (str) {
        if (str === '') {
          return []
        } else {
          return str.split(',')
        }
      }
    }
  }
</script>

<style>
  /*.el-card {*/
    /*margin-bottom: 10px;*/
  /*}*/
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
