import streamlit as st
import pandas as pd
import streamlit.components.v1 as components
from datetime import datetime
import folium
from streamlit_folium import st_folium


# 데이터 파일 경로
file_path = "../data/cleaned_jobs_with_location.csv"

# 데이터 불러오기
df = pd.read_csv(file_path)

# 날짜 변환
df["toDd"] = pd.to_datetime(df["등록일"]) + pd.to_timedelta(30, unit='d')  # 등록일 + 30일을 마감일로 가정
df["frDd"] = pd.to_datetime(df["등록일"])  # 등록일을 시작일로 사용

# 현재 날짜
today = datetime.now()

# 상태 컬럼 추가
def get_status(row):
    return "구인중" if row["toDd"] >= today else "마감"

df["구인상태"] = df.apply(get_status, axis=1)

# 대분류 매핑
def categorize_job(job):
    if "청소원" in job:
        return "청소원"
    elif "경비원" in job:
        return "경비원"
    elif "판매원" in job:
        return "판매원"
    elif "세차원" in job:
        return "세차원"
    elif "매니저" in job:
        return "매니저"
    elif "관리원" in job:
        return "관리원"
    elif "배송원" in job or "택배원" in job:
        return "배송원"
    else:
        return "기타"

df["대분류"] = df["직종"].apply(categorize_job)

# 성별 필터링 옵션 추가
st.sidebar.header("필터링")

# 성별 선택
selected_gender = st.sidebar.selectbox(
    "성별 선택", options=["무관", "남", "여"], index=0, key="gender_select"
)

# 직종 선택
selected_category = st.sidebar.selectbox(
    "직종 선택", options=["전체"] + list(df["대분류"].unique()), index=0, key="category_select"
)

# 급여 범위 슬라이더
min_salary, max_salary = st.sidebar.slider(
    "급여 범위 (단위: 만원)", min_value=0, max_value=1000, value=(0, 1000), step=10, key="salary_slider"
)

# 데이터 필터링
filtered_df = df.copy()

if selected_category != "전체":
    filtered_df = filtered_df[filtered_df["대분류"] == selected_category]

if selected_gender != "무관":
    filtered_df = filtered_df[filtered_df["성별"] == selected_gender]

# 급여 컬럼에서 숫자 값 추출 후 필터링
filtered_df["급여숫자"] = filtered_df["급여"].str.extract(r"(\d+)").astype(float)
filtered_df = filtered_df[
    (filtered_df["급여숫자"] >= min_salary * 10000) & (filtered_df["급여숫자"] <= max_salary * 10000)
]

# 페이지 크기 설정 (한 페이지당 3개)
PAGE_SIZE = 3

# 총 페이지 수 계산
total_pages = (len(df) - 1) // PAGE_SIZE + 1

# Session State 초기화
if "page_number" not in st.session_state:
    st.session_state["page_number"] = 0
if "selected_index" not in st.session_state:
    st.session_state["selected_index"] = None
if "page" not in st.session_state:
    st.session_state["page"] = "main"

# 페이지 전환 함수
def switch_page(page_name):
    st.session_state["page"] = page_name


