import PasswordForm from "@/components/common/passwordForm";
import Layout from "@/components/header/layout";

export default function New_Password() {
    return (
        <>
        <Layout>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
         <PasswordForm role="user" type="forgot"/>
        </div>
      </div>
      </Layout>
        </>
    )
}

