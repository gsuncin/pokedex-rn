import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router/build/hooks";
import { PokemonDetailInterface } from "./interfaces/Pokemon";

const PokemonDetail = () => {
  const [pokemonDetail, setPokemonDetail] =
    React.useState<PokemonDetailInterface | null>(null);
  const params = useLocalSearchParams();

  React.useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`${params?.url}`);
        const data = await response.json();
        setPokemonDetail(data);
      } catch (error) {
        console.error("Error fetching Pokémon detail:", error);
      }
    };

    fetchPokemonDetail();
  }, [params?.url]);
  return (
    <View style={styles.container}>
      {pokemonDetail?.sprites.front_default && (
        <Image
          source={{ uri: pokemonDetail.sprites.front_default }}
          style={styles.image}
        />
      )}

      <Text style={styles.name}>{pokemonDetail?.name}</Text>
      <Text style={styles.stat}>Height: {pokemonDetail?.height}</Text>
      <Text style={styles.stat}>Weight: {pokemonDetail?.weight}</Text>
      <Text style={styles.stat}>
        Types:{" "}
        {pokemonDetail?.types.map((typeInfo) => typeInfo.type.name).join(", ")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 15,
  },
  stat: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 8,
    textTransform: "capitalize",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default PokemonDetail;
