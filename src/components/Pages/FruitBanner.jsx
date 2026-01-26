import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaWhatsapp, FaShippingFast, FaLeaf } from "react-icons/fa";
import FruitImage from "../../../public/Images/Banner2.jpg";

const FruitBanner = () => {
    return (
        <section
            className="py-5 bg-success bg-opacity-10"
            aria-label="Welcome banner"
        >
            <Container>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    <Row className="align-items-center g-0">
                        {/* Text Section */}
                        <Col md={6} className="p-4 p-md-5 text-center text-md-start">
                            <h1 className="fw-bold mb-3">
                                <span className="text-success">PranaBites</span> - Premium
                                <br />
                                <span className="text-dark">Flavored Dry Fruits</span>
                            </h1>

                            <p className="text-muted fs-5 mb-3">
                                Healthy snacking, full of flavor. Handcrafted in Kolhapur with
                                100% natural ingredients.
                            </p>

                            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start mb-4">
                                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                                    <FaLeaf className="me-1" /> 100% Vegetarian
                                </span>
                                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                                    <FaShippingFast className="me-1" /> Pan India Delivery
                                </span>
                            </div>

                            <Button
                                variant="success"
                                size="lg"
                                className="px-4 rounded-pill"
                                href="https://wa.me/919993069090?text=Hi%20PranaBites!%20I%20want%20to%20know%20more%20about%20your%20products."
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Chat with PranaBites on WhatsApp"
                            >
                                <FaWhatsapp className="me-2 fs-4" aria-hidden="true" />
                                Order on WhatsApp
                            </Button>
                        </Col>

                        {/* Image Section */}
                        <Col md={6} className="text-center p-4">
                            <img
                                src={FruitImage}
                                alt="PranaBites Premium Flavored Dry Fruits - Almonds, Cashews, Pistachios, Raisins from Kolhapur"
                                className="img-fluid rounded-4 shadow"
                                width="600"
                                height="400"
                                loading="eager"
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>
        </section>
    );
};

export default FruitBanner;
