"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, FileJson, LayoutList } from "lucide-react";

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [jsonMode, setJsonMode] = useState(false);

  // Ambil data saat load
  useEffect(() => {
    fetch('/api/faq').then(res => res.json()).then(data => setFaqs(data || []));
  }, []);

  const saveToDb = async (data: any) => {
    await fetch('/api/faq', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    alert("FAQ Updated Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-serif italic">Manage FAQ</h1>
        <button 
          onClick={() => setJsonMode(!jsonMode)}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl"
        >
          {jsonMode ? <LayoutList className="w-4 h-4" /> : <FileJson className="w-4 h-4" />}
          {jsonMode ? "Visual Mode" : "JSON Mode (Copy-Paste)"}
        </button>
      </div>

      {jsonMode ? (
        <div className="space-y-4">
          <textarea 
            className="w-full h-[500px] p-6 font-mono text-sm bg-slate-900 text-emerald-400 rounded-3xl outline-none border-4 border-slate-800"
            value={JSON.stringify(faqs, null, 2)}
            onChange={(e) => {
              try { setFaqs(JSON.parse(e.target.value)); } catch (err) { }
            }}
          />
          <button onClick={() => saveToDb(faqs)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20">
            Save JSON Changes
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="group p-6 bg-slate-50 rounded-2xl space-y-4 relative">
              <input 
                className="w-full bg-transparent font-bold text-slate-900 outline-none border-b border-slate-200 focus:border-blue-500 pb-2"
                value={faq.q}
                placeholder="Question"
                onChange={(e) => {
                  const newFaqs = [...faqs];
                  newFaqs[i].q = e.target.value;
                  setFaqs(newFaqs);
                }}
              />
              <textarea 
                className="w-full bg-transparent text-slate-500 text-sm outline-none resize-none"
                value={faq.a}
                placeholder="Answer"
                rows={3}
                onChange={(e) => {
                  const newFaqs = [...faqs];
                  newFaqs[i].a = e.target.value;
                  setFaqs(newFaqs);
                }}
              />
              <button onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-300 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={() => setFaqs([...faqs, { q: "", a: "" }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:bg-slate-50 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Question
          </button>
          <button onClick={() => saveToDb(faqs)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-xl">
            Update FAQ Live
          </button>
        </div>
      )}
    </div>
  );
}