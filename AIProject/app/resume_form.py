# resume_formatter.py
def format_resume(user_data):
    """
    사용자 데이터를 표준 이력서 포맷으로 정리합니다.
    :param user_data: 사용자 입력 데이터
    :return: 포맷된 이력서 데이터
    """
    return {
        "name": user_data.get("name", ""),
        "contact": user_data.get("address", ""),
        "email": user_data.get("email", ""),
        "education": user_data.get("education", ""),
        "job_history": user_data.get("job_history", ""),
        "job_duration": user_data.get("job_duration", ""),
        "responsibilities": user_data.get("responsibilities", ""),
        "strengths": user_data.get("strengths", "")
    }