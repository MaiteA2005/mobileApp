import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const BlogDetails = ({ route }) => {
  const { title, body, summary, date, image } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      <Text style={styles.summary}>{summary}</Text>
      <Text style={styles.body}>{body}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  summary: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
  }
});

export default BlogDetails;