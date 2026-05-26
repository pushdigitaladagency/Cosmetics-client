"use client";

import React from "react";
import "./Product.css";
import {
  ArrowLeft,
  Star,
  MessageCircle,
} from "lucide-react";

const ProductDetails = () => {
  return (
    <div className="product-page">

      {/* ================= HEADER ================= */}
    

      {/* ================= BREADCRUMB ================= */}
      <div className="breadcrumb">
        <ArrowLeft size={16} />

        <span>Products</span>
        <span>·</span>
        <span>Lipcare</span>
        <span>·</span>
        <span>Ghee Infused Lip Butter</span>
      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="product-section">

        {/* LEFT IMAGE */}
        <div className="product-image-card">
          <img
            src="/images/lip-balm1.svg"
            alt="Lip Balm"
            className="product-image"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="product-content">

          <div className="collection-badge">
            <img src="/images/Icon2.svg" alt="" />HERITAGE COLLECTION
          </div>

          <h1 className="product-title">
            Ghee Infused Lip Butter
          </h1>

          <p className="product-description">
            Enriched with natural oil and Vitamin E.
            No added preservative and artificial
            colours or flavor.
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
              4.8 · 214 reviews
            </span>

          </div>

          {/* BUTTON */}
          <button className="enquiry-btn">
            <MessageCircle size={18} />
            Enquiry
          </button>

          {/* DIVIDER */}
          <div className="divider"></div>

          {/* PRODUCT INFO */}
          <div className="info-grid">

            <div className="info-box">
              <h4>10 gms</h4>
              <p>Net Quantity</p>
            </div>

            <div className="info-box">
              <h4>Hero Ingredients</h4>

              <p>Ghee, Rosehip seed oil</p>
              <p>Jojoba oil</p>
              <p>Beeswax</p>
              <p>Shea butter</p>
            </div>

            <div className="info-box">
              <h4>For dry lips</h4>
              <p>Suitability</p>
            </div>

          </div>
        </div>
      </section>

     <section className="ritual-section">
  <div className="ritual-left">
    <p className="ritual-label">THE STORY</p>

    <h2 className="ritual-title">
      Pure ritual, <span>honest</span>
      <br />
      formulation.
    </h2>

    <p className="ritual-desc">
      Enriched with natural oil and Vitamin E. No
      <br />
      added preservative and artificial colours or
      <br />
      flavor.
    </p>

    <h4 className="ritual-claim">
      Dermatologically Tested Claim
    </h4>
  </div>

  <div className="ritual-right">
    <div className="ritual-card">
      <h3>Main Benefits</h3>

      <ol>
        <li>Moisturise Lips, Heals cracked lips</li>
        <li>
          Provides a smooth base and acts as lip
          sleeping mask
        </li>
      </ol>

      <h4>Suitability</h4>

      <ol>
        <li>For pigmented and dry and chapped lips</li>
      </ol>
    </div>

    <div className="ritual-card">
      <h3>Benefits List</h3>

     
        <img src="/images/Icon3.svg" alt="" /> Moisturises lip, Heal cracked lips <br /> 
        <img src="/images/Icon3.svg" alt="" /> Chemical Free, Provides a smooth base <br />
        <img src="/images/Icon3.svg" alt="" /> Removes pigmentation <br />
        <img src="/images/Icon3.svg" alt="" /> Enhances natural lip colour <br />
        <img src="/images/Icon3.svg" alt="" /> Protects against sun damage
      
    </div>

    <div className="ritual-card">
      <h3>Safety Warnings</h3>

      <p>Patch test mandatory for natural products too</p>

      <h4>Storage Instructions</h4>

      <p>Store in dry place</p>
    </div>

    <div className="ritual-card">
      <h3>How to Use</h3>

      <p>Best to apply in the night</p>
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
            <option>Ghee Infused Lip Butter</option>
            <option>Natural Lip Balm</option>
            <option>Herbal Face Cream</option>
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
    <div className="related-card">
      <div className="related-image">
        <img src="/images/beetroot-lipbalm.svg" alt="Beetroot Lip Balm" />
      </div>

      <h4>Beetroot Lip Balm</h4>
    </div>

    <div className="related-card">
      <div className="related-image">
        <img src="/images/hair-mask.svg" alt="Hair Mask Powder" />
      </div>

      <h4>Hair Mask Powder</h4>
    </div>

    <div className="related-card">
      <div className="related-image">
        <img src="/images/manjistha-lipbalm.svg" alt="Manjistha Lip Balm" />
      </div>

      <h4>Manjistha Lip Balm</h4>
    </div>

    <div className="related-card">
      <div className="related-image">
        <img src="/images/strawberry-lipbalm.svg" alt="Strawberry Lip Balm" />
      </div>

      <h4>Strawberry Lip Balm</h4>
    </div>
  </div>
</section>
    </div>
  );
};

export default ProductDetails;