<script>
  import UploadExtendCropper from './uploadExtendCropper'
  import VueCropper from 'vue-cropper'
  function noop () {}

  export default {
    name: 'UploadCropper',
    props: {
      refName: {
        type: String,
        default: 'photoUpload'
      },
      action: {
        type: String,
        default: 'unused'
      },
      headers: {
        type: Object,
        default () {
          return {}
        }
      },
      data: Object,
      name: {
        type: String,
        default: 'file'
      },
      withCredentials: Boolean,
      showFileList: {
        type: Boolean,
        default: true
      },
      accept: {
        type: String,
        default: 'image/*'
      },
      type: {
        type: String,
        default: 'select'
      },
      beforeUpload: Function,
      beforeRemove: Function,
      onRemove: {
        type: Function,
        default: noop
      },
      onChange: {
        type: Function,
        default: noop
      },
      onPreview: {
        type: Function,
        default: noop
      },
      onSuccess: {
        type: Function,
        default: noop
      },
      onProgress: {
        type: Function,
        default: noop
      },
      onError: {
        type: Function,
        default: noop
      },
      fileList: {
        type: Array,
        default () {
          return []
        }
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      listType: {
        type: String,
        default: 'picture-card' // text,picture,picture-card
      },
      httpRequest: Function,
      disabled: {
        type: Boolean
      },
      limit: Number,
      limitSize: Number,
      onExceed: {
        type: Function,
        default: noop
      },
      cropper: Object,
      // 表单提交使用的方法
      method: {
        type: String,
        default: 'post'
      }
    },
    components: {
      UploadExtendCropper,
      VueCropper
    },
    data () {
      return {
        hideUploadBtn: false, // 是否隐藏上传图片按钮
        showCropperDialog: false, // 是否显示裁剪弹窗
        fileListCopy: this.fileList,
        // 预览图片
        dialogPreview: {
          dialogImageUrl: '',
          dialogVisible: false
        },
        cropperOpts: Object.assign({}, {
          height: 300, // 默认裁剪框高度，单位 px
          img: '', // 裁剪图片的地址
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300, // 默认生成截图框宽度
          autoCropHeight: 300, // 默认生成截图框高度
          centerBox: true,
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          full: true, // 是否输出原图比例的截图
          fixedBox: false, // 固定截图框大小 不允许改变
          canMove: true, // 上传图片是否可以移动
          canMoveBox: true, // 截图框能否拖动
          original: false // 上传图片按照原始比例渲染
        }, this.cropper)
      }
    },
    watch: {
      fileList: function (val) {
        console.log('66')
        console.log(val)
        this.fileListCopy = this.fileList
      }
    },
    computed: {
      // 已选图片是否超过图片数量限制
      isImageOverLimit () {
        // return this.fileList.length >= this.limit
        return this.fileListCopy.length >= this.limit
      }
    },
    methods: {
      handleHttpRequest (options) {
        // console.log(options)
        // const ajax = this.method === 'put' ? putAjax : postAjax
        // return this.httpRequest ? this.httpRequest(options, ajax) : ajax(options)
        return this.httpRequest(options)
      },
      // 获取上传组件
      getUploadComponent () {
        return this.$refs[this.refName]
      },
      // 获取裁剪组件
      getCropperComponent () {
        return this.$refs[this.refName + 'Cropper']
      },
      // 删除操作
      handleRemove (file, fileList) {
        console.log('hahahxixixi')
        this.fileListCopy = fileList
        this.onRemove(file, fileList)
      },
      // 点击预览按钮
      handlePreview (file) {
        this.dialogPreview.dialogImageUrl = file.url
        this.updatePreviewVisible(true)
        this.onPreview(file)
      },
      updatePreviewVisible (val) {
        console.log(val)
        this.dialogPreview.dialogVisible = val
      },
      // 选择完本地图片
      handleChoose (ev) {
        this.uploadImg(ev)
      },
      handleChange (file, fileList) {
        this.fileListCopy = fileList
        this.onChange(file, fileList)
        if (this.autoUpload) {
          this.getUploadComponent().$refs['upload-inner'].upload.call(this, file)
        }
      },
      handleSuccess (res, file, fileList) {
        this.fileListCopy = fileList
        console.log('88')
        this.onSuccess(res, file, fileList)
      },
      handleError (res, file, fileList) {
        this.fileListCopy = fileList
        this.onError(res, file, fileList)
      },
      // 上传本地图片到裁剪组件
      uploadImg (ev) {
        const _this = this
        const file = ev.target.files[0]
        // const file = ev.raw
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ev.target.value)) {
        // if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.type)) {
          _this.$message.error('图片类型必须是 gif, jpeg, jpg, png 中的一种!')
          return false
        }
        if (_this.limitSize) {
          const kbSize = file.size / 1024
          if (kbSize > _this.limitSize) {
            const temp = _this.limitSize / 1024 // limitSize 单位：kb
            const tip = (temp >= 1) ? temp + 'MB' : _this.limitSize + 'KB'
            _this.$message.error(`图片大小不能超过${tip}!`)
            return false
          }
        }
        const reader = new FileReader()
        // 当读取操作成功完成时调用
        reader.onload = (e) => {
          // 把Array Buffer转化为blob 如果是base64不需要
          const data = (typeof e.target.result) === 'object' ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          _this.cropperOpts.img = data
          _this.cropperOpts.centerBox = true
          _this.showCropperDialog = true // 显示弹窗
        }
        // reader.readAsDataURL(file) // 转化为base64
        // 异步按字节读取文件内容，结果用ArrayBuffer对象表示
        reader.readAsArrayBuffer(file) // 转化为blob
      },
      // 取消图片裁剪
      cancelCropper () {
        const cropperComponent = this.getCropperComponent()
        if (cropperComponent) {
          cropperComponent.clearCrop() // clear
          this.showCropperDialog = false
        } else {
          return
        }
      },
      // 确认图片裁剪
      confirmCropper () {
        // 防止重复点击确定按钮导致重复绑定数据
        if (this.showCropperDialog) {
          const cropperComponent = this.getCropperComponent()
          if (cropperComponent) {
            cropperComponent && cropperComponent.startCrop() // start
            this.outputCropResult()
          } else {
            return
          }
        }
      },
      // 输出裁剪结果
      outputCropResult () {
        const _this = this
        // 获取截图的blob数据
        this.getCropperComponent().getCropBlob((blob) => {
          // 模仿图片组件内部构建对象的方式
          blob.uid = Date.now()
          blob.name = blob.uid + '.jpg'
          blob.fliename = blob.uid + '.jpg'
          const file = {
            status: 'ready',
            name: blob.name,
            size: blob.size,
            percentage: 0,
            uid: blob.uid,
            raw: blob
          }
          try {
            file.url = window.URL.createObjectURL(blob)
          } catch (err) {
            console.error(err)
            return
          }
          _this.showCropperDialog = false // 关闭裁剪弹窗
          _this.showCropperDialog && _this.getUploadComponent().uploadFiles.push(file)
          _this.fileListCopy.push(file)
          // _this.handleChange(file, _this.fileList)
          _this.handleChange(file, _this.fileListCopy)
        })
      }
    },
    render (h) {
      // 上传组件
      const uploadData = {
        props: {
          type: this.type,
          'before-upload': this.beforeUpload, // 上传文件前的处理函数
          'with-credentials': this.withCredentials, // 支持发送 cookie 凭证信息
          action: this.action, // 必选参数，上传的地址
          headers: this.headers, // 设置上传的请求头部
          name: this.name, // 上传的文件字段名
          data: this.data, // 上传时附带的额外参数
          accept: this.accept, // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
          // 'file-list': this.fileListCopy, // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
          'file-list': this.fileList, // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
          'auto-upload': this.autoUpload, // 是否在选取文件后立即进行上传
          'list-type': this.listType, // 文件列表的类型
          disabled: this.disabled, // 是否禁用
          limit: this.limit, // 最大允许上传个数
          'on-exceed': this.onExceed, // 处理超出数量后的动作
          'on-progress': this.onProgress, // 文件上传时的钩子函数
          'on-success': this.handleSuccess, // 上传成功后的回调函数
          'on-error': this.handleError, // 文件上传失败时的钩子
          'on-preview': this.handlePreview, // 点击文件列表中已上传的文件时的钩子函数
          'on-remove': this.handleRemove, // 文件列表移除文件时的钩子
          'on-choose': this.handleChoose,
          'http-request': this.handleHttpRequest // 覆盖默认的上传行为，可以自定义上传的实现
        },
        ref: this.refName,
        class: {
          'upload-cropper': true,
          'hide-upload-btn': this.isImageOverLimit
        }
      }
      // 预览弹窗
      const previewDialogData = {
        props: {
          visible: this.dialogPreview.dialogVisible,
          'modal-append-to-body': false,
          'append-to-body': true
        },
        on: {
          'update:visible': this.updatePreviewVisible
        }
      }
      // 裁剪组件
      const cropperData = {
        props: this.cropperOpts,
        ref: this.refName + 'Cropper'
      }
      return (
        <div>
        <upload-extend-cropper { ...uploadData }>
    <i class='el-icon-plus'></i>
      { this.$slots.default }
    </upload-extend-cropper>

      <el-dialog { ...previewDialogData }>
    <img width='100%' src={ this.dialogPreview.dialogImageUrl }/>
      </el-dialog>

      <el-dialog title='图片裁剪' width='50%' center
      visible={ this.showCropperDialog } { ...{ props:{'modal-append-to-body': false,'append-to-body': true}, on: { 'update:visible': val => { this.showCropperDialog = val } }}}>
    <VueCropper { ...{ style: { height: this.cropperOpts.height + 'px' } }} { ...cropperData }></VueCropper>
      <span slot='footer' class='dialog-footer'>
        <el-button { ...{ on: { click: this.cancelCropper }}}>取 消</el-button>
      <el-button type='primary' { ...{ on: { click: this.confirmCropper }}}>确 定</el-button>
      </span>
      </el-dialog>
      </div>
    )
    }
  }
</script>

<style>
  /* 是否显示上传图片按钮 */
  .hide-upload-btn .el-upload {
    display: none;
  }
  .upload-cropper .el-upload-list--picture-card{
    display: inline-flex;
  }
  .upload-cropper .el-upload-list--picture-card .el-upload-list__item{
    display: inline-flex;
    align-items: center;
    justify-content:center;
  }
  .upload-cropper .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
