"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PROGRAM_DATA } from "@/data/syllabus";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ViewMode = "executive" | "curriculum";

export default function SyllabusPage() {
  const t = useTranslations("syllabus");
  const [activeView, setActiveView] = useState<ViewMode>("executive");

  const views: Record<ViewMode, { label: string; visible: string[] }> = {
    executive: {
      label: t("views.executive"),
      visible: ["core", "portfolio", "tools", "narrative", "google"],
    },
    curriculum: {
      label: t("views.curriculum"),
      visible: ["core", "pedagogy", "ai", "materials", "google"],
    },
  };

  const getSprintForWeek = (weekId: number) => {
    return PROGRAM_DATA.sprints.find((s) => s.weeks.includes(weekId));
  };

  const visibleCols = views[activeView].visible;

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/approach"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t("back")}</span>
          </Link>
          <div className="font-semibold text-lg tracking-tight">
            {PROGRAM_DATA.program.name}
          </div>
          <div className="flex bg-gray-100 p-1 rounded-full">
            {(Object.keys(views) as ViewMode[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                  activeView === key
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {views[key].label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="pt-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>

        {/* TABLE WRAPPER */}
        <div className="overflow-x-auto pb-8 rounded-xl border border-gray-200 shadow-sm bg-white">
          <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-950 text-white">
                <th className="p-3 w-48 sticky left-0 z-10 bg-gray-950 border-r border-gray-800">
                  {t("table.category")}
                </th>
                {PROGRAM_DATA.weeks.map((w) => (
                  <th
                    key={w.id}
                    className="p-3 text-center min-w-[160px] border-r border-gray-800"
                  >
                    <div className="font-bold">Week {w.id}</div>
                    <div className="text-[10px] text-gray-300 font-normal">
                      {w.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleCols.includes("core") && (
                <>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-3 font-semibold sticky left-0 z-10 bg-gray-50 border-r border-gray-200">
                      {t("table.sprint")}
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => {
                      const sp = getSprintForWeek(w.id);
                      return (
                        <td
                          key={w.id}
                          className="p-3 text-center border-r border-gray-200 align-top"
                        >
                          <div
                            className="font-bold text-xs"
                            style={{ color: sp?.color }}
                          >
                            Sprint {sp?.id}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {sp?.name}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  
                  <tr className="border-b border-gray-100">
                     <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-white border-r border-gray-100">
                      {t("table.hours")}
                    </td>
                    {PROGRAM_DATA.weeks.map((w, i) => (
                      <td key={w.id} className="p-3 text-center border-r border-gray-100 align-top">
                        <div className="font-bold text-xs">2+2+2=6</div>
                        <div className="text-[10px] text-gray-400">Tot: {(i + 1) * 6}</div>
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-blue-50/50 border-b border-gray-100">
                    <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-blue-50/50 border-r border-gray-100">
                      {t("table.s1")}
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-blue-700 font-medium text-xs border-r border-gray-100 align-top">
                        {w.sessions.s1.topic}
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-emerald-50/50 border-b border-gray-100">
                    <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-emerald-50/50 border-r border-gray-100">
                      {t("table.s2")}
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-emerald-700 font-medium text-xs border-r border-gray-100 align-top">
                        {w.sessions.s2.topic}
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-blue-50/50 border-b border-gray-200">
                    <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-blue-50/50 border-r border-gray-200">
                      {t("table.s3")}
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-blue-700 font-medium text-xs border-r border-gray-200 align-top">
                        {w.sessions.s3.topic}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {visibleCols.includes("portfolio") && (
                <>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <td
                      colSpan={PROGRAM_DATA.weeks.length + 1}
                      className="p-2 px-4 font-bold text-xs sticky left-0 z-10"
                    >
                      {t("table.portfolio").toUpperCase()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                     <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-white border-r border-gray-100">
                      {t("table.portfolio")}
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-emerald-600 font-semibold text-xs border-r border-gray-100 align-top">
                        {w.portfolio.artifact}
                      </td>
                    ))}
                  </tr>
                   <tr className="border-b border-gray-100">
                     <td className="p-3 text-xs text-gray-500 sticky left-0 z-10 bg-white border-r border-gray-100">
                      Base (70%)
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-[11px] border-r border-gray-100 align-top">
                        {w.portfolio.base}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {visibleCols.includes("tools") && (
                <>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <td
                      colSpan={PROGRAM_DATA.weeks.length + 1}
                      className="p-2 px-4 font-bold text-xs sticky left-0 z-10"
                    >
                      {t("table.tools").toUpperCase()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                     <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-white border-r border-gray-100">
                      SQL/Python/Viz
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-xs border-r border-gray-100 align-top">
                        {w.tools.join(", ")}
                      </td>
                    ))}
                  </tr>
                </>
              )}
              
               {visibleCols.includes("narrative") && (
                <>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <td
                      colSpan={PROGRAM_DATA.weeks.length + 1}
                      className="p-2 px-4 font-bold text-xs sticky left-0 z-10"
                    >
                      {t("table.narrative").toUpperCase()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                     <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-white border-r border-gray-100">
                      Story Arc
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => (
                      <td key={w.id} className="p-3 text-center text-xs italic text-gray-600 border-r border-gray-100 align-top">
                        &quot;{w.characterQuote}&quot;
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {visibleCols.includes("google") && (
                <>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <td
                      colSpan={PROGRAM_DATA.weeks.length + 1}
                      className="p-2 px-4 font-bold text-xs sticky left-0 z-10 text-blue-800"
                    >
                      {t("table.google").toUpperCase()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                     <td className="p-3 font-semibold text-xs sticky left-0 z-10 bg-white border-r border-gray-100">
                      Focus
                    </td>
                    {PROGRAM_DATA.weeks.map((w) => {
                      const ge = PROGRAM_DATA.googleEStudy.find(g => g.weekId === w.id);
                      return (
                      <td key={w.id} className="p-3 text-center text-[10px] border-r border-gray-100 align-top">
                        {ge ? (
                          <>
                            <div className="font-bold text-blue-600">{ge.course}</div>
                            <div className="font-medium">{ge.title}</div>
                            <div className="text-gray-500 mt-1">{ge.focus}</div>
                          </>
                        ) : "-"}
                      </td>
                    )})}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
