import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTimes, FaShoppingCart } from "react-icons/fa";
import { products } from "./Shopping";
import { productDescriptions } from "../ProductDetail";
import { getAverageRating, getReviewCount } from "../ProductReviews";
import SEO from "../SEO";

// Flatten products for lookup
const allProducts = products.flatMap((section) =>
    section.items.map((item) => ({
        ...item,
        category: section.category,
    }))
);

const ProductComparison = () => {
    const navigate = useNavigate();
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("compareList")) || [];
        setCompareList(saved);
    }, []);

    const removeFromCompare = (name) => {
        const updated = compareList.filter((n) => n !== name);
        setCompareList(updated);
        localStorage.setItem("compareList", JSON.stringify(updated));
        if (updated.length < 2) {
            navigate("/shop");
        }
    };

    const clearAll = () => {
        setCompareList([]);
        localStorage.removeItem("compareList");
        navigate("/shop");
    };

    const comparedProducts = compareList
        .map((name) => allProducts.find((p) => p.name === name))
        .filter(Boolean);

    if (comparedProducts.length < 2) {
        return (
            <main className="py-5">
                <Container className="text-center">
                    <h2 className="fw-bold mb-3">Product Comparison</h2>
                    <p className="text-muted">Please select at least 2 products from the shop to compare.</p>
                    <Button variant="success" onClick={() => navigate("/shop")}>
                        <FaArrowLeft className="me-2" />
                        Go to Shop
                    </Button>
                </Container>
            </main>
        );
    }

    return (
        <main className="py-5">
            <SEO
                title="Compare Products - PranaBites"
                description="Compare PranaBites dry fruit products side by side"
                noIndex={true}
            />
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => navigate("/shop")}
                            className="me-2"
                        >
                            <FaArrowLeft className="me-1" /> Back to Shop
                        </Button>
                        <h2 className="fw-bold d-inline-block mb-0 ms-2">
                            Product Comparison
                        </h2>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={clearAll}>
                        Clear All
                    </Button>
                </div>

                {/* Product Cards Row */}
                <Row className="mb-4">
                    {comparedProducts.map((product) => (
                        <Col key={product.name} md={12 / comparedProducts.length} className="mb-3">
                            <Card className="h-100 shadow-sm border-0">
                                <div className="position-relative">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="position-absolute top-0 end-0 m-2 rounded-circle p-1"
                                        style={{ width: "28px", height: "28px", zIndex: 2 }}
                                        onClick={() => removeFromCompare(product.name)}
                                    >
                                        <FaTimes size={12} />
                                    </Button>
                                    <div className="text-center p-3" style={{ height: "200px" }}>
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="img-fluid h-100"
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </div>
                                <Card.Body className="text-center">
                                    <h5 className="fw-bold">{product.name}</h5>
                                    <p className="text-muted small mb-0">{product.flavor}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Comparison Table */}
                <Card className="shadow-sm border-0">
                    <Card.Body className="p-0">
                        <Table responsive bordered className="mb-0 align-middle">
                            <thead className="table-success">
                                <tr>
                                    <th style={{ width: "160px" }}>Feature</th>
                                    {comparedProducts.map((p) => (
                                        <th key={p.name} className="text-center">{p.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Category */}
                                <tr>
                                    <td className="fw-semibold">Category</td>
                                    {comparedProducts.map((p) => (
                                        <td key={p.name} className="text-center">
                                            <Badge bg="success">{p.category}</Badge>
                                        </td>
                                    ))}
                                </tr>

                                {/* Availability */}
                                <tr>
                                    <td className="fw-semibold">Availability</td>
                                    {comparedProducts.map((p) => (
                                        <td key={p.name} className="text-center">
                                            {p.inStock ? (
                                                <Badge bg="success">In Stock</Badge>
                                            ) : (
                                                <Badge bg="danger">Out of Stock</Badge>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Prices */}
                                <tr>
                                    <td className="fw-semibold">Prices</td>
                                    {comparedProducts.map((p) => (
                                        <td key={p.name} className="text-center">
                                            {Object.keys(p.prices).length > 0 ? (
                                                Object.entries(p.prices).map(([weight, data]) => (
                                                    <div key={weight} className="mb-1">
                                                        <span className="text-muted small">{weight}: </span>
                                                        <span className="text-decoration-line-through text-muted small me-1">
                                                            ₹{data.listing}
                                                        </span>
                                                        <span className="fw-bold text-success">₹{data.selling}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-muted">N/A</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rating */}
                                <tr>
                                    <td className="fw-semibold">Rating</td>
                                    {comparedProducts.map((p) => (
                                        <td key={p.name} className="text-center">
                                            <span className="fw-bold text-warning">
                                                {"★".repeat(Math.round(getAverageRating(p.name)))}
                                                {"☆".repeat(5 - Math.round(getAverageRating(p.name)))}
                                            </span>
                                            <div className="small text-muted">
                                                {getAverageRating(p.name)} ({getReviewCount(p.name)} reviews)
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Ingredients */}
                                <tr>
                                    <td className="fw-semibold">Ingredients</td>
                                    {comparedProducts.map((p) => {
                                        const info = productDescriptions[p.name];
                                        return (
                                            <td key={p.name} className="text-center small">
                                                {info?.ingredients || "N/A"}
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Benefits */}
                                <tr>
                                    <td className="fw-semibold">Benefits</td>
                                    {comparedProducts.map((p) => {
                                        const info = productDescriptions[p.name];
                                        return (
                                            <td key={p.name} className="text-center">
                                                {info?.benefits ? (
                                                    <ul className="list-unstyled mb-0 small">
                                                        {info.benefits.map((b, i) => (
                                                            <li key={i}>✓ {b}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Description */}
                                <tr>
                                    <td className="fw-semibold">Description</td>
                                    {comparedProducts.map((p) => {
                                        const info = productDescriptions[p.name];
                                        return (
                                            <td key={p.name} className="small">
                                                {info?.description || "Premium quality dry fruits from PranaBites."}
                                            </td>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Back to shop */}
                <div className="text-center mt-4">
                    <Button variant="success" size="lg" onClick={() => navigate("/shop")}>
                        <FaShoppingCart className="me-2" />
                        Continue Shopping
                    </Button>
                </div>
            </Container>
        </main>
    );
};

export default ProductComparison;
