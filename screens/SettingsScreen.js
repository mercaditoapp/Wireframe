import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class SettingsScreen extends React.Component {
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
        this.fetchData();
    }

    fetchData() {
        return fetch('http://18.220.109.49:8080/mrcdtAPI/oauth/receta/findAll', {
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
            let recetas = this.state.dataSource.map((item, key) => {
                return <TouchableOpacity key={key} activeOpacity={.9} onPress={() => this.props.navigation.push('MoreSettings', {
                    otherParam: item.nombre
                })} >
                    <Card
                        image={{ uri: item.imagen }}
                    >
                        <Text style={{ marginBottom: 10 }}>
                            {item.nombre}
                        </Text>
                        <Text>{item.descripcion}</Text>

                    </Card>
                </TouchableOpacity>
            });
            return (
                <ScrollView style={styles.container}>
                    {recetas}
                </ScrollView>
            );
        }
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});