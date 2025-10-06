"use client"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface PieChartCompProps {
    totalStudents: number;
    totalInstructors: number;
  }
const PieChartComp: React.FC<PieChartCompProps> = ({ totalStudents, totalInstructors }) => {

    const data = [
        { name: 'Students', value: totalStudents, color: '#9333EA' },
        { name: 'Instructors', value: totalInstructors, color: '#F59E0B' },  
        
      ];
    return (
        <>
<div className="flex items-center justify-center w-full h-full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%" 
              cy="100%" 
              startAngle={180}
              endAngle={0}   
              innerRadius={70} 
              outerRadius={100}
              paddingAngle={2}
              cornerRadius={5} 
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            {/* Optional: Add text in the center if you want a label, but since your main text is below, we omit it. */}
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[200px] text-gray-400">Loading chart...</div>
      )}
    </div>
        </>
    )
}

export default PieChartComp;