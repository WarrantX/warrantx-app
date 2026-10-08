"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
const Badge = ({ children, className, variant = 'slate', ...props }) => {
    const variants = {
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        slate: 'bg-slate-800 text-slate-300 border-slate-700',
    };
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', variants[variant], className)), ...props, children: children }));
};
exports.Badge = Badge;
