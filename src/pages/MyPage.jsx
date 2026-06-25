// src/pages/MyPage.jsx
import { useEffect, useState } from "react";
import api from "../api/axios"; // 설정해둔 axios 인스턴스

import { Header } from "../components/header";
import MyPage_Flag from '../assets/flags/MyPage_Flag.png';
import MapImg from '../assets/Map.png';
import torn from "../assets/Group 209 1.png";
import './MyPage.css';

import { MypageLanding } from "../components/mypage/MypageLanding";
import { MypageMain } from "../components/mypage/MypageMain";
import { MyPageCourse } from "../components/mypage/MyPageCourse";

// 💡 카드 배경 이미지 (요구사항: 4.5일 때만 배경2, 나머지는 배경1)
import CardBg1 from '../assets/cards/Card_Texture.png'; // 기본 배경1 
import CardBg2 from '../assets/cards/Card_Texture.png';     // 4.5 전용 배경2

// 💡 우니 캐릭터 이미지 번호별 분기 로드 (경로를 프로젝트 구조에 맞게 체크해 주세요)
import Wooni1 from '../assets/wooni1.png'; // 예: 재입학 (우니1)
import Wooni2 from '../assets/wooni2.png'; // 예: 조금만 더 (우니2)
import Wooni3 from '../assets/wooni3.png'; // 예: 행운을 빕니다 (우니3)
import Wooni4 from '../assets/wooni4.png'; // 예: 대단해요 (우니4)
import Wooni5 from '../assets/wooni5.png'; // 예: 전설 (우니5)

export function MyPage() {
    const [view, setView] = useState('landing');
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [isCardCentered, setIsCardCentered] = useState(false);
    
    // 💡 백엔드 jaechulScoresum 원본 데이터를 보관할 상태 (초기값 0)
    const [rawGpa, setRawGpa] = useState(0);

    // 학점 점수 요약 정보 API 호출
    useEffect(() => {
        const fetchGpaData = async () => {
            try {
                const response = await api.get('/api/klas/grades/summary');
                if (response.data && response.data.jaechulScoresum !== undefined) {
                    setRawGpa(Number(response.data.jaechulScoresum));
                }
            } catch (error) {
                console.error("[마이페이지] GPA 합계 불러오기 실패:", error);
                setRawGpa(3.98); // 에러 시 폴백용 기본 테스트 값
            }
        };

        if (view === 'main') {
            fetchGpaData();
        }
    }, [view]);

    // 💡 학점 구간에 따른 카드 설정 동적 계산 함수
    const getCardSetup = (score) => {
        // 타이틀 표기용 소수점 한 자리 변환 문자열 (예: 3.98 -> "4.0" 또는 3.9)
        const displayGpa = score.toFixed(1);

        if (score < 2.4) {
            return {
                bg: CardBg1,
                wooni: Wooni1,
                titleTop: `GPA ${displayGpa}??`,
                titleBottom: "NOOOOOO",
                des: "재입학을 고려해 보세요!"
            };
        } else if (score < 3.0) {
            return {
                bg: CardBg1,
                wooni: Wooni2,
                titleTop: `GPA ${displayGpa};;`,
                titleBottom: "POOR",
                des: "조금만 더 노력해 보세요!"
            };
        } else if (score < 4.0) {
            return {
                bg: CardBg1,
                wooni: Wooni3,
                titleTop: `GPA ${displayGpa}!`,
                titleBottom: "GOOD JOB",
                des: "행운을 빕니다!"
            };
        } else if (score < 4.5) {
            return {
                bg: CardBg1,
                wooni: Wooni4,
                titleTop: `GPA ${displayGpa}!!!`,
                titleBottom: "EXCELLENT",
                des: "대단해요! 정말 잘하고 있어요!"
            };
        } else {
            // 정확히 4.5 만점인 경우 (또는 그 이상 만점)
            return {
                bg: CardBg2, // 💡 만점일 때만 배경2 사용
                wooni: Wooni5,
                titleTop: `<<GPA ${displayGpa}>>`,
                titleBottom: "LLEGENDD",
                des: "전설의 GPA 달성!"
            };
        }
    };

    // 현재 학점 기준 세팅값 가져오기
    const cardSetup = getCardSetup(rawGpa);

    return (
        <>
        return (
    /* 💡 카드가 중앙에 오면 backdrop-blurred 클래스가 최상단에 붙습니다. */
    <div className={`mypage-container ${isCardCentered ? 'backdrop-blurred' : ''}`}>
        <Header />

        {/* 좌측 구역 */}
        <div className="left-section">
        <img className="bg-map" src={MapImg} alt="배경 지도" />
        <div className="mypage-flag">
            <img src={MyPage_Flag} alt="마이 페이지" />
        </div>
        </div>

        {/* 찢어진 종이 구분선 */}
        <img className="torn" src={torn} alt="구분선" />

        {/* 우측 구역 */}
        <div className="right-section">
        {view === 'landing' && <MypageLanding onNavigateToMain={() => setView('main')} />}
        {view === 'main' && (
            <MypageMain 
            onNavigateToCourse={() => setView('course')} 
            onResetHover={() => setIsCardCentered(false)}
            />
        )}
        {view === 'course' && <MyPageCourse />}
        </div>

        {/* 💡 카드 본체: 배경 투명도 레이어 분리를 위해 컨테이너 직속 자식으로 배치 */}
        {view === 'main' && (
        <div 
            className={`character-card-thumbnail ${isCardCentered ? 'is-centered' : ''}`}
            // onMouseEnter={() => setIsCardCentered(true)}
            // onMouseLeave={() => setIsCardCentered(false)}
        >
            <img className="card-bg-frame" src={cardSetup.bg} alt="카드 배경" />
            
            <div className="card-dynamic-content">
            <h1 className="card-dynamic-title">
                <span className="title-gpa-line">{cardSetup.titleTop}</span>
                <span className="title-status-line">{cardSetup.titleBottom}</span>
            </h1>
            
            <p className="card-dynamic-desc">{cardSetup.des}</p>
            <img className="card-dynamic-wooni" src={cardSetup.wooni} alt="우니 캐릭터" />
            </div>
        </div>
        )}
    </div>
    );
        </>
    );
}