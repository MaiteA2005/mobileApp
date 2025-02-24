import { StatusBar } from "expo-status-bar";
import React from "react";

import{ View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({navigation}) => {
    return(
        <View style={{backgroundColor: "white"}}>
            <Text style={styles.text}>Lego</Text>

            <TouchableOpacity style={styles.button}  
                onPress={() => navigation.navigate('Details')}>
                <Text>Go to Product Details</Text>
            </TouchableOpacity>

            <ScrollView>
                <View>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
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
});

export default HomeScreen;