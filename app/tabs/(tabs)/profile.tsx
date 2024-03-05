import {Button, ButtonText, Text, VStack, LinkText, Divider} from "@gluestack-ui/themed";
import {Link, useNavigation} from "expo-router";
import {Globals} from "@/app/common/globals";


export default function chose(){
    const currentUser = Globals.actualUser
    const navigation = useNavigation()



    return(
        <VStack>


            <VStack mt='$5' p="$3" >
                    <Link
                        href="../../(pages)/profiles"
                    >
                        <Button size="lg"
                                width="100%"
                                backgroundColor="#815e5b"
                                mb="$2"
                        >
                            <ButtonText>All profiles</ButtonText>
                        </Button>

                    </Link>

                <Link href="../../(pages)/friends">
                    <Button size="lg"
                            width="100%"
                            backgroundColor="#815e5b"
                            mb="$2"

                    >
                        <ButtonText>My friends</ButtonText>
                    </Button>
                </Link>
                <Link href="../../(pages)/requests">
                    <Button size="lg"
                            width="100%"
                            backgroundColor="#815e5b"
                            mb="$2"

                    >
                        <ButtonText>Friend requests</ButtonText>
                    </Button>
                </Link>

            </VStack>


        </VStack>
    )
}