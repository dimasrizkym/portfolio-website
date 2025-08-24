"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { getAboutInfo } from "@/lib/data"

export function ProfessionalFocusSection() {
  const aboutInfo = getAboutInfo()

  return (
    <AnimatedSection animation="fade-up" id="professional-focus">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <Briefcase className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Professional Focus</h3>
          </div>

          <div className="space-y-2">
            {aboutInfo.focus.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <p className="text-sm text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
