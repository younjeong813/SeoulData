# app/app.py

import streamlit as st
from pdf_generator import create_pdf
from input import transcribe_audio_with_openai
from resume_form import format_resume
import speech_recognition as sr
OPENAI_API_KEY = "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"

# Streamlit 앱 설정
st.set_page_config(
    page_title="OpenAI 기반 음성 이력서 작성",
    page_icon="🎤",
    layout="wide",
)

st.title("🎤 OpenAI 기반 음성 이력서 작성")
st.write("아래 질문에 답변해주세요. 음성 입력 또는 텍스트 입력을 통해 작성 가능합니다.")


# 사용자 입력 데이터 저장
if "page" not in st.session_state:
    st.session_state.page = 1  # 초기 페이지 설정

if "user_data" not in st.session_state:
    st.session_state.user_data = {}

# def transcribe_audio(audio_file):
#     if audio_file:
#         audio_path = "temp_audio.wav"
#         with open(audio_path, "wb") as f:
#             f.write(audio_file.getbuffer())
#         return transcribe_audio_with_openai(audio_path, OPENAI_API_KEY)
#     return ""

# 기본 정보 페이지
# 페이지 전환 함수
def next_page():
    st.session_state.page += 1

def previous_page():
    st.session_state.page -= 1

def submit_resume():
    st.session_state.page = "preview"


# CSS 스타일 적용
def add_custom_styles():
    st.markdown(
        """
        <style>
        /* 텍스트 필드 하단 메시지 */
        .message-text {
            color: red; /* 메시지 색상 */
            font-size: 14px;
            margin-top: 5px;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )


# 음성 인식 함수
def recognize_speech(input_key):
    recognizer = sr.Recognizer()
    try:
        st.session_state.user_data[f"{input_key}_status"] = "🎤 음성 인식 중... 말씀하세요!"
        with sr.Microphone() as source:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio, language="ko-KR")
            st.session_state.user_data[f"{input_key}_status"] = ""  # 성공 시 메시지 제거
            return text
    except sr.UnknownValueError:
        st.session_state.user_data[f"{input_key}_status"] = "❌ 음성을 인식하지 못했습니다."
        return ""
    except sr.RequestError as e:
        st.session_state.user_data[f"{input_key}_status"] = f"❌ 음성인식 서비스 오류: {e}"
        return ""


# 기본 정보 입력 페이지
def basic_info_page():
    add_custom_styles()
    st.header("1. 기본 정보")

    fields = [
        ("이름", "이름을 입력해주세요."),
        ("주소", "현재 거주지는 어디인가요?"),
        ("연락처", "연락처를 입력해주세요."),
        ("이메일", "이메일 주소가 있다면 입력해주세요."),
        ("최종학력", "마지막으로 졸업한 학교와 전공을 입력해주세요."),
    ]

    for key, placeholder in fields:
        col1, col2 = st.columns([0.1, 0.9])
        with col1:
            if st.button("🎙️", key=f"{key}_voice"):
                st.session_state.user_data[key] = recognize_speech(key)
        with col2:
            st.session_state.user_data[key] = st.text_input(
                placeholder, value=st.session_state.user_data.get(key, "")
            )
            # 메시지 표시
            message = st.session_state.user_data.get(f"{key}_status", "")
            if message:
                st.markdown(f'<p class="message-text">{message}</p>', unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.button("이전", on_click=lambda: st.session_state.update(page=0))
    with col2:
        st.button("다음", on_click=lambda: st.session_state.update(page=2))


# 경력 및 직무 경험 페이지
def work_experience_page():
    add_custom_styles()
    st.header("2. 경력 및 직무 경험")

    fields = [
        ("경력", "지금까지 어떤 직업(직무)을 하셨나요?"),
        ("근무기간", "각 직업에서 근무한 기간을 입력해주세요."),
        ("주요 업무", "주요 업무나 역할을 입력해주세요."),
        ("강점", "강점으로 느꼈던 부분을 입력해주세요."),
    ]

    for key, placeholder in fields:
        col1, col2 = st.columns([0.1, 0.9])
        with col1:
            if st.button("🎙️", key=f"{key}_voice"):
                st.session_state.user_data[key] = recognize_speech(key)
        with col2:
            st.session_state.user_data[key] = st.text_area(
                placeholder, value=st.session_state.user_data.get(key, "")
            )
            # 메시지 표시
            message = st.session_state.user_data.get(f"{key}_status", "")
            if message:
                st.markdown(f'<p class="message-text">{message}</p>', unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.button("이전", on_click=lambda: st.session_state.update(page=1))
    with col2:
        st.button("다음", on_click=lambda: st.session_state.update(page=3))


# 자격증 및 특기사항 페이지
def skills_page():
    add_custom_styles()
    st.header("3. 자격증 및 특기사항")

    fields = [
        ("자격증", "어떤 기술이나 자격증을 보유하고 계신가요?"),
        ("프로그램", "사용해본 프로그램은 무엇이 있나요?"),
    ]

    for key, placeholder in fields:
        col1, col2 = st.columns([0.1, 0.9])
        with col1:
            if st.button("🎙️", key=f"{key}_voice"):
                st.session_state.user_data[key] = recognize_speech(key)
        with col2:
            st.session_state.user_data[key] = st.text_area(
                placeholder, value=st.session_state.user_data.get(key, "")
            )
            # 메시지 표시
            message = st.session_state.user_data.get(f"{key}_status", "")
            if message:
                st.markdown(f'<p class="message-text">{message}</p>', unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.button("이전", on_click=lambda: st.session_state.update(page=2))
    with col2:
        st.button("다음", on_click=lambda: st.session_state.update(page=4))


# 취미 및 성격 페이지
def personality_page():
    add_custom_styles()
    st.header("4. 취미 및 성격")

    fields = [
        ("취미", "여가시간에 주로 어떤 취미를 즐기시나요?"),
        ("성격", "자신의 성격이나 장점에 대해서 말씀해주세요."),
    ]

    for key, placeholder in fields:
        col1, col2 = st.columns([0.1, 0.9])
        with col1:
            if st.button("🎙️", key=f"{key}_voice"):
                st.session_state.user_data[key] = recognize_speech(key)
        with col2:
            st.session_state.user_data[key] = st.text_area(
                placeholder, value=st.session_state.user_data.get(key, "")
            )
            # 메시지 표시
            message = st.session_state.user_data.get(f"{key}_status", "")
            if message:
                st.markdown(f'<p class="message-text">{message}</p>', unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.button("이전", on_click=lambda: st.session_state.update(page=3))
    with col2:
        st.button("제출", on_click=lambda: st.session_state.update(page="preview"))


# 미리보기 페이지
def preview_page():
    st.header("📄 이력서 미리보기")
    user_data = st.session_state.user_data

    for key, value in user_data.items():
        st.write(f"**{key.capitalize()}:** {value}")
    if st.button("PDF로 저장"):
        pdf_path = create_pdf(user_data)
        st.success("PDF가 생성되었습니다!")
        with open(pdf_path, "rb") as pdf_file:
            st.download_button("📥 PDF 다운로드", data=pdf_file, file_name="resume.pdf", mime="application/pdf")


# 페이지 상태 관리
if st.session_state.page == 1:
    basic_info_page()
elif st.session_state.page == 2:
    work_experience_page()
elif st.session_state.page == 3:
    skills_page()
elif st.session_state.page == 4:
    personality_page()
elif st.session_state.page == "preview":
    preview_page()
