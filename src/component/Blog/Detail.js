import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rate from "./Rate";
import ListComment from "./ListComment";
import Comment from "./Comment";
import api from "../../api";

function Detail (){
    let params = useParams()

    const [data, setData] = useState({})
    const [commentData, setCommentData] = useState({})
    const [idReply, setIdReply] = useState('')

    function getCmt(inputCmt) {
      setCommentData(commentData.concat(inputCmt));
    }

    function getIdCmt(idCmt){
      setIdReply(idCmt)
    }

    useEffect(()=> {
        api.get(`/blog/detail/${params.id}`)
        .then(response =>{
            setData(response.data.data);
            setCommentData(response.data.data.comment)
        })
        .catch(function (error){
          console.log(error);
        })
      },[])
    function fetchData () {
        if(data){
            return (
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        {/* <span>
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                        </span> */}
                    </div>
                    <a href>
                        <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
                    </a>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                    <p>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

                    <p>
                      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                    <div class="pager-area">
                      <ul class="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                      </ul>
                    </div>
                </div>
            )
        }
    }

    return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {fetchData()}
        <Rate/>
        <ListComment props = {commentData} getIdCmt = {getIdCmt}/>
        <Comment props = {idReply} getCmt = {getCmt}/>
      </div>
    </div>
    )
}

export default Detail;