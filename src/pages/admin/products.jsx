import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage(){
    //Hooks
    const [products, setProducts] = useState([])
    const navigate = useNavigate()


    //primary variable - used to identify that the products are loaded or not.
    const [loaded, setLoaded] = useState(false)

    useEffect(
        ()=>{
            if(!loaded){
                //to load and display the products
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (response)=>{
                        console.log(response.data);
                        setProducts(response.data);
                        setLoaded(true);
                    }
                )
            }
        },
        [loaded]
    )

    async function deleteProduct(id){
        const token = localStorage.getItem("token")

        if(token == null){
            toast.error("Please login to delete a product")
            return
        }

        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
                headers:{
                    Authorization : "Bearer " +token
                }
            })
            setLoaded(false)
            toast.success("Product deleted successfully")

        }catch(error){
            console.log(error)
            toast.error("Error deleting product")
            return
        }
    }


    return(
        <div className="w-full h-screen rounded-lg relative overflow-auto">

            <Link to={"/admin/addProduct"} className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
                <FaPlus/>
            </Link>

            {loaded&&<table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //mapping-get the products which are in product list one by one and do something
                        products.map(
                            //the thing to do when the product mapped
                            (product,index)=>{
                                
                                return(
                                    <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100">
                                        <td className="p-2">{product.productId}</td>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.price}</td>
                                        <td className="p-2">{product.labeledPrice}</td>
                                        <td className="p-2">{product.stock}</td>
                                        <td className="p-2">
                                            <div className="w-full h-full flex justify-center">
                                                <FaTrashAlt onClick={
                                                    ()=>{
                                                        deleteProduct(product.productId)
                                                    }}
                                                    className="text-[25px] m-[10px] hover:text-red-500" 
                                                />
                                                <FaPencilAlt onClick={
                                                    ()=>{
                                                        navigate("/admin/editProduct",{
                                                            //pas the information of the product that is 
                                                            // selected to the other page (updateProduct.jsx)
                                                            state : product
                                                        }
                                                        )
                                                    }}
                                                    className="text-[25px] m-[10px] hover:text-blue-500" />
                                            </div>
                                        </td>
                                    </tr>
                                    
                                )
                            }
                        )
                    }
                </tbody>
                </table>}

            {!loaded&&
                <Loader/>
            }

            
        </div>
    )
}

