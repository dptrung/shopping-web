import { useEffect, useState } from "react";
import ErrorLogin from "./ErrorLogin";
import api from "../../api";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

function Login(){
	const [logInputs, setLogInputs] = useState({});
    const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	function handleLogInput (e){
		const nameInput = e.target.name
		const value = e.target.value
		setLogInputs(state => ({...state,[nameInput] : value}))
	}

	function handleLogSubmit (e){
		e.preventDefault();
		
		let errorSubmit = {}
		let flag = true
		let isEmailAddress = val => {
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(val);
        }

		if(logInputs.email == undefined){
			flag = false
			errorSubmit.email = 'Vui long nhap Email'
		}else{
			if(isEmailAddress(logInputs.email) == false){
				flag = false
				errorSubmit.email = 'Nhap sai Email'
			}
		}

		if(logInputs.password == undefined){
			flag = false
			errorSubmit.password = 'Vui long nhap mat khau'
		}

		if(!flag){
			setErrors(errorSubmit)
		}else{
			setErrors({})

			api.post('/login', logInputs)
			.then((res) =>{
				if(res.data.errors){
					setErrors(res.data.errors)
				}else{
					alert(res.data.response)
					navigate('/');
					localStorage.setItem('userInput',JSON.stringify(logInputs))
					localStorage.setItem('userData',JSON.stringify(res.data))
				}
			})

			.catch((error) => {
				console.log(error);
			})
		}
	
	}

    return(
        <div className="container">
			<div className="row">
				<div className="col-sm-4 col-sm-offset-1">
					<div className="login-form">
						<h2>Login to your account</h2>
						<ErrorLogin errorsProps= {errors}/>
						<form action="#" onSubmit={handleLogSubmit}>
							<input type="text" name="email" placeholder="Email" onChange={handleLogInput}/>
							<input type="text" name="password" placeholder="Password" onChange={handleLogInput}/>
							<span>
								<input type="checkbox" className="checkbox" />
								Keep me signed in
							</span>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
					</div>
				</div>
				<div className="col-sm-1">
					<h2 className="or">OR</h2>
				</div>
				<Register/>
			</div>
		</div>
    )
}
export default Login;