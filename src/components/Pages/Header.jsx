import { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaMoon, FaSun, FaTruck } from "react-icons/fa";

// Logo from public folder - use direct path for Vite
const logo = "/Images/Logo1.jpg";

const Header = () => {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
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

        const handleDarkModeUpdate = () => {
            setDarkMode(localStorage.getItem("darkMode") === "true");
        };
        window.addEventListener("darkModeUpdated", handleDarkModeUpdate);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("cartUpdated", handleCartUpdate);
            window.removeEventListener("userUpdated", handleUserUpdate);
            window.removeEventListener("focus", syncStateWithStorage);
            window.removeEventListener("darkModeUpdated", handleDarkModeUpdate);
        };
    }, [syncStateWithStorage]);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
        document.body.classList.toggle("dark-mode", newMode);
        window.dispatchEvent(new Event("darkModeUpdated"));
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.dispatchEvent(new Event("userUpdated"));
        navigate("/login");
    };

    return (
        <>
        {/* Announcement Bar */}
        <div className="announcement-bar text-center py-2" style={{
            background: "linear-gradient(90deg, #198754, #145c43)",
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
        }}>
            <FaTruck className="me-2" size={14} />
            Free Delivery on Orders Above ₹1499
        </div>

        <Navbar bg={darkMode ? "dark" : "white"} data-bs-theme={darkMode ? "dark" : "light"} expand="lg" className="shadow-sm py-3 sticky-top">
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
                        <Nav.Link as={NavLink} to="/bulk-order">Gifting</Nav.Link>
                        <Nav.Link as={NavLink} to="/faq">FAQ</Nav.Link>
                    </Nav>

                    {/* Icons + Dark Mode + Cart + Login/Logout */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <button
                            type="button"
                            className="dark-mode-toggle"
                            onClick={toggleDarkMode}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            title={darkMode ? "Light Mode" : "Dark Mode"}
                        >
                            {darkMode ? <FaSun size={16} color="#f59e0b" /> : <FaMoon size={16} />}
                        </button>

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
        </>
    );
};

export default Header;
