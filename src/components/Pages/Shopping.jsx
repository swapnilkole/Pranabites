import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import SEO, { generateProductListSchema } from "../SEO";
import { StarDisplay } from "../ProductReviews";
import ProductDetail from "../ProductDetail";

// Calculate fake MRP for visual "10% OFF" display only
const calculateMRP = (price) => Math.ceil((price / 0.9) / 5) * 5;

const products = [
    {
        category: "Dry Fruits",
        items: [
            {
                name: "Almond Coco Dust (Badam)",
                flavor: "Coconut Dusted",
                prices: { "200g": 305, "250g": 345 },
                images: ["/Images/simpl alm.jpg", "/Images/Almond Front.jpeg"],
                keywords: "almonds, badam, coconut flavor, healthy snack",
            },
            {
                name: "Whole Cashew (Kaju)",
                flavor: "Natural Roasted",
                prices: { "200g": 306, "250g": 365 },
                images: ["/Images/simpl cash.jpg", "/Images/Cashew Front.jpeg"],
                keywords: "cashews, kaju, roasted, premium nuts",
            },
            {
                name: "Cashew Cheese & Herbs (Kaju)",
                flavor: "Cheese & Herbs",
                prices: { "200g": 347, "250g": 414 },
                images: ["/Images/cheese cash.jpg", "/Images/Cashew Chesse & Herbs Front.jpeg"],
                keywords: "cashews, cheese flavor, herbs, savory snack",
            },
            {
                name: "Raisin Milk (Kishmish)",
                flavor: "Milk Chocolate",
                prices: { "200g": 252, "250g": 295 },
                images: ["/Images/Milk Rais.jpg", "/Images/Choculate Raisin Milk Front.jpeg"],
                keywords: "raisins, kishmish, chocolate, sweet snack",
            },
            {
                name: "Pistachios (Pista)",
                flavor: "Salted Premium",
                prices: { "200g": 365, "250g": 432 },
                images: ["/Images/s.jpg", "/Images/Pista Front.jpeg"],
                keywords: "pistachios, pista, salted, premium nuts",
            },
            {
                name: "Almond Barbeque (Badam)",
                flavor: "BBQ Spiced",
                prices: { "200g": 325, "250g": 387 },
                images: ["/Images/BBQ.jpg", "/Images/Almond BBQ Front.jpeg"],
                keywords: "almonds, badam, barbeque, spicy snack",
            },
        ],
    },
    {
        category: "Nuts",
        items: [
            {
                name: "Snack Mix Peri Peri",
                flavor: "Peri Peri Spiced",
                prices: { "200g": 288, "250g": 345 },
                images: ["/Images/mix peri.jpg", "/Images/Mix Periperi Front.jpeg"],
                keywords: "snack mix, peri peri, spicy, mixed nuts",
            },
        ],
    },
];

// Flatten products for schema
const allProducts = products.flatMap((section) =>
    section.items.map((item) => ({
        ...item,
        category: section.category,
    }))
);

