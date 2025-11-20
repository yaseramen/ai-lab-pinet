import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!process.env.GOOGLE_API_KEY) {
      return Response.json(
        { error: "API key not configured. Please add GOOGLE_API_KEY to environment variables." },
        { status: 500 },
      )
    }

    // Use Gemini to generate a detailed image description
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const enhancedPrompt = `Create a detailed, vivid description for an AI image generator based on this request: "${prompt}". Include visual details, colors, lighting, composition, and style.`

    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    const description = response.text()

    // Return enhanced description - in a real app, this would call an image generation API
    return Response.json({
      success: true,
      description,
      imageUrl: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`,
    })
  } catch (error) {
    console.error("[v0] Image generation API error:", error)
    return Response.json({ error: "Failed to generate image description" }, { status: 500 })
  }
}
