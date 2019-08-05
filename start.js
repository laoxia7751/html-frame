var fs = require('fs')
var readDir = fs.readdirSync('./')

function getTitle(url, index) {
  return new Promise(function (resolve, resject) {
    fs.readFile(url, "utf-8", function (error, data) {
      var title = data.match(/<title>.*?<\/title>/)[0].replace(/<\/?.+?\/?>/g, '')
      resolve({ title, index })
    });
  })
}

function listInfo() {
  let html = '';
  let htmlList = readDir.filter(item => item.indexOf('.html') > -1 && item.indexOf('nav') < 0)
  let list = new Promise(function (resolve) {
    htmlList.map((item, index) => {
      getTitle(item, index).then(function (res) {
        html += `<p><a target="_blank" href='./${item}'>${res.title}</a></p>`
        res.index == htmlList.length - 1 && resolve(html)
      })
    })
  })
  return list
}

listInfo().then(function (html) {
  var htmlTemplate = `<!DOCTYPE html>
  <html lang="zh-cn">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      body{padding-top: 0;font-family: Microsoft YaHei;font-size: 20px;text-align: center;}
      a {
        text-decoration: none;
        font-size: 18px;
        margin-bottom: 15px;
        color: #666;
        line-height: 40px;
      }
    </style>
  </head>

  <body>
      ${html}
  </body>

  </html>`

  fs.writeFile('nav.html', htmlTemplate, function (err,data) {
    if (err) {
      console.error(err)
    } else {
      console.log('生成成功');
    }
  })
})