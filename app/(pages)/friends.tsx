import {
    Avatar, AvatarFallbackText,
    Button, ButtonText,
    Divider, HStack,
    Text, VStack,
} from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from 'expo-secure-store';
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import {Profile} from "@/app/interfaces/Profile";
import {FlatList, StyleSheet} from "react-native";
import {Link} from "expo-router";

export default function Friends(){
    const actualUser = Globals.actualUser

    const [friends, setFriends] = useState<Profile[]>([])


    const getFriendsFromAPI = () => {
        return axiosPrepared.get(Globals.baseUrl+actualUser.id+"/friends")
            .then((response) => {
               // console.log(response.data)
                setFriends(response.data)
            })
    }

    useEffect(() => {
        getFriendsFromAPI()
    }, []);

    return(
        <VStack>
            <HStack
                backgroundColor="white"
                p="$4"
            >
                <Link href="/tabs/(tabs)/profile" >
                    <FontAwesome size={25} name={'chevron-left'} color="#815e5b" />
                </Link>
                <Text size="md" color="#815e5b" pl="$6" bold={true}>My friends</Text>
            </HStack>

            <FlatList
                data={friends}
                renderItem={ ({item}:{item:Profile})=>
                    <VStack p="$4">
                        <HStack style={styles.jcBetween}>
                            <HStack>
                                <Avatar

                                    size="sm" borderRadius="$full" >
                                    <AvatarFallbackText>{item.username[0]}</AvatarFallbackText>
                                </Avatar>
                                <Text pl="$2">{item.username}</Text>
                            </HStack>
                            <Text>since : (mettre date)</Text>
                        </HStack>


                        <Divider my="$4"/>
                    </VStack> }
            />
        </VStack>
    )
}

const styles = StyleSheet.create({
    jcBetween:{
        justifyContent: "space-between"
    }
})
