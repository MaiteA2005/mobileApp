import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ProductCard = ({title, price, image, onPress}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Bekijk product</Text>
            </TouchableOpacity>
        </View>
    );

    
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        width: "85%",
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignSelf: "center",
        borderColor: "lightgrey",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        alignSelf: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
        textAlign: "center",
    },
    price: {
        fontSize: 14,
        color: "black",
        marginTop: 4,
        textAlign: "center",
    },
    button: {
        marginTop: 8,
        padding: 16,
        borderRadius: 8,
        width: "75%",
        backgroundColor: "lightblue",
        alignSelf: "center",
        alignItems: "center",
        color: "black",
        fontWeight: "bold",
    },
});


export default ProductCard;