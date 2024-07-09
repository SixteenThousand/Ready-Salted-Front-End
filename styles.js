
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
    width: '100%',
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
  Button4: {
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 40,
    margin: 10,
    borderRadius: 30,
  },
  ButtonStart: {
    backgroundColor: 'red',
    paddingVertical: 40,
    paddingHorizontal: 80,
    margin: 20,
    borderRadius: 50,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ButtonTextStart: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'purple',
    fontWeight: 'bold',
    marginBottom: 20,
    wordWrap: 'break-word',
    maxWidth: '100%',
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
  //Instructions Page Styles

   instructionsContainer: {
     backgroundColor: "#ADD8E6"
   },



  instructionsTitle: {
    fontSize: 45, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'purple', 
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)', 
    letterSpacing: 1, 
  },
  instructionsParagraph: {
    fontSize: 22, 
    marginBottom: 20, 
    lineHeight: 24, 
    textAlign: 'center',
    color: '#111', 
    paddingHorizontal: 15, 
  },
  instructionsList: {
    fontSize: 22, 
    marginBottom: 20, 
    lineHeight: 24, 
    paddingLeft: 20, 
    textAlign: 'left',
    color: 'green', 
  },

}) 