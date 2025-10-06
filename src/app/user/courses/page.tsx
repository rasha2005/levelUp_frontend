"use client"

import { getCourseData, getCategoryData } from "@/app/lib/api/userApi";
import UserHeader from "@/components/user/userHeader";
import UserSidebar from "@/components/user/userSideBar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface InstructorData {
  id?: string;
  name: string;
  category?: string;
  rating?: number;
}

interface CourseData {
  id: string;
  name: string;
  thumbnail?: string;
  description: string;
  price: number;
  instructor: InstructorData;
}

interface CategoryData {
  id?: string;
  catName: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState<number | "">("");
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);

  // Debounce search
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchTerm(search);
      setPage(1);
      return () => clearTimeout(debounceTimeout);
    }, 500);
  }, [search]);

   // Debounce price
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
      setPage(1);
    }, 500);
  
    return () => clearTimeout(debounceTimeout);
  }, [minPrice, maxPrice]);

  const getCategories = async () => {
    const res = await getCategoryData();
    setCategories(res?.data.response.category);
  };

  const getCourses = async () => {
    const res = await getCourseData(page, limit, searchTerm, selectedCategory, debouncedMinPrice, debouncedMaxPrice);
    setCourses(res?.data.response.courseData);
    setTotalPages(Math.ceil(res?.data.response.total / limit));
  };

  useEffect(() => {
    getCategories();
    getCourses();
  }, [page, limit, searchTerm, selectedCategory, minPrice, maxPrice]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <>
      <UserHeader />
      <UserSidebar />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 text-center my-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#0F0F0F]">
          Explore Courses
        </h1>
        <p className="text-md sm:text-lg text-gray-600 mb-6">
          Find the perfect course and instructor to level up your skills.
        </p>

        {/* Search + Category + Price Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search by course or instructor"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-700 rounded-lg px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EAEFEF]"
          />
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-700 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EAEFEF]"
          >
            <option value="">Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.catName}>
                {cat.catName}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <input
  type="number"
  placeholder="Min Price"
  min={0} 
  value={minPrice}
  onChange={(e) => {
    const value = e.target.value ? Number(e.target.value) : "";
    setMinPrice(value !== "" && value < 0 ? 0 : value); 
  }}
  className="w-24 border border-gray-700 rounded-lg px-2 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EAEFEF]"
/>

<input
  type="number"
  placeholder="Max Price"
  min={0} 
  value={maxPrice}
  onChange={(e) => {
    const value = e.target.value ? Number(e.target.value) : "";
    setMaxPrice(value !== "" && value < 0 ? 0 : value); 
  }}
  className="w-24 border border-gray-700 rounded-lg px-2 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EAEFEF]"
/>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <img
                  src={course.thumbnail || "/images/default-thumbnail.png"}
                  alt={course.name}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0F0F0F]">{course.name}</h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{course.description}</p>
                <p className="text-sm text-gray-700 mb-2">
                  Instructor: {course.instructor.name} ({course.instructor.category})
                </p>
                <p className="text-sm text-gray-700 font-semibold">Price: ₹{course.price}</p>
                <Link href={`/user/courseDetail/${course.id}`}>
                  <div className="mt-3 text-[#0F0F0F] font-medium cursor-pointer hover:underline flex items-center gap-1">
                    View <FaArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <Image
              src="/images/empty.png"
              alt="No courses found"
              width={192}
              height={192}
              className="mb-6"
            />
            <h3 className="text-xl font-semibold text-[#0F0F0F]">No courses found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search, category, or price filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {courses && courses.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-10 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-[#0F0F0F] text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-[#0F0F0F]">{page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#0F0F0F] text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
