"use client";

import "./Category.css";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

/* ---------------- Main Component ---------------- */

export default function Category() {
  const searchParams = useSearchParams();
  const catcodeFromURL = searchParams.get("catcode");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [viewproduct, setViewProduct] = useState(null);

  const handleProductImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const handleProductImageMouseLeave = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.style.transformOrigin = "center center";
    }
  };

  const handleProductImageTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.style.transformOrigin = `${x}% ${y}%`;
      img.classList.add("product-image-wrapper--touch-zoom");
    }
  };

  const handleProductImageTouchEnd = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.classList.remove("product-image-wrapper--touch-zoom");
      img.style.transformOrigin = "center center";
    }
  };

   const productBenefits = {
    "Lip Care": [
      "Natural hydration",
      "Chemical-free",
      "Eco-friendly choice",
      "Rich in nutrients"
    ],
    "Skin Care": [
      "Natural hydration",
      "Chemical-free",
      "Eco-friendly choice",
      "Rich in nutrients"
    ],
    "Hair Care": [
      "Herbal hair oils",
      "Natural shampoos",
      "Hair masks",
      "Scalp care products"
    ],
    "Hygiene": [
      "Comfortable",
      "Skin-friendly",
      "Leak prevention",
      "Odor control"
    ]
  };

  /* Fetch products for a given catcode */
  const fetchProducts = async (catcode) => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(
        `${BASE_URL}/api/categories/${catcode}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  /* Fetch categories on mount */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await axios.get(`${BASE_URL}/api/categories`);
        setCategories(res.data);

        // If catcode is in URL, select that category; otherwise select first
        if (catcodeFromURL) {
          const matched = res.data.find((c) => c.catcode === catcodeFromURL);
          if (matched) {
            setSelectedCategory(matched);
            setViewProduct(matched.name);
            fetchProducts(matched.catcode);
          } else if (res.data.length > 0) {
            setSelectedCategory(res.data[0]);
            setViewProduct(res.data[0].name);
            fetchProducts(res.data[0].catcode);
          }
        } else if (res.data.length > 0) {
          const firstCat = res.data[0];
          setSelectedCategory(firstCat);
          setViewProduct(firstCat.name);
          fetchProducts(firstCat.catcode);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [catcodeFromURL]);

  /* Re-run reveal animation whenever products list changes */
  useEffect(() => {
    if (products.length === 0) return;

    // Wait one frame so new product cards are in the DOM
    const frame = requestAnimationFrame(() => {
      const els = document.querySelectorAll(
        ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-img"
      );
      if (!els.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );

      els.forEach((el) => {
        el.classList.remove("is-visible");
        observer.observe(el);
      });

      // Clean up
      return () => observer.disconnect();
    });

    return () => cancelAnimationFrame(frame);
  }, [products]);

  /* Handle category click */
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setViewProduct(category.name);
    fetchProducts(category.catcode);

    // Scroll to the featured products section
    setTimeout(() => {
      const target = document.getElementById("featured-products");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="Category-page">
      {/* ---------------- Category Section ---------------- */}

      <section className="category-section">
        <div className="category-header reveal-up">
          <p className="category-subtitle">PRODUCTS</p>
          <h2 className="category-title">Crafted by Category</h2>
        </div>

        {loadingCategories ? (
          <div className="category-loading">
            <p>Loading categories…</p>
          </div>
        ) : (
          <div className="category-grid">
            {categories.map((item) => (
              <div
                className={`category-card ${activeProduct === item.name ? "active" : ""}${
                  selectedCategory?.catcode === item.catcode
                    ? " category-card--active"
                    : ""
                } ${viewproduct === item.name ? "category-card--view" : ""}`}
                key={item._id}
                onClick={() => handleCategoryClick(item)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                <img 
                  className="category-card-bg"
                  src={`/images/${item.catcode}.svg`}
                  alt={item.name}
                />

                <div className="product-overlay">
                  <div className="benefits-content">
                    <h3>Benefits</h3>
                    <ul>
                      {Object.keys(productBenefits).find(
                        (k) => k.toLowerCase() === item.name.toLowerCase()
                      ) ? (
                        productBenefits[
                          Object.keys(productBenefits).find(
                            (k) => k.toLowerCase() === item.name.toLowerCase()
                          )
                        ].map((benefit, i) => (
                          <li key={i}>{i + 1}.{benefit}</li>
                        ))
                      ) : (
                        <>
                          <li>1. Natural hydration</li>
                          <li>2. Chemical-free</li>
                          <li>3. Eco-friendly choice</li>
                          <li>4. Rich in nutrients</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="overlay-text">
                    <h3>{item.name}</h3>
                    <p onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveProduct(activeProduct === item.name ? null : item.name);
                    }}>
                      {activeProduct === item.name ? "Close X" : "Discover →"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- Featured Products Section ---------------- */}

      <section className="featured-section" id="featured-products">
        <div className="featured-header reveal-up">
          <p className="featured-subtitle">FEATURED</p>
          <h2 className="featured-title">
            {selectedCategory ? selectedCategory.name : "Products"}
          </h2>
        </div>

        {loadingProducts ? (
          <div className="category-loading">
            <p>Loading products…</p>
          </div>
        ) : products.length === 0 ? (
          <div className="category-loading">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="featured-grid">
            {products.map((item) => (
              <Link
                href={`/products/${item.product_id}`}
                key={item.product_id}
                style={{ textDecoration: "none" }}
              >
                <div className="product-card">
                  <div
                    className="product-image-wrapper"
                    onMouseMove={handleProductImageMouseMove}
                    onMouseLeave={handleProductImageMouseLeave}
                    onTouchMove={handleProductImageTouchMove}
                    onTouchEnd={handleProductImageTouchEnd}
                    onTouchCancel={handleProductImageTouchEnd}
                  >
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                    />
                  </div>

                  <div className="product-content">
                    <div>
                      <h3>{item.name}</h3>

                      {item.subtitle && (
                        <p className="product-subtitle">{item.subtitle}</p>
                      )}
                    </div>

                    <button className="arrow-btn">
                      <ArrowRight size={22} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}