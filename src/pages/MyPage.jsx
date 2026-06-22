import { Btn } from "../components/Btn";
import { Header } from "../components/header";

import MyPage_Flag from '../assets/flags/MyPage_Flag.png';
import MapImg from '../assets/Map.png';
import torn from "../assets/Group 209 1.png";
import { useState } from "react";
import './MyPage.css'

import { MypageLanding } from "../components/mypage/MypageLanding";
import { MypageMain } from "../components/mypage/MypageMain";
import { MyPageCourse } from "../components/mypage/MyPageCourse";

import CardBest from '../assets/cards/Card_Best.png';
import CardVeryHigh from '../assets/cards/Card_VeryHigh.png';
import CardHigh from '../assets/cards/Card_High.png';
import CardLow from '../assets/cards/Card_Low.png';
import CardVeryLow from '../assets/cards/Card_VeryLow.png';
import CardHidden from '../assets/cards/Card_Hidden.png';


export function MyPage() {
    const [view, setView] = useState('landing');
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [isCardCentered, setIsCardCentered] = useState(false);

    const Cards = [
        {id: 1, src: CardBest},
        {id: 2, src: CardVeryHigh},
        {id: 3, src: CardHigh},
        {id: 4, src: CardLow},
        {id: 5, src: CardVeryLow},
        {id: 6, src: CardHidden}
    ];

    return (
        <>
        <div className={`mypage-container ${isCardCentered ? 'backdrop-blurred' : ''}`}>
            <Header />

            <div className="left-section">
                <img className="bg-map" src={MapImg} alt="배경 지도" />
                
                <div className="mypage-flag">
                    <img src={MyPage_Flag} alt="마이 페이지" />
                </div>
                
                
            </div>

            {view === 'main' && (
                <div 
                    className={`character-card-thumbnail ${isCardCentered ? 'is-centered' : ''}`}
                    onMouseEnter={() => {setHoveredCardId(2); setIsCardCentered(true);}} // API 연결 시 가변적인 ID 할당
                    onMouseLeave={() => {setHoveredCardId(null); setIsCardCentered(false);}}
                >
                    <img src={Cards[1].src} alt="GPA 캐릭터 카드" />
                </div>
            )}

            <img className="torn" src={torn} />

            <div className="right-section">
                {view === 'landing' && (
                    <MypageLanding onNavigateToMain={() => setView('main')} />
                )}
                {view === 'main' && (
                    <MypageMain onNavigateToCourse={() => setView('course')} 
                    onResetHover={() => setHoveredCardId(null)}
                    />
                )}
                {view === 'course' && (
                    <MyPageCourse/>
                )}
            </div>
        </div>
       
        </>
    )
}