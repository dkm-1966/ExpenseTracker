import { NextRequest, NextResponse } from "next/server";
import AIService from "@/services/AIService";

export async function POST(req: NextRequest) {
  try {
    const { data, message } = await req.json();
    
    if (!data || !message) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    const AIResponse = await AIService.analyze(JSON.stringify(data), message);
    return NextResponse.json(AIResponse);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}