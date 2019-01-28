<template>
  <main >
    <!-- 主入口标签页 s -->
    <div   v-if="$route.meta.isTab">
      <div class="tags" >
        <ul>
          <li class="tags-li" @click="selectedTabHandle(item)" v-for="(item,index) in mainTabs"  :key="index" :class="{'active': mainTabsActiveName==item.name}">
            <div class="tags-li-title">
              {{item.title}}
              <span class="tags-li-icon" @click="removeTabHandle(item.name)"><i class="el-icon-close"></i></span>
            </div>
          </li>
        </ul>
        <div class="tags-close-box">
          <el-dropdown @command="handleTags">
            <el-button size="mini" >
              标签选项<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu size="small" slot="dropdown">
              <el-dropdown-item  @click.native="tabsCloseOtherHandle">关闭其他</el-dropdown-item>
              <el-dropdown-item @click.native="tabsCloseAllHandle">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
        <el-card :body-style="siteContentViewHeight">
        <transition name="move" mode="out-in">
          <keep-alive :include="mainTabs">
            <router-view ></router-view>
          </keep-alive>
        </transition>
        </el-card>
    </div>
<!--    <el-tabs
      v-if="$route.meta.isTab"
      v-model="mainTabsActiveName"
      :closable="true"
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle">
      <el-dropdown class="site-tabs__tools" :show-timeout="0">
        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <el-card :body-style="siteContentViewHeight">
          <iframe
            v-if="item.type === 'iframe'"
            :src="item.iframeUrl"
            width="100%" height="100%" frameborder="0" scrolling="yes">
          </iframe>
          <keep-alive v-else>
            <router-view v-if="item.name === mainTabsActiveName" />
          </keep-alive>
        </el-card>
      </el-tab-pane>
    </el-tabs>-->
    <!-- 主入口标签页 -->
    <el-card v-else :body-style="siteHomeViewHeight">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-card>
  </main>
</template>

<script>
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {
      }
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight }
      },
      contentViewHeight: {
        get () { return this.$store.state.common.contentViewHeight },
        set (val) { this.$store.commit('common/updateContentViewHeight', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      },
      siteContentViewHeight () {
        let height = this.documentClientHeight - 43
        if (this.$route.meta.isTab) {
          height -= 40
          return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
        }
        this.contentViewHeight = height
        return { minHeight: height + 'px' }
      },
      siteHomeViewHeight () {
        let height = this.documentClientHeight - 53
        if (this.$route.meta.isTab) {
          height -= 40
          return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
        }
        this.contentViewHeight = height
        return { minHeight: height + 'px' }
      }
    },
    methods: {
      // tabs, 选中tab
      selectedTabHandle (tab) {
        tab = this.mainTabs.filter(item => item.name === tab.name)
        if (tab.length >= 1) {
          this.$router.push({ name: tab[0].name })
        }
      },
      handleTags (command) {
        command === 'other' ? this.closeOther() : this.closeAll()
      },
      // tabs, 删除tab
      removeTabHandle (tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({ name: 'home' })
        }
      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle () {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle () {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      // tabs, 关闭全部
      tabsCloseAllHandle () {
        this.mainTabs = []
        this.menuActiveName = ''
        this.$router.push({ name: 'home' })
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle () {
        let tempTabName = this.mainTabsActiveName
        this.removeTabHandle(tempTabName)
        this.$nextTick(() => {
          this.$router.push({ name: tempTabName })
        })
      }
    }
  }
</script>

<style scoped>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
  }

  .tags ul {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    border: 1px solid #409EFF;
    background-color: #409EFF;
    color: #fff;
  }

  .tags-li-title {
    float: left;
    /*max-width: 80px;*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }

  .content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
</style>

