<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="级别" prop="level">
            <el-radio-group v-model="dataForm.level">
              <el-radio :label=0 disabled>L1</el-radio>
              <el-radio :label=1>L2</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1" v-if="dataForm.level ===1">
          <el-form-item label="父节点" prop="parentId">
            <el-select v-model="dataForm.parentId" placeholder="请选择">
              <el-option
                v-for="item in secondCategoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-tag v-for="tag in keywordsList" :key="tag" closable type="primary" @close="handleClose(tag)">
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
      <el-row>
        <el-col :span="11">
          <el-form-item label="排序" prop="sortOrder">
            <el-input-number v-model="dataForm.sortOrder" controls-position="right" :min="0" label="排序号"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="是否显示" prop="isShow">
            <el-radio-group v-model="dataForm.isShow">
              <el-radio :label=1>是</el-radio>
              <el-radio :label=0>否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="描述" prop="desc">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="dataForm.desc">
        </el-input>
      </el-form-item>
      <el-form-item label="banner图片" prop="bannerUrl">
          <el-input v-model="dataForm.bannerUrl" placeholder="banner图片"></el-input>
      </el-form-item>
      <el-form-item label="icon图片" prop="iconUrl">
          <el-input v-model="dataForm.iconUrl" placeholder="icon图片"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imgUrl">
          <el-input v-model="dataForm.imgUrl" placeholder="图片"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { stringToList } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        newKeywordVisible: false,
        dataForm: {
          id: '',
          parentId: '',
          name: '',
          level: '',
          keywords: '',
          desc: '',
          sortOrder: '',
          isShow: '',
          bannerUrl: '',
          iconUrl: '',
          imgUrl: ''
        },
        radio2: 3,
        newKeyword: '',
        keywords: [],
        secondCategoryOptions: [],
        dataRule: {
          parentId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          level: [{ required: true, message: '不能为空', trigger: 'blur' }],
          keywords: [{ required: true, message: '不能为空', trigger: 'blur' }],
          desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isShow: [{ required: true, message: '不能为空', trigger: 'blur' }],
          bannerUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          iconUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          imgUrl: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    mounted () {
    },
    computed: {
      keywordsList: function () {
        return stringToList(this.dataForm.keywords)
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
              url: this.$http.adornUrl(`/shopcategory/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.parentId = data.shopcategory.parentId
                this.dataForm.name = data.shopcategory.name
                this.dataForm.level = data.shopcategory.level
                this.dataForm.keywords = data.shopcategory.keywords
                this.dataForm.desc = data.shopcategory.desc
                this.dataForm.sortOrder = data.shopcategory.sortOrder
                this.dataForm.isShow = data.shopcategory.isShow
                this.dataForm.bannerUrl = data.shopcategory.bannerUrl
                this.dataForm.iconUrl = data.shopcategory.iconUrl
                this.dataForm.imgUrl = data.shopcategory.imgUrl
              }
            })
          }
        })
        // 初始化数据
        this.getSecondCategoryList()
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/shopcategory/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parentId': this.dataForm.parentId,
                'name': this.dataForm.name,
                'level': this.dataForm.level,
                'keywords': this.dataForm.keywords,
                'desc': this.dataForm.desc,
                'sortOrder': this.dataForm.sortOrder,
                'isShow': this.dataForm.isShow,
                'bannerUrl': this.dataForm.bannerUrl,
                'iconUrl': this.dataForm.iconUrl,
                'imgUrl': this.dataForm.imgUrl
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
      },
      // 增加标签
      handleInputConfirm () {
        const newKeyword = this.newKeyword
        if (newKeyword) {
          if (this.dataForm.keywords === '') {
            this.keywords = []
          } else {
            let temp = stringToList(this.dataForm.keywords)
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
      // 获取二级商品类型
      getSecondCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/shopcategory/list'),
          method: 'get',
          params: {
            level: 0
          }
        }).then(({data}) => {
          this.secondCategoryOptions = data.list
        })
      }
    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
