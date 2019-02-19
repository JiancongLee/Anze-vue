/**
 * 字体图标, 统一使用SVG Sprite矢量图标(http://www.iconfont.cn/）
 *
 * 使用:
 *  1. 在阿里矢量图标站创建一个项目, 并添加图标(这一步非必须, 创建方便项目图标管理)
 *  2-1. 添加icon, 选中新增的icon图标, 复制代码 -> 下载 -> SVG下载 -> 粘贴代码(重命名)
 *  2-2. 添加icons, 下载图标库对应[iconfont.js]文件, 替换项目[./iconfont.js]文件
 *  3. 组件模版中使用 [<icon-svg name="canyin"></icon-svg>]
 *
 * 注意:
 *  1. 通过2-2 添加icons, getNameList方法无法返回对应数据
 */
import Vue from 'vue'
import IconSvg from '@/components/icon-svg'
import './iconfont.js'

Vue.component('IconSvg', IconSvg)

const svgFiles = require.context('./svg', true, /\.svg$/)
const iconList = svgFiles.keys().map(item => svgFiles(item))

const svgFiles1 = require.context('./svg/list1', true, /\.svg$/)
const iconList1 = svgFiles1.keys().map(item => svgFiles1(item))

const svgFiles2 = require.context('./svg/list2', true, /\.svg$/)
const iconList2 = svgFiles2.keys().map(item => svgFiles2(item))

const svgFiles3 = require.context('./svg', true, /\.svg$/)
const iconList3 = svgFiles3.keys().map(item => svgFiles3(item))

const svgFiles4 = require.context('./svg', true, /\.svg$/)
const iconList4 = svgFiles4.keys().map(item => svgFiles4(item))

export default {
  // 获取图标icon-(*).svg名称列表, 例如[shouye, xitong, zhedie, ...]
  getNameList () {
    return iconList.map(item => item.default.id.split('-')[1])
  },
  getNameList1 () {
    return iconList1.map(item => item.default.id.split('-')[1])
  },
  getNameList2 () {
    return iconList2.map(item => item.default.id.split('-')[1])
  },
  getNameList3 () {
    return iconList3.map(item => item.default.id.split('-')[1])
  },
  getNameList4 () {
    return iconList4.map(item => item.default.id.split('-')[1])
  }
}
