import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MapPin, MessageCircle, Instagram, Clock, Phone } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import "../../css/contact.css";
import SEO, { generateLocalBusinessSchema } from "../SEO";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error("Please enter your name");
            return false;
        }
        if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.trim())) {
            toast.error("Please enter a valid 10-digit phone number");
            return false;
        }
        if (!formData.message.trim()) {
            toast.error("Please enter your message");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const msg = `📩 *New Contact from PranaBites Website*\n\n` +
            `👤 Name: ${formData.name}\n` +
            `📧 Email: ${formData.email || "Not provided"}\n` +
            `📞 Phone: ${formData.phone}\n\n` +
            `💬 Message:\n${formData.message}`;

        window.open(
            `https://wa.me/919993069090?text=${encodeURIComponent(msg)}`,
            "_blank"
        );

        toast.success("Redirecting to WhatsApp...");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSubmitting(false);
    };

    return (
        <main>
            <SEO
                title="Contact Us - Get in Touch"
                description="Contact PranaBites for orders, queries, or bulk inquiries. Reach us via WhatsApp at +91 99930 69090 or visit our store in Kolhapur, Maharashtra."
                keywords="contact PranaBites, WhatsApp order, dry fruits Kolhapur, bulk order dry fruits, customer support"
                canonicalUrl="https://pranabites.com/contact"
                structuredData={generateLocalBusinessSchema()}
            />

            {/* Hero Section */}
            <section className="contact-hero text-center" aria-labelledby="contact-heading">
                <h1 id="contact-heading">Contact Us</h1>
                <p>We're just one message away</p>
            </section>

            <Container className="my-5">
                {/* Contact Cards */}
                <Row className="g-4 mb-5" aria-label="Contact information">
                    <Col md={4}>
                        <Card className="contact-card text-center h-100">
                            <MessageCircle className="icon whatsapp" aria-hidden="true" />
                            <h2 className="h5">WhatsApp</h2>
                            <p>Quick Response</p>
                            <a
                                href="https://wa.me/919993069090"
                                className="fw-bold text-decoration-none text-dark"
                                aria-label="Contact via WhatsApp"
                            >
                                +91 99930 69090
                            </a>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="contact-card text-center h-100">
                            <Instagram className="icon instagram" aria-hidden="true" />
                            <h2 className="h5">Instagram</h2>
                            <p>@pranabites_</p>
                            <Button
                                variant="outline-danger"
                                href="https://instagram.com/pranabites_"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit PranaBites Instagram profile"
                            >
                                Visit Profile
                            </Button>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="contact-card text-center h-100">
                            <MapPin className="icon location" aria-hidden="true" />
                            <h2 className="h5">Location</h2>
                            <p>Kolhapur, Maharashtra</p>
                            <small>Serving all over India</small>
                        </Card>
                    </Col>
                </Row>

                {/* Form + Info */}
                <Row className="g-5">
                    <Col lg={6}>
                        <Card className="p-4 shadow-sm">
                            <h2 className="h4 mb-3">Send Us a Message</h2>

                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="contact-name">Name *</Form.Label>
                                    <Form.Control
                                        id="contact-name"
                                        name="name"
                                        value={formData.name}
                                        required
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        autoComplete="name"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="contact-email">Email</Form.Label>
                                    <Form.Control
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="contact-phone">Phone *</Form.Label>
                                    <Form.Control
                                        id="contact-phone"
                                        name="phone"
                                        value={formData.phone}
                                        required
                                        onChange={handleChange}
                                        placeholder="10-digit mobile number"
                                        inputMode="numeric"
                                        maxLength={10}
                                        autoComplete="tel"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="contact-message">Message *</Form.Label>
                                    <Form.Control
                                        id="contact-message"
                                        as="textarea"
                                        rows={3}
                                        name="message"
                                        value={formData.message}
                                        required
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100 whatsapp-btn"
                                    disabled={isSubmitting}
                                >
                                    <MessageCircle size={18} aria-hidden="true" className="me-2" />
                                    {isSubmitting ? "Sending..." : "Send on WhatsApp"}
                                </Button>
                            </Form>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card className="p-4 mb-4 order-box">
                            <h2 className="h4">Quick Order</h2>
                            <p>Start your order instantly on WhatsApp</p>
                            <Button
                                variant="light"
                                href="https://wa.me/919993069090?text=Hi%20PranaBites!%20I%20want%20to%20place%20an%20order."
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Place order via WhatsApp"
                            >
                                Order Now
                            </Button>
                        </Card>

                        <Card className="p-4 shadow-sm">
                            <h2 className="h5">Business Hours</h2>
                            <p className="mb-2">
                                <Clock size={16} aria-hidden="true" className="me-2" />
                                Mon - Sat: 10:00 AM - 8:00 PM
                            </p>
                            <p className="mb-2">
                                <Clock size={16} aria-hidden="true" className="me-2" />
                                Sunday: 10:00 AM - 6:00 PM
                            </p>
                            <small className="text-muted">
                                <Phone size={14} aria-hidden="true" className="me-1" />
                                We typically reply within 30 minutes
                            </small>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
