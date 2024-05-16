// React and React Native core imports
// import React, { useState, useEffect } from 'react';

// import {
//   StyleSheet,
//   Button,
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Image,
//   ScrollView,
//   ActivityIndicator,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ImageBackground,
//   FlatList
// } from 'react-native';
// // Third-party imports for icons and TensorFlow.js
// import { MaterialIcons } from '@expo/vector-icons';
// import * as tf from '@tensorflow/tfjs';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import CaptureButton from '../component/CaptureButton';
// // Expo permissions and image picker for handling media
// import * as ImagePicker from 'expo-image-picker';
// // Additional utilities
// import * as jpeg from 'jpeg-js';

// // Local imports from your project structure
// import POPULAR_PLANTS from '../src/api/diseases';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Button,
  FlatList
} from 'react-native';
// Third-party imports for icons and TensorFlow.js
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import CaptureButton from '../component/CaptureButton';
// Expo permissions and image picker for handling media
import * as ImagePicker from 'expo-image-picker';
// Additional utilities
import * as jpeg from 'jpeg-js';

// Local imports from your project structure
import POPULAR_PLANTS from '../src/api/diseases';

class CustomL2Regularizer {
  constructor(l2) {
    this.l2 = l2; // L2 regularization factor
  }

  apply(x) {
    // Apply L2 regularization: 0.5 * lambda * sum(square(weights))
    return tf.mul(tf.scalar(0.5 * this.l2), tf.sum(tf.square(x)));
  }

  getConfig() {
    // Method for serialization
    return { l2: this.l2 };
  }

  static get className() {
    // Class name for TensorFlow.js to use during serialization
    return 'L2';
  }
}