const Shopping = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleAddToCart = (item, selectedWeight) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.error("Please login or register first");
            navigate("/login");
            return;
        }

        const cartItem = {
            name: item.name,
            weight: selectedWeight,
            price: item.prices[selectedWeight],
            image: item.images[0],
            quantity: 1,
        };

        const newCart = [...cart, cartItem];
        saveCart(newCart);

        toast.success(`${item.name} (${selectedWeight}) added to cart`);
    };

    const handleProductClick = (item) => {
        setSelectedProduct(item);
        setShowDetail(true);
    };

    const generateAltText = (item, viewIndex) => {
        const views = ["front view", "package view"];
        return `${item.name} - ${item.flavor} flavored dry fruit by PranaBites - ${views[viewIndex] || `image ${viewIndex + 1}`}`;
    };

    return (
        <main className="py-5">
            <SEO
                title="Shop Flavored Dry Fruits - Premium Almonds, Cashews, Pistachios"
                description="Buy premium flavored dry fruits online at PranaBites. Choose from Coconut Almonds, Cheese Cashews, BBQ Almonds, Peri Peri Mix & more. Free delivery in Kolhapur!"
                keywords="buy dry fruits online, flavored almonds, cashews online, pistachios, healthy snacks India, PranaBites shop, premium nuts"
                canonicalUrl="https://pranabites.com/shop"
                structuredData={generateProductListSchema(allProducts)}
            />

            <Container>
                <header className="text-center mb-5">
                    <h1 className="fw-bold text-success">
                        Premium Flavored Dry Fruits Collection
                    </h1>
                    <p className="text-muted lead">
                        Handpicked, freshly packed, and delivered with love from Kolhapur
                    </p>
                </header>

                {products.map((section, sectionIndex) => (
                    <section
                        key={sectionIndex}
                        className="mb-5"
                        aria-labelledby={`category-${sectionIndex}`}
                    >
                        <h2
                            id={`category-${sectionIndex}`}
                            className="fw-semibold mb-4 border-bottom pb-2"
                        >
                            {section.category}
                        </h2>

                        <Row>
                            {section.items.map((item, itemIndex) => (
                                <Col md={4} sm={6} key={itemIndex} className="mb-4">
                                    <article className="h-100">
                                        <Card className="border-0 shadow-sm h-100 product-card">
                                            <Carousel
                                                controls={false}
                                                indicators={false}
                                                interval={2500}
                                            >
                                                {item.images.map((img, imgIndex) => (
                                                    <Carousel.Item key={imgIndex}>
                                                        <img
                                                            src={img}
                                                            alt={generateAltText(item, imgIndex)}
                                                            className="w-100 product-image"
                                                            loading="lazy"
                                                            width="400"
                                                            height="400"
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>

                                            <Card.Body className="text-center">
                                                <h3 className="h5 fw-semibold mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-muted small mb-2">
                                                    {item.flavor}
                                                </p>

                                                {/* Star Rating */}
                                                <div className="mb-3">
                                                    <StarDisplay productName={item.name} />
                                                </div>

                                                {/* Price Display */}
                                                {Object.entries(item.prices).map(([weight, price]) => {
                                                    const mrp = calculateMRP(price);
                                                    return (
                                                        <div
                                                            key={weight}
                                                            className="d-flex justify-content-between align-items-center mb-2 px-2"
                                                        >
                                                            <span className="text-muted">{weight}</span>
                                                            <div className="text-end">
                                                                <small className="text-muted text-decoration-line-through me-1">
                                                                    ₹{mrp}
                                                                </small>
                                                                <span className="fw-bold text-success">₹{price}</span>
                                                                <Badge bg="danger" className="ms-1" style={{ fontSize: "0.65rem" }}>
                                                                    10% OFF
                                                                </Badge>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="success"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAddToCart(item, weight);
                                                                }}
                                                                aria-label={`Add ${item.name} ${weight} pack to cart for ₹${price}`}
                                                            >
                                                                Add
                                                            </Button>
                                                        </div>
                                                    );
                                                })}

                                                {/* View Details Button */}
                                                <Button
                                                    variant="outline-success"
                                                    className="w-100 mt-2"
                                                    onClick={() => handleProductClick(item)}
                                                >
                                                    <FaEye className="me-2" />
                                                    View Details
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </article>
                                </Col>
                            ))}
                        </Row>
                    </section>
                ))}

                {cart.length > 0 && (
                    <aside className="text-center mt-4 sticky-bottom bg-white py-3 border-top">
                        <Button
                            variant="warning"
                            size="lg"
                            onClick={() => navigate("/cart")}
                            aria-label={`View cart with ${cart.length} items`}
                        >
                            View Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
                        </Button>
                    </aside>
                )}
            </Container>

            {/* Product Detail Modal */}
            <ProductDetail
                show={showDetail}
                onHide={() => setShowDetail(false)}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
            />
        </main>
    );
};

export default Shopping;
