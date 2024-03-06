import {Button, ButtonText, Text, VStack, LinkText, Divider} from "@gluestack-ui/themed";
import {Link, useNavigation} from "expo-router";
import {Globals} from "@/app/common/globals";


export default function chose(){
    const currentUser = Globals.actualUser
    const navigation = useNavigation()



    return(
        <VStack>


            <VStack mt='$5'
                    p="$3"
                    width="100%"
            >
                <Button size="xl"
                        backgroundColor="#f2bb05"
                        mb="$3">
                    <Link href="../../(pages)/profiles">All profiles</Link>
                </Button>
                <Button size="xl"
                        backgroundColor="#f2bb05"
                        mb="$3">
                    <Link href="../../(pages)/friends">My friends</Link>
                </Button>
                <Button size="xl"
                        backgroundColor="#f2bb05"
                        mb="$3">
                    <Link href="../../(pages)/requests">Friend requests</Link>
                </Button>

            </VStack>


        </VStack>
    )
}