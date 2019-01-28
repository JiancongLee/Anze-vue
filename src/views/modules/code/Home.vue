<template>
  <div id="app">
    <div class="fm-header">
      <div class="fm-title">数据库：</div>
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        :type="tag.type"
        @click.native="handleShow(tag)">
        {{tag.name}}
      </el-tag>
      <div class="fm-select" v-if="ifSelect">
        <multiselect v-model="value" :options="options" placeholder="选择表名" tagPlaceholder="选择" @input="onSelect" label="tableName" track-by="tableName"  :searchable="true" >
          <template slot="option" slot-scope="props">
            <el-tag >{{ props.option.tableName }}-{{props.option.chinaName}}</el-tag>
          </template>
          <template slot="singleLabel" slot-scope="props">
            <el-tag type="success">{{ props.option.tableName }}</el-tag>
          </template>
        </multiselect>
      </div>
    </div>
    <div class="fm-container">
      <fm-making-form :dbinfoId="this.dbinfoId" :tableName="this.tableName" :ifSelect="this.ifSelect"></fm-making-form>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
  import Multiselect from 'vue-multiselect'
  export default {
    data () {
      return {
        value: {tableName: '', chinaName: ''},
        options: [],
        tags: [],
        ifSelect: false,
        dbinfoId: 0,
        tableName: ''
      }
    },
    components: {
      Multiselect
    },
    activated () {
      this.getAllDbinfo()
    },
    methods: {
      handleShow (tag) {
        this.ifSelect = true
        this.dbinfoId = tag.id
        tag.type = 'danger'
        this.tags.forEach(function (entry) {
          if (tag.name.trim() !== entry.name.trim()) {
            entry.type = ''
          }
        })
        this.options = []
        this.$http.get(this.$http.adornUrl('/code/getTables'), {params: this.$http.adornParams({dbinfoId: tag.id})})
          .then(({data}) => {
            if (data && data.code === 0) {
              // this.dataForm.captcha = data
              let tables = data.table
              for (let i in tables) {
                if (tables[i].chinaName && tables[i].tableName && !tables[i].tableName.includes('BIN$')) {
                  this.options.push(tables[i])
                }
              }
            }
          })
      },
      onSelect (value, id) {
        this.tableName = value.tableName
      },
      getAllDbinfo () {
        if (!this.tags.length) {
          this.$http.get(this.$http.adornUrl('/codedbinfo/all'))
            .then(({data}) => {
              let _this = this
              if (data && data.code === 0) {
                data.dbinfo.forEach(function (val) {
                  let dbinfo = { name: val.alias, id: val.id, type: '' }
                  _this.tags.push(dbinfo)
                })
              }
            })
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tag{
    cursor: pointer;
  }
  .fm-header{
    height: 50px;
    /*box-shadow: 0 2px 10px rgba(70,160,252, 0.6);*/
    padding: 0 10px;
    position: relative;
    border-bottom: solid 1px #e4e7ed;
    /*border-bottom: ;*/
    .fm-title{
      display: inline-block;
      line-height: 50px;
      vertical-align: middle;
      /*color: #fff;*/
      font-size: 16px;
      font-weight: 600;
      opacity: 0.8;
      margin-left: 6px;
    }
    .fm-select{
      width: 220px;
      float: right;
      display: inline-block;
    }
  }
  .fm-container{
    height: calc(100% - 50px);
  }
  *, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  html,body{
    height: 100%;
  }
</style>
