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
        <el-form-item label="搜索来源，如PC、小程序、APP等" prop="from">
            <el-input v-model="dataForm.from" placeholder="搜索来源，如PC、小程序、APP等"></el-input>
        </el-form-item>
        <el-form-item label="搜索时间" prop="addTime">
            <el-date-picker
                    v-model="dataForm.addTime"
                    type="date"
                    placeholder="搜索时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="会员Id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="会员Id"></el-input>
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
          keyword: '',
          from: '',
          addTime: '',
          userId: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          keyword: [{ required: true, message: '不能为空', trigger: 'blur' }],
          from: [{ required: true, message: '不能为空', trigger: 'blur' }],
          addTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopsearchhistory/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopsearchhistory.id
                this.dataForm.keyword = data.shopsearchhistory.keyword
                this.dataForm.from = data.shopsearchhistory.from
                this.dataForm.addTime = data.shopsearchhistory.addTime
                this.dataForm.userId = data.shopsearchhistory.userId
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
              url: this.$http.adornUrl(`/shopsearchhistory/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'keyword': this.dataForm.keyword,
                'from': this.dataForm.from,
                'addTime': this.dataForm.addTime,
                'userId': this.dataForm.userId
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
