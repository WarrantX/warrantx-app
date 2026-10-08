"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
const Button = ({ children, className, variant = 'primary', size = 'md', isLoading = false, disabled, ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
        primary: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold focus:ring-emerald-400 shadow-md shadow-emerald-500/20',
        secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 focus:ring-slate-500',
        outline: 'border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 focus:ring-emerald-400',
        danger: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-400 shadow-md shadow-rose-500/20',
        ghost: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 focus:ring-slate-500',
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };
    return ((0, jsx_runtime_1.jsx)("button", { className: (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(baseStyles, variants[variant], sizes[size], className)), disabled: disabled || isLoading, ...props, children: isLoading ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), (0, jsx_runtime_1.jsx)("span", { children: "Processing..." })] })) : (children) }));
};
exports.Button = Button;
