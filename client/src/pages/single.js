import React,{useState,useEffect} from "react";
import MainNav from "../navs/mainNav";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser"
import Footer from "../components/footer";
import More from "../components/more";
import Comments from "../components/comments";

export default function Single(){
    var [news,setNews]=useState([]);
    const location=useLocation();
    const newsId=location.pathname.split('/')[2];

    useEffect(()=>{
        axios.get(`http://localhost:9000/news/${newsId}`)
             .then((response)=>{
                console.log("response::",response)
                setNews(response.data.news[0]) ;

            })
            .catch((err)=>{
                console.log("get single news error",err)
            });
                
    },[newsId])


    function decodeString(str){
        const htmlString= decodeURIComponent(str)
                    // .replace(/&apos;/g,"'")
                    // .replace(/<p>/g,"")
                    // .replace(/<\/p>/g,"")
                    // .replace(/<br>/,)

        return parse(htmlString);
    }

    return(
        <div>
            <MainNav/>
            
            
            {(news.length!==0)
                ?<div className="container-lg mt-5">
                    <div className="container-lg">
                        <h1 className=" headline">{decodeString(news.headline)}</h1>
                    </div>
                    <div className="d-lg-flex container-lg mt-5 gap-3">
                        <div className=" col-lg-8 p-0">
                            <div className="container-lg p-0">
                                <p className="pt-2 pb-2 border-top border-bottom">
                                    By <span style={{color:"teal",fontWeight:"bold"}}>{decodeString(news.userName)}</span> | {moment(news.postDatetime).fromNow()}
                                </p>
                                <img src={require(`../../public/uploads/${news.storage}`)} 
                                    style={{display:"block",width:"100%",height:"390px"}}/>


                                <p className="mt-4">{decodeString(news.body)}</p>
                            </div>

                        </div>
                        
                        
                        <More cat={news.section} current={news.newsId} />
                    </div>
                </div>
                :""

            }
           
            <Comments newsId={news.newsId}/>
            
            <Footer/>
        </div>
    )
}