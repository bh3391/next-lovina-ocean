"use client";
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Star, FileJson, LayoutGrid } from "lucide-react";

export default function AdminTestimonials() {
  const [reviews, setReviews] = useState<{ name: string; country: string; text: string; stars: number }[]>([]);
  const [jsonMode, setJsonMode] = useState(false);

  useEffect(() => {
    fetch('/api/testimonials').then(res => res.json()).then(data => setReviews(data || []));
  }, []);

  const saveToDb = async (data: any) => {
    await fetch('/api/testimonials', { method: 'POST', body: JSON.stringify(data) });
    alert("Testimonials Updated!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif italic text-slate-900">Guest Reviews</h1>
          <p className="text-slate-500 text-sm">Curate your best Google Maps reviews here.</p>
        </div>
        <button 
          onClick={() => setJsonMode(!jsonMode)}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition-all"
        >
          {jsonMode ? <LayoutGrid className="w-4 h-4" /> : <FileJson className="w-4 h-4" />}
          {jsonMode ? "Grid View" : "JSON Mode"}
        </button>
      </div>

      {jsonMode ? (
        <textarea 
          className="w-full h-[500px] p-8 font-mono text-xs bg-slate-900 text-blue-400 rounded-[2rem] border-none outline-none ring-8 ring-slate-100"
          value={JSON.stringify(reviews, null, 2)}
          onChange={(e) => { try { setReviews(JSON.parse(e.target.value)); } catch (err) {} }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-3 h-3 ${idx < rev.stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                ))}
              </div>
              <textarea 
                className="w-full bg-transparent text-slate-600 italic text-sm mb-4 resize-none outline-none"
                value={rev.text}
                rows={3}
                onChange={(e) => {
                  const newRev = [...reviews];
                  newRev[i].text = e.target.value;
                  setReviews(newRev);
                }}
              />
              <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                <div className="flex-1 space-y-1">
                  <input 
                    className="w-full font-bold text-slate-900 text-sm outline-none bg-transparent"
                    value={rev.name}
                    onChange={(e) => {
                      const newRev = [...reviews];
                      newRev[i].name = e.target.value;
                      setReviews(newRev);
                    }}
                  />
                  <input 
                    className="w-full text-xs text-blue-500 outline-none bg-transparent font-medium"
                    value={rev.country}
                    onChange={(e) => {
                      const newRev = [...reviews];
                      newRev[i].country = e.target.value;
                      setReviews(newRev);
                    }}
                  />
                </div>
                <select 
                  className="bg-slate-50 rounded-lg text-xs p-1 outline-none"
                  value={rev.stars}
                  onChange={(e) => {
                    const newRev = [...reviews];
                    newRev[i].stars = parseInt(e.target.value);
                    setReviews(newRev);
                  }}
                >
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <button 
                onClick={() => setReviews(reviews.filter((_, idx) => idx !== i))}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button 
            onClick={() => setReviews([...reviews, { name: "Guest Name", country: "Country", text: "Amazing experience...", stars: 5 }])}
            className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-500 transition-all"
          >
            <Plus className="w-6 h-6 mb-2" />
            <span className="font-bold text-sm">Add New Review</span>
          </button>
        </div>
      )}

      <div className="fixed bottom-8 right-8 left-8 md:left-auto md:w-72 z-50">
        <button 
          onClick={() => saveToDb(reviews)}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
        >
          <Save className="w-5 h-5" /> Save All Changes
        </button>
      </div>
    </div>
  );
}