var fs = require('fs')
var readDir = fs.readdirSync('./')

function getTitle(url,callback){
    fs.readFile(url, "utf-8", function(error, data) {
      var title = data.match(/<title>.*?<\/title>/)[0].replace(/<\/?.+?\/?>/g,'')
      callback(title)
    });
}

var html = ''
readDir.map(item => {
  if (item.indexOf('.html') !== -1) {
    getTitle(item,function(title){
      html += `<p><a target="_blank" href='./${item}'>${title}</a></p>`
    })
  }
})



setTimeout(function(){
  var demo = `<!DOCTYPE html>
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
  console.log(html);
  fs.writeFile('nav.html', demo, function(err) {
    if (err) {
      return console.error(err)
    }
  })
},2000)
