import {
    Avatar, AvatarFallbackText, AvatarImage,
    Box,
    Button, ButtonText, Card,
    Divider, Heading, HStack,
    Text, VStack,
} from "@gluestack-ui/themed";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import React, {useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import {PrivConv} from "@/app/interfaces/PrivConv";
import {Link, router} from "expo-router";

export default function PrivateConversations(){
    if (!Globals.isLoggedIn()){
        router.push("/login")
    }


    let token = Globals.token
    const actualUser = Globals.actualUser

    const [privateConvs, setPrivateConvs] = useState<PrivConv[]>([])
    const getPrivateConversations =  async () => {
        return await axiosPrepared.get(Globals.baseUrl+"private/conversations/"+actualUser.id)
            .then((response) => {
                setPrivateConvs(response.data)
            })
    }


   getPrivateConversations()

    return(
        <Box mt="$1">
            <FlatList
                data={privateConvs}
                renderItem={({item}:{item:PrivConv}) => (

                    <VStack>
                        <HStack py='$4' px='$2' style={style.center}>

                            <Avatar
                                size="md"
                                bgColor='#F2BB05'
                                borderRadius="$full" >

                                <AvatarFallbackText>X</AvatarFallbackText>
                            </Avatar>

                            <Box px="$4">
                                <Link
                                    href={{
                                        pathname: "/private/[privateId]",
                                        params: { privateId: item.id }
                                    }}>

                                    <HStack>
                                        <VStack >
                                            {item.participantA.username == actualUser.username ? <Text color="black" size="lg" bold={true}>{item.participantB.username}</Text> : <Text color="black" size="lg" bold={true}>{item.participantA.username}</Text>}

                                        </VStack>

                                    </HStack>
                                </Link>
                            </Box>
                        </HStack>
                    </VStack>

                )}
            />
        </Box>
    )
}

const style = StyleSheet.create({
    center: {
        alignItems: "center",
    },

})
