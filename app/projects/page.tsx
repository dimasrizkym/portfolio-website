"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects } from "@/lib/data"
import { AnimatedSection } from "@/components/animated-section"
import { PortfolioHeader } from "@/components/portfolio-header"

export default function ProjectsPage() {
  const allProjects = getAllProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Extract unique categories and technologies
  const categories = useMemo(() => {
    return Array.from(new Set(allProjects.map((project) => project.category)))
  }, [allProjects])

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    allProjects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [allProjects])

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === null || project.category === selectedCategory

      const matchesTechnologies =
        selectedTechnologies.length === 0 || selectedTechnologies.every((tech) => project.technologies.includes(tech))

      return matchesSearch && matchesCategory && matchesTechnologies
    })
  }, [allProjects, searchTerm, selectedCategory, selectedTechnologies])

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedTechnologies([])
  }

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== null || selectedTechnologies.length > 0

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      {/* Header */}
      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <AnimatedSection animation="fade-up">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">All Projects</h1>
            <p className="text-zinc-400 text-lg">Explore my complete portfolio of design and development work</p>
          </div>
        </AnimatedSection>

        {/* Search and Filter Controls */}
        <AnimatedSection animation="fade-up" delay={100}>
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="border-t border-zinc-700 pt-4 space-y-4">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 mb-2">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={
                          selectedCategory === null
                            ? "bg-cyan-500 text-black hover:bg-cyan-400"
                            : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        }
                      >
                        All
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={
                            selectedCategory === category
                              ? "bg-cyan-500 text-black hover:bg-cyan-400"
                              : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Technology Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTechnologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            selectedTechnologies.includes(tech)
                              ? "bg-cyan-500 text-black hover:bg-cyan-400"
                              : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                          }`}
                          onClick={() => toggleTechnology(tech)}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-700">
                  {selectedCategory && (
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                      Category: {selectedCategory}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                    </Badge>
                  )}
                  {selectedTechnologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-zinc-800 text-zinc-300">
                      {tech}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleTechnology(tech)} />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Results Count */}
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="mb-6">
            <p className="text-zinc-400">
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <AnimatedSection animation="fade-up" delay={300}>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map((project, index) => (
                <AnimatedSection key={project.id} animation="zoom-in" delay={100 * (index + 1)}>
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    image={project.thumbnailImage}
                    slug={project.slug}
                    liveUrl={project.liveUrl}
                    sourceUrl={project.githubUrl}
                  />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="text-zinc-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-zinc-300 mb-2">No projects found</h3>
                  <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                </div>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                >
                  Clear all filters
                </Button>
              </CardContent>
            </Card>
          )}
        </AnimatedSection>
      </div>
    </main>
  )
}
