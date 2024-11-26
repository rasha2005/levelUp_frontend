import { getWallet } from "@/app/lib/api/instructorApi";
import Navbar from "@/components/instructor/Navbar";
import { cookies } from 'next/headers';

async function Wallet() {
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('authToken')?.value;
    const data = await getWallet(authToken);
    const wallet =  data.data.response.slot;
    return (
       
        <>
      <Navbar/>
      <div className="flex justify-center items-center mt-10">
                <div className="bg-white shadow-md rounded-lg p-6 w-80">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">Wallet Balance</h2>
                    <p className="text-center text-gray-700 text-xl font-semibold">
                    ₹{wallet.balance.toLocaleString()}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Wallet;