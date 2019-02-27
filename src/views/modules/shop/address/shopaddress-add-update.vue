<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="dataForm.memberId" placeholder="会员ID" :disabled="dataForm.id ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="会员姓名" prop="memberName" v-if="dataForm.id">
        <el-input v-model="dataForm.memberName" placeholder="会员姓名" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名" prop="userName">
          <el-input v-model="dataForm.userName" placeholder="收货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="telNumber">
          <el-input v-model="dataForm.telNumber" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="邮编" prop="postalCode">
          <el-input v-model="dataForm.postalCode" placeholder="邮编"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="7">
          <el-form-item label="省" prop="provinceId">
            <el-select v-model="dataForm.provinceId" placeholder="请选择" ref="selectProvince" @change="provinceChange(dataForm.provinceId)">
              <el-option
                v-for="(item, index) in provinceOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="市" prop="cityId">
            <el-select v-model="dataForm.cityId" placeholder="请选择" ref="selectCity" @change="cityChange(dataForm.cityId)">
              <el-option
                v-for="item in cityeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="区" prop="countyId">
            <el-select v-model="dataForm.countyId" placeholder="请选择" ref="selectCounty" @change="countyChange(dataForm.countyId)">
              <el-option
                v-for="item in countyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细收货地址" prop="detailInfo">
          <el-input v-model="dataForm.detailInfo" placeholder="详细收货地址信息"></el-input>
      </el-form-item>
      <el-form-item label="是否为默认地址" prop="isDefault">
        <el-radio-group v-model="dataForm.isDefault">
          <el-radio :label=0>否</el-radio>
          <el-radio :label=1>是</el-radio>
        </el-radio-group>
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
          memberId: '',
          memberName: '',
          userName: '',
          telNumber: '',
          postalCode: '',
          provinceName: '',
          provinceId: '',
          cityName: '',
          cityId: '',
          countyName: '',
          countyId: '',
          detailInfo: '',
          isDefault: 0
        },
        provinceOptions: [],
        cityeOptions: [],
        countyOptions: [],
        dataRule: {
          id: [{ required: true, message: '不能为空', trigger: 'blur' }],
          memberId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          userName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          telNumber: [{validator: checkPhone, trigger: 'blur'}],
          nationalCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
          provinceName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          cityName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          countyName: [{ required: true, message: '不能为空', trigger: 'blur' }],
          provinceId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          cityId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          countyId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          detailInfo: [{ required: true, message: '不能为空', trigger: 'blur' }],
          isDefault: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    // activated () {
    //   // this.getBaseProvinceList()
    //   this.haha()
    // },
    methods: {
      init (id) {
        this.dataForm.id = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/shopaddress/info`),
              method: 'get',
              params: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              console.log(data)
              if (data && data.code === 0) {
                this.dataForm.id = data.shopaddress.id
                this.dataForm.memberId = data.shopaddress.memberId
                this.dataForm.memberName = data.shopaddress.memberName
                this.dataForm.userName = data.shopaddress.userName
                this.dataForm.telNumber = data.shopaddress.telNumber
                this.dataForm.postalCode = data.shopaddress.postalCode
                this.dataForm.provinceId = data.shopaddress.provinceId
                if (this.dataForm.provinceId) {
                  this.getBaseCityList(this.dataForm.provinceId)
                }
                this.dataForm.cityId = data.shopaddress.cityId
                if (this.dataForm.cityId) {
                  this.getBaseCountyList(this.dataForm.cityId)
                }
                this.dataForm.countyId = data.shopaddress.countyId
                this.dataForm.provinceName = data.shopaddress.provinceName
                this.dataForm.cityName = data.shopaddress.cityName
                this.dataForm.countyName = data.shopaddress.countyName
                this.dataForm.detailInfo = data.shopaddress.detailInfo
                this.dataForm.isDefault = data.shopaddress.isDefault
              }
            })
          }
        })
        // 打开即触发
        this.getBaseProvinceList()
        console.log(this.dataForm.provinceId)
      },
      // 获取省列表
      getBaseProvinceList () {
        this.$http({
          url: this.$http.adornUrl('/baseregions/list'),
          method: 'get',
          params: {
            levelType: 1
          }
        }).then(({data}) => {
          this.provinceOptions = data.list
        })
      },
      // 获取市列表
      getBaseCityList (parentId) {
        this.$http({
          url: this.$http.adornUrl('/baseregions/list'),
          method: 'get',
          params: {
            levelType: 2,
            parentId: parentId
          }
        }).then(({data}) => {
          this.cityeOptions = data.list
        })
      },
      // 获取区列表
      getBaseCountyList (parentId) {
        this.$http({
          url: this.$http.adornUrl('/baseregions/list'),
          method: 'get',
          params: {
            levelType: 3,
            parentId: parentId
          }
        }).then(({data}) => {
          this.countyOptions = data.list
        })
      },
      // 选择省
      provinceChange (id) {
        let data = this.getDatasByCode(this.provinceOptions, id)
        this.dataForm.provinceName = data.name
        this.getBaseCityList(id)
        this.dataForm.cityId = ''
        this.dataForm.countyId = ''
      },
      // 选择市
      cityChange (id) {
        let data = this.getDatasByCode(this.cityeOptions, id)
        this.dataForm.cityName = data.name
        this.dataForm.postalCode = data.zipCode
        this.getBaseCountyList(id)
        this.dataForm.countyId = ''
      },
      // 选择区
      countyChange (id) {
        let data = this.getDatasByCode(this.countyOptions, id)
        console.log(data)
        this.dataForm.countyName = data.name
        this.dataForm.postalCode = data.zipCode
      },
      getDatasByCode (list, code) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === code) {
            return list[i]
          }
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/shopaddress/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'memberId': this.dataForm.memberId,
                'userName': this.dataForm.userName,
                'telNumber': this.dataForm.telNumber,
                'postalCode': this.dataForm.postalCode,
                'provinceName': this.dataForm.provinceName,
                'cityName': this.dataForm.cityName,
                'countyName': this.dataForm.countyName,
                'provinceId': this.dataForm.provinceId,
                'cityId': this.dataForm.cityId,
                'countyId': this.dataForm.countyId,
                'detailInfo': this.dataForm.detailInfo,
                'isDefault': this.dataForm.isDefault
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
