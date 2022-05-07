import ErrorLogin from "./ErrorLogin";
import { useEffect, useState } from "react";
import api from "../../api";

function Account() {
    let [inputs, setInputs] = useState({
		name:"",
		email:"",
		password:"",
		phone:"",
		address:""
	});

    const [avatar, setAvatar] = useState('');
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState();
	let userData = JSON.parse(localStorage.getItem('userData'))
	let userInput = JSON.parse(localStorage.getItem('userInput'))

	useEffect(() =>{
		setInputs({
			name: userData.Auth.name,
			email: userData.Auth.email,
			password: userInput.password,
			phone: userData.Auth.phone,
			address: userData.Auth.address
		})
	},[])
	
    function handleInput(e){
		const nameInput = e.target.name
        const value = e.target.value
        setInputs(state =>({...state,[nameInput] : value}))
    }
	
    function handleFileInput(e) {
		const fileInput = e.target.files
        const value = fileInput[0]
		
        let reader = new FileReader();
        reader.onload = (e) => {
			setAvatar(e.target.result);
            setFile(value);
        };
        reader.readAsDataURL(value)
    }
	
    function handleSubmit(e){
		e.preventDefault();
		
        let errorSubmit = {}
        let flag = true

		if(inputs.name == ""){
			flag = false
			errorSubmit.phone = 'Vui long nhap ten'
		}

        if(inputs.phone == ""){
			flag = false
			errorSubmit.phone = 'Vui long nhap so dien thoai'
		}

        if(inputs.address == ""){
			flag = false
			errorSubmit.address = 'Vui long nhap dia chi'
		}

        if(file == undefined){
			flag = false
			errorSubmit.avatar = 'Vui long chon avatar'
		}else{
			let fileType = file.type.split('/').pop();
			let formInput = ['png', 'gif', 'jpeg', 'jpg' ]

			if(formInput.includes(fileType) == false){
				flag = false
				errorSubmit.avatar = 'Sai định dạng avatar'
			}

			if(file.size > 1024 * 1024){
				flag = false;
				errorSubmit.avatar= 'Kích thước File phải nhỏ hơn 1mb'
			}
		}

        if(!flag){
			setErrors(errorSubmit)
		}else{
            setErrors({})
			let accessToken = userData.success.token
    
			// Config để gửi token qua api
			let config = {
				headers: {
					'Authorization': 'Bearer ' + accessToken,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			}

			console.log(inputs);
			const formData = new FormData();
			formData.append('name', userData.Auth.name)
			formData.append('email', userData.Auth.email)
			formData.append('password', userInput.password)
			formData.append('phone', userData.Auth.phone)
			formData.append('address', userData.Auth.address)
			formData.append('avatar', avatar)

			api.post(`/user/update/${userData.Auth.id}`, formData, config)
			.then((res) =>{
				if(res.data.errors){
					setErrors(res.data.errors)
					console.log(res.data.errors)
					
				}else{
					alert(res.data)
					console.log(res.data);
					localStorage.setItem('userData',JSON.stringify(res.data))
				}
			})
			.catch((error)=>{
				console.log(error);
			})
        }
    }
    return(
        <div className="container">
            <div className="row">
				<div className="col-sm-4">
					<div className="signup-form">
						<h2>New User Update</h2>
						<ErrorLogin errorsProps= {errors}/>
						<form encType="multipart/form-data" onSubmit={handleSubmit}>
							<input type="text" name="name" onChange={handleInput} value={inputs.name}/>
							<input readOnly type="email" name="email" onChange={handleInput} value={inputs.email}/>
							<input type="password" name="password" onChange={handleInput} value={inputs.password}/>
							<input type="number" name="phone" onChange={handleInput} value={inputs.phone}/>
							<input type="text" name="address" onChange={handleInput} value={inputs.address}/>
							<input type="file" name="avatar" onChange={handleFileInput}/>
							<button type="submit" className="btn btn-default">Update</button>
						</form>
					</div>
				</div>
            </div>
        </div>
    )
}

export default Account;