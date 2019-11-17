const _ = require('lodash')
const cheerio = require('cheerio')

function handleContent(html) {
  if (_.isEmpty(html)) return ''

  const $ = cheerio.load(html, { decodeEntities: false })

  // support fancybox
  $('img').each(function() {
    let src = $(this).attr('src') || ''
    let title = $(this).attr('title') || $(this).attr('alt') || ''
    $(this).after(
      `<a href="${src}" data-caption="${title}" data-fancybox="images"><img src="${src}" alt="${title}"></a>`
    )
    $(this).remove()
  })

  $('h1,h2,h3,h4,h5,h6').each(function() {
    let id = $(this).attr('id')
    $(this).append(`<a class="post-anchor" href="#${id}"></a>`)
    $(this).find('.headerlink').remove()
  })

  return $.html()
}

module.exports = function(data) {
  if (data.layout !== 'page' && data.layout !== 'post') return
  data.content = handleContent(data.content)
  return data
}
