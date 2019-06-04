<script>
  import { Upload } from 'element-ui'
  const mixin = {
    props: {
      onChoose: {
        type: Function,
        default: () => {}
      }
    },
    created () {
      const _self = this
      // 扩展 ELUpload 的 handleChange 方法
      const UploadHandleChange = Upload.components.Upload.methods.handleChange
      Upload.components.Upload.methods.handleChange = ev => {
        if (typeof this.onChoose === 'function') {
          _self.onChoose(ev)
        } else {
          UploadHandleChange.call(this, ev)
        }
      }
    }
  }

  export default {
    name: 'UploadExtendCropper',
    mixins: [Upload, mixin] // 组件继承
  }
</script>
