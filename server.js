var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号，使用格式为\nnode server.js 8888 ')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('请求到达，路径（带查询参数）为：' + pathWithQuery)


    response.statusCode = 200
    // 默认首页
    const filePath = path === '/' ? '/index.html' : path
    // lastIndexOf()从字符串末尾开始检索，返回子字符的下标
    const index = filePath.lastIndexOf('.')
    // 返回从指定下标index开始的字符串
    // suffix 是后缀
    const suffix = filePath.substring(index)
    const fileTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.xml': 'text/xml',
        '.json': 'text/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    }
    response.setHeader('Content-Type',
        `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public${filePath}`)
    } catch (error) {
        content = '路径不合法'
        response.statusCode = 404
    }
    response.write(content)
    response.end()

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n端口将打开在： http://localhost:' + port)
