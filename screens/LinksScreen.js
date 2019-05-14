import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Recetas',
  };

   constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }
    componentDidMount() {
        return fetch('http://18.220.109.49:8080/mrcdtAPI/oauth/receta/findByNombreUrl/pizza', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            let receta = this.state.dataSource.map((val, key) => {
                return 
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: val.imagen }}
                    />
            });
            return (
                <ScrollView style={styles.container}>
                  {receta}
                </ScrollView>
            );
        }
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});