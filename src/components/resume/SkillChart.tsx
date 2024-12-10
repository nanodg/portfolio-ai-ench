import { Chart } from "@/components/ui/chart"

interface SkillData {
    subject: string;
    current: number;
    fullMark: number;
}

const skillData: SkillData[] = [
    { subject: 'Frontend', current: 90, fullMark: 100 },
    { subject: 'Backend', current: 75, fullMark: 100 },
    { subject: 'Database', current: 70, fullMark: 100 },
    { subject: 'DevOps', current: 65, fullMark: 100 },
    { subject: 'UI/UX', current: 85, fullMark: 100 },
    { subject: 'Testing', current: 70, fullMark: 100 },
];

const SkillChart = () => {
    return (
        <div className="w-full">
            <Chart data={skillData} />
            <div className="grid grid-cols-3 gap-4 mt-4">
                {skillData.map((skill) => (
                    <div key={skill.subject} className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {skill.subject}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {skill.current}%
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillChart; 