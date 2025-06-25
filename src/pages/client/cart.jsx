import getCart, { addToCart, getTotal, getTotalForLabeledPrice, removeFromCart } from "../../utils/cart"
import { TbTrash } from "react-icons/tb"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()

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
                                <h2 className="text-lg text-gray-600 font-medium w-full text-end pr-2">LKR: {item.price.toFixed(2)}</h2>
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
                                <h1 className="text-xl text-black font-medium w-full text-end pr-2">
                                    {(item.price * item.quantity).toFixed(2)}
                                </h1>
                            </div>
                        </div>
                    ))
                }

                <div className="w-full flex justify-end">
                    <h1 className="text-xl w-[100px] text-end pr-2 font-semibold">Total</h1>
                    <h1 className="text-xl w-[100px] text-end pr-2 font-semibold">{getTotalForLabeledPrice().toFixed(2)}</h1>

                </div>

                <div className="w-[full] flex justify-end">
                    <h1 className="text-xl w-[100px] text-end pr-2 font-semibold">Discount</h1>
                    <h1 className="text-xl border-b-[2px] w-[100px] text-end pr-2 font-semibold">{(getTotalForLabeledPrice()-getTotal()).toFixed(2)}</h1>

                </div>

                <div className="w-full flex justify-end">
                    <h1 className="text-xl w-[100px] text-end pr-2 font-semibold">Net Total</h1>
                    <h1 className="text-xl w-[100px] text-end pr-2 font-semibold border-b-[4px] border-double">{getTotal().toFixed(2)}</h1>

                </div>

                <div className="w-full  flex justify-end mt-4">
                    <button className="w-[170px] text-xl  text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer" onClick={()=>{
                        navigate("/checkout",
                            {
                                state : {
                                    items : cart
                                }
                            }
                        )
                    }}>Checkout</button>
                </div>
            </div>
        </div>
    )
}
