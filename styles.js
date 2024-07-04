
import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Text: {
    fontSize: 50,
    color: 'red',
    textAlign: 'center'
  },
  Logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain', 
    borderRadius: 30,
  },
  Image: {
    resizeMode: 'stretch',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '150%',
    height: '100%',
  },
  titleImage: {
    resizeMode: '',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '150%',
    height: '100%',
  },
  Button1: {
    backgroundColor: 'red',
    padding: 15,
    margin: 15,
    borderRadius: 30,
  },
  Button2: {
    backgroundColor: 'green',
    padding: 15,
    margin: 15,
    borderRadius: 30,
  },
  Button3: {
    backgroundColor: 'green',
    padding: 15,
    margin: 15,
    borderRadius: 5,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    color: 'purple',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: 'purple',
    padding: 8,
    paddingLeft: 25,
    marginBottom: 20,
    width: '40%',
    borderRadius: 25
  },
}) 