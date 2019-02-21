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
        <el-form-item label="名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="Keywords" prop="keywords">
            <el-input v-model="dataForm.keywords" placeholder="Keywords"></el-input>
        </el-form-item>
        <el-form-item label="FrontDesc" prop="frontDesc">
            <el-input v-model="dataForm.frontDesc" placeholder="FrontDesc"></el-input>
        </el-form-item>
        <el-form-item label="ParentId" prop="parentId">
            <el-input v-model="dataForm.parentId" placeholder="ParentId"></el-input>
        </el-form-item>
        <el-form-item label="SortOrder" prop="sortOrder">
            <el-input v-model="dataForm.sortOrder" placeholder="SortOrder"></el-input>
        </el-form-item>
        <el-form-item label="ShowIndex" prop="showIndex">
            <el-input v-model="dataForm.showIndex" placeholder="ShowIndex"></el-input>
        </el-form-item>
        <el-form-item label="IsShow" prop="isShow">
            <el-input v-model="dataForm.isShow" placeholder="IsShow"></el-input>
        </el-form-item>
        <el-form-item label="BannerUrl" prop="bannerUrl">
            <el-input v-model="dataForm.bannerUrl" placeholder="BannerUrl"></el-input>
        </el-form-item>
        <el-form-item label="IconUrl" prop="iconUrl">
            <el-input v-model="dataForm.iconUrl" placeholder="IconUrl"></el-input>
        </el-form-item>
        <el-form-item label="ImgUrl" prop="imgUrl">
            <el-input v-model="dataForm.imgUrl" placeholder="ImgUrl"></el-input>
        </el-form-item>
        <el-form-item label="WapBannerUrl" prop="wapBannerUrl">
            <el-input v-model="dataForm.wapBannerUrl" placeholder="WapBannerUrl"></el-input>
        </el-form-item>
        <el-form-item label="Level" prop="level">
            <el-input v-model="dataForm.level" placeholder="Level"></el-input>
        </el-form-item>
        <el-form-item label="Type" prop="type">
            <el-input v-model="dataForm.type" placeholder="Type"></el-input>
        </el-form-item>
        <el-form-item label="FrontName" prop="frontName">
            <el-input v-model="dataForm.frontName" placeholder="FrontName"></el-input>
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
          name: '',
          keywords: '',
          frontDesc: '',
          parentId: '',
          sortOrder: '',
          showIndex: '',
          isShow: '',
          bannerUrl: '',
          iconUrl: '',
          imgUrl: '',
          wapBannerUrl: '',
          level: '',
          type: '',
          frontName: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          keywords: [{ required: true, message: '不能为空', trigger: 'blur' }],
          frontDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          parentId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          showIndex: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isShow: [{ required: true, message: '不能为空', trigger: 'blur' }],
          bannerUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          iconUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          imgUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          wapBannerUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          level: [{ required: true, message: '不能为空', trigger: 'blur' }],
          type: [{ required: true, message: '不能为空', trigger: 'blur' }],
          frontName: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopcategory/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopcategory.id
                this.dataForm.name = data.shopcategory.name
                this.dataForm.keywords = data.shopcategory.keywords
                this.dataForm.frontDesc = data.shopcategory.frontDesc
                this.dataForm.parentId = data.shopcategory.parentId
                this.dataForm.sortOrder = data.shopcategory.sortOrder
                this.dataForm.showIndex = data.shopcategory.showIndex
                this.dataForm.isShow = data.shopcategory.isShow
                this.dataForm.bannerUrl = data.shopcategory.bannerUrl
                this.dataForm.iconUrl = data.shopcategory.iconUrl
                this.dataForm.imgUrl = data.shopcategory.imgUrl
                this.dataForm.wapBannerUrl = data.shopcategory.wapBannerUrl
                this.dataForm.level = data.shopcategory.level
                this.dataForm.type = data.shopcategory.type
                this.dataForm.frontName = data.shopcategory.frontName
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
              url: this.$http.adornUrl(`/shopcategory/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'name': this.dataForm.name,
                'keywords': this.dataForm.keywords,
                'frontDesc': this.dataForm.frontDesc,
                'parentId': this.dataForm.parentId,
                'sortOrder': this.dataForm.sortOrder,
                'showIndex': this.dataForm.showIndex,
                'isShow': this.dataForm.isShow,
                'bannerUrl': this.dataForm.bannerUrl,
                'iconUrl': this.dataForm.iconUrl,
                'imgUrl': this.dataForm.imgUrl,
                'wapBannerUrl': this.dataForm.wapBannerUrl,
                'level': this.dataForm.level,
                'type': this.dataForm.type,
                'frontName': this.dataForm.frontName
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
