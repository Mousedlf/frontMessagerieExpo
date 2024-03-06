import {useState} from "react";
import {Link, useRouter} from "expo-router";
import axios from "axios";
import {
  Button,
  ButtonText,
  FormControl,
  Input,
  InputField,
  InputIcon,
  InputSlot, LinkText,
  Text,
  VStack
} from "@gluestack-ui/themed";
import {EyeIcon, EyeOffIcon} from "lucide-react-native";
import {StyleSheet} from "react-native";


export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useRouter()

  async function register() {
    const user = {username, email, password}
    await axios.post("https://messenger.dlfcaroline.online/register", user)
        .then((response) => {
          console.log(response.data)
        })
    navigation.replace('/login')
  }


  return (
      <FormControl p="$4" height="100%" style={style.jcCenter}>
        <Text size="2xl" bold={true} mb="$20" style={style.center} color="black">waxwing</Text>

        <VStack space="xl">
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Username
            </Text>
            <Input>
              <InputField
                  value={username}
                  onChangeText={text => setUsername(text)}
                  type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input>
              <InputField
                  value={email}
                  onChangeText={text => setEmail(text)}
                  type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Password
            </Text>
            <Input>
              <InputField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChangeText={text => setPassword((text))}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                />
              </InputSlot>
            </Input>
          </VStack>
          <Button ml="auto" onPress={register}
                  width="100%" mt='$5' backgroundColor="#F2BB05">
            <ButtonText color="black">Register</ButtonText>
          </Button>
        </VStack>
        <VStack mt='$10'>
          <Text>Already have an account?</Text>
          <Link href="/login">
            <LinkText>Log in here</LinkText>
          </Link>
        </VStack>
      </FormControl>
  );
}


const style = StyleSheet.create({
  jcCenter: {
    justifyContent: "center"
  },
  center: {
    textAlign: "center"
  }
})

