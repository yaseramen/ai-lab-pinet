"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, ImageIcon, Mic, Volume2, Code2, LanguagesIcon, Sparkles, Menu, X, LogIn, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import Script from 'next/script'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, language } = useLanguage()

  // دالة الدفع لإتمام الخطوة العاشرة وتنفيذ الاشتراك المرن
  const handlePiPayment = async () => {
    try {
      const Pi = (window as any).Pi;
      if (!Pi) {
        alert(language === "ar" ? "يرجى فتح التطبيق من متصفح Pi Browser" : "Please open in Pi Browser");
        return;
      }

      await Pi.init({ version: "2.0", sandbox: true });
      
      const payment = await Pi.createPayment({
        amount: 1.0, 
        memo: language === "ar" ? "اشتراك شهري مرن - AI Lab" : "Flexible Monthly Subscription - AI Lab",
        metadata: { type: "dynamic_subscription" },
      }, {
        onReadyForServerApproval: (id: string) => console.log("Payment ID:", id),
        onReadyForServerCompletion: (id: string, tx: string) => {
          alert(language === "ar" ? "تم تفعيل الاشتراك بنجاح!" : "Subscription activated successfully!");
        },
        onCancel: (id: string) => {},
        onError: (error: any) => console.error(error),
      });
    } catch (err) {
      console.error(err);
    }
  };

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
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      
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

            <nav className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Button onClick={handlePiPayment} variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Pi Network Login
              </Button>
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-4 border-t border-border">
              <Button onClick={handlePiPayment} variant="outline" size="sm" className="w-full bg-transparent">
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
            <Button onClick={handlePiPayment} size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/20">
              {language === "ar" ? "اشترك الآن (Pi)" : "Subscribe Now (Pi)"}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              {language === "ar" ? "التوثيق" : "View Documentation"}
            </Button>
          </div>
          
          {/* بند الحماية القانونية بناءً على طلبك */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded-lg max-w-fit mx-auto">
            <AlertCircle className="w-3 h-3" />
            <p>
              {language === "ar" 
                ? "يقر المستخدم بأن قيمة الاشتراك متغيرة وتتبع تقلبات السوق لحماية استمرارية الخدمة."
                : "Subscription rates are subject to market fluctuations to ensure service continuity."}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid Section (Omitted for brevity but kept in your original structure) */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-border bg-card group h-full">
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? tool.descriptionAr : tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {language === "ar"
                ? "© 2025 مختبر الذكاء الاصطناعي. ملاحظة: الأسعار متغيرة بناءً على السوق."
                : "© 2025 AI Lab. Note: Rates vary based on market fluctuations."}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                {language === "ar" ? "الخصوصية" : "Privacy"}
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                {language === "ar" ? "الشروط" : "Terms"}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

