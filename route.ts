
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const resume = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    if (!(resume instanceof File)) {
      return NextResponse.json(
        { error: "Resume PDF is required" },
        { status: 400 }
      );
    }

    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const pythonFormData = new FormData();

    pythonFormData.append("resume", resume, resume.name);
    pythonFormData.append("job_description", jobDescription);

    const pythonApiUrl =
      process.env.PYTHON_API_URL || "http://127.0.0.1:8000";

    const pythonResponse = await fetch(
      `${pythonApiUrl}/analyze`,
      {
        method: "POST",
        body: pythonFormData,
      }
    );

    const result = await pythonResponse.json();

    if (!pythonResponse.ok) {
      return NextResponse.json(
        { error: result.detail || "Python analysis failed" },
        { status: pythonResponse.status }
      );
    }

    return NextResponse.json(result);

  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

