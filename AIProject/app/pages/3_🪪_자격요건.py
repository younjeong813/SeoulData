import streamlit as st

# 항목별 내용 정의
info = {
    "1": """
<div class="info-box">
<h3>1. 연령 및 신분 요건</h3>
<ul>
    <li><span class="highlight">만 18세 이상</span>이어야 합니다.</li>
    <li>피성년후견인이나 피한정후견인이 아니어야 합니다.</li>
</ul>
<h3>2. 법적 결격 사유</h3>
<ul>
    <li>파산선고를 받고 복권되지 않은 사람은 <span class="highlight">경비원이 될 수 없습니다</span>.</li>
    <li>금고 이상의 실형을 선고받고 그 집행이 종료되거나 집행이 면제된 ㄴ날부터 <span class="highlight">5년</span>이 지나지 않은 사람은 경비원이 될 수 없습니다.</li>
</ul>
<h3>3. 교육 요건</h3>
<ul>
    <li>경비업체에 채용된 후, 경찰청장이 지정한 교육기관에서 <span class="highlight">24시간</span>의 일반경비원 신임교육을 이수해야 합니다.</li>
    <li>신임교육 면제 대상:
        <ul>
            <li>경비지도사 자격증을 보유한 자.</li>
            <li>부사관 이상으로 근무한 경력이 있는 자.</li>
        </ul>
    </li>
</ul>
<h3>4. 기타 요건</h3>
<ul>
    <li>경비원은 근무 중 경적, 단봉, 분사기, 안전방패, 무전기 등 <span class="highlight">공격적인 용도로 제작되지 않은 장비</span>를 휴대할 수 있습니다.</li>
</ul>
</div>
""",
    "2": """
<div class="info-box">
<h3>2. 법적 결격 사유</h3>
<ul>
    <li>파산선고를 받고 복권되지 않은 사람은 <span class="highlight">경비원이 될 수 없습니다</span>.</li>
    <li>금고 이상의 실형을 선고받고 그 집행이 종료되거나 집행이 면제된 날부터 <span class="highlight">5년</span>이 지나지 않은 사람은 경비원이 될 수 없습니다.</li>
</ul>
</div>
""",
    "3": """
<div class="info-box">
<h3>3. 교육 요건</h3>
<ul>
    <li>경비업체에 채용된 후, 경찰청장이 지정한 교육기관에서 <span class="highlight">24시간</span>의 일반경비원 신임교육을 이수해야 합니다.</li>
    <li>신임교육 면제 대상:
        <ul>
            <li>경비지도사 자격증을 보유한 자.</li>
            <li>부사관 이상으로 근무한 경력이 있는 자.</li>
        </ul>
    </li>
</ul>
</div>
""",
    "4": """
<div class="info-box">
<h3>4. 기타 요건</h3>
<ul>
    <li>경비원은 근무 중 경적, 단봉, 분사기, 안전방패, 무전기 등 <span class="highlight">공격적인 용도로 제작되지 않은 장비</span>를 휴대할 수 있습니다.</li>
</ul>
</div>
"""
}

# CSS 스타일 설정
st.markdown("""
    <style>
        .button-container button {
            width: 100%;
            height: 60px;
            font-size: 20px;
            margin: 10px 0;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .button-container button:hover {
            background-color: #0056b3;
        }
        .info-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .info-box h3 {
            color: #333333;
        }
        .info-box ul {
            padding-left: 20px;
        }
        .highlight {
            color: red;
            font-weight: bold;
        }
    </style>
""", unsafe_allow_html=True)

# Streamlit 초기화
st.title("❗ 직업별 자격 요건 안내")

# 버튼 배치
st.write("아래 버튼을 클릭하여 궁금한 직업의 자격 요건을 확인하세요:")
col1, col2, col3, col4 = st.columns(4)

with col1:
    if st.button("경비원", key="1"):
        st.session_state.selected_option = "1"
with col2:
    if st.button("판매원", key="2"):
        st.session_state.selected_option = "2"
with col3:
    if st.button("청소원", key="3"):
        st.session_state.selected_option = "3"
with col4:
    if st.button("관리원", key="4"):
        st.session_state.selected_option = "4"

# 선택된 항목의 내용 출력
if "selected_option" in st.session_state and st.session_state.selected_option:
    st.markdown(info[st.session_state.selected_option], unsafe_allow_html=True)
