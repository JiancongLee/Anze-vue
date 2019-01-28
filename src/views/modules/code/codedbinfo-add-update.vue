<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    v-loading="loading"
    element-loading-text="拼命连接数据库中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-row>
        <el-col :span="14">
          <el-form-item label="别名" prop="alias">
            <el-input v-model="dataForm.alias" placeholder="别名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="数据库类型" prop="dbType">
            <el-select v-model="dataForm.dbType" placeholder="数据库类型">
              <el-option
                v-for="item in dataForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
<!--        <el-form-item label="数据库驱动" prop="dbDriver">
            <el-input v-model="dataForm.dbDriver" placeholder="数据库驱动"></el-input>
        </el-form-item>-->
        <el-form-item label="数据库地址" prop="dbUrl">
            <el-input v-model="dataForm.dbUrl" placeholder="数据库地址"></el-input>
        </el-form-item>
        <el-form-item label="数据库账户" prop="dbUserName">
            <el-input v-model="dataForm.dbUserName" placeholder="数据库账户"></el-input>
        </el-form-item>
<!--        <el-form-item label="连接密码" prop="dbPassword">
            <el-input v-model="dataForm.dbPassword" placeholder="连接密码">
            </el-input>
        </el-form-item>-->

      <el-form-item v-if="visibleP" label="连接密码">
        <el-input type="password" v-model="dataForm.dbPassword" placeholder="请输入连接密码">
          <el-button slot="append" @click="changePass('show')"><icon-svg name='xianshimima' width='20px' height='20px'></icon-svg></el-button>
            <!--<icon-svg slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" name='xianshi'></icon-svg>-->
        </el-input>
      </el-form-item>
      <el-form-item v-else label="连接密码">
        <el-input type="text" v-model="dataForm.dbPassword" placeholder="请输入连接密码">
          <el-button slot="append" @click="changePass('hide')"><icon-svg name='buxianshimima'></icon-svg></el-button>
          <!--<icon-svg slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;" name='yincang'></icon-svg>-->
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="testDataBasesConnect()">测试</el-button>
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
        visibleP: true,
        dataForm: {
          dbDriver: '',
          dbUrl: '',
          dbUserName: '',
          dbPassword: '',
          userId: '',
          dbType: '',
          crtUserId: '',
          crtTime: '',
          mdfUserId: '',
          mdfTime: '',
          options: [{
            value: 'oracle',
            label: 'oracle'
          }, {
            value: 'mysql',
            label: 'mysql'
          }]
        },
        loading: false,
        dataRule: {
          alias: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dbDriver: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dbUrl: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dbUserName: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dbPassword: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dbType: [
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
              url: this.$http.adornUrl(`/codedbinfo/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.alias = data.codedbinfo.alias
                this.dataForm.dbDriver = data.codedbinfo.dbDriver
                this.dataForm.dbUrl = data.codedbinfo.dbUrl
                this.dataForm.dbUserName = data.codedbinfo.dbUserName
                this.dataForm.dbPassword = data.codedbinfo.dbPassword
                this.dataForm.dbType = data.codedbinfo.dbType
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
              url: this.$http.adornUrl(`/codedbinfo/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'alias': this.dataForm.alias,
                'dbDriver': this.dataForm.dbDriver,
                'dbUrl': this.dataForm.dbUrl,
                'dbUserName': this.dataForm.dbUserName,
                'dbPassword': this.dataForm.dbPassword,
                // 'userId': this.dataForm.userId,
                'dbType': this.dataForm.dbType,
                'crtUserId': this.dataForm.crtUserId
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
      testDataBasesConnect () {
        this.loading = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/codedbinfo/test`),
              method: 'post',
              data: this.$http.adornData({
                'dbDriver': this.dataForm.dbDriver,
                'dbUrl': this.dataForm.dbUrl,
                'dbUserName': this.dataForm.dbUserName,
                'dbPassword': this.dataForm.dbPassword,
                'dbType': this.dataForm.dbType
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                if (data.flag) {
                  this.loading = false
                  this.$message({
                    message: '测试连接成功',
                    type: 'success',
                    duration: 1500
                    // onClose: () => {
                    //   this.visible = false
                    //   // this.$emit('refreshDataList')
                    // }
                  })
                } else {
                  this.$message({
                    message: '测试连接失败',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.visible = false
                      // this.$emit('refreshDataList')
                    }
                  })
                }
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      changePass (value) {
        // 判断渲染，true:暗文显示，false:明文显示
        this.visibleP = !(value === 'show')
      }
    }
  }
</script>
