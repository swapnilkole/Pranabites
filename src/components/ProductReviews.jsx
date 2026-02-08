import { FaStar, FaRegStar, FaStarHalfAlt, FaWhatsapp, FaUserCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";

// ── Time ago helper ──
const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""} ago`;
};

const daysAgoDate = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60), 0, 0);
    return d.toISOString();
};

// ── Base reviews with daysAgo offsets ──
const baseReviewsTemplate = {
    "Almond Coco Dust": [
        { name: "Priya Sharma", rating: 5, review: "The coconut coating is amazing! Perfect balance of sweetness and crunch.", daysAgo: 2 },
        { name: "Amit Patil", rating: 5, review: "Fresh almonds with great coconut flavor. Packaging was excellent too.", daysAgo: 6 },
        { name: "Sneha Kulkarni", rating: 4, review: "Best flavored almonds I've tried! Authentic taste, will reorder.", daysAgo: 14 },
        { name: "Rajesh Kumar", rating: 5, review: "Good quality almonds. Highly recommended for health-conscious people.", daysAgo: 22 },
        { name: "Meena Devi", rating: 5, review: "Ordered for Diwali gifting. Everyone loved it! Premium packaging.", daysAgo: 35 },
        { name: "Aditya Jain", rating: 5, review: "Tried first time, now it's my go-to healthy snack. Perfect sweetness!", daysAgo: 42 },
    ],
    "Almond Hing Jeera": [
        { name: "Suresh Pawar", rating: 5, review: "The hing jeera flavor is so authentic! Reminds me of traditional Indian snacks.", daysAgo: 3 },
        { name: "Kavita Mane", rating: 5, review: "Perfect masala almonds. Spice level is just right, not overpowering.", daysAgo: 8 },
        { name: "Deepak Bhosale", rating: 4, review: "Great flavor combination. Hing and jeera complement each other beautifully.", daysAgo: 16 },
        { name: "Anjali Joshi", rating: 5, review: "Addictive taste! Can't stop at just one handful.", daysAgo: 25 },
        { name: "Ramesh Gupta", rating: 5, review: "Finally a desi flavored almond that tastes like homemade. Love it!", daysAgo: 38 },
    ],
    "American Almond": [
        { name: "Rohit Deshmukh", rating: 5, review: "Premium quality almonds. Very fresh, crunchy, and perfectly sized.", daysAgo: 40 },
        { name: "Nandini Rao", rating: 5, review: "Best plain almonds I've bought online. Wish they restock soon!", daysAgo: 55 },
        { name: "Vinay Kulkarni", rating: 4, review: "Great quality. Used them for almond milk - turned out amazing.", daysAgo: 62 },
    ],
    "Cheese & Herb Cashew": [
        { name: "Neha Gaikwad", rating: 5, review: "Unique flavor! The cheese and herbs combination is absolutely addictive.", daysAgo: 2 },
        { name: "Vikram Chavan", rating: 5, review: "Finally found a healthy snack that tastes like gourmet food!", daysAgo: 7 },
        { name: "Pooja Shinde", rating: 4, review: "Tasty and crunchy. The herb seasoning is perfectly balanced.", daysAgo: 15 },
        { name: "Arjun Nair", rating: 5, review: "Perfect for parties! Everyone asks where I bought them from.", daysAgo: 28 },
        { name: "Tanya Mehta", rating: 5, review: "The cheese flavor is so rich. Best cashew snack I've ever had.", daysAgo: 36 },
        { name: "Kiran Desai", rating: 4, review: "Good quantity for the price. Packaging keeps them fresh for weeks.", daysAgo: 45 },
    ],
    "Kokan Cashew": [
        { name: "Rohit Deshmukh", rating: 5, review: "Premium quality cashews! Perfectly roasted and incredibly fresh.", daysAgo: 3 },
        { name: "Anjali Joshi", rating: 5, review: "Love the natural roasted taste. Pure and no added preservatives.", daysAgo: 9 },
        { name: "Suresh Pawar", rating: 4, review: "Good quality whole cashews. Crunchy, fresh, and great value.", daysAgo: 18 },
        { name: "Neeta Sharma", rating: 5, review: "Best cashews I've ever had! So fresh and buttery smooth.", daysAgo: 26 },
        { name: "Manoj Patil", rating: 5, review: "Authentic Konkan taste. Reminds me of the ones we get in Goa.", daysAgo: 40 },
    ],
    "Raisin Milk": [
        { name: "Manish Jadhav", rating: 5, review: "The milk chocolate coating makes these raisins absolutely irresistible!", daysAgo: 1 },
        { name: "Kavita Mane", rating: 4, review: "Delicious combination. Kids finished the entire pack in 2 days!", daysAgo: 8 },
        { name: "Rajesh Sawant", rating: 5, review: "Best chocolate raisins I've had. Not too sweet, just perfect.", daysAgo: 17 },
        { name: "Shweta Patil", rating: 5, review: "Perfect dessert alternative! Healthy, delicious, and guilt-free.", daysAgo: 24 },
        { name: "Nikhil Sharma", rating: 5, review: "Ordered 3 packs - one for home, office, and for gifting. All loved it!", daysAgo: 33 },
    ],
    "Raisin Normal": [
        { name: "Meera Kale", rating: 5, review: "Good quality green raisins. Very sweet, plump, and fresh.", daysAgo: 40 },
        { name: "Arun More", rating: 4, review: "Nice raisins for everyday use. Fresh and well-packed.", daysAgo: 58 },
        { name: "Sunita Kadam", rating: 5, review: "Best quality green raisins. Add them to my oats every morning.", daysAgo: 65 },
    ],
    "Raisin Black": [
        { name: "Sunita Kadam", rating: 5, review: "Premium black raisins. Rich in iron and taste wonderful.", daysAgo: 38 },
        { name: "Rahul Deshpande", rating: 5, review: "Best quality black raisins. Very juicy and full of flavor.", daysAgo: 52 },
        { name: "Priya Sharma", rating: 4, review: "Great for skin and health. I soak them overnight - amazing results.", daysAgo: 60 },
    ],
    "Pista": [
        { name: "Deepak Bhosale", rating: 5, review: "Premium quality pistachios! Perfectly salted with easy-open shells.", daysAgo: 2 },
        { name: "Sunita Kadam", rating: 5, review: "Fresh and crunchy. The salt level is just right for snacking.", daysAgo: 10 },
        { name: "Arun More", rating: 4, review: "Good quality pista. Airtight packaging keeps them fresh longer.", daysAgo: 19 },
        { name: "Nandini Rao", rating: 5, review: "Best pistachios in the market! Vibrant green kernels, great taste.", daysAgo: 30 },
        { name: "Aarti Joshi", rating: 5, review: "Love the size and quality. Perfect for adding to desserts too.", daysAgo: 42 },
    ],
    "Mix Peri Peri Snack": [
        { name: "Swati Londhe", rating: 5, review: "Perfect spice level! Great for movie nights and evening snacking.", daysAgo: 2 },
        { name: "Nikhil Ghorpade", rating: 5, review: "Best snack mix ever! The peri peri coating is absolutely authentic.", daysAgo: 7 },
        { name: "Ashwini Patil", rating: 4, review: "Spicy and tasty! Love the variety of nuts in the mix.", daysAgo: 16 },
        { name: "Rohan Kulkarni", rating: 5, review: "Good variety in the mix. Peri peri flavor is bold and addictive.", daysAgo: 28 },
        { name: "Divya Nair", rating: 5, review: "Ordered for a house party - literally everyone was fighting for the last handful!", daysAgo: 37 },
        { name: "Sanjay Mohan", rating: 5, review: "This is my third order. The peri peri flavor is consistently amazing.", daysAgo: 44 },
    ],
    "Panchmeva": [
        { name: "Priya Sharma", rating: 5, review: "Authentic panchmeva mix. Perfect for pooja rituals and daily snacking!", daysAgo: 5 },
        { name: "Suresh Pawar", rating: 5, review: "Great quality dry fruits in the mix. Everything is fresh and tasty.", daysAgo: 14 },
        { name: "Meena Devi", rating: 4, review: "Traditional mix with high-quality ingredients. Good for gifting.", daysAgo: 23 },
        { name: "Ganesh Patil", rating: 5, review: "Best panchmeva I've found online. Others add too much mishri, this is balanced.", daysAgo: 35 },
        { name: "Lata Kulkarni", rating: 5, review: "Using for daily pooja. Quality is consistent order after order.", daysAgo: 45 },
    ],
    "Trail Pack (5 x 50g)": [
        { name: "Vikram Chavan", rating: 5, review: "Great way to try all flavors! Every single pack was delicious.", daysAgo: 5 },
        { name: "Neha Gaikwad", rating: 5, review: "Bought this as a gift for my colleague. The recipient absolutely loved it!", daysAgo: 13 },
        { name: "Amit Patil", rating: 5, review: "Best value for money. All 5 flavors are amazing and well-packed.", daysAgo: 22 },
        { name: "Ritu Singh", rating: 4, review: "Perfect sampler pack. Now I know which ones to order in bulk!", daysAgo: 34 },
    ],
    "Mix Peri Peri & Panchmeva Combo": [
        { name: "Rohan Kulkarni", rating: 5, review: "Spicy and traditional - best of both worlds! Great value combo.", daysAgo: 6 },
        { name: "Ashwini Patil", rating: 4, review: "Great combo pack. You get variety and save money too.", daysAgo: 18 },
        { name: "Vishal Jadhav", rating: 5, review: "Bought for home - peri peri for snacking, panchmeva for pooja. Perfect!", daysAgo: 30 },
    ],
    "Pack of 2 Panchmeva": [
        { name: "Rajesh Kumar", rating: 5, review: "Bought for Navratri gifting. Beautiful packaging and premium quality!", daysAgo: 12 },
        { name: "Kavita Mane", rating: 5, review: "Double pack is amazing value. Fresh, delicious, and perfect for festivals.", daysAgo: 24 },
        { name: "Meena Devi", rating: 5, review: "Gifted to 5 families during Diwali. Everyone ordered for themselves after!", daysAgo: 38 },
    ],
};

// ── Review pool for auto-growth ──
const reviewPool = {
    "Almond Coco Dust": [
        { name: "Siddhi Bhosale", rating: 5, review: "Ordered my 4th pack! The coconut dusting is just chef's kiss." },
        { name: "Omkar Patil", rating: 5, review: "My kids prefer these over regular chocolates now. Win for healthy eating!" },
        { name: "Rekha Jain", rating: 4, review: "Fresh and crunchy. Love having these with my evening chai." },
    ],
    "Almond Hing Jeera": [
        { name: "Vivek Sharma", rating: 5, review: "The hing aroma hits you first, then the cumin crunch. Pure bliss!" },
        { name: "Sapna Kulkarni", rating: 5, review: "Gifted to my in-laws. They called to ask where I ordered from!" },
        { name: "Pramod Mane", rating: 4, review: "Good Indian flavor. Wish they had a 500g pack option too." },
    ],
    "Cheese & Herb Cashew": [
        { name: "Ishaan Deshpande", rating: 5, review: "These cashews are dangerously addictive. 250g disappeared in one sitting!" },
        { name: "Megha Pawar", rating: 5, review: "The herb coating is so aromatic. Premium taste, premium packaging." },
        { name: "Rahul Shinde", rating: 4, review: "Better than any imported flavored nuts I've tried. Truly gourmet." },
    ],
    "Kokan Cashew": [
        { name: "Shreya Gaikwad", rating: 5, review: "The buttery flavor of Konkan cashews is unmatched. So fresh!" },
        { name: "Pranav Kulkarni", rating: 5, review: "Been ordering monthly for 3 months. Consistency is key and PranaBites nails it." },
    ],
    "Raisin Milk": [
        { name: "Ananya Desai", rating: 5, review: "My office desk snack! Everyone keeps asking me to share." },
        { name: "Mohit Sawant", rating: 5, review: "The chocolate-to-raisin ratio is perfect. Not too sweet." },
    ],
    "Pista": [
        { name: "Gauri Bhosale", rating: 5, review: "Huge, green, perfectly roasted pistachios. Worth every rupee." },
        { name: "Nitin Chavan", rating: 5, review: "The shells crack open so easily. Fresh and premium quality." },
    ],
    "Mix Peri Peri Snack": [
        { name: "Tanvi Joshi", rating: 5, review: "My Netflix companion! Spicy, crunchy, and healthy. What more do you need?" },
        { name: "Akash Mane", rating: 5, review: "Ordered for a cricket match viewing party. Was the star of the evening!" },
        { name: "Pallavi Rao", rating: 4, review: "Nice mix of different nuts. Peri peri flavor is authentic, not artificial." },
    ],
    "Panchmeva": [
        { name: "Madhuri Patil", rating: 5, review: "Perfect blend for daily pooja. Quality has been great every time." },
        { name: "Sunil Jadhav", rating: 5, review: "Bought for Ganesh Chaturthi. Everyone appreciated the premium quality." },
    ],
    "Trail Pack (5 x 50g)": [
        { name: "Snehal More", rating: 5, review: "Gifted this to my parents. They loved every flavor and now want full packs!" },
        { name: "Dev Nair", rating: 5, review: "Best gift idea for dry fruit lovers. Each flavor is individually packed." },
    ],
    "Mix Peri Peri & Panchmeva Combo": [
        { name: "Anita Sawant", rating: 5, review: "One for the spice lover, one for the traditionalist. Perfect household combo!" },
    ],
    "Pack of 2 Panchmeva": [
        { name: "Swapnil Bhosale", rating: 5, review: "Ordered 3 double packs for festival season. Best bulk gifting option!" },
    ],
};

// ── localStorage key ──
const STORAGE_KEY = "pranabites_reviews";
const AUTO_REVIEW_KEY = "pranabites_lastAutoReview";
const ADDED_POOL_KEY = "pranabites_addedPool";
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

// ── Initialize and manage reviews ──
let reviewsCache = null;

const initializeReviews = () => {
    if (reviewsCache) return reviewsCache;

    let stored = null;
    try {
        stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch { /* ignore */ }

    if (!stored) {
        // First visit: generate reviews with real timestamps
        stored = {};
        for (const [product, reviews] of Object.entries(baseReviewsTemplate)) {
            stored[product] = reviews.map((r) => ({
                name: r.name,
                rating: r.rating,
                review: r.review,
                createdAt: daysAgoDate(r.daysAgo),
            }));
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        localStorage.setItem(AUTO_REVIEW_KEY, new Date().toISOString());
        localStorage.setItem(ADDED_POOL_KEY, JSON.stringify([]));
    }

    // Auto-growth check
    autoGrowReviews(stored);

    reviewsCache = stored;
    return stored;
};

const autoGrowReviews = (stored) => {
    const lastAuto = localStorage.getItem(AUTO_REVIEW_KEY);
    if (!lastAuto) {
        localStorage.setItem(AUTO_REVIEW_KEY, new Date().toISOString());
        return;
    }

    const elapsed = Date.now() - new Date(lastAuto).getTime();
    if (elapsed < TWO_DAYS_MS) return;

    // How many reviews to add (1 per 2 days elapsed)
    const reviewsToAdd = Math.min(Math.floor(elapsed / TWO_DAYS_MS), 3);

    let addedPool = [];
    try {
        addedPool = JSON.parse(localStorage.getItem(ADDED_POOL_KEY)) || [];
    } catch { /* ignore */ }

    let added = 0;
    const productNames = Object.keys(reviewPool);

    for (let i = 0; i < reviewsToAdd && added < reviewsToAdd; i++) {
        // Pick a random product that still has pool reviews
        const shuffled = productNames.sort(() => Math.random() - 0.5);
        let foundOne = false;

        for (const product of shuffled) {
            const pool = reviewPool[product] || [];
            for (const poolReview of pool) {
                const poolId = `${product}__${poolReview.name}`;
                if (!addedPool.includes(poolId)) {
                    // Add this review
                    if (!stored[product]) stored[product] = [];
                    stored[product].unshift({
                        name: poolReview.name,
                        rating: poolReview.rating,
                        review: poolReview.review,
                        createdAt: new Date().toISOString(),
                    });
                    addedPool.push(poolId);
                    added++;
                    foundOne = true;
                    break;
                }
            }
            if (foundOne) break;
        }

        if (!foundOne) break; // Pool exhausted
    }

    if (added > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        localStorage.setItem(ADDED_POOL_KEY, JSON.stringify(addedPool));
    }
    localStorage.setItem(AUTO_REVIEW_KEY, new Date().toISOString());
};

// ── Exported getters ──
export const getProductReviews = (productName) => {
    const data = initializeReviews();
    return data[productName] || [];
};

export const getAverageRating = (productName) => {
    const reviews = getProductReviews(productName);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

export const getReviewCount = (productName) => {
    return getProductReviews(productName).length;
};

// ── Star rating components ──
const StarRating = ({ rating, size = 14 }) => (
    <div className="d-inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            star <= rating ? (
                <FaStar key={star} className="text-warning" size={size} />
            ) : star - 0.5 <= rating ? (
                <FaStarHalfAlt key={star} className="text-warning" size={size} />
            ) : (
                <FaRegStar key={star} className="text-muted" size={size} />
            )
        ))}
    </div>
);

export const StarDisplay = ({ productName }) => {
    const avgRating = getAverageRating(productName);
    const count = getReviewCount(productName);

    return (
        <div className="d-flex align-items-center justify-content-center gap-1">
            <StarRating rating={Math.round(avgRating)} size={12} />
            <small className="text-muted">({count})</small>
        </div>
    );
};

// ── Rating breakdown bar ──
const RatingBar = ({ star, count, total }) => {
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="d-flex align-items-center gap-2 mb-1">
            <small className="text-nowrap" style={{ width: "28px" }}>{star}★</small>
            <div className="flex-grow-1 rounded-pill overflow-hidden" style={{ height: "8px", background: "var(--border-color, #dee2e6)" }}>
                <div
                    className="h-100 rounded-pill"
                    style={{ width: `${percent}%`, background: "#f59e0b", transition: "width 0.5s ease" }}
                />
            </div>
            <small className="text-muted" style={{ width: "24px" }}>{count}</small>
        </div>
    );
};

// ── Full reviews section ──
export const ProductReviewsSection = ({ productName }) => {
    const reviews = getProductReviews(productName);
    const avgRating = getAverageRating(productName);

    // Rating breakdown
    const breakdown = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
    }));

    const handleWriteReview = () => {
        const message = `Hi PranaBites! I want to share my review for "${productName}".\n\nMy Rating: ⭐⭐⭐⭐⭐\nMy Review: `;
        window.open(`https://wa.me/919993069090?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="p-3 rounded mt-3" style={{ background: "var(--bg-secondary, #f8f9fa)" }}>
            {/* Header with summary */}
            <div className="d-flex flex-wrap justify-content-between align-items-start mb-3 gap-3">
                <div className="d-flex gap-4 align-items-start flex-wrap">
                    {/* Big rating number */}
                    <div className="text-center">
                        <div className="fw-bold" style={{ fontSize: "2.5rem", lineHeight: 1 }}>{avgRating}</div>
                        <StarRating rating={Math.round(Number(avgRating))} size={14} />
                        <div className="text-muted small mt-1">{reviews.length} reviews</div>
                    </div>
                    {/* Rating bars */}
                    <div style={{ minWidth: "160px" }}>
                        {breakdown.map((b) => (
                            <RatingBar key={b.star} star={b.star} count={b.count} total={reviews.length} />
                        ))}
                    </div>
                </div>
                <Button variant="success" size="sm" onClick={handleWriteReview}>
                    <FaWhatsapp className="me-1" /> Write Review
                </Button>
            </div>

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="p-3 rounded mb-2"
                            style={{
                                background: "var(--bg-card, #ffffff)",
                                border: "1px solid var(--border-color, #dee2e6)",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="d-flex align-items-center gap-2">
                                    <FaUserCircle size={28} className="text-muted" />
                                    <div>
                                        <span className="fw-semibold">{review.name}</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <StarRating rating={review.rating} size={11} />
                                            <small className="text-muted">{timeAgo(review.createdAt)}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-0 mt-2 small" style={{ color: "var(--text-secondary, #6c757d)" }}>
                                "{review.review}"
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-3">
                    <p className="text-muted mb-2">No reviews yet. Be the first to review!</p>
                    <Button variant="outline-success" size="sm" onClick={handleWriteReview}>
                        <FaWhatsapp className="me-1" /> Write First Review
                    </Button>
                </div>
            )}
        </div>
    );
};

export { StarRating };
export default ProductReviewsSection;
