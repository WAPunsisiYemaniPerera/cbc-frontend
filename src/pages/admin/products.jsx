import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductsPage(){
    //Hooks
    const [products, setProducts] = useState([])
    useEffect(
        ()=>{
            //to load and display the products
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
            (response)=>{
                console.log(response.data);
                setProducts(response.data);
            }
    )
        },
        []
    )


    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
                <FaPlus/>
            </Link>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //mapping-get the products which are in product list one by one and do something
                        products.map(
                            //the thing to do when the product mapped
                            (product,index)=>{
                                console.log("Mapping"+product.productId)

                                return(
                                    <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-500 hover:text-white">
                                        <td className="p-2">{product.productId}</td>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.price}</td>
                                        <td className="p-2">{product.labeledPrice}</td>
                                        <td className="p-2">{product.stock}</td>
                                    </tr>
                                    
                                )
                            }
                        )
                    }
                </tbody>
            </table>

            
        </div>
    )
}

//project url = https://avhiweclsvsyvvuayatw.supabase.co
//anon key = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aGl3ZWNsc3ZzeXZ2dWF5YXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTU1NDEsImV4cCI6MjA2NTQ3MTU0MX0.t8i-D4N4ClDtnu4UVpAH03yZ464OaDOnvTZAjyOUGwk