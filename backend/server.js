const jsonServer = require('json-server');
const jwt = require('jsonwebtoken')
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Your database file
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser)

// Add custom middleware for CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const secretKey = "my_secret_key"
// const expiresIn = { expiresIn: "1h"}

function createjwt(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" })
}

server.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const db = router.db
    const user = db.get('users').find({ user: username, password: password }).value()
    if (user) {
        const token = createjwt(user)
        return res.json({ token })
    } else {
        return res.json({ message: "Login failed" })
    }
})

server.use(/^(?!\/login).*$/, (req, res) => {
    const auth = req.headers.authorization
    console.log(auth)
    if (!auth) {
        return res.json({ message: "No Authorization Token exists! Log in to create one!" })
    } else {
        try {
            const token = auth.split(' ')[1]
            jwt.verify(token, secretKey)
            const { username, password } = req.body
            console.log(username, password)
            const db = router.db
            const user = db.get('users').find({ user: username, password: password }).value()
            return res.json({ username })
        } catch (err) {
            return res.json({ Error: err })
        }
    }
})

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

