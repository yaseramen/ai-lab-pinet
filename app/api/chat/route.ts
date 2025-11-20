import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Convert history to Gemini format
    const chat = model.startChat({
      history:
        history?.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })) || [],
    })

    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return Response.json({ message: text })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
