import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ProductCard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
           <Image
            source={require("../images/roze_boeket.png")}
            style={styles.image}
            />
            <Text style={styles.title}>Lego bloemen</Text>
            <Text style={styles.price}>€59,99</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Details")}    
            >
                <Text>Bekijk product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        width: "90%",
        height: 300,
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
        width: "50%",
        backgroundColor: "lightblue",
        alignSelf: "center",
        alignItems: "center",
        color: "black",
        fontWeight: "bold",
    },
});

export default ProductCard;