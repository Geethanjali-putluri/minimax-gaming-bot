'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2, Search } from 'lucide-react';

export interface VivaQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
  keyTakeaway: string;
}

interface VivaAccordionProps {
  title?: string;
  subtitle?: string;
  questions: VivaQuestion[];
}

export function VivaAccordion({
  title = 'B.Tech Viva & Technical Oral Exam Questions',
  subtitle = 'Curated questions professors and examiners frequently ask regarding Minimax, Game Trees, and Adversarial Search.',
  questions,
}: VivaAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([questions[0]?.id || '']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-base sm:text-lg text-[#F8FAFC]">
              {title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{subtitle}</p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search viva questions..."
            className="w-full bg-[#080B18] border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
          />
        </div>
      </div>

      <div className="divide-y divide-slate-800/80 mt-2">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No viva questions match your search query.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isOpen = openIds.includes(q.id);
            return (
              <div key={q.id} className="py-3.5">
                <button
                  onClick={() => toggleOpen(q.id)}
                  className="w-full flex items-start justify-between text-left gap-4 focus:outline-none group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-mono text-cyan-400">Q{idx + 1}</span>
                      <span>·</span>
                      <span className="text-indigo-400 font-medium">{q.category}</span>
                    </div>
                    <span className="font-medium text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {q.question}
                    </span>
                  </div>
                  <div
                    className={`mt-1 p-1 rounded-md bg-slate-800/60 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 pl-2 sm:pl-4 border-l-2 border-indigo-500/40 space-y-2 text-xs leading-relaxed text-slate-300">
                    <p>{q.answer}</p>
                    <div className="mt-2 p-2.5 rounded-lg bg-[#0A0E1F] border border-indigo-950/60 text-cyan-300/90 flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-[11px]">
                        <strong>Viva Punchline:</strong> {q.keyTakeaway}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
