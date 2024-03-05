
import {
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
            })
            .catch((error)=> console.log(error))
    }

    const acceptRequest = async (id:number)=>{
        console.log(Globals.baseUrl+"friend/request/accept/"+ id)
        return await axiosPrepared.post(Globals.baseUrl+"friend/accept/"+ id)
            .then((response) => {
                console.log('accepted')
            })
            .catch((error)=> console.log(error))
    }

    const declineRequest = (id:number)=>{
        return axiosPrepared.get(Globals.baseUrl+"friend/decline/"+ id)
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
            >
                <Link href="/tabs/(tabs)/profile" >
                    <FontAwesome size={25} name={'chevron-left'} color="#815e5b" />
                </Link>
                <Text size="md" color="#815e5b" pl="$6" bold={true}>Friend Requests</Text>
            </HStack>

            <FlatList
                data={requests}
                renderItem={ ({item}:{item:Request})=>
                    <VStack>
                        <HStack>
                            <Text>{item.ofProfile.username}</Text>
                            <Button
                                onPress={()=>{acceptRequest(item.id)}}>
                                <ButtonText>
                                    Accept
                                </ButtonText>
                            </Button>
                            <Button
                                variant="outline"
                                backgroundColor ="#815e5b"
                                onPress={()=>{declineRequest(item.id)}}>
                                <ButtonText>
                                    Decline
                                </ButtonText>
                            </Button>

                        </HStack>
                        <Divider my="$4"/>
                    </VStack>

            }
            />
        </VStack>
    )
}

const styles = StyleSheet.create({

})
