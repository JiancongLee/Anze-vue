<template>
  <div class="mod-config">
    <el-form ref="form" :model="dataForm" label-width="80px">

      <el-row>
        <el-col :span="6">
          <el-form-item label="参数">
            <el-select v-model="dataForm.region" placeholder="请选择参数">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="作者" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">生成</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="Code包名" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Html包名" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="JS包名" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="XML包名" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="编码" prop="alias">
            <el-select v-model="dataForm.region" placeholder="请选择参数">
              <el-option label="UTF-8" value="UTF-8"></el-option>
              <el-option label="GBK" value="GBK"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类名" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="功能" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="菜单" prop="alias">
            <el-input v-model="dataForm.alias"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>




    <el-row>
        <el-col :span="7">
          <div>
            <el-table :data="tableData4.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" max-height="300">
              <el-table-column
                prop="name"
                label="数据库："
                :render-header="myHead">
              </el-table-column>
            </el-table>
          </div>
        </el-col>

      <el-col :span="7" :offset="1">
        <div class="dormitory">
          <div class="searchWord">
            <el-input v-model="search" style="display: inline-block;width: 100%" placeholder="请输入搜索内容"></el-input>
          </div>
        </div>
        <div>
          <el-table :data="tableData4" style="width: 100%" max-height="300">
            <el-table-column fixed
                             prop="date"
                             label="字段"
                             width="100%">
            </el-table-column>
          </el-table>
        </div>
      </el-col>


      <el-col :span="7" :offset="1">
        <div class="dormitory">
          <div class="searchWord">
            <el-input v-model="search" style="display: inline-block;width: 100%" placeholder="请输入搜索内容"></el-input>
          </div>
        </div>
        <div>
          <el-table :data="tableData4" style="width: 100%" max-height="300">
            <el-table-column fixed
                             prop="date"
                             label="模板"
                             width="100%">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData4: [{
          date: '2016-05-03',
          name: '王小虎1',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎2',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎3',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎4',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎5',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎6',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        search: '',
        tableData7: [{
          date: '2016-05-02',
          name: '王小虎8',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎9',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎10',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎11',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search7: ''
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      myHead (h, { column, $index }) {
        return h('span', {class: 'table-head', style: {width: '100%', 'text-align': 'center'}}, [
          h('div', {}, column.label),
          h('el-input', {style: {width: '70%'},
            // 主要1，这里必须是nativeOn 不能是on ，on的时候监听不到事件
            nativeOn: {
              // 鼠标点击的事件
              click: () => {
                // 点击确认按钮的事件
                // alert('确定')
              },
              keyup: (param) => {
                // 键盘点击的事件
                // debugger
                // alert('键盘的回车事件')
                // console.log(param)
              }
            }
          }, '')]
        )
        // return (<el-input style="width: '70%"></el-input>)
      }
    }
  }
</script>

<style scoped>

</style>
