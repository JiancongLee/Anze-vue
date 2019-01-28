<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="排序" prop="num">
            <el-input v-model="dataForm.num" placeholder="排序"></el-input>
        </el-form-item>
        <el-form-item label="父部门" prop="pname">
          <el-popover
            ref="deptListPopover"
            placement="bottom-start"
            trigger="click"
            v-model="visible2">
            <el-tree
              :data="deptList"
              :props="deptListTreeProps"
              node-key="id"
              ref="deptListTree"
              @current-change="deptListTreeCurrentChangeHandle"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false">
            </el-tree>
          </el-popover>
            <el-input v-model="dataForm.pname"  v-popover:deptListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"   ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="simplename">
            <el-input v-model="dataForm.simplename" placeholder="简称"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
            <el-input v-model="dataForm.adress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="dataForm.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="公司名" prop="company">
            <el-input v-model="dataForm.company" placeholder="公司名"></el-input>
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
        visible2: false,
        dataForm: {
          id: '',
          num: 0,
          pid: '',
          pname: '',
          simplename: '',
          fullname: '',
          adress: '',
          phone: '',
          company: ''
        },
        deptList: [],
        deptListTreeProps: {
          label: 'label',
          children: 'children'
        },
        dataRule: {
          pid: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          simplename: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ],
          company: [
              { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http.get(this.$http.adornUrl('/sysdept/depttree'))
          .then(({data}) => {
            if (data) {
              if (this.deptList.length === 0) {
                this.deptList.push(data)
              }
            }
          }).then(() => {
            this.visible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].resetFields()
              if (this.dataForm.id) {
                this.$http({
                  url: this.$http.adornUrl(`/sysdept/info`),
                  method: 'get',
                  params: this.$http.adornParams({
                    'id': this.dataForm.id
                  })
                }).then(({data}) => {
                  if (data && data.code === 0) {
                    this.dataForm.num = data.sysdept.num
                    this.dataForm.pid = data.sysdept.pid
                    this.dataForm.pname = data.sysdept.pname
                    this.dataForm.simplename = data.sysdept.simplename
                    this.dataForm.fullname = data.sysdept.fullname
                    this.dataForm.adress = data.sysdept.adress
                    this.dataForm.phone = data.sysdept.phone
                    this.dataForm.company = data.sysdept.company
                    this.deptListTreeSetCurrentNode()
                  }
                }
              )
              } else {
                this.deptListTreeSetCurrentNode()
              }
            }
          )
          }
      )
      },
      // 菜单树选中
      deptListTreeCurrentChangeHandle (data, node) {
        this.dataForm.pid = data.id
        this.dataForm.pname = data.label
        //  pname
        this.visible2 = false
      },
      // 菜单树设置当前选中节点
      deptListTreeSetCurrentNode () {
        this.$refs.deptListTree.setCurrentKey(this.dataForm.pid)
        this.dataForm.pname = (this.$refs.deptListTree.getCurrentNode() || {})['label']
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sysdept/${!this.dataForm.id ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'num': this.dataForm.num,
                'pid': this.dataForm.pid,
                'simplename': this.dataForm.simplename,
                'fullname': this.dataForm.fullname,
                'version': this.dataForm.version,
                'adress': this.dataForm.adress,
                'phone': this.dataForm.phone,
                'company': this.dataForm.company
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