# 메인 페이지
if st.session_state["page"] == "main":
    st.title("채용 공고 게시판")
    
    # 작은 제목 (일자리 현황)
    st.markdown("<h3 style='font-size:20px; margin-top:10px;'>일자리 현황</h3>", unsafe_allow_html=True)
    components.html(open("../preprocessing/seoul_jobs_density_by_district.html", "r").read(), height=600)

    # 현재 페이지 데이터 가져오기
    start_idx = st.session_state["page_number"] * PAGE_SIZE
    end_idx = start_idx + PAGE_SIZE
    current_page_data = filtered_df.iloc[start_idx:end_idx]

    # 공고 표시
    for i, row in current_page_data.iterrows():
        with st.container():
            st.markdown(
                f"""
                <div style="border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px; background-color: {'#f8d7da' if row['구인상태'] == '마감' else '#d4edda'};">
                    <h4 style="margin-bottom: 10px;">{row['직종']}</h4>
                    <p style="margin: 5px 0; color: #555;"><strong>회사명:</strong> {row['업체명']}</p>
                    <p style="margin: 5px 0; color: #555;"><strong>근무 지역:</strong> {row['근무지역']}</p>
                    <p style="margin: 5px 0; color: #555;"><strong>급여:</strong> {row['급여']}</p>
                    <p style="margin: 5px 0; color: #555;"><strong>상태:</strong> {'🟢 구인중' if row['구인상태'] == '구인중' else '🔴 마감'}</p>
                </div>
                """,
                unsafe_allow_html=True,
            )
            if st.button(f"⬆ 자세히 보기 ({row['직종']})", key=f"btn_{start_idx + i}"):
                st.session_state["selected_index"] = start_idx + i
                switch_page("detail")

    # 페이지 내비게이션 버튼
    col1, col2, col3 = st.columns([1, 1, 1])
    with col1:
        if st.button("이전 페이지") and st.session_state["page_number"] > 0:
            st.session_state["page_number"] -= 1
    with col2:
        st.markdown(f"**현재 페이지:** {st.session_state['page_number'] + 1} / {total_pages}")
    with col3:
        if st.button("다음 페이지") and st.session_state["page_number"] < total_pages - 1:
            st.session_state["page_number"] += 1

            

# 상세 페이지
elif st.session_state["page"] == "detail":
    idx = st.session_state["selected_index"]
    row = filtered_df.iloc[idx]

    st.title(f"📌 {row['직종']}")

    # 섹션 스타일 정의
    st.markdown("""
        <style>
        .info-box {
            background-color: #F9F9F9;
            border: 1px solid #E0E0E0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
        }
        .info-title {
            font-weight: bold;
            color: #4A4A4A;
        }
        </style>
        """, unsafe_allow_html=True)
    
    # 지도에 위치 표시
    if pd.notna(row['위도']) and pd.notna(row['경도']):
        st.markdown('<div class="info-title">1. 회사 위치 지도</div>', unsafe_allow_html=True)

        # Folium 지도 생성
        job_map = folium.Map(location=[row['위도'], row['경도']], zoom_start=15)
        folium.Marker(
            location=[row['위도'], row['경도']],
            popup=f"{row['업체명']} ({row['직종']})",
            tooltip=row['직종']
        ).add_to(job_map)

        # Streamlit에 지도 표시
        st_folium(job_map, width=700, height=400)


    # 회사 및 공고 정보 
    st.markdown('<div class="info-title">2. 회사 및 공고 정보</div>', unsafe_allow_html=True)

    st.markdown(f"""
    <div class="info-box"><strong>🔥 회사명:</strong> {row['업체명']}</div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="info-box"><strong>📍 근무 지역:</strong> {row['근무지역']}</div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="info-box"><strong>💰 급여:</strong> {row['급여']}</div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="info-box"><strong>🗓️ 등록일:</strong> {row['등록일']}</div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="info-box"><strong>⚡ 구인 상태:</strong> {'🟢 구인중' if row['구인상태'] == '구인중' else '🔴 마감'}</div>
    """, unsafe_allow_html=True)

    # 직무 내용 (내용이 있을 경우만 표시)
    if pd.notna(row['직무내용']) and row['직무내용'].strip():
        st.markdown('<div class="info-title">2. 직무 내용</div>', unsafe_allow_html=True)
        st.markdown(f"""
        <div class="info-box">
            {row['직무내용']}
        </div>
        """, unsafe_allow_html=True)

    # 지원 방법
    st.markdown('<div class="info-title">3. 지원 방법</div>', unsafe_allow_html=True)
    st.markdown(f"""
    <div class="info-box">
        {row['지원방법']}
    </div>
    """, unsafe_allow_html=True)

    # 네비게이션 버튼
    col1, col2, col3 = st.columns([1, 1, 1])
    with col1:
        if st.button("⬅ 이전 공고") and idx > 0:
            st.session_state["selected_index"] -= 1
    with col2:
        if st.button("🏠 메인 페이지로 돌아가기"):
            switch_page("main")
    with col3:
        if st.button("다음 공고 ➡") and idx < len(filtered_df) - 1:
            st.session_state["selected_index"] += 1
