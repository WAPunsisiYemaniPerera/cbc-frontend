import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-[70px] flex justify-center items-center bg-gray-100">
      <div className=" w-[500px] h-full flex items-center justify-evenly text-pink-700 text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/cart" className="absolute right-[30px] text-3xl">
          <BsCart4 />
        </Link>
      </div>
    </header>
  );
}
