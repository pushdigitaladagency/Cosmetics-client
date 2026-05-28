"use client";

import React, { useEffect, useState } from "react";
import "./Product.css";
import {
  ArrowLeft,
  Star,
  MessageCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

const ProductDetails = () => {
  const params = useParams();
  const products_id = params?.products_id;
  const [catid, setCatid] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);



  useEffect(() => {
    if (!products_id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/api/products/${products_id}`
        );
        if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
        const data = await res.json();
        // API may return an array or a single object
        const productData = Array.isArray(data) ? data[0] : data;
        setProduct(productData);
        setCatid(productData.catcode);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [products_id]);

  if (loading) {
    return (
      <div className="product-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p>Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p>{error ?? "Product not found."}</p>
      </div>
    );
  }

  const hero = product.hero_section ?? {};
  const story = product.story_section ?? {};

  return (
    <div className="product-page">

      {/* ================= HEADER ================= */}
    

      {/* ================= BREADCRUMB ================= */}
      <div className="breadcrumb">
        <Link href={`/category?catcode=${catid}`} style={{ textDecoration: "none", color: "inherit" }}>
          <ArrowLeft size={16} />
        </Link>

        <span>Products</span>
        <span>·</span>
        <span>Lipcare</span>
        <span>·</span>
        <span>{product.name}</span>
      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="product-section">

        {/* LEFT IMAGE */}
        <div className="product-image-card">
          <img
            src={`/images/${selectedQuantity ? product.image.replace('.svg', `-${selectedQuantity.replace(/\s/g, '')}.svg`) : product.image}`}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="product_content">

          <div className="collection-badge">
            <img src="/images/Icon2.svg" alt="" />{hero.collection?.toUpperCase()}
          </div>

          <h1 className="product-title">
            {hero.title}
          </h1>

          <p className="product-description">
            {hero.short_description}
          </p>

          {/* RATING */}
          <div className="rating-row">

            <div className="stars">
              <Star fill="#4F6D42" strokeWidth={0} />
              <Star fill="#4F6D42" strokeWidth={0} />
              <Star fill="#4F6D42" strokeWidth={0} />
              <Star fill="#4F6D42" strokeWidth={0} />
              <Star className="star5" fill="#F1EFE4" strokeWidth={0} />
            </div>

            <span className="rating-text">
              {hero.rating} · {hero.reviews}
            </span>

          </div>

          {/* VARIANT COLORS (Lipstick only) */}
          {product.variants && product.variants.length > 0 && (
            <div className="variant-row">
              {product.variants.map((variant, i) => (
                <button
                  key={i}
                  className={`variant-circle${selectedQuantity === variant ? ' active' : ''}`}
                  style={{ backgroundColor: { Pink: '#F4A7C1', Red: '#B31B1B', Brown: '#8B5A5A', Maroon: '#5C0A0A' }[variant] || '#ccc' }}
                  onClick={() => setSelectedQuantity(variant)}
                  title={variant}
                />
              ))}
            </div>
          )}

          {/* BUTTON */}
          <button className="enquiry-btn">
            <MessageCircle size={18} />
            Enquiry
          </button>

          {/* DIVIDER */}
          <div className="divider"></div>

          {/* PRODUCT INFO */}



          <div className="info-grid">

            {
              hero.sizes?.length === 3 ? (
                <div className="info-box">
                  
                  <div className="size-options">
                    {hero.sizes.map((size, i) => (
                      <button key={i} className={`size-btn${selectedQuantity === size ? ' active' : ''}`} onClick={() => setSelectedQuantity(size)}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ):(
                <>

                 <div className="info-box" id={Array.isArray(hero?.net_quantity) && hero.net_quantity.length > 1 ? "netedit" : " "} >
  {Array.isArray(hero?.net_quantity) ? (

    hero.net_quantity.map((item, idx) => (
      <button key={idx} className={`quantity-btn${selectedQuantity === item ? ' active' : ''}`} onClick={() => setSelectedQuantity(item)}>
        {item}
      </button>
    ))
  ) : (
    <h4>{hero?.net_quantity}</h4>
  )}

  {
  !(Array.isArray(hero?.net_quantity) && hero.net_quantity.length > 1) && (
    <p>Net Quantity</p>
  )
}
</div>

            <div className="info-box">
              <h4>Hero Ingredients</h4>

              {hero.hero_ingredients?.map((ingredient, i) => (
                <p key={i}>{ingredient}</p>
              ))}
            </div>

            <div className="info-box">
              <h4>{hero.suitability}</h4>
              <p>Suitability</p>
            </div>



</>
              )
            }

          

          </div>
        </div>
      </section>

     <section className="ritual-section">
  <div className="ritual-left">
    <p className="ritual-label">THE STORY</p>

    <h2 className="ritual-title">
      {story.heading?.split(",")[0]},{" "}
      <span>{story.heading?.split(",")[1]?.trim().split(" ")[0]}</span>
      <br />
      {story.heading?.split(",")[1]?.trim().split(" ").slice(1).join(" ")}
    </h2>

    <p className="ritual-desc">
      {story.description}
    </p>

    <h4 className="ritual-claim">
      {story.claim}
    </h4>
  </div>

  <div className="ritual-right">
    <div className="ritual-card">
      <h3>Main Benefits</h3>

      <ol>
        {story.main_benefits?.map((benefit, i) => (
          <li key={i}>{benefit}</li>
        ))}
      </ol>

      <h4>Suitability</h4>

      <ol>
        {story.suitability?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>

    <div className="ritual-card">
      <h3>Benefits List</h3>

     
        {story.benefits_list?.map((benefit, i) => (
          <span key={i}>
            <img src="/images/Icon3.svg" alt="" /> {benefit} <br />
          </span>
        ))}
      
    </div>

    <div className="ritual-card">
      <h3>Safety Warnings</h3>

      {story.safety_warnings?.map((warning, i) => (
        <p key={i}>{warning}</p>
      ))}

      <h4>Storage Instructions</h4>

      {story.storage_instructions?.map((instruction, i) => (
        <p key={i}>{instruction}</p>
      ))}
    </div>

    <div className="ritual-card">

{
  hero.sizes?.length === 3 ? (
    <>
      <h3>Net Quantity</h3>

      {story.net_quantity?.map((item, idx) => (
        <p key={idx}>{item}</p>
      ))}
    </>
  ) : (
    <>
      <h3>How to Use</h3>

      {story.how_to_use?.map((tip, i) => (
        <p key={i}>{tip}</p>
      ))}
    </>
  )
}



      
    </div>
  </div>
</section>

<section className="contact-section">
  <div className="contact-heading">
    <p className="contact-subtitle">SPEAK WITH US</p>

    <h2>
      Have a <span>question?</span>
    </h2>

    <p className="contact-description">
      Tell us a little and we'll be in touch within 24 hours.
    </p>
  </div>

  <div className="contact-form-wrapper">
    <form className="contact-form">
      <div className="contact-grid">
        <input type="text" placeholder="Your Name" />

        <input type="email" placeholder="Email Address" />

        <input type="tel" placeholder="Mobile Number" />

        <div className="select-box">
          <label>Product</label>

          <select>
            <option>{product.name}</option>
          </select>
        </div>
      </div>

      <textarea placeholder="Your Message"></textarea>

      <button type="submit" className="submit-btn">
        <span><img src="/images/Icon1.svg"alt="" /></span>
        Submit Enquiry
      </button>
    </form>
  </div>
</section>

<section className="related-section">
  <div className="related-top">
    <div>
      <p className="related-subtitle">YOU MAY ALSO LOVE</p>

      <h2 className="related-title">
        Related <span>products</span>
      </h2>
    </div>

    <a href="/" className="view-all">
      View all <span>→</span>
    </a>
  </div>

  <div className="related-grid">
    {product.related_products?.map((rp, i) => (
      <Link
        href={`/products/${rp.product_id}`}
        key={rp.product_id || i}
        style={{ textDecoration: "none" }}
      >
        <div className="related-card">
          <div className="related-image">
            <img src={`/images/${rp.image}`} alt={rp.name} />
          </div>

          <h4>{rp.name}</h4>
        </div>
      </Link>
    ))}
  </div>
</section>
    </div>
  );
};

export default ProductDetails;