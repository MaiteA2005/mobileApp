import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import { Picker } from "@react-native-picker/picker";

const ComingSoon = ({ navigation }) => {
  const [comingSoonProducts, setComingSoonProducts] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/67aa14d7651e724602290060/products", {
      headers: {
        Authorization:
          "Bearer a7b12905dfb4afcc1438211f273928a7ad53ef901851a9f8da163dca75c7ad3f",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.items
          .map((item) => {
            const categoryId = item.product.fieldData.category[0];
            const isComingSoon = categoryId === "684583eddfe4e67d0e0c6bae";
            if (!isComingSoon) return null;

            return {
              id: item.product.id,
              title: item.product.fieldData.name,
              description: item.product.fieldData.description,
              price: (item.skus[0]?.fieldData.price.value || 0) / 100,
              image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
              category: "Coming soon",
            };
          })
          .filter(Boolean);
        setComingSoonProducts(filtered);
      })
      .catch(console.error);
  }, []);

  // Sorteer de producten op basis van de gekozen sorteeroptie
  const sortedProducts = [...comingSoonProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Coming Soon</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortOption}
          onValueChange={setSortOption}
          style={styles.picker}
        >
          <Picker.Item label="Prijs (laag - hoog)" value="price-asc" />
          <Picker.Item label="Prijs (hoog - laag)" value="price-desc" />
          <Picker.Item label="Naam (A - Z)" value="name-asc" />
          <Picker.Item label="Naam (Z - A)" value="name-desc" />
        </Picker>
      </View>

      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={`€ ${product.price.toFixed(2)}`}
          image={product.image}
          onPress={() => navigation.navigate("Details", product)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  pickerContainer: {
        borderRadius: 10,
        backgroundColor: "white",
        width: "85%",
        paddingHorizontal: 20,
        alignSelf: "center",
        marginTop: 10,
        borderWidth: 3,
        borderColor: "#FFEE90",
    },
  picker: {
    color: "black",
    fontWeight: "bold",
  },
});

export default ComingSoon;
