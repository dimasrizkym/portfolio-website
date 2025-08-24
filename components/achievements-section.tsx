import { TrophyIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"

interface Achievement {
  title: string
  event: string
  organization: string
  date: string
  type: string
}

const achievements: Achievement[] = [
  {
    title: "1st – Web Design Competition",
    event: "PENS HIMIT FEST",
    organization: "Politeknik Elektronika Negeri Surabaya",
    date: "Nov 2022",
    type: "Competition",
  },
  {
    title: "1st – Skilvul Challenge: Mentor on Demand",
    event: "PROA Digitalent Kominfo, Batch 3: UI/UX Design",
    organization: "Skilvul",
    date: "Oct 2022",
    type: "Challenge",
  },
  {
    title: "3rd – Web Design Competition",
    event: "Digital Festival Nasional 2022",
    organization: "Politeknik Negeri Subang",
    date: "Mar 2022",
    type: "Competition",
  },
  {
    title: "3rd – Web Design Competition",
    event: "UTDI 2022",
    organization: "Universitas Teknologi Digital Indonesia",
    date: "Jan 2022",
    type: "Competition",
  },
]

const getPositionColor = (title: string) => {
  if (title.includes("1st")) {
    return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
  } else if (title.includes("2nd")) {
    return "text-gray-300 bg-gray-300/10 border-gray-300/20"
  } else if (title.includes("3rd")) {
    return "text-amber-600 bg-amber-600/10 border-amber-600/20"
  }
  return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
}

const getPositionText = (title: string) => {
  if (title.includes("1st")) return "1st"
  if (title.includes("2nd")) return "2nd"
  if (title.includes("3rd")) return "3rd"
  return "Winner"
}

export function AchievementsSection() {
  return (
    <AnimatedSection animation="fade-up" id="achievements">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <TrophyIcon className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Achievements and Awards</h3>
          </div>

          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={index} animation="slide-right" delay={100 * (index + 1)}>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-2 py-1 rounded text-xs font-bold flex-shrink-0 ${getPositionColor(achievement.title)}`}
                    >
                      {getPositionText(achievement.title)}
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">{achievement.title}</h5>
                      <p className="text-xs text-zinc-400">
                        {achievement.event} • {achievement.organization}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 bg-zinc-700/50 px-2 py-1 rounded">{achievement.date}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
