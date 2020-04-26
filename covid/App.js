import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Geocoder from 'react-native-geocoding';

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {Marker} from "react-native-maps";
import {Callout} from "react-native-maps";

Geocoder.init('AIzaSyB8tDrHBlBTFcRQvwXUt13qHSxtC9fdVho');

//importing the slugs needed for API - geocoding will output normal country name, not slug
import slugdata from './country_slugs.json';
const countrySlugs = slugdata; 

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 130;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = width/2.5;

//Postman API requires slightly different country names which it calls slugs
const countrySlug = (countryName) => {
		var el = countrySlugs.find(el => el.Country === countryName);
		return el.Slug;
   };

export default class msRona extends Component {
  constructor(props){
    super(props);
    this.state = {
    region: {
      latitude: 10.000,
      longitude: -66.102662,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
      callouts: [],	  
	  country: "",
	  c_confirmed:0,
	  c_dead:0,
	  w_confirmed:0,
	  w_dead:0,
    }
    this.onPress = this.onPress.bind(this)
  }

	// Worldwide cases API usage
	componentDidMount() {
	var url = "https://api.covid19api.com/world/total"    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
			//console.log(data["TotalConfirmed"])
            this.setState(()=>{
			return{
               w_confirmed: data["TotalConfirmed"],
               w_dead: data["TotalDeaths"],
			}
            });
        }).catch((error)=>console.log(error));   
    }

	// Country cases API usage
    countryData(){
	var apislug = countrySlug(this.state.country);
	var url = "https://api.covid19api.com/total/country/"+apislug; 
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
			  c_confirmed: data[data.length-1]["Confirmed"],
			  c_dead: data[data.length-1]["Deaths"],
            }).then(); 
    }).catch((error)=>console.log(error) );
    }
  
	//Code for recognizing a request for a particular country
    onPress(event){
		this.setState({
		callouts: [{}],
		});
		Geocoder.from(event.nativeEvent.coordinate).then(json => {
		  var address = json.results[0].address_components;
		  //console.log(json.results[0].address_components);
		  var i;
		  var geocountry = "";
		  for(i=0; i<json.results[0].address_components.length;i++){
			  //console.log(json.results[0].address_components[i].types[0]);
			  if(json.results[0].address_components[i].types[0] == "country"){
				geocountry = json.results[0].address_components[i].long_name
				break;			
			  }
		  }
		   this.setState({
			country: geocountry,},
			() => this.countryData()
			);
		})
		.catch(error => {
			this.setState({
			  country: "",
			});
		  })
		.done();
    return;
	}

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          onLongPress={this.onPress}
          style={styles.container}
        >
		</MapView>
        <Animated.ScrollView
          horizontal
          onLongPress={this.onPress}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.callouts.map((marker) => (
            <View style={styles.card}>
              <View style={styles.textContent}>
				  <Text style={styles.cardtitle}>
						{this.state.country}
				  </Text>
				  <Text style={styles.cardDescription}>
					Cases: {this.state.c_confirmed}
				  </Text>
				  <Text style={styles.cardDescription}>
					Dead: {this.state.c_dead}
				  </Text>
				  <Text style={styles.cardtitle}>
					Worldwide
				  </Text>
				  <Text style={styles.cardDescription}>
					Cases: {this.state.w_confirmed}
				  </Text>
				  <Text style={styles.cardDescription}>
					Dead: {this.state.w_dead}
				  </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#E33",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#FFF",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

AppRegistry.registerComponent("mapfocus", () => msRona);