import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pokedex" }} />
      <Stack.Screen
        name="PokemonDetail"
        options={({ route }) => {
          const name =
            ((route.params as { name?: string } | undefined)?.name as
              | string
              | undefined) ?? "Pokemon";
          const title = name.charAt(0).toUpperCase() + name.slice(1);

          return {
            title,
            headerBackButtonDisplayMode: "minimal",
          };
        }}
      />
    </Stack>
  );
}
