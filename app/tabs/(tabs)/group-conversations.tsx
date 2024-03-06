import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import axiosPrepared from "@/app/auth/interceptor";
import {GroupConv} from "@/app/interfaces/GroupConv";
import {
    Box, HStack, Text, Divider, VStack, Avatar, AvatarFallbackText, Button,
} from "@gluestack-ui/themed";
import {FlatList, StyleSheet} from "react-native";
import {Link} from "expo-router";
import {Message} from "@/app/interfaces/Message";
import {LastMessage} from "@/app/interfaces/LastMessage";


export default function GroupConversations(){

    const [groupChats, setGroupChats] = useState<GroupConv[]>([])
    const [lastMessage, setLastMessage] = useState<Message>()
    const currentUser = Globals.actualUser

   async function getGroupConversations(){
        await axiosPrepared.get(Globals.baseUrl+"group/conversations")
            .then((response) => {
               // setGroupChats(response.data)
                setLastMessageOfChats(response.data)
            })
            .catch((error)=> console.log(error))
    }

    function setLastMessageOfChats(data:[]){
        let tmpGroupChats = data
        tmpGroupChats.forEach((group:GroupConv)=>{
           // console.log(typeof group.messages.slice(-1)[0])
            if (typeof group.messages.slice(-1)[0] != "undefined")
            {
                group.lastMessage = group.messages.slice(-1)[0]["content"]
            }else {
                group.lastMessage = "."
            }
        })
        setGroupChats(tmpGroupChats)
    }


    const showConversation = (id: number) => {
        return axiosPrepared.get(Globals.baseUrl+"group/private/"+ id)
            .then((response) => {
                setGroupChats(response.data)
            })
            .catch((error)=> console.log(error))

    }


    useEffect(() => {
        getGroupConversations()
        console.log("okééé")
    }, []);


    return(
        <Box mt="$1">
            <FlatList data={groupChats}
                      renderItem={({item}:{item:GroupConv}) => (
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
                                        pathname: "/group/[groupId]",
                                        params: { groupId: item.id }
                                    }}>

                                        <HStack>
                                            <VStack >
                                                { item.name === null ? <Text color="black" size="lg" bold={true}>Untitled</Text> : <Text>{item.name}</Text>}
                                                <Text>{item.lastMessage}</Text>
                                            </VStack>
{/*
                                            <Text>date</Text>
*/}
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
    between:{
        justifyContent: "space-between",
        backgroundColor: "red",
    },
    width:{
        width: "100%",
        backgroundColor:"blue"
    }
})
