import { useEffect, useState } from "react";
import api from "../../api";
import ErrorLogin from "../Member/ErrorLogin";

function AddProduct(){
    let userData = JSON.parse(localStorage.getItem('userData'))
    const [brand, setBrand] = useState({})
    const [category, setCategory] = useState({})
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [option, setOption] = useState({})
    const [status, setStatus] = useState()
    let [inputs, setInputs] = useState({});

    useEffect(()=>{
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
    
    function handleStatus(){
        if(inputs.status == 1){
            return(
                <input type="number" name="sale" placeholder="0" onChange={handleInput}/>
            )
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
            if(file.length > 3){
                alert('Bạn chỉ được chọn tối đa 3 hình ảnh')
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
            let accessToken = userData.success.token
            
			// Config để gửi token qua api
			let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			}
			const formData = new FormData();
			formData.append('name', inputs.name)
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

            api.post('/user/add-product', formData, config)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors)
                }
                alert('success')
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
    return(
        <div className="container">
            <div className="row">
				<div className="col-sm-4">
					<div className="signup-form">
						<h2>Create Product</h2>
                        <ErrorLogin errorsProps = {errors}/>
						<form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <input type='text' name="name" placeholder="Name" onChange={handleInput}/>
                            <input type='number' name="price" placeholder="Price" onChange={handleInput}/>
                            <select name="brand" onChange={handleInput}>
                                <option value="">vui long chon brand</option>
                                {BrandSelect()}
                            </select>
                            <select name="category" onChange={handleInput} >
                                <option value="">vui long chon category</option>
                                {CategorySelect()}
                            </select>
                            <select name="status" value={status} onChange={handleInput}>
                                <option value="0">New</option>
                                <option value="1">Sale</option>
                            </select>
                            {handleStatus()}
                            <input type='text' name="company" placeholder="Company profile" onChange={handleInput}/>
                            <input type="file" multiple name="avatar" placeholder="Avatar" onChange={handleFileInput}/>
                            <textarea type='text' name="detail" placeholder="Detail" rows='5' onChange={handleInput}/>

							<button type="submit" className="btn btn-default">Add product</button>
						</form>
					</div>
				</div>
            </div>
        </div>
    )
}

export default AddProduct;