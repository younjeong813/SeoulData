import streamlit as st
from gtts import gTTS
import speech_recognition as sr
import os
import io
import numpy as np
from pdf_generator import create_pdf
from CV_generator import generate_cv_with_ai  # CV 생성 함수 임포트

# Streamlit 앱 설정
st.set_page_config(
    page_title="Azure AI 기반 이력서 작성",
    page_icon="🎤",
    layout="wide",
)

st.title("🎤 OpenAI 기반 음성 이력서 작성")
st.write("각 질문에 답변해주세요. 음성 입력 또는 텍스트 입력을 통해 작성 가능합니다.")

# 사용자 입력 데이터 저장
if "page" not in st.session_state:
    st.session_state.page = 1  # 초기 페이지 설정

if "user_data" not in st.session_state:
    st.session_state.user_data = {}

if "last_audio_played" not in st.session_state:
    st.session_state.last_audio_played = None

if "generated_cv" not in st.session_state:
    st.session_state.generated_cv = None  # 생성된 CV 데이터

# 질문 리스트
questions = [
    ("이름", "이름이 무엇인가요?"),
    ("생년월일", "생년월일이 어떻게 되시나요?"),
    ("연락처", "연락처는 무엇인가요?"),
    ("주소", "현재 거주지는 어디인가요? 주소를 말씀해주세요."),
    ("최종학력", "마지막으로 졸업한 학교와 전공을 말씀해주세요."),
    ("경력", "지금까지 어떤 직업(직무)을 하셨나요?"),
    ("근무기간", "각 직업에서 근무한 기간을 알려주세요."),
    ("주요 업무", "주요 업무나 역할은 무엇이었나요?"),
    ("강점", "강점으로 느꼈던 부분을 말씀해주세요."),
    ("자격증", "어떤 자격증을 보유하고 계신가요?"),
    ("취미", "여가시간에 주로 어떤 취미를 즐기시나요?"),
    ("성격", "자신의 성격이나 장점에 대해서 말씀해주세요."),
]


# 텍스트를 음성으로 변환
def text_to_speech(text, lang="ko"):
    """
    텍스트를 음성으로 변환하고 메모리에서 직접 처리합니다.
    :param text: 변환할 텍스트
    :param lang: 음성 언어 (기본값: 'ko')
    :return: BytesIO 객체로 반환된 MP3 데이터
    """
    tts = gTTS(text=text, lang=lang)
    audio_data = io.BytesIO()  # 메모리 파일 생성
    tts.write_to_fp(audio_data)  # MP3 데이터를 메모리 파일에 저장
    audio_data.seek(0)  # 메모리 파일의 시작 위치로 이동
    return audio_data


# 음성 입력 처리
def recognize_speech():
    recognizer = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            st.write("음성 입력 중... 말씀해주세요!")
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio, language="ko-KR")
            return text
    except sr.UnknownValueError:
        st.error("❌ 음성을 인식하지 못했습니다. 다시 시도해주세요.")
        return ""
    except sr.RequestError as e:
        st.error(f"❌ 음성 인식 서비스 오류: {e}")
        return ""


# 페이지 전환 함수
def next_page():
    st.session_state.page += 1


def previous_page():
    st.session_state.page -= 1


def submit_resume():
    st.session_state.page = "preview"


# CSS 추가: 텍스트 입력 필드와 Audio Player 크기 조정
st.markdown(
    """
    <style>
    /* 텍스트 입력 필드 크기 조정 */

    .centered {
        text-align: center; /* 텍스트 중앙 정렬 */
    }

    </style>
    """,
    unsafe_allow_html=True,
)


