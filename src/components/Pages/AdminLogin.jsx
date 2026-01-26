import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserShield } from "react-icons/fa";
import SEO from "../SEO";

// Admin credentials (hardcoded - no registration)
const ADMIN_EMAIL = "swapnilkole16@gmail.com";
const ADMIN_PASSWORD = "Swapnil#8015PP";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate small delay for UX
        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                // Store admin session
                localStorage.setItem("adminUser", JSON.stringify({
                    email: ADMIN_EMAIL,
                    role: "admin",
                    loginTime: new Date().toISOString()
                }));
                navigate("/admin/dashboard");
            } else {
                setError("Invalid email or password");
            }
            setLoading(false);
        }, 500);
    };

    return (
        <main className="py-5 bg-light" style={{ minHeight: "80vh" }}>
            <SEO
                title="Admin Login - PranaBites"
                description="Admin login portal for PranaBites management"
                noIndex={true}
            />
            <Container>
                <div className="d-flex justify-content-center align-items-center">
                    <Card className="shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
                        <Card.Body className="p-4 p-md-5">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <div
                                    className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ width: "70px", height: "70px" }}
                                >
                                    <FaUserShield size={32} className="text-success" />
                                </div>
                                <h2 className="fw-bold mb-1">Admin Login</h2>
                                <p className="text-muted small">PranaBites Management Portal</p>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <Alert variant="danger" className="py-2">
                                    {error}
                                </Alert>
                            )}

                            {/* Login Form */}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter admin email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    type="submit"
                                    className="w-100 py-2 fw-semibold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <FaLock className="me-2" />
                                            Login to Dashboard
                                        </>
                                    )}
                                </Button>
                            </Form>

                            {/* Footer Note */}
                            <div className="text-center mt-4">
                                <small className="text-muted">
                                    Authorized personnel only
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </main>
    );
};

export default AdminLogin;
