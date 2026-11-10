import pymupdf
def extract_resume_text(pdf_path):
    document = pymupdf.open(pdf_path)

    extracted_text = ""

    for page in document:
        extracted_text += page.get_text()

    document.close()

    return extracted_text

def extract_skills(resume_text):

    skills_list = [
        "Python",
        "SQL",
        "Java",
        "C++",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "Keras",
        "PyTorch",
        "Scikit-learn",
        "Power BI",
        "Excel",
        "MySQL",
        "Streamlit",
        "Git",
        "AWS",
        "ETL",
        "Spark",
        "Docker"
    ]

    found_skills = []

    resume_text = resume_text.lower()

    for skill in skills_list:
        if skill.lower() in resume_text:
            found_skills.append(skill)

    return found_skills

def compare_skills(resume_skills, job_description):

    required_skills = extract_skills(job_description)

    resume_skills_lower = [
        skill.lower() for skill in resume_skills
    ]

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        if skill.lower() in resume_skills_lower:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    if len(required_skills) > 0:
        match_percentage = (
            len(matched_skills) / len(required_skills)
        ) * 100
    else:
        match_percentage = 0

    return {
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": round(match_percentage, 2)
    }