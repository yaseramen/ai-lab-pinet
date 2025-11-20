"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, ImageIcon, Mic, Volume2, Code2, LanguagesIcon, Sparkles, Menu, X, LogIn } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, language } = useLanguage()

  const tools = [
    {
      icon: MessageSquare,
      title: t("chat"),
      description: "Write, summarize, translate, and get answers",
      descriptionAr: "اكتب، لخص، ترجم، واحصل على إجابات",
      href: "/chat",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ImageIcon,
      title: t("imageGen"),
      description: "Create stunning AI-generated images",
      descriptionAr: "إنشاء صور مذهلة بالذكاء الصناعي",
      href: "/image-generator",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Mic,
      title: t("voiceToText"),
      description: "Convert speech to written text",
      descriptionAr: "تحويل الكلام إلى نص مكتوب",
      href: "/voice-to-text",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Volume2,
      title: t("textToSpeech"),
      description: "Transform text into natural speech",
      descriptionAr: "تحويل النص إلى كلام طبيعي",
      href: "/text-to-speech",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Code2,
      title: t("codeAssistant"),
      description: "Get help with coding and debugging",
      descriptionAr: "احصل على مساعدة في البرمجة وإصلاح الأخطاء",
      href: "/code-assistant",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: LanguagesIcon,
      title: t("translator"),
      description: "Translate between multiple languages",
      descriptionAr: "ترجم بين لغات متعددة",
      href: "/translator",
      gradient: "from-teal-500 to-cyan-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">{t("appName")}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Pi Network Login
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <LogIn className="w-4 h-4 mr-2" />
                Pi Network Login
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powered by Pi Network
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t("appName")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            {t("tagline")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto">
              {language === "ar" ? "ابدأ الآن" : "Get Started"}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              {language === "ar" ? "التوثيق" : "View Documentation"}
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "ar" ? "أدوات الذكاء الاصطناعي" : "AI-Powered Tools"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === "ar"
              ? "اختر من مجموعة أدواتنا الذكية المصممة للمستخدمين العالميين"
              : "Choose from our suite of intelligent tools designed for global users"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-border bg-card group h-full">
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "ar" ? tool.descriptionAr : tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-card/50 border-border">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose AI Lab?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Built for creators, developers, and innovators worldwide
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <LanguagesIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Multilingual Support</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Access AI tools in your preferred language with full RTL support for Arabic and other languages
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Pi Network Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Seamlessly connect with Pi Network for secure authentication and transactions
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Developer Friendly</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Built with modern APIs and comprehensive documentation for easy integration
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Continuous Updates</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Regular feature additions including AI news, document analysis, and voice-powered app creation
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">{t("appName")}</span>
            </div>

            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "© 2025 مختبر الذكاء الاصطناعي. مدعوم من شبكة Pi."
                : "© 2025 AI Lab. Powered by Pi Network."}
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {language === "ar" ? "الخصوصية" : "Privacy"}
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {language === "ar" ? "الشروط" : "Terms"}
              </Link>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {language === "ar" ? "الدعم" : "Support"}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
