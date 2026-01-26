import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { RefreshCw, Home, MessageCircle } from "lucide-react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="py-5 min-vh-100 d-flex align-items-center bg-light">
                    <Container>
                        <Card className="shadow-lg mx-auto text-center p-5" style={{ maxWidth: "600px" }}>
                            <div className="mb-4">
                                <span style={{ fontSize: "4rem" }}>
                                    &#128533;
                                </span>
                            </div>

                            <h1 className="h3 mb-3">Something Went Wrong</h1>
                            <p className="text-muted mb-4">
                                We're sorry, but something unexpected happened.
                                Please try refreshing the page or go back to home.
                            </p>

                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                <Button
                                    variant="success"
                                    onClick={this.handleReload}
                                    className="px-4"
                                >
                                    <RefreshCw size={18} className="me-2" />
                                    Refresh Page
                                </Button>

                                <Button
                                    variant="outline-success"
                                    onClick={this.handleGoHome}
                                    className="px-4"
                                >
                                    <Home size={18} className="me-2" />
                                    Go Home
                                </Button>
                            </div>

                            <hr className="my-4" />

                            <p className="text-muted small mb-2">
                                If the problem persists, please contact us:
                            </p>
                            <Button
                                variant="link"
                                href="https://wa.me/919993069090?text=Hi%20PranaBites!%20I'm%20experiencing%20an%20issue%20on%20your%20website."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-success"
                            >
                                <MessageCircle size={16} className="me-1" />
                                Contact Support
                            </Button>
                        </Card>
                    </Container>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