# 질문 페이지
def question_page():
    current_index = st.session_state.page - 1
    total_questions = len(questions)

    if current_index < 0 or current_index >= len(questions):
        st.error("유효하지 않은 페이지입니다.")
        return

    key, question = questions[current_index]

    # 질문 텍스트 가운데 정렬
    st.markdown(
        f"<h2 style='text-align: center;'>질문 {current_index + 1} : {question}</h2>",
        unsafe_allow_html=True,
    )

    # 질문 음성 출력 (페이지 로드 시 자동)
    if st.session_state.last_audio_played != st.session_state.page:
        audio_file = text_to_speech(question)  # 음성을 생성하여 파일 저장
        st.audio(audio_file, format="audio/mp3", start_time=0)  # 기본 오디오 플레이어
        st.session_state.last_audio_played = st.session_state.page

    # 텍스트 입력 필드
    unique_key = f"question_{current_index}"  # 고유한 키 생성
    st.session_state.user_data[key] = st.text_input(
        "",
        value=st.session_state.user_data.get(key, ""),
        key=unique_key,  # 고유한 키 사용
    )

    # 음성 입력 버튼
    col1, col2, col3 = st.columns([5, 4, 1])  # 버튼을 가운데 배치
    with col2:
        # Streamlit 기본 버튼을 사용
        if st.button("🎙️", key=f"audio_{current_index}"):
            recognized_text = recognize_speech()  # 음성 입력 수행
            if recognized_text:
                st.session_state.user_data[key] = recognized_text
                st.success("음성이 성공적으로 변환되었습니다!")

    # 여백 추가
    st.markdown("<div style='margin-bottom: 200px;'></div>", unsafe_allow_html=True)

    col1, col2, col3 = st.columns([1, 8, 1])  # 간격 조정
    with col1:
        if current_index > 0:
            st.button(
                "이전",
                on_click=lambda: st.session_state.update(
                    page=st.session_state.page - 1
                ),
            )
    with col3:
        if current_index < total_questions - 1:
            st.button(
                "다음",
                on_click=lambda: st.session_state.update(
                    page=st.session_state.page + 1
                ),
            )
        else:
            st.button("제출", on_click=lambda: st.session_state.update(page="preview"))

    # 진행바 추가
    progress = (current_index + 1) / total_questions
    st.progress(progress)


# 미리보기 페이지
def preview_page():
    st.title("📄 이력서 미리보기")

    # 입력된 데이터를 기반으로 CV 생성
    if st.session_state.generated_cv is None:
        answer_sheet = st.session_state.user_data
        st.session_state.generated_cv = generate_cv_with_ai(answer_sheet)

    # 생성된 CV 출력
    st.write("### 해당 정보가 맞는지 확인해주세요.")
    st.markdown(f"\n{st.session_state.generated_cv}\n")

    # 사진 업로드
    uploaded_photo = st.file_uploader(
        "사진을 업로드하세요:", type=["jpg", "jpeg", "png"]
    )

    # 업로드된 사진 확인
    if uploaded_photo:
        uploaded_photo_path = os.path.join("output", "uploaded_photo.jpg")
        with open(uploaded_photo_path, "wb") as f:
            f.write(uploaded_photo.getbuffer())  # 업로드된 사진 저장
        st.image(uploaded_photo, caption="업로드된 사진", use_container_width=True)
    else:
        uploaded_photo_path = None

    # PDF 저장 버튼
    if st.button("PDF로 저장"):
        pdf_path = create_pdf(
            st.session_state.generated_cv, uploaded_photo_path
        )  # 생성된 CV로 PDF 생성
        st.success("PDF가 생성되었습니다!")
        with open(pdf_path, "rb") as pdf_file:
            st.download_button(
                "📥 PDF 다운로드",
                data=pdf_file,
                file_name="resume.pdf",
                mime="application/pdf",
            )

    # 이전 버튼
    if st.button("이전"):
        st.session_state.page = len(questions)


# 페이지 렌더링
if isinstance(st.session_state.page, int) and st.session_state.page <= len(questions):
    question_page()
elif st.session_state.page == "preview":
    preview_page()
else:
    st.error("유효하지 않은 페이지입니다.")
