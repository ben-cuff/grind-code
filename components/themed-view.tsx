import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { StyleSheet, View, ViewProps } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode;
  useGradient?: boolean;
}

export function ThemedView({ children, style, useGradient = true, ...props }: ThemedViewProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  if (useGradient) {
    return (
      <LinearGradient
        colors={colors.background}
        style={[style]}
        {...props}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: colors.background[0],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

export function ThemedCard({ children, style, useGradient = true, ...props }: ThemedViewProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );

  if (useGradient) {
    return (
      <LinearGradient
        colors={colors.card}
        style={styles.cardGradient}
      >
        {cardContent}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.cardGradient, { backgroundColor: colors.card[0] }]}>
      {cardContent}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginVertical: 8,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 12,
    marginVertical: 8,
  },
}); 