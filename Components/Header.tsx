import Link from "next/link";

function Header() {

  return (
    <header className="flex justify-between p-3 sticky z-50 top-0 shadow-sm bg-white bg-opacity-80 backdrop-blur-lg transform-gpu transition-all">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="/icon.png"
            alt=""
            className="w-16 object-contain cursor-pointer"
          />
        </Link>

        <div className="hidden md:inline-flex items-center space-x-5">
          <Link href="/">
            <h1 className="hover:bg-indigo-500 hover:animate-pulse cursor-pointer p-x-4 py-3 p-5 transition-all duration-200 ease-in-out hover:text-bold hover:text-white hover:rounded-full hover:scale-110">Home</h1>
          </Link>
          <Link href="/">
            <h1 className="hover:bg-orange-500 hover:animate-pulse cursor-pointer p-x-4 py-2 p-5 transition-all duration-200 ease-in-out hover:text-bold hover:text-white hover:rounded-full hover:scale-110">About</h1>
          </Link>
          <Link href="https://twitter.com/1yc4n">
            <h1 className="hover:bg-cyan-500 p-x-4 py-2 p-5 hover:animate-pulse cursor-pointer transition-all duration-200 ease-in-out hover:text-bold hover:text-white hover:rounded-full hover:scale-110">Contact</h1>
          </Link>
        </div>
      </div>

      <div className="flex inline-flex items-center space-x-5">
        <Link href="http://github.com/zer0-XD">
          <h3 className="border border-green-600 hover:bg-green-600 animate-pulse hover:scale-150 font-bold hover:text-white px-4 py-1 rounded-full transition-all ease-in-out duration-200">
            Git
          </h3>
        </Link>
      </div>
    </header>
  );
}

export default Header;
