import appTheme from "@/theme";

export interface TextRevolvingEffectProps {
    textArray: string[];
    interval?: number;
    className?: string;
    fontSize?: string;
    fontWeight?: 'text-xl' | 'text-2xl' | 'text-lg';
    fontColor?: keyof typeof appTheme.colors;
}