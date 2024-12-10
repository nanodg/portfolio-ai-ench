import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
    Briefcase,
    GraduationCap,
    Award,
    Download,
    Printer,
    FileText,
    ChartPieIcon
} from 'lucide-react'
import SkillChart from './SkillChart'

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string[];
    technologies: string[];
}

interface Education {
    degree: string;
    school: string;
    year: string;
    description: string;
}

interface Certification {
    name: string;
    issuer: string;
    year: string;
    link?: string;
}

const experiences: Experience[] = [
    {
        title: "Senior Frontend Developer",
        company: "Tech Company",
        period: "2021 - Present",
        description: [
            "Led development of key features using React and TypeScript",
            "Improved application performance by 40%",
            "Mentored junior developers"
        ],
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
    },
    // Tambahkan pengalaman lainnya...
];

const education: Education[] = [
    {
        degree: "Bachelor of Computer Science",
        school: "University Name",
        year: "2017 - 2021",
        description: "Focused on Web Technologies and Software Engineering"
    },
    // Tambahkan pendidikan lainnya...
];

const certifications: Certification[] = [
    {
        name: "Advanced React Patterns",
        issuer: "Frontend Masters",
        year: "2023",
        link: "https://certification-link.com"
    },
    // Tambahkan sertifikasi lainnya...
];

const InteractiveResume = () => {
    const handleDownloadPDF = () => {
        // Implementasi download PDF
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <motion.section
            className="container pb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="print:shadow-none">
                <CardHeader className="print:hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle className="text-3xl">Resume</CardTitle>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownloadPDF}
                                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                            </button>
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md transition-colors"
                            >
                                <Printer className="w-4 h-4 mr-2" />
                                Print
                            </button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1px_1fr] gap-8">
                        {/* Left Column: Experience, Education, Certifications */}
                        <div className="space-y-8">
                            {/* Experience Section */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    Experience
                                </h3>
                                <div className="space-y-6">
                                    {experiences.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors"
                                        >
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                                            <h4 className="font-medium">{exp.title}</h4>
                                            <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                {exp.description.map((desc, i) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {exp.technologies.map((tech) => (
                                                    <Badge key={tech} variant="secondary" className="text-xs">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    Education
                                </h3>
                                <div className="space-y-4">
                                    {education.map((edu, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                                        >
                                            <h4 className="font-medium">{edu.degree}</h4>
                                            <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
                                            <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications Section */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Certifications
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {certifications.map((cert, index) => (
                                        <motion.a
                                            key={index}
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`p-4 rounded-lg border border-border hover:border-primary transition-colors ${cert.link ? 'cursor-pointer' : ''}`}
                                        >
                                            <h4 className="font-medium flex items-center gap-2">
                                                {cert.name}
                                                {cert.link && <FileText className="w-4 h-4" />}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="hidden md:block w-px bg-border h-full" />

                        {/* Right Column: Skill Chart */}
                        <div className="md:sticky md:top-24 h-fit space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <ChartPieIcon className="w-5 h-5" />
                                Skill Overview
                            </h3>
                            <div className="rounded-lg">
                                <div className="h-[450px]">
                                    <SkillChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.section>
    )
}

export default InteractiveResume 