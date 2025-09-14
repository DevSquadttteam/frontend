import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { symptoms, history } = await req.json();

    const prompt = `
Ты — ИИ врач. Пациент описал симптомы: "${symptoms}".
История общения: ${history.join("\n")}
Предположи диагноз и уточни 2-3 симптома.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI diagnose error:", error);
    return NextResponse.json({ error: error?.message || "Ошибка сервера" }, { status: 500 });
  }
}
