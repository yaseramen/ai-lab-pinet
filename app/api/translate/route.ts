import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Translate the following text to ${targetLanguage}. Only provide the translation, no explanations:\n\n${text}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const translation = response.text()

    return Response.json({ translation })
  } catch (error) {
    console.error("[v0] Translation API error:", error)
    return Response.json({ error: "Failed to translate" }, { status: 500 })
  }
}
