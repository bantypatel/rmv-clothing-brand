import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'react-bootstrap';

const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "A minimalist white cotton t-shirt for everyday wear.",
    price: 25,
    category: "men",
  },
  {
    id: 2,
    name: "Black Graphic Hoodie",
    description: "Oversized black hoodie with subtle branding.",
    price: 65,
    category: "men",
  },
  {
    id: 3,
    name: "White Linen Shirt",
    description: "Breathable white linen shirt for summer.",
    price: 45,
    category: "men",
  },
  {
    id: 4,
    name: "Black Skinny Jeans",
    description: "Slim-fit black jeans with stretch fabric.",
    price: 80,
    category: "men",
  },
  {
    id: 5,
    name: "White Summer Dress",
    description: "Flowy white dress for warm weather.",
    price: 55,
    category: "women",
  },
  {
    id: 6,
    name: "Black Off-Shoulder Top",
    description: "Elegant black top for evening occasions.",
    price: 40,
    category: "women",
  },
  {
    id: 7,
    name: "White Wide-Leg Pants",
    description: "Comfortable white wide-leg trousers.",
    price: 70,
    category: "women",
  },
  {
    id: 8,
    name: "Black Blazer",
    description: "Tailored black blazer for formal wear.",
    price: 120,
    category: "women",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="py-3 border-b border-black/10">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">RMV</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => alert('Cart functionality is client-side only')}>Cart</Button>
          </div>
        </div>
      </nav>

      <main className="container max-w-7xl mx-auto py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Product Catalog</h2>
          <p className="text-gray-600 mb-6">Browse our minimal black-and-white clothing collection</p>
          <Row className="g-4" id="product-grid">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <CardBody className="flex flex-col h-100">
                    <CardTitle className="text-center text-lg font-medium mb-2">{product.name}</CardTitle>
                    <CardText className="text-center text-sm text-gray-500 flex-grow">{product.description}</CardText>
                    <div className="mt-auto d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-28"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mt-8" id="cart-section">
          <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <ListGroup>
              {cart.map((item) => (
                <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center py-3">
                  <span>{item.name}</span>
                  <span className="text-primary">${item.price}</span>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
          <div className="mt-4 pt-4 border-t border-black/10">
            <h3 className="text-lg font-medium mb-3">Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</h3>
            <Button
              variant="danger"
              size="sm"
              className="w-100"
              onClick={() => setCart([])}
            >
              Clear Cart
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;