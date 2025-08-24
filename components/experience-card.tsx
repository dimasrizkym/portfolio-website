import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp } from "lucide-react"

interface Position {
  title: string
  period: string
  employmentType?: string
  description: string
  keyAchievements?: string[]
}

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  employmentType?: string
  description: string
  achievements: string[]
  technologies: string[]
  positions?: Position[]
}

const getEmploymentTypeStyle = (type: string) => {
  switch (type?.toLowerCase()) {
    case "full-time":
      return "bg-green-500/10 text-green-400 border-green-500/20"
    case "part-time":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20"
    case "internship":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20"
    case "contract":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20"
    case "seasonal":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    case "freelance":
      return "bg-pink-500/10 text-pink-400 border-pink-500/20"
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
  }
}

export function ExperienceCard({
  title,
  company,
  period,
  employmentType,
  description,
  achievements,
  technologies,
  positions,
}: ExperienceCardProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-zinc-800 last:border-0 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
        <div>
          <h4 className="font-medium text-base sm:text-lg">{title}</h4>
          <div className="text-sm text-cyan-400">{company}</div>
        </div>
        <div className="text-xs text-zinc-400 self-start mt-1 sm:mt-0 sm:self-auto">
          {employmentType && !positions && `${employmentType} | ${period}`}
          {employmentType && positions && employmentType}
          {!employmentType && !positions && period}
        </div>
      </div>

      {positions && positions.length > 1 && (
        <div className="bg-zinc-800/30 rounded-lg p-3 space-y-3">
          <div className="flex items-center text-sm font-medium text-zinc-400 mb-2">
            <TrendingUp className="w-4 h-4 mr-2 text-cyan-400" />
            Career Progression
          </div>
          {positions.map((position, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                {index < positions.length - 1 && <div className="w-0.5 h-8 bg-zinc-600 mt-1"></div>}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h5 className="text-sm font-medium">{position.title}</h5>
                  <span className="text-xs text-zinc-400">
                    {position.employmentType ? `${position.employmentType} | ${position.period}` : position.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-1">{position.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-zinc-300">{description}</p>

      <div className="space-y-3">
        <h5 className="text-sm font-medium text-zinc-400">Key Achievements</h5>
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex text-sm text-zinc-300">
              <CheckCircle2 className="w-4 h-4 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-sm font-medium text-zinc-400 mb-2">Technologies & Skills</h5>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-zinc-800/50 hover:bg-zinc-800">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
