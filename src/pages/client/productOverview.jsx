import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import getCart, { addToCart } from "../../utils/cart"

export default function ProductOverview(){
    //get the passed id
    //hook
    const params = useParams()
    console.log(params.id)

    if(params.id == null){
        window.location.href = "/products"
    }
    
    const [product,setProduct] = useState(null)
    const [status,setStatus] = useState("loading") //loaded/error

    useEffect(
        ()=>{
            console.log(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id)
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        console.log(res)
                        setProduct(res.data.product)
                        setStatus("loaded")
                    }
                ).catch(
                    ()=>{
                        toast.error("Error loading product details")
                        setStatus("error")
                    }
                )
            }

        },[status]
    )
    return(
        <div className="w-full h-full">
            {
                status == "loading"&&<Loader/>
            }
            {
                status == "loaded"&& 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[50%] h-full ">
                        <ImageSlider images={product.images}/>
                    </div>

                    <div className="w-[50%] h-full p-[40px]">
                        <h1 className="text-3xl text-black font-bold text-center mb-[40px]">{product.name}{" | "}
                            <span className="text-3xl text-gray-600 font-semibold text-center">{product.altNames.join(" | ")}</span>
                        </h1>

                        <div className="w-full flex justify-center mb-[40px]">
                            {
                                product.labeledPrice>product.price?
                                <>
                                    <h2 className="text-3xl mr-[20px]">LKR: {product.price.toFixed(2)}</h2>
                                    <h2 className="text-2xl line-through text-gray-500">LKR: {product.labeledPrice.toFixed(2)}</h2>
                                    
                                </>:
                                    <h2 className="text-3xl mr-[20px]">{product.price}</h2>
                            }
                            
                        </div>

                        <p className="text-xl text-center text-gray-500 mb-[40px]">{product.description}</p>
                        
                        <div className="w-full flex justify-center mb-[40px]">
                            <button 
                                className="bg-pink-800 cursor-pointer text-white px-[20px] border border-pink-800 py-[10px] rounded-lg hover:bg-white hover:text-pink-800 transition-all duration-300" 
                                onClick={() => {
                                    if (product) {
                                        addToCart(product, 1);
                                        toast.success("Product added to cart");
                                        console.log(getCart());
                                    } else {
                                        toast.error("Product not loaded yet");
                                    }
                                }}
                            >
                                Add to Cart
                            </button>
                            <button className="bg-pink-800 cursor-pointer text-white px-[20px] border border-pink-800 py-[10px] rounded-lg hover:bg-white hover:text-pink-800 transition-all duration-300 ml-[20px]">
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>
            }
            {
                status == "error" && <div>
                    Error
                </div>
            }
        </div>
    )
}