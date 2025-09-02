"use client"
import { addReview } from "@/app/lib/api/userApi";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface ReviewBtnProps {
    id: string;
  }

function ReviewBtn({id}:ReviewBtnProps) {
    const router = useRouter();
    const [isOpen , setIsOpen] = useState(false)
    const [value , setValue] = useState("");
    const handleOpenDialog = () => {
        setIsOpen(true);
    }

    const handleSumbit = async() => {
        const res = await addReview( id ,value);
        router.refresh();
    }
    return (
        <>
        <div  className="mt-3 ">
            <AlertDialog>

            <AlertDialogTrigger asChild>

        <button onClick={handleOpenDialog} className="p-1 border border-blue-500 text-blue-500 text-sm sm:text-base rounded hover:bg-blue-500 hover:text-white transition-colors">
        add a review
        </button>
            </AlertDialogTrigger>

            {
                isOpen && (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Add a review
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        {/* <input type="text"  className="border border-gray-200 p-3 rounded-md text-lg w-full" /> */}
                        <label  >
                            <textarea value={value} onChange={(e) => setValue(e.target.value)}  className="border border-gray-200 p-3 rounded-md text-lg w-full">

                            </textarea>
                        </label>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSumbit}>Submit</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                )
            }

            </AlertDialog>
        </div>
        </>
    )
}

export default ReviewBtn;