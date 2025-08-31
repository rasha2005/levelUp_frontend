"use client"

import { Avatar , AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { upateInstructoProfile } from "@/app/lib/api/instructorApi";
import { upateUserProfile } from "@/app/lib/api/userApi";


interface Role {
    role:"user" | "instructor"
}

function ProfileImg({role}:Role) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profilImg , setProfileImg] = useState('');
    const [updateImg , setUpdateImg] = useState('');
    const [isUpdated , setIsUpdated] = useState(false);

   
    const updateProfile = async() => {
        try{
            if(role === "instructor") {
                
                const res = await upateInstructoProfile(profilImg);
                console.log("ressss" , res)
                
                if (res && res.data && res.data.response) {
                   
                    if (res.data.response.success === true) {
                            setUpdateImg(res.data.response.res.img);
                            
                        if(isUpdated) {
                           
                            setIsUpdated(false);
                        }
                    } else {
                   
                    }
                  } 
            }else{
               
                const res = await upateUserProfile(profilImg);
               
                if(res.data.response.success === true) {
                    setUpdateImg(res.data.response.image);
                            
                    if(isUpdated) {
                        
                        setIsUpdated(false);
                    }
                }     
            }
        }catch(err) {
            console.log(err);
        }
    }

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };

    const handleFileChange = (file:any) => {
        const data = new FormData();
        data.append("file" , file);
        data.append("upload_preset" , "levelup-full");
        data.append("cloud_name" , "levelup-full");
  
        fetch("https://api.cloudinary.com/v1_1/levelup-full/image/upload",{
          method:'post',
          body:data,
        }).then((res) => res.json())
        .then(data => {
          console.log("haha",data);
          setProfileImg(data.url);
          setIsUpdated(true);
         
        })
        .catch((err) => {
          console.log(err);
        } );

        
    }

   

    useEffect(() => {
        
            updateProfile();
    },[profilImg]);
    return (
        <>
         <div className="flex justify-center relative inline-block mt-4" onClick={handleAvatarClick}>
    {/* Avatar container with reduced size */}
    <Avatar className="bg-white p-0.5 shadow-lg h-16 w-16 cursor-pointer"> {/* Reduced to h-16 and w-16 */}
        <AvatarImage src={updateImg} alt="Profile picture" />
        <AvatarFallback>I</AvatarFallback>
    </Avatar>

    {/* Overlay for the "+" icon */}
    <div className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-full">
        <FiPlus className="text-white text-sm" />
    </div>

    {/* Hidden file input for uploading */}
    <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileChange(e.target.files[0]);
      }
    }}
        accept="image/*"
    />
</div>
        </>
    )
}

export default ProfileImg;