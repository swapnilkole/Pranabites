import { FaStar, FaRegStar, FaWhatsapp } from "react-icons/fa";
import { Button } from "react-bootstrap";

// Static reviews data - easily replaceable with API data later
const reviewsData = {
    "Almond Coco Dust": [
        { name: "Priya Sharma", rating: 5, review: "The coconut coating is amazing! Perfect balance of sweetness.", date: "2 days ago" },
        { name: "Amit Patil", rating: 5, review: "Fresh almonds with great coconut flavor. Packaging was excellent.", date: "1 week ago" },
        { name: "Sneha Kulkarni", rating: 4, review: "Best flavored almonds I've tried! Taste is authentic.", date: "2 weeks ago" },
        { name: "Rajesh Kumar", rating: 5, review: "Good quality almonds. Recommended for health-conscious people.", date: "3 weeks ago" },
        { name: "Meena Devi", rating: 5, review: "Ordered for Diwali gifting. Everyone loved it!", date: "1 month ago" },
    ],
    "Almond Hing Jeera": [
        { name: "Suresh Pawar", rating: 5, review: "The hing jeera flavor is so authentic! Reminds me of traditional Indian snacks.", date: "3 days ago" },
        { name: "Kavita Mane", rating: 5, review: "Perfect masala almonds. Spice level is just right!", date: "1 week ago" },
        { name: "Deepak Bhosale", rating: 4, review: "Great flavor combination. Hing and jeera complement each other well.", date: "2 weeks ago" },
        { name: "Anjali Joshi", rating: 5, review: "Addictive taste! Can't stop eating these.", date: "3 weeks ago" },
    ],
    "American Almond": [
        { name: "Rohit Deshmukh", rating: 5, review: "Premium quality almonds. Very fresh and crunchy.", date: "1 month ago" },
        { name: "Nandini Rao", rating: 5, review: "Best plain almonds I've bought online.", date: "2 months ago" },
    ],
    "Cheese & Herb Cashew": [
        { name: "Neha Gaikwad", rating: 5, review: "Unique flavor! The cheese and herbs combination is addictive.", date: "2 days ago" },
        { name: "Vikram Chavan", rating: 5, review: "Finally found a healthy snack that tastes amazing!", date: "1 week ago" },
        { name: "Pooja Shinde", rating: 4, review: "Tasty and crunchy. The herb seasoning is just right.", date: "2 weeks ago" },
        { name: "Arjun Nair", rating: 5, review: "Good for parties and gatherings. Everyone loved it!", date: "1 month ago" },
    ],
    "Kokan Cashew": [
        { name: "Rohit Deshmukh", rating: 5, review: "Premium quality cashews! Perfectly roasted and fresh.", date: "3 days ago" },
        { name: "Anjali Joshi", rating: 5, review: "Love the natural roasted taste. No added preservatives.", date: "1 week ago" },
        { name: "Suresh Pawar", rating: 4, review: "Good quality whole cashews. Crunchy and fresh.", date: "2 weeks ago" },
        { name: "Neeta Sharma", rating: 5, review: "Best cashews I've ever had! So fresh and crunchy.", date: "3 weeks ago" },
    ],
    "Raisin Milk": [
        { name: "Manish Jadhav", rating: 5, review: "The milk chocolate coating makes these raisins irresistible!", date: "1 day ago" },
        { name: "Kavita Mane", rating: 4, review: "Delicious combination. Kids finished the pack in 2 days!", date: "1 week ago" },
        { name: "Rajesh Sawant", rating: 5, review: "Best chocolate raisins I've had. Not too sweet.", date: "2 weeks ago" },
        { name: "Shweta Patil", rating: 5, review: "Perfect dessert alternative! Healthy and delicious.", date: "3 weeks ago" },
    ],
    "Raisin Normal": [
        { name: "Meera Kale", rating: 5, review: "Good quality green raisins. Very sweet and fresh.", date: "1 month ago" },
        { name: "Arun More", rating: 4, review: "Nice raisins for everyday use. Fresh packaging.", date: "2 months ago" },
    ],
    "Raisin Black": [
        { name: "Sunita Kadam", rating: 5, review: "Premium black raisins. Rich in iron and taste great.", date: "1 month ago" },
        { name: "Rahul Deshpande", rating: 5, review: "Best quality black raisins. Very juicy.", date: "2 months ago" },
    ],
    "Pista": [
        { name: "Deepak Bhosale", rating: 5, review: "Premium quality pistachios! Perfectly salted.", date: "2 days ago" },
        { name: "Sunita Kadam", rating: 5, review: "Fresh and crunchy. The salt level is just right.", date: "1 week ago" },
        { name: "Arun More", rating: 4, review: "Good quality pista. Packaging keeps them fresh.", date: "2 weeks ago" },
        { name: "Nandini Rao", rating: 5, review: "Best pistachios in the market! Great taste.", date: "1 month ago" },
    ],
    "Mix Peri Peri Snack": [
        { name: "Swati Londhe", rating: 5, review: "Perfect spice level! Great for movie nights.", date: "2 days ago" },
        { name: "Nikhil Ghorpade", rating: 5, review: "Best snack mix ever! Amazing peri peri coating.", date: "1 week ago" },
        { name: "Ashwini Patil", rating: 4, review: "Spicy and tasty! Love the combination of nuts.", date: "2 weeks ago" },
        { name: "Rohan Kulkarni", rating: 5, review: "Good variety in the mix. Peri peri flavor is authentic.", date: "1 month ago" },
    ],
    "Panchmeva": [
        { name: "Priya Sharma", rating: 5, review: "Authentic panchmeva mix. Perfect for pooja and snacking!", date: "1 week ago" },
        { name: "Suresh Pawar", rating: 5, review: "Great quality dry fruits in the mix. Fresh and tasty.", date: "2 weeks ago" },
        { name: "Meena Devi", rating: 4, review: "Traditional mix with good quality ingredients.", date: "3 weeks ago" },
    ],
    "Trail Pack (5 x 50g)": [
        { name: "Vikram Chavan", rating: 5, review: "Great way to try all flavors! Every pack was delicious.", date: "1 week ago" },
        { name: "Neha Gaikwad", rating: 5, review: "Bought this as a gift. The recipient loved it!", date: "2 weeks ago" },
        { name: "Amit Patil", rating: 5, review: "Best value for money. All 5 flavors are amazing.", date: "3 weeks ago" },
    ],
    "Mix Peri Peri & Panchmeva Combo": [
        { name: "Rohan Kulkarni", rating: 5, review: "Spicy and traditional - best of both worlds!", date: "1 week ago" },
        { name: "Ashwini Patil", rating: 4, review: "Great combo pack. Good value for money.", date: "2 weeks ago" },
    ],
    "Pack of 2 Panchmeva": [
        { name: "Rajesh Kumar", rating: 5, review: "Bought for festival gifting. Great packaging and quality!", date: "2 weeks ago" },
        { name: "Kavita Mane", rating: 5, review: "Double pack is great value. Fresh and delicious.", date: "3 weeks ago" },
    ],
};

