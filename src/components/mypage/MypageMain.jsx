import { useState, useEffect } from 'react';
import { Btn } from '../Btn';
import { MypageCard } from './MypageCard';
import api from '../../api/axios'; // 프로젝트 구조에 맞는 axios 인스턴스 경로
import './MypageMain.css';

export function MypageMain({ onNavigateToCourse, onResetHover }) {
    const [hoveredId, setHoveredId] = useState(null);
    // 💡 API로부터 받아온 학적 데이터를 저장할 상태(State) 추가
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchStudentInfo = async () => {
            const savedToken = localStorage.getItem('klasSession');
            
            if (!savedToken) {
                console.warn("[마이페이지] 'klasSession' 토큰이 없습니다.");
                return;
            }

            try {
                const response = await api.get('/api/klas/student/info', {
                    headers: {
                        'Klas-Cookie': savedToken
                    }
                });

                if (response.data && response.data.hakjukMap) {
                    // API 응답 결과 중 hakjukMap 객체를 상태에 저장
                    setStudentData(response.data.hakjukMap);
                }
            } catch (error) {
                console.error("[마이페이지] 학생 정보 조회 실패:", error);
            }
        };

        fetchStudentInfo();
    }, []);

    // 💡 학번 파싱 연산 처리 로직 (studentData가 로드된 후 계산)
    const getAdmissionYear = () => {
        if (!studentData?.hakbun) return '정보 없음';
        // 학번의 앞 4자리 추출 (예: "2024")
        return studentData.hakbun.substring(0, 4);
    };

    const getExpectedGraduateYear = () => {
        if (!studentData?.hakbun) return '정보 없음';
        // 학번 앞 4자리를 숫자로 바꾸어 4를 더함 (예: 2024 + 4 = 2028)
        const startYear = parseInt(studentData.hakbun.substring(0, 4), 10);
        return `${startYear + 4}년 2월`;
    };

    // 💡 API 데이터를 기반으로 한 동적 카드 목록 정의
    const userCards = [
        { 
            id: 1, 
            name: '성명', 
            value: studentData?.kname || '로딩 중...', 
            top: '100px', left: '160px', rotate: '-5deg' 
        },
        { 
            id: 2, 
            name: '학부(과)', 
            value: studentData?.codeName1 || '로딩 중...', // 명세서의 codeName1 키 매핑
            top: '150px', left: '520px', rotate: '3deg' 
        },
        { 
            id: 3, 
            name: '다전공', 
            value: studentData?.liberalCode || '없음', // null일 경우 '없음' 처리
            top: '200px', left: '340px', rotate: '-2deg' 
        },
        { 
            id: 4, 
            name: '현재 상태', 
            value: studentData?.hakjukStat || '로딩 중...', 
            top: '270px', left: '60px', rotate: '6deg' 
        },
        { 
            id: 5, 
            name: '입학년도', 
            value: studentData ? `${getAdmissionYear()}년` : '로딩 중...', 
            top: '370px', left: '240px', rotate: '-4deg' 
        },
        { 
            id: 6, 
            name: '졸업 예정일', 
            value: studentData ? getExpectedGraduateYear() : '로딩 중...', 
            top: '380px', left: '520px', rotate: '2deg' 
        }
    ];

    const handleKLAS = () => {
        const targetUrl = "https://klas.kw.ac.kr/usr/cmn/login/LoginForm.do";
        window.open(targetUrl, '_blank');
    };

    return (
        <>
        <div className='mypage-main-container' onMouseEnter={onResetHover}>
            <div className="cards-wrapper">
                {userCards.map((card) => {
                    const isHovered = hoveredId === card.id;

                    return (
                        <div 
                            key={card.id}
                            className="card-positioner"
                            style={{
                                top: card.top,
                                left: card.left,
                                transform: isHovered 
                                        ? `translateY(-10px) rotate(${card.rotate})` 
                                        : `rotate(${card.rotate})`,
                                zIndex: isHovered ? 50 : 5
                            }}
                            // onMouseEnter={(e) => {
                            //     // e.stopPropagation();
                            //     // setHoveredId(card.id);
                            // }}
                            // onMouseLeave={() => setHoveredId(null)}
                        >
                            <MypageCard value={card.value} name={card.name} />
                        </div>
                    );
                })}
            </div>
            
            <div className='mypage-button'>
                <Btn text="수강 내역 조회하기" num="3" onClick={onNavigateToCourse}/>
                <Btn text="KLAS 학사정보 바로가기" num="1" onClick={handleKLAS} />
            </div>    
        </div>
        </>
    );
}