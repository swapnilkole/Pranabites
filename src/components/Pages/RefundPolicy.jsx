import { Container, Card, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../SEO";

const RefundPolicy = () => {
    return (
        <main className="py-5">
            <SEO
                title="Refund & Return Policy"
                description="PranaBites refund and return policy. Learn about our hassle-free return process for premium dry fruits orders."
                keywords="refund policy, return policy, PranaBites returns, order cancellation"
                canonicalUrl="https://pranabites.com/refund"
            />

            <Container>
                <Card className="shadow-sm p-4 p-md-5">
                    <h1 className="text-success mb-4">Refund & Return Policy</h1>
                    <p className="text-muted mb-4">
                        <strong>Last Updated:</strong> January 2025
                    </p>

                    <p className="lead mb-4">
                        At PranaBites, customer satisfaction is our priority. We strive to ensure you receive
                        fresh, quality products every time.
                    </p>

                    <section className="mb-4">
                        <h2 className="h4">1. Order Cancellation</h2>
                        <ul>
                            <li>Orders can be cancelled within 2 hours of placing the order.</li>
                            <li>Once the order is dispatched, cancellation is not possible.</li>
                            <li>To cancel an order, contact us immediately on WhatsApp.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">2. Returns</h2>
                        <p>We accept returns in the following cases:</p>
                        <ul>
                            <li><strong>Damaged Products:</strong> If the product is damaged during transit.</li>
                            <li><strong>Wrong Product:</strong> If you receive a different product than ordered.</li>
                            <li><strong>Quality Issues:</strong> If the product has quality defects.</li>
                        </ul>
                        <p className="text-muted mt-2">
                            <strong>Note:</strong> Returns must be initiated within 24 hours of delivery with
                            photographic evidence of the issue.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">3. Non-Returnable Items</h2>
                        <p>The following items cannot be returned:</p>
                        <ul>
                            <li>Products that have been opened or used</li>
                            <li>Products without original packaging</li>
                            <li>Products returned after 24 hours of delivery</li>
                            <li>Change of mind or wrong order by customer</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">4. Refund Process</h2>
                        <ul>
                            <li>Once we receive and verify the returned product, refund will be initiated.</li>
                            <li>Refunds are processed within 5-7 business days.</li>
                            <li>Refunds will be credited to the original payment method.</li>
                            <li>Shipping charges are non-refundable unless the return is due to our error.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">5. Replacement</h2>
                        <p>
                            In case of damaged or wrong products, we offer free replacement. The replacement
                            will be shipped after we receive the returned product or based on photographic
                            evidence.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">6. How to Request a Return/Refund</h2>
                        <ol>
                            <li>Contact us on WhatsApp within 24 hours of delivery.</li>
                            <li>Share your order details and photos of the issue.</li>
                            <li>Our team will review and respond within 24 hours.</li>
                            <li>Follow the instructions provided for return shipping.</li>
                        </ol>
                    </section>

                    <section className="mb-4 p-4 bg-light rounded">
                        <h2 className="h4">Need Help?</h2>
                        <p>
                            For any refund or return queries, reach out to us on WhatsApp. We're here to help!
                        </p>
                        <Button
                            variant="success"
                            href="https://wa.me/919993069090?text=Hi%20PranaBites!%20I%20have%20a%20query%20about%20my%20order."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2"
                        >
                            <FaWhatsapp className="me-2" />
                            Contact Support
                        </Button>
                    </section>

                    <section>
                        <h2 className="h4">7. Contact Information</h2>
                        <ul className="list-unstyled">
                            <li><strong>WhatsApp:</strong> +91 99930 69090</li>
                            <li><strong>Response Time:</strong> Within 24 hours</li>
                            <li><strong>Location:</strong> Kolhapur, Maharashtra, India</li>
                        </ul>
                    </section>
                </Card>
            </Container>
        </main>
    );
};

export default RefundPolicy;
