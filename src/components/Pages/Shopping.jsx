import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaExchangeAlt } from "react-icons/fa";
import SEO, { generateProductListSchema } from "../SEO";
import { StarDisplay } from "../ProductReviews";
import ProductDetail from "../ProductDetail";

export const products = [
    {
        category: "Almond",
        items: [
            {
                name: "Almond Coco Dust",
                flavor: "Coconut Dusted",
                prices: {
                    "100g": { listing: 175, selling: 155 },
                    "250g": { listing: 390, selling: 350 },
                },
                images: ["/Images/cocodust.jpg", "/Images/Almond Coco Dust Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "almonds, badam, coconut, cocodust, healthy snack",
            },
            {
                name: "Almond Hing Jeera",
                flavor: "Hing Jeera Spiced",
                prices: {
                    "100g": { listing: 200, selling: 177 },
                    "250g": { listing: 450, selling: 400 },
                },
                images: ["/Images/almond hing jeera.jpg", "/Images/Almond Hing Jeera Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "almonds, badam, hing, jeera, spicy, savory",
            },
            {
                name: "American Almond",
                flavor: "Classic Premium",
                prices: {},
                images: ["/Images/Almond Front.jpeg", "/Images/Almonds.jpg", "/Images/fssai.png"],
                inStock: false,
                keywords: "almonds, american, premium, plain",
            },
        ],
    },
    {
        category: "Cashew",
        items: [
            {
                name: "Cheese & Herb Cashew",
                flavor: "Cheese & Herbs",
                prices: {
                    "100g": { listing: 205, selling: 185 },
                    "250g": { listing: 470, selling: 419 },
                },
                images: ["/Images/cashew cheese & herb.jpg", "/Images/Cashew Chesse & Herbs Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "cashews, kaju, cheese, herbs, savory snack",
            },
            {
                name: "Kokan Cashew",
                flavor: "Natural Roasted",
                prices: {
                    "100g": { listing: 190, selling: 165 },
                    "250g": { listing: 400, selling: 359 },
                },
                images: ["/Images/cashew.jpg", "/Images/Cashew Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "cashews, kaju, kokan, roasted, premium",
            },
        ],
    },
    {
        category: "Raisin",
        items: [
            {
                name: "Raisin Milk",
                flavor: "Milk Chocolate Coated",
                prices: {
                    "100g": { listing: 145, selling: 128 },
                    "250g": { listing: 325, selling: 288 },
                },
                images: ["/Images/rasine milk.jpg", "/Images/Choculate Raisin Milk Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "raisins, kishmish, chocolate, milk, sweet",
            },
            {
                name: "Raisin Normal",
                flavor: "Classic Green Raisin",
                prices: {},
                images: ["/Images/raisins.jpg", "/Images/fssai.png"],
                inStock: false,
                keywords: "raisins, kishmish, green, normal",
            },
            {
                name: "Raisin Black",
                flavor: "Premium Black Raisin",
                prices: {},
                images: ["/Images/raisins.jpg", "/Images/fssai.png"],
                inStock: false,
                keywords: "raisins, kishmish, black, premium",
            },
        ],
    },
    {
        category: "Pista",
        items: [
            {
                name: "Pista",
                flavor: "Salted Premium",
                prices: {
                    "100g": { listing: 210, selling: 185 },
                    "250g": { listing: 460, selling: 409 },
                },
                images: ["/Images/pistaaa.jpg", "/Images/Pista Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "pistachios, pista, salted, premium nuts",
            },
        ],
    },
    {
        category: "Snacks",
        items: [
            {
                name: "Mix Peri Peri Snack",
                flavor: "Peri Peri Spiced",
                prices: {
                    "100g": { listing: 170, selling: 149 },
                    "250g": { listing: 370, selling: 329 },
                },
                images: ["/Images/snack peri peri.jpg", "/Images/Mix Periperi Front.jpeg", "/Images/fssai.png"],
                inStock: true,
                keywords: "snack mix, peri peri, spicy, mixed nuts",
            },
        ],
    },
    {
        category: "Panchmeva",
        items: [
            {
                name: "Panchmeva",
                flavor: "Traditional Dry Fruit Mix",
                prices: {
                    "250g": { listing: 390, selling: 359 },
                },
                images: ["/Images/Register2.jpg", "/Images/fssai.png"],
                inStock: true,
                keywords: "panchmeva, dry fruit mix, traditional, pooja",
            },
        ],
    },
    {
        category: "Combo",
        items: [
            {
                name: "Trail Pack (5 x 50g)",
                flavor: "Almond Cocodust, Almond Hing Jeera, Cashew Cheese & Herb, Raisin Milk, Mix Peri Peri",
                prices: {
                    "5 x 50g": { listing: 520, selling: 465 },
                },
                images: ["/Images/cocodust.jpg", "/Images/snack peri peri.jpg", "/Images/fssai.png"],
                inStock: true,
                keywords: "trail pack, combo, sampler, variety pack",
            },
            {
                name: "Mix Peri Peri & Panchmeva Combo",
                flavor: "Mix Peri Peri Snack 250g + Panchmeva 250g",
                prices: {
                    "2 x 250g": { listing: 780, selling: 709 },
                },
                images: ["/Images/snack peri peri.jpg", "/Images/Register2.jpg", "/Images/fssai.png"],
                inStock: true,
                keywords: "combo, peri peri, panchmeva, value pack",
            },
            {
                name: "Pack of 2 Panchmeva",
                flavor: "Panchmeva 250g x 2",
                prices: {
                    "2 x 250g": { listing: 780, selling: 699 },
                },
                images: ["/Images/Register2.jpg", "/Images/fssai.png"],
                inStock: true,
                keywords: "combo, panchmeva, value pack, double pack",
            },
        ],
    },
];

// Flatten products for schema
const allProducts = products.flatMap((section) =>
    section.items.map((item) => ({
        ...item,
        category: section.category,
    }))
);

const Shopping = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [compareList, setCompareList] = useState(() => {
        return JSON.parse(localStorage.getItem("compareList")) || [];
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleAddToCart = (item, selectedWeight) => {
        if (!item.inStock) {
            toast.error("This product is currently out of stock");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.error("Please login or register first");
            navigate("/login");
            return;
        }

        const priceData = item.prices[selectedWeight];
        const cartItem = {
            name: item.name,
            weight: selectedWeight,
            price: priceData.selling,
            image: item.images[0],
            quantity: 1,
        };

        const newCart = [...cart, cartItem];
        saveCart(newCart);

        toast.success(`${item.name} (${selectedWeight}) added to cart`);
    };

    const handleProductClick = (item) => {
        setSelectedProduct(item);
        setShowDetail(true);
    };

    const generateAltText = (item, viewIndex) => {
        const views = ["front view", "package view"];
        return `${item.name} - ${item.flavor} flavored dry fruit by PranaBites - ${views[viewIndex] || `image ${viewIndex + 1}`}`;
    };

    const getDiscountPercent = (listing, selling) => {
        return Math.round(((listing - selling) / listing) * 100);
    };

    const toggleCompare = (productName) => {
        setCompareList((prev) => {
            let updated;
            if (prev.includes(productName)) {
                updated = prev.filter((n) => n !== productName);
            } else {
                if (prev.length >= 3) {
                    toast.error("You can compare up to 3 products only");
                    return prev;
                }
                updated = [...prev, productName];
            }
            localStorage.setItem("compareList", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <main className="py-5">
            <SEO
                title="Shop Flavored Dry Fruits - Premium Almonds, Cashews, Pistachios"
                description="Buy premium flavored dry fruits online at PranaBites. Choose from Coconut Almonds, Cheese Cashews, Hing Jeera Almonds, Peri Peri Mix & more. Free delivery in Kolhapur!"
                keywords="buy dry fruits online, flavored almonds, cashews online, pistachios, healthy snacks India, PranaBites shop, premium nuts"
                canonicalUrl="https://pranabites.com/shop"
                structuredData={generateProductListSchema(allProducts)}
            />

            <Container>
                <header className="text-center mb-5">
                    <h1 className="fw-bold text-success">
                        Premium Flavored Dry Fruits Collection
                    </h1>
                    <p className="text-muted lead">
                        Handpicked, freshly packed, and delivered with love from Kolhapur
                    </p>
                </header>

                {products.map((section, sectionIndex) => (
                    <section
                        key={sectionIndex}
                        className="mb-5"
                        aria-labelledby={`category-${sectionIndex}`}
                    >
                        <h2
                            id={`category-${sectionIndex}`}
                            className="fw-semibold mb-4 border-bottom pb-2"
                        >
                            {section.category}
                        </h2>

                        <Row>
                            {section.items.map((item, itemIndex) => (
                                <Col md={4} sm={6} key={itemIndex} className="mb-4">
                                    <article className="h-100">
                                        <Card className={`border-0 shadow-sm h-100 product-card ${!item.inStock ? "opacity-75" : ""}`}>
                                            <div className="position-relative">
                                                <Carousel
                                                    controls={false}
                                                    indicators={false}
                                                    interval={2500}
                                                >
                                                    {item.images.map((img, imgIndex) => (
                                                        <Carousel.Item key={imgIndex}>
                                                            <div
                                                                className="d-flex align-items-center justify-content-center bg-white"
                                                                style={{ height: "300px", padding: "10px" }}
                                                            >
                                                                <img
                                                                    src={img}
                                                                    alt={generateAltText(item, imgIndex)}
                                                                    loading="lazy"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        maxHeight: "280px",
                                                                        objectFit: "contain",
                                                                        ...(!item.inStock ? { filter: "grayscale(50%)" } : {}),
                                                                    }}
                                                                />
                                                            </div>
                                                        </Carousel.Item>
                                                    ))}
                                                </Carousel>
                                                {!item.inStock && (
                                                    <Badge
                                                        bg="danger"
                                                        className="position-absolute top-50 start-50 translate-middle px-3 py-2"
                                                        style={{ fontSize: "0.9rem", zIndex: 2 }}
                                                    >
                                                        Out of Stock
                                                    </Badge>
                                                )}
                                            </div>

                                            <Card.Body className="text-center">
                                                <h3 className="h5 fw-semibold mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-muted small mb-2">
                                                    {item.flavor}
                                                </p>

                                                {/* Star Rating */}
                                                <div className="mb-3">
                                                    <StarDisplay productName={item.name} />
                                                </div>

                                                {/* Price Display */}
                                                {item.inStock ? (
                                                    Object.entries(item.prices).map(([weight, priceData]) => {
                                                        const discount = getDiscountPercent(priceData.listing, priceData.selling);
                                                        return (
                                                            <div
                                                                key={weight}
                                                                className="d-flex justify-content-between align-items-center mb-2 px-2"
                                                            >
                                                                <span className="text-muted">{weight}</span>
                                                                <div className="text-end">
                                                                    <small className="text-muted text-decoration-line-through me-1">
                                                                        ₹{priceData.listing}
                                                                    </small>
                                                                    <span className="fw-bold text-success">₹{priceData.selling}</span>
                                                                    {discount > 0 && (
                                                                        <Badge bg="danger" className="ms-1" style={{ fontSize: "0.65rem" }}>
                                                                            {discount}% OFF
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <Button
                                                                    size="sm"
                                                                    variant="success"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleAddToCart(item, weight);
                                                                    }}
                                                                    aria-label={`Add ${item.name} ${weight} pack to cart for ₹${priceData.selling}`}
                                                                >
                                                                    Add
                                                                </Button>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="mb-2">
                                                        <Badge bg="secondary" className="px-3 py-2">
                                                            Currently Unavailable
                                                        </Badge>
                                                    </div>
                                                )}

                                                {/* View Details & Compare */}
                                                <div className="d-flex gap-2 mt-2">
                                                    <Button
                                                        variant={item.inStock ? "outline-success" : "outline-secondary"}
                                                        className="flex-grow-1"
                                                        onClick={() => handleProductClick(item)}
                                                    >
                                                        <FaEye className="me-2" />
                                                        Details
                                                    </Button>
                                                    <Button
                                                        variant={compareList.includes(item.name) ? "success" : "outline-secondary"}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCompare(item.name);
                                                        }}
                                                        title="Compare"
                                                        aria-label={`Compare ${item.name}`}
                                                    >
                                                        <FaExchangeAlt />
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </article>
                                </Col>
                            ))}
                        </Row>
                    </section>
                ))}

                {cart.length > 0 && (
                    <aside className="text-center mt-4 sticky-bottom bg-white py-3 border-top">
                        <Button
                            variant="warning"
                            size="lg"
                            onClick={() => navigate("/cart")}
                            aria-label={`View cart with ${cart.length} items`}
                        >
                            View Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
                        </Button>
                    </aside>
                )}
            </Container>

            {/* Floating Compare Bar */}
            {compareList.length >= 2 && (
                <div
                    className="position-fixed bottom-0 start-0 end-0 bg-success text-white py-3 px-4 d-flex justify-content-between align-items-center"
                    style={{ zIndex: 1050 }}
                >
                    <span className="fw-semibold">
                        {compareList.length} products selected for comparison
                    </span>
                    <div className="d-flex gap-2">
                        <Button
                            variant="light"
                            size="sm"
                            className="fw-bold"
                            onClick={() => navigate("/compare")}
                        >
                            <FaExchangeAlt className="me-2" />
                            Compare Now
                        </Button>
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={() => {
                                setCompareList([]);
                                localStorage.removeItem("compareList");
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            )}

            {/* Product Detail Modal */}
            <ProductDetail
                show={showDetail}
                onHide={() => setShowDetail(false)}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
            />
        </main>
    );
};

export default Shopping;
