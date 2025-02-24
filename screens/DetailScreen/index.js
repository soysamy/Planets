import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route }) => {
  const { planet } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    reloadFavorites();
  }
  , [planet]); // we need to reload the favorites string when the planet changes

  // This is for reloading the favorites string
  const reloadFavorites = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem("favorites"));
    isFav = favorites.some((p) => p.name === planet.name);
    setIsFavorite(isFav);
  };

  // This is for toggling favorite or not
  const toggleFavorite = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((p) => p.name !== planet.name);
    } else {
      favorites.push(planet);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: planet.image }}
        style={styles.image}
      />
      <Text style={styles.name}>{planet.name}</Text>
      <Text style={styles.details}>Mass: {planet.mass || "N/A"}</Text>
      <Text style={styles.details}>Gravity: {planet.gravity || "N/A"}</Text>
      <Text style={styles.details}>Density: {planet.density || "N/A"}</Text>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111", padding: 20 },
  image: { width: 150, height: 150, borderRadius: 75, marginBottom: 10 },
  name: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 10 },
  details: { color: "#ccc", marginBottom: 10 },
});

export default DetailScreen;