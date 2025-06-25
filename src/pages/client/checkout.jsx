import { TbTrash } from "react-icons/tb"
import { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

export default function CheckoutPage() {
    const location = useLocation() // Import useLocation to access the state passed from the cart page
    const [cart, setCart] = useState(location.state?.items || [])
    const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate()

    function placeOrder() {
        const orderData = {
            name : name, 
            address : address, 
            phoneNumber : phoneNumber, 
            billItems : []
        }
        for (let i = 0; i < cart.length; i++) {
           orderData.billItems[i] = {
            productId: cart[i].productId,
            quantity: cart[i].quantity,
           }
        }
        const token = localStorage.getItem("token");
        console.log(import.meta.env.VITE_BACKEND_URL); // Log the backend URL to ensure it's correct
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
            headers: {
                Authorization: "Bearer " + token,
            }          
        }).then(()=>{
            toast.success("Order placed successfully");
            navigate("/");
        }).catch((error)=>{
            console.log(error);
            toast.error("Order placement failed");
        })
        
    }

    
    function getTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }

    function getTotalForLabeledPrice() {
        let total = 0;      
        cart.forEach(item => {
            total += item.labeledPrice * item.quantity;
        });
        return total;
    }


    return (
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map((item, index) => (
                        <div key={index} className="w-full h-[150px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">

                            <button
                                className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow-lg cursor-pointer "
                                onClick={() => {
                                    const newCart = cart.filter((product) => product.productId !== item.productId)
                                    setCart(newCart)
                                    
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
                                        const newCart = cart;
										newCart[index].quantity -= 1;
										if (newCart[index].quantity <= 0)
											newCart[index].quantity = 1;
										setCart(newCart);
										setCartRefresh(!cartRefresh);
                                    }}>-</button>
                                <h1 className="text-xl text-gray-600 font-medium">{item.quantity}</h1>
                                <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                    onClick={()=>{
                                        const newCart = cart;
										newCart[index].quantity += 1;
										setCart(newCart);
										setCartRefresh(!cartRefresh);
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

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Name</h1>
                    <input 
                        className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Address</h1>
                    <input 
                        className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Phone Number</h1>
                    <input 
                        className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-end mt-4">
                    <button className="w-[170px] text-center text-xl pr-2 bg-pink-400 rounded-lg text-white h-[40px] shadow-lg cursor-pointer"
                    onClick={placeOrder}>
                        Place Order
                        </button>
                </div>
            </div>
        </div>
    )
}
