import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity,Image,Text } from 'react-native'
import axios from "axios";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Home() {

    const [Data, setData] = useState([])


    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then((res) => setData(res.data.products.sort((a, b) => a.title > b.title ? -1 : 1)
            ))
            .catch((err) => alert(err))
    }, []);

    const deleteByIndex = index => {
        setData(oldValues => {
            return (oldValues.filter((_, i) => i !== index))
        });
    }

    const drawStar = (rateing) => {
        let rate = parseInt(rateing);
        var star = [];
        for (let index = 0; index < rate; index++) {
            star.push(<Ionicons key={index} name={'star'} size={15} color={'goldenrod'} />);
        }
        for (let index = 0; index < 5 - rate; index++) {
            star.push(<Ionicons key={index + 10} name={'star-outline'} size={15} color={'goldenrod'} />);
        }

        return star;
    };



    return (
        <ScrollView>
            <View style={styles.section} >
                {Data.map((product, index) => {
                    return (
                        <TouchableOpacity style={styles.ViewCard} key={product.id}
                        onPress={() => deleteByIndex(index)}>
                        <Image source={{ uri: `${product.images[0]}` }} style={{ width: 140, height: 160, alignSelf: 'center' }}></Image>
                        <Text style={styles.TitleStyle}>{product.title}</Text>
                        <View style={styles.StarContainer}>
                            {drawStar(product.rating)}
                        </View>
                        <Text style={styles.TitleStyle} >{product.price} $</Text>

                    </TouchableOpacity>

                    )
                })}
            </View>
        </ScrollView>)

}

const styles = StyleSheet.create({
    section: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    ViewCard: {
        width: 175,
        // height: 275,
        marginHorizontal: 14,
        padding: 5,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    TitleStyle:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    StarContainer:{
        flexDirection: 'row', 
        marginTop: 4,
    }

})