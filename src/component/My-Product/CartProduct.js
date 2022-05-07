import { useEffect, useState } from "react";
import api from "../../api";

function CartProduct(){
    const [cartData , setCartData] = useState([])
    let [quantity, setQuantity] = useState('')
    let cart = JSON.parse(localStorage.getItem('cart'))
    useEffect(()=>{
        api.post('product/cart',cart)
        .then((res)=>{
            setCartData(res.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    function cartBody(){
        if(cartData){
            return cartData.map((value,key)=>{
                const image = JSON.parse(value.image)
                let price = value.price
                quantity = cart[value.id]
                let sumPrice = price * quantity

                function plusQty(){
                    cart[value.id] += 1
                    localStorage.setItem('cart',JSON.stringify(cart))
                }

                function minusQty(){
                    cart[value.id] -= 1
                    localStorage.setItem('cart',JSON.stringify(cart))
                }
                return(
                    <tr>
                        <td className="cart_product">
                            <a href><img className="imageCart" src={`http://localhost/laravel/laravel/public/upload/user/product/${value.id_user}/` + image[0]} alt=""/></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{value.detail}</a></h4>
                            <p>Web ID: {value.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                            <a className="cart_quantity_up" href onClick={plusQty}> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" value={quantity} autoComplete="off" size={2} />
                            <a className="cart_quantity_down" href onClick={minusQty}> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${sumPrice}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                        </td>
                    </tr>
                )
            })
        }
    }
    return(
        <div id="cart_items" className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description" />
                        <td className="price">Price</td>
                        <td className="quantity">Quantity</td>
                        <td className="total">Total</td>
                        <td />
                        </tr>
                    </thead>
                    <tbody>
                        {cartBody()}
                        <tr>
                        <td colSpan={4}>&nbsp;</td>
                        <td colSpan={2}>
                            <table className="table table-condensed total-result">
                            <tbody><tr>
                                <td>Cart Sub Total</td>
                                <td>$59</td>
                                </tr>
                                <tr>
                                <td>Exo Tax</td>
                                <td>$2</td>
                                </tr>
                                <tr className="shipping-cost">
                                <td>Shipping Cost</td>
                                <td>Free</td>										
                                </tr>
                                <tr>
                                <td>Total</td>
                                <td><span>$61</span></td>
                                </tr>
                            </tbody></table>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CartProduct;