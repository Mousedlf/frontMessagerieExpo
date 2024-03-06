import {
    Avatar,
    AvatarFallbackText,
    Box,
    Button,
    ButtonText, CloseIcon, Heading,
    HStack,
    Icon,
    Input,
    InputField,
    Menu,
    MenuItem,
    MenuItemLabel, Modal,
    ModalBackdrop, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    Text,
    ThreeDotsIcon,
    ToastDescription,
    ToastTitle,
    VStack
} from "@gluestack-ui/themed";
import {Link, useLocalSearchParams} from "expo-router";
import {FlatList, StyleSheet} from "react-native";
import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import axiosPrepared from "@/app/auth/interceptor";
import {Message} from "@/app/interfaces/Message";
import Moment from 'moment';
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function PrivateId() {
    const {groupId} = useLocalSearchParams()
    const currentUser = Globals.actualUser
    const [groupMessages, setGroupMessages] = useState<Message[]>([])
    const [content, setContent] = useState("")

    const [showModal, setShowModal] = useState(false)
    const ref = React.useRef(null)
    const [editContent, setEditContent] = useState("")


    async function getMessages() {
       // console.log(Globals.baseUrl+"group/conversation/"+groupId)
        return await axiosPrepared.get(Globals.baseUrl+"group/conversation/"+groupId)
            .then((response) => {
                setGroupMessages(response.data)
                //console.log(response.data)
            })
            .catch((error)=> console.log(error))
    }

    async function deleteMessage(id:number){
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

    async function editMessage(messageId: number) {
        await axiosPrepared.put(Globals.baseUrl+"group/"+groupId+"/edit/"+messageId, {
            content: editContent
        })
            .then((response) => {
                console.log(response.data)
            })
        setEditContent("")
        setShowModal(false)
        getMessages()
    }

    function showModalWithContent(messageContent: string) {
        console.log(messageContent)
        setShowModal(true)
        setEditContent(messageContent)
    }



    Moment.locale('fr');

    useEffect(() => {
        getMessages()
    }, []);



    return (
        <>
            <HStack
                backgroundColor="white"
                p="$4"
                mt="$3"
            >
                <Link href="/tabs/(tabs)/group-conversations" >
                    <FontAwesome size={25} name={'chevron-left'} color="black   " />
                </Link>
            </HStack>

            <Box p="$2"
                 style={styles.box}
            >

                <FlatList
                    data={groupMessages}


                    renderItem={({item}: { item: Message; }) => (
                        <>

                            <HStack
                                my='$2'
                                maxWidth="100%"

                                {...item.author.username == currentUser.username ? styles.left : styles.right  }
                            >

                                <Avatar
                                    {...item.author.username == currentUser.username ? styles.me : styles.other  }

                                    size="sm" borderRadius="$full" >
                                    <AvatarFallbackText>{item.author.username[0]}</AvatarFallbackText>
                                </Avatar>

                                <Box
                                    mx="$2"
                                    py="$2"
                                    px="$3"
                                    style={styles.message}
                                    {...item.author.username == currentUser.username ? styles.me : styles.other  }

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

                                            <Button
                                                variant="link"
                                                onPress={()=>   showModalWithContent(item.content)}>
                                                <ButtonText color="black" size="sm">Modify</ButtonText>
                                            </Button>
                                            <Modal
                                                isOpen={showModal}
                                                onClose={() => {
                                                    setShowModal(false)
                                                }}
                                                finalFocusRef={ref}
                                            >
                                                <ModalBackdrop />
                                                <ModalContent>
                                                    <ModalHeader>
                                                        <Heading size="lg">Edit message</Heading>
                                                        <ModalCloseButton>
                                                            <Icon as={CloseIcon} />
                                                        </ModalCloseButton>
                                                    </ModalHeader>
                                                    <ModalBody>
                                                        <Input
                                                            variant="rounded"
                                                        >
                                                            <InputField
                                                                placeholder="Enter Text here"
                                                                value={editContent}
                                                                onChangeText={text => setEditContent(text)}
                                                                type="text"/>
                                                        </Input>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onPress={() => editMessage(item.id)}>
                                                            <FontAwesome size={20} name={'paper-plane'} color="white"/>
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </MenuItem>

                                        <MenuItem key="Delete" textValue="Delete" >
                                                <Button
                                                    variant="link"
                                                    onPress={()=>   deleteMessage(item.id)}>
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
                    variant="outline"
                    size="md"
                    width="80%"
                >
                    <InputField
                        value={content}
                        onChangeText={text => setContent(text)}
                        type="text"
                        placeholder="Aa"
                    />

                </Input>
                <Button onPress={newMessage} backgroundColor="white" pt="$3">
                    <FontAwesome size={20} name={'paper-plane'} color="black"/>
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
       backgroundColor: "#e2dadb" /**/,
        justifyContent: "flex-end"
    },
    other: {
        backgroundColor: "#e2dadb"

    },
    message: {
        borderRadius: 4,
        maxWidth: "80%"
    },
    input:{
        position: "absolute",
        bottom:10,
        width: "100%",
        marginLeft: 6,
        marginTop: 2,
        backgroundColor:"white",
        paddingTop: 5
    },
    box:{
        height: "90%"
    }


})
