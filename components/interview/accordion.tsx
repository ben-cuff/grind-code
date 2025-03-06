import { useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function Accordion({
	title,
	children,
	titleStyle,
}: {
	title: string;
	children: React.ReactNode;
	titleStyle?: any;
}) {
	const [expanded, setExpanded] = useState(false);
	const [height] = useState(new Animated.Value(0));

	const toggleAccordion = () => {
		const initialValue = expanded ? 1 : 0;
		const finalValue = expanded ? 0 : 1;

		setExpanded(!expanded);

		height.setValue(initialValue);
		Animated.spring(height, {
			toValue: finalValue,
			useNativeDriver: false,
		}).start();
	};

	return (
		<View style={{ marginVertical: 10 }}>
			<Pressable onPress={toggleAccordion} style={styles.pressable}>
				<ThemedText style={titleStyle}>{title}</ThemedText>
				<ThemedText style={{ fontSize: 18 }}>
					{expanded ? "▲" : "▼"}
				</ThemedText>
			</Pressable>
			<Animated.View
				style={{ height: expanded ? "auto" : 0, overflow: "hidden" }}
			>
				{children}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	pressable: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
