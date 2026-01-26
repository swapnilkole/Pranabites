import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import SEO from "../SEO";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [address, setAddress] = useState({
        fullAddress: "",
        city: "",
        pincode: "",
    });

    useEffect(() => {
        try {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            const safeCart = savedCart.map((item) => ({
                ...item,
                price: typeof item.price === "number" ? item.price : parseInt(String(item.price).replace("₹", "") || "0"),
                quantity: item?.quantity ? Number(item.quantity) : 1,
            }));
            setCart(safeCart);
        } catch (err) {
            console.error("Cart load error:", err);
            setCart([]);
            localStorage.removeItem("cart");
        }
    }, []);

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = (index, type) => {
        const newCart = [...cart];
        if (!newCart[index]) return;

        if (type === "inc") {
            newCart[index].quantity += 1;
        } else if (type === "dec" && newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
        }

        saveCart(newCart);
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        saveCart(newCart);
        toast.success("Item removed from cart");
    };

    const getTotalPrice = () =>
        cart.reduce((total, item) => {
            const price = typeof item.price === "number" ? item.price : parseInt(String(item.price).replace("₹", "") || "0");
            return total + price * item.quantity;
        }, 0);

    const getTotalItems = () =>
        cart.reduce((total, item) => total + item.quantity, 0);

    const validateCheckout = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.error("Please login first to place your order");
            navigate("/login");
            return false;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty. Add some products first!");
            return false;
        }

        if (!address.fullAddress.trim()) {
            toast.error("Please enter your full address");
            return false;
        }

        if (address.fullAddress.trim().length < 10) {
            toast.error("Please enter a complete address (min 10 characters)");
            return false;
        }

        if (!address.city.trim()) {
            toast.error("Please enter your city");
            return false;
        }

        if (!address.pincode || !/^\d{6}$/.test(address.pincode)) {
            toast.error("Please enter a valid 6-digit pincode");
            return false;
        }

        return true;
    };

    const generateWhatsAppMessage = (user) => {
        const orderDate = new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        let message = `━━━━━━━━━━━━━━━━━━━━\n`;
        message += `🛒 *PRANABITES - New Order*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

        message += `📅 *Order Date:* ${orderDate}\n\n`;

        message += `👤 *Customer Details:*\n`;
        message += `• Name: ${user.name}\n`;
        message += `• Phone: ${user.phone}\n`;
        message += `• Email: ${user.email}\n\n`;

        message += `📍 *Delivery Address:*\n`;
        message += `${address.fullAddress}\n`;
        message += `${address.city} - ${address.pincode}\n\n`;

        message += `━━━━━━━━━━━━━━━━━━━━\n`;
        message += `📦 *Order Items (${getTotalItems()} items):*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

        cart.forEach((item, i) => {
            const itemTotal = item.price * item.quantity;
            message += `${i + 1}. *${item.name}*\n`;
            if (item.weight) {
                message += `   Weight: ${item.weight}\n`;
            }
            message += `   Qty: ${item.quantity} × ₹${item.price} = *₹${itemTotal}*\n\n`;
        });

        message += `━━━━━━━━━━━━━━━━━━━━\n`;
        message += `💰 *GRAND TOTAL: ₹${getTotalPrice()}*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

        message += `✅ Please confirm order availability and share payment details.\n\n`;
        message += `_Sent from PranaBites Website_`;

        return message;
    };

    const handleCheckout = async () => {
        if (!validateCheckout()) return;

        const user = JSON.parse(localStorage.getItem("user"));
        setIsCheckingOut(true);

        try {
            const message = generateWhatsAppMessage(user);
            const whatsappUrl = `https://wa.me/919993069090?text=${encodeURIComponent(message)}`;

            // Small delay for better UX
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Open WhatsApp
            const newWindow = window.open(whatsappUrl, "_blank");

            if (newWindow) {
                // Clear cart after successful redirect
                saveCart([]);
                toast.success("Redirecting to WhatsApp...", { duration: 3000 });
            } else {
                // Popup blocked - provide fallback
                toast.error("Popup blocked! Please allow popups or click the button again.");
                setIsCheckingOut(false);
                return;
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <main className="py-5">
            <SEO
                title="Shopping Cart - Review Your Order"
                description="Review your PranaBites cart and checkout via WhatsApp. Premium flavored dry fruits delivered to your doorstep."
                keywords="cart, checkout, buy dry fruits online, PranaBites order, WhatsApp order"
                canonicalUrl="https://pranabites.com/cart"
            />

            <Container>
                <header className="text-center mb-4">
                    <h1 className="fw-bold text-success">
                        <FaShoppingCart className="me-2" />
                        Your Cart
                    </h1>
                    {cart.length > 0 && (
                        <p className="text-muted">
                            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your cart
                        </p>
                    )}
                </header>

                {cart.length === 0 ? (
                    <section className="text-center py-5">
                        <p className="text-muted mb-4 fs-5">Your cart is empty.</p>
                        <Button
                            variant="success"
                            size="lg"
                            onClick={() => navigate("/shop")}
                        >
                            Continue Shopping
                        </Button>
                    </section>
                ) : (
                    <article>
                        <section aria-label="Cart items">
                            <Table bordered hover responsive className="align-middle">
                                <thead className="table-success">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => {
                                        const price = typeof item.price === "number" ? item.price : parseInt(String(item.price).replace("₹", "") || "0");

                                        return (
                                            <tr key={`cart-item-${index}`}>
                                                <td>{index + 1}</td>
                                                <td className="fw-medium">{item.name}</td>
                                                <td>{item.weight || "-"}</td>
                                                <td>₹{price}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline-secondary"
                                                            onClick={() => updateQuantity(index, "dec")}
                                                            disabled={item.quantity <= 1}
                                                            aria-label={`Decrease ${item.name} quantity`}
                                                        >
                                                            -
                                                        </Button>
                                                        <span className="fw-bold px-2">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-secondary"
                                                            onClick={() => updateQuantity(index, "inc")}
                                                            aria-label={`Increase ${item.name} quantity`}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="fw-semibold text-success">₹{price * item.quantity}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => removeItem(index)}
                                                        aria-label={`Remove ${item.name} from cart`}
                                                    >
                                                        Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="table-light">
                                    <tr>
                                        <td colSpan="5" className="text-end fw-bold fs-5">
                                            Grand Total:
                                        </td>
                                        <td colSpan="2" className="fw-bold fs-5 text-success">
                                            ₹{getTotalPrice()}
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </section>

                        <section aria-label="Delivery address" className="mt-4">
                            <Card>
                                <Card.Header className="bg-success text-white">
                                    <strong>Delivery Address</strong>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="fullAddress">Full Address *</Form.Label>
                                        <Form.Control
                                            id="fullAddress"
                                            as="textarea"
                                            rows={2}
                                            placeholder="House no, Street name, Area, Landmark"
                                            value={address.fullAddress}
                                            onChange={(e) =>
                                                setAddress({ ...address, fullAddress: e.target.value })
                                            }
                                            required
                                            aria-required="true"
                                        />
                                    </Form.Group>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="city">City *</Form.Label>
                                                <Form.Control
                                                    id="city"
                                                    type="text"
                                                    placeholder="City name"
                                                    value={address.city}
                                                    onChange={(e) =>
                                                        setAddress({ ...address, city: e.target.value })
                                                    }
                                                    required
                                                    aria-required="true"
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="pincode">Pincode *</Form.Label>
                                                <Form.Control
                                                    id="pincode"
                                                    type="text"
                                                    placeholder="6-digit pincode"
                                                    value={address.pincode}
                                                    maxLength={6}
                                                    inputMode="numeric"
                                                    pattern="[0-9]{6}"
                                                    onChange={(e) =>
                                                        setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "") })
                                                    }
                                                    required
                                                    aria-required="true"
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </section>

                        <section className="text-center mt-4">
                            <Button
                                size="lg"
                                variant="success"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="px-5 py-3"
                                aria-busy={isCheckingOut}
                            >
                                {isCheckingOut ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaWhatsapp className="me-2" size={20} />
                                        Checkout via WhatsApp
                                    </>
                                )}
                            </Button>
                            <p className="text-muted small mt-2">
                                You'll be redirected to WhatsApp to complete your order
                            </p>
                        </section>
                    </article>
                )}
            </Container>
        </main>
    );
};

export default Cart;
