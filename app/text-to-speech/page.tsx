"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Volume2, Pause, StopCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TextToSpeechPage() {
  const [text, setText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const { toast } = useToast()

  useState(() => {
    if (typeof window !== "undefined") {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)
        if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0])
        }
      }

      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  })

  const handleTogglePlay = () => {
    if (!text.trim()) {
      toast({
        title: "No text",
        description: "Please enter some text to convert to speech",
        variant: "destructive",
      })
      return
    }

    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else {
      if (window.speechSynthesis.paused && utteranceRef.current) {
        window.speechSynthesis.resume()
        setIsPlaying(true)
      } else {
        const utterance = new SpeechSynthesisUtterance(text)
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
        utterance.onend = () => {
          setIsPlaying(false)
        }
        utterance.onerror = () => {
          setIsPlaying(false)
          toast({
            title: "Error",
            description: "Failed to play speech",
            variant: "destructive",
          })
        }
        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)
        setIsPlaying(true)
      }
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-semibold">Text to Speech</span>
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
                <label className="text-sm font-medium mb-2 block">Select Voice</label>
                <select
                  className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background"
                  onChange={(e) => {
                    const voice = voices.find((v) => v.name === e.target.value)
                    if (voice) setSelectedVoice(voice)
                  }}
                  value={selectedVoice?.name || ""}
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Enter text to convert to speech</label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleTogglePlay} disabled={!text.trim()} size="lg" className="flex-1">
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 mr-2" />
                      Play Speech
                    </>
                  )}
                </Button>
                {isPlaying && (
                  <Button onClick={handleStop} variant="outline" size="lg">
                    <StopCircle className="w-5 h-5 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center bg-gradient-to-br from-card to-card/50">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Natural Voice Synthesis</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Convert your text into natural-sounding speech with support for multiple languages and voices
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
