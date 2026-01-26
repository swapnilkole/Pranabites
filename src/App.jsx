import Header from "./components/Pages/Header.jsx";
import LoginRegister from "./components/Pages/LoginRegister.jsx";
import Shopping from "./components/Pages/Shopping.jsx";
import About from "./components/Pages/About.jsx";
import Contact from "./components/Pages/contact.jsx";
import FruitBanner from "./components/Pages/FruitBanner.jsx";
import Home from "./components/Pages/Home.jsx";
import FAQ from "./components/Pages/FAQ.jsx";
import Cart from "./components/Pages/Cart.jsx";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy.jsx";
import Terms from "./components/Pages/Terms.jsx";
import RefundPolicy from "./components/Pages/RefundPolicy.jsx";
import NotFound from "./components/Pages/NotFound.jsx";
import AdminLogin from "./components/Pages/AdminLogin.jsx";
import AdminDashboard from "./components/Pages/AdminDashboard.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Pages/Footer.jsx";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <ErrorBoundary>
            <Toaster position="top-center" reverseOrder={false} />
            <ScrollToTop />
            {!isAdminRoute && <Header />}

            <Routes>
                {/* Home Page */}
                <Route
                    path="/"
                    element={
                        <>
                            <FruitBanner />
                            <Home />
                        </>
                    }
                />

                {/* Main Pages */}
                <Route path="/shop" element={<Shopping />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<LoginRegister />} />

                {/* Legal Pages */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund" element={<RefundPolicy />} />

                {/* Admin Pages */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* 404 - Must be last */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {!isAdminRoute && <Footer />}
        </ErrorBoundary>
    );
}

export default App;
