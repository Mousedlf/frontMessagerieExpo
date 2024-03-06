import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import axiosPrepared from "@/app/auth/interceptor";
import {GroupConv} from "@/app/interfaces/GroupConv";
import {
    Box, HStack, Text, VStack, Avatar, AvatarFallbackText, Button, ButtonText, ModalFooter,
    Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton, Icon, CloseIcon, ModalBody, CheckboxGroup, Checkbox,
    CheckboxLabel, CheckboxIndicator, CheckboxIcon, Menu, ThreeDotsIcon, MenuItem, Input, InputField,
} from "@gluestack-ui/themed";
import {FlatList, StyleSheet} from "react-native";
import {Link} from "expo-router";
import {Message} from "@/app/interfaces/Message";
import {LastMessage} from "@/app/interfaces/LastMessage";
import {Profile} from "@/app/interfaces/Profile";
import {CheckIcon} from "lucide-react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function GroupConversations(){
    const [values, setValues] = useState([])
    const [groupChats, setGroupChats] = useState<GroupConv[]>([])
    const [lastMessage, setLastMessage] = useState<Message>()
    const [friends, setFriends] = useState<Profile[]>([])


    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)

    const [editTitle, setEditTitle] = useState("o")
    const ref = React.useRef(null)

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

    async function getFriends() {
        await axiosPrepared.get(Globals.baseUrl+Globals.actualUser.id+"/friends")
            .then((response) => {
                setFriends(response.data)
            })
    }


    const showConversation = (id: number) => {
        return axiosPrepared.get(Globals.baseUrl+"group/private/"+ id)
            .then((response) => {
                setGroupChats(response.data)
            })
            .catch((error)=> console.log(error))

    }

    async function createGroupConv() {
        await axiosPrepared.post(Globals.baseUrl+"group/conversation/new", {
            members: values
        })
            .then((response) => {
                console.log(response.data)
            })
        setShowModal(false)
        setValues([])
        getGroupConversations()
    }

    async function deleteGroupConv(convId: number) {
        await axiosPrepared.delete(Globals.baseUrl+"group/conversation/"+convId+"/delete")
            .then((response) => {
                console.log(response.data)
            })
        getGroupConversations()
    }

    async function editGroupConv(convId: number) {
        await axiosPrepared.post(Globals.baseUrl+"group/conversation/"+convId+"/edit", {
            name: editTitle
        })
            .then((response) => {
                console.log(response.data)
            })
        setEditTitle("")
        setShowModal2(false)
        getGroupConversations()
    }

    async function addMember() {

    }


    function showModalWithTitle(title: string) {
        setShowModal2(true)
        setEditTitle(title)
    }



    useEffect(() => {
        getFriends()
        getGroupConversations()
        console.log("okééé")
    }, []);


    return(
        <><Box mt="$1">
            <FlatList data={groupChats}
                      renderItem={({item}: { item: GroupConv; }) => (
                          <VStack>
                              <HStack py='$4' px='$2' style={style.center}>
                                  <HStack>
                                      <Avatar bgColor='#F2BB05' size="md" borderRadius="$full">
                                          <AvatarFallbackText>X</AvatarFallbackText>
                                      </Avatar>
                                      <Box px="$4">
                                          <Link
                                              href={{
                                                  pathname: "/group/[groupId]",
                                                  params: {groupId: item.id}
                                              }}>

                                              <HStack>
                                                  <VStack>
                                                      {item.name === null ?
                                                          <Text color="black" size="lg" bold={true}>Untitled</Text> :
                                                          <Text color="black" size="lg" bold={true}>{item.name}</Text>}
                                                      <Text>{item.lastMessage}</Text>
                                                  </VStack>
                                              </HStack>
                                          </Link>
                                      </Box>
                                  </HStack>

                                  {item.createdBy.username == Globals.actualUser.username ?
                                      <Menu
                                          placement="bottom"
                                          margin="$2"
                                          trigger={({ ...triggerProps }) => {
                                              return (
                                                  <Button
                                                      paddingBottom="$6"
                                                      variant="link"
                                                      {...triggerProps}>
                                                      <Icon as={ThreeDotsIcon} />
                                                  </Button>
                                              );
                                          }}
                                      >
                                          <MenuItem key="AddMember" textValue="AddMember" >
                                              <Button onPress={() => setShowModal3(true)} variant="link">
                                                  <ButtonText color="black" size="sm">Add Member</ButtonText>
                                              </Button>
                                              <Modal
                                                  isOpen={showModal3}
                                                  onClose={() => {
                                                      setShowModal3(false)
                                                  }}
                                                  finalFocusRef={ref}
                                              >
                                                  <ModalBackdrop />
                                                  <ModalContent>
                                                      <ModalHeader>
                                                          <Heading size="lg">Add members to conversation</Heading>
                                                          <ModalCloseButton>
                                                              <Icon as={CloseIcon} />
                                                          </ModalCloseButton>
                                                      </ModalHeader>
                                                      <ModalBody>
                                                          <FlatList
                                                              data={friends}
                                                              renderItem={({item}: {item: Profile}) => (
                                                                  <Text>{item.username}</Text>
                                                              )}
                                                          />

                                                      </ModalBody>
                                                      <ModalFooter>
                                                          <Button
                                                              size="sm"
                                                              borderWidth="$0"
                                                          >
                                                              <ButtonText color="black">Add</ButtonText>
                                                          </Button>
                                                      </ModalFooter>
                                                  </ModalContent>
                                              </Modal>
                                          </MenuItem>

                                          <MenuItem key="Edit" textValue="Edit">
                                              <Button onPress={() => showModalWithTitle(item.name)} variant="link">
                                                  <ButtonText color="black" size="sm">Edit</ButtonText>
                                              </Button>
                                              <Modal
                                                  isOpen={showModal2}
                                                  onClose={() => {
                                                      setShowModal2(false)
                                                  }}
                                                  finalFocusRef={ref}
                                              >
                                                  <ModalBackdrop />
                                                  <ModalContent>
                                                      <ModalHeader>
                                                          <Heading size="lg">Edit group conversation</Heading>
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
                                                                  value={editTitle}
                                                                  onChangeText={text => setEditTitle(text)}
                                                                  type="text"/>
                                                          </Input>
                                                      </ModalBody>
                                                      <ModalFooter>
                                                          <Button onPress={() => editGroupConv(item.id)}>
                                                              <FontAwesome size={20} name={'paper-plane'} color="white"/>
                                                          </Button>
                                                      </ModalFooter>
                                                  </ModalContent>
                                              </Modal>
                                          </MenuItem>

                                          <MenuItem key="Delete" textValue="Delete" >
                                              <Button onPress={() => deleteGroupConv(item.id)} variant="link">
                                                  <ButtonText color="#E94F37" size="sm" >Delete</ButtonText>
                                              </Button>
                                          </MenuItem>
                                      </Menu>
                                      : <Text></Text> }

                              </HStack>
                          </VStack>
                      )}/>

        </Box>
            <Button onPress={() => setShowModal(true)} ref={ref} backgroundColor="#f2bb05">
                <ButtonText color="black">Create new group</ButtonText>
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
                        <Heading size="lg">New Group Conversation</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <CheckboxGroup
                            value={values}
                            onChange={(keys) => {
                                setValues(keys)
                            }}
                        >
                            <VStack space="lg" w="$40">
                                <FlatList
                                    data={friends}
                                    renderItem={({item}: {item: Profile}) => (
                                        <Checkbox justifyContent="space-between" value={item.id.toString()}>
                                            <CheckboxLabel>{item.username}</CheckboxLabel>
                                            <CheckboxIndicator>
                                                <CheckboxIcon as={CheckIcon} />
                                            </CheckboxIndicator>
                                        </Checkbox>
                                    )}
                                />
                            </VStack>
                        </CheckboxGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            size="sm"
                            backgroundColor="#f2dd05"
                            borderWidth="$0"
                            onPress={createGroupConv}
                        >
                            <ButtonText>Add</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )

}

const style = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "space-between"
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
