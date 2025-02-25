import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { Text, TextProps } from "react-native";

interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
}

export function ThemedText({ children, style, ...props }: ThemedTextProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  return (
    <Text
      style={[
        {
          color: colors.text,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
} 