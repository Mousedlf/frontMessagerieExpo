import {
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
import {Link, router} from "expo-router";

export default function Profiles(){

    const [profiles, setProfiles] = useState<Profile[]>([])
    const [friends, setFriends] = useState<Profile[]>([])
    const[friendIds, setFriendIds]= useState<number[]>([])
    const currentUser = Globals.actualUser

    const getProfilesFromAPI = () => {
        return  axiosPrepared.get(Globals.baseUrl+"profiles")
            .then((response) => {
                setProfiles(response.data)
            })
    }


    const sendRequest = (id : number)=> {
        //console.log(Globals.baseUrl+'friend/request/send/'+ id)
      return  axiosPrepared.post(Globals.baseUrl+'friend/request/send/'+ id)
                    .then((response)=>{
                        console.log('ok sent')
                    })
          .catch((error)=> console.log(error))
    }

    const getFriendsFromAPI = () => {
        return axiosPrepared.get(Globals.baseUrl+currentUser.id+"/friends")
            .then((response) => {
               setFriends(response.data)
                console.log(response.data)
                friends.forEach((friend:Profile)=>{
                   // console.log(friend.id)
                    friendIds.push(friend.id)
                })
               // console.log(friendIds)

            })
    }

    useEffect(() => {
        getProfilesFromAPI()
        getFriendsFromAPI()
    }, []);



    return(
        <VStack >

            <HStack
                backgroundColor="white"
                p="$4"
                mt="$6"

            >
                <Link href="/tabs/(tabs)/profile" >
                    <FontAwesome size={25} name={'chevron-left'} color="black" />
                </Link>
                <Text size="md" color="black" pl="$6" bold={true}>All profiles</Text>
            </HStack>

            <FlatList
                data={profiles}
                renderItem={ ({item}:{item:Profile})=>
                    <>
                        <HStack style={styles.display}>
                            <Text>{item.username}</Text>
                            <Text>{item.public.valueOf()}</Text>

                            {!friendIds.includes(item.id) ?
                            <Button
                                backgroundColor="#F2BB05"
                                onPress={()=>{sendRequest(item.id)}}
                            >
                                <ButtonText color="black">
                                    Send request
                                </ButtonText>
                            </Button>: <Text></Text>}
                        </HStack>
                        <Divider my="$4" />

                    </>

                }
            />
        </VStack>
    )
}

const styles = StyleSheet.create({
    display:{
        justifyContent: "space-between",
        marginHorizontal: 8,
        alignItems: "center",
        marginTop: 4,
    }

})