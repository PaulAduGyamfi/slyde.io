import React,{ useContext, useEffect, useState } from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import { UserContext } from '../../../App'
import { Link } from 'react-router-dom'
import TempNews from './tempNews'
import './News.scss'

const News = () =>{

    const {state,dispatch} = useContext(UserContext)
    const [news,setNews] = useState([])
    const [category,setCategory] = useState("")

    // NEWS API KEY = f91f0e8b8739477f9fa0f43f787b686e

    let url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=f91f0e8b8739477f9fa0f43f787b686e'

    let req = new Request(url);

        useEffect(()=>{  

            fetch(req)
            .then(res=>res.json())
            .then(result => {
                console.log(result)
                setNews(result.articles)
            })

        },[])

        const getNews = (category) =>{
            let newUrl = `https://newsapi.org/v2/everything?q=${category}&` +
          'apiKey=f91f0e8b8739477f9fa0f43f787b686e'

          let newReq = new Request(newUrl);

            fetch(newReq)
            .then(res=>res.json())
            .then(result => {
                console.log(result)
                setNews(result.articles)
            }).catch(err=>{
                console.log(err)
            })
        }

        const dateToString = (published) =>{
            let date = new Date(published)

            return date.toDateString()
        }


    
    return(
    <>
    {state ? 
        <div className="newsContainer">
            <SideNav />
            <div className="middle">
                <div className="newsSections">
                    <input type='text' placeholder="Search for topics, locations & sources" onChange={(e)=>{
                        e.preventDefault()
                       if(e.target.value == ""){
                          return news
                       }
                       getNews(e.target.value)

                    }}/>
                    <div className="categoryLinks">
                        <ul>
                            <li onClick={()=>getNews('Electronics')}>Electronics</li>
                            <li onClick={()=>getNews('Money')}>Money</li>
                            <li onClick={()=>getNews('Politics')}>Politics</li>
                            <li onClick={()=>getNews('Sports')}>Sports</li>
                            <li onClick={()=>getNews('Fitness')}>Fitness</li>
                            <li onClick={()=>getNews('Travel')}>Travel</li>
                        </ul>
                    </div>
                </div>
                <div>
                    {news?
                    <>
                {
                    news.map((item,i) => {
                        return(
                          
                            <div className="newsFeedWrap" key={i} onClick={()=>window.open(`${item.url}`)}>
                                <div className="newsImage"><img src={item.urlToImage} /></div>
                                    <div className="newsContent">
                                       <div className="newsHeader">
                                            <div className='newsHeaderTitle'>{item.title}</div>
                                            
                                            <div className='newsHeaderDate'>{dateToString(item.publishedAt)}</div>
                                        </div>
                                        <div className="newsBody">
                                            {item.author != null || "" ? <div className="newsBodyAuthor">by {item.author}</div>:""}
                                            <div className="newsBodyText"><p>{item.description}</p></div>
                                        </div>

                                    </div>

                            </div>
                           
                        )
                    })
                }
                </>
                :''}
                </div>
            </div>
            {/* <Suggestions /> */}
        </div>
        : null}
    </>
    )
}

export default News







/*







<div className="newsFeedWrap">
                    <div className="newsImage"><img src='https://cdn.thewirecutter.com/wp-content/uploads/2017/08/picnic-collective-group-lede-630-570x380.jpg' /></div>
                    <div className="newsHeader">
                        <div className='newsHeaderTitle'>Great Gear for Picnics and Grilling</div>
                        <div className='newsHeaderDate'>UPDATED JUNE 26, 2020</div>
                    </div>
                    <div className="newsBody">
                        <div className="newsBodyAuthor">by Wirecutter Staff</div>
                        <div className="newsBodyText"><p>We spent over 85 hours researching and testing—and selected our favorite tools and gadgets from past guides—to bring you the best gear for picnics and cookouts.</p></div>
                    </div>
                </div>









*/