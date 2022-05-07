import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Product(){
  const navigate = useNavigate();
  const [productData, setProductData] = useState({})
  let userData = JSON.parse(localStorage.getItem('userData'))
  let accessToken = userData.success.token
  // Config để gửi token qua api
  let config = {
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
      }
  }
  useEffect(()=>{
      
      api.get(`user/my-product`, config)
      .then((res)=>{
          setProductData(res.data.data);
      })
      .catch((error)=>{
          console.log(error);
      })
  },[])

  function removeProduct(e){
    const idRemove = e.target.name

    api.get(`user/delete-product/${idRemove}`, config)
    .then((res)=>{
      setProductData(res.data.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function editProduct(e){
    const idEdit = e.target.name
    localStorage.setItem('idEdit',idEdit)
    navigate('/editProduct')
  }

  function bodyAppend (){
    if(productData){
      return Object.keys(productData).map((key, index) => {
        const image = JSON.parse(productData[key].image);
        return(
          <tr className="trProduct">
            <td id="paddingTd" className="id">{productData[key].id}</td>
            <td id="paddingTd" className="name">{productData[key].name}</td>
            <td id="paddingTd" className="imageBody">
              <a className="imageBodyA" href>
                <img className="imageSrc" src={`http://localhost/laravel/laravel/public/upload/user/product/${productData[key].id_user}/` + image[0]} alt=""/>
              </a>
            </td>
            <td id="paddingTd" className="price">${productData[key].price}</td>
            <td id="paddingTd" className="action">
              <button className="editButton" name={productData[key].id} onClick={editProduct}>edit</button>
              <button name={productData[key].id} onClick={removeProduct}>remove</button>
            </td>
          </tr>
        )
      })
    }
  }

  return(
      <div className="table-responsive cart_info">
      <table className="table table-condensed" style={{width: '70%', marginTop: '20px'}}>
        <thead>
          <tr className="cart_menu">
            <td id="paddingTd" className="id">Id</td>
            <td id="paddingTd" className="name">Name</td>
            <td id="paddingTd" className="image">Image</td>
            <td id="paddingTd" className="price">Price</td>
            <td id="paddingTd" className="action">Action</td>
          </tr>
        </thead>
        <tbody>
          {bodyAppend()}
          {/* <tr>
              <td className="id">18</td>
              <td className="name">Duong phuoc trung</td>
              <td className="image"></td>
              <td className="price">20$</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}
export default Product;