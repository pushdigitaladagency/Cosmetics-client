import React, { Suspense } from "react";
import Header from "../Components/Header";
import Category from "../Components/Category";
import Footer from "../Components/Footer";

export default function CategoryPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh", background: "#f5f2eb" }}><p>Loading…</p></div>}>
        <Category />
      </Suspense>
      <Footer />
    </>
  );
}
