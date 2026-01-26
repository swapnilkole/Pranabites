import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../SEO";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!isLogin) {
            if (!userData.name.trim()) {
                toast.error("Please enter your name");
                return false;
            }
            if (userData.name.trim().length < 2) {
                toast.error("Name must be at least 2 characters");
                return false;
            }
            if (!userData.phone.trim()) {
                toast.error("Please enter your phone number");
                return false;
            }
            if (!/^[6-9]\d{9}$/.test(userData.phone.trim())) {
                toast.error("Please enter a valid 10-digit Indian mobile number");
                return false;
            }
        }

        if (!userData.email.trim()) {
            toast.error("Please enter your email");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email.trim())) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!userData.password) {
            toast.error("Please enter your password");
            return false;
        }
        if (userData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            if (isLogin) {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser && storedUser.email === userData.email.trim().toLowerCase() && storedUser.password === userData.password) {
                    toast.success(`Welcome back, ${storedUser.name}!`);
                    window.dispatchEvent(new Event("userUpdated"));
                    navigate("/shop");
                } else {
                    toast.error("Invalid email or password. Please try again or register.");
                    setIsLogin(false);
                }
            } else {
                const newUser = {
                    name: userData.name.trim(),
                    email: userData.email.trim().toLowerCase(),
                    phone: userData.phone.trim(),
                    password: userData.password,
                };
                localStorage.setItem("user", JSON.stringify(newUser));
                toast.success("Registered successfully! You are now logged in.");
                window.dispatchEvent(new Event("userUpdated"));
                navigate("/shop");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            console.error("Auth error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        if (field === "phone") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }
        setUserData({ ...userData, [field]: value });
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setUserData({ name: "", email: "", phone: "", password: "" });
    };

    return (
        <main className="d-flex justify-content-center align-items-center min-vh-100 py-4">
            <SEO
                title={isLogin ? "Login - Access Your Account" : "Register - Create Your Account"}
                description="Login or register at PranaBites to order premium flavored dry fruits. Quick checkout via WhatsApp."
                keywords="login PranaBites, register, create account, dry fruits order"
                canonicalUrl="https://pranabites.com/login"
            />

            <Container>
                <Card className="shadow-lg p-0 overflow-hidden mx-auto" style={{ maxWidth: "900px" }}>
                    <Row className="g-0">
                        {/* Left Panel */}
                        <Col md={5} className="d-none d-md-flex flex-column justify-content-center text-white auth-bg p-4">
                            <h2 className="fw-bold">{isLogin ? "New here?" : "One of us?"}</h2>
                            <p className="mt-2">
                                {isLogin
                                    ? "Sign up and explore premium flavored dry fruits from PranaBites."
                                    : "Login and continue shopping healthy snacks."}
                            </p>
                            <Button
                                variant="outline-light"
                                className="mt-3"
                                onClick={toggleMode}
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </Button>
                        </Col>

                        {/* Form Section */}
                        <Col md={7} className="p-4">
                            <h1 className="h3 text-center mb-4 fw-bold text-success">
                                {isLogin ? "Welcome Back" : "Create Account"}
                            </h1>

                            <Form onSubmit={handleSubmit} noValidate>
                                {!isLogin && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="auth-name">Name *</Form.Label>
                                            <Form.Control
                                                id="auth-name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={userData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                autoComplete="name"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="auth-phone">Phone *</Form.Label>
                                            <Form.Control
                                                id="auth-phone"
                                                type="tel"
                                                placeholder="10-digit mobile number"
                                                value={userData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                autoComplete="tel"
                                                inputMode="numeric"
                                                maxLength={10}
                                            />
                                        </Form.Group>
                                    </>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="auth-email">Email *</Form.Label>
                                    <Form.Control
                                        id="auth-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={userData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        autoComplete="email"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="auth-password">Password *</Form.Label>
                                    <Form.Control
                                        id="auth-password"
                                        type="password"
                                        placeholder="Enter password (min 6 characters)"
                                        value={userData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        autoComplete={isLogin ? "current-password" : "new-password"}
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    className="w-100 mb-3"
                                    type="submit"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting}
                                >
                                    {isSubmitting ? "Please wait..." : (isLogin ? "Login" : "Register")}
                                </Button>

                                <div className="text-center">
                                    <small>
                                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                        <span
                                            className="text-success fw-semibold"
                                            style={{ cursor: "pointer" }}
                                            onClick={toggleMode}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === "Enter" && toggleMode()}
                                        >
                                            {isLogin ? "Sign Up" : "Sign In"}
                                        </span>
                                    </small>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </main>
    );
};

export default AuthForm;
