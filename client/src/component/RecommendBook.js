import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecommendBook.css';

const RecommendBook = (props) => {
    const [RecommendList, setRecommendList] = useState([]);

    useEffect(() => {
        try {
            axios.get('/recommend/svd')
            .then((res) => {
                console.log(res.data.data);
                setRecommendList(res.data.data || []);
            })
        } catch (err) {
            console.log(err);
        }
    }, []);
    
    var rankDisplay = 1;

    return (
        <div className="Recommend-area" >
            {RecommendList.length ? RecommendList.map((data, index) => {
                return (
                    <div className="recommend-box" key={index}>
                        <div className="title">
                            <h3> 👑 {rankDisplay++} 위 </h3>
                            <p className="centerBookTitle">{data.title}</p>
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