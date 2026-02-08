import React from "react";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/FAQ.css";
import SEO from "../SEO";

const faqs = [
    {
        question: "What is the shelf life of your products?",
        answer: "All our products have a shelf life of 3 months from the date of packaging. We ensure fresh packing and sealed packaging to maintain quality.",
    },
    {
        question: "How do I place an order?",
        answer: "You can click the 'Order on WhatsApp' button or contact us directly at +91 99930 69090. We accept orders via WhatsApp for quick processing.",
    },
    {
        question: "Are your products vegetarian?",
        answer: "Yes, all PranaBites products are 100% vegetarian. We use only pure vegetarian ingredients with no artificial preservatives.",
    },
    {
        question: "Do you offer bulk orders or corporate gifting?",
        answer: "Yes! We provide special pricing for bulk orders and corporate gifting. Contact us on WhatsApp for customized quotes and packaging options.",
    },
    {
        question: "What are your delivery options?",
        answer: "We deliver across India via trusted courier partners. Delivery typically takes 3-5 business days. Delivery charges and details are shared via WhatsApp.",
    },
    {
        question: "Where is PranaBites located?",
        answer: "PranaBites is based in Kolhapur, Maharashtra, and we ship our premium flavored dry fruits all over India.",
    },
];

// Generate FAQ Schema for SEO
const generateFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
});

const FAQ = () => {
    return (
        <main>
            <SEO
                title="FAQ - Frequently Asked Questions"
                description="Find answers to common questions about PranaBites - shelf life, ordering process, delivery, bulk orders, and more. Contact us on WhatsApp for quick support."
                keywords="PranaBites FAQ, dry fruits questions, order dry fruits online, bulk order dry fruits, delivery India, vegetarian snacks"
                canonicalUrl="https://pranabites.com/faq"
                structuredData={generateFAQSchema()}
            />

            {/* Hero Section */}
            <section className="faq-hero" aria-labelledby="faq-heading">
                <Container className="text-center">
                    <h1 id="faq-heading">Frequently Asked Questions</h1>
                    <p>Everything you need to know about PranaBites</p>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="py-5" aria-labelledby="questions-heading">
                <Container>
                    <h2 id="questions-heading" className="visually-hidden">
                        Common Questions
                    </h2>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Accordion defaultActiveKey="0">
                                {faqs.map((faq, index) => (
                                    <Accordion.Item
                                        eventKey={index.toString()}
                                        key={index}
                                        className="faq-item"
                                    >
                                        <Accordion.Header>
                                            {faq.question}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {faq.answer}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* WhatsApp CTA */}
            <section className="faq-whatsapp text-center" aria-labelledby="support-heading">
                <Container>
                    <h2 id="support-heading">Still Have Questions?</h2>
                    <p>Chat with us on WhatsApp for instant support</p>
                    <Button
                        href="https://wa.me/919993069090?text=Hi%20PranaBites!%20I%20have%20a%20question."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                        aria-label="Chat with PranaBites support on WhatsApp"
                    >
                        <FaWhatsapp className="me-2" aria-hidden="true" />
                        Chat on WhatsApp
                    </Button>
                </Container>
            </section>

            {/* Quick Links */}
            <section className="py-5" aria-labelledby="links-heading">
                <Container>
                    <h2 id="links-heading" className="text-center mb-4">Quick Links</h2>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Card className="quick-card h-100">
                                <Card.Body className="text-center">
                                    <h3 className="h5">Browse Products</h3>
                                    <p className="text-muted">Explore our premium dry fruits</p>
                                    <Button
                                        as={Link}
                                        to="/shop"
                                        variant="outline-success"
                                    >
                                        Shop Now
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4} className="mb-3">
                            <Card className="quick-card h-100">
                                <Card.Body className="text-center">
                                    <h3 className="h5">About Us</h3>
                                    <p className="text-muted">Know our journey & values</p>
                                    <Button
                                        as={Link}
                                        to="/about"
                                        variant="outline-success"
                                    >
                                        Learn More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4} className="mb-3">
                            <Card className="quick-card h-100">
                                <Card.Body className="text-center">
                                    <h3 className="h5">Contact Us</h3>
                                    <p className="text-muted">We'd love to hear from you</p>
                                    <Button
                                        as={Link}
                                        to="/contact"
                                        variant="outline-success"
                                    >
                                        Contact
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default FAQ;
