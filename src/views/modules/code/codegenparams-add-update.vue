<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="参数组名" prop="alias">
            <el-input v-model="dataForm.alias" placeholder="别名"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="dataForm.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="code 包" prop="codePackage">
            <el-input v-model="dataForm.codePackage" placeholder="code 包"></el-input>
        </el-form-item>
        <el-form-item label="xml 路径" prop="xmlPackage">
            <el-input v-model="dataForm.xmlPackage" placeholder="xml 路径"></el-input>
        </el-form-item>
        <el-form-item label="js 目录" prop="jsPackage">
            <el-input v-model="dataForm.jsPackage" placeholder="js 目录"></el-input>
        </el-form-item>
        <el-form-item label="html 目录" prop="htmlPackage">
            <el-input v-model="dataForm.htmlPackage" placeholder="html 目录"></el-input>
        </el-form-item>
        <el-form-item label="本地路径" prop="localPath">
            <el-input v-model="dataForm.localPath" placeholder="本地路径"></el-input>
        </el-form-item>


      <el-row>
        <el-col :span="12">
          <el-form-item label="编码" prop="encoded">
            <el-select v-model="dataForm.encoded" placeholder="请选择编码">
              <el-option
                v-for="item in dataForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="dataForm.encoded" placeholder="编码"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="版权信息" prop="copyright">
            <el-input v-model="dataForm.copyright" placeholder="版权信息"></el-input>
          </el-form-item>
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
          alias: '',
          author: '',
          codePackage: 'com.bingo.',
          xmlPackage: '',
          jsPackage: '',
          htmlPackage: '',
          localPath: '',
          encoded: 'UTF-8',
          copyright: '',
          options: [{
            value: 'UTF-8',
            label: 'UTF-8'
          }, {
            value: 'GBK',
            label: 'GBK'
          }]
        },
        dataRule: {
          alias: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          author: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          encoded: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ]
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
              url: this.$http.adornUrl(`/codegenparams/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.alias = data.codegenparams.alias
                this.dataForm.author = data.codegenparams.author
                this.dataForm.codePackage = data.codegenparams.codePackage
                this.dataForm.xmlPackage = data.codegenparams.xmlPackage
                this.dataForm.jsPackage = data.codegenparams.jsPackage
                this.dataForm.htmlPackage = data.codegenparams.htmlPackage
                this.dataForm.localPath = data.codegenparams.localPath
                this.dataForm.encoded = data.codegenparams.encoded
                this.dataForm.copyright = data.codegenparams.copyright
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
              url: this.$http.adornUrl(`/codegenparams/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'alias': this.dataForm.alias,
                'author': this.dataForm.author,
                'codePackage': this.dataForm.codePackage,
                'xmlPackage': this.dataForm.xmlPackage,
                'jsPackage': this.dataForm.jsPackage,
                'htmlPackage': this.dataForm.htmlPackage,
                'localPath': this.dataForm.localPath,
                'encoded': this.dataForm.encoded,
                'copyright': this.dataForm.copyright
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
