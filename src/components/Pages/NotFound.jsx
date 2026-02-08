import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, ArrowLeft } from "lucide-react";
import SEO from "../SEO";

const NotFound = () => {
    return (
        <main className="py-5 min-vh-100 d-flex align-items-center">
            <SEO
                title="Page Not Found (404)"
                description="The page you're looking for doesn't exist. Browse our premium flavored dry fruits collection at PranaBites."
                keywords="404, page not found, PranaBites"
                noIndex={true}
            />

            <Container className="text-center">
                <div className="mb-4">
                    <span style={{ fontSize: "8rem", fontWeight: "bold", color: "#198754" }}>
                        404
                    </span>
                </div>

                <h1 className="h2 mb-3">Oops! Page Not Found</h1>
                <p className="text-muted mb-4 lead">
                    The page you're looking for doesn't exist or has been moved.
                    <br />
                    Let's get you back on track!
                </p>

                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <Button
                        as={Link}
                        to="/"
                        variant="success"
                        size="lg"
                        className="px-4"
                    >
                        <Home size={20} className="me-2" />
                        Go Home
                    </Button>

                    <Button
                        as={Link}
                        to="/shop"
                        variant="outline-success"
                        size="lg"
                        className="px-4"
                    >
                        <ShoppingBag size={20} className="me-2" />
                        Browse Shop
                    </Button>

                    <Button
                        variant="outline-secondary"
                        size="lg"
                        className="px-4"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={20} className="me-2" />
                        Go Back
                    </Button>
                </div>

                <p className="text-muted mt-5">
                    Need help? <a href="https://wa.me/919993069090" className="text-success">Contact us on WhatsApp</a>
                </p>
            </Container>
        </main>
    );
};

export default NotFound;
