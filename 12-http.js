const http = require('http')

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end('Welcome to our home page')
    }
    if(req.url === '/about'){
        res.end('This is our short story')
    }
//     res.end(`
//     <h1>OOPs!</h1>
// <p>The page you are looking for is not found!</p>
// <a href = "/">Back home</a>
//     `)
})

server.listen(5000)