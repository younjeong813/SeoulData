import streamlit as st

# 페이지 기본 설정
st.set_page_config(page_title="Main", layout="wide", initial_sidebar_state="expanded")

# HTML 및 CSS 스타일 설정
st.markdown("""
    <style>
        body {
            background-color: #F9F9F9;
        }
        .center-text {
            text-align: center; /* 텍스트를 가운데 정렬 */
            color: #333333;
        }
        .footer {
            text-align: center;
            margin-top: 100px;
            font-size: 14px;
            color: #777777;
        }
        .no-margin {
            margin: 0; /* 텍스트 간 간격 제거 */
        }
        .button-like {
            display: inline-block;
            background-color: #2C3E50; /* 짙은 남색 버튼 */
            color: white; /* 버튼 텍스트 하얀색 */
            font-size: 18px;
            font-weight: bold;
            padding: 10px 20px;
            text-align: center;
            border-radius: 8px; /* 둥근 모서리 */
            border: none; /* 테두리 제거 */
            margin-top: 20px;
        }
    </style>
""", unsafe_allow_html=True)

# 이미지 경로 설정
image_1 = "../static/Icon/img_1.png"  
image_2 = "../static/Icon/img_2.png" 
image_3 = "../static/Icon/img_3.png"  
image_4 = "../static/Icon/img_4.png"  
image_5 = "../static/Icon/img_5.png" 

# 세 개의 칼럼
col1, col2, col3 = st.columns([2, 2, 2])

# 첫 번째 칼럼: 이미지
with col1:
    st.image(image_1, caption=None, use_container_width=True)
    st.image(image_3, caption=None, width=130)  # 텍스트 아래 이미지

# 두 번째 칼럼: 텍스트와 버튼
with col2:
    st.image(image_2, caption=None, width=50)  # 텍스트위
    st.markdown("<h3 style='text-align: left; color: #333333; margin-bottom: 0px;'>Azure AI 인터뷰 기반 시니어</h3>", unsafe_allow_html=True)  # 간격 없는 텍스트
    st.markdown("<h1 style='text-align: left; color: #333333; margin-top: 0px;'>이력서 작성 서비스</h1>", unsafe_allow_html=True)  # 타이틀
    st.markdown("""
        <div class="button-like">NaVi</div>
    """, unsafe_allow_html=True)  # 버튼 느낌의 NavI
    st.image(image_5, caption=None, width=580)  # 텍스트 아래 이미지
        # Footer 섹션
    st.markdown("""
        <div class="footer">
            © SKKU & MS Hackerton Team 8. 모든 권리 보유.
        </div>
    """, unsafe_allow_html=True)

# 세 번째 칼럼: 로봇 이미지
with col3:
    st.image(image_4, caption=None, width=300)  # 텍스트 아래 이미지


