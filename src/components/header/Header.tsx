import Image from "next/image";



interface HeaderProps {
  isLogin: boolean;
}

export default function Header({isLogin}:any) {
    return (
        <header className="flex flex-wrap justify-between items-center p-4 bg-[#3C3D37]">
            <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left text-white">
            LevelUp
            </div>
            {isLogin ? (
                <div></div>
            ):
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                <a href="/signup" className="mr-2 sm:mr-4 px-3 sm:px-4 py-1 sm:py-2  text-white text-sm sm:text-base ">
                    Sign Up
                </a>
                <a href="/login" className="px-3 sm:px-4 py-1 sm:py-2  text-white text-sm sm:text-base rounded ">
                    Login
                </a>
            </div>
}
        </header>
    )
}