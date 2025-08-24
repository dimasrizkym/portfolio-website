"use client"

import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { getAboutInfo } from "@/lib/data"

export function AboutSection() {
  const aboutInfo = getAboutInfo()

  return (
    <AnimatedSection animation="fade-up" id="about">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <User className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">About Me</h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm text-zinc-300">{aboutInfo.bio}</p>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
