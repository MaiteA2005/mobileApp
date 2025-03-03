import { StatusBar } from "expo-status-bar";
import React from "react";
import{ View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({route}) => {
    const { title, price, image, description } = route.params;
    const [quantity, setQuantity] = React.useState(1); //Gebruik een state voor het productaantal

    const increaseQuantity = () => setQuantity(quantity + 1); //verhoog het aantal
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); //verlaag het aantal, maar niet lager dan 1
        }
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
        width: 340,
        height: 340,
        borderRadius: 8,
        marginTop: 16,
    },
    price: {
        fontSize: 18,
        color: "black",
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: "grey",
        marginTop: 8,
        textAlign: "center",
    },
    quantityContainer: {
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center",
    },
    button: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "lightblue",
    },
    buttonText: {
        fontSize: 18,
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 16,
    },

})

export default HomeScreen;