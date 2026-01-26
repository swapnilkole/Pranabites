import { useState } from "react";
import { Modal, Row, Col, Button, Badge, Accordion } from "react-bootstrap";
import { FaStar, FaRegStar, FaWhatsapp, FaMinus, FaPlus, FaTruck, FaShieldAlt, FaUndo, FaLeaf } from "react-icons/fa";
import { ProductReviewsSection, getAverageRating, getReviewCount } from "./ProductReviews";

// Calculate fake MRP for visual display
const calculateMRP = (price) => Math.ceil((price / 0.9) / 5) * 5;

// Star rating component
const StarRating = ({ rating, size = 16 }) => (
    <div className="d-inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            star <= rating ? (
                <FaStar key={star} className="text-warning" size={size} />
            ) : (
                <FaRegStar key={star} className="text-muted" size={size} />
            )
        ))}
    </div>
);

// Trust badges data
const trustBadges = [
    { icon: FaTruck, label: "Pan India", sublabel: "Delivery" },
    { icon: FaUndo, label: "Easy", sublabel: "Returns" },
    { icon: FaShieldAlt, label: "Secure", sublabel: "Checkout" },
    { icon: FaLeaf, label: "100%", sublabel: "Vegetarian" },
];

// Product descriptions
const productDescriptions = {
    "Almond Coco Dust (Badam)": {
        description: "Premium California almonds coated with a delicate layer of coconut dust. A perfect blend of crunch and sweetness that makes for an irresistible healthy snack.",
        ingredients: "Almonds, Coconut, Sugar, Salt",
        benefits: ["Rich in Protein", "Good source of Vitamin E", "Heart-healthy fats", "No artificial preservatives"]
    },
    "Whole Cashew (Kaju)": {
        description: "Handpicked whole cashews, perfectly roasted to bring out their natural buttery flavor. Premium quality W320 grade cashews.",
        ingredients: "Cashew Nuts, Salt",
        benefits: ["High in Protein", "Rich in Minerals", "Natural energy booster", "Premium W320 grade"]
    },
    "Cashew Cheese & Herbs (Kaju)": {
        description: "Crunchy cashews coated with a savory blend of cheese and aromatic herbs. A gourmet snacking experience.",
        ingredients: "Cashew Nuts, Cheese Powder, Mixed Herbs, Salt, Spices",
        benefits: ["Protein-rich", "Unique flavor", "Perfect party snack", "No MSG added"]
    },
    "Raisin Milk (Kishmish)": {
        description: "Juicy raisins covered in creamy milk chocolate coating. A guilt-free indulgence that satisfies your sweet tooth.",
        ingredients: "Raisins, Milk Chocolate (Cocoa, Milk Solids, Sugar)",
        benefits: ["Natural sweetness", "Iron-rich", "Energy boosting", "Kid-friendly"]
    },
    "Pistachios (Pista)": {
        description: "Premium grade roasted pistachios with just the right amount of salt. Easy-to-open shells with vibrant green kernels.",
        ingredients: "Pistachios, Salt",
        benefits: ["High in Antioxidants", "Good for eyes", "Protein-rich", "Heart-healthy"]
    },
    "Almond Barbeque (Badam)": {
        description: "California almonds seasoned with smoky barbeque flavoring. A spicy, tangy twist on traditional almonds.",
        ingredients: "Almonds, BBQ Seasoning (Paprika, Garlic, Onion, Spices), Salt",
        benefits: ["Protein-packed", "Bold flavor", "Crunchy texture", "Great for parties"]
    },
    "Snack Mix Peri Peri": {
        description: "A fiery mix of assorted nuts and seeds with authentic peri peri seasoning. Perfect for those who love a spicy kick.",
        ingredients: "Cashews, Almonds, Peanuts, Peri Peri Seasoning, Salt",
        benefits: ["Variety of nuts", "Spicy kick", "Energy boosting", "Addictive taste"]
    },
};

