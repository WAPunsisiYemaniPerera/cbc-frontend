import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProductForm(){
    const navigate = useNavigate()
    //hook-used to grab the data that brings from another page
    const locationData = useLocation()
    
    if(locationData.state == null){
        toast.error("Please select a product to delete")
        window.location.href = "/admin/products"
    }

    //hook
    //set the passed data
    const [productId, setProductId] = useState(locationData.state.productId);
    const [name, setName] = useState(locationData.state.name);
    const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    //we use array for images, because the user can upload multiple images
    const [images, setImages] = useState([]);
    


    async function handleSubmit(){
        

        //loop to read all the images/files in the array
        const promisesArray = []
        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise
        }

        try{
            //run multiple promises at the same time
            let result = await Promise.all(promisesArray)
            
            //if there are no new images uploaded the same images should be there
            if(images.length == 0){
                result = locationData.state.images
            }
            

            //take the alternative names string and convert it to array
            const altNamesInArray = altNames.split(",")

            const product = {
                productId : productId,
                name : name,
                altNames : altNamesInArray,
                price : price,
                labeledPrice : labeledPrice,
                description : description,
                stock : stock,
                images : result
            }

            //get the token that is saved in the local storage
            //which we created in loginPage.jsx
            const token = localStorage.getItem("token")
            console.log(token)

            //axios call
            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
                    headers : {
                        "Authorization" : "Bearer "+token,
                    },
                })
            toast.success("Product updated successfully");
            navigate("/admin/products")

    }catch(error){
        console.log(error);
        toast.error("Product updating failed")
    }
    }


    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] bg-blue-100 rounded-lg shadow-2xl flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Product</h1>
                <input 
                    disabled 
                    value={productId}
                    onChange={(e)=>{
                        setProductId(e.target.value)
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product ID" />
                <input
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}  
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product Name" />
                <input
                    value={altNames}
                    onChange={(e)=>{
                        setAltNames(e.target.value)
                    }}  
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Alternative Names" />
                <input 
                    value={price}
                    onChange={(e)=>{
                        setPrice(e.target.value)
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Price" />
                <input 
                    value={labeledPrice}
                    onChange={(e)=>{
                        setLabeledPrice(e.target.value)
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Labeled Price" />
                <textarea 
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Description" />
                
                <input
                    type="file"
                    onChange={(e)=>{
                        //get all the images that user uploads
                        setImages(e.target.files)
                    }} 
                    //allow to select multiple images at a time
                    multiple 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product Images" />

                <input
                    value={stock}
                    onChange={(e)=>{
                        setStock(e.target.value)
                    }} 
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Stock" />
                <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                    <Link to={"/admin/products"} className="bg-red-500 text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-red-600">Cancel</Link>
                    <button onClick={handleSubmit} className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-green-600 ml-[10px]">Edit Product</button>
                </div>
            </div>
        </div>
    )
}