"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="gap-2">
      <Languages className="w-4 h-4" />
      <span>{language === "en" ? "العربية" : "English"}</span>
    </Button>
  )
}
