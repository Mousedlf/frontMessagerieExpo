import {
    Text, VStack, FormControl,
    ButtonText, Button, InputField, Input, InputSlot, InputIcon, LinkText
} from "@gluestack-ui/themed";
import {useState} from "react";
import {Link, useRouter} from "expo-router";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import {Globals} from "@/app/common/globals";
import {EyeIcon, EyeOffIcon} from "lucide-react-native";
import axiosPrepared from "@/app/auth/interceptor";
import {StyleSheet} from 'react-native'


export default function login() {

    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useRouter()

    async function login() {
        const user = {username, password}
        await axios.post(Globals.baseUrl+'login_check', user)
            .then((response)=>{
                Globals.token = response.data.token
                //SecureStore.deleteItemAsync("token")
               // SecureStore.setItem("token", response.data.token)
            })
        await axiosPrepared.get(Globals.baseUrl+"profile/actual")
            .then((response:any)=>{
                Globals.actualUser ={
                    id: response.data.id,
                    username: response.data.username,
                    public: response.data.public
                }
            })
        navigation.replace('/tabs/(tabs)/private-conversations')
    }

    return (
        <>
            <FormControl p="$4" height="100%" style={style.jcCenter} >
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
                    <Button ml="auto" onPress={login} width="100%" mt='$5' backgroundColor="#F2BB05" >
                        <ButtonText color="black">Log in</ButtonText>
                    </Button>
                </VStack>
                <VStack mt='$10'>
                    <Text>No account yet?</Text>
                    <Link href="/register">
                        <LinkText>Register here</LinkText>
                    </Link>
                </VStack>
            </FormControl>

        </>



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
