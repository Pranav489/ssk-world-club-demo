import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Clock, Users, Coffee, Utensils, Image as ImageIcon } from "lucide-react";
import { Flower, Briefcase, Film, Table2, Hotel, ShoppingBag, Tent, BookOpen } from "lucide-react";
import { ac_tents, ac_tents1, billiards, billiards1, business_center, business_center1, card_room, card_room1, conference_room, conference_room1, dining, foosball, foosball1, midnight_lounge, mini_theatre, mini_theatre1, play_area, play_area1, restaurant, room_suites, room_suites1, spa, spa1, sports_shop, sports_shop1, wifi_library, wifi_library1 } from "../../assets";
// import { restaurantHero } from "../../assets";

const AmenityDetailsPage = () => {
  const { amenitySlug } = useParams();
  const navigate = useNavigate();

  // Amenity data - in a real app this would come from an API or data file
  const amenitiesData = {
    "billiards-and-snooker": {
      title: "Billiards & Snooker",
      heroImage: billiards,
      images: [billiards, billiards1],
      description:
        "The SSK World Club’s Billiards & Snooker room is the perfect space for cue sports enthusiasts. Equipped with tournament-grade tables, professional lighting, and a relaxed ambience, it caters to both casual players and competitive matches. Coaching sessions are available on request, and guests can enjoy beverages from the adjoining lounge.",
      sections: [
        {
          title: "Billiards & Snooker Hall",
          icon: <Table2 className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["10am – 10pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["4 tables – 8 players at a time"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members only", "Guests allowed with members"]
            }
          ]
        }
      ]
    },

    "business-center": {
      title: "Business Center",
      heroImage: business_center1,
      images: [business_center, business_center1],
      description:
        "Stay productive while at the club with our fully equipped Business Center. Whether it’s a quick meeting, urgent presentation, or remote work, this space offers high-speed internet, conference calling, printing, and comfortable workstations.",
      sections: [
        {
          title: "Workstations & Meeting Rooms",
          icon: <Briefcase className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["8am – 8pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["20 workstations + 2 meeting rooms"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members only", "Advance booking required"]
            }
          ]
        }
      ]
    },

    "card-room": {
      title: "Card Room",
      heroImage: card_room1,
      images: [card_room, card_room1]
      ,
      description:
        "A haven for card game lovers, the Card Room offers a plush, quiet atmosphere for games like Bridge, Poker, and Rummy. With professional tables and comfortable seating, it’s ideal for both casual and tournament play.",
      sections: [
        {
          title: "Card Gaming Area",
          icon: <Users className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["2pm – 11pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["5 tables – 20 players"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members only"]
            }
          ]
        }
      ]
    },

    "conference-room": {
      title: "Conference Room",
      heroImage: conference_room,
      images: [conference_room1, conference_room],
      description:
        "Designed for corporate gatherings, training programs, and private events, our Conference Room offers state-of-the-art AV equipment, soundproof interiors, and custom seating arrangements to suit your needs.",
      sections: [
        {
          title: "Main Conference Room",
          icon: <Briefcase className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["9am – 9pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["50–70 people"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Advance booking required", "Open for members & guests"]
            }
          ]
        }
      ]
    },

    "foosball": {
      title: "Foosball",
      heroImage: foosball,
      images: [foosball1, foosball],
      description:
        "Challenge friends to a fun and fast-paced game of Foosball. The club’s dedicated Foosball zone is perfect for casual hangouts or mini-tournaments.",
      sections: [
        {
          title: "Foosball Zone",
          icon: <Table2 className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["All day – 8am to 10pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["2 tables – 8 players"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Open to all members & guests"]
            }
          ]
        }
      ]
    },

    "kids-play-area": {
      title: "Kids Play Area",
      heroImage: play_area,
      images: [play_area1, play_area],
      description:
        "A safe, fun, and colorful space for children to enjoy slides, swings, and indoor activities under supervision. The Kids Play Area is designed to keep little ones entertained while parents enjoy the club facilities.",
      sections: [
        {
          title: "Indoor & Outdoor Play",
          icon: <Users className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["10am – 8pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["Up to 30 children at a time"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members only", "Parental supervision required"]
            }
          ]
        }
      ]
    },

    "mini-theatre": {
      title: "Mini Theatre",
      heroImage: mini_theatre,
      images: [mini_theatre1, mini_theatre],
      description:
        "Enjoy the latest movies, sports screenings, and special events in our Mini Theatre. With plush seating, HD projection, and immersive sound, it’s perfect for entertainment lovers.",
      sections: [
        {
          title: "Club Cinema",
          icon: <Film className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["As per screening schedule"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["40 seats"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Open to members & guests"]
            }
          ]
        }
      ]
    },

    "restaurant-cafe": {
      title: "Restaurant & Cafe",
      heroImage: dining, // Replace with actual image path
      images: [midnight_lounge, dining, restaurant],
      description: "Undoubtedly one of the most frequented areas is the Restaurant and no Club is complete without it. The SSK World Club boasts 4 restaurant spaces – The Table which is a 48 seater private dining area, Cosmopolitan which is a 100 seater full service restaurant, the exclusive members-only Upper Crest lounge and the very trendy Skybar Cafe named so because it is open to the sky. With so much on offer you can take your pick whether it is Chinese, Italian, Indian and Fast food or a great cup of coffee or tea. All restaurants are open all day and serve Non-Veg, Veg and Jain dishes and the kitchens are segregated as such. Dining at Cosmopolitan is not limited to members only and non-members can access the restaurant premises via separate entry. The Club offers catering options for occasions on the premises and great package deals so check with the restaurant manager while making your booking.",
      sections: [
        {
          title: "Cosmopolitan (Restaurant)",
          icon: <Utensils className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: [
                "07:30am – 11:00am = Breakfast",
                "12:30pm – 03:30pm = Lunch",
                "07:00pm – 10:30pm = Dinner"
              ]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["100 seater"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: [
                "Guests are allowed with members",
                "Guests can access via separate entrance"
              ]
            }
          ]
        },
        {
          title: "Skybar Café (Cafe)",
          icon: <Coffee className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["All day"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["50 seater"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Open to all members"]
            }
          ]
        },
        {
          title: "The Table (Private Dining)",
          icon: <Utensils className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["11am – 10pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["48 seater"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Restricted access to Members"]
            }
          ]
        },
        {
          title: "Upper Crest (Members only lounge)",
          icon: <Coffee className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["11am – 10pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["24 seater"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Restricted access to Members"]
            }
          ]
        }
      ]
    },

    "room-suites": {
      title: "Room Suites",
      heroImage: room_suites,
      images: [room_suites1, room_suites],
      description:
        "Experience luxury and comfort in our fully furnished Room Suites, ideal for staycations or hosting out-of-town guests. Enjoy room service, club access, and premium amenities.",
      sections: [
        {
          title: "Executive & Deluxe Suites",
          icon: <Hotel className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Check-in / Check-out",
              content: ["Check-in: 12pm", "Check-out: 10am"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["1–4 guests per suite"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Advance booking required", "Members & guests"]
            }
          ]
        }
      ]
    },

    "spa": {
      title: "Spa",
      heroImage: spa,
      images: [spa1, spa],
      description:
        "Relax and rejuvenate with our world-class spa services, including massages, facials, and wellness therapies. The serene environment ensures a calming escape from daily life.",
      sections: [
        {
          title: "Wellness & Therapy Rooms",
          icon: <Flower className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["10am – 8pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["4 therapy rooms"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members & guests", "Advance appointment required"]
            }
          ]
        }
      ]
    },

    "sports-shop": {
      title: "Sports Shop",
      heroImage: sports_shop,
      images: [sports_shop1, sports_shop],
      description:
        "Get all your sports gear and apparel at the club’s Sports Shop. Stocked with high-quality equipment, accessories, and merchandise for a variety of sports.",
      sections: [
        {
          title: "Retail Section",
          icon: <ShoppingBag className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["9am – 9pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["Walk-in store"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Open to members & guests"]
            }
          ]
        }
      ]
    },

    "ac-tents": {
      title: "A/C Tents",
      heroImage: ac_tents,
      images: [ac_tents1, ac_tents],
      description:
        "Enjoy outdoor events in complete comfort with our fully air-conditioned tents. Ideal for parties, exhibitions, and private gatherings.",
      sections: [
        {
          title: "Event Tents",
          icon: <Tent className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Availability",
              content: ["On demand – booking required"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["50–200 people"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members & guests"]
            }
          ]
        }
      ]
    },

    "wifi-library": {
      title: "Wi-Fi Library",
      heroImage: wifi_library1,
      images: [wifi_library1, wifi_library],
      description:
        "A quiet sanctuary for book lovers, our Wi-Fi Library combines the charm of a traditional library with modern high-speed internet for research, study, or leisure reading.",
      sections: [
        {
          title: "Reading & Study Area",
          icon: <BookOpen className="h-6 w-6 text-[#FFC857]" />,
          details: [
            {
              icon: <Clock className="h-5 w-5 text-[#0A2463]" />,
              title: "Timings",
              content: ["9am – 9pm"]
            },
            {
              icon: <Users className="h-5 w-5 text-[#0A2463]" />,
              title: "Capacity",
              content: ["20 readers at a time"]
            },
            {
              icon: <ChevronRight className="h-5 w-5 text-[#0A2463]" />,
              title: "Access",
              content: ["Members only"]
            }
          ]
        }
      ]
    }
  };


  const amenity = amenitiesData[amenitySlug] || amenitiesData["restaurant-cafe"];
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={amenity.heroImage}
            alt={amenity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {amenity.title}
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="w-20 h-1 bg-[#FFC857] mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Image Gallery */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="h-6 w-6 text-[#FFC857]" />
              <h2 className="text-2xl font-bold text-[#0A2463]">Gallery</h2>
            </div>

            {/* Main Image */}
            <div className="relative h-96 w-full rounded-xl overflow-hidden mb-4">
              <img
                src={amenity.images[selectedImage]}
                alt={`${amenity.title} ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {amenity.images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-24 cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-[#FFC857]' : 'border-transparent'
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-[#FFC857]/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {amenity.description}
            </p>
          </motion.div>

          {/* Details Sections */}
          {amenity.sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#0A2463] p-2 rounded-full">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-[#0A2463]">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {detail.icon}
                      <h3 className="font-bold text-[#0A2463]">
                        {detail.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {detail.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-br from-[#0A2463] to-[#2E4052]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Experience {amenity.title} at SSK World Club
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
                onClick={() => navigate('/contact')}
              >
                Book a Visit
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-3 rounded-sm font-bold"
                onClick={() => navigate('/contact')}
              >
                Contact Manager
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AmenityDetailsPage;