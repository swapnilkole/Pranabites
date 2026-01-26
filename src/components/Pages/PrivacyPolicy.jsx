import { Container, Card } from "react-bootstrap";
import SEO from "../SEO";

const PrivacyPolicy = () => {
    return (
        <main className="py-5">
            <SEO
                title="Privacy Policy"
                description="Read PranaBites privacy policy. Learn how we collect, use, and protect your personal information when you shop for premium dry fruits."
                keywords="privacy policy, PranaBites privacy, data protection, customer data"
                canonicalUrl="https://pranabites.com/privacy"
            />

            <Container>
                <Card className="shadow-sm p-4 p-md-5">
                    <h1 className="text-success mb-4">Privacy Policy</h1>
                    <p className="text-muted mb-4">
                        <strong>Last Updated:</strong> January 2025
                    </p>

                    <section className="mb-4">
                        <h2 className="h4">1. Information We Collect</h2>
                        <p>When you use PranaBites, we may collect the following information:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address when you place an order.</li>
                            <li><strong>Order Information:</strong> Products purchased, order history, and payment details.</li>
                            <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers for website analytics.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">2. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Process and fulfill your orders</li>
                            <li>Communicate order updates via WhatsApp or email</li>
                            <li>Provide customer support</li>
                            <li>Send promotional offers (only with your consent)</li>
                            <li>Improve our products and services</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">3. Information Sharing</h2>
                        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                        <ul>
                            <li><strong>Delivery Partners:</strong> To fulfill and deliver your orders.</li>
                            <li><strong>Payment Processors:</strong> To process your payments securely.</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">4. Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information.
                            However, no method of transmission over the Internet is 100% secure, and we cannot
                            guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">5. Cookies</h2>
                        <p>
                            Our website uses cookies and local storage to enhance your browsing experience,
                            remember your preferences, and maintain your shopping cart. You can disable cookies
                            in your browser settings, but this may affect website functionality.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h2 className="h4">7. Contact Us</h2>
                        <p>
                            For any privacy-related questions or requests, please contact us:
                        </p>
                        <ul className="list-unstyled">
                            <li><strong>WhatsApp:</strong> +91 99930 69090</li>
                            <li><strong>Location:</strong> Kolhapur, Maharashtra, India</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="h4">8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted
                            on this page with an updated revision date. We encourage you to review this policy
                            periodically.
                        </p>
                    </section>
                </Card>
            </Container>
        </main>
    );
};

export default PrivacyPolicy;
