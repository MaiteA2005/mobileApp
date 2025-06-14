import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import BlogCard from "../components/BlogCard";
import { Picker } from "@react-native-picker/picker";


const BlogScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");


  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/collections/67bcc6b919fad6a7da1e82ee/items",
      {
        headers: {
          Authorization: "Bearer 78af9653947628e6ae4e4fe0ef388b5d441f56f5969bb3e676b78aa77309b689",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const blogItems = data.items.map((item) => ({
          id: item.id,
          title: item.fieldData.name,
          summary: item.fieldData["post-summery"],
          body: item.fieldData["post-body"],
          date: item.fieldData.date,
          image: item.fieldData["main-image"]?.url || null,
        }));
        const sortedItems = blogItems.sort((a, b) => {
          if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
          if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
          return 0;
        });

        setBlogs(sortedItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fout bij ophalen van blogs:", err);
        setLoading(false);
      });
  }, [sortOption]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Onze Blog</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortOption}
          onValueChange={(value) => setSortOption(value)}
          style={styles.picker}
        >
          <Picker.Item label="Nieuwste eerst" value="newest" />
          <Picker.Item label="Oudste eerst" value="oldest" />
        </Picker>
      </View>

      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          summary={blog.summary}
          body={blog.body}
          date={blog.date}
          image={blog.image}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
        padding: 16,
        marginBottom: 16,
        width: "85%",
        alignSelf: "center",
        backgroundColor: "lightblue",
        borderRadius: 8,
        alignItems: "center",
    },  
    pickerContainer: {
        borderRadius: 10,
        backgroundColor: "white",
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        borderWidth: 3,
        borderColor: "#FFEE90",
        marginBottom: 16,
    }
});

export default BlogScreen;
