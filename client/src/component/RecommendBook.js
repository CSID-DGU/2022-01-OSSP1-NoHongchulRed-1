import React, { useState, useEffect } from 'react';
//import { useCookies } from 'react-cookie';
import axios from 'axios';
import './RecommendBook.css';

const RecommendBook = (props) => {
    const [RecommendList, setRecommendList] = useState([]);

    useEffect(() => {
        try {
            axios.get('/session/svd')
            .then((res) => {
                console.log(res.data.data);
                setRecommendList(res.data.data || []);
            })
        } catch (err) {
            console.log(err);
        }
    }, []);
    
    return (
        <div className="Recommend-area" >
            {RecommendList.length ? RecommendList.slice(0,3).map((data, index) => {
                return (
                    <div className="recommend-box">
                        <div className="title">
                            <p className="centerBookTitle">{data.title}</p>
                            {/* <p className="centerRecommendTitle">{data.RecommendTitle}</p>
                            <p className="nickName">{data.userid}</p>
                            <p className="date">{data.date}</p> */}
                        </div>
                        <div className="bookContent">
                            <img src={data.thumbnail}/>
                        </div>
                    </div>
                )
            }) : "추천해드릴만한 적절한 책을 찾지 못했습니다."
            }
        </div>
    )
    

};

export default RecommendBook;