import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

import {
  Box,Button, ButtonText,
  HStack, ScrollView, Text
} from "@gluestack-ui/themed";
import {StyleSheet} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

import { Link } from "expo-router";


export default function Home() {
  return (
      <Box style={styles.container}>
        <LinearGradient
            colors={['#F2BB05', 'transparent']}
            style={styles.background}
        />
        <Text size={"3xl"} bold={true} color="black">Welcome </Text>
        <Box>

          <Link href="/login">
            <Box
                bg="black"
                rounded="$full"
                alignItems="center"
                py="$2"
                px="$6"
                marginTop="$5"
                $base-flexDirection="column"
                $sm-flexDirection="ro"
                $md-flexDirection="flex-end"
            >
              <Text color="$white" fontWeight="$normal">
                Go to login
              </Text>
            </Box>
          </Link>

        </Box>

      </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 400,
  },
  button: {
    padding: 15,
    alignItems: 'center',
  }
});

