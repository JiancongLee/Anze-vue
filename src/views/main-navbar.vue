<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">小杂铺</a>
        <a class="site-navbar__brand-mini" href="javascript:;">Anze</a>
      </h1>
    </div>

    <div class="site-navbar__body clearfix">
      <hamburger :toggle-click="toggleSideBar" class="hamburger-container" :is-active="sidebarFold"/>

      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">

        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
             {{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import NabarMenu from './main-nabar-menu'
  import { clearLoginInfo } from '@/utils'
  // import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  // import Screenfull from '@/components/Screenfull'

  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        indexNav: [],
        activeIndex: '1',
        items: [{
          text: 'Admin',
          href: '#'
        }, {
          text: 'Manage',
          href: '#'
        }, {
          text: 'Library',
          active: true
        }]
      }
    },
    components: {
      UpdatePassword,
      NabarMenu,
      Hamburger
      // Breadcrumb
      // Screenfull
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      // 加载数据
      loadData () {
        this.$http({
          url: this.$http.adornUrl('/sys/menu/mainNav'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.indexNav = data.list
            if (data.list.length > 0) {
              this.activeIndex = data.list[0].menuId
              this.$emit('change', this.activeIndex)
            }
          }
        })
      },
      handleSelect (key, keyPath) {
        this.$emit('change', key)
      },
      // 点击收缩伸展左边
      toggleSideBar () {
        let val = !this.$store.state.common.sidebarFold
        this.$store.commit('common/updateSidebarFold', val)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
</style>
