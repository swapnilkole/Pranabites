import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaWhatsapp, FaBuilding, FaGift, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import SEO from "../SEO";
import "../../css/contact.css";

const eventTypes = [
    "Corporate Gifting",
    "Wedding / Engagement",
    "Festival / Diwali Hampers",
    "Birthday / Anniversary",
    "Corporate Events",
    "Other",
];

const productOptions = [
    "Almond Coco Dust",
    "Almond Hing Jeera",
    "Cheese & Herb Cashew",
    "Kokan Cashew",
    "Raisin Milk",
    "Pista",
    "Mix Peri Peri Snack",
    "Panchmeva",
    "Trail Pack (5 x 50g)",
];

const infoCards = [
    {
        icon: FaBuilding,
        title: "Corporate Gifting",
        description: "Premium dry fruit hampers for your employees, clients, and business partners.",
        color: "#198754",
    },
    {
        icon: FaGift,
        title: "Wedding Favors",
        description: "Beautiful gift boxes of premium dry fruits for your special occasions.",
        color: "#b45309",
    },
    {
        icon: FaCalendarAlt,
        title: "Festival Hampers",
        description: "Customized Diwali, Holi & festive gift packs with premium quality dry fruits.",
        color: "#dc3545",
    },
];

const BulkOrderForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        eventType: "",
        selectedProducts: [],
        quantity: "",
        specialRequirements: "",
    });

    const handleInputChange = (field, value) => {
        if (field === "phone") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }
        setFormData({ ...formData, [field]: value });
    };

    const handleProductToggle = (product) => {
        const updated = formData.selectedProducts.includes(product)
            ? formData.selectedProducts.filter((p) => p !== product)
            : [...formData.selectedProducts, product];
        setFormData({ ...formData, selectedProducts: updated });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.contactPerson.trim()) {
            toast.error("Please enter contact person name");
            return;
        }
        if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone)) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }
        if (!formData.eventType) {
            toast.error("Please select an event type");
            return;
        }
        if (formData.selectedProducts.length === 0) {
            toast.error("Please select at least one product");
            return;
        }
        if (!formData.quantity.trim()) {
            toast.error("Please enter approximate quantity");
            return;
        }

        const message =
            `Hi PranaBites! I'm interested in a bulk order:\n\n` +
            `🏢 Company: ${formData.companyName || "N/A"}\n` +
            `👤 Contact: ${formData.contactPerson}\n` +
            `📧 Email: ${formData.email || "N/A"}\n` +
            `📱 Phone: ${formData.phone}\n` +
            `🎉 Event: ${formData.eventType}\n` +
            `📦 Products: ${formData.selectedProducts.join(", ")}\n` +
            `🔢 Quantity: ${formData.quantity}\n` +
            `${formData.specialRequirements ? `📝 Special Requirements: ${formData.specialRequirements}\n` : ""}` +
            `\nPlease share bulk pricing and details!`;

        window.open(
            `https://wa.me/919993069090?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    return (
        <main>
            <SEO
                title="Bulk Orders - Corporate & Wedding Gifting | PranaBites"
                description="Order premium dry fruits in bulk for corporate gifting, weddings, festivals & events. Custom packaging available. Contact PranaBites for bulk pricing."
                keywords="bulk dry fruits order, corporate gifting, wedding favors, Diwali hampers, dry fruit gift boxes"
                canonicalUrl="https://pranabites.com/bulk-order"
            />

            {/* Hero Section */}
            <section className="contact-hero">
                <Container>
                    <h1>Bulk Orders & Gifting</h1>
                    <p>
                        Premium dry fruit hampers for corporate gifting, weddings, festivals & special occasions.
                        Custom packaging available!
                    </p>
                </Container>
            </section>

            {/* Info Cards */}
            <Container className="py-5">
                <Row className="mb-5">
                    {infoCards.map((card, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="contact-card h-100 text-center border-0">
                                <Card.Body>
                                    <div
                                        className="icon d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                        style={{ background: `${card.color}15`, color: card.color }}
                                    >
                                        <card.icon size={28} />
                                    </div>
                                    <h5 className="fw-bold">{card.title}</h5>
                                    <p className="text-muted">{card.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Order Form */}
                <Row>
                    <Col lg={8} className="mx-auto">
                        <Card className="shadow-sm border-0">
                            <Card.Body className="p-4">
                                <h3 className="fw-bold text-center mb-4 text-success">
                                    Request Bulk Order Quote
                                </h3>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Company / Organization</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Company name (optional)"
                                                    value={formData.companyName}
                                                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Contact Person *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={formData.contactPerson}
                                                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email address (optional)"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone *</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="10-digit mobile number"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    inputMode="numeric"
                                                    maxLength={10}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Event Type *</Form.Label>
                                                <Form.Select
                                                    value={formData.eventType}
                                                    onChange={(e) => handleInputChange("eventType", e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select event type</option>
                                                    {eventTypes.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Approximate Quantity *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="e.g., 50 boxes, 100 packs"
                                                    value={formData.quantity}
                                                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* Product Selection */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select Products *</Form.Label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {productOptions.map((product) => (
                                                <Button
                                                    key={product}
                                                    variant={formData.selectedProducts.includes(product) ? "success" : "outline-secondary"}
                                                    size="sm"
                                                    onClick={() => handleProductToggle(product)}
                                                    type="button"
                                                >
                                                    {product}
                                                </Button>
                                            ))}
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Special Requirements</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Custom packaging, specific quantities per product, delivery date, etc."
                                            value={formData.specialRequirements}
                                            onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        variant="success"
                                        size="lg"
                                        className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                                        style={{ borderRadius: "50px" }}
                                    >
                                        <FaWhatsapp size={22} />
                                        Get Bulk Order Quote on WhatsApp
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        {/* Extra Info */}
                        <div className="text-center mt-4">
                            <p className="text-muted">
                                Minimum order: <strong>25 units</strong> | Custom packaging available |
                                Pan India delivery
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default BulkOrderForm;
