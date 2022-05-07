import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

function ListComment(props){
  const commentData = props.props

  if(Object.keys(commentData).length > 0){
    return Object.keys(commentData).map((key, index) =>{

      function onClickReply (e){
        e.preventDefault();
        props.getIdCmt(e.target.name)
        console.log(commentData);
      }

      if(commentData[key].id_comment == 0){
        return(
          <div>
            <li className="media">
              <a className="pull-left" href="#">
                <img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + commentData[key].image_user} />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />{commentData[key].name_user}</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>{commentData[key].comment}</p>
                <a className="btn btn-primary" name ={commentData[key].id} onClick={onClickReply}><i className="fa fa-reply" />Reply</a>
              </div>
            </li>
            {Object.keys(commentData).map((key2, index2) => {
              if(commentData[key2].id_comment == commentData[key].id){
                return(
                  <li className="media second-media">
                    <a className="pull-left" href="#">
                      <img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + commentData[key2].image_user} alt="" />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li><i className="fa fa-user" />{commentData[key2].name_user}</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                      </ul>
                      <p>{commentData[key2].comment}</p>
                      <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                    </div>
                </li> 
                )
              }
            })}
          </div>
        )
      }
      
    })
  }

  // const [data, setData] = useState('')
  return (
    <div className="response-area">
      <h2>3 RESPONSES</h2>
      <ul className="media-list">
        {/* <li className="media second-media">
            <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
            </a>
            <div className="media-body">
                <ul className="sinlge-post-meta">
                <li><i className="fa fa-user" />Janis Gallagher</li>
                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
            </div>
        </li> */}
      </ul>					
    </div>
  )
};

export default ListComment;