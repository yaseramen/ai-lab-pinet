"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Code2, Send, Copy, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CodeAssistantPage() {
  const [prompt, setPrompt] = useState("")
  const [language, setLanguage] = useState("JavaScript")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "No prompt",
        description: "Please describe what you want to build",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/code-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          language,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setGeneratedCode(data.code)
      toast({
        title: "Code generated!",
        description: "Your code is ready",
      })
    } catch (error) {
      console.error("[v0] Code generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate code. Make sure GOOGLE_API_KEY is set.",
        variant: "destructive",
      })
      setGeneratedCode("// Sorry, code generation failed. Please make sure the Google API key is configured.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    })
  }

  const handleClear = () => {
    setGeneratedCode("")
    setPrompt("")
    toast({
      title: "Cleared",
      description: "Code cleared",
    })
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
                <Code2 className="w-5 h-5 text-indigo-500" />
                <span className="text-lg font-semibold">Code Assistant</span>
              </div>
            </div>
            {generatedCode && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Programming Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background"
                  disabled={isLoading}
                >
                  <option>JavaScript</option>
                  <option>TypeScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>Go</option>
                  <option>Rust</option>
                  <option>PHP</option>
                  <option>Ruby</option>
                  <option>Swift</option>
                  <option>Kotlin</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Describe what you want to build</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Create a function that sorts an array of objects by date..."
                  className="min-h-[120px]"
                  disabled={isLoading}
                />
              </div>
              <Button onClick={handleGenerate} disabled={!prompt.trim() || isLoading} size="lg" className="w-full">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating Code...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </Card>

          {generatedCode && (
            <Card className="p-6 bg-muted/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Generated Code</h3>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono bg-background p-4 rounded-lg overflow-x-auto max-h-[500px] overflow-y-auto">
                  {generatedCode}
                </pre>
              </div>
            </Card>
          )}

          {!generatedCode && !isLoading && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Code Generation</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                Describe what you want to build and get clean, well-commented code in your preferred language
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Create a REST API endpoint",
                  "Sort array by date",
                  "Validate email format",
                  "Connect to database",
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
