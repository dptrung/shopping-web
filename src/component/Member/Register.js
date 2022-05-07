import { useEffect, useState } from "react";
import ErrorLogin from "./ErrorLogin";
import api from "../../api";

function Register(){
    let [inputs, setInputs] = useState({});
	const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});

    function handleInput (e) {
        const nameInput = e.target.name
		const value = e.target.value
		setInputs(state => ({...state,[nameInput] : value}))
    }

	function handleFileInput (e) {
		const fileInput = e.target.files
		const value = fileInput[0]
		
		// Send file to api server
		let reader = new FileReader();
		reader.onload = (e) => {
			setAvatar(e.target.result);//cai nay dung de gui qua api
			setFile(value);// cai nay de toan bo thong tin cua file de kiem tra dung luong hoac dinh dang file
		};
		reader.readAsDataURL(value);
	}

	function handleSubmit (e){
		e.preventDefault();

		let errorSubmit = {}
		let flag = true
		let isEmailAddress = val => {
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(val);
        }

		if(inputs.email == undefined){
			flag = false
			errorSubmit.email = 'Vui long nhap Email'
		}else{
			if(isEmailAddress(inputs.email) == false){
				flag = false
				errorSubmit.email = 'Nhap sai Email'
			}
		}

		if(inputs.name == undefined){
			flag = false
			errorSubmit.name = 'Vui long nhap ten'
		}

		if(inputs.password == undefined){
			flag = false
			errorSubmit.password = 'Vui long nhap mat khau'
		}

		if(inputs.phone == undefined){
			flag = false
			errorSubmit.phone = 'Vui long nhap so dien thoai'
		}
		
		if(inputs.address == undefined){
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

			inputs = {...inputs,avatar:avatar, level:0}
			console.log(inputs);
			api.post('/register', inputs)
			.then((res) => {
				if(res.data.errors){
					console.log(res.data.errors);
					setErrors(res.data.errors)
				}else{
					alert(res.data.message);
				}
			})
			.catch((error) =>{
				console.log(error);
			})
		}
	}

    return(
        <div className="container">
            <div className="row">
				<div className="col-sm-4">
					<div className="signup-form">
						<h2>New User Signup!</h2>
						<ErrorLogin errorsProps= {errors}/>
						<form encType="multipart/form-data" onSubmit={handleSubmit}>
							<input type="text" name="name" placeholder="Name" onChange={handleInput}/>
							<input type="email" name="email" placeholder="Email" onChange={handleInput}/>
							<input type="password" name="password" placeholder="Password" onChange={handleInput}/>
							<input type="number" name="phone" placeholder="Phone Number" onChange={handleInput}/>
							<input type="text" name="address" placeholder="Address" onChange={handleInput}/>
							<input type="file" name="avatar" placeholder="Avatar" onChange={handleFileInput}/>
							<button type="submit" className="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
            </div>
        </div>
    )
}

export default Register;