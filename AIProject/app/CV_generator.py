# 라이브러리 
import os
import base64
from openai import AzureOpenAI
import openai
import tiktoken

# Azure 정보 관리
endpoint = os.getenv("ENDPOINT_URL", "https://bsa10-m667rv7m-eastus2.openai.azure.com/")
deployment = os.getenv("DEPLOYMENT_NAME", "cv-generator")
subscription_key = os.getenv("AZURE_OPENAI_API_KEY",
                             "AFBMek67HytiYe4dFLv6vTofhJfNAsqXIgnZl8djpjer5BVYBMOkJQQJ99BAACHYHv6XJ3w3AAAAACOG3mmr")

# 환경 변수 확인
if not endpoint or not deployment or not subscription_key:
    raise ValueError(
        "환경 변수가 올바르게 설정되지 않았습니다. "
        "ENDPOINT_URL, DEPLOYMENT_NAME, AZURE_OPENAI_API_KEY를 확인하세요."
    )

# Azure OpenAI 클라이언트 초기화
client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=subscription_key,
    api_version="2024-05-01-preview",
)


def parse_generated_cv_to_dict(generated_cv):
    """
    생성된 CV 데이터를 사전으로 변환합니다.
    :param generated_cv: 문자열 형식의 생성된 CV
    :return: 파싱된 사전 데이터
    """
    parsed_cv = {}
    lines = generated_cv.strip().split("\n")  # 줄바꿈으로 구분
    for line in lines:
        if "/" in line:
            key, value = line.split("/", 1)  # 슬래시로 키-값 분리
            parsed_cv[key.strip()] = value.strip()  # 공백 제거 후 저장
    return parsed_cv


def generate_cv_with_ai(answer_sheet):
    """
    Answer Sheet를 기반으로 CV 항목을 Azure OpenAI API를 통해 생성합니다.

    Parameters:
        answer_sheet (dict): 질문 및 응답이 저장된 발화 데이터

    Returns:
        str: CV 생성 결과
    """
    # Chat 프롬프트 구성
    chat_prompt = [
        {"role": "system", "content": "유저 응답을 기반으로 CV를 생성하는 AI입니다."},
        {"role": "user", "content": f"Answer Sheet 데이터:\n{answer_sheet}"},
    ]

    try:
        # OpenAI API 호출
        completion = client.chat.completions.create(
            model=deployment,
            messages=chat_prompt,
            max_tokens=1000,
            temperature=0.7,
            top_p=0.95,
        )

        # 응답 데이터 확인
        if not completion or not completion.choices:
            raise ValueError("API 응답이 예상과 다릅니다. 응답 데이터를 확인하세요.")

        # 응답 메시지 추출
        response_message = completion.choices[0].message.content
        return response_message

    except openai.error.AuthenticationError as auth_error:
        raise RuntimeError(
            f"인증 오류: Azure OpenAI API 키를 확인하세요. 상세 정보: {auth_error}"
        )
    except openai.error.OpenAIError as api_error:
        raise RuntimeError(
            f"Azure OpenAI API 호출 중 오류가 발생했습니다. 상세 정보: {api_error}"
        )
    except Exception as e:
        raise RuntimeError(f"CV 생성 중 알 수 없는 오류가 발생했습니다: {e}")
