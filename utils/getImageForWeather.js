const images = {
    Clear: require("../assets/clear.png"),
    Hail: require("../assets/hail.png"),
    "Heavy Cloud": require("../assets/heavy-cloud.png"),
    "Light Cloud": require("../assets/light-cloud.png"),
    "Heavy Rain": require("../assets/heavy-rain.png"),
    "Light Rain": require("../assets/light-rain.png"),
    Showers: require("../assets/showers.png"),
    Sleet: require("../assets/sleet.png"),
    Snow: require("../assets/snow.png"),
    Thunder: require("../assets/thunder.png"),
    Default: require("../assets/default.jpg"),
};

export default function getImage(weather) {
    return images[weather];
}