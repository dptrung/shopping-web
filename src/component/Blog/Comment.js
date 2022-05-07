import { useParams } from "react-router-dom";
import api from "../../api";
import { useState } from "react";
import ErrorLogin from "../Member/ErrorLogin";

function Comment(props){
    let params = useParams()
    let errorSubmit = {}
    const idReply = props.props
    const [inputs, setInputs] = useState();
    const [errors, setErrors] = useState({});
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userInput = JSON.parse(localStorage.getItem('userInput'))

    function handleInput(e){
        e.preventDefault();
        const commentInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state,[commentInput] : value}))
    }

    function handleSubmit (e){
        e.preventDefault();
        if(!userInput){
            errorSubmit.commentLogin = 'Bạn phải đăng nhập trước khi bình luận'
            setErrors(errorSubmit)
        }else{
            if(!inputs){
                errorSubmit.binhluan = 'Bạn chưa nhập nội dung bình luận'
                setErrors(errorSubmit)
            }else{
                setErrors({})

                // Đường dẫn api
                let url = `http://localhost/laravel/laravel/public/api/blog/comment/${params.id}`
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
                formData.append('id_blog', params.id);
                formData.append('id_user', userData.Auth.id);
                formData.append("id_comment", idReply ? idReply : 0)
                formData.append('comment', inputs.message);
                formData.append('image_user', userData.Auth.avatar)
                formData.append('name_user', userData.Auth.name)
                console.log(formData);

                api.post(url, formData, config)
                .then(res => {
                    props.getCmt(res.data.data)
                    console.log(res.data);
                })

                .catch((error) =>{
                    console.log(error);
                })
                
            }
        }
    }

    return(
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                    <div className="blank-arrow">
                        <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea name="message" rows={11} defaultValue={""} onChange={handleInput} />
                    <ErrorLogin errorsProps= {errors}/>
                    <a className="btn btn-primary" href onClick={handleSubmit}>post comment</a>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default Comment;