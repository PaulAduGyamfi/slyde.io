import React,{useEffect, useState,useContext} from 'react'
import './profileStyles/Suggestions.scss'
import {SearchOutlined,DownOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App';
import { fake_news } from './SuggestionsFallback'

const Suggestions = () => {
    
    const {state,dispatch} = useContext(UserContext)
    const [news,setNews] = useState([])
    const [search,setSearch] = useState("")
    const [userDetails,setUserDetails] = useState([])
    const [error,setError] = useState({})

    let url = 'https://gnews.io/api/v3/top-news?&token=b980e7299f3b0664ee9e8c6c6c86db15'

    let req = new Request(url);

        useEffect(()=>{  

            fetch(req)
            .then(res=>res.json())
            .then(result => {
                // console.log(result)
                setNews(result.articles)
            }).catch(err=>{
                setError(err)
            })

        },[])


        /*     Search     */
        const fetchSearch = (query) =>{
            // setSearch(query)
            fetch('/search',{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query
                })
            }).then(res => res.json())
            .then(result => {
                setUserDetails(result.user)
            })
       
       
        }
         /*     Search     */



 
    return(
        <div className="suggestionsContainer">

             <div className="searchContainer">
                    <input 
                    className="searchBox" 
                    id="search"
                    type="text" name="search" 
                    placeholder="Search Slyde" 
                    value={search}
                    onChange={(e)=>{
                        if(e.target.value === ""){
                            setSearch("")
                            setUserDetails([])
                            return;
                        }
                        fetchSearch(e.target.value)
                        setSearch(e.target.value)
                    }
                    }
                    autoComplete="off"/>

                    <div className="searchIcon">
                        <SearchOutlined />
                    </div>
                    
                </div>
                <div className="searchResults">
                                {
                                    userDetails.map((item,i) => {
                                        return(
                                    <Link to={item._id !== state._id ? `/profile/${item._id}`: `/profile`} key={i} >
                                        <div className="searchResult" >
                                            <div className="searchResultWrap" onClick={()=>setInterval(() => {
                                        window.location.reload()
                                    }, 100)}>
                                                <div className="profilePicture" style={{backgroundImage: `url(${item.pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                                                <div className="searchResultInfo">
                                                    <div className="name fullname">{item.fullname}</div>
                                                    <div className="name username">@{item.username}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                        )
                                    })
                                }
            </div>

            <div className="suggestionsWrap">
               
                <div className="Trending">
                    
                    <div className="trendingHeader">Whats Happening</div>

                   {!error ?
                        news.map((item,key)=>{
                            return(
                                <div className="trendingItem" key={key} onClick={()=>window.open(`${item.url}`)}>
                                    <div className="trendingTitle">{item.title}</div>
                                    <div className="trendingArrow">new</div>
                                </div>
                   
                            )
                        })
                        : fake_news.articles.map((item,key)=>{
                            return(
                                <div className="trendingItem" key={key} onClick={()=>window.open(`${item.url}`)}>
                                    <div className="trendingTitle">{item.title}</div>
                                    <div className="trendingArrow">new</div>
                                </div>
                   
                            )
                        })
                   }
                    
                    
                    <Link to='/news'><div className="trendingMore">See more</div></Link>
                    
                </div>
                <div className=""></div>
            </div>
            
        </div>
    )
}
export default Suggestions