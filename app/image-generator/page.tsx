"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Sparkles, Download, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "No prompt",
        description: "Please enter a description for the image",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    toast({
      title: "Generating image",
      description: "Creating your AI-generated image...",
    })

    // Simulate image generation with placeholder
    setTimeout(() => {
      setGeneratedImage(`/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`)
      setIsGenerating(false)
      toast({
        title: "Image generated!",
        description: "Your AI-generated image is ready",
      })
    }, 2000)
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `ai-lab-${Date.now()}.png`
    link.click()

    toast({
      title: "Downloaded",
      description: "Image saved to your device",
    })
  }

  const handleRegenerate = () => {
    setGeneratedImage(null)
    handleGenerate()
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="md:block hidden">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-semibold">Image Generator</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Describe the image you want to create</label>
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGenerate()
                    }
                  }}
                  placeholder="A futuristic city at sunset with flying cars..."
                  className="w-full"
                  disabled={isGenerating}
                />
              </div>
              <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full" size="lg">
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </Card>

          {generatedImage && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleRegenerate}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Prompt:</strong> {prompt}
                </p>
              </div>
            </Card>
          )}

          {!generatedImage && !isGenerating && (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create AI Art</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-4">
                Enter a description above and click generate to create stunning AI-generated images
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {[
                  "A serene mountain landscape",
                  "Futuristic robot portrait",
                  "Abstract digital art",
                  "Cute cartoon character",
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
