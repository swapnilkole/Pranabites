import { Container, Card } from "react-bootstrap";
import SEO from "../SEO";

const Terms = () => {
    return (
        <main className="py-5">
            <SEO
                title="Terms & Conditions"
                description="Read PranaBites terms and conditions. Understand your rights and obligations when purchasing premium dry fruits from our store."
                keywords="terms and conditions, PranaBites terms, user agreement, purchase terms"
                canonicalUrl="https://pranabites.com/terms"
            />

            <Container>
                <Card className="shadow-sm p-4 p-md-5">
                    <h1 className="text-success mb-4">Terms & Conditions</h1>
                    <p className="text-muted mb-4">
                        <strong>Last Updated:</strong> January 2025
                    </p>

                    <section className="mb-4">
                        <h2 className="h4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the PranaBites website and services, you agree to be bound
                            by these Terms and Conditions. If you do not agree with any part of these terms,
                            please do not use our services.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">2. Products and Pricing</h2>
                        <ul>
                            <li>All products are subject to availability.</li>
                            <li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes.</li>
                            <li>We reserve the right to modify prices without prior notice.</li>
                            <li>Product images are for illustration purposes and may slightly vary from actual products.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">3. Ordering Process</h2>
                        <p>
                            Orders are placed via WhatsApp. By placing an order, you confirm that:
                        </p>
                        <ul>
                            <li>You are at least 18 years old or have parental consent.</li>
                            <li>The information provided is accurate and complete.</li>
                            <li>You authorize us to process your order and payment.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">4. Payment</h2>
                        <ul>
                            <li>Payment details will be shared via WhatsApp after order confirmation.</li>
                            <li>We accept UPI, bank transfers, and other payment methods as communicated.</li>
                            <li>Orders will be processed after payment confirmation.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">5. Delivery</h2>
                        <ul>
                            <li>We deliver across India via trusted courier partners.</li>
                            <li>Estimated delivery time is 3-5 business days (may vary by location).</li>
                            <li>Delivery charges are calculated based on your location and order value.</li>
                            <li>Risk of loss and title for products pass to you upon delivery.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">6. Product Quality</h2>
                        <ul>
                            <li>All products have a shelf life of 6 months from the date of packaging.</li>
                            <li>Products are 100% vegetarian and made with natural ingredients.</li>
                            <li>Store in a cool, dry place to maintain freshness.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">7. Intellectual Property</h2>
                        <p>
                            All content on this website, including text, graphics, logos, images, and software,
                            is the property of PranaBites and is protected by intellectual property laws.
                            Unauthorized use is prohibited.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">8. Limitation of Liability</h2>
                        <p>
                            PranaBites shall not be liable for any indirect, incidental, or consequential
                            damages arising from the use of our products or services. Our liability is limited
                            to the value of the products purchased.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">9. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of India. Any disputes shall be subject to
                            the exclusive jurisdiction of courts in Kolhapur, Maharashtra.
                        </p>
                    </section>

                    <section>
                        <h2 className="h4">10. Contact Us</h2>
                        <p>For any questions regarding these terms, please contact us:</p>
                        <ul className="list-unstyled">
                            <li><strong>WhatsApp:</strong> +91 99930 69090</li>
                            <li><strong>Location:</strong> Kolhapur, Maharashtra, India</li>
                        </ul>
                    </section>
                </Card>
            </Container>
        </main>
    );
};

export default Terms;
