import streamlit as st
import time
import numpy as np
import base64
import pandas as pd
import os
from PIL import Image

# Openai API Key (배수아 개인)
key = "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"


# # [함수] --------------------------------------------------------------------------------------
# # 특정 경로의 이미지 파일에서 크기 가져오기
# def get_image_size(image_path):
#     with Image.open(image_path) as img:
#         return img.size  # (width, height)

# # PNG를 JPG로 변환하는 함수
# def convert_png_to_jpg(image_path, save_path):
#     with Image.open(image_path) as img:
#         # PNG 이미지가 RGBA 모드라면, 투명 배경을 흰색으로 채움
#         if img.mode == "RGBA":
#             # 새로운 흰색 배경 이미지를 생성 (크기는 원본 이미지 크기와 동일)
#             background = Image.new("RGB", img.size, (255, 255, 255))  # 흰색 배경 (RGB)
            
#             # 흰색 배경에 원본 이미지를 붙여넣음
#             background.paste(img, (0, 0), img)  # img의 알파 채널을 마스크로 사용
            
#             img = background  # 배경이 흰색인 이미지를 사용
        
#         # JPG로 저장
#         img.save(save_path, "JPEG")


# # 이미지 크롭 함수
# def crop_image(image_path, size, save_path):
#     with Image.open(image_path) as img:
#         # 크롭할 크기 계산 (중앙을 기준으로)
#         width, height = img.size
#         target_width, target_height = size
        
#         # 중앙을 기준으로 크롭
#         left = (width - target_width) / 2
#         top = (height - target_height) / 2
#         right = (width + target_width) / 2
#         bottom = (height + target_height) / 2

#         # 크롭된 이미지 생성
#         img_cropped = img.crop((left, top, right, bottom))

#         # 크롭된 이미지 저장
#         img_cropped.save(save_path)

# # 특정 폴더 내 모든 이미지 파일에 대해 크롭 수행
# def crop_images_in_folder(folder_path, target_size):
#     # 폴더 내 모든 파일을 순차적으로 확인
#     for file_name in os.listdir(folder_path):
#         file_path = os.path.join(folder_path, file_name)
        
#         # PNG 파일을 JPG로 변환 후 크롭
#         if file_name.endswith('.png'):
#             # PNG를 JPG로 변환
#             jpg_file_path = file_path.replace(".png", ".jpg")
#             convert_png_to_jpg(file_path, jpg_file_path)
#             print(f"PNG 파일을 JPG로 변환 완료: {file_name} -> {jpg_file_path}")
#             # JPG로 변환된 파일 크롭
#             crop_image(jpg_file_path, target_size, jpg_file_path)
#             print(f"크롭된 이미지 저장: {jpg_file_path}")
        
#         # JPG 또는 JPEG 파일에 대해서도 크롭
#         elif file_name.endswith(('.jpg', '.jpeg')):
#             save_path = file_path
#             crop_image(file_path, target_size, save_path)
#             print(f"크롭된 이미지 저장: {save_path}")

# # [전처리] : 이미지 사이즈 크롭해서 맞추기 (완료해서 주석 처리 해둠.)----------------------------------------------------------------------------
# # 이미지 크기 가져오기
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
STATIC_DIR = os.path.join(BASE_DIR,"..") 
image_path = os.path.join(STATIC_DIR,"static","icon","page3")
# image_path = os.path.join(STATIC_DIR, "calendar.jpg")
# target_size = get_image_size(image_path)

# # 크롭할 폴더 지정
# folder_path = os.path.join(STATIC_DIR, "page3")  # 크롭할 이미지들이 있는 폴더 경로

# # 폴더 내 모든 이미지 크롭
# crop_images_in_folder(folder_path, target_size)


# Streamlit 앱 설정
st.set_page_config(page_title="디지털 배움터", page_icon="💬", layout="wide")

st.title("💬 디지털 배움터")
st.write("디지털 리터러시 향상에 도움이 되는 **영상 강좌**를 시청할 수 있습니다.")



