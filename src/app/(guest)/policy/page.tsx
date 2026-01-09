import React from 'react';
import { ShieldCheck, CalendarX, CloudRain, Waves, Info } from 'lucide-react';

export const metadata = {
  title: "Policies & Terms | Lovina Ocean Dolphin Tour",
  description: "Read our booking, cancellation, and weather policies to ensure a smooth dolphin watching experience in Lovina, Bali.",
};

export default function PolicyPage() {
  const sections = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Booking & Payment",
      content: [
        "Reservations can be made through our website via WhatsApp or direct contact.",
        "Payment is typically settled at the meeting point before the tour begins.",
        "We accept Cash (IDR) and Bank Transfers.",
        "For group bookings (10+ people), a 30% deposit may be required to secure the boats."
      ]
    },
    {
      icon: <CalendarX className="w-6 h-6 text-red-500" />,
      title: "Cancellation Policy",
      content: [
        "Free cancellation up to 24 hours before the scheduled departure time.",
        "Cancellations made less than 24 hours before the tour will incur a 50% cancellation fee.",
        "No-shows (failure to arrive at the meeting point on time) will be charged 100% of the tour price.",
        "Please notify us as soon as possible via WhatsApp if your plans change."
      ]
    },
    {
      icon: <CloudRain className="w-6 h-6 text-amber-500" />,
      title: "Weather & Safety",
      content: [
        "Your safety is our absolute priority. Our captains monitor sea conditions daily.",
        "If the weather or sea conditions are deemed unsafe (heavy rain, strong winds, or high waves), we reserve the right to cancel the tour.",
        "In case of weather-related cancellations, you can choose a full refund of any deposit paid or reschedule to another day."
      ]
    },
    {
      icon: <Waves className="w-6 h-6 text-cyan-500" />,
      title: "Wildlife Disclaimer",
      content: [
        "Dolphins are wild animals in their natural habitat. While our success rate is over 90%, sightings are not 100% guaranteed.",
        "We follow sustainable tourism practices: we do not feed, touch, or swim aggressively with the dolphins.",
        "No refunds are provided if dolphins are not spotted, as the cost covers boat operation, fuel, and captain services."
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className='w-full h-20 bg-slate-900'></div>
      <div className="bg-white border-b border-slate-200 pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Policies & Terms
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Please read our terms and conditions carefully to ensure you have the best experience with Lovina Ocean Dolphin Tour.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="text-blue-500 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-blue-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 p-4 rounded-full">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Have questions?</h3>
            <p className="opacity-90">
              If you're unsure about any of our policies, feel free to contact us via WhatsApp for clarification.
            </p>
          </div>
          <a 
            href="https://wa.me/6283115300070" 
            className="whitespace-nowrap bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}