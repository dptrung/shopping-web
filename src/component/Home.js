import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Home(){
    let [data, setData] = useState({})

    useEffect(()=>{
        let userData = JSON.parse(localStorage.getItem('userData'))
        if(userData){
          let accessToken = userData.success.token
          // Config để gửi token qua api
          let config = {
              headers: {
                  'Authorization': 'Bearer ' + accessToken,
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
              }
          }
          api.get('user/my-product',config)
          .then((res)=>{
              setData(res.data.data)
          })
  
          .catch((errors)=>{
              console.log(errors);
          })
        }
    },[])

    function aboutProduct(e){
        const idProduct = e.target.className
        localStorage.setItem('idProduct',idProduct)
    }
    
    function addCart(e){
      let quantity = e.target.title
      let id = e.target.id.toString()

      let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};

      cart[id] = (cart[id] ? cart[id] : 0)

      let qty = cart[id] + 1
      cart[id] = qty
      localStorage.setItem('cart',JSON.stringify(cart))
    }

    function fetchData(){
        if(data){
            return Object.keys(data).map((key, index)=>{
                const image = JSON.parse(data[key].image);
                return(
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center" id="1">
                            <img className="imageSrc" src={`http://localhost/laravel/laravel/public/upload/user/product/${data[key].id_user}/` + image[0]} alt=""/>
                            <h2>${data[key].price}</h2>
                            <p>{data[key].detail}</p>
                            <a href="#" id={data[key].id} title={data[key].id} class="btn btn-default add-to-cart" onClick={addCart}>
                              <i class="fa fa-shopping-cart" ></i>
                              Add to cart
                            </a>
                          </div>
                          <div class="product-overlay">
                            <div class="overlay-content">
                              <h2>${data[key].price}</h2>
                              <p>{data[key].detail}</p>
                              <a href="#" id={data[key].id} title={data[key].id} class="btn btn-default add-to-cart" onClick={addCart}>
                                <i class="fa fa-shopping-cart" ></i>
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="choose">
                          <ul class="nav nav-pills nav-justified">
                            <li>
                              <a href=""
                                ><i class="fa fa-plus-square"></i>Add to wishlist</a
                              >
                            </li>
                            <li>
                                <Link to = {'/productDetail'} className={data[key].id} onClick={aboutProduct}>
                                    <i class="fa fa-plus-square"/>
                                    More
                                </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                )
            })
        }
    }
    return(
        <div class="col-sm-9 padding-right">
            <div class="features_items">
              <h2 class="title text-center">Features Items</h2>
              {fetchData()}
            </div>
        </div>
    )
}

export default Home;