import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Text, Image, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const user = {
	id: "u1",
	username: "VadimNotJustDev",
	name: "Vadim",
	image:
		"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
};

export default function NewTweet() {
	const [text, setText] = useState("")
	const router = useRouter()

	const onTweetPress = () => {
		console.warn("Posting the tweet: ", text)
		setText('')
		router.back()
	}

	return (
		<SafeAreaView mode="padding" style={styles.container}>
			<View style={styles.buttonContainer}>
			<Link style={{fontSize: 20}} href="../">Cancel</Link>
			<Pressable onPress={onTweetPress} style={styles.button}><Text style={styles.buttonText}>Tweet</Text></Pressable>
			</View>
			<View style={styles.inputContainer}>
			<Image src={user.image} style={styles.image}/>
			<TextInput value={text} onChangeText={setText} placeholder="What's happening?" multiline={true} numberOfLines={5} style={{flex: 1}}/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		backgroundColor: "white",
		flex: 1
	},
	buttonContainer: {
		flexDirection: "row",
		marginVertical: 10,
		justifyContent: "space-between",
		alignItems: "center"
	},
	button: {
		backgroundColor: "#1C9BF0",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 50
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	inputContainer: {
		flexDirection: "row",

	},
	image: {
		width: 50,
		aspectRatio: 1,
		borderRadius: 50,
		marginRight: 10
	}
});
