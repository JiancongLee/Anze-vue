<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <!--<el-form-item label="主键" prop="id">-->
            <!--<el-input v-model="dataForm.id" placeholder="主键"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="名称" prop="username">
            <el-input v-model="dataForm.username" placeholder="会员名称"></el-input>
        </el-form-item>
      <el-form-item label="会员昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="会员昵称"></el-input>
      </el-form-item>
        <!--<el-form-item label="密码" prop="password">-->
            <!--<el-input v-model="dataForm.password" placeholder="会员密码"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="状态" prop="status">
          <el-select v-model="dataForm.status" placeholder="请选择状态">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="dataForm.gender" placeholder="请选择性别">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="用户电话"></el-input>
      </el-form-item>
        <el-form-item label="生日" prop="birthday">
            <el-date-picker
                    v-model="dataForm.birthday"
                    type="date"
                    placeholder="生日">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="等级" prop="userLevelCode">
            <el-input v-model="dataForm.userLevelCode" placeholder="会员等级code"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
            <el-input v-model="dataForm.avatar" placeholder="头像"></el-input>
          <!--<el-upload-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--list-type="picture-card"-->
            <!--:on-preview="handlePictureCardPreview"-->
            <!--:on-remove="handleRemove">-->
            <!--<i class="el-icon-plus"></i>-->
          <!--</el-upload>-->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dataForm.avatar" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="微信id" prop="weixinOpenid">
            <el-input v-model="dataForm.weixinOpenid" placeholder="微信id"></el-input>
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
      // let checkEmail = (rule, value, callback) => {
      //   if (!value) {
      //     callback(new Error('邮箱不能为空'))
      //   } else {
      //     if (value !== '') {
      //       var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      //       if (!reg.test(value)) {
      //         callback(new Error('请输入有效的邮箱'))
      //       }
      //     }
      //     callback()
      //   }
      // }
      // 校验手机号码
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      }
      return {
        visible: false,
        dataForm: {
          id: '',
          username: '',
          password: '',
          status: '',
          gender: '',
          birthday: '',
          registerTime: '',
          lastLoginTime: '',
          lastLoginIp: '',
          userLevelCode: '',
          nickname: '',
          mobile: '',
          avatar: '',
          weixinOpenid: '',
          createTime: '',
          updateTime: ''
        },
        sex: [{
          value: 0,
          label: '男'
        }, {
          value: 1,
          label: '女'
        }, {
          value: 2,
          label: '保密'
        }],
        status: [{
          value: 0,
          label: '可用'
        }, {
          value: 1,
          label: '禁用'
        }, {
          value: 2,
          label: '注销'
        }],
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          username: [{ required: true, message: '不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '不能为空', trigger: 'blur' }],
          status: [{ required: true, message: '状态：0可用, 1禁用, 2注销不能为空', trigger: 'blur' }],
          gender: [{ required: true, message: '不能为空', trigger: 'blur' }],
          birthday: [{ required: true, message: '不能为空', trigger: 'blur' }],
          registerTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          lastLoginTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          lastLoginIp: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userLevelCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
          nickname: [{ required: true, message: '不能为空', trigger: 'blur' }],
          mobile: [{validator: checkPhone, trigger: 'blur'}],
          avatar: [{ required: true, message: '不能为空', trigger: 'blur' }],
          weixinOpenid: [{ required: true, message: '不能为空', trigger: 'blur' }],
          createTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
          updateTime: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      init (id) {
        this.dataForm.id = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/shopmember/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.shopmember.id || undefined
                this.dataForm.username = data.shopmember.username
                this.dataForm.password = data.shopmember.password
                this.dataForm.status = data.shopmember.status
                this.dataForm.gender = data.shopmember.gender
                this.dataForm.birthday = data.shopmember.birthday
                this.dataForm.registerTime = data.shopmember.registerTime
                this.dataForm.lastLoginTime = data.shopmember.lastLoginTime
                this.dataForm.lastLoginIp = data.shopmember.lastLoginIp
                this.dataForm.userLevelCode = data.shopmember.userLevelCode
                this.dataForm.nickname = data.shopmember.nickname
                this.dataForm.mobile = data.shopmember.mobile
                this.dataForm.avatar = data.shopmember.avatar
                this.dataForm.weixinOpenid = data.shopmember.weixinOpenid
                this.dataForm.createTime = data.shopmember.createTime
                this.dataForm.updateTime = data.shopmember.updateTime
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
              url: this.$http.adornUrl(`/shopmember/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'username': this.dataForm.username,
                'password': this.dataForm.password,
                'status': this.dataForm.status,
                'gender': this.dataForm.gender,
                'birthday': this.dataForm.birthday,
                'registerTime': this.dataForm.registerTime,
                'lastLoginTime': this.dataForm.lastLoginTime,
                'lastLoginIp': this.dataForm.lastLoginIp,
                'userLevelCode': this.dataForm.userLevelCode,
                'nickname': this.dataForm.nickname,
                'mobile': this.dataForm.mobile,
                'avatar': this.dataForm.avatar,
                'weixinOpenid': this.dataForm.weixinOpenid,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
