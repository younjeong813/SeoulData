# 라이브러리 
import os  
import base64
from openai import AzureOpenAI  
import openai
import tiktoken

# Azure 정보 관리
endpoint = os.getenv("ENDPOINT_URL", "https://bsa10-m667rv7m-eastus2.openai.azure.com/")  
deployment = os.getenv("DEPLOYMENT_NAME", "cv-generator")  
subscription_key = os.getenv("AZURE_OPENAI_API_KEY", "AFBMek67HytiYe4dFLv6vTofhJfNAsqXIgnZl8djpjer5BVYBMOkJQQJ99BAACHYHv6XJ3w3AAAAACOG3mmr")  
client = AzureOpenAI(  
    azure_endpoint=endpoint,  
    api_key=subscription_key,  
    api_version="2024-05-01-preview",
)

# 함수
def apply_generator(answer_sheet):
    """
    Answer Sheet를 기반으로 Apply Filter 항목을 Azure OpenAI API를 통해 생성합니다.

    Parameters:
        answer_sheet (dict): 질문 및 응답이 저장된 발화 데이터
    
    Returns:
        dict: Apply Filter 데이터
    """

    # 채팅 프롬프트 준비
    chat_prompt = [
    {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "당신은 유저 응답을 기반으로 Job application에 대한 선호도를 정리하는 AI이다. 정리해야 할 항목은 다음과 같다: 희망 직종/근무 일정(요일)/근무 일정(시간대)/근무 시간(1회 출근 당)/근무 유형(개인 또는 단체)/근무 장소(실내 또는 야외)에 대한 응답을 간략히 요약해서 출력해줘. 정답 예시는 경비/주3일(월,수,금)/09:00-18:00/8시간/개인 업무/무관."
            }
        ]
    }
    ] 


    # Answer Sheet를 user 메시지에 추가
    chat_prompt.append({
        "role": "user",
        "content": f"Answer Sheet 데이터:\n{answer_sheet}"
    })

    messages = chat_prompt

    completion = client.chat.completions.create(  
    model=deployment,
    messages=messages,
    max_tokens=1000,  
    temperature=0.7,  
    top_p=0.95,  
    frequency_penalty=0,  
    presence_penalty=0,
    stop=None,  
    stream=False
)

    # 모델 응답에서 메시지 내용만 추출
    response_message = completion.choices[0].message.content

    # 결과 출력
    return response_message
    

# 예제 Answer Sheet
answer_sheet = {
    "1. 근무 희망 직종\n1. 어떤 일을 하고 싶으신가요?": "저는 데이터 분석과 관련된 일을 하고 싶습니다.",
    "2. 근무 희망 일정\n1. 일주일에 대략 몇 일 근무하고 싶으신가요?": "주 5일 근무를 희망합니다.",
    "2. 근무 희망 일정\n1. 근무 요일에 대한 선호 사항이 있나요?": "월요일부터 금요일까지 근무를 선호합니다.",
    "2. 근무 희망 일정\n2. 희망하는 근무 시간대를 말씀해주세요.": "오전 9시부터 오후 6시까지 근무하고 싶습니다.",
    "2. 근무 희망 일정\n3. 희망하는 하루 근무 시간을 말씀해주세요.": "하루 8시간 근무를 희망합니다.",
    "2. 근무 희망 일정\n4. 함께 하는 업무와 혼자 하는 업무 중 선호하는 옵션이 있다면 알려주세요.": "함께 하는 업무를 더 선호하지만, 혼자 하는 업무도 괜찮습니다.",
    "2. 근무 희망 일정\n5. 업무 장소 (실내, 실외) 중 선호하는 장소가 있다면 알려주세요.": "실내에서 근무하는 것을 선호합니다."
}


# Answer Sheet 토큰 계산
# 사용하고 있는 모델에 맞는 토크나이저 불러오기 (예: GPT-3.5, GPT-4)
encoding = tiktoken.get_encoding("cl100k_base")  # GPT-3.5, GPT-4 모델에 맞는 인코딩

# Answer Sheet 데이터를 텍스트 형식으로 변환
answer_sheet_str = "\n".join([f"{key}: {value}" for key, value in answer_sheet.items()])

# 텍스트를 토큰화하고 토큰 수 계산
tokens = encoding.encode(answer_sheet_str)
token_count = len(tokens)

# 토큰 수 출력
print(f"Answer Sheet의 토큰 수: {token_count}")

# CV 생성 호출
job_result = apply_generator(answer_sheet)
print("Generated Job Application 선호도:")
print(job_result)

# # 텍스트를 슬래시 (/)와 엔터 (\n)로 구분
# lines = job_result.split('\n')  # 엔터로 첫 번째 구분

# # 각 라인에서 슬래시 (/)로 추가 구분
# data = [line.split('/') for line in lines]

# # 결과 확인
# for item in data:
#     print(item)
#------------------------------
# chat_prompt = [
#     {
#         "role": "system",
#         "content": [
#             {
#                 "type": "text",
#                 "text": "You are an AI assistant that helps generate CV content from user responses. "
#                     "The CV should include fields such as name, date of birth, contact information, "
#                     "address, education (school, major, graduation year), and work experience (company, period, role)."
#             }
#         ]
#     },
#     {
#         "role": "user",
#         "content": [
#             {
#                 "type": "text",
#                 "text": "제 이름은 홍길동입니다.",
#     "2. 생년월일이 어떻게 되시나요?": "1950년 3월 1일입니다."
#             }
#         ]
#     },
#     {
#         "role": "assistant",
#         "content": [
#             {
#                 "type": "text",
#                 "text": "알겠습니다! 질문에 대한 답변들을 제공해주시면, 그 내용을 바탕으로 이력서에 들어갈 효과적인 멘트를 작성해드리겠습니다. 질문과 답변을 보내주세요."
#             }
#         ]
#     }
# ] 
    


# # 음성이 사용되는 경우 음성 결과 포함  
# messages = chat_prompt  
    
# # 완료 생성  
# completion = client.chat.completions.create(  
#     model=deployment,
#     messages=messages,
#     max_tokens=800,  
#     temperature=0.7,  
#     top_p=0.95,  
#     frequency_penalty=0,  
#     presence_penalty=0,
#     stop=None,  
#     stream=False
# )
  
# # 모델 응답에서 메시지 내용만 추출
# response_message = completion.choices[0].message.content

# # 결과 출력
# print(response_message)    