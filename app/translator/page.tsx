"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Languages, ArrowRight, Copy, Repeat } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("English")
  const [targetLanguage, setTargetLanguage] = useState("Arabic")
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()

  const languages = [
    "English",
    "Arabic",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Korean",
    "Portuguese",
    "Russian",
    "Italian",
    "Dutch",
    "Turkish",
    "Hindi",
    "Bengali",
  ]

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "No text",
        description: "Please enter text to translate",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setTranslatedText(data.translation)
      toast({
        title: "Translation complete!",
        description: `Translated to ${targetLanguage}`,
      })
    } catch (error) {
      console.error("[v0] Translation error:", error)
      toast({
        title: "Error",
        description: "Failed to translate. Make sure GOOGLE_API_KEY is set.",
        variant: "destructive",
      })
      setTranslatedText("Translation failed. Please make sure the Google API key is configured.")
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
    toast({
      title: "Languages swapped",
      description: "Source and target languages switched",
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
    toast({
      title: "Copied!",
      description: "Translation copied to clipboard",
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
                <Languages className="w-5 h-5 text-teal-500" />
                <span className="text-lg font-semibold">Translator</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSwapLanguages}>
              <Repeat className="w-4 h-4 mr-2" />
              Swap
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Source Language</label>
                  <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className="text-sm border border-border rounded-md px-3 py-1 bg-background"
                    disabled={isTranslating}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <Textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="min-h-[300px]"
                  disabled={isTranslating}
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Target Language</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="text-sm border border-border rounded-md px-3 py-1 bg-background"
                    disabled={isTranslating}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <Textarea
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                  className="min-h-[300px] bg-muted/50"
                />
                {translatedText && (
                  <Button variant="outline" size="sm" onClick={handleCopy} className="w-full bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Translation
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isTranslating}
              size="lg"
              className="min-w-[200px]"
            >
              {isTranslating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="w-5 h-5 mr-2" />
                  Translate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          <Card className="p-8 text-center bg-gradient-to-br from-card to-card/50">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <Languages className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multilingual Translation</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Translate text between multiple languages with high accuracy and natural phrasing powered by AI
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
