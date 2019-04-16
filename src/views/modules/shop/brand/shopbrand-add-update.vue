<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="品牌名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="simpleDesc">
            <el-input v-model="dataForm.simpleDesc" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="picUrl">
            <!--<el-input v-model="dataForm.picUrl" placeholder="图片"></el-input>-->
          <el-upload
            ref="upload1"
            :action="uploadUrl"
            :limit="1"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="showPictures"
            :before-remove="handleDeletePicture"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
            <el-input v-model="dataForm.sortOrder" placeholder="排序"></el-input>
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
          simpleDesc: '',
          picUrl: '',
          sortOrder: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          simpleDesc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          picUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        uploadUrl: this.$http.adornUrl(`/baseannex/multiupload?token=${this.$cookie.get('token')}`),
        dialogVisible: false,
        picId: ''
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
              url: this.$http.adornUrl(`/shopbrand/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.shopbrand.name
                this.dataForm.simpleDesc = data.shopbrand.simpleDesc
                this.dataForm.picUrl = data.shopbrand.picUrl
                this.dataForm.sortOrder = data.shopbrand.sortOrder
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
              url: this.$http.adornUrl(`/shopbrand/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'simpleDesc': this.dataForm.simpleDesc,
                'picUrl': this.dataForm.picUrl,
                'sortOrder': this.dataForm.sortOrder
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
      // 主图查看
      handlePictureCardPreview (file) {
        this.picId = this.dataForm.picUrl
        this.dialogVisible = true
      },
      // 删除图片
      handleRemove (file, fileList) {
        let url = file.url
        let id = ''
        let list = []
        if (url !== '') {
          id = url.substr(50, 19)
          list.push(id)
          this.$http({
            url: this.$http.adornUrl(`/baseannex/delete`),
            method: 'post',
            data: this.$http.adornData(list, false)
          }).then(({data}) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 150
            })
          })
        }
      },
      // 删除图片前的操作
      handleDeletePicture (file, fileList) {
        console.log(file)
      },
      // 主图成功上传回调函数
      handleAvatarSuccess (res, file) {
        this.dataForm.picUrl = res.batch[0].id
      },
      // 主图上传前
      beforeAvatarUpload (file) {
        // 文件类型进行判断
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
        return isJPG && isLt2M
      },
      reversedMessage (id) {
        return this.$http.adornUrl(`/baseannex/viewImage?id=` + id + `&token=${this.$cookie.get('token')}`)
      }
    },
    computed: {
      // 展示图片
      showPictures: function () {
        if (this.dataForm.primaryPicId !== '') {
          return [{url: this.reversedMessage(this.dataForm.picUrl)}]
        } else {
          return []
        }
      }
    }
  }
</script>
