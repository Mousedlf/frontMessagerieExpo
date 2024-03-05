import { Link, Stack } from "expo-router";

import { Text, Center } from "@gluestack-ui/themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Center flex={1}>
        <Text color="black">This screen doesn't exist.</Text>

        <Link href="/" style={{ marginTop: 10 }}>
          <Text color="black">Go to home screen!</Text>
        </Link>
      </Center>
    </>
  );
}
