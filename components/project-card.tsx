"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  slug: string
  liveUrl?: string
  sourceUrl?: string
}

export function ProjectCard({ title, category, image, slug, liveUrl, sourceUrl }: ProjectCardProps) {
  return (
    <div className="block h-full group">
      <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden group-hover:border-cyan-500/50 transition-all h-full relative">
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
          </div>

          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <div className="text-xs text-cyan-400 mb-1">{category}</div>
            <h3 className="font-medium text-sm sm:text-base">{title}</h3>
          </div>
        </div>

        <Link href={`/projects/${slug}`} className="absolute inset-0 z-10" />
      </Card>
    </div>
  )
}
