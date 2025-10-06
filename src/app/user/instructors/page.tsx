"use client"

import { getCategoryData, getInstructorDetails } from "@/app/lib/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserHeader from "@/components/user/userHeader";
import UserSidebar from "@/components/user/userSideBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";

interface InstructorData {
  id?: string;
  img?: string;
  name: string;
  email: string;
  mobile: string;
  rating: number;
  description?: string;
  experience?: string;
  resume?: string;
  category?: string;
  isApproved?: boolean;
  specializations?: string[];
}

interface CategoryData {
  id?: string;
  catName: string;
}


export default function Instructors()  {
    const router = useRouter();
    const [coaches, setCoaches] = useState<InstructorData[]>([]);
    const [category, setCategory] = useState<CategoryData[]>([]);
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
  
    useEffect(() => {}, []);
  
    useEffect(() => {
      const debounceTimeout = setTimeout(() => {
        setSearchTerm(search);
        setPage(1);
        return () => clearTimeout(debounceTimeout);
      }, 500);
    }, [search]);
  
    const getCatData = async () => {
      const res = await getCategoryData();
      setCategory(res?.data.response.category);
    };
  
    useEffect(() => {
      router.refresh();
      getInstructorData();
      getCatData();
    }, [page, limit, router, searchTerm, selectedCategory]);
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };
       const getInstructorData = async () => {
          const res = await getInstructorDetails(page, limit, searchTerm, selectedCategory);
          setCoaches(res?.data.response.instructor);
          setTotalPages(Math.ceil(res?.data.response.total / limit));
        };
    return (
        <>
        <UserHeader/>
        <UserSidebar/>
            {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 text-center my-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#0F0F0F]">
        Find Your Perfect Coach
      </h1>
      <p className="text-md sm:text-lg text-gray-600 mb-6">
        Discover top instructors and level up your skills with personalized coaching.
      </p>

      {/* Search + Category Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-lg  max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Search by name or specialization"
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-700 rounded-lg px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EAEFEF]"
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-700 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EAEFEF]"
        >
          <option value="">Category</option>
          {category?.map((cat) => (
            <option key={cat.id} value={cat.catName}>
              {cat.catName}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Results Section */}
    <div className="max-w-5xl mx-auto px-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">Coaches</h2>

      {coaches && coaches.length > 0 ? (
        coaches.map((coach) => (
          <div
            key={coach.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border border-[#EEEEEE] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border bg-[#EEEEEE]">
                <AvatarImage src={coach.img} alt={`${coach.name}'s profile`} />
                <AvatarFallback>{coach.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-lg font-semibold text-[#0F0F0F]">{coach.name}</h3>
                <p className="text-gray-500">{coach.category}</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, index) => {
                    const currentRate = index + 1;
                    return (
                      <FaStar
                        key={currentRate}
                        size={14}
                        color={currentRate <= Math.ceil(coach.rating / 10) ? "gold" : "lightgray"}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <Link href={`/user/instructorDetail/${coach.id}`}>
              <div className="mt-4 sm:mt-0 text-[#0F0F0F] font-medium cursor-pointer hover:underline flex items-center gap-1">
                View <FaArrowRight size={16} />
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Image
            src="/images/empty.png"
            alt="No instructors found"
            width={192}
            height={192}
            className="mb-6"
          />
          <h3 className="text-xl font-semibold text-[#0F0F0F]">No instructors found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or category filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {coaches && coaches.length > 0 && (
        <div className="mt-8 flex justify-center items-center gap-4">
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
    </div>
  </>
    )
}

