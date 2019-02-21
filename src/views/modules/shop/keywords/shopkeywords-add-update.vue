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
        <el-form-item label="关键字" prop="keyword">
            <el-input v-model="dataForm.keyword" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item label="热销" prop="isHot">
            <el-input v-model="dataForm.isHot" placeholder="热销"></el-input>
        </el-form-item>
        <el-form-item label="默认" prop="isDefault">
            <el-input v-model="dataForm.isDefault" placeholder="默认"></el-input>
        </el-form-item>
        <el-form-item label="显示" prop="isShow">
            <el-input v-model="dataForm.isShow" placeholder="显示"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
            <el-input v-model="dataForm.sortOrder" placeholder="排序"></el-input>
        </el-form-item>
        <el-form-item label="关键词的跳转链接" prop="schemeUrl">
            <el-input v-model="dataForm.schemeUrl" placeholder="关键词的跳转链接"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-input v-model="dataForm.type" placeholder="类型"></el-input>
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
          keyword: '',
          isHot: '',
          isDefault: '',
          isShow: '',
          sortOrder: '',
          schemeUrl: '',
          type: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          keyword: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isHot: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isDefault: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isShow: [{ required: true, message: '不能为空', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '不能为空', trigger: 'blur' }],
          schemeUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
          type: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopkeywords/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopkeywords.id
                this.dataForm.keyword = data.shopkeywords.keyword
                this.dataForm.isHot = data.shopkeywords.isHot
                this.dataForm.isDefault = data.shopkeywords.isDefault
                this.dataForm.isShow = data.shopkeywords.isShow
                this.dataForm.sortOrder = data.shopkeywords.sortOrder
                this.dataForm.schemeUrl = data.shopkeywords.schemeUrl
                this.dataForm.type = data.shopkeywords.type
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
              url: this.$http.adornUrl(`/shopkeywords/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'keyword': this.dataForm.keyword,
                'isHot': this.dataForm.isHot,
                'isDefault': this.dataForm.isDefault,
                'isShow': this.dataForm.isShow,
                'sortOrder': this.dataForm.sortOrder,
                'schemeUrl': this.dataForm.schemeUrl,
                'type': this.dataForm.type
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
