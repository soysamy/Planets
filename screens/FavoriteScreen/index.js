import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlanetCard from "../../components/PlanetCard";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavs}>No favorite planets yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlanetCard planet={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 10 },
  noFavs: { color: "#fff", textAlign: "center", marginTop: 20 },
});

export default FavoritesScreen;