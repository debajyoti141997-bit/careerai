import os
import tempfile
import streamlit as st
from resume_parser import extract_resume_text, extract_skills, compare_skills

st.title("CareerAI")

resume = st.file_uploader("Upload your resume (PDF)", type=["pdf"])
job_description = st.text_area("Paste the job description", height=200)

if st.button("Analyze"):
    if resume is None or not job_description.strip():
        st.warning("Please upload a PDF resume and paste a job description.")
    else:
        temp_pdf_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                temp_file.write(resume.read())
                temp_pdf_path = temp_file.name

            resume_text = extract_resume_text(temp_pdf_path)
            resume_skills = extract_skills(resume_text)
            result = compare_skills(resume_skills, job_description)

            st.metric("Skill Match", f"{result['match_percentage']}%")

            st.subheader("Matched Skills")
            st.write(", ".join(result["matched_skills"]) or "None")

            st.subheader("Missing Skills")
            st.write(", ".join(result["missing_skills"]) or "None")
        finally:
            if temp_pdf_path and os.path.exists(temp_pdf_path):
                os.remove(temp_pdf_path)
