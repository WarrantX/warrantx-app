"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDescription = exports.CardTitle = exports.CardHeader = exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
const Card = ({ className, children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)('bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl backdrop-blur-md', className)), ...props, children: children }));
};
exports.Card = Card;
const CardHeader = ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)('flex flex-col space-y-1.5 pb-4 border-b border-slate-800/80 mb-4', className)), ...props, children: children }));
exports.CardHeader = CardHeader;
const CardTitle = ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("h3", { className: (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)('text-lg font-semibold text-slate-100 tracking-tight', className)), ...props, children: children }));
exports.CardTitle = CardTitle;
const CardDescription = ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("p", { className: (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)('text-xs text-slate-400', className)), ...props, children: children }));
exports.CardDescription = CardDescription;
