const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('view cache', false)
app.set('view engine', 'njk')

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
const pages = ['about', 'contact']

pages.forEach( page => {
  app.get('/'+page, function (req, res) {
    res.render(page)
  })
})

const products = []
function addProduct(name, price, description, count) {
  products.push({name, price, description, count})
}

addProduct('ociekacz do naczyń', 20, 'Fenomenalny.', 10);
addProduct('ociekacz do naczyń', 20, 'Fenomenalny.', 10);
addProduct('ociekacz do naczyń', 20, 'Fenomenalny.', 10);
addProduct('ociekacz do naczyń', 20, 'Fenomenalny.', 10);
addProduct('ociekacz do naczyń', 20, 'Fenomenalny.', 10);

addProduct('krzesło', 200, 'Wygodne', 5);
addProduct('krzywik', 3, 'Doskonały.', 500)

app.post('/contact', function (req, res) {
  console.log(req.body);
  res.render('contact', { name: req.body.name });
})

function test(product) {
  return true;
}

app.get('/products', function (req, res) {
  res.render('products', { name: req.query.name, products: products.filter(test) });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))