import React, { useState } from 'react';
import axios from 'axios';
import './CosineRecommend.css';
import { Link } from 'react-router-dom';

const CosineRecommend = (props) => {
    const [RecommendList, setRecommendList] = useState([]);

    try {
        axios.get('/session/cos')
        .then((res) => {
            setRecommendList(res.data.data || []);
        })
    } catch (err) {
        console.log(err);
    }
    
    var rankDisplay = 1;

    return (
        <div className="Recommend-area" >
            {RecommendList.length ? RecommendList.map((data, index) => {
                return (
                    <Link to = "/GatherReportPage" state = {data}>
                    <div className="recommend-box" key={index}>
                        <div className="title">
                            <h3> 👑 {rankDisplay++} 위 </h3>
                            <p className="centerBookTitle">{data.title}</p>
                        </div>
                        <div className="bookContent">
                            <img src={data.thumbnail} alt="thumbnail"/>
                        </div>
                    </div>
                    </Link>
                )
            }) : "추천해드릴 만한 책을 찾지 못했습니다."
            }
        </div>
    )
};

export default CosineRecommend;