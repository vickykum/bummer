// mockData.js

import { Address } from "../models/RestaurantModels";

// Mock locations data
export const mockLocations: { [key: string]: number[][]} = {
    "New York, NY, 10001": [
      [40.748817, -73.997662],
      [40.749567, -73.98833],
      [40.745416, -73.998285],
      [40.7503, -73.9969],
    ],
    "Los Angeles, CA, 90001": [
      [34.0406, -118.2468],
      [34.043, -118.256],
      [34.0485, -118.2453],
      [34.0397, -118.2595],
    ],
    "Chicago, IL, 60601": [
      [41.8864, -87.6231],
      [41.8839, -87.6325],
      [41.8846, -87.6238],
      [41.8858, -87.6229],
    ],
    "Houston, TX, 77001": [
      [29.7604, -95.3698],
      [29.7633, -95.3633],
      [29.7574, -95.3655],
      [29.7592, -95.3664],
    ],
    "Phoenix, AZ, 85001": [
      [33.4484, -112.074],
      [33.4488, -112.0733],
      [33.4495, -112.0739],
      [33.4496, -112.0729],
    ],
    "Philadelphia, PA, 19101": [
      [39.9526, -75.1652],
      [39.9512, -75.1615],
      [39.9503, -75.1642],
      [39.9529, -75.1682],
    ],
    "San Antonio, TX, 78201": [
      [29.4241, -98.4936],
      [29.4246, -98.4947],
      [29.4253, -98.4953],
      [29.4259, -98.4928],
    ],
    "San Diego, CA, 92101": [
      [32.7157, -117.1611],
      [32.7163, -117.165],
      [32.717, -117.1629],
      [32.7153, -117.1637],
    ],
    "Dallas, TX, 75201": [
      [32.7767, -96.797],
      [32.7776, -96.7977],
      [32.7793, -96.7993],
      [32.7804, -96.7988],
    ],
    "San Jose, CA, 95101": [
      [37.3382, -121.8863],
      [37.3368, -121.8854],
      [37.3375, -121.8868],
      [37.3389, -121.8881],
    ],
    "Austin, TX, 78701": [
      [30.2672, -97.7431],
      [30.2691, -97.7424],
      [30.2683, -97.742],
      [30.2697, -97.7444],
    ],
    "Jacksonville, FL, 32201": [
      [30.3322, -81.6557],
      [30.3329, -81.6569],
      [30.3337, -81.6546],
      [30.3334, -81.6575],
    ],
    "Fort Worth, TX, 76101": [
      [32.7555, -97.3308],
      [32.7564, -97.3297],
      [32.7573, -97.3313],
      [32.7578, -97.3321],
    ],
    "Columbus, OH, 43201": [
      [39.9859, -82.996],
      [39.9852, -82.9951],
      [39.9865, -82.9946],
      [39.9847, -82.9969],
    ],
    "Charlotte, NC, 28201": [
      [35.2271, -80.8431],
      [35.228, -80.8445],
      [35.2286, -80.8434],
      [35.2263, -80.8428],
    ],
    "San Francisco, CA, 94101": [
      [37.7749, -122.4194],
      [37.774, -122.4183],
      [37.7745, -122.4197],
      [37.7754, -122.4189],
    ],
  };
  
  export const mockRestaurants: { name: string, address: Address, lat: number, lon: number, url: string }[] = [
    { name: "Taco Bell", address: { housenumber: "123", street: "Main St", city: "New York", state: "NY", postcode: "10001" }, lat: 40.748817, lon: -73.997662, url: "tacobell.com" },
    { name: "McDonald's", address: { housenumber: "456", street: "Elm St", city: "New York", state: "NY", postcode: "10001" }, lat: 40.749567, lon: -73.98833, url: "mcdonalds.com" },
    { name: "Burger King", address: { housenumber: "789", street: "Oak St", city: "New York", state: "NY", postcode: "10001" }, lat: 40.745416, lon: -73.998285, url: "bk.com" },
    { name: "Pizza Hut", address: { housenumber: "101", street: "Pine St", city: "New York", state: "NY", postcode: "10001" }, lat: 40.7503, lon: -73.9969, url: "pizzahut.com" },

    { name: "Subway", address: { housenumber: "111", street: "Market St", city: "Los Angeles", state: "CA", postcode: "90001" }, lat: 34.0406, lon: -118.2468, url: "subway.com" },
    { name: "Chipotle", address: { housenumber: "222", street: "Broadway", city: "Los Angeles", state: "CA", postcode: "90001" }, lat: 34.043, lon: -118.256, url: "chipotle.com" },
    { name: "Starbucks", address: { housenumber: "333", street: "Hollywood Blvd", city: "Los Angeles", state: "CA", postcode: "90001" }, lat: 34.0485, lon: -118.2453, url: "starbucks.com" },
    { name: "Panera Bread", address: { housenumber: "444", street: "Vine St", city: "Los Angeles", state: "CA", postcode: "90001" }, lat: 34.0397, lon: -118.2595, url: "panerabread.com" },

    { name: "KFC", address: { housenumber: "555", street: "Lake Shore Dr", city: "Chicago", state: "IL", postcode: "60601" }, lat: 41.8864, lon: -87.6231, url: "kfc.com" },
    { name: "Wendy's", address: { housenumber: "666", street: "State St", city: "Chicago", state: "IL", postcode: "60601" }, lat: 41.8839, lon: -87.6325, url: "wendys.com" },
    { name: "Dunkin' Donuts", address: { housenumber: "777", street: "Michigan Ave", city: "Chicago", state: "IL", postcode: "60601" }, lat: 41.8846, lon: -87.6238, url: "dunkindonuts.com" },
    { name: "Chick-fil-A", address: { housenumber: "888", street: "Wabash Ave", city: "Chicago", state: "IL", postcode: "60601" }, lat: 41.8858, lon: -87.6229, url: "chick-fil-a.com" },

    { name: "Panda Express", address: { housenumber: "999", street: "Texas Ave", city: "Houston", state: "TX", postcode: "77001" }, lat: 29.7604, lon: -95.3698, url: "pandaexpress.com" },
    { name: "Whataburger", address: { housenumber: "111", street: "Milam St", city: "Houston", state: "TX", postcode: "77001" }, lat: 29.7633, lon: -95.3633, url: "whataburger.com" },
    { name: "TGI Fridays", address: { housenumber: "222", street: "Travis St", city: "Houston", state: "TX", postcode: "77001" }, lat: 29.7574, lon: -95.3655, url: "tgifridays.com" },
    { name: "Popeyes", address: { housenumber: "333", street: "Louisiana St", city: "Houston", state: "TX", postcode: "77001" }, lat: 29.7592, lon: -95.3664, url: "popeyes.com" },

    { name: "In-N-Out Burger", address: { housenumber: "123", street: "Central Ave", city: "Phoenix", state: "AZ", postcode: "85001" }, lat: 33.4484, lon: -112.074, url: "inandout.com" },
    { name: "Jack in the Box", address: { housenumber: "456", street: "Washington St", city: "Phoenix", state: "AZ", postcode: "85001" }, lat: 33.4488, lon: -112.0733, url: "jackinthebox.com" },
    { name: "Taco Time", address: { housenumber: "789", street: "Jefferson St", city: "Phoenix", state: "AZ", postcode: "85001" }, lat: 33.4495, lon: -112.0739, url: "tacotime.com" },
    { name: "Carl's Jr.", address: { housenumber: "101", street: "Adams St", city: "Phoenix", state: "AZ", postcode: "85001" }, lat: 33.4496, lon: -112.0729, url: "carlsjr.com" },

    { name: "Five Guys", address: { housenumber: "123", street: "Broad St", city: "Philadelphia", state: "PA", postcode: "19101" }, lat: 39.9526, lon: -75.1652, url: "fiveguys.com" },
    { name: "Shake Shack", address: { housenumber: "456", street: "Market St", city: "Philadelphia", state: "PA", postcode: "19101" }, lat: 39.9512, lon: -75.1615, url: "shakeshack.com" },
    { name: "Denny's", address: { housenumber: "789", street: "Chestnut St", city: "Philadelphia", state: "PA", postcode: "19101" }, lat: 39.9503, lon: -75.1642, url: "dennys.com" },
    { name: "Olive Garden", address: { housenumber: "101", street: "Walnut St", city: "Philadelphia", state: "PA", postcode: "19101" }, lat: 39.9529, lon: -75.1682, url: "olivegarden.com" },

    { name: "McDonald's", address: { housenumber: "111", street: "Elm St", city: "San Antonio", state: "TX", postcode: "78201" }, lat: 29.4241, lon: -98.4936, url: "mcdonalds.com" },
    { name: "Subway", address: { housenumber: "222", street: "Oak St", city: "San Antonio", state: "TX", postcode: "78201" }, lat: 29.4246, lon: -98.4947, url: "subway.com" },
    { name: "Starbucks", address: { housenumber: "333", street: "Maple St", city: "San Antonio", state: "TX", postcode: "78201" }, lat: 29.4253, lon: -98.4953, url: "starbucks.com" },
    { name: "Chipotle", address: { housenumber: "444", street: "Pine St", city: "San Antonio", state: "TX", postcode: "78201" }, lat: 29.4259, lon: -98.4928, url: "chipotle.com" },

    { name: "Pizza Hut", address: { housenumber: "123", street: "Beach Blvd", city: "San Diego", state: "CA", postcode: "92101" }, lat: 32.7157, lon: -117.1611, url: "pizzahut.com" },
    { name: "Domino's", address: { housenumber: "456", street: "Sunset Blvd", city: "San Diego", state: "CA", postcode: "92101" }, lat: 32.7158, lon: -117.1632, url: "dominos.com" },
    { name: "KFC", address: { housenumber: "789", street: "Rosecrans St", city: "San Diego", state: "CA", postcode: "92101" }, lat: 32.7156, lon: -117.1615, url: "kfc.com" },
    { name: "Panda Express", address: { housenumber: "101", street: "Pacific Hwy", city: "San Diego", state: "CA", postcode: "92101" }, lat: 32.7160, lon: -117.1631, url: "pandaexpress.com" },
];
