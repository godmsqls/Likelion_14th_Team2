import { useState, useEffect } from 'react';
import api from '../../api/axios'; // 프로젝트 구조에 맞는 axios 인스턴스 경로
import './MyPageCourse.css';

export function MyPageCourse() {
    // API로 받아온 학기별 수강 내역 리스트를 저장할 상태
    const [semesterList, setSemesterList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            const savedToken = localStorage.getItem('klasSession');
            
            if (!savedToken) {
                console.warn("[수강내역] 'klasSession' 토큰이 없습니다.");
                setLoading(false);
                return;
            }

            try {
                // 💡 지정해주신 엔드포인트 및 헤더 규격 매핑
                const response = await api.get('/api/klas/grades/semesters', {
                    headers: {
                        'Klas-Cookie': savedToken
                    }
                });

                // 제공해주신 API 응답 데이터 구조 그대로 상태에 담아둡니다 (배열 구조)
                const data = response.data || [];
                setSemesterList(data);
            } catch (error) {
                console.error("[수강내역] 데이터를 불러오는 중 에러 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, []);

    return (
        <>
        <div className='mypage-course-wrapper'>
            <h2 className="mypage-course">수강 내역 조회</h2>
            
            <div className="mypage-course-content">
                {loading ? (
                    <div className="course-loading">수강 내역을 항해 중입니다...</div>
                ) : semesterList.length === 0 ? (
                    <div className="course-empty">조회된 수강 내역이 없습니다.</div>
                ) : (
                    <div className="course-table-container">
                        <table className="course-table">
                            <thead>
                                <tr>
                                    <th>연도/학기</th>
                                    <th>이수구분</th>
                                    <th>과목코드</th>
                                    <th>과목명</th>
                                    <th>학점</th>
                                    <th>성적</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 💡 계층형 데이터 구조 파싱 시작 */}
                                {semesterList.map((semester) => {
                                    const semesterLabel = `${semester.thisYear}년 ${semester.hakgi}학기`;
                                    
                                    // 각 학기 오브젝트 내부에 있는 sungjukList 배열을 매핑합니다.
                                    return semester.sungjukList?.map((course, index) => (
                                        <tr key={course.hakjungNo || `${semesterLabel}-${index}`}>
                                            {/* 1. 연도/학기 */}
                                            <td>{semesterLabel}</td>
                                            
                                            {/* 2. 이수구분 (전선 / 전필 등) */}
                                            <td>
                                                <span className={`label-gubun ${course.codeName1 === '전필' ? 'compulsory' : 'elective'}`}>
                                                    {course.codeName1 || '전선'}
                                                </span>
                                            </td>
                                            
                                            {/* 3. 과목코드 (hakjungNo 사용) */}
                                            <td>{course.hakjungNo ? course.hakjungNo.split('-')[0] : '-'}</td>
                                            
                                            {/* 4. 과목명 (gwamokKname 매핑) */}
                                            <td className="course-name">{course.gwamokKname}</td>
                                            
                                            {/* 5. 학점 (hakjumNum 매핑) */}
                                            <td>{course.hakjumNum}학점</td>
                                            
                                            {/* 6. 성적 (getGrade 매핑 및 빈 문자열 처리) */}
                                            <td className="course-grade">
                                                {course.getGrade === "" ? (
                                                    <span className="grade-evaluating">평가 중</span>
                                                ) : (
                                                    course.getGrade
                                                )}
                                            </td>
                                        </tr>
                                    ));
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}