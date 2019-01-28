import React, { Component } from 'react';
import { View } from 'react-native';

import { Container, Navbar } from 'navbar-native';

class ReactNativeEmpty extends Component {
    render() {
        return (
            <Container type="list" data={["first", "second", "third"]}>
                <Navbar
                    user={true}
                    image={{
                        source:'https://facebook.github.io/react/img/logo_og.png',
                        type: 'remote',
                        resizeMode: 'cover',
                        style: {width: 50, height: 44}
                    }}
                    statusBar={{
                        style: "default",
                        hideAnimation: Navbar.FADE,
                        showAnimation: Navbar.SLIDE,
                    }}
                    left={{
                        icon: "ios-arrow-back",
                        label: "Back",
                        onPress: () => {alert('Go back!')}
                    }}
                    right={[{
                        icon: "ios-search",
                        onPress: () => {alert('Search!')}
                    },{
                        icon: "ios-menu",
                        onPress: () => {alert('Toggle menu!')}
                    }]}
                />
            </Container>
        );
    }
}