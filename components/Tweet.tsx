import { View, Text, Image, StyleSheet } from 'react-native'

const Tweet = ({ tweet }) => {
	return (
		<View style={styles.container}>
      <Image src={tweet.user.image} style={styles.userImage} />
      <View style={styles.mainContainer}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.content}>{tweet.content}</Text>
      </View>
    </View>
	)
}

export default Tweet

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgrey',
    backgroundColor: "white"
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1
  },
  name: {
    fontWeight: "500"
  },
  content: {
    lineHeight: 20,
    marginTop: 5 
  }
});