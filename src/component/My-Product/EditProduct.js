import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import ErrorLogin from "../Member/ErrorLogin";

function EditProduct(){
    const navigate = useNavigate();
    let [inputs, setInputs] = useState({
		name:"",
		price:"",
		category:"",
		brand:"",
		status:"",
        sale:"",
        company:"",
        detail:""
	});
    let [avatarCheckBox, setAvatarCheckBox] = useState([])
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [brand, setBrand] = useState({})
    const [category, setCategory] = useState({})
    let idEdit = localStorage.getItem('idEdit')
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
        api.get(`user/product/${idEdit}`,config)
        .then((res)=>{
            setInputs({
                name: res.data.data.name,
                price: res.data.data.price,
                category: res.data.data.id_category,
                brand: res.data.data.id_brand,
                status: res.data.data.status,
                sale: res.data.data.sale,
                company: res.data.data.company_profile,
                detail: res.data.data.detail,
                id_user: res.data.data.id_user,
                image: res.data.data.image,
                id: res.data.data.id
            })
        })
        .catch((error)=>{
            console.log(error);
        })

        api.get('/category-brand')
        .then((res)=>{
            setBrand(res.data.brand);
            setCategory(res.data.category);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    function handleInput (e) {
        const nameInput = e.target.name
		const value = e.target.value
		setInputs(state => ({...state,[nameInput] : value}))
    }

    function handleFileInput (e) {
		const fileInput = e.target.files
        setFile(fileInput)
	}

    function handleCheckInput(e){
        const check = e.target.checked
        const img = e.target.value
        if(check == true){
            setAvatarCheckBox(state => ([...state,img]))
        }
        if(check == false){
            let res = avatarCheckBox.filter(item => !img.includes(item));
            setAvatarCheckBox(res)
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        let errorSubmit = {}
		let flag = true

        if(inputs.name == undefined){
            flag = false
			errorSubmit.name = 'Vui long nhap ten'
		}

        if(inputs.price == undefined){
            flag = false
			errorSubmit.price = 'Vui long nhap gia tien'
		}

        if(inputs.brand == undefined){
            flag = false
			errorSubmit.detail = 'Vui long chon brand'
		}
        
        if(inputs.category == undefined){
            flag = false
			errorSubmit.detail = 'Vui long chon category'
		}

        if(inputs.status==1){
            if(inputs.sale == undefined){
                flag = false
                errorSubmit.detail = 'Vui long nhap sale'
            }else{
                flag = true
            }
        }
        
        if(inputs.company == undefined){
            flag = false
			errorSubmit.company = 'Vui long nhap ten cong ty'
		}
        
        if(inputs.detail == undefined){
            flag = false
			errorSubmit.detail = 'Vui long nhap noi dung'
		}

        if(file == undefined){
            flag = false
			errorSubmit.avatar = 'Vui long chon avatar'
        }else{
            let formInput = ['png', 'gif', 'jpeg', 'jpg' ]
            const image = inputs.image
            let res = image.filter(item => !avatarCheckBox.includes(item));
            let sum = res.length + file.length
            if(sum > 3){
                flag = false
                alert('Bạn chỉ được upload tối đa 3 hình ảnh')
            }
            Object.keys(file).map((key,index) =>{
                let fileType = file[key].type.split('/').pop();
                if(formInput.includes(fileType) == false){
                    flag = false
                    errorSubmit.avatar = 'Sai định dạng avatar'
                }
                if(file[key].size > 1024 * 1024){
                    flag = false;
                    errorSubmit.avatar= 'Kích thước File phải nhỏ hơn 1mb'
                }
            })
        }
        
        if(!flag){
            setErrors(errorSubmit)
		}else{
            setErrors({})
            inputs = {...inputs, file:file}

            const formData = new FormData();
            formData.append('name',inputs.name)
			formData.append('price', inputs.price)
			formData.append('brand', inputs.brand)
			formData.append('category', inputs.category)
			formData.append('status', inputs.status)
			formData.append('company', inputs.company)
			formData.append('file', inputs.file)
			formData.append('detail', inputs.detail)

            if(inputs.status == 0){
                formData.append('sale', 0)
            }

            if(inputs.status == 1){
                formData.append('sale', inputs.sale)
            }

            Object.keys(file).map((item,i) =>{
                formData.append("file[]", file[item])
            })

            Object.keys(avatarCheckBox).map((item,i) =>{
                formData.append("avatarCheckBox[]", avatarCheckBox[item])
            })

            api.post(`/user/edit-product/${inputs.id}`, formData, config)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert('success')
                    navigate('/')
                }
                console.log(res);
            })

            .catch((error)=>{
                console.log(error);
            })
        }
    }

    function BrandSelect(){
        if(brand.length>0){
            return Object.keys(brand).map((key,index) =>{
                return(
                    <option value={brand[key].id}>{brand[key].brand}</option>
                )
            })
        }
    }

    function CategorySelect(){
        if(category.length>0){
            return Object.keys(category).map((key,index) =>{
                return(
                    <option value={category[key].id}>{category[key].category}</option>
                )
            })
        }
    }

    function handleStatus(){
        if(inputs.status == 1){
            return(
                <input type="number" name="sale" value={inputs.sale}/>
            )
        }
    }

    function imageCheckbox(){
        let image = inputs.image
        if(image){
            return image.map((value)=>{
                return(
                    <div style={{width: '100px'}}>
                        <img className="imageSrc" src={`http://localhost/laravel/laravel/public/upload/user/product/${inputs.id_user}/` + value} alt=""/>
                        <input style={{height: '25px'}} type="checkbox" name="checkImage" value={value} onClick={handleCheckInput}/>
                    </div>
                )
            })
        }
    }
    
    return(
        <div className="container">
            <div className="row">
				<div className="col-sm-4">
					<div className="signup-form">
						<h2>Edit Product</h2>
                        <ErrorLogin errorsProps = {errors}/>
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <input type='text' name="name" value={inputs.name} onChange={handleInput}/>
                            <input type='number' name="price" value={inputs.price} onChange={handleInput}/>
                            <select name="category" value={inputs.category} onChange={handleInput}>
                                {CategorySelect()}
                            </select>
                            <select name="brand" value={inputs.brand} onChange={handleInput}>
                                {BrandSelect()}
                            </select>
                            <select name="status" value={inputs.status} onChange={handleInput}>
                                <option value="0">New</option>
                                <option value="1">Sale</option>
                            </select>
                            {handleStatus()}
                            <input type='text' name="company" value={inputs.company} onChange={handleInput}/>
                            <input type="file" multiple name="avatar" onChange={handleFileInput}/>
                            {imageCheckbox()}
                            <textarea type='text' name="detail" value={inputs.detail} rows='5' onChange={handleInput}/>

                            <button type="submit" className="btn btn-default">Edit product</button>
                        </form>
					</div>
				</div>
            </div>
        </div>
    )
}

export default EditProduct;