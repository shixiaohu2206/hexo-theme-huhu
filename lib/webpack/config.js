const config = {
  entry: './path/to/my/entry/file.js'
}

module.exports = function(hexo) {
  const theme_dir = hexo.theme.base

  console.log(`${theme_dir}source\\lib\\index.js`)

  return {
    entry: `${theme_dir}source\\lib\\index.js`,
    output: {
      filename: 'app.js',
      path: `${theme_dir}source\\lib`
    }
  }
}
