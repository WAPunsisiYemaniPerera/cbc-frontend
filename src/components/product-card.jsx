import { Link } from "react-router-dom"

export default function ProductCard(props){

    const product = props.product

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] m-4 h-[350px] bg-red-200 shadow-2xl">
            <img className="w-full h-[220px] object-cover" src={product.images[0]}/>
            <div className="h-[110px] w-full flex justify-center  flex-col px-4">
                <p className="text-gray-400 text-sm">{product.productId}</p>
                <span className="text-base font-semibold">{product.name}</span>
                <p className="text-lg text-pink-600">{product.price.toFixed(2)} <span className="line-through text-gray-500 text-sm">{product.price<product.labeledPrice&&product.labeledPrice.toFixed(2)}</span></p>
            </div>
        </Link>
    )
}