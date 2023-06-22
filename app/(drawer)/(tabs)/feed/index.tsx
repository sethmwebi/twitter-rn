import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable, ActivityIndicator, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
// import tweets from "../../../../assets/data/tweets";
import Tweet from "../../../../components/Tweet";
import { listTweets } from "../../../../lib/api/tweets";
import { useQuery } from "@tanstack/react-query";

export default function FeedScreen() {
  const {data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets
  });

  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Tweet tweet={item} />}
      />
      <Pressable style={styles.floatingButton}>
        <Link href="/new-tweet">
          <Entypo name="plus" size={24} color="whitesmoke" />
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  floatingButton: {
    backgroundColor: "#1C9BF0",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
    bottom: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
});
