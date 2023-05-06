import React from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import tweets from "../../../../assets/data/tweets";
import Tweet from "../../../../components/Tweet";

export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={tweets}
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
