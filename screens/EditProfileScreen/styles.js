import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteBackgroundColor,
        flexDirection: 'column',
    },
    header: {
        flex: 0.15,
        flexDirection: 'row',
        backgroundColor: Colors.themeColor,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 0.85,
        flexDirection: 'column',
    },
    buttonContainer: {
        flex: 0.3,
    },
    headerText: {
        color: Colors.secondaryThemeColor,
        textAlign: 'center',
        fontWeight: "bold",
    },
    titleContainer: {
        flex: 0.4,
    },
    title: {
        color: Colors.whiteTextColor,
        textAlign: 'center',
        fontWeight: "bold",
    },
    textInput: {
        height: 40,
        borderColor: Colors.themeColor,
        borderWidth: 1,
        paddingTop: 10,
    },
    formGroup: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
    },
    inputLabel: {
        marginBottom: 15,
        color: Colors.themeColor,
        fontWeight: "bold",
    }
});