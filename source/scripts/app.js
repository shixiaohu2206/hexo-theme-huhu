require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: [
      'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
      'jquery' //If the CDN location fails, load from this location
    ]
  },
  waitSeconds: 15
})
