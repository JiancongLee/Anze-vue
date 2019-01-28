<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="0px" class="ms-content" @keyup.enter.native="dataFormSubmit()">
        <el-form-item prop="userName">
          <el-input v-model="dataForm.userName" placeholder="username">
            <icon-svg name="yonghu2" class="icon" width="100%" height="100%" slot="prepend"></icon-svg>
            <!--<el-button slot="prepend" icon="el-icon-lx-people"></el-button>-->
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="dataForm.password" >
            <!--<el-button slot="prepend" icon="el-icon-lx-lock"></el-button>-->
            <icon-svg name="mima3" class="icon" width="100%" height="100%" slot="prepend" ></icon-svg>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="dataForm.captcha" placeholder="验证码">
              </el-input>
            </el-col>
            <el-col :span="10" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="dataFormSubmit()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码提示。</p>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { getUUID } from '@/utils'
  import AesUtil from '@/utils/AesUtil.js'
  import CryptoJS from 'crypto-js'
  export default {
    data () {
      return {
        dataForm: {
          userName: 'admin',
          password: 'admin',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex)
            let salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex)
            let aesUtil = new AesUtil(128, 1000)
            let ciphertext = aesUtil.encrypt(salt, iv, this.dataForm.uuid, this.dataForm.password)
            let usertext = aesUtil.encrypt(salt, iv, this.dataForm.uuid, this.dataForm.userName)
            let aesUsername = (iv + '::' + salt + '::' + usertext)
            let aesPassword = (iv + '::' + salt + '::' + ciphertext)
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'apollo': aesUsername,
                'app': aesPassword,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'home' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)

        this.$http.get(this.$http.adornUrl('/getCode'), {params: this.$http.adornParams({uuid: this.dataForm.uuid})})
          .then(({data}) => {
            if (data) {
              this.dataForm.captcha = data
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .login-wrap{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-size: 100%;
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/img/login-bg.jpg);
      background-size: cover;
    }
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:#fff;
  }
</style>
