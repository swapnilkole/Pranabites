import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaStar,
    FaLeaf,
    FaBox,
    FaShieldAlt,
    FaInstagram,
} from "react-icons/fa";
import SEO, { generateOrganizationSchema } from "../SEO";
import { StarDisplay } from "../ProductReviews";

// Featured products - using actual store products
const featuredProducts = [
    {
        id: 1,
        name: "Almond Coco Dust (Badam)",
        flavor: "Coconut Dusted",
        price: 305,
        image: "/Images/simpl alm.jpg",
    },
    {
        id: 2,
        name: "Whole Cashew (Kaju)",
        flavor: "Natural Roasted",
        price: 306,
        image: "/Images/simpl cash.jpg",
    },
    {
        id: 3,
        name: "Snack Mix Peri Peri",
        flavor: "Peri Peri Spiced",
        price: 288,
        image: "/Images/mix peri.jpg",
    },
];

const categories = [
    {
        name: "Almonds",
        description: "Premium flavored almonds",
        video: "https://www.pexels.com/download/video/20584219/",
    },
    {
        name: "Cashews",
        description: "Crunchy roasted cashews",
        video: "https://www.pexels.com/download/video/8731105/",
    },
    {
        name: "Raisins",
        description: "Sweet chocolate raisins",
        video: "https://www.pexels.com/download/video/8581284/",
    },
    {
        name: "Pistachios",
        description: "Salted premium pista",
        video: "https://www.pexels.com/download/video/35114260/",
    },
];

const benefits = [
    {
        icon: FaStar,
        title: "Premium Quality",
        description: "Only the finest ingredients sourced from trusted farmers",
        color: "text-warning",
    },
    {
        icon: FaLeaf,
        title: "Unique Flavors",
        description: "Innovative recipes crafted with love in Kolhapur",
        color: "text-success",
    },
    {
        icon: FaBox,
        title: "Fresh Packing",
        description: "Sealed for freshness with 6-month shelf life",
        color: "text-primary",
    },
    {
        icon: FaShieldAlt,
        title: "100% Vegetarian",
        description: "Pure vegetarian products, no artificial preservatives",
        color: "text-secondary",
    },
];

export default function Home() {
    return (
        <main>
            <SEO
                title="Premium Flavored Dry Fruits - Healthy Snacks Online"
                description="PranaBites offers premium flavored dry fruits - Masala Almonds, Honey Cashews, Peri Peri Peanuts & more. 100% vegetarian, made in Kolhapur. Order via WhatsApp!"
                keywords="flavored dry fruits, healthy snacks, masala almonds, honey cashews, peri peri peanuts, premium nuts, PranaBites, Kolhapur"
                canonicalUrl="https://pranabites.com/"
                structuredData={generateOrganizationSchema()}
            />

            {/* Featured Products Section */}
            <section className="py-5 bg-light" aria-labelledby="featured-heading">
                <Container>
                    <header className="text-center mb-4">
                        <h2 id="featured-heading" className="fw-bold">
                            Featured Products
                        </h2>
                        <p className="text-muted">
                            Discover our handpicked selection of premium flavored dry fruits
                        </p>
                    </header>

                    <Row>
                        {featuredProducts.map((product) => (
                            <Col md={4} className="mb-4" key={product.id}>
                                <article>
                                    <Card className="w-100 h-100 position-relative product-card border-0 shadow-sm">
                                        <span className="badge bg-danger position-absolute top-0 start-0 m-2" style={{ zIndex: 1 }}>
                                            Bestseller
                                        </span>

                                        <div className="p-3 bg-light">
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                alt={`${product.name} - ${product.flavor} flavored dry fruit by PranaBites`}
                                                loading="lazy"
                                                className="rounded"
                                                style={{ height: "250px", objectFit: "cover" }}
                                            />
                                        </div>

                                        <Card.Body className="text-center">
                                            {/* Star Rating from ProductReviews */}
                                            <div className="mb-2">
                                                <StarDisplay productName={product.name} />
                                            </div>

                                            <h3 className="h5 mb-1">{product.name}</h3>
                                            <p className="text-muted small mb-2">{product.flavor}</p>

                                            <p className="fw-bold fs-4 mb-1 text-dark">
                                                ₹{product.price}
                                            </p>

                                            <p className="text-success fw-semibold small mb-1">
                                                Save up to 10%
                                            </p>

                                            <p className="text-muted small mb-2">
                                                Delivery in 2-3 days
                                            </p>

                                            <div className="d-flex justify-content-center gap-3 small text-success mb-3">
                                                <span><FaLeaf aria-hidden="true" /> Natural</span>
                                                <span><FaShieldAlt aria-hidden="true" /> Pure</span>
                                            </div>

                                            <Link to="/shop">
                                                <Button variant="warning" className="fw-semibold px-4" aria-label={`Shop ${product.name}`}>
                                                    Add to Cart
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </article>
                            </Col>
                        ))}
                    </Row>

                    <div className="text-center mt-4">
                        <Link
                            to="/shop"
                            className="text-warning fw-semibold text-decoration-none"
                        >
                            View All Products <FaArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Shop by Category Section */}
            <section className="py-5" style={{ backgroundColor: "#FFF7ED" }} aria-labelledby="category-heading">
                <Container>
                    <header className="text-center mb-5">
                        <h2 id="category-heading" className="fw-bold">
                            Shop by Category
                        </h2>
                        <p className="text-muted">
                            Explore our wide range of flavored nuts and dry fruits
                        </p>
                    </header>

                    <Row>
                        {categories.map((category, index) => (
                            <Col md={3} lg={3} className="mb-4" key={index}>
                                <Link
                                    to={`/shop?category=${category.name}`}
                                    className="text-decoration-none"
                                    aria-label={`Shop ${category.name} - ${category.description}`}
                                >
                                    <Card className="category-video-card border-0 position-relative overflow-hidden">
                                        <div className="ratio ratio-1x1">
                                            <video
                                                src={category.video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="category-video"
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <Card.ImgOverlay className="d-flex align-items-end justify-content-center">
                                            <h3 className="h5 bg-white px-3 py-1 rounded fw-semibold">
                                                {category.name}
                                            </h3>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-5 bg-light" aria-labelledby="benefits-heading">
                <Container>
                    <header className="text-center mb-4">
                        <h2 id="benefits-heading" className="fw-bold">
                            Why Choose PranaBites?
                        </h2>
                    </header>

                    <Row>
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <Col md={3} className="mb-3" key={index}>
                                    <Card className="text-center shadow-sm h-100 p-3">
                                        <IconComponent
                                            size={40}
                                            className={`${benefit.color} mb-3 mx-auto`}
                                            aria-hidden="true"
                                        />
                                        <h3 className="h5">{benefit.title}</h3>
                                        <p className="text-muted small">{benefit.description}</p>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>

            {/* Instagram CTA Section */}
            <section className="py-5 text-center" aria-labelledby="instagram-heading">
                <Container>
                    <FaInstagram size={40} className="text-danger mb-2" aria-hidden="true" />
                    <h2 id="instagram-heading" className="fw-bold">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-muted mb-3">
                        Stay updated with new flavors and exclusive offers
                    </p>
                    <a
                        href="https://instagram.com/pranabites_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-danger mt-2"
                        aria-label="Follow PranaBites on Instagram"
                    >
                        @pranabites_
                    </a>
                </Container>
            </section>
        </main>
    );
}
