import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";


function Home(){


return (

<div>


<Navbar/>


<Hero/>


<section className="grid md:grid-cols-3 gap-8 px-10 py-20">


<FeatureCard

title="Digital Learning Twin"

description="An AI model that understands your learning style, strengths and weaknesses."

/>



<FeatureCard

title="Adaptive AI Tutor"

description="Personalized explanations based on how your brain learns."

/>



<FeatureCard

title="Smart Analytics"

description="Track mastery, retention and learning progress."

/>


</section>



</div>


)

}


export default Home;