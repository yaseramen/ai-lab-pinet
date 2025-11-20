"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mic, Square, Copy, Download } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function VoiceToTextPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsSupported(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " "
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript((prev) => prev + finalTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error("[v0] Speech recognition error:", event.error)
        setIsRecording(false)
        toast({
          title: "Error",
          description: "Failed to recognize speech. Please try again.",
          variant: "destructive",
        })
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [toast])

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      recognitionRef.current?.start()
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      })
    } else {
      setIsRecording(false)
      recognitionRef.current?.stop()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
    toast({
      title: "Copied!",
      description: "Transcript copied to clipboard",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded!",
      description: "Transcript saved to file",
    })
  }

  const handleClear = () => {
    setTranscript("")
    toast({
      title: "Cleared",
      description: "Transcript cleared",
    })
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Not Supported</h2>
          <p className="text-muted-foreground">
            Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.
          </p>
          <Link href="/">
            <Button className="mt-6">Go Home</Button>
          </Link>
        </Card>
      </div>
    )
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
                <Mic className="w-5 h-5 text-green-500" />
                <span className="text-lg font-semibold">Voice to Text</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="p-8 text-center">
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto relative">
                {isRecording && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />}
                {isRecording ? (
                  <Square className="w-10 h-10 text-white relative z-10" />
                ) : (
                  <Mic className="w-10 h-10 text-white relative z-10" />
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{isRecording ? "Recording..." : "Ready to Record"}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isRecording ? "Speak clearly into your microphone" : "Click the button below to start recording"}
                </p>
              </div>

              <Button
                onClick={handleToggleRecording}
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                className="w-full max-w-xs"
              >
                {isRecording ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
          </Card>

          {transcript && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-semibold">Transcription</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClear}>
                      Clear
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
