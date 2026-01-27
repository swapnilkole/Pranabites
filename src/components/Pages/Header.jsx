import { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

// Logo from public folder - use direct path for Vite
const logo = "/Images/Logo1.jpg";

const Header = () => {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    // Function to sync state with localStorage
    const syncStateWithStorage = useCallback(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedUser);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
    }, []);

    useEffect(() => {
        // Initial sync
        syncStateWithStorage();

        // Listen for storage changes from other tabs
        const handleStorageChange = (e) => {
            if (e.key === "cart" || e.key === "user") {
                syncStateWithStorage();
            }
        };

        // Custom event listener for same-tab updates
        const handleCartUpdate = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(cart.length);
        };

        const handleUserUpdate = () => {
            const loggedUser = JSON.parse(localStorage.getItem("user"));
            setUser(loggedUser);
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("cartUpdated", handleCartUpdate);
        window.addEventListener("userUpdated", handleUserUpdate);

        // Also sync on window focus (in case of external changes)
        window.addEventListener("focus", syncStateWithStorage);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("cartUpdated", handleCartUpdate);
            window.removeEventListener("userUpdated", handleUserUpdate);
            window.removeEventListener("focus", syncStateWithStorage);
        };
    }, [syncStateWithStorage]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.dispatchEvent(new Event("userUpdated"));
        navigate("/login");
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm py-3">
            <Container>
                {/* Logo - Enhanced for brand prominence */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center gap-2 text-decoration-none"
                >
                    <img
                        src={logo}
                        alt="PranaBites - Premium Flavored Dry Fruits"
                        className="rounded-circle shadow-sm"
                        style={{
                            height: "60px",
                            width: "60px",
                            objectFit: "cover",
                            border: "2px solid #198754"
                        }}
                    />
                    <div className="lh-1">
                        <span
                            className="fw-bold text-success d-block"
                            style={{ fontSize: "1.5rem", letterSpacing: "1px" }}
                        >
                            PRANABITES
                        </span>
                        <small
                            className="text-muted d-none d-sm-block"
                            style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
                        >
                            Premium Flavored Dry Fruits
                        </small>
                    </div>
                </Navbar.Brand>

                {/* Mobile toggle */}
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto gap-4 fw-semibold">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                        <Nav.Link as={NavLink} to="/faq">FAQ</Nav.Link>
                    </Nav>

                    {/* Icons + Cart + Login/Logout */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Shopping Cart Icon */}
                        <button
                            type="button"
                            className="btn btn-link p-0 position-relative"
                            onClick={() => navigate("/cart")}
                            aria-label={`Shopping cart with ${cartCount} items`}
                            style={{ color: "inherit" }}
                        >
                            <FaShoppingCart size={20} />
                            {cartCount > 0 && (
                                <Badge
                                    bg="danger"
                                    pill
                                    className="position-absolute"
                                    style={{ top: -8, right: -10, fontSize: "0.65rem" }}
                                >
                                    {cartCount}
                                </Badge>
                            )}
                        </button>

                        {user ? (
                            <>
                                <span className="fw-semibold text-success d-none d-md-inline">
                                    Hi, {user.name}
                                </span>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                as={Link}
                                to="/login"
                                variant="outline-success"
                                size="sm"
                            >
                                <FaUser className="me-1" /> Login
                            </Button>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
