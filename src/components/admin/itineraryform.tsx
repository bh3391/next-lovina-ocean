"use client";

import { useState } from "react";
import { Plus, Trash2, Clock } from "lucide-react";

export default function ItineraryForm() {
  const [steps, setSteps] = useState([{ time: "", activity: "" }]);

  const addStep = () => setSteps([...steps, { time: "", activity: "" }]);
  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Itinerary (Schedule)</label>
        <button 
          type="button" 
          onClick={addStep}
          className="text-xs flex items-center space-x-1 text-blue-600 font-bold hover:underline"
        >
          <Plus className="w-3 h-3" />
          <span>Add Schedule</span>
        </button>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-3 group">
            <div className="relative flex-shrink-0 w-32">
              <input
                name="itinerary_time"
                type="text"
                placeholder="06:00 AM"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-sm"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
            </div>
            
            <div className="flex-1">
              <input
                name="itinerary_activity"
                type="text"
                placeholder="Dolphin watching starts..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            {steps.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeStep(index)}
                className="p-3 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Hidden input untuk menyimpan data JSON asli jika diperlukan, 
          tapi kita akan handle lewat FormData di Server Action */}
    </div>
  );
}