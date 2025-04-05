import appTheme from "@/theme";

export interface CardProps {
    title: string;
    description: string;
    isShadow?: boolean;
    bgColor?: keyof typeof appTheme.colors;
    image?: string;
    textColor?: keyof typeof appTheme.colors;
    isCircle?: boolean;
}