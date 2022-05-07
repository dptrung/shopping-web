import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import {
//     PopupboxManager,
//     PopupboxContainer
//   } from 'react-popupbox';

import api from "../../api";
import {
    PopupboxManager,
    PopupboxContainer
} from 'react-popupbox';

function ProductDetail(){
    const [data, setData] = useState()
    const [imgF, setImgF] = useState()
    const idProduct = localStorage.getItem('idProduct')

    useEffect(()=>{
        api.get(`product/detail/${idProduct}`)
        .then((res)=>{
            setData(res.data.data)
            let image = JSON.parse(res.data.data.image)
            setImgF(image[0])
        })
        .catch((errors)=>{
            console.log(errors);
        })
    },[])

    function imageSlide(e){
        const image = e.target.name
        setImgF(image)
    }


    function CarouselProduct(){
        if(data.image){
            const image = JSON.parse(data.image)
            return Object.keys(image).map((key, index)=>{
                return (
                    <div className={"item " + (index==0 ? "active" : "")}>
                        {SimilarProduct()}
                    </div>
                )
            })
        }
    }

    function SimilarProduct(){
        if(data.image){
            const image = JSON.parse(data.image)
            return Object.keys(image).map((key, index) =>{
                return (
                    <a href>
                        <img className="imageProductSlide" name={image[key]} onClick={imageSlide} src={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/` + image[key]} alt="" />
                    </a>
                )
            })
        }
    }
    
   

    function openPopupbox(){
        const content = <img src={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/` + imgF} />
        PopupboxManager.open({
            content,
            config: {
                titleBar: {
                    enable: true,
                    text: 'popup'
                },
                fadeIn: true,
                fadeInSpeed: 500
            }
        })
    }

    function fetchData(){
        if(data){
            if(data.image){
                return (
                    <div class="product-details">
                        <div class="col-sm-5">
                            <div class="view-product">
                            <img className="imageSrc" src={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/` + imgF}/>
                                <button onClick={openPopupbox}>ZOOM</button>
                                <PopupboxContainer/>
                            </div>
                            <div id="similar-product" class="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    {CarouselProduct()}
                                </div>
        
                                {/* Controls */}
                                <a class="left item-control" href="#similar-product" data-slide="prev">
                                <i class="fa fa-angle-left"></i>
                                </a>
                                <a class="right item-control" href="#similar-product" data-slide="next">
                                <i class="fa fa-angle-right"></i>
                                </a>
                            </div>
            
                        </div>
                        <div class="col-sm-7">
                            <div class="product-information">
                                <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                                <h2>{data.name}</h2>
                                <p>Web ID: 1089772</p>
                                <img src="images/product-details/rating.png" alt="" />
                                <span>
                                    <span>US ${data.price}</span>
                                    <label>Quantity:</label>
                                    <input type="text" value="3" />
                                    <button type="button" class="btn btn-fefault cart">
                                        <i class="fa fa-shopping-cart"></i>
                                        Add to cart
                                    </button>
                                </span>
                                <p><b>Availability:</b> In Stock</p>
                                <p><b>Condition:</b> New</p>
                                <p><b>Brand:</b>{data.brand}</p>
                                <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    return(
        <div>
            {fetchData()}
        </div>
    )
}

export default ProductDetail;