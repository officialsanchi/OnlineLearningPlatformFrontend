"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import CourseCard from "../component/CourseCard"
import { allCourses } from "../data/course"

function CoursesPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filteredCourses, setFilteredCourses] = useState(allCourses)

  // Extract unique categories
  const categories = ["All", ...new Set(allCourses.map((course) => course.category))]

  // Filter courses based on search, category, and price
  useEffect(() => {
    const filtered = allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "" || selectedCategory === "All" || course.category === selectedCategory
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, priceRange])

  // Set category from URL parameter on initial load
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Courses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
                setPriceRange([0, 200])
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Course List */}
        <div className="lg:col-span-3">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
