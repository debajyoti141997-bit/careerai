
"use client";

import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", selectedFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Analysis request failed.");
        return;
      }

      setAnalysisResult(result);
    } catch (error) {
      alert("Could not connect to the server. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-950">
          Career<span className="text-purple-600">AI</span>
        </h1>

        <button className="rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-blue-950 transition hover:bg-purple-50">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">

        <div className="mb-6 rounded-full border border-purple-200 bg-purple-50 px-5 py-2 text-sm font-semibold text-purple-700">
          ✨ Your AI-powered career companion
        </div>

        <h2 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-blue-950 md:text-7xl">
          Build Your Career
          <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            With AI
          </span>
        </h2>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
          Analyze your resume, discover skill gaps, and identify career
          opportunities with the power of Artificial Intelligence.
        </p>

        {/* Upload Card */}
        <div className="mt-12 w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-purple-100 md:p-12">

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-blue-950">
              Start with your resume
            </h3>

            <p className="mt-2 text-gray-500">
              Upload your resume and let CareerAI analyze your potential.
            </p>
          </div>

          {/* Resume Upload */}
          <label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/50 px-6 py-12 transition hover:border-purple-500 hover:bg-purple-50">

            <span className="mb-4 text-5xl">📄</span>

            <span className="font-semibold text-blue-950">
              Choose your resume
            </span>

            <span className="mt-2 text-sm text-gray-500">
              PDF format supported
            </span>

            <input
              type="file"
              accept=".pdf,application/pdf"
              className="mt-5 max-w-full text-sm text-gray-600"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file && file.type === "application/pdf") {
                  setFileName(file.name);
                  setSelectedFile(file);
                } else {
                  setFileName("");
                  setSelectedFile(null);
                  alert("Please select a valid PDF file.");
                }
              }}
            />
          </label>

          {/* Selected File Name */}
          {fileName && (
            <p className="mt-4 rounded-xl bg-purple-50 p-3 text-sm font-semibold text-purple-700">
              Selected resume: {fileName}
            </p>
          )}

          {/* Job Description */}
          <div className="mt-8 text-left">

            <label className="mb-3 block font-semibold text-blue-950">
              Target Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the job description here..."
              rows={6}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            <p className="mt-2 text-xs text-gray-400">
              Paste the responsibilities, requirements and skills for your
              target role.
            </p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            className="mt-7 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-700 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:shadow-xl"
          >
            Analyze My Resume →
          </button>

        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-blue-950">
            Resume Analysis
          </h3>
          <p className="text-gray-600">
            Extract important skills and information from your resume.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-blue-950">
            Skill Matching
          </h3>
          <p className="text-gray-600">
            Compare your skills with the requirements of your target job.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-blue-950">
            Career Insights
          </h3>
          <p className="text-gray-600">
            Discover missing skills and identify areas for improvement.
          </p>
        </div>

      </section>

      {/* Analysis Dashboard */}
      {analysisResult && (
        <section className="mx-auto mt-12 max-w-5xl px-6 pb-16">

          <h2 className="mb-6 text-3xl font-bold text-blue-950">
            Your Resume Analysis
          </h2>

          {/* Match Percentage */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">

            <h3 className="text-lg font-semibold text-gray-600">
              Skill Match Percentage
            </h3>

            <p className="mt-3 text-5xl font-bold text-purple-600">
              {analysisResult.job_analysis.match_percentage}%
            </p>

          </div>

          {/* Matched and Missing Skills */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Matched Skills */}
            <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

              <h3 className="mb-4 text-lg font-bold text-green-700">
                Matched Skills
              </h3>

              <ul className="space-y-2">
                {analysisResult.job_analysis.matched_skills.map(
                  (skill: string) => (
                    <li key={skill} className="text-gray-700">
                      ✅ {skill}
                    </li>
                  )
                )}
              </ul>

            </div>

            {/* Missing Skills */}
            <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">

              <h3 className="mb-4 text-lg font-bold text-red-700">
                Missing Skills
              </h3>

              <ul className="space-y-2">
                {analysisResult.job_analysis.missing_skills.map(
                  (skill: string) => (
                    <li key={skill} className="text-gray-700">
                      ⚠️ {skill}
                    </li>
                  )
                )}
              </ul>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}
