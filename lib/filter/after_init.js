require('shelljs/global')

module.exports = function() {
  console.log(process.env.NODE_ENV)
  let theme_dir = this.theme.base
  let r_dir = `${theme_dir}r.js`
  let built_dir = `${theme_dir}built.js`

  /**
   *
   * rror: Error: EPERM: operation not permitted, rename
   * 'D:\demo\hexo-blog\themes\huhu\source\scripts\app-built.js-temp'
   * -> 'D:\demo\hexo-blog\themes\huhu\source\scripts\app-built.js'
   * at Object.fs.renameSync (fs.js:766:18)
   */

  // 合并requirejs模块文件
  // 不写回调，就默认为同步
  // todo 书写回调后，就默认异步，但hexo s时会出现上述报错，目测是windows下文件权限问题
  exec(`node ${r_dir} -o ${built_dir}`)
}
