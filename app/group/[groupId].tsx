import {
    Avatar, AvatarFallbackText,
    Box,Button,ButtonText, HStack, Icon, Input, InputField,
    Menu, MenuItem, MenuItemLabel, Text, ThreeDotsIcon,ToastDescription, ToastTitle, VStack, CloseIcon
} from "@gluestack-ui/themed";
import {Link, useLocalSearchParams} from "expo-router";
import {FlatList, StyleSheet} from "react-native";
import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import axiosPrepared from "@/app/auth/interceptor";
import {Message} from "@/app/interfaces/Message";
import Moment from 'moment';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {GroupConv} from "@/app/interfaces/GroupConv";


export default function PrivateId() {
    const {groupId} = useLocalSearchParams()
    const currentUser = Globals.actualUser
    const [groupMessages, setGroupMessages] = useState<Message[]>([])
    const [content, setContent] = useState("")


    async function getMessages() {
       // console.log(Globals.baseUrl+"group/conversation/"+groupId)
        return await axiosPrepared.get(Globals.baseUrl+"group/conversation/"+groupId)
            .then((response) => {
                setGroupMessages(response.data)
                //console.log(response.data)
            })
            .catch((error)=> console.log(error))
    }

    async function deleteMessage(groupId:number, id:number){
         await axiosPrepared.delete(Globals.baseUrl+"group/"+groupId+"/delete/"+id)
            .then((response)=>{
                console.log('message '+ id + " deleted")
            })
      getMessages()
    }

    async function newMessage() {
        if(content == ""){
            return console.log("rien")
        }

        await axiosPrepared.post(Globals.baseUrl+"group/message/in/"+ groupId, {
            content: content,
            associatedImages: []
        })
            .then((response)=> {
                console.log(response.data)
                setContent("")
                getMessages()
            })

    }

    const editMessage = (groupId:number, id:number)=>{
        return axiosPrepared.put(Globals.baseUrl+"group/"+groupId+"/edit/"+id)
    }

    Moment.locale('fr');

    useEffect(() => {
        getMessages()
    }, []);


    return (
        <>
            <HStack>
                <Link href="/tabs/(tabs)/group-conversations">arrow</Link>
                <Text>lalaal</Text>
            </HStack>
            <Box p="$2"
                 style={styles.box}>

                <FlatList
                    data={groupMessages}

                    renderItem={({item}: { item: Message; }) => (
                        <>

                            <HStack
                                my='$2'
                                {...item.author.username == currentUser.username ? styles.left : styles.input  }
                            >

                                <Avatar
                                    {...item.author.username == currentUser.username ? styles.me : styles.other  }

                                    size="sm" borderRadius="$full" >
                                    <AvatarFallbackText>{item.author.username[0]}</AvatarFallbackText>
                                </Avatar>

                                <Box
                                    backgroundColor="white"
                                    mx="$2"
                                    py="$2"
                                    px="$3"
                                    style={styles.test}
                                >
                                    <VStack >
                                        <ToastTitle>{item.author.username[0].toUpperCase() + item.author.username.slice(1)}</ToastTitle>

                                        <HStack  >
                                            <ToastDescription mr="$12">{item.content}</ToastDescription>
                                            <Text
                                                color="grey"
                                                size="sm"
                                            >{Moment(item.createdAt).format('h:mm a')}</Text>{/* JS Moment library*/}
                                        </HStack>

                                    </VStack>

                                </Box>
                                {item.author.username == currentUser.username ?


                                    <Menu
                                        placement="bottom"
                                        trigger={({ ...triggerProps }) => {
                                            return (
                                                <Button
                                                    variant="link"
                                                    {...triggerProps}>
                                                    <Icon as={ThreeDotsIcon} />
                                                </Button>
                                            );
                                        }}
                                    >
                                        <MenuItem key="Edit" textValue="Edit">

                                            <MenuItemLabel size='sm'>Edit</MenuItemLabel>
                                        </MenuItem>

                                        <MenuItem key="Delete" textValue="Delete" >
                                                <Button
                                                    variant="link"
                                                    onPress={()=>   deleteMessage(groupId, item.id)}>
                                                    <ButtonText color="#E94F37" size="sm">Delete</ButtonText>
                                                </Button>

                                        </MenuItem>


                                    </Menu>
                                    : <Text></Text>  }
                            </HStack>


                        </>





                    )}/>
            </Box>
            <HStack style={styles.input}>
                <Input
                    variant="rounded"
                    size="md"
                    borderWidth="0"
                    width="80%"
                >
                    <InputField
                        value={content}
                        onChangeText={text => setContent(text)}
                        type="text"
                        backgroundColor="white"
                        border="none"
                        placeholder="Aa"
                    />

                </Input>
                <Button onPress={newMessage} backgroundColor="transparent" p="$3">
                    <FontAwesome size={20} name={'paper-plane'} color="#E94F37"/>
                </Button>

            </HStack>

        </>

    )
}

const styles = StyleSheet.create({
    left: {
       flexDirection: "row-reverse",
    },
    me: {
       backgroundColor: "#815e5b"
    },
    other: {
        backgroundColor: "#DBAD6A"

    },
    test: {
        borderRadius: 4
    },
    input:{
        position: "absolute",
        bottom:10,
        width: "100%",
        marginLeft: 6,
    },
    box:{
        height: "92%"
    }


})