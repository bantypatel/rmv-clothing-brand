import React, { useState } from 'react'
import { Container, Row, Col, Button, Navbar, Nav, NavItem, NavLink, Form, Input, Label } from 'react-bootstrap'
import products from './products.json'

function ProductCard({ product, onAddToCart }) {
  return (
    <Card style={{ width: '18rem' }} className="h-100">
      <Card.Img top src={product.image} alt={product.name} className="h-50" />
      <Card.Body className="p-3">
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Card.Text className="card-text">${product.price.toFixed(2)}</Card.Text>
        <Button variant="primary" className="w-100 mt-2" onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  )
}

function ProductGrid({ products, filteredProducts, onAddToCart }) {
  return (
    <Row className="g-4">
      {filteredProducts.map((product) => (
        <Col key={product.id} xs={12} md={6} lg={4} xl={3}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  )
}

function CartItem({ item, onRemove, onIncrement, onDecrement }) {
  return (
    <Row className="mb-3 align-items-center">
      <Col xs={4}>
        <img src={item.product.image} alt={item.product.name} className="img-fluid" style={{ maxWidth: '80px', height: 'auto' }} />
      </Col>
      <Col xs={4}>
        <strong>{item.product.name}</strong>
      </Col>
      <Col xs={2}>
        <Button variant="outline" size="sm" onClick={() => onDecrement(item.id)}>-</Button>
      </Col>
      <Col xs={2}>{item.quantity}</Col>
      <Col xs={2}>
        <Button variant="outline" size="sm" onClick={() => onIncrement(item.id)}>+</Button>
      </Col>
      <Col xs={2}>
        <Button variant="danger" size="sm" onClick={() => onRemove(item.id)}>Remove</Button>
      </Col>
    </Row>
  )
}

function Cart({ items, onRemove, onIncrement, onDecrement, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return (
    <Card>
      <Card.Body>
        <h5 className="card-title">Cart Summary</h5>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <Row className="mb-3">{items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}</Row>)
        )}
        <Row className="mt-4 justify-content-between">
          <Col>
            <strong>Total: ${total.toFixed(2)}</strong>
          </Col>
          <Col>
            <Button variant="primary" onClick={onCheckout} className="w-100">Proceed to Checkout</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !phone || !address) {
      setStatus('Please fill in all fields')
      return
    }
    if (!/^\+?[0-9\s-]{10,}$/.test(phone)) {
      setStatus('Please enter a valid phone number')
      return
    }
    const whatsappText = `Hello! I would like to place an order:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nItems: ${items.map(i => i.product.name + ' x ' + i.quantity).join(', ')}\nTotal: $${total.toFixed(2)}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`
    setStatus({ type: 'success', url: whatsappUrl })
  }

  return (
    <Card>
      <Card.Body>
        <h5 className="card-title">Checkout</h5>
        {status && status.type === 'success' ? (
          <div className="alert alert-success mt-3">
            Order submitted! WhatsApp message pre-filled.\n<a href={status.url} target="_blank" rel="noopener noreferrer" className="alert-link">Open WhatsApp</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3">
            <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="/^[+]?[0-9\s-]{10,}$/" />
            <Input type="textarea" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} required /></Input>
            <Button type="submit" className="w-100 mt-3">Place Order</Button>
          </form>
        )}
      </Card.Body>
    </Card>
  )
}

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setStatus('Please fill in all fields')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email')
      return
    }
    setStatus('Thank you! We will get back to you soon.')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <Card>
      <Card.Body>
        <h5 className="card-title">Contact Us</h5>
        <form onSubmit={handleSubmit} className="mt-3">
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Input>
          <Input type="textarea" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} required /></Input>
          <Button type="submit" className="w-10 mt-3">Send Message</Button>
        </form>
        {status && <p className="mt-3">{status}</p>}
      </Card.Body>
    </Card>
  )
}

const products = productsData

function App() {
  const [cart, setCart] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [genderFilter, setGenderFilter] = useState('')

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.product.id !== id))

  const incrementQuantity = (id) =>
    setCart((prev) => prev.map((item) => item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item))

  const decrementQuantity = (id) =>
    setCart((prev) => prev.map((item) => item.product.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))

  const handleCheckout = () => {
    if (cart.length === 0) return
    onSubmit(cart)
  }

  const filtered = products.filter((p) => !genderFilter || p.gender === genderFilter)
  setFilteredProducts(filtered)

  return (
    <div className="min-vh-100 bg-light">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Rmv Clothing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto" id="basic-navbar-nav">
            <NavLink href="/catalog">Product Catalog</NavLink>
            <NavLink href="#cart">Cart</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="my-5">
        {window.location.pathname === "/catalog" || window.location.pathname === '' ? (
          <div>
            <h1 className="text-center mb-4">Product Catalog</h1>
            <Row className="mb-3">
              <Col xs={12} md={3}>
                <Label>Filter by Gender</Label>
                <select
          className="form-select"
          onChange={(e) => setGenderFilter(e.target.value)}
          >
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          </select>
              </Col>
            </Row>
            <ProductGrid products={products} filteredProducts={filteredProducts} onAddToCart={addToCart} />
          </div>
        ) : (
          <div>
            <h1 className="text-center mb-4">Your Cart</h1>
            <Cart
              items={cart}
              onRemove={removeFromCart}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </Container>

      <footer className="mt-5 text-center py-3" style={{ fontSize: '0.9rem', color: '#666' }}">
        Rmv Clothing Brand &copy; 2024
      </footer>
    </div>
  )
}

export default App
