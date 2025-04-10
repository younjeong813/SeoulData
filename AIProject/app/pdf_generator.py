from fpdf import FPDF
import os


def create_pdf(resume_text, photo_path):
    """
    주어진 이력서 텍스트와 사진을 사용하여 PDF를 생성합니다.
    각 섹션마다 구분선을 추가해, 글이 구분되도록 표시하되
    첫 번째 섹션에는 구분선을 넣지 않습니다.

    Parameters:
        resume_text (str): 이력서 내용 (큰 주제마다 빈 줄로 구분되어 있다고 가정)
        photo_path (str): 업로드된 사진 경로 (없을 수 있음)

    Returns:
        str: 생성된 PDF 파일 경로
    """
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # 1) 폰트 등록
    font_path = "NanumGothic.ttf"  # 실제 폰트 경로로 수정
    pdf.add_font("NanumGothic", fname=font_path, uni=True)

    # 2) 사진을 우측 상단에 배치
    if photo_path and os.path.exists(photo_path):
        pdf.image(photo_path, x=150, y=20, w=30)

    # 3) 텍스트 시작 위치 조정 (사진이 오른쪽 위에 있으므로 y=20 정도에서 시작)
    pdf.set_y(20)
    pdf.set_font("NanumGothic", size=12)

    # 4) 빈 줄(\n\n)을 기준으로 섹션을 나누기
    sections = resume_text.strip().split("\n\n")

    # 5) 각 섹션을 순회하며 출력
    #    첫 번째 섹션은 구분선 없이, 두 번째 섹션부터 구분선 그리기
    for i, section in enumerate(sections, start=1):
        # 섹션 내용 출력
        pdf.multi_cell(0, 8, section)

        # 첫 번째 섹션은 선을 그리지 않음
        if i != 1:
            # 구분선 그리기
            current_y = pdf.get_y() + 2
            pdf.line(10, current_y, 200, current_y)

        # 다음 섹션과 약간의 줄 간격
        pdf.ln(5)

    # 6) PDF 저장
    os.makedirs("output", exist_ok=True)
    pdf_path = os.path.join("output", "resume.pdf")
    pdf.output(pdf_path)
    return pdf_path
