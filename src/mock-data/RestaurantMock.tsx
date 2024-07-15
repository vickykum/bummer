// mockData.js

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
  
  // Mock restaurants data grouped by ZIP codes
  export const mockRestaurants: { name: string, address: string, lat: number, lon: number, url: string }[] = [
    { name: "Taco Bell", address: "123 Main St, New York, NY 10001", lat: 40.748817, lon: -73.997662, url: "tacobell.com" },
    { name: "McDonald's", address: "456 Elm St, New York, NY 10001", lat: 40.749567, lon: -73.98833, url: "mcdonalds.com" },
    { name: "Burger King", address: "789 Oak St, New York, NY 10001", lat: 40.745416, lon: -73.998285, url: "bk.com" },
    { name: "Pizza Hut", address: "101 Pine St, New York, NY 10001", lat: 40.7503, lon: -73.9969, url: "pizzahut.com" },
  
    { name: "Subway", address: "111 Market St, Los Angeles, CA 90001", lat: 34.0406, lon: -118.2468, url: "subway.com" },
    { name: "Chipotle", address: "222 Broadway, Los Angeles, CA 90001", lat: 34.043, lon: -118.256, url: "chipotle.com" },
    { name: "Starbucks", address: "333 Hollywood Blvd, Los Angeles, CA 90001", lat: 34.0485, lon: -118.2453, url: "starbucks.com" },
    { name: "Panera Bread", address: "444 Vine St, Los Angeles, CA 90001", lat: 34.0397, lon: -118.2595, url: "panerabread.com" },
  
    { name: "KFC", address: "555 Lake Shore Dr, Chicago, IL 60601", lat: 41.8864, lon: -87.6231, url: "kfc.com" },
    { name: "Wendy's", address: "666 State St, Chicago, IL 60601", lat: 41.8839, lon: -87.6325, url: "wendys.com" },
    { name: "Dunkin' Donuts", address: "777 Michigan Ave, Chicago, IL 60601", lat: 41.8846, lon: -87.6238, url: "dunkindonuts.com" },
    { name: "Chick-fil-A", address: "888 Wabash Ave, Chicago, IL 60601", lat: 41.8858, lon: -87.6229, url: "chick-fil-a.com" },
  
    { name: "Panda Express", address: "999 Texas Ave, Houston, TX 77001", lat: 29.7604, lon: -95.3698, url: "pandaexpress.com" },
    { name: "Whataburger", address: "111 Milam St, Houston, TX 77001", lat: 29.7633, lon: -95.3633, url: "whataburger.com" },
    { name: "TGI Fridays", address: "222 Travis St, Houston, TX 77001", lat: 29.7574, lon: -95.3655, url: "tgifridays.com" },
    { name: "Popeyes", address: "333 Louisiana St, Houston, TX 77001", lat: 29.7592, lon: -95.3664, url: "popeyes.com" },
  
    { name: "In-N-Out Burger", address: "123 Central Ave, Phoenix, AZ 85001", lat: 33.4484, lon: -112.074, url: "inandout.com" },
    { name: "Jack in the Box", address: "456 Washington St, Phoenix, AZ 85001", lat: 33.4488, lon: -112.0733, url: "jackinthebox.com" },
    { name: "Taco Time", address: "789 Jefferson St, Phoenix, AZ 85001", lat: 33.4495, lon: -112.0739, url: "tacotime.com" },
    { name: "Carl's Jr.", address: "101 Adams St, Phoenix, AZ 85001", lat: 33.4496, lon: -112.0729, url: "carlsjr.com" },
  
    { name: "Five Guys", address: "123 Broad St, Philadelphia, PA 19101", lat: 39.9526, lon: -75.1652, url: "fiveguys.com" },
    { name: "Shake Shack", address: "456 Market St, Philadelphia, PA 19101", lat: 39.9512, lon: -75.1615, url: "shakeshack.com" },
    { name: "Denny's", address: "789 Chestnut St, Philadelphia, PA 19101", lat: 39.9503, lon: -75.1642, url: "dennys.com" },
    { name: "Olive Garden", address: "101 Walnut St, Philadelphia, PA 19101", lat: 39.9529, lon: -75.1682, url: "olivegarden.com" },

    { name: "McDonald's", address: "111 Elm St, San Antonio, TX 78201", lat: 29.4241, lon: -98.4936, url: "mcdonalds.com" },
    { name: "Subway", address: "222 Oak St, San Antonio, TX 78201", lat: 29.4246, lon: -98.4947, url: "subway.com" },
    { name: "Starbucks", address: "333 Maple St, San Antonio, TX 78201", lat: 29.4253, lon: -98.4953, url: "starbucks.com" },
    { name: "Chipotle", address: "444 Pine St, San Antonio, TX 78201", lat: 29.4259, lon: -98.4928, url: "chipotle.com" },

    { name: "Pizza Hut", address: "123 Beach Blvd, San Diego, CA 92101", lat: 32.7157, lon: -117.1611, url: "pizzahut.com" },
    { name: "Burger King", address: "456 Ocean Ave, San Diego, CA 92101", lat: 32.7163, lon: -117.165, url: "bk.com" },
    { name: "Taco Bell", address: "789 Boardwalk St, San Diego, CA 92101", lat: 32.717, lon: -117.1629, url: "tacobell.com" },
    { name: "Panera Bread", address: "101 Seaside St, San Diego, CA 92101", lat: 32.7153, lon: -117.1637, url: "panerabread.com" },

    { name: "Chick-fil-A", address: "111 Main St, Dallas, TX 75201", lat: 32.7767, lon: -96.797, url: "chick-fil-a.com" },
    { name: "Wendy's", address: "222 Elm St, Dallas, TX 75201", lat: 32.7776, lon: -96.7977, url: "wendys.com" },
    { name: "Dunkin' Donuts", address: "333 Oak St, Dallas, TX 75201", lat: 32.7793, lon: -96.7993, url: "dunkindonuts.com" },
    { name: "KFC", address: "444 Maple St, Dallas, TX 75201", lat: 32.7804, lon: -96.7988, url: "kfc.com" },

    { name: "Starbucks", address: "123 Vine St, San Jose, CA 95101", lat: 37.3382, lon: -121.8863, url: "starbucks.com" },
    { name: "Taco Bell", address: "456 Market St, San Jose, CA 95101", lat: 37.3368, lon: -121.8854, url: "tacobell.com" },
    { name: "McDonald's", address: "789 Broadway St, San Jose, CA 95101", lat: 37.3375, lon: -121.8868, url: "mcdonalds.com" },
    { name: "Subway", address: "101 Park St, San Jose, CA 95101", lat: 37.3389, lon: -121.8881, url: "subway.com" },

    { name: "Burger King", address: "111 River St, Austin, TX 78701", lat: 30.2672, lon: -97.7431, url: "bk.com" },
    { name: "Panda Express", address: "222 Lake St, Austin, TX 78701", lat: 30.2691, lon: -97.7424, url: "pandaexpress.com" },
    { name: "Whataburger", address: "333 Hill St, Austin, TX 78701", lat: 30.2683, lon: -97.742, url: "whataburger.com" },
    { name: "TGI Fridays", address: "444 Parkside St, Austin, TX 78701", lat: 30.2697, lon: -97.7444, url: "tgifridays.com" },

    { name: "Denny's", address: "123 Palm St, Jacksonville, FL 32201", lat: 30.3322, lon: -81.6557, url: "dennys.com" },
    { name: "Five Guys", address: "456 Pine St, Jacksonville, FL 32201", lat: 30.3329, lon: -81.6569, url: "fiveguys.com" },
    { name: "Carl's Jr.", address: "789 Cedar St, Jacksonville, FL 32201", lat: 30.3337, lon: -81.6546, url: "carlsjr.com" },
    { name: "In-N-Out Burger", address: "101 Maple St, Jacksonville, FL 32201", lat: 30.3334, lon: -81.6575, url: "inandout.com" },

    { name: "Jack in the Box", address: "111 Jefferson St, Fort Worth, TX 76101", lat: 32.7555, lon: -97.3308, url: "jackinthebox.com" },
    { name: "Popeyes", address: "222 Madison St, Fort Worth, TX 76101", lat: 32.7564, lon: -97.3297, url: "popeyes.com" },
    { name: "Olive Garden", address: "333 Monroe St, Fort Worth, TX 76101", lat: 32.7573, lon: -97.3313, url: "olivegarden.com" },
    { name: "Carl's Jr.", address: "444 Washington St, Fort Worth, TX 76101", lat: 32.7578, lon: -97.3321, url: "carlsjr.com" },

    { name: "Shake Shack", address: "123 Adams St, Columbus, OH 43201", lat: 39.9859, lon: -82.996, url: "shakeshack.com" },
    { name: "Pizza Hut", address: "456 Chestnut St, Columbus, OH 43201", lat: 39.9852, lon: -82.9951, url: "pizzahut.com" },
    { name: "Chipotle", address: "789 Walnut St, Columbus, OH 43201", lat: 39.9865, lon: -82.9946, url: "chipotle.com" },
    { name: "Starbucks", address: "101 High St, Columbus, OH 43201", lat: 39.9847, lon: -82.9969, url: "starbucks.com" },

    { name: "Taco Bell", address: "111 Main St, Charlotte, NC 28201", lat: 35.2271, lon: -80.8431, url: "tacobell.com" },
    { name: "Subway", address: "222 Elm St, Charlotte, NC 28201", lat: 35.228, lon: -80.8445, url: "subway.com" },
    { name: "McDonald's", address: "333 Oak St, Charlotte, NC 28201", lat: 35.2286, lon: -80.8434, url: "mcdonalds.com" },
    { name: "Burger King", address: "444 Pine St, Charlotte, NC 28201", lat: 35.2263, lon: -80.8428, url: "bk.com" },

    { name: "Panera Bread", address: "123 Market St, San Francisco, CA 94101", lat: 37.7749, lon: -122.4194, url: "panerabread.com" },
    { name: "Wendy's", address: "456 Broadway St, San Francisco, CA 94101", lat: 37.774, lon: -122.4183, url: "wendys.com" },
    { name: "Dunkin' Donuts", address: "789 Pine St, San Francisco, CA 94101", lat: 37.7745, lon: -122.4197, url: "dunkindonuts.com" },
    { name: "Chick-fil-A", address: "101 Market St, San Francisco, CA 94101", lat: 37.7754, lon: -122.4189, url: "chick-fil-a.com" },
];
