import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import CustomToolbar from './CustomToolbar'



class ListPage extends Component {
    constructor() {
        super();
        this.state = {
            loaderIsVisible: true,
            page: 1,
            totalPage: 0,
            data: []
        }
    }

    componentDidMount() {
        this.callApi()
    }

    async callApi() {
        let apiUrl = 'https://demo1.dvconsulting.org/sock3/api/notification-lists'
        try {
            const formdata = new FormData();
            formdata.append("user_id", 10519);
            formdata.append("api_key", "REIxQzMxR2M5MDg5Zmc4N1JGcGoxdndtRVAxdHk2VU5yNWlTaFFlbjY0YnNrVzJ6S0p4NklhZFhMQWx16047671aa29f0");
            formdata.append("language", "en")
            formdata.append("record_count", 10)
            formdata.append("page", this.state.page)

            let response = await fetch(apiUrl, {
                // method: 'GET',               
                method: 'POST',
                body: formdata,
            })
            let responseJson = await response.json();
            this.setState({
                data: [...this.state.data, ...responseJson.results],
                totalPage: responseJson.total_page,
                loaderIsVisible: false
            })
            // console.warn("data", responseJson.results)
        }
        catch (error) {
            console.error(error);
        }
    }

    setRenderItemView = ({ item }) => {
        return (
            <View style={{ borderBottomColor: 'blue', borderBottomWidth: 1, padding: 10}}>
                <Text style={myStyle.idsubfontstyles}> {item.notification_id} </Text>
                <Text style={myStyle.fontstyles}> {item.notification_title} </Text>
                <Text style={myStyle.subfontstyles}> {item.message} </Text>
            </View>
        )
    }

    loadMoreItems = () => {
        if (this.state.page < this.state.totalPage) {
            this.setState({
                page: this.state.page + 1,
            }, () => {
                this.callApi()
            })
        }
    }

    renderFooter = () => {
        return (
            <View>
                <ActivityIndicator size={50} color="#2484E8" />
            </View>
        )
    }


    render() {
        if (this.state.loaderIsVisible) {
            return (
                <View style={myStyle.loadingStyle}>
                    <ActivityIndicator size={50} color="#2484E8" />
                </View>
            )
        }
        else {
            return (
                <View>
                    {/* <CustomToolbar title="Pagination Sample"  backgroundColor="#FFFFFF"/> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={this.setRenderItemView}
                        onEndReached={this.loadMoreItems}
                        ListFooterComponent={this.renderFooter}
                        onEndReachedThreshold={0}
                        keyExtractor={(i, k) => k.toString()}
                    />
                </View >
            );
        }
    }
}


const myStyle = StyleSheet.create({
    fontstyles: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        color: 'purple'
    },
    subfontstyles: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        color: 'orange'
    },
    idsubfontstyles: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        color: 'green'
    },
    loadingStyle: {
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
});
export default ListPage;