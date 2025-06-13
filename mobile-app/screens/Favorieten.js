import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useFavorieten } from "../context/FavorietenContext";
import ProductCard from "../components/ProductCard";

const Favorieten = ({ navigation }) => {
  const { favorieten, removeFromFavorieten } = useFavorieten();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Favorieten</Text>
      {favorieten.length === 0 ? (
        <Text style={styles.empty}>Je hebt nog geen favorieten toegevoegd.</Text>
      ) : (
        favorieten.map((product) => (
          <View key={product.id}>
            <ProductCard
              title={product.title}
              price={`€ ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}`}
              image={product.image}
              onPress={() => navigation.navigate("Details", product)}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromFavorieten(product.id)}
            >
              <Text style={styles.removeButtonText}>Verwijder uit favorieten</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Favorieten;