# 강좌 목록
topics = [
    {"title": "이메일 보내기", "description": "이메일을 효과적으로 보내는 법을 배웁니다.", 
     "image": os.path.join(image_path, "email.jpg"), 
     "details": "이메일 발송/수신과 관련된 기초적인 기능을 다룹니다.",
     "video": "C:/Users/User/Desktop/SKKU/2024 Winter Break/Microsoft Hackerton/ExampleVid-SendEmail.mp4"},

    {"title": "인터넷 뱅킹", "description": "안전하게 인터넷 뱅킹을 사용하는 법을 배웁니다.", 
     "image": os.path.join(image_path, "bank.jpg"),
     "details": "인터넷 뱅킹 로그인 및 송금 방법을 다룹니다.",
     "video": "C:/Users/User/Desktop/SKKU/2024 Winter Break/Microsoft Hackerton/ExampleVid-SendEmail.mp4"},

    {"title": "화상 회의", "description": "화상 회의 진행 및 팁을 배웁니다.", 
     "image": os.path.join(image_path, "zoom.jpg"),
     "details": "화상 회의 어플리케이션인 줌(Zoom)의 기초적인 사용 방법을 다룹니다.",
     "video": "C:/Users/User/Desktop/SKKU/2024 Winter Break/Microsoft Hackerton/ExampleVid-SendEmail.mp4"},

    {"title": "업무 일정 관리", 
     "description": "디지털 캘린더를 활용하여 업무 일정을 효율적으로 관리하는 방법을 배웁니다.", 
     "image": os.path.join(image_path, "calendar.jpg"), 
     "details": "구글 캘린더를 활용하여 일정을 추가하고 관리하는 방법을 다룹니다.", 
     "video": "C:/Users/User/Desktop/SKKU/2024 Winter Break/Microsoft Hackerton/ExampleVid-SendEmail.mp4"},

    {"title": "보이스피싱 예방", 
     "description": "보이스피싱을 예방하고, 의심되는 전화를 구별하는 방법을 배웁니다.", 
     "image": os.path.join(image_path, "phishing.jpg"), 
     "details": "보이스피싱의 유형과 피해를 예방할 수 있는 방법, 의심스러운 전화를 받았을 때의 대처 방법을 다룹니다.", 
     "video": "C:/Users/User/Desktop/SKKU/2024 Winter Break/Microsoft Hackerton/ExampleVid-SendEmail.mp4"},

    {"title": "온라인 쇼핑", 
     "description": "온라인 쇼핑을 안전하게 하는 방법을 배웁니다.", 
     "image": os.path.join(image_path, "internetshop.jpg"), 
     "details": "쿠팡 모바일 어플을 이용한 온라인 쇼핑의 시작부터 배송까지 기초적인 방법을 다룹니다.", 
     "video": "C:/Users/User/Desktop/SKKU/2024 Winter Break/Microsoft Hackerton/ExampleVid-SendEmail.mp4"}
]

# 검색 바
query = st.text_input(
    label="검색",
    placeholder="원하는 강좌를 검색하세요.",
    label_visibility="collapsed"
)
st.write(" ")
st.write("---")

# 검색 필터 버튼
# st.button("검색 필터", key="filter")

# 검색 기능 구현
filtered_topics = [t for t in topics if query.lower() in t["title"].lower()] if query else topics

# 강좌 카드 표시
#st.markdown("#### 강좌 리스트")
columns = st.columns(3)  # 3개의 열 생성

for idx, topic in enumerate(filtered_topics):
    col = columns[idx % 3]  # 순차적으로 열에 배치
    with col:
        with st.container():
            # 경계 박스 스타일링
            # st.markdown("----")  # 경계선을 위/아래에 추가
            st.image(topic["image"], use_container_width=True)
            st.subheader(topic["title"])
            st.write(topic["description"])
            if st.button("자세히 보기", key=f"button-{idx}"):
                st.session_state["selected_topic"] = topic        

            

# 선택된 강좌의 상세 정보
if "selected_topic" in st.session_state:
    selected = st.session_state["selected_topic"]
    st.markdown("---")
    st.header(f"📘 {selected['title']}")
    st.write(selected["details"])

    # 비디오가 있는 경우, 비디오를 보여주는 기능 추가
    if os.path.exists(topic["video"]):
        st.video(topic["video"])
    else:
        st.write(f"비디오를 찾을 수 없습니다: {topic['video']}")

else:
    st.markdown("---")
    st.write("강좌를 클릭하여 자세한 영상을 확인하세요.")

# use 'streamlit run Demo.py' to run the code

