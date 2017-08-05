require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var cheerio = require('cheerio')
var superagent = require('superagent')
var axios = require('axios')
var defaults = {expiration: 3600}
require('superagent-cache')(superagent, defaults)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

for (let index = 1; index < 11; index++) {
  superagent.get(`https://toutiao.io/subjects/11907?f=new&page=${index}`)
    .end(function (err, sres) {
    });
}

for (let index = 1; index < 11; index++) {
  superagent.get(`https://www.raywenderlich.com/page/${index}`)
    .end(function (err, sres) {
    });
}

for (let index = 1; index < 11; index++) {
  superagent.get(`https://csstricks.com/page/${index}`)
    .end(function (err, sres) {
    });
}

for (let index = 0; index < 10; index++) {
  let page = index * 20
  superagent.get(`https://zhuanlan.zhihu.com/api/columns/wxyyxc1992/posts?limit=20&offset=${index}`)
    .end(function (err, sres) {
    });
}

for (let index = 0; index < 10; index++) {
  let page = index * 20
  superagent.get(`https://zhuanlan.zhihu.com/api/columns/75weekly/posts?limit=20&offset=${index}`)
    .end(function (err, sres) {
    });
}

function getZhiHuData(type, page, res) {
  axios.get(`https://zhuanlan.zhihu.com/api/columns/${type}/posts?limit=20&offset=${page}`)
    .then((response) => {
      let items = []
      let data = {
        items: items,
        hasMore: true
      }
      if (response.data.length < 20) {
        data.hasMore = false
      }
      
      response.data.forEach((ele) => {
        items.push({
          title: ele.title,
          href: 'https://zhuanlan.zhihu.com' + ele.href,
          author: ele.author.name,
          date: ele.publishedTime.toString().match(/(\d{4})-(\d{2})-(\d{2})/)[0] || ''
        })
      })
      res.send(data)
    }).catch((err) => {
      console.log(err)
    })
}

app.get('/api/wxyyxc1992', function (req, res, next) {
  getZhiHuData('wxyyxc1992', parseInt(req.query.page - 1) * 20, res)
});

app.get('/api/75weekly', function (req, res, next) {
  getZhiHuData('75weekly', parseInt(req.query.page - 1) * 20, res)
});

app.get('/api/zaoduke', function (req, res, next) {
  let page = req.query.page
  superagent.get(`https://toutiao.io/subjects/11907?f=new&page=${page}`)
    .end(function (err, sres) {
      if (err) {
        return next(err)
      }
      var $ = cheerio.load(sres.text)
      var items = []
      var data = {
        items: items,
        hasMore: true
      }
      if ($('.post').length < 30) {
        data.hasMore = false
      }
      $('.post').each(function (idx, element) {
        var $element = $(element)
        var $author = $element.find('.meta').contents().filter(function () {
          return this.nodeType === 3;
        });
        items.push({
          title: $element.find('.title>a').text().trim(),
          href: 'https://toutiao.io' + $element.find('.title>a').attr('href'),
          author: $author.text().trim()
        })
      })
      
      res.send(data)
    });
});

app.get('/api/csstricks', function (req, res, next) {
  let page = req.query.page
  superagent.get(`https://css-tricks.com/page/${page}`)
    .end(function (err, sres) {
      if (err) {
        return next(err)
      }
      var $ = cheerio.load(sres.text)
      var items = []
      var data = {
        items: items,
        hasMore: true
      }
      if ($('.content-and-tags').length < 12) {
        data.hasMore = false
      }
      $('.content-and-tags').each(function (idx, element) {
        var $element = $(element)
        items.push({
          title: $element.find('h2>.read-article').text().trim(),
          href: $element.find('h2>.read-article').attr('href'),
          author: $element.find('.p-author').text().trim(),
          date: $element.find('.byline>time').text().trim()
        })
      })
      
      res.send(data
      )
    });
});


app.get('/api/raywenderlich', function (req, res, next) {
  let page = req.query.page
  superagent.get(`https://www.raywenderlich.com/page/${page}`)
    .end(function (err, sres) {
      if (err) {
        return next(err)
      }
      var $ = cheerio.load(sres.text)
      var items = []
      var data = {
        items: items,
        hasMore: true
      }
      if ($('#content>article').length < 15) {
        data.hasMore = false
      }
      $('#content>article').each(function (idx, element) {
        var $element = $(element)
        items.push({
          title: $element.find('.entry-title>a').attr('title'),
          href: $element.find('.entry-title>a').attr('href'),
          author: $element.find('.author-name').text(),
          date: $element.find('.author-post-date').text()
        })
      })
      res.send(data)
    });
});


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
