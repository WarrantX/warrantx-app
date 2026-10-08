import React from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate';
}
export declare const Badge: React.FC<BadgeProps>;
