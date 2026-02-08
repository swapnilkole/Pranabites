import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeart, FaBullseye, FaAward, FaUsers, FaWhatsapp } from "react-icons/fa";
import "../../css/About.css";
import SEO, { generateOrganizationSchema } from "../SEO";

const values = [
    {
        icon: FaAward,
        title: "Quality First",
        description: "We never compromise on ingredients or product quality",
        color: "text-warning",
    },
    {
        icon: FaHeart,
        title: "Made with Love",
        description: "Every product is crafted with passion and care",
        color: "text-success",
    },
    {
        icon: FaBullseye,
        title: "Innovation",
        description: "Unique and exciting flavor combinations",
        color: "text-primary",
    },
    {
        icon: FaUsers,
        title: "Customer Focus",
        description: "Your health & satisfaction come first",
        color: "text-purple",
    },
];

const About = () => {
    return (
        <main className="about-page">
            <SEO
                title="About Us - Our Story & Mission"
                description="Learn about PranaBites - Kolhapur's premium flavored dry fruits brand. Our story, values, and commitment to healthy snacking with 100% vegetarian products."
                keywords="about PranaBites, dry fruits Kolhapur, healthy snacks company, vegetarian snacks brand, flavored nuts India"
                canonicalUrl="https://pranabites.com/about"
                structuredData={generateOrganizationSchema()}
            />

            {/* Hero Section */}
            <section className="about-hero" aria-labelledby="about-heading">
                <Container className="text-center">
                    <h1 id="about-heading">About PranaBites</h1>
                    <p>Making healthy snacking tasty, one bite at a time</p>
                </Container>
            </section>

            {/* Our Story Section */}
            <section className="py-5" aria-labelledby="story-heading">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4">
                            <img
                                src="https://i.pinimg.com/736x/27/7f/35/277f35c52c8af10c0c11c92ba9c05c15.jpg"
                                alt="PranaBites Story - Premium dry fruits preparation in Kolhapur"
                                className="img-fluid rounded shadow story-img"
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                        </Col>

                        <Col md={6}>
                            <h2 id="story-heading" className="section-title">Our Story</h2>
                            <p>
                                Born in the heart of Kolhapur, Maharashtra, PranaBites started with a simple belief:
                                healthy snacking doesn't have to be boring.
                            </p>
                            <p>
                                We transform premium dry fruits into exciting, flavorful snacks using traditional
                                and international flavors - from classic Indian masala to tangy peri peri.
                            </p>
                            <p>
                                Today, PranaBites stands for quality, innovation, and joyful healthy snacking
                                that families across India love.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Our Values Section */}
            <section className="values-section" aria-labelledby="values-heading">
                <Container>
                    <h2 id="values-heading" className="section-title text-center mb-5">Our Values</h2>
                    <Row>
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <Col md={3} sm={6} className="mb-4" key={index}>
                                    <Card className="value-card text-center h-100">
                                        <IconComponent
                                            className={`value-icon ${value.color}`}
                                            aria-hidden="true"
                                        />
                                        <h3 className="h5">{value.title}</h3>
                                        <p>{value.description}</p>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>

            {/* Our Mission Section */}
            <section className="py-5 bg-light" aria-labelledby="mission-heading">
                <Container className="text-center">
                    <h2 id="mission-heading" className="section-title">Our Mission</h2>
                    <p className="mission-text">
                        To make healthy snacking delightful by offering premium flavored dry fruits that are
                        nutritious, delicious, and accessible to everyone across India.
                    </p>
                    <div className="mission-badge" aria-label="Tagline">
                        "Healthy Snacking, Full of Flavor"
                    </div>
                </Container>
            </section>

            {/* Why Choose Us Section */}
            <section className="choose-us" aria-labelledby="choose-heading">
                <Container>
                    <h2 id="choose-heading" className="section-title text-center text-white mb-5">
                        Why Choose PranaBites?
                    </h2>
                    <Row className="text-center text-white">
                        <Col md={4} className="mb-3">
                            <p className="display-4 fw-bold mb-0">100%</p>
                            <p>Vegetarian Products</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <p className="display-4 fw-bold mb-0">3 Months</p>
                            <p>Shelf Life Guarantee</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <p className="display-4 fw-bold mb-0">Premium</p>
                            <p>Quality Ingredients</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-5 text-center" aria-labelledby="cta-heading">
                <Container>
                    <h2 id="cta-heading" className="section-title">Experience the PranaBites Difference</h2>
                    <p className="text-muted mb-4">
                        Join our growing family of happy customers and enjoy healthy snacking
                    </p>
                    <Button
                        href="https://wa.me/919993069090?text=Hi%20PranaBites!%20I%20learned%20about%20you%20and%20want%20to%20order."
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="success"
                        size="lg"
                        className="rounded-pill px-5"
                        aria-label="Contact PranaBites on WhatsApp"
                    >
                        <FaWhatsapp className="me-2" aria-hidden="true" />
                        Get in Touch on WhatsApp
                    </Button>
                </Container>
            </section>
        </main>
    );
};

export default About;
