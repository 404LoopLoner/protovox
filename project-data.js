window.PROTOVOX_PROJECTS = [
  {
    "slug": "smart-disaster-monitoring",
    "title": "Smart Disaster Monitoring System",
    "domain": "IoT · ECE",
    "level": "Intermediate",
    "overview": "A connected field node that monitors environmental conditions and sends an alert when configured thresholds are crossed. A prototype can demonstrate sensing, data logging and notification workflows.",
    "working": "The ESP32 reads temperature and humidity, vibration and water-level inputs. Firmware filters readings, compares them with configured thresholds and publishes events over Wi-Fi using MQTT. Add calibration, fault handling and a reliable power plan before field use.",
    "components": [
      [
        "ESP32 development board",
        "Main controller · Wi-Fi"
      ],
      [
        "DHT11 sensor",
        "Temperature and humidity"
      ],
      [
        "SW-420 vibration sensor",
        "Vibration event input"
      ],
      [
        "Water-level sensor",
        "Level detection input"
      ],
      [
        "Buzzer / LED",
        "Local alert output"
      ],
      [
        "MQTT broker / dashboard",
        "Telemetry and notifications"
      ]
    ],
    "kit": "IoT Disaster Monitoring Kit",
    "price": "₹1,499",
    "contents": [
      "ESP32 development board",
      "DHT11 temperature and humidity sensor",
      "SW-420 vibration sensor",
      "Water-level sensor module",
      "Buzzer and indicator LED",
      "Breadboard and jumper wires",
      "USB cable and starter wiring guide"
    ],
    "kitdesc": "A starter bundle for assembling the sensing and alert prototype. Power supply and final component variants should be confirmed before ordering.",
    "icon": "⌁"
  },
  {
    "slug": "neural-signal-classifier",
    "title": "Neural Signal Classifier",
    "domain": "AI & ML · ECE",
    "level": "Advanced",
    "overview": "A learning-focused signal-processing project that cleans sample EEG-like data, extracts features and classifies patterns for a visual dashboard. It is intended for education and experimentation.",
    "working": "Load sample or synthetic signal data, apply filtering, segment the signal, calculate time/frequency features, train a classifier and evaluate it with held-out data. Visualize confidence and model limitations clearly.",
    "components": [
      [
        "Laptop / single-board computer",
        "Runs the processing pipeline"
      ],
      [
        "Python",
        "Application language"
      ],
      [
        "NumPy / SciPy",
        "Numerical processing and filters"
      ],
      [
        "scikit-learn",
        "Feature-based classifier"
      ],
      [
        "Sample EEG dataset",
        "Synthetic or appropriately licensed sample data"
      ],
      [
        "Dashboard UI",
        "Plots, metrics and predictions"
      ]
    ],
    "kit": "Neural Signal Lab Pack",
    "price": "₹1,899",
    "contents": [
      "Project starter code and setup guide",
      "Curated synthetic sample dataset",
      "Python environment checklist",
      "Signal-processing worksheet",
      "Model evaluation template",
      "Dashboard starter files"
    ],
    "kitdesc": "A software-first learning pack. It does not include medical-grade EEG hardware and is not intended for diagnosis or clinical use.",
    "icon": "∿"
  },
  {
    "slug": "gesture-controlled-robot",
    "title": "Gesture-Controlled Robot",
    "domain": "Robotics · ECE",
    "level": "Intermediate",
    "overview": "A small mobile robot that translates hand tilt into wireless movement commands. The build combines motion sensing, communication and motor control.",
    "working": "An MPU6050 measures orientation, a controller maps the readings to movement commands and a wireless link sends them to the robot. The robot controller drives the motors through a motor driver. Include a stop command and test at low speed.",
    "components": [
      [
        "Arduino-compatible controller",
        "Reads gesture and controls motors"
      ],
      [
        "MPU6050 IMU",
        "Measures tilt and motion"
      ],
      [
        "L298N motor driver",
        "Drives the DC motors"
      ],
      [
        "DC geared motors",
        "Robot movement"
      ],
      [
        "Robot chassis and wheels",
        "Mechanical platform"
      ],
      [
        "Battery pack and switch",
        "Portable power and cutoff"
      ],
      [
        "RF / Bluetooth link",
        "Wireless commands"
      ]
    ],
    "kit": "Robotics Explorer Kit",
    "price": "₹2,299",
    "contents": [
      "Arduino-compatible board",
      "MPU6050 IMU module",
      "L298N motor driver",
      "2 DC geared motors and wheels",
      "Robot chassis",
      "Battery holder and switch",
      "Jumper wires and assembly guide"
    ],
    "kitdesc": "A hands-on mobile robotics bundle. Battery type, motor voltage and mechanical compatibility must be checked as a matched set.",
    "icon": "⚙"
  },
  {
    "slug": "solar-energy-tracker",
    "title": "Solar Energy Tracker",
    "domain": "Energy · ESP32",
    "level": "Intermediate",
    "overview": "A measurement prototype that records light intensity and electrical output so users can compare solar panel positioning and environmental conditions.",
    "working": "An LDR estimates light intensity while the INA219 measures voltage and current. The ESP32 logs readings over time and displays trends. A servo-based tracking mechanism can be added as an optional extension.",
    "components": [
      [
        "ESP32 development board",
        "Controller and Wi-Fi"
      ],
      [
        "INA219 module",
        "Voltage and current measurement"
      ],
      [
        "LDR sensor",
        "Relative light intensity"
      ],
      [
        "Small solar panel",
        "Energy source under test"
      ],
      [
        "Servo motor (optional)",
        "Panel positioning experiment"
      ],
      [
        "MQTT / dashboard",
        "Data logging and visualization"
      ]
    ],
    "kit": "Solar Tracker Kit",
    "price": "₹1,899",
    "contents": [
      "ESP32 development board",
      "INA219 voltage/current sensor",
      "LDR module",
      "Mini solar panel",
      "Servo motor (optional extension)",
      "Breadboard and jumper wires",
      "Wiring and calibration guide"
    ],
    "kitdesc": "A measurement-focused kit for low-voltage experiments. Output depends on panel size, light and setup; no fixed performance is promised.",
    "icon": "☼"
  },
  {
    "slug": "ai-plant-health-assistant",
    "title": "AI Plant Health Assistant",
    "domain": "AI & ML · IoT",
    "level": "Intermediate",
    "overview": "An image-based learning prototype that identifies visual patterns in plant leaves and presents possible categories for further inspection.",
    "working": "Collect and label a small image dataset, resize and normalize images, train or fine-tune a classifier, then show its prediction with confidence and a reminder that results may be uncertain.",
    "components": [
      [
        "Laptop / SBC",
        "Runs model inference"
      ],
      [
        "Python",
        "Application language"
      ],
      [
        "OpenCV",
        "Image preparation"
      ],
      [
        "Image dataset",
        "Training and evaluation examples"
      ],
      [
        "ML classifier",
        "Image categorization"
      ],
      [
        "Camera (optional)",
        "Capture new samples"
      ]
    ],
    "kit": "Plant Vision Starter Pack",
    "price": "₹1,699",
    "contents": [
      "Python project starter files",
      "Sample image dataset",
      "OpenCV setup guide",
      "Model training notebook",
      "Optional USB camera checklist",
      "Evaluation and documentation template"
    ],
    "kitdesc": "A software and learning pack. Predictions are indicative only and should not be treated as professional agricultural diagnosis.",
    "icon": "✳"
  },
  {
    "slug": "smart-room-energy-saver",
    "title": "Smart Room Energy Saver",
    "domain": "IoT · ECE",
    "level": "Beginner",
    "overview": "A low-voltage automation demonstrator that uses occupancy and schedule inputs to control an indicator or safe demonstration load.",
    "working": "A PIR sensor detects occupancy. The ESP32 applies simple timing rules and controls a low-voltage LED or demonstration load through an appropriate driver. Test with low-voltage equipment only.",
    "components": [
      [
        "ESP32 development board",
        "Controller"
      ],
      [
        "PIR sensor",
        "Occupancy detection"
      ],
      [
        "Low-voltage LED/load",
        "Safe demonstration output"
      ],
      [
        "Driver module",
        "Switching interface suited to the load"
      ],
      [
        "Power supply",
        "Regulated low-voltage power"
      ],
      [
        "Optional dashboard",
        "Status and usage log"
      ]
    ],
    "kit": "Smart Room Automation Kit",
    "price": "₹1,499",
    "contents": [
      "ESP32 development board",
      "PIR motion sensor",
      "Low-voltage LED demo load",
      "Suitable driver module",
      "Breadboard and jumper wires",
      "USB cable and safety-first guide"
    ],
    "kitdesc": "Designed for low-voltage demonstrations only. Do not connect exposed mains wiring; mains installations require a qualified electrician.",
    "icon": "⌂"
  },
  {
    "slug": "campus-lost-and-found",
    "title": "Campus Lost & Found",
    "domain": "CSE · Web",
    "level": "Beginner",
    "overview": "A searchable campus web application where users can post found items, report lost items and coordinate a safe handover.",
    "working": "Create item forms, store records in a database, support keyword and category search, and add moderation before posts become public. Avoid publishing personal contact details or sensitive identifying information.",
    "components": [
      [
        "React / Next.js",
        "Frontend application"
      ],
      [
        "Database",
        "Stores item records"
      ],
      [
        "Image storage",
        "Stores optional item photos"
      ],
      [
        "Search and filters",
        "Finds relevant listings"
      ],
      [
        "Authentication",
        "Optional campus account access"
      ],
      [
        "Moderation workflow",
        "Reviews reports and abuse"
      ]
    ],
    "kit": "Campus App Builder Pack",
    "price": "₹999",
    "contents": [
      "Starter project repository",
      "Database schema example",
      "UI wireframe and component guide",
      "Search/filter implementation notes",
      "Deployment checklist",
      "Privacy and moderation checklist"
    ],
    "kitdesc": "A digital starter pack with example architecture and implementation guidance; no physical electronics are included.",
    "icon": "⌕"
  },
  {
    "slug": "iot-water-quality-monitor",
    "title": "IoT Water Quality Monitor",
    "domain": "IoT · ECE",
    "level": "Advanced",
    "overview": "A monitoring demonstrator that logs pH and turbidity sensor readings and displays trends for controlled experiments.",
    "working": "Read sensor outputs using suitable interfaces, apply calibration curves, timestamp and log the measurements, then visualize changes. Reliable water-quality claims require proper calibration, validation and appropriate sampling.",
    "components": [
      [
        "ESP32 development board",
        "Controller and connectivity"
      ],
      [
        "pH sensor interface",
        "pH measurement with calibration"
      ],
      [
        "Turbidity sensor",
        "Optical turbidity estimate"
      ],
      [
        "Temperature sensor",
        "Optional compensation/context"
      ],
      [
        "MQTT / database",
        "Data transport and storage"
      ],
      [
        "Dashboard",
        "Trend visualization"
      ]
    ],
    "kit": "Water Quality Research Kit",
    "price": "₹2,499",
    "contents": [
      "ESP32 development board",
      "pH sensor module (prototype grade)",
      "Turbidity sensor module",
      "Calibration solution checklist",
      "Wiring and data logging guide",
      "Dashboard starter code"
    ],
    "kitdesc": "For educational experiments only. Not a certified water-testing instrument; calibration and validation are essential.",
    "icon": "≈"
  },
  {
    "slug": "voice-controlled-desktop-assistant",
    "title": "Voice-Controlled Desktop Assistant",
    "domain": "CSE · AI & ML",
    "level": "Beginner",
    "overview": "A desktop helper that recognizes a small set of spoken commands and responds with spoken feedback or safe local actions.",
    "working": "Capture microphone input after clear permission, convert speech to text, match it against an allowlist of commands and use text-to-speech for responses. Keep sensitive actions behind explicit confirmation.",
    "components": [
      [
        "Laptop / desktop",
        "Runs the application"
      ],
      [
        "Python",
        "Application language"
      ],
      [
        "Speech recognition library",
        "Speech-to-text"
      ],
      [
        "Text-to-speech engine",
        "Spoken responses"
      ],
      [
        "Command router",
        "Maps safe phrases to actions"
      ],
      [
        "Microphone",
        "Audio input with user permission"
      ]
    ],
    "kit": "Voice Assistant Developer Pack",
    "price": "₹799",
    "contents": [
      "Python starter repository",
      "Speech-to-text setup guide",
      "Text-to-speech setup guide",
      "Safe command-router examples",
      "Test phrases and documentation template"
    ],
    "kitdesc": "A digital starter pack; a compatible computer and microphone are required and are not included.",
    "icon": "◖"
  }
];