// Star rating component
const StarRating = ({ rating, size = 14 }) => (
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

// Get reviews and rating for a product
export const getProductReviews = (productName) => {
    return reviewsData[productName] || [];
};

export const getAverageRating = (productName) => {
    const reviews = reviewsData[productName] || [];
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

export const getReviewCount = (productName) => {
    return (reviewsData[productName] || []).length;
};

// Compact star display for product cards
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

// Full reviews section - shown when product is expanded
export const ProductReviewsSection = ({ productName }) => {
    const reviews = reviewsData[productName] || [];
    const avgRating = getAverageRating(productName);

    const handleWriteReview = () => {
        const message = `Hi PranaBites! I want to share my review for "${productName}".\n\nMy Rating: ⭐⭐⭐⭐⭐\nMy Review: `;
        window.open(`https://wa.me/919993069090?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-light p-3 rounded mt-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h5 className="mb-1">Customer Reviews</h5>
                    <div className="d-flex align-items-center gap-2">
                        <StarRating rating={Math.round(avgRating)} size={16} />
                        <span className="fw-bold">{avgRating}</span>
                        <span className="text-muted">({reviews.length} reviews)</span>
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
                        <div key={index} className="bg-white p-2 rounded mb-2 border">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <span className="fw-semibold">{review.name}</span>
                                    <div className="d-flex align-items-center gap-2">
                                        <StarRating rating={review.rating} size={12} />
                                        <small className="text-muted">{review.date}</small>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-0 mt-1 small text-muted">"{review.review}"</p>
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
