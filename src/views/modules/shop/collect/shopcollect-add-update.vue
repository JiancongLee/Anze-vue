<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="用户Id" prop="userId">
            <el-input v-model="dataForm.userId" placeholder="用户Id"></el-input>
        </el-form-item>
        <el-form-item label="产品Id" prop="valueId">
            <el-input v-model="dataForm.valueId" placeholder="产品Id"></el-input>
        </el-form-item>
        <!--<el-form-item label="添加时间" prop="addTime">-->
            <!--<el-date-picker-->
                    <!--v-model="dataForm.addTime"-->
                    <!--type="date"-->
                    <!--placeholder="添加时间">-->
            <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="是否提醒" prop="isAttention">
            <el-input v-model="dataForm.isAttention" placeholder="是否提醒"></el-input>
        </el-form-item>
        <el-form-item label="Type" prop="type">
            <el-input v-model="dataForm.type" placeholder="类型"></el-input>
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
          userId: '',
          valueId: '',
          isAttention: '',
          type: ''
        },
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          valueId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isAttention: [{ required: true, message: '不能为空', trigger: 'blur' }],
          typeId: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              url: this.$http.adornUrl(`/shopcollect/info`),
              method: 'get',
              params: this.$http.adornParams({
                '': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopcollect.id
                this.dataForm.userId = data.shopcollect.userId
                this.dataForm.valueId = data.shopcollect.valueId
                this.dataForm.isAttention = data.shopcollect.isAttention
                this.dataForm.type = data.shopcollect.type
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
              url: this.$http.adornUrl(`/shopcollect/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'userId': this.dataForm.userId,
                'valueId': this.dataForm.valueId,
                'isAttention': this.dataForm.isAttention,
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
