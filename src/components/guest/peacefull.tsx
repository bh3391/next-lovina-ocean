import { Anchor, Wind, Users, Waves } from "lucide-react";

export default function PeacefulSection() {
  const benefits = [
    {
      icon: <Wind className="w-8 h-8 text-blue-500" />,
      title: "Quiet & Peaceful",
      description: "We always try to find a quieter spot for the boat, not in a crowded place, to ensure a better experience."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Sustainable Viewing",
      description: "By keeping a distance from the crowds, we respect the dolphins' natural habitat and behavior."
    },
    {
      icon: <Anchor className="w-8 h-8 text-blue-500" />,
      title: "Expert Captains",
      description: "Our local captains know exactly where to go to avoid the main boat traffic."
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            A More Authentic Experience
          </h2>
          <p className="text-lg text-slate-600 italic">
            "We prioritize your comfort and the dolphins' peace. We don't just chase dolphins; we find the perfect moment for you."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-blue-100"
            >
              <div className="mb-4 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}