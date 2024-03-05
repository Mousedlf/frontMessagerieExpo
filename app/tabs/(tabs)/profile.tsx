import {Button, ButtonText, Text, VStack, LinkText, Divider} from "@gluestack-ui/themed";
import {Link, useNavigation} from "expo-router";
import {Globals} from "@/app/common/globals";


export default function chose(){
    const currentUser = Globals.actualUser
    const navigation = useNavigation()



    return(
        <VStack>


            <VStack mt='$5'>
                <Link href="../../(pages)/profiles">
                    <LinkText>all profiles</LinkText>
                </Link>
                <Link href="../../(pages)/friends">
                    <LinkText>my friends</LinkText>
                </Link>
                <Link href="../../(pages)/requests">
                    <LinkText>friend requests</LinkText>
                </Link>

            </VStack>


        </VStack>
    )
}