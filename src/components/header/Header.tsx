

export default function Header({isLogin}:any) {
    return (
        <header className="flex flex-wrap justify-between items-center p-4 bg-sky-100">
            <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left">
                LevelUp
            </div>
            {isLogin ? (
                <div></div>
            ):
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                <a href="/signup" className="mr-2 sm:mr-4 px-3 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded hover:bg-blue-600 transition-colors">
                    Sign Up
                </a>
                <a href="/login" className="px-3 sm:px-4 py-1 sm:py-2 border border-blue-500 text-blue-500 text-sm sm:text-base rounded hover:bg-blue-500 hover:text-white transition-colors">
                    Login
                </a>
            </div>
}
        </header>
    )
}