from fastapi import FastAPI, UploadFile, File, Form
from resume_parser import extract_resume_text, extract_skills, compare_skills
import tempfile
import os
app = FastAPI()
@app.get("/")
def home():
    return {"message": "CareerAI Python API is running!"}
@app.post("/analyze")
@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    temp_pdf_path = None

    try:
        file_content = await resume.read()

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            temp_file.write(file_content)
            temp_pdf_path = temp_file.name

        resume_text = extract_resume_text(temp_pdf_path)

        resume_skills = extract_skills(resume_text)

        result = compare_skills(
            resume_skills,
            job_description
        )

        return {
            "message": "Resume analysed successfully!",
            "filename": resume.filename,
            "resume_skills": resume_skills,
            "job_analysis": result
        }

    finally:
        if temp_pdf_path and os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)