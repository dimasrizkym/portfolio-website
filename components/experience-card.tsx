import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface Position {
  title: string;
  period: string;
  employmentType?: string;
  description: string[];
}

interface ExperienceCardProps {
  company: string;
  technologies: string[];
  positions: Position[];
}

export function ExperienceCard({
  company,
  technologies,
  positions,
}: ExperienceCardProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-zinc-800 last:border-0 last:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
        <div>
          <h4 className="font-medium text-base sm:text-lg">
            {positions[0]?.title}
          </h4>
          <div className="text-sm text-cyan-400">{company}</div>
        </div>
        <div className="text-xs text-zinc-400 self-start mt-1 sm:mt-0 sm:self-auto">
          {positions.length === 1 &&
            positions[0]?.employmentType + " | " + positions[0]?.period}
        </div>
      </div>

      {/* Timeline / single position */}
      <div className="px-3 flex flex-col gap-y-4">
        {positions.map((position, index) => (
          <div key={index} className="flex  space-x-3">
            {/* Timeline dot */}
            {positions.length > 1 && (
              <div className="flex flex-col items-center pt-1.5 min-h-full">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                {index < positions.length - 1 && (
                  <div className="w-0.5 h-full bg-zinc-600 mt-1"></div>
                )}
              </div>
            )}

            <div className="flex-1 gap-8">
              {positions.length > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                  <h5 className="text-sm font-medium">{position.title}</h5>
                  <span className="text-xs text-zinc-400">
                    {position.employmentType
                      ? `${position.employmentType} | ${position.period}`
                      : position.period}
                  </span>
                </div>
              )}

              {/* Deskripsi posisi sebagai bullet points */}
              {position.description && position.description.length > 0 && (
                <ul className="space-y-2">
                  {position.description.map((point, idx) => (
                    <li key={idx} className="flex text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tech/skills */}
      {technologies.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-zinc-400 mb-2">
            Technologies & Skills
          </h5>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-zinc-800/50 hover:bg-zinc-800"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
