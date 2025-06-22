import getCart, { addToCart, removeFromCart } from "../../utils/cart"
import { TbTrash } from "react-icons/tb"
import { useEffect, useState } from "react"

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (!cartLoaded) {
            const cartData = getCart()
            setCart(cartData)
            setCartLoaded(true)
        }
    }, [cartLoaded])

    return (
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map((item, index) => (
                        <div key={index} className="w-full h-[150px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">

                            <button
                                className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow-lg cursor-pointer "
                                onClick={() => {
                                    removeFromCart(item.productId) // ✅ fixed typo
                                    setCartLoaded(false) // trigger reload
                                }}
                            >
                                <TbTrash />
                            </button>

                            <img src={item.image} className="h-full aspect-square object-cover" alt={item.name} />

                            <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                <h1 className="text-xl text-black font-semibold">{item.name}</h1>
                                <h2 className="text-lg text-gray-600 font-medium">{item.altNames.join(" | ")}</h2>
                                <h2 className="text-lg text-gray-600 font-medium">LKR: {item.price.toFixed(2)}</h2>
                            </div>

                            <div className="h-full w-[100px] flex justify-center items-center">
                                <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]" 
                                    onClick={()=>{
                                        addToCart(item, -1) // ✅ fixed typo
                                        setCartLoaded(false) // trigger reload
                                    }}>-</button>
                                <h1 className="text-xl text-gray-600 font-medium">{item.quantity}</h1>
                                <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    onClick={()=>{
                                        addToCart(item, 1) // ✅ fixed typo
                                        setCartLoaded(false) // trigger reload
                                    }}>+</button>
                            </div>

                            <div className="h-full w-[100px] flex justify-center items-center">
                                <h1 className="text-xl text-black font-medium">
                                    {(item.price * item.quantity).toFixed(2)}
                                </h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
