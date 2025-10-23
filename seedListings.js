require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing"); // Ensure this path is correct

// --- WORKING IMAGE URLS ARRAY (Used to populate listing data) ---
const workingImageUrls = [
    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2hJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW5mfDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
];

// Function to extract filename from the end of a URL for consistency
const getFilenameFromUrl = (url) => {
    const path = url.split('?')[0];
    const parts = path.split('/');
    return parts[parts.length - 1] || "listing_photo";
}

// --- EXPANDED LISTINGS DATA WITH UPDATED IMAGES ---
const listings = [
    {
        title: "Charming Hillside Cabin Retreat",
        description: "A cozy log cabin nestled in the mountains with stunning panoramic views. Perfect for a secluded escape.",
        image: {
            url: workingImageUrls[0],
            filename: getFilenameFromUrl(workingImageUrls[0])
        },
        price: 180,
        location: "Asheville",
        country: "United States",
        category: "Mountains",
        reviews: ["6535d51842e4e84931a7f6f1", "6535d51842e4e84931a7f6f2"],
        owner: "6535d51842e4e84931a7f6f3",
        geometry: {
            type: "Point",
            coordinates: [-82.5515, 35.6009] // Longitude, Latitude (Asheville, NC)
        }
    },
    {
        title: "Luxury Penthouse in Paris with Eiffel View",
        description: "Experience the iconic city in style! A modern, luxurious apartment just steps from the Eiffel Tower.",
        image: {
            url: workingImageUrls[1],
            filename: getFilenameFromUrl(workingImageUrls[1])
        },
        price: 450,
        location: "Paris",
        country: "France",
        category: "Iconic Cities",
        reviews: [],
        owner: "6535d51842e4e84931a7f6f4",
        geometry: {
            type: "Point",
            coordinates: [2.2945, 48.8584] // Longitude, Latitude (Eiffel Tower area, Paris)
        }
    },
    {
        title: "Beachfront Bungalow with Private Pool",
        description: "Relax on the sand just outside your door. Features a small, amazing private pool and tropical garden.",
        image: {
            url: workingImageUrls[2],
            filename: getFilenameFromUrl(workingImageUrls[2])
        },
        price: 320,
        location: "Phuket",
        country: "Thailand",
        category: "Amazing Pools",
        reviews: ["6535d51842e4e84931a7f6f5"],
        owner: "6535d51842e4e84931a7f6f6",
        geometry: {
            type: "Point",
            coordinates: [98.3923, 7.8804] // Longitude, Latitude (Phuket, Thailand)
        }
    },
    {
        title: "Historic Scottish Castle Tower Room",
        description: "Sleep like royalty in a beautifully restored room within a genuine medieval castle in the Highlands.",
        image: {
            url: workingImageUrls[3],
            filename: getFilenameFromUrl(workingImageUrls[3])
        },
        price: 250,
        location: "Inverness",
        country: "United Kingdom",
        category: "Castles",
        reviews: ["6535d51842e4e84931a7f6f7", "6535d51842e4e84931a7f6f8"],
        owner: "6535d51842e4e84931a7f6f9",
        geometry: {
            type: "Point",
            coordinates: [-4.2247, 57.4778] // Longitude, Latitude (Inverness, Scotland)
        }
    },
    {
        title: "Minimalist Studio in Tokyo",
        description: "A compact, modern, and efficient room in the heart of Shibuya, perfect for solo travelers or couples.",
        image: {
            url: workingImageUrls[4],
            filename: getFilenameFromUrl(workingImageUrls[4])
        },
        price: 95,
        location: "Tokyo",
        country: "Japan",
        category: "Rooms",
        reviews: ["6535d51842e4e84931a7f6fa"],
        owner: "6535d51842e4e84931a7f6fb",
        geometry: {
            type: "Point",
            coordinates: [139.7016, 35.6586] // Longitude, Latitude (Shibuya, Tokyo)
        }
    },
    {
        title: "Secluded Glamping Tent in the Desert",
        description: "Experience luxury camping under the stars. Fully-equipped tent with all the comforts of home.",
        image: {
            url: workingImageUrls[5],
            filename: getFilenameFromUrl(workingImageUrls[5])
        },
        price: 120,
        location: "Moab",
        country: "United States",
        category: "Camping",
        reviews: ["6535d51842e4e84931a7f6fc"],
        owner: "6535d51842e4e84931a7f6fd",
        geometry: {
            type: "Point",
            coordinates: [-109.5498, 38.5733] // Longitude, Latitude (Moab, Utah)
        }
    },
    {
        title: "Arctic Igloo with Northern Lights View",
        description: "A once-in-a-lifetime stay in a heated glass igloo, offering unobstructed views of the night sky.",
        image: {
            url: workingImageUrls[6],
            filename: getFilenameFromUrl(workingImageUrls[6])
        },
        price: 600,
        location: "Rovaniemi",
        country: "Finland",
        category: "Arctic",
        reviews: ["6535d51842e4e84931a7f6fe", "6535d51842e4e84931a7f6ff", "6535d51842e4e84931a7f700"],
        owner: "6535d51842e4e84931a7f701",
        geometry: {
            type: "Point",
            coordinates: [25.7208, 66.5039] // Longitude, Latitude (Rovaniemi, Finland)
        }
    },
    {
        title: "Ocean View Surf Shack on the Coast",
        description: "A rustic but comfortable shack right by a world-famous surf spot. Perfect for wave enthusiasts.",
        image: {
            url: workingImageUrls[7],
            filename: getFilenameFromUrl(workingImageUrls[7])
        },
        price: 150,
        location: "Sayulita",
        country: "Mexico",
        category: "Surfing",
        reviews: [],
        owner: "6535d51842e4e84931a7f702",
        geometry: {
            type: "Point",
            coordinates: [-105.4418, 20.8261] // Longitude, Latitude (Sayulita, Mexico)
        }
    },
    {
        title: "Restored Stone Farmhouse in Tuscany",
        description: "Authentic Tuscan farmhouse experience with stunning vineyard views and a rustic charm.",
        image: {
            url: workingImageUrls[8],
            filename: getFilenameFromUrl(workingImageUrls[8])
        },
        price: 220,
        location: "Florence",
        country: "Italy",
        category: "Farms",
        reviews: ["6535d51842e4e84931a7f703"],
        owner: "6535d51842e4e84931a7f704",
        geometry: {
            type: "Point",
            coordinates: [11.2558, 43.7696] // Longitude, Latitude (Florence area, Italy)
        }
    },
    {
        title: "Modern Apartment with Rooftop Pool",
        description: "Sleek apartment in a high-rise building with access to a stunning communal rooftop infinity pool.",
        image: {
            url: workingImageUrls[9],
            filename: getFilenameFromUrl(workingImageUrls[9])
        },
        price: 280,
        location: "Singapore",
        country: "Singapore",
        category: "Amazing Pools",
        reviews: ["6535d51842e4e84931a7f705", "6535d51842e4e84931a7f706"],
        owner: "6535d51842e4e84931a7f707",
        geometry: {
            type: "Point",
            coordinates: [103.8198, 1.3521] // Longitude, Latitude (Singapore)
        }
    },
    {
        title: "Cave House Retreat in Santorini",
        description: "Traditional Cycladic cave house built into the cliffside with a breathtaking view of the Aegean Sea and caldera.",
        image: {
            url: workingImageUrls[10],
            filename: getFilenameFromUrl(workingImageUrls[10])
        },
        price: 380,
        location: "Oia",
        country: "Greece",
        category: "Amazing Views",
        reviews: ["6535d51842e4e84931a7f708", "6535d51842e4e84931a7f709"],
        owner: "6535d51842e4e84931a7f70a",
        geometry: {
            type: "Point",
            coordinates: [25.3756, 36.4678] // Longitude, Latitude (Oia, Santorini)
        }
    },
    {
        title: "Treehouse Canopy Stay in Costa Rica",
        description: "Sleep among the sloths and monkeys! An eco-friendly treehouse deep within the rainforest canopy.",
        image: {
            url: workingImageUrls[11],
            filename: getFilenameFromUrl(workingImageUrls[11])
        },
        price: 190,
        location: "La Fortuna",
        country: "Costa Rica",
        category: "Treehouses",
        reviews: ["6535d51842e4e84931a7f70b"],
        owner: "6535d51842e4e84931a7f70c",
        geometry: {
            type: "Point",
            coordinates: [-84.6433, 10.4795] // Longitude, Latitude (La Fortuna, Costa Rica)
        }
    },
    {
        title: "Floating Home on Amsterdam Canals",
        description: "Charming houseboat offering a unique perspective on Amsterdam life, complete with a small deck.",
        image: {
            url: workingImageUrls[12],
            filename: getFilenameFromUrl(workingImageUrls[12])
        },
        price: 210,
        location: "Amsterdam",
        country: "Netherlands",
        category: "Boats",
        reviews: [],
        owner: "6535d51842e4e84931a7f70d",
        geometry: {
            type: "Point",
            coordinates: [4.8952, 52.3702] // Longitude, Latitude (Amsterdam)
        }
    },
    {
        title: "Ski-In/Ski-Out Chalet in the Alps",
        description: "Modern, spacious chalet with direct access to the slopes. Features a large fireplace and sauna.",
        image: {
            url: workingImageUrls[13],
            filename: getFilenameFromUrl(workingImageUrls[13])
        },
        price: 550,
        location: "Zermatt",
        country: "Switzerland",
        category: "Skiing",
        reviews: ["6535d51842e4e84931a7f70e", "6535d51842e4e84931a7f70f", "6535d51842e4e84931a7f710"],
        owner: "6535d51842e4e84931a7f711",
        geometry: {
            type: "Point",
            coordinates: [7.7479, 46.0207] // Longitude, Latitude (Zermatt, Switzerland)
        }
    },
    {
        title: "Luxury Riad in Marrakech Medina",
        description: "A beautifully restored traditional Moroccan house with a central courtyard and rooftop terrace.",
        image: {
            url: workingImageUrls[14],
            filename: getFilenameFromUrl(workingImageUrls[14])
        },
        price: 160,
        location: "Marrakech",
        country: "Morocco",
        category: "Historic Homes",
        reviews: ["6535d51842e4e84931a7f712"],
        owner: "6535d51842e4e84931a7f713",
        geometry: {
            type: "Point",
            coordinates: [-7.9814, 31.6295] // Longitude, Latitude (Marrakech, Morocco)
        }
    },
    {
        title: "Desert Dome Near Joshua Tree",
        description: "An architectural wonder. Stay in a sustainable dome home with incredible stargazing opportunities.",
        image: {
            url: workingImageUrls[15],
            filename: getFilenameFromUrl(workingImageUrls[15])
        },
        price: 240,
        location: "Yucca Valley",
        country: "United States",
        category: "Domes",
        reviews: ["6535d51842e4e84931a7f714"],
        owner: "6535d51842e4e84931a7f715",
        geometry: {
            type: "Point",
            coordinates: [-116.3533, 34.1167] // Longitude, Latitude (Yucca Valley, CA)
        }
    },
    {
        title: "Rainforest Eco-Lodge with Hot Springs",
        description: "Immersive stay in the Amazon. All-inclusive experience with guided tours and natural hot springs access.",
        image: {
            url: workingImageUrls[16],
            filename: getFilenameFromUrl(workingImageUrls[16])
        },
        price: 420,
        location: "Tena",
        country: "Ecuador",
        category: "Camping",
        reviews: ["6535d51842e4e84931a7f716", "6535d51842e4e84931a7f717"],
        owner: "6535d51842e4e84931a7f718",
        geometry: {
            type: "Point",
            coordinates: [-77.8398, -0.9859] // Longitude, Latitude (Tena, Ecuador)
        }
    },
    {
        title: "Windmill with Panoramic Polder View",
        description: "Stay in a genuine, converted Dutch windmill. Offers unique circular rooms and beautiful country views.",
        image: {
            url: workingImageUrls[17],
            filename: getFilenameFromUrl(workingImageUrls[17])
        },
        price: 290,
        location: "Kinderdijk",
        country: "Netherlands",
        category: "Unique Stays",
        reviews: ["6535d51842e4e84931a7f719"],
        owner: "6535d51842e4e84931a7f71a",
        geometry: {
            type: "Point",
            coordinates: [4.6908, 51.8906] // Longitude, Latitude (Kinderdijk, Netherlands)
        }
    },
    {
        title: "Luxury Villa with Infinity Pool Bali",
        description: "An extravagant villa nestled in the rice paddies of Ubud, featuring an amazing private infinity pool.",
        image: {
            url: workingImageUrls[18],
            filename: getFilenameFromUrl(workingImageUrls[18])
        },
        price: 350,
        location: "Ubud",
        country: "Indonesia",
        category: "Amazing Pools",
        reviews: ["6535d51842e4e84931a7f71b", "6535d51842e4e84931a7f71c"],
        owner: "6535d51842e4e84931a7f71d",
        geometry: {
            type: "Point",
            coordinates: [115.2631, -8.5085] // Longitude, Latitude (Ubud, Bali)
        }
    },
    {
        title: "Modern Loft in New York City",
        description: "A chic, industrial-style loft in SoHo, steps away from the best shopping and dining.",
        image: {
            url: workingImageUrls[19],
            filename: getFilenameFromUrl(workingImageUrls[19])
        },
        price: 400,
        location: "New York",
        country: "United States",
        category: "Iconic Cities",
        reviews: ["6535d51842e4e84931a7f71e"],
        owner: "6535d51842e4e84931a7f71f",
        geometry: {
            type: "Point",
            coordinates: [-74.0060, 40.7128] // Longitude, Latitude (New York City)
        }
    }
];
// --- END OF LISTINGS DATA ---

// --- SEED FUNCTION LOGIC ---
const seedDB = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.ATLASDB_URL);
        console.log("✅ Connected to MongoDB Atlas");

        // Clear existing listings to prevent duplicates on re-run
        await Listing.deleteMany({});
        console.log("🗑️ Cleared existing listings");

        // Convert string IDs to mongoose.Types.ObjectId for bulk insert
        const listingsWithObjectIds = listings.map(listing => {
            const reviewsArray = Array.isArray(listing.reviews) ? listing.reviews : [];

            return {
                ...listing,
                // Map review IDs to Mongoose ObjectId
                reviews: reviewsArray
                    .filter(id => id && typeof id === 'string' && id.length === 24)
                    .map(id => new mongoose.Types.ObjectId(id)),
                // Convert owner ID to Mongoose ObjectId
                owner: new mongoose.Types.ObjectId(listing.owner)
            };
        });

        // Insert new listings
        await Listing.insertMany(listingsWithObjectIds);
        console.log(`🎉 Seeded ${listingsWithObjectIds.length} listings successfully!`);

    } catch (err) {
        console.error("❌ MongoDB operation error:", err);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("👋 Connection closed.");
    }
};

// Execute the seed function
seedDB();