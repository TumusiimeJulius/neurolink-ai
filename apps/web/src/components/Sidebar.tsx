import {
Home,
Brain,
BookOpen,
BarChart,
Target
} from "lucide-react";


function Sidebar(){

return (

<div className="w-64 min-h-screen bg-white shadow p-6">


<h2 className="text-2xl font-bold mb-10">
NeuroLink
</h2>


<div className="space-y-6">


<div className="flex gap-3">
<Home/>
Dashboard
</div>


<div className="flex gap-3">
<Brain/>
Learning Twin
</div>


<div className="flex gap-3">
<BookOpen/>
Courses
</div>


<div className="flex gap-3">
<BarChart/>
Analytics
</div>


<div className="flex gap-3">
<Target/>
Goals
</div>


</div>


</div>

)

}


export default Sidebar;