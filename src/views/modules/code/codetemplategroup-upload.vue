<template>
    <el-dialog
        title="导入"
        :visible.sync="visible"
        width="30%"
        center>
        <el-upload
            class="upload-demo"
            ref="upload"
            :action="url"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUploadHandle"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">注意：只能上传Excel文件，且第一行是标题，正式的内容是从第二行开始的</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click=" submitUpload()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
      data () {
        return {
          visible: false,
          fileList: [],
          url: ''
        }
      },
      methods: {
        init () {
          this.visible = true
          this.url = this.$http.adornUrl(`/codetemplategroup/import?token=${this.$cookie.get('token')}`)
        },
        submitUpload () {
          this.$refs.upload.submit()
          this.visible = false
        },
        handleRemove (file, fileList) {
            // console.log(file, fileList)
        },
        handlePreview (file) {

        },
        beforeUploadHandle (file) {
          if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
            this.$message.error('只支持Excel格式的文件！')
            return false
          }
        }
      }
    }
</script>
<style scoped>

</style>