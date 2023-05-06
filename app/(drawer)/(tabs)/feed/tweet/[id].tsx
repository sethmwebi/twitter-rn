import React from "react";
import { Text } from "react-native"
import { useSearchParams } from "expo-router";
import tweets from "../../../../../assets/data/tweets"
import Tweet from "../../../../../components/Tweet"

export default function TweetScreen() {
	const {id} = useSearchParams()
	const tweet = tweets.find(t => t.id === id)

	if(!tweet){
		return <Text>Tweet {id} not found!</Text>
	}
	return <Tweet tweet={tweet}/>
}