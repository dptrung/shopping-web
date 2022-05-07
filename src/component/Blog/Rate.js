
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import api from "../../api";

function Rate() {
    let params = useParams()
    const [rating, setRating] = useState (0)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userInput = JSON.parse(localStorage.getItem('userInput'))
    
    function ChangeRating( newRating, name ) {
        setRating(newRating)
        console.log(newRating);

        if(!userInput){
            alert('Bạn phải đăng nhập trước khi đánh giá')
        }else{
            let url = `http://localhost/laravel/laravel/public/api/blog/rate/${params.id}`
            let accessToken = userData.success.token

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }

            const formData = new FormData();
            formData.append('blog_id', params.id);
            formData.append('user_id', userData.Auth.id);
            formData.append("rate", rating)

            api.post(url, formData, config)
            .then(response =>{
            })

            .catch((error) =>{
                console.log(error);
            })
        }
    }
    
    useEffect(()=>{
        api.get('/blog/rate/4')
        .then(response =>{
            const rateData = response.data.data
            if(rateData.length>0){
                let sumRate = 0
                Object.keys(rateData).map((key, index) =>{
                    let rate = rateData[key].rate
                    sumRate = sumRate + rate
                })
                let avgRate = sumRate/rateData.length
                setRating(avgRate)
            }
        })
        .catch(error =>{
            console.log(error);
        })
    })


    return(
        <StarRatings
        rating={rating} 
        starRatedColor="blue"
        changeRating={ChangeRating} 
        numberOfStars={5} 
        name='rating'
        />
    )
}

export default Rate;