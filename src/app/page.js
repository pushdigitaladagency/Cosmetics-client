import React from 'react'
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from './Components/Home'
import { getCategories, getCategoryProducts, toSlug } from './lib/data'

// Server Component: warm the shared Data Cache on the home render so that
// categories and every category's products are fetched once here and reused
// across /category and /products/* without refetching on navigation.
async function warmCache() {
  const categories = await getCategories()
  await Promise.all(
    categories.map((c) => getCategoryProducts(c.slug || toSlug(c.name)))
  )
}

async function page() {
  await warmCache()

  return (
    <>
    <Header/>

    <Home/>

    <Footer/>

    </>
  )
}

export default page
