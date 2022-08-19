import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SvdRecommend.css';
import { Link } from 'react-router-dom';

const SvdRecommend = (props) => {
    const [RecommendList, setRecommendList] = useState([]);

    useEffect(() => {
        try {
            axios.get('/api/recommend/svd')
            .then((res) => {
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
                    <div key={index}>
                        <Link to="/GatherReportPage" state={data} style={{ color:"inherit" }}>
                        <div className="recommend-box">
                            <div className="title">
                                <h3> 👑 {rankDisplay++} 위 </h3>
                                <p className="centerBookTitle">{data.title}</p>
                            </div>
                            <div className="bookContent">
                                <img src={data.thumbnail} alt="thumbnail"/>
                            </div>
                        </div>
                        </Link>
                    </div>
                )
            }) : "추천해드릴 만한 책을 찾지 못했습니다."
            }
        </div>
    )
};

export default SvdRecommend;