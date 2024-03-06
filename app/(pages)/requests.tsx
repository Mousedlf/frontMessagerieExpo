
import {
    Box,
    Button, ButtonText,
    Divider, HStack,
    Text, VStack,
} from "@gluestack-ui/themed";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import {Request} from "@/app/interfaces/Request";
import {FlatList, StyleSheet} from "react-native";
import {Link} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Requests(){
    const [requests, setRequests] = useState<Request[]>([])
    const currentUser = Globals.actualUser

    const getRequestsFromAPI = () => {
        return  axiosPrepared.get(Globals.baseUrl+"friend/request/received/"+ currentUser.id)
            .then((response) => {
                setRequests(response.data)
                console.log((response.data))
            })
            .catch((error)=> console.log(error))
    }

    async function acceptRequest(id:number){
        console.log(Globals.baseUrl+"friend/request/accept/"+ id)
        return await axiosPrepared.post(Globals.baseUrl+"friend/accept/"+ id)
            .then((response) => {
                console.log('accepted')
            })
            .catch((error)=> console.log(error))
    }

    async function declineRequest(id:number){
        return axiosPrepared.post(Globals.baseUrl+"friend/decline/"+ id)
            .then((response) => {
                console.log('declined')
            })
            .catch((error)=> console.log(error))
    }

    useEffect(() => {
        getRequestsFromAPI()
    }, []);

    return(
        <VStack>

            <HStack
                backgroundColor="white"
                p="$4"
                mt="$6"
            >
                <Link href="/tabs/(tabs)/profile" >
                    <FontAwesome size={25} name={'chevron-left'} color="black" />
                </Link>
                <Text size="md" color="black" pl="$6" bold={true}>Friend Requests</Text>
            </HStack>

            <FlatList
                data={requests}
                renderItem={ ({item}:{item:Request})=>
                    <VStack p="$3">
                        <HStack style={styles.jcBetween}>
                            <Text>{item.ofProfile.username}</Text>
                            <HStack>
                                <Button
                                    onPress={()=>{acceptRequest(item.id)}}
                                    backgroundColor="#f2bb05">
                                    <ButtonText color="black">
                                        Accept
                                    </ButtonText>
                                </Button>
                                <Button
                                    variant="outline"
                                    ml="$1"
                                    borderColor="#f2dD05"
                                    onPress={()=>{declineRequest(item.id)}}>
                                    <ButtonText color="black">
                                        Decline
                                    </ButtonText>
                                </Button>
                            </HStack>


                        </HStack>
                        <Divider my="$4"/>
                    </VStack>

            }
            />
        </VStack>
    )
}

const styles = StyleSheet.create({
    jcBetween: {
        justifyContent: "space-between"
    }
})
