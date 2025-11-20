import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const systemPrompt = `You are an expert code assistant. Generate clean, well-commented ${language} code based on the user's request. Provide only the code with brief comments, no additional explanations.`

    const result = await model.generateContent(`${systemPrompt}\n\nUser request: ${prompt}`)
    const response = await result.response
    const code = response.text()

    return Response.json({ code })
  } catch (error) {
    console.error("[v0] Code assistant API error:", error)
    return Response.json({ error: "Failed to generate code" }, { status: 500 })
  }
}