const ProductDetail = ({ show, onHide, product, onAddToCart }) => {
    const [selectedWeight, setSelectedWeight] = useState(Object.keys(product?.prices || {})[0] || "200g");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) return null;

    const avgRating = getAverageRating(product.name);
    const reviewCount = getReviewCount(product.name);
    const price = product.prices[selectedWeight];
    const mrp = calculateMRP(price);
    const productInfo = productDescriptions[product.name] || {
        description: "Premium quality dry fruits from PranaBites.",
        ingredients: "Natural ingredients",
        benefits: ["Premium quality", "Fresh packaging", "100% Vegetarian"]
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product, selectedWeight);
        }
        onHide();
    };

    const handleBuyNow = () => {
        const message = `Hi PranaBites! I want to order:\n\n` +
            `📦 Product: ${product.name}\n` +
            `⚖️ Weight: ${selectedWeight}\n` +
            `🔢 Quantity: ${quantity}\n` +
            `💰 Total: ₹${price * quantity}\n\n` +
            `Please confirm my order!`;
        window.open(`https://wa.me/919993069090?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <Modal show={show} onHide={onHide} size="xl" centered scrollable>
            <Modal.Header closeButton className="border-0 pb-0">
                <Badge bg="danger" className="position-absolute" style={{ top: 15, left: 15 }}>
                    Best Seller
                </Badge>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Row>
                    {/* Left - Image Gallery */}
                    <Col lg={5} className="mb-4">
                        {/* Main Image */}
                        <div className="border rounded-3 p-3 mb-3 bg-light text-center" style={{ minHeight: "350px" }}>
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="img-fluid"
                                style={{ maxHeight: "320px", objectFit: "contain" }}
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="d-flex gap-2 justify-content-center flex-wrap">
                            {product.images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`border rounded p-1 cursor-pointer ${selectedImage === index ? 'border-success border-2' : ''}`}
                                    style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>

                    {/* Right - Product Details */}
                    <Col lg={7}>
                        {/* Title & Rating */}
                        <h2 className="fw-bold mb-2">{product.name}</h2>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <StarRating rating={Math.round(avgRating)} />
                            <span className="text-muted">
                                {avgRating} | {reviewCount} Ratings
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <span className="text-success fw-bold" style={{ fontSize: "2rem" }}>
                                ₹{price * quantity}
                            </span>
                            <span className="text-muted text-decoration-line-through ms-2" style={{ fontSize: "1.2rem" }}>
                                ₹{mrp * quantity}
                            </span>
                            <Badge bg="danger" className="ms-2">10% OFF</Badge>
                            <div className="text-muted small">[MRP is inclusive of all taxes]</div>
                        </div>

                        {/* Country of Origin */}
                        <div className="mb-3">
                            <strong>Country of origin:</strong> India 🇮🇳
                        </div>

                        {/* Size Selection */}
                        <div className="mb-3">
                            <strong>Size:</strong>
                            <div className="d-flex gap-2 mt-2 flex-wrap">
                                {Object.keys(product.prices).map((weight) => (
                                    <Button
                                        key={weight}
                                        variant={selectedWeight === weight ? "success" : "outline-secondary"}
                                        onClick={() => setSelectedWeight(weight)}
                                        className="px-4"
                                    >
                                        {weight}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-3">
                            <span className="text-success">
                                <span className="bg-success rounded-circle d-inline-block me-2" style={{ width: "10px", height: "10px" }}></span>
                                Stock is available
                            </span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-4">
                            <strong>Quantity:</strong>
                            <div className="d-flex align-items-center gap-2 mt-2">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <FaMinus />
                                </Button>
                                <span className="px-3 py-1 border rounded fw-bold" style={{ minWidth: "50px", textAlign: "center" }}>
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <FaPlus />
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-grid gap-2 mb-4">
                            <Button
                                variant="outline-success"
                                size="lg"
                                onClick={handleAddToCart}
                                className="fw-bold"
                            >
                                Add To Cart
                            </Button>
                            <Button
                                variant="success"
                                size="lg"
                                onClick={handleBuyNow}
                                className="fw-bold"
                            >
                                <FaWhatsapp className="me-2" />
                                Buy it Now
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="d-flex justify-content-between border-top border-bottom py-3 mb-4">
                            {trustBadges.map((badge, index) => (
                                <div key={index} className="text-center">
                                    <badge.icon size={28} className="text-muted mb-1" />
                                    <div className="small fw-semibold">{badge.label}</div>
                                    <div className="small text-muted">{badge.sublabel}</div>
                                </div>
                            ))}
                        </div>

                        {/* Expandable Sections */}
                        <Accordion className="mb-3">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <strong>Ingredients</strong>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {productInfo.ingredients}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <strong>Description</strong>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p>{productInfo.description}</p>
                                    <strong>Benefits:</strong>
                                    <ul className="mb-0 mt-2">
                                        {productInfo.benefits.map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>

                {/* Reviews Section at Bottom */}
                <hr className="my-4" />
                <ProductReviewsSection productName={product.name} />
            </Modal.Body>
        </Modal>
    );
};

export default ProductDetail;
