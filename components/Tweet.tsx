import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TweetType } from "../types";
import IconButton from "./IconButton";
import { Link } from "expo-router";

type TweetProps = {
	tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
	return (
		<Link href={`/feed/tweet/${tweet.id}?filter=recent`} asChild>
			<Pressable style={styles.container}>
				<Image src={tweet.user.image} style={styles.userImage} />
				<View style={styles.mainContainer}>
					<View style={{ flexDirection: "row" }}>
						<Text style={styles.name}>{tweet.user.name}</Text>
						<Text style={styles.username}>{tweet.user.username} &bull; 2h</Text>
						<Entypo
							name="dots-three-horizontal"
							size={16}
							color="gray"
							style={{ marginLeft: "auto" }}
						/>
					</View>
					<Text style={styles.content}>{tweet.content}</Text>
					{tweet.image && <Image src={tweet.image} style={styles.image} />}
					<View style={styles.footer}>
						<IconButton icon="comment" text={tweet.numberOfComments} />
						<IconButton icon="retweet" text={tweet.numberOfRetweets} />
						<IconButton icon="chart" text={tweet.impressions || 0} />
						<IconButton icon="share-google" />
					</View>
				</View>
			</Pressable>
		</Link>
	);
};

export default Tweet;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "lightgrey",
		backgroundColor: "white",
	},
	userImage: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	mainContainer: {
		marginLeft: 10,
		flex: 1,
	},
	name: {
		fontWeight: "500",
	},
	username: {
		color: "gray",
		marginLeft: 5,
	},
	content: {
		lineHeight: 20,
		marginTop: 5,
	},
	image: {
		width: "100%",
		aspectRatio: 16 / 9,
		marginVertical: 10,
		borderRadius: 15,
	},
	footer: {
		flexDirection: "row",
		marginVertical: 5,
		justifyContent: "space-between",
	},
});
