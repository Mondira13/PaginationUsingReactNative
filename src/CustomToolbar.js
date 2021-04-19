import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

class CustomToolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={myStyles.navBar}>
                <View style={myStyles.rowitem}>
                    <View style={{ flex: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }} >
                            <Image source={require('./images/backicon.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4,  justifyContent: 'center' }} >
                        <Text style={myStyles.appTitleStyle}> {this.props.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const myStyles = StyleSheet.create({
    navBar: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: 'white'
    },
    rowitem: {
        flexDirection: 'row', flex: 1
    },
    appTitleStyle: {
        fontSize: 19,
        color: 'brown',
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
});
export default CustomToolbar;