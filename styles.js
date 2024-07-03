
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
    width: '80%',
    height: 300,
    resizeMode: 'contain', 
  },
  Image: {
    resizeMode: 'stretch',
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
    borderRadius: 5,
  },
  Button2: {
    backgroundColor: 'green',
    padding: 15,
    margin: 15,
    borderRadius: 5,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 4,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 20,
    width: '40%',
  },
}) 