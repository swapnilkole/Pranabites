import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign, FaEdit, FaTrash, FaSignOutAlt, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import SEO from "../SEO";

// Default products data
const defaultProducts = [
    { id: 1, name: "Almond Coco Dust", category: "Almond", prices: { "100g": 155, "250g": 350 }, status: "active" },
    { id: 2, name: "Almond Hing Jeera", category: "Almond", prices: { "100g": 177, "250g": 400 }, status: "active" },
    { id: 3, name: "American Almond", category: "Almond", prices: {}, status: "out_of_stock" },
    { id: 4, name: "Cheese & Herb Cashew", category: "Cashew", prices: { "100g": 185, "250g": 419 }, status: "active" },
    { id: 5, name: "Kokan Cashew", category: "Cashew", prices: { "100g": 165, "250g": 359 }, status: "active" },
    { id: 6, name: "Raisin Milk", category: "Raisin", prices: { "100g": 128, "250g": 288 }, status: "active" },
    { id: 7, name: "Raisin Normal", category: "Raisin", prices: {}, status: "out_of_stock" },
    { id: 8, name: "Raisin Black", category: "Raisin", prices: {}, status: "out_of_stock" },
    { id: 9, name: "Pista", category: "Pista", prices: { "100g": 185, "250g": 409 }, status: "active" },
    { id: 10, name: "Mix Peri Peri Snack", category: "Snacks", prices: { "100g": 149, "250g": 329 }, status: "active" },
    { id: 11, name: "Panchmeva", category: "Panchmeva", prices: { "250g": 359 }, status: "active" },
    { id: 12, name: "Trail Pack (5 x 50g)", category: "Combo", prices: { "5x50g": 465 }, status: "active" },
    { id: 13, name: "Mix Peri Peri & Panchmeva Combo", category: "Combo", prices: { "2x250g": 709 }, status: "active" },
    { id: 14, name: "Pack of 2 Panchmeva", category: "Combo", prices: { "2x250g": 699 }, status: "active" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    // Check admin authentication and load data
    useEffect(() => {
        const adminUser = JSON.parse(localStorage.getItem("adminUser"));
        const adminToken = localStorage.getItem("adminToken");
        if (!adminUser || !adminToken) {
            navigate("/admin");
            return;
        }
        setAdmin(adminUser);

        // Load products from localStorage or use defaults
        const savedProducts = JSON.parse(localStorage.getItem("adminProducts"));
        setProducts(savedProducts || defaultProducts);

        // Load orders (simulated)
        const savedOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
        setOrders(savedOrders);

        // Fetch registered users from API
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/admin/users", {
                    headers: { Authorization: `Bearer ${adminToken}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users || []);
                }
            } catch (err) {
                console.error("Failed to fetch users:", err);
                // Fallback to localStorage
                const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                setUsers(registeredUsers);
            }
        };
        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
        toast.success("Logged out successfully");
        navigate("/admin");
    };

    const handleEditProduct = (product) => {
        setEditingProduct({ ...product });
        setShowEditModal(true);
    };

    const handleSaveProduct = () => {
        const updatedProducts = products.map(p =>
            p.id === editingProduct.id ? editingProduct : p
        );
        setProducts(updatedProducts);
        localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
        setShowEditModal(false);
        toast.success("Product updated successfully");
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const updatedProducts = products.filter(p => p.id !== productId);
            setProducts(updatedProducts);
            localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
            toast.success("Product deleted");
        }
    };

    const toggleProductStatus = (productId) => {
        const updatedProducts = products.map(p =>
            p.id === productId
                ? { ...p, status: p.status === "active" ? "out_of_stock" : "active" }
                : p
        );
        setProducts(updatedProducts);
        localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
    };

    // Calculate stats
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.status === "active").length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    if (!admin) return null;

    return (
        <main className="bg-light min-vh-100">
            <SEO
                title="Admin Dashboard - PranaBites"
                description="PranaBites admin dashboard"
                noIndex={true}
            />

            {/* Admin Header */}
            <div className="bg-success text-white py-3">
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0 fw-bold">PranaBites Admin</h4>
                            <small>Welcome, {admin.email}</small>
                        </div>
                        <Button variant="outline-light" size="sm" onClick={handleLogout}>
                            <FaSignOutAlt className="me-2" />
                            Logout
                        </Button>
                    </div>
                </Container>
            </div>

            <Container className="py-4">
                {/* Stats Cards */}
                <Row className="mb-4">
                    <Col md={3} sm={6} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaBox size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-0 fw-bold">{totalProducts}</h3>
                                    <small className="text-muted">Total Products</small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaShoppingCart size={24} className="text-success" />
                                </div>
                                <div>
                                    <h3 className="mb-0 fw-bold">{activeProducts}</h3>
                                    <small className="text-muted">Active Products</small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaUsers size={24} className="text-warning" />
                                </div>
                                <div>
                                    <h3 className="mb-0 fw-bold">{users.length}</h3>
                                    <small className="text-muted">Registered Users</small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="bg-danger bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaRupeeSign size={24} className="text-danger" />
                                </div>
                                <div>
                                    <h3 className="mb-0 fw-bold">{totalRevenue}</h3>
                                    <small className="text-muted">Revenue</small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Tabs */}
                <Card className="border-0 shadow-sm">
                    <Card.Body>
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="mb-4"
                        >
                            <Tab eventKey="overview" title="Overview">
                                <div className="py-3">
                                    <h5 className="fw-bold mb-3">Quick Overview</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Card className="border mb-3">
                                                <Card.Header className="bg-white fw-semibold">
                                                    Recent Activity
                                                </Card.Header>
                                                <Card.Body>
                                                    <p className="text-muted mb-2">
                                                        Admin logged in: {new Date(admin.loginTime).toLocaleString()}
                                                    </p>
                                                    <p className="text-muted mb-0">
                                                        Products managed: {totalProducts}
                                                    </p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card className="border mb-3">
                                                <Card.Header className="bg-white fw-semibold">
                                                    Order Channel
                                                </Card.Header>
                                                <Card.Body>
                                                    <p className="text-muted mb-2">
                                                        Primary: WhatsApp Orders
                                                    </p>
                                                    <p className="text-muted mb-0">
                                                        Phone: +91 99930 69090
                                                    </p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Tab>

                            <Tab eventKey="products" title="Products">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold mb-0">Manage Products</h5>
                                    </div>
                                    <div className="table-responsive">
                                        <Table hover className="align-middle">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Name</th>
                                                    <th>Category</th>
                                                    <th>100g Price</th>
                                                    <th>250g Price</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product, index) => (
                                                    <tr key={product.id}>
                                                        <td>{index + 1}</td>
                                                        <td className="fw-semibold">{product.name}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.prices["100g"] || product.prices["5x50g"] || product.prices["2x250g"] || "—"}</td>
                                                        <td>{product.prices["250g"] || "—"}</td>
                                                        <td>
                                                            <Badge
                                                                bg={product.status === "active" ? "success" : "secondary"}
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => toggleProductStatus(product.id)}
                                                            >
                                                                {product.status}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleEditProduct(product)}
                                                            >
                                                                <FaEdit />
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                            >
                                                                <FaTrash />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Tab>

                            <Tab eventKey="users" title="Users">
                                <div className="py-3">
                                    <h5 className="fw-bold mb-3">Registered Users</h5>
                                    {users.length === 0 ? (
                                        <div className="text-center py-5 text-muted">
                                            <FaUsers size={48} className="mb-3 opacity-50" />
                                            <p>No users registered yet.</p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <Table hover className="align-middle">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Registered</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user, index) => (
                                                        <tr key={user.id || index}>
                                                            <td>{index + 1}</td>
                                                            <td className="fw-semibold">{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>
                                                            <td>
                                                                {user.createdAt
                                                                    ? new Date(user.createdAt).toLocaleDateString()
                                                                    : "N/A"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            <Tab eventKey="orders" title="Orders">
                                <div className="py-3">
                                    <h5 className="fw-bold mb-3">Order Management</h5>
                                    {orders.length === 0 ? (
                                        <div className="text-center py-5 text-muted">
                                            <FaShoppingCart size={48} className="mb-3 opacity-50" />
                                            <p>No orders yet. Orders placed via WhatsApp will appear here.</p>
                                            <small>
                                                Currently, all orders are processed through WhatsApp.
                                                <br />
                                                Contact: +91 99930 69090
                                            </small>
                                        </div>
                                    ) : (
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer</th>
                                                    <th>Items</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td>{order.id}</td>
                                                        <td>{order.customer}</td>
                                                        <td>{order.items}</td>
                                                        <td>{order.total}</td>
                                                        <td>
                                                            <Badge bg="info">{order.status}</Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Container>

            {/* Edit Product Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingProduct && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value
                                    })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={editingProduct.category}
                                    onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        category: e.target.value
                                    })}
                                >
                                    <option value="Almond">Almond</option>
                                    <option value="Cashew">Cashew</option>
                                    <option value="Raisin">Raisin</option>
                                    <option value="Pista">Pista</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Panchmeva">Panchmeva</option>
                                    <option value="Combo">Combo</option>
                                </Form.Select>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>100g Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editingProduct.prices["100g"] || ""}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                prices: {
                                                    ...editingProduct.prices,
                                                    "100g": parseInt(e.target.value) || 0
                                                }
                                            })}
                                            placeholder="Leave empty if N/A"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>250g Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editingProduct.prices["250g"] || ""}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                prices: {
                                                    ...editingProduct.prices,
                                                    "250g": parseInt(e.target.value) || 0
                                                }
                                            })}
                                            placeholder="Leave empty if N/A"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSaveProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
};

export default AdminDashboard;
