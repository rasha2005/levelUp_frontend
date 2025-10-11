import PasswordForm from "@/components/common/passwordForm";

export default function New_Password_Instructor() {
    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
         <PasswordForm role="instructor" type="forgot"/>
        </div>
      </div>
        </>
    )
}
