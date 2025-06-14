import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import{ View,TouchableOpacity, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import ProductCard from "../components/ProductCard";
import{ Picker } from "@react-native-picker/picker";
import { Button } from "react-native";


const categoryNames = {
    "": "Alle categorieën",
    "684583eddfe4e67d0e0c6bae" : "Coming soon",
    "67bf26428bf670e80d68204c" : "Architecture",
    "67bf2622b6220a4450d36f4a" : "Art",
    "67be10fde51ac973d6383736" : "Technic",
    "67be0f37081cbb88ba745c81" : "Botanicals",
}

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        fetch("https://api.webflow.com/v2/sites/67aa14d7651e724602290060/products", {
        headers: {
            Authorization:
            "Bearer a7b12905dfb4afcc1438211f273928a7ad53ef901851a9f8da163dca75c7ad3f",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            const filteredProducts = data.items
            .filter((item) => item.product.fieldData.category[0] !== "684583eddfe4e67d0e0c6bae") // exclude "Coming soon"
            .map((item) => ({
                id: item.product.id,
                title: item.product.fieldData.name,
                description: item.product.fieldData.description,
                price: (item.skus[0]?.fieldData.price.value || 0) / 100,
                image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
                category:
                categoryNames[item.product.fieldData.category[0]] || "Onbekend",
            }));

            setProducts(filteredProducts);
        })
        .catch(console.error);
    }, []);


    const filteredProducts = products.filter(
        (p) =>
        (selectedCategory === "" || p.category === selectedCategory) &&
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price; //prijs oplopend
        if (sortOption === "price-desc") return b.price - a.price; //prijs aflopend
        if (sortOption === "name-asc") return a.title.localeCompare(b.title); //naam oplopend
        if (sortOption === "name-desc") return b.title.localeCompare(a.title); //naam aflopend
    });

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Lego</Text>
            <TextInput
                    style={styles.searchInput}
                    placeholder="Zoek een set..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
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
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={setSelectedCategory}
                        style={styles.picker}
                    >
                        <Picker.Item label="Alle categorieën" value="" />
                        {[...new Set(products.map((p) => p.category))].map((category) => (
                            <Picker.Item key={category} label={category} value={category} />
                        ))}
                    </Picker>
                </View>
            
            <ScrollView style={styles.cardContainer}>
                {sortedProducts.map((product) => (
                    <ProductCard 
                        key={product.id}
                        title={product.title}
                        price={`€ ${product.price.toFixed(2)}`}
                        image={product.image}
                        onPress={() => navigation.navigate("Details", {
                            id: product.id,
                            title: product.title,
                            price: product.price.toFixed(2),
                            image: product.image,
                            description: product.description,
                        })}
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
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
    },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 10,
        fontSize: 16,
        color: "#000",
        width: "85%",
        alignSelf: "center",
        borderWidth: 3,
        borderColor: "lightblue",
        paddingLeft: 10,
    },
    pickerContainer: {
        borderRadius: 10,
        backgroundColor: "white",
        width: "85%",
        alignSelf: "center",
        marginTop: 10,
        borderWidth: 3,
        borderColor: "#FFEE90",
    },
    button: {
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        width: "85%",
        backgroundColor: "lightblue",
        alignSelf: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    cardContainer: {
        paddingBottom: 20, 
        flexGrow: 1,
    },
    topButtons: {
        marginTop: 10,
        marginBottom: 10,
    },

});

export default HomeScreen;