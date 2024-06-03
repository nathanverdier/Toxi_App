import { Personne } from "@/model/Personne"
import { FlatList } from "react-native"
import { View } from "react-native"
import { PersonneItem } from "./PersonneItem"

interface CataloguePersonneProps {
    dataPersonne : Personne[]
}

export function CataloguePersonne({dataPersonne} : CataloguePersonneProps) {
    return ( 
        <View>
            <FlatList
                    data = {dataPersonne}
                    keyExtractor={(item => item.getName())}
                    renderItem={({item}) => <PersonneItem personne={item}/>}
            />
        </View>
    )
}
