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
            fetchProducts(matched.catcode);
          } else if (res.data.length > 0) {
            setSelectedCategory(res.data[0]);
            fetchProducts(res.data[0].catcode);
          }
        } else if (res.data.length > 0) {
          const firstCat = res.data[0];
          setSelectedCategory(firstCat);
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

  /* Handle category click */
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category.catcode);
  };

  return (
    <div className="Category-page">
      {/* ---------------- Category Section ---------------- */}

      <section className="category-section">
        <div className="category-header">
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
                className={`category-card${
                  selectedCategory?.catcode === item.catcode
                    ? " category-card--active"
                    : ""
                }`}
                key={item._id}
                style={{
                  backgroundImage: `url(/images/${item.catcode}.svg)`,
                }}
                onClick={() => handleCategoryClick(item)}
              >
                <div className="category-overlay">
                  <h3>{item.name}</h3>

                  <button className="discover-btn">
                    Discover
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- Featured Products Section ---------------- */}

      <section className="featured-section">
        <div className="featured-header">
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
                  <div className="product-image-wrapper">
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