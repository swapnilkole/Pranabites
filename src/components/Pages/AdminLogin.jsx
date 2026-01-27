import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserShield } from "react-icons/fa";
import SEO from "../SEO";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Invalid email or password");
                return;
            }

            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminUser", JSON.stringify(data.admin));
            navigate("/admin/dashboard");
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Admin login error:", err);
        } finally {
            setLoading(false);
        }
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

                            {error && (
                                <Alert variant="danger" className="py-2">
                                    {error}
                                </Alert>
                            )}

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
