import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";

import{ View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";

/*import rozeBoeketImage from "../assets/roze_boeket.png";
import ferrariImage from "../assets/ferrari.png";  
import groteGolfImage from "../assets/grote_golf.png";
import tempelImage from "../assets/tempel.png";*/


const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://api.webflow.com/v2/sites/67aa14d7651e724602290060/products",
        {
            headers: {
                Authorization:
                "Bearer dc83da7dc800b47a6e0e20d7098cfe07cfa7a683ae9a91aea8a18125d3aaf13a",
            }
        })

        .then((res) => res.json())
        .then((data) => 
            setProducts(
                data.items.map((item) => ({
                    id: item.product.id,
                    title: item.product.fieldData.name,
                    description: item.product.fieldData.description,
                    price: (item.skus[0]?.fieldData.price.value || 0)/100,
                    image: {uri: item.skus[0]?.fieldData["main.image"]?.url},
                }))
            )
        )
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Lego</Text>

            <ScrollView style={styles.cardContainer}>
                {products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        onPress={() => navigation.navigate("Details", product)}
                    />
                ))}
            </ScrollView>
            <StatusBar style="auto" /> 
        </View>
    );
};

    


    /*return (
        <View style={styles.container}>
            <Text style={styles.heading}>Lego</Text>
            
            <ScrollView contentContainerStyle={styles.cardContainer}>
                <ProductCard 
                    title="Roze boeket"
                    price="€ 59,99"
                    image={rozeBoeketImage}
                    onPress={() => navigation.navigate("Details", { 
                        title: "Roze boeket", 
                        price: "€ 59,99", 
                        image: rozeBoeketImage,
                        description: "Voed je creativiteit met het LEGO Botanicals Roze boeket kunstbloemen bouwpakket voor volwassenen. Deze LEGO bloemen decoratieset zit boordevol authentieke bloemen in prachtige kleuren die nooit zullen vervagen.",
                    })}
                />
                <ProductCard 
                    title="Ferrari SF-24"
                    price="€ 299,00"
                    image={ferrariImage}
                    onPress={() => navigation.navigate("Details", { 
                        title: "Ferrari SF-24", 
                        price: "€ 229,99", 
                        image: ferrariImage,
                        description: "Voel de spanning van het circuit en bouw je eigen F1 modelauto met deze LEGO® Technic Ferrari SF-24 F1 auto voor volwassenen. Deze set is een geweldige cadeautip voor autosportfans en biedt een boeiende bouwervaring waarin je stap voor stap de kenmerken van deze F1 modelauto op een schaal van 1:8 in elkaar zet.",
                    })}
                />
                <ProductCard 
                    title="De grote golf"
                    price="€ 99,99"
                    image={groteGolfImage}
                    onPress={() => navigation.navigate("Details", { 
                        title: "De grote golf", 
                        price: "€ 99,99", 
                        image: groteGolfImage,
                        description: "Liefhebbers van kunst en beroemde schilderijen zullen helemaal weg zijn van dit LEGO Art knutselpakket voor volwassenen. Met deze LEGO replica bouw je één van 's werelds bekendste kunstwerken na: Hokusai's De grote golf. Geniet, kom volledig tot rust en dompel je onder in een creatieve activiteit.",
                    })}
                />
                <ProductCard 
                    title="Kasteel Himeji"
                    price="€ 159,99"
                    image={tempelImage}
                    onPress={() => navigation.navigate("Details", { 
                        title: "Kasteel Himeji", 
                        price: "€ 159,99", 
                        image: tempelImage,
                        description: "Breng een eerbetoon aan de majestueuze schoonheid van Kasteel Himeji in Japan met dit LEGO® Architecture displaymodel. Reis naar de stad Himeji zonder je huis te verlaten terwijl je authentieke details namaakt, zoals de torens van het kasteel, looppaden en asymmetrische muren in LEGO stijl. Haal de bovenkant eraf om de vereenvoudigde indeling te bekijken.",
                    })}
                />
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
};*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 16,
        textAlign: "center",
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
    cardContainer: {
        paddingBottom: 20, 
        flexGrow: 1,
    },
});

export default HomeScreen;