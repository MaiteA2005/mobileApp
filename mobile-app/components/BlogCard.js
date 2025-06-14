import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BlogCard = ({ title, summary, body, date, image }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      <Text style={styles.summary}>{summary}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("BlogDetails", {
            title,
            date,
            body,
            summary,
            image,
          })
        }
      >
        <Text style={styles.buttonText}>Lees meer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },

  summary: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },

  button: {
    marginTop: 5,
    padding: 12,
    borderRadius: 8,
    width: "75%",
    backgroundColor: "lightblue",
    alignSelf: "center",
  },

  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
},
});

export default BlogCard;
