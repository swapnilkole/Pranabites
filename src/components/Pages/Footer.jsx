import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/Footer.css";
import {
    MapPin,
    Instagram,
    MessageCircle,
    Mail,
} from "lucide-react";


const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="gy-4">
                    {/* Brand */}
                    <Col md={3}>
                        <h3 className="footer-brand">PRANABITES</h3>
                        <p className="footer-tagline">
                            Healthy Snacking, Full of Flavor
                        </p>
                        <p className="footer-text">
                            Premium flavored dry fruits from Kolhapur, made with love and the
                            finest ingredients.
                        </p>
                    </Col>

                    {/* Quick Links */}
                    <Col md={3}>
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </Col>

                    {/* Policies */}
                    <Col md={3}>
                        <h5 className="footer-title">Policies</h5>
                        <ul className="footer-links">
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                            <li><Link to="/refund">Refund Policy</Link></li>
                        </ul>
                    </Col>

                    {/* Contact */}
                    <Col md={3}>
                        <h5 className="footer-title">Get in Touch</h5>
                        <ul className="footer-contact">
                            <li>
                                <MapPin size={18} />
                                <span>Kolhapur, Maharashtra</span>
                            </li>

                            <li>
                                <a
                                    href="https://wa.me/919993069090"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <MessageCircle size={18} />
                                    <span>+91 99930 69090</span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://instagram.com/pranabites_"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Instagram size={18} />
                                    <span>@pranabites_</span>
                                </a>
                            </li>

                            <li>
                                <a href="mailto:support@pranabites.com">
                                    <Mail size={18} />
                                    <span>support@pranabites.com</span>
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} PRANABITES. All rights reserved.
                    </p>
                    <span>Made with ❤️ in Kolhapur</span>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
