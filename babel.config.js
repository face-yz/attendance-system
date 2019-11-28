/*
 * @Description: Babel配置文件
 * @Author: Jensen
 * @Github: https://github.com/Jensen02
 * @Date: 2019-09-15 21:59:05
 * @LastEditors: Jensen
 * @LastEditTime: 2019-09-15 22:51:28
 */
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
