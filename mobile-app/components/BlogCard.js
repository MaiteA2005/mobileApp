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
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Blog")}>
            <Text style={styles.buttonText}>Lees meer</Text>
            </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
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
    padding: 7,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "lightblue",
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontWeight: "bold",
},
});

export default BlogCard;