export default HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [image, setImage] = useState(null);
  const [isTfReady, setTfReady] = useState(false);
  //Models
  const [LeafTypemodel, setLeafTypemodel] = useState(null);
  const [AppleModel, setAppleModel] = useState(null);
  const [CornModel, setCornModel] = useState(null);
  const [CitrusModel, setCitrusModel] = useState(null);
  const [TomatoModel, setTomatoModel] = useState(null);
  const [BananaModel, setBananaModel] = useState(null);

  const [leafType, setLeafType] = useState('');
  const [disease, setDisease] = useState('');

  const [test, setTest] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [name, setname] = useState();
  const [val, setval] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [pre, setPre] = useState('Upload/Capture an image');
  const [displaySuggestions, setDisplaySuggestions] = useState([]);
  const [suggestions, setsuggestions] = useState([]);
  const [thresholdedImageUri, setThresholdedImageUri] = useState(null);
  const [data, setData] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null); // Add this state at the top where you define your other state variables

  const loadModel = async (modelJson, modelWeights) => {
    await tf.ready(); // Ensure TensorFlow.js is ready
    tf.serialization.registerClass(CustomL2Regularizer);

    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    console.log('Model loaded successfully');
    return model; // Return the loaded model
  };
  const loadModelsSequentially = async () => {

    // Assuming modelJson1, weights1, modelJson2, weights2 are imported or defined elsewhere
    const model1 = await loadModel(require('../models/LeafType/model.json'), require('../models/LeafType/shared.bin'));
    // Use model1 as needed
    setLeafTypemodel(model1)
    const model2 = await loadModel(require('../models/Apple/model.json'), require('../models/Apple//shared.bin'));
    setAppleModel(model2)
    const model3 = await loadModel(require('../models/Citrus/model.json'), require('../models/Citrus//shared.bin'));
    setCitrusModel(model3);
    const model4 = await loadModel(require('../models/Corn/model.json'), require('../models/Corn//shared.bin'));
    setCornModel(model4);
    const model5 = await loadModel(require('../models/Tomato/model.json'), require('../models/Tomato//shared.bin'));
    setTomatoModel(model5)
    const model6 = await loadModel(require('../models/Banana/model.json'), require('../models/Banana//shared.bin'));
    setBananaModel(model6)
    // Use model2 as needed
  };


  useEffect(() => {
    loadModelsSequentially()
      .then(() => console.log('All models loaded successfully'))
      .catch(error => console.error('Model loading error:', error));
  }, []);



  useEffect(() => {
    (async () => {
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (mediaLibraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
        alert('We need access to your camera and photos to proceed.');
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchQuery('');
      setDisplaySuggestions('');
    });

    return unsubscribe; // Cleanup function to prevent memory leaks
  }, [navigation]); // Re-run useEffect only when navigation changes

  useEffect(() => {
    const allNames = POPULAR_PLANTS.map(plant => plant.name);
    const uniqueNames = [...new Set(allNames)]; // Convert array to set to remove duplicates
    setsuggestions(uniqueNames);
  }, []);

  useEffect(() => {
    console.log(leafType, disease)
    const foundplant = POPULAR_PLANTS.find(p => p.name.toLowerCase() == disease.toLowerCase());
    if (foundplant) {
      navigation.navigate({
        name: 'Result',
        params:
          { leafType: leafType, disease: foundplant.name, causes: foundplant.causes, remedies: foundplant.remedies,image:imageUrl2 ,data:data }
      })
    }
  }, [predictions],[imageUrl2])

  const resetState = () => {
    setImage(null);
    setPredictions(null);
    setIsAnalyzing(false);
    setImageUrl2(null)
    setData(null)
  };
  const determineDisease = (diseaseIndex, leafTypeIndex) => {
    let leafType = '';
    let disease = '';

    // Map leaf type index to its name
    switch (leafTypeIndex) {
      case 0:
        leafType = "Apple";
        break;
      case 1:
        leafType = "Banana";
        break;
      case 2:
        leafType = "Citrus";
        break;
      case 3:
        leafType = "Corn";
        break;
      case 4:
        leafType = "Tomato";
        break;
      default:
        console.log("Leaf type not recognized.");
        leafType = "Unknown";
    }

    // Based on the leaf type, map disease index to its name
    if (leafType === "Apple") {
      switch (diseaseIndex) {
        case 0: disease = 'Healthy Apple'; break;
        case 1: disease = 'General Scab'; break;
        case 2: disease = 'Serious Scab'; break;
        case 3: disease = 'Grey Spot'; break;
        case 4: disease = 'General Cedar Rust'; break;
        case 5: disease = 'Serious Cedar Rust'; break;
        default: disease = "Unknown Disease";
      }
    } else if (leafType === "Banana") {
      switch (diseaseIndex) {
        case 0: disease = 'Cordana'; break;
        case 1: disease = 'Pestalotiopsis'; break;
        case 2: disease = 'Healthy Banana'; break;
        case 3: disease = 'Sigatoka'; break;
        default: disease = "Unknown Disease";
      }
    } else if (leafType === "Citrus") {
      switch (diseaseIndex) {
        case 0: disease = 'Black Spot'; break;
        case 1: disease = 'Canker'; break;
        case 2: disease = 'Greening'; break;
        case 3: disease = 'Healthy Citrus'; break;
        default: disease = "Unknown Disease";
      }
    } else if (leafType === "Corn") {
      switch (diseaseIndex) {
        case 0: disease = 'Blight Disease'; break;
        case 1: disease = 'Grey Leaf Spot'; break;
        case 2: disease = 'Healthy Corn'; break;
        case 3: disease = 'Common Rust'; break;
        default: disease = "Unknown Disease";
      }
    } else if (leafType === "Tomato") {
      switch (diseaseIndex) {
        case 0: disease = 'Bacterial Spot Disease'; break;
        case 0: disease = 'Early Blight Disease'; break;
        case 1: disease = 'Healthy Tomato'; break;
        case 2: disease = 'Late Blight'; break;
        case 3: disease = 'Leaf Mold'; break;
        case 4: disease = 'Mosaic Virus'; break;
        case 5: disease = 'Septoria Leaf Spot'; break;
        case 6: disease = 'Spider Mites'; break;
        case 7: disease = 'Target Spot'; break;
        case 8: disease = 'Yellow Leaf Curl Virus'; break;
        default: disease = "Unknown Disease";
      }
    } else {
      disease = "Unknown Disease"; // Fallback for when the leaf type is not recognized
    }

    return { leafType, disease };
  };

  const imageToTensor = async (source, size) => {
    const response = await fetch(source.uri, {}, { isBinary: true });
    const rawImageData = await response.arrayBuffer();
    const { width, height, data } = jpeg.decode(rawImageData, { useTArray: true });

    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }

    const img = tf.tensor3d(buffer, [width, height, 3]);
    const resizedImg = tf.image.resizeBilinear(img, [size, size]);
    return resizedImg.expandDims(0).toFloat().div(tf.scalar(255));
  };





  const handleImageSelection = async () => {
    try {
      const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraPermissionResult.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
        alert('We need access to your camera and photos to proceed.');
        return;
      }

      const action = await showImagePickerOptions(); // Assume this function is implemented correctly
      let response = null;

      if (action === 'camera') {
        response = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
          aspect: [6, 4],
          base64: true,
        });
      } else {
        response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
          aspect: [6, 4],
          base64: true,
        });
      }

      if (response.uri) {
        let uriParts = response.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        const formData = new FormData();
        formData.append('file', {
          uri: response.uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });

        fetch('http://192.168.35.83:5000/predict', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((apiResponse) => apiResponse.json())
          .then((data) => {
            console.log('Success on Home:', data);
            setData(data.diseased_area_ratio)
            fetchImageFromApi(); // Optionally fetch processed image
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        const imageTensorSize224 = await imageToTensor(response, 224);
        const leafTypePrediction = await LeafTypemodel.predict(imageTensorSize224).data();
        const leafTypeIndex = leafTypePrediction.indexOf(Math.max(...leafTypePrediction));

        switch (leafTypeIndex) {
          case 0:
            handleSpecificDiseasePrediction(leafTypeIndex, imageTensorSize224, AppleModel);
            break;
          case 1:
            handleSpecificDiseasePrediction(leafTypeIndex, imageTensorSize224, BananaModel);
            break;
          case 2:
            handleSpecificDiseasePrediction(leafTypeIndex, imageTensorSize224, CitrusModel);
            break;
          case 3:
            handleSpecificDiseasePrediction(leafTypeIndex, imageTensorSize224, CornModel);
            break;
          case 4:
            handleSpecificDiseasePrediction(leafTypeIndex, imageTensorSize224, TomatoModel);
            break;
          default:
            console.log("Leaf type not recognized.");
        }
      }
    } catch (error) {
      console.error("Error in handleImageSelection:", error);
      setIsAnalyzing(false); // Assuming this is part of your component state
    }
  };

  const fetchImageFromApi = async () => {
    try {
      const response = await fetch('http://192.168.35.83:5000/get_image');//http://192.168.85.83:5000//http://192.168.35.83:5000
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log("Image Data on Home: ", base64data);
        setImageUrl2(base64data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };


  const handleSpecificDiseasePrediction = async (leafTypeIndex, imageTensor, model) => {
    const diseasePrediction = await model.predict(imageTensor).data();
    console.log(diseasePrediction);
    const diseaseIndex = diseasePrediction.indexOf(Math.max(...diseasePrediction));
    console.log(`Disease Index ${diseaseIndex}, Leaf Type Index ${leafTypeIndex}`);
    const { leafType, disease } = determineDisease(diseaseIndex, leafTypeIndex);
    setLeafType(leafType);
    setDisease(disease);
    setPredictions({
      leafType, // The detected type of the leaf
      disease   // The detected disease
    });


  };
  const updateSearchQuery = (input) => {

    if (input.length > 2) { // Only show suggestions if the input length is greater than 2
      const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
      setDisplaySuggestions(filteredSuggestions);
    } else {
      setDisplaySuggestions([]);
    }
  };

  async function showImagePickerOptions() {
    return new Promise((resolve) => {
      Alert.alert(
        "Select Photo",
        "Choose where to pick your photo from:",
        [
          {
            text: "Camera",
            onPress: () => resolve('camera'),
          },
          {
            text: "Gallery",
            onPress: () => resolve('gallery'),
          },
          {
            text: "Cancel",
            onPress: () => resolve(null),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    });
  }
  const handleSubmitEditing = () => {
    const foundplant = POPULAR_PLANTS.find(p => p.name.toLowerCase() == searchQuery.toLowerCase());

    if (foundplant) {
      setval(foundplant.id);

      console.log(displaySuggestions)
    } else {
      setval(0)
      console.log("No matching plant found.");
    }
  };

  const renderPlantCard = (plant) => {
    return (
      <TouchableOpacity
        key={plant.id}
        onPress={() => navigation.navigate('Disease Details', { val: plant.id })}
        style={styles.cardContainer}
      >
        <ImageBackground source={plant.imageUri} style={styles.cardImage} imageStyle={styles.cardImageInner}>
          <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle}>{plant.name}</Text>
            {/* You can add more details or actions here */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80}
    // >
    <ImageBackground
      source={require('../assets/back1.jpg')}
      style={styles.background}
    >
      <ScrollView style={styles.fullScreen}>

        <ScrollView horizontal={true} style={styles.carouselContainer} showsHorizontalScrollIndicator={false}>
          {POPULAR_PLANTS.map(renderPlantCard)}</ScrollView>

        <View style={styles.welcomeContainer}>
          <Text style={styles.headerText}>Welcome to Leaf Care</Text>
          <Text style={styles.infoText}>
            AI-Powered Leaf Disease Detection App
          </Text>
        </View>

        <CaptureButton onPress={handleImageSelection} imageSource={require('../assets/Leafbutton.png')} />
        {/* <View style={styles.container}>
          {imageUrl2 && (
            <Image
              source={{ uri: imageUrl2 }}
              style={styles.localimage}
            />
          )}
        </View> */}
        <Text style={styles.noPrediction}>{pre}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search plant by name"
            value={searchQuery}
            onChangeText={(e) => { setSearchQuery(e); updateSearchQuery(e); }}
            onSubmitEditing={() => { handleSubmitEditing }}
          />

          <View style={styles.liist}>
            <FlatList
              data={displaySuggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { setSearchQuery(item); handleSubmitEditing(); }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleSubmitEditing,
                navigation.navigate(
                  {
                    name: 'Disease Details',
                    params:
                      { val: val, searchQuery: searchQuery }
                  })
            }}
            style={styles.searchButton}>
            <MaterialIcons name="search" size={25} color="#FFFFFF" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>

    // </KeyboardAvoidingView>
  );
}





const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  carouselContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  plantCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,



  },
  plantImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  plantName: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
  plantHeadings: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 5,
  },
  plantText: {
    textAlign: 'left',
    //paddingVertical: 5,
  },
  identifyButton: {
    backgroundColor: '#023020',
    borderRadius: 50,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  identifyButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    //marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    // marginTop: 5, // Add margin at the top to place it below the buttons
    alignSelf: 'center', // Center the container
    width: '90%', // Increase the width to make the search box appear bigger

  },

  // Adjust the searchInput to fill the searchContainer
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    fontSize: 18,
    marginRight: 15, // Added margin here
  },
  searchButton: {
    marginLeft: 10,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#023020',
    borderRadius: 25, // Make it circular
    elevation: 2, // Optional for shadow on Android
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add padding at the bottom for scroll content
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#023020',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#023020',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  localimage: {
    width: 200, // You can adjust the size
    height: 200,
    resizeMode: 'contain'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center', // Center the icon inside the button
    alignSelf: 'center', // Center the button in its container
    padding: 10, // Padding around the icon
    // Optional: If you want a shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  cameraIcon: {
    fontSize: 60, // Large size for the camera icon
    color: '#023020', // Icon color, you can choose any color
  },
  infoSection: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#023020',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#6a994e',
    textAlign: 'center',
  },
  image1: {

    marginTop: 50,
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 150, // Optional: if you want the image to be rounded
  },
  imageContainer: {
    //alignItems: 'center',
  },

  uploadedText: {

    fontSize: 20,
    marginTop: 10,
    color: 'green',
  },
  welcomeContainer: {
    padding: 20, // Adjust padding as needed
    alignItems: 'center', // Center the content
  },
  uploadedImage: {
    width: 200, // Adjust the size as needed
    height: 200, // Adjust the size as needed
    borderRadius: 10, // Optional: if you want the image to be rounded
    marginVertical: 10, // Add margin for spacing
    backgroundColor: 'white'
  },

  modelbackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelcontainer: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    //paddingVertical:30,
    borderRadius: 20,
    elevation: 20,
  },
  closebutton: {
    // marginTop:"0%",
    // alignItems:'center',
    color: 'Black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  background: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0

  },
  cardContainer: {
    width: 180, // fixed width for the card
    height: 220, // fixed height for the card
    borderRadius: 15, // rounded corners
    overflow: 'hidden', // this will hide the image behind the border radius
    marginHorizontal: 10, // space between cards
    shadowColor: '#000', // shadow for card
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // shadow for Android
    borderColor: '#023020',
    borderWidth: 1,
  },
  cardImage: {
    flex: 1, // image will fill the container
    justifyContent: 'flex-end', // align the overlay text to the bottom
  },
  cardImageInner: {
    borderRadius: 15, // ensure the inner image also has rounded corners
  },
  cardOverlay: {
    backgroundColor: '#FFFFFF', // semi-transparent overlay for text readability
    padding: 10, // padding inside the overlay
    color: '#023020'
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#023020', // white color for the text
    fontSize: 18, // larger font size for the title
    textAlign: 'center'
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70, // Diameter of the outer circle
    height: 70, // Diameter of the outer circle
    borderRadius: 35, // Half of the width/height to make it a perfect circle
    backgroundColor: '#023020', // Your primary button color
    elevation: 4, // Shadow for Android
    // Shadows for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  captureButtonInner: {
    width: 60, // Diameter of the inner circle
    height: 60, // Diameter of the inner circle
    borderRadius: 30, // Half of the width/height to make it a perfect circle
    backgroundColor: '#388E3C', // A slightly darker shade of the button color for contrast
    alignItems: 'center',
    justifyContent: 'center',
  },
  liist: {
    //flexDirection: 'row',
    // paddingHorizontal: 20,
    //marginTop: 20, // Add margin at the top to place it below the buttons
    alignSelf: 'center', // Center the container
    //width: '90%',
    // marginLeft:10,
  },
  noPrediction: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 80,
    padding: 15,
  },
});
