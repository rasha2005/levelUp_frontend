"use client"

import { getCategoryData, getInstructorDetails } from "@/app/lib/api/userApi";
import { useEffect, useState } from "react";
import UserHeader from "@/components/user/userHeader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar , AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";


interface InstructorData {
  id?:string;
  img?:string;
  name:string;
  email:string;
  mobile:string;
  rating:any;
  description?:string;
  experience?:string;
  resume?:string;
  category?:string;
  isApproved?:boolean;

}
interface CategoryData {
  id?:string;
  catName:string;
}

export default function Home() {
  const router  = useRouter()
  const [coaches, setCoaches] = useState<InstructorData[]>([]);
  const [category , setCategory] = useState<CategoryData[]>([]);
  const [search , setSearch] = useState(''); 
   const [searchTerm , setSearchTerm] = useState('');
   const [selectedCategory , setSelectedCategory] = useState('');
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(5); 

  useEffect(() => {
    console.log("workinng")
  },[])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchTerm(search);
      setPage(1);

      return () => clearTimeout(debounceTimeout);
    },500)
  },[search]);


  const handlePageChange = (newPage:number) => {
    console.log("total" , totalPages);
      setPage(newPage)
  }

  const getInstructorData = async() => {
    console.log("selectedCategory",selectedCategory)
      const res = await getInstructorDetails(page , limit , searchTerm  , selectedCategory);
      console.log("res" , res);
      setCoaches(res?.data.response.instructor);
      setTotalPages(Math.ceil(res?.data.response.total / limit));
  }
  const getCatData = async() => {
    const res = await getCategoryData();
    console.log("reffs" , res)
    setCategory(res?.data.response.category);

  }

  useEffect(() => {
    router.refresh();
    getInstructorData();
    getCatData();
  },[page , limit , router , searchTerm,selectedCategory]);
 
    return (
      <>
    <UserHeader />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline focus:outline-2 focus:outline-blue-100 "
          />
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ml-4 p-2 border border-gray-300 rounded-lg bg-blue-100 text-gray-700 focus:outline focus:outline-2 focus:outline-blue-100"
          >
            <option value="">Select Category</option>
            {category ? (
            category.map((category) => (
              <option key={category.id} value={category.catName}>
                {category.catName}
              </option>
            ))
            ) : (
              <option></option>
            )
            }
          </select>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Coaches</h2>
        <div className="space-y-4">
        {coaches?.map((coach) => (
    <div
      key={coach.id}
      className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-md"
    >
       <div className="flex items-center space-x-4">
     
        {/* Avatar */}
        <Avatar className="w-12 h-12  border bg-white">
          <AvatarImage
            src={coach.img} // Ensure the `coach` object includes `profileImage` URL
            alt={`${coach.name}'s profile`}
          />
          <AvatarFallback>{coach.name.charAt(0)}</AvatarFallback>
        </Avatar>
     <div>
        <h3 className="text-lg font-semibold text-gray-700">{coach.name}</h3>
        <p className="text-gray-500 mt-1">{coach.category}</p> 
        <div className="flex">
              {[...Array(5)].map((_, index) => {
            const currentRate = index + 1;
  
            return (
              <label key={currentRate}>
                <FaStar
                  size={12}
                  color={
                    currentRate <= Math.ceil(coach.rating / 10) ? "yellow" : "gray"
                  }
                  // className="cursor-pointer"
                  // These handlers are not needed since it's readonly
                  // onMouseEnter={() => setHover(currentRate)}
                  // onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
              </div>
      </div>
      </div>
      <Link href={`/user/instructorDetail/${coach.id}`} ><div className="text-gray-600 cursor-pointer mr-3">view</div></Link>
     
    </div>
    
  ))}
</div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
     
      
      </>
    );
  }
  
