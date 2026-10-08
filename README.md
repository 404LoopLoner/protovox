

## V4.2 usability and product-flow fixes
- Fixed scroll locking after the internship dialog closes (close button, Escape, or backdrop). The internship dialog is now included in the same modal lifecycle as other dialogs.
- Clicking the ProtoVox logo scrolls smoothly to the top from any section and closes the mobile navigation.
- Sharpened the main product promise: students submit ideas; ProtoVox helps translate them into a build plan, required components/project kit, and technical guidance.


## Public vs private creator tools
- The Project Creator Studio has been removed from the public homepage and navigation.
- The public project showcase remains for visitors to browse.
- Creator publishing is intended to be an owner-only/admin feature. Before enabling it for the live site, add secure authentication and role checks plus a shared database/image storage. Do not rely on hiding a section or using a secret URL alone as security.


## V4.3 visual and discovery upgrades
- Added a dedicated `projects.html` discovery page with nine illustrative project concepts, search, domain filters, sorting by name/difficulty, component tags and detail dialogs.
- Added an original CSS-drawn ProtoVox mini rover buddy to both public pages. It wanders when the visitor scrolls, dodges when the pointer gets close or is clicked, briefly hides, and can reappear when the pointer moves.
- The mini rover is an original mascot design inspired by friendly retro robots; it is not a copy of a specific movie character.
- Projects and detail information are illustrative demo content; real user submissions, shared project publishing and inventory remain to be connected to a backend.


## V4.4 rover behavior refinement
- Mini rover now travels only horizontally in a fixed bottom-screen lane; scrolling never moves it up or down the page.
- Removed cursor evasion and hiding behavior. It remains visible and can be clicked.
- At the bottom of a page, it activates a cyan UV-style holographic message projected from its eye area. Clicking it changes the message to a friendly encouragement.
- Reworked the mascot into a small rusty yellow tracked rover with binocular camera eyes, inspired by retro animated helper robots without copying a specific character.

## V4.6 assistant cleanup
- Removed the always-visible holographic quote/transmission bubble above the rover.
- Kept the fixed bottom-right rover and its click-to-open ProtoVox Assistant menu.
- Assistant menu still links to idea submission, technical help, projects, project kits, and internship tracks.


## V4.7 project-specific holograms
- Replaced the generic water-level dashboard visual in the featured project carousel with four distinct CSS/SVG holographic scenes.
- Smart Disaster Monitoring shows a sensor map, connected nodes and alert state.
- Neural Signal Classifier shows an EEG-style waveform and sample model features.
- Gesture-Controlled Robot shows a 3D-styled rover, motion arcs and gesture commands.
- Solar Energy Tracker shows a photovoltaic panel, sun, light reading and output meter.
- Carousel navigation and auto-advance activate the scene that corresponds to the selected project.
