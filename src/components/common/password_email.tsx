"use client";
import { forgotPassword } from "@/app/lib/api/userApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { forgot_Password } from "@/app/lib/api/instructorApi";

interface OtpProps {
    role: 'user' | 'instructor'; 
   
  }

  const ForgotPassword: React.FC<OtpProps> = ({role}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!email.trim() || !/^[^@\s]+@gmail\.com$/.test(email)) {
      setError("Please enter a valid Gmail address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      
        if(role === "user"){
            const res = await forgotPassword(email);
            if(res?.success === true){
                   router.replace('/user/password_otp');
            }else{
            setLoading(false)
            toast.error(res?.message)
            }
        }else{
          const res = await forgot_Password(email);
          if(res?.success === true){
            router.replace('/instructor/password_otp');
            }else{
            setLoading(false)
            toast.error(res?.message)
            }
        }
     
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <>
        <ToastContainer/>
   
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-cyan-950 to-black">
      <form
        onSubmit={handleNext}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Forgot Password
        </h2>

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          placeholder="example@gmail.com"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 px-4 font-semibold rounded transition-colors ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#0F0F0F] text-white hover:bg-gray-800"
          }`}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </form>
    </div>
    </>
  );
}

export default ForgotPassword;