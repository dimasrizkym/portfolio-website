"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, ChevronDown, ChevronUp } from "lucide-react"
import { ExperienceCard } from "@/components/experience-card"
import { AnimatedSection } from "@/components/animated-section"
import { getExperienceInfo } from "@/lib/data"

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false)
  const experienceInfo = getExperienceInfo()

  const displayedExperiences = showAll ? experienceInfo : experienceInfo.slice(0, 3)
  const hasMoreExperiences = experienceInfo.length > 3

  return (
    <AnimatedSection animation="fade-up" id="experience">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Experience</h3>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {displayedExperiences.map((experience, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                <ExperienceCard
                  title={experience.title}
                  company={experience.company}
                  period={experience.period}
                  description={experience.description}
                  achievements={experience.achievements}
                  technologies={experience.technologies}
                  positions={experience.positions}
                />
              </AnimatedSection>
            ))}
          </div>

          {hasMoreExperiences && (
            <div className="flex justify-center mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="text-xs sm:text-sm px-4 py-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
