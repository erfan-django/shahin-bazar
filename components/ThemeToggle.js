"use client";
import { useState } from "react";
import { Sun, Moon, Palette, X } from "lucide-react";
import { useTheme } from "@/lib/theme";

const presetColors = [
  "#059669", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b",
  "#ef4444", "#14b8a6", "#f97316", "#06b6d4", "#84cc16",
];

export default function ThemeToggle() {
  const { mode, accentColor, toggleMode, changeAccent } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <button
          onClick={toggleMode}
          className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          title={mode === "dark" ? "حالت روشن" : "حالت تاریک"}
        >
          {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          style={{ color: accentColor }}
          title="انتخاب تم رنگی"
        >
          {showPicker ? <X size={18} /> : <Palette size={18} />}
        </button>
        {showPicker && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 shadow-xl">
            <div className="grid grid-cols-5 gap-2 mb-3">
              {presetColors.map(color => (
                <button
                  key={color}
                  onClick={() => changeAccent(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${accentColor === color ? "border-white scale-110 ring-2 ring-[var(--accent-color)]" : "border-transparent"}`}
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={e => changeAccent(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0.5"
              />
              <span className="text-xs text-[var(--text-secondary)]">رنگ دلخواه</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
