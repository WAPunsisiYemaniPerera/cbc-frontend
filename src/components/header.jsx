import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-[70px] flex justify-start items-center bg-gray-100">
      <GiHamburgerMenu className="lg:hidden text-3xl text-accent mx-4 cursor-pointer" onClick={
        ()=>{
          setIsOpen(true)
        }
      }/>
      <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-accent text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/cart" className="absolute right-[30px] text-3xl">
          <BsCart4 />
        </Link>
      </div>
      {
        isOpen && (
          <div className=" fixed z-[9999] top-0 left-0 bg-[#00000060] w-full h-screen flex">
              <div className="w-[300px] h-full bg-white flex flex-col justify-start items-start p-4">
                <RxHamburgerMenu className="text-3xl text-accent mb-4 cursor-pointer" onClick={() => setIsOpen(false)} />
                <Link to="/" className="text-xl text-accent my-2">Home</Link>
                <Link to="/products" className="text-xl text-accent my-2">Products</Link>
                <Link to="/contact" className="text-xl text-accent my-2">Contact Us</Link>
                <Link to="/reviews" className="text-xl text-accent my-2">Reviews</Link>
                <Link to="/cart" className="text-xl text-accent my-2">Cart</Link>
                
                

              </div>
          </div>
        )
      }
    </header>
  );
}
