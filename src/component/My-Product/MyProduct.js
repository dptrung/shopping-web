import { useNavigate } from "react-router-dom";
import Product from "./Product";

function MyProduct (){
    const navigate = useNavigate();

    function addProduct(){
        navigate('/addproduct')
    }
    return(
        <div>
            <button onClick={addProduct}>Add New</button>
            <Product/>
        </div>
    )
}

export default MyProduct;