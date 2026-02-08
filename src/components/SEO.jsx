import { useEffect } from "react";

/**
 * SEO Component - Updates document head for each page
 * Supports title, description, keywords, OG, Twitter, canonical, structured data
 */
const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = "/Images/logo1.jpg",
    ogType = "website",
    structuredData,
    noIndex = false,
}) => {
    const siteName = "PranaBites";
    const baseUrl = "https://pranabites.com";
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Flavored Dry Fruits`;

    useEffect(() => {
        // Update title
        document.title = fullTitle;

        // Helper to update or create meta tag
        const updateMeta = (name, content, isProperty = false) => {
            if (!content) return;
            const attr = isProperty ? "property" : "name";
            let meta = document.querySelector(`meta[${attr}="${name}"]`);
            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute(attr, name);
                document.head.appendChild(meta);
            }
            meta.setAttribute("content", content);
        };

        // Basic meta tags
        updateMeta("description", description);
        updateMeta("keywords", keywords);
        updateMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

        // Open Graph tags
        updateMeta("og:title", fullTitle, true);
        updateMeta("og:description", description, true);
        updateMeta("og:image", ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`, true);
        updateMeta("og:url", canonicalUrl || baseUrl, true);
        updateMeta("og:type", ogType, true);
        updateMeta("og:site_name", siteName, true);

        // Twitter tags (use name attribute per Twitter spec)
        updateMeta("twitter:card", "summary_large_image");
        updateMeta("twitter:title", fullTitle);
        updateMeta("twitter:description", description);
        updateMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`);

        // Update canonical link
        if (canonicalUrl) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement("link");
                canonical.setAttribute("rel", "canonical");
                document.head.appendChild(canonical);
            }
            canonical.setAttribute("href", canonicalUrl);
        }

        // Add structured data (JSON-LD)
        if (structuredData) {
            let script = document.querySelector('script[data-seo="structured-data"]');
            if (!script) {
                script = document.createElement("script");
                script.setAttribute("type", "application/ld+json");
                script.setAttribute("data-seo", "structured-data");
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(structuredData);
        }

        // Cleanup on unmount
        return () => {
            const structuredScript = document.querySelector('script[data-seo="structured-data"]');
            if (structuredScript) {
                structuredScript.remove();
            }
        };
    }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, structuredData, noIndex]);

    return null;
};

// Pre-built structured data generators
export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PranaBites",
    url: "https://pranabites.com",
    logo: "https://pranabites.com/Images/logo1.jpg",
    description: "Premium flavored dry fruits from Kolhapur, Maharashtra",
    foundingLocation: "Kolhapur, Maharashtra, India",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
    },
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-99930-69090",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi", "Marathi"],
    },
    sameAs: ["https://instagram.com/pranabites_"],
});

export const generateProductListSchema = (products) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PranaBites Dry Fruits Collection",
    description: "Premium flavored dry fruits - almonds, cashews, pistachios, raisins",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
        // Extract price from the prices object (selling price of first weight)
        let price = "0";
        if (product.prices && typeof product.prices === "object") {
            const firstWeight = Object.keys(product.prices)[0];
            if (firstWeight) {
                const priceObj = product.prices[firstWeight];
                price = String(priceObj?.selling || priceObj?.listing || priceObj || "0");
            }
        }

        return {
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: product.name,
                description: `Premium ${product.name} - ${product.flavor || "Flavored dry fruit snack"}`,
                image: `https://pranabites.com${product.images?.[0] || product.image}`,
                brand: {
                    "@type": "Brand",
                    name: "PranaBites",
                },
                offers: {
                    "@type": "Offer",
                    priceCurrency: "INR",
                    price: price,
                    availability: product.inStock === false
                        ? "https://schema.org/OutOfStock"
                        : "https://schema.org/InStock",
                    seller: {
                        "@type": "Organization",
                        name: "PranaBites",
                    },
                },
            },
        };
    }),
});

export const generateBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

export const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PranaBites",
    image: "https://pranabites.com/Images/logo1.jpg",
    "@id": "https://pranabites.com",
    url: "https://pranabites.com",
    telephone: "+91-99930-69090",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        postalCode: "416001",
        addressCountry: "IN",
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "20:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "10:00",
            closes: "18:00",
        },
    ],
    priceRange: "₹250-₹500",
});

export const generateFAQSchema = (faqItems) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
});

export const generateWebPageSchema = (name, description, url) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    publisher: {
        "@type": "Organization",
        name: "PranaBites",
        logo: "https://pranabites.com/Images/logo1.jpg",
    },
});

export default SEO;
