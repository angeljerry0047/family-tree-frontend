import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteBackgroundColor,
        flexDirection: 'column',
    },
    topView: {
        flex: 0.3,
        backgroundColor: Colors.themeColor,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
    },
    topViewRows: {
        flexDirection: 'row',
        flex: 0.9,
    },
    bottomView: {
        flex: 0.7,
        flexDirection: 'column',
    },
    topViewLeftContainer: {
        flexDirection: 'column',
        flex: 0.3,
    },
    topViewMiddleContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topViewRightContainer: {
        flexDirection: 'column',
        flex: 0.3,
    },
    famliyIdContainer: {
        flex: 0.5,
        flexDirection: 'column',
        marginTop: 35,

    },
    shareButtonContainer: {
        flex: 0.5,

    },
    generationIdContainer: {
        flex: 0.5,
        flexDirection: 'column',
        marginTop: 35,

    },
    editInfoButtonContainer: {
        flex: 0.5,

    },
    profileNameContainer: {
        flex: 0.1,

    },
    profileImgContainer: {
        marginTop: 30,
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: Colors.whiteBorderColor,
        borderWidth: 3,
        overflow: 'hidden',
        backgroundColor: Colors.whiteBackgroundColor,
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    button: {
        backgroundColor: Colors.secondaryThemeColor,
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerText: {
        color: Colors.whiteTextColor,
        textAlign: 'center',
        marginLeft: -11,
    },
    headerIds: {
        color: Colors.whiteTextColor,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: -11,
    },
    personalInfoContainer: {
        flex: 0.6,
        flexDirection: 'column',
        backgroundColor: Colors.whiteBackgroundColor,
        shadowColor: Colors.containerGrayShadowColor,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginBottom: 5,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
    },
    personalInfoListItem: {
        flex: 0.20,
    },
    personalInfoItemHeader: {
        flex: 0.5,
        textAlign: 'center',
        color: Colors.themeColor,
    },
    personalInfoItemData: {
        flex: 0.5,
        textAlign: 'center',
    },
    educationContainer: {
        flex: 0.2,
        flexDirection: 'column',
        backgroundColor: Colors.whiteBackgroundColor,
        shadowColor: Colors.containerGrayShadowColor,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginBottom: 5,
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
    },
    occupationContainer: {
        flex: 0.2,
        flexDirection: 'column',
        backgroundColor: Colors.whiteBackgroundColor,
        shadowColor: Colors.containerGrayShadowColor,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
    },
    educationInfoListItem: {
        flex: 1,
    },
    occupationInfoListItem: {
        flex: 1,
    },
});