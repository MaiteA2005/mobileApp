import { StatusBar } from "expo-status-bar";
import React from "react";
import{ View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useFavorieten } from "../context/FavorietenContext";

const ProductDetails = ({route, navigation}) => {
    const { id, title, price, image, description } = route.params;
    const [quantity, setQuantity] = React.useState(1); //Gebruik een state voor het productaantal
    const { addToFavorieten } = useFavorieten();


    const increaseQuantity = () => setQuantity(quantity + 1); //verhoog het aantal
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToFavorieten = () => {
    const product = {id,title,price,image,description};
        addToFavorieten(product);
        navigation.navigate("Favorieten");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>{title}</Text>
            <Image source={image} style={styles.image}/>
            <Text style={styles.price}>€{price}</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
                    <Text style={styles.buttonText}>-</Text>    
                </TouchableOpacity>

                <Text style={styles.quantity}>{quantity}</Text>

                <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.totalPrice}>Totaal: €{price*quantity}</Text>

            <TouchableOpacity style={styles.button} onPress={handleAddToFavorieten}>
                <Text style={styles.buttonText}>Voeg toe aan favorieten</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 16,
    },
    image: {
        width: "100%",
        height: 245,
        borderRadius: 8,
        alignSelf: "center",
    },
    price: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: "grey",
        marginTop: 8,
        textAlign: "left",
        lineHeight: 18,
    },
    quantityContainer: {
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center",
    },
    button: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: "lightblue",
    },
    buttonText: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 16,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
    },
})

export default ProductDetails;