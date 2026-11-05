# ProtoVox V9 — Reactor Blue

Static multi-page ProtoVox prototype.

## Run locally
Open `index.html` with VS Code Live Server, or open it directly in a browser.

## Pages
- `index.html` — home, idea intake, project highlights, help desk, internships and R&D
- `projects.html` — project directory
- `project-detail.html?id=<project-slug>` — project blueprint, components, matched kit and checkout preview

## V9 updates
- Restrained graphite / reactor-cyan theme with no yellow accent gradient
- Instagram and LinkedIn icon-only links in the footer
- Removed the decorative square/orb from the final CTA
- Real component reference photographs appear when component rows are hovered or keyboard-focused
- Scroll reveal and hover transitions, with reduced-motion support

## Component photo note
The component photos are representative reference photographs loaded from external image hosts. Internet access is required to display them. Verify exact part numbers, brands and module revisions before publishing purchase listings.

## Payments and enquiries
Checkout remains a non-transactional preview. The purchase button opens an email enquiry; no card or UPI credentials are collected by this static prototype.

## V10 — Reactor contact edition
- Replaced the project detail page's component-gallery section with a dedicated ProtoVox contact channel.
- Added the direct email `protovox.tech@gmail.com`, a Gmail compose link, and icon-led Instagram and LinkedIn links.
- Applied a more cinematic, blue-only reactor interface with precision-grid overlays, sharper typography, asymmetrical panel corners and restrained holographic effects.
- Updated the project directory copy to emphasize project blueprints rather than component stacks.
- Contact email is also visible in the home and project-directory footers.


## V12 — Contact and workshop booking
- Added a Book a Workshop action to desktop and mobile navigation.
- Opens a two-column contact/workshop request dialog with animated presentation.
- Contact message and workshop booking forms prepare email drafts addressed to protovox.tech@gmail.com; users review and send them in their own email service.
- Workshop booking is a request, not an instant confirmed reservation. No server-side submission or storage is implemented.
- Removed the decorative end-cap shapes from the home page CTA section.


## V13 — Internship intake redesign
- Rebuilt the internship application dialog as a wide, responsive engineering-career intake console.
- Added a ProtoVox reactor visualization, application-open status, benefits rail, progress indicator and structured two-column form.
- Preserved all original form field names, validation, domain prefill behavior and email-draft flow.
- Responsive layout collapses into a single column on smaller screens and respects reduced-motion preferences.


## V14 — ProtoVox vision and ecosystem restructure
- Repositioned ProtoVox as a robotics and engineering innovation ecosystem rather than a generic project directory.
- Added a Robotics Centre section for practical, age-appropriate K–12 robotics learning.
- Added Advanced ProtoVox with two distinct divisions: Campaign Projects (self-build kits, guides and workshops) and Flagship / Unique Projects (original high-complexity showcase work).
- Added Institutional Programmes for school robotics sessions, college-level advanced workshops and RoboBuild kit programmes.
- Reframed the project directory as the Campaign Project Library.
- Reframed the R&D area as the Flagship Innovation Lab. Concept cards remain explicitly identified as concepts, not completed or award-winning projects.
- Reframed internships as a partner-collaboration pathway; no placements or partner relationships are represented as confirmed.
- Internship application dialog now changes its left-side headline, description and three benefit points when a learner selects ECE, AI & ML, Mechatronics, Robotics, CSE or an interdisciplinary track.
- Updated navigation and footer to reflect the new ecosystem structure.
- Workshop and internship enquiries still prepare email drafts for the user to review and send. No server-side booking, application processing, or database is included.


## V15 — ProtoVox Student Universe
New standalone student exploration pages:
- `explore.html` — discovery hub for robotics, ECE, AI/ML, IoT, design and engineering challenges.
- `academy.html` — structured learning pathways from school-level beginner robotics to advanced topics.
- `challenges.html` — interactive five-question engineering quiz, local score tracking, and practical mission prompts.
- `components.html` — searchable and filterable student component atlas with safe-use notes.
- `playground.html` — virtual rover movement sandbox and LED series-resistor calculator using Ohm's law.
- `builder.html` — interactive project build planner that generates a starter roadmap from domain, experience, budget and idea inputs.
- Added a Student Universe discovery section to the homepage and updated navigation/footer links across pages.
- Student hub interactions run in the browser. Quiz score uses local browser storage; the planner copy action uses the browser clipboard when permission is available.
- The rover simulator is a visual learning simulation, not a physics model or hardware connection. The resistor tool is an educational estimate, not a substitute for component datasheets or circuit review.
- No user accounts, cloud progress sync, LMS, real-time leaderboard, project upload backend, payment processing or verified partner/internship database are included.


## V16 — Direct enquiry routing and page cleanup
- Removed the extra standalone "Book a Workshop" header/mobile CTA and the duplicate institutional workshop banner CTA from the homepage. Workshop requests remain accessible from the relevant school, college and kit programme cards, opening the workshop dialogue directly.
- Removed the generic internship apply CTA; selecting an internship domain card opens the matching internship dialogue directly.
- Added URL-based dialogue routing on the homepage (`?dialog=help|workshop|internship|idea`) so links from every other page open the correct dialogue immediately instead of scrolling to a homepage section.
- Updated enquiry links throughout student hub, campaign, innovation, project directory and project detail pages to use the direct dialogue routes.
- Connected the homepage Campaign Projects and Flagship Innovation Lab calls-to-action to their separate dedicated pages.
- Changed project detail's second requirements panel from a duplicate kit-contents list to distinct Tools & Setup requirements. It now adapts between software, CAD/fabrication and hardware builds and avoids repeating listed components or kit contents.
- The Build Planner remains available and unchanged.


## V17 — Focused ProtoVox navigation
- Removed the extra Student Universe discovery pages: Explore, Academy, Challenges, Components and Virtual Playground.
- Removed the Student Universe section from the homepage.
- Kept the Build Planner as requested.
- Simplified the primary navigation across the site to Campaigns, Innovation Lab and Build Planner.
- Simplified footer navigation and retained the core ProtoVox destinations: Campaign Projects, Innovation Lab, Build Planner, institutional enquiries and internships.
- Kept the robotics education, advanced campaign projects, flagship innovation, institutional programmes and internship content as the core website experience.


## V18 — Flagship innovation and About ProtoVox
- Added a clear About ProtoVox section with the founding team (Arjun Krishna, Aditya Krishna and Nanda Kishor S), purpose, vision pillars and animated mission visual.
- Added About to the focused navigation.
- Changed the Robotics Centre CTA to "Book My Workshop" and retained the existing workshop request dialogue.
- Reworked the homepage R&D showcase into two proposed flagship concepts: ARES Autonomous Search & Reconnaissance Rover and AGNI AI-Powered Environmental Intelligence Station.
- Added preliminary engineering objectives and component / system requirements. These are planning concepts, not completed or validated products.
- Rebuilt the Innovation Lab showcase around the same two flagship concepts, with clear concept status, objectives, preliminary requirements and safety / validation notes.
- Replaced the generic email draft action for "Discuss this research" with a dedicated research discussion dialogue. The form collects contact details, collaboration interest and a project-specific message before preparing an email for review.
- Removed step-counter / progress-bar styling from the internship dialogue and changed workshop form headings to service-oriented labels rather than process steps.
- Research discussion from the Innovation Lab page routes to the dedicated research dialogue on the homepage.


## V20 — Three-division ProtoVox structure
- Added a standalone `about.html` page with the organisation's purpose, vision, three operating divisions and founding team: Arjun Krishna, Aditya Krishna and Nanda Kishor S.
- Updated navigation across public pages to use `Advanced ProtoVox` and the standalone About page.
- Repositioned Advanced ProtoVox for learners beyond Class 12, including diploma, undergraduate and postgraduate students, technical clubs and institutions.
- Replaced the campaign-library placeholder on the Advanced ProtoVox page with four advanced, student-buildable engineering pathways: autonomous indoor rover, AI vision quality inspector, smart microgrid monitor and vision-guided robotic manipulator.
- Added preliminary requirements and project discussion links. Final hardware selection, safety and kit availability must be confirmed before a project is offered.
- Replaced the campaign-library destination on the student idea area with a direct `Share Your Idea` route to the idea enquiry dialogue.
- Repositioned the Innovation Lab as ProtoVox's own R&D division for high-impact, team-built concepts, industry collaborations, exhibitions, hackathons and technical showcases.
- Added the `Book My Workshop` action to the homepage, About, Advanced ProtoVox and Innovation Lab headers.
- Converted purple/violet styling in all site stylesheets and the project-detail embedded styles to a consistent cyan/blue palette.
- Kept Build Planner as a separate utility page.


## V22 — Blue-only visual correction
- Replaced the remaining grey surfaces in the featured build carousel, flagship research cards, innovation art and support terminal with deep navy / reactor-blue styling.
- Corrected low-contrast dark text in research descriptions and support-terminal labels.
- Removed the amber/gold accent from the project-detail primary button.
- Applied the blue-only corrections to project detail panels and kit enquiry surfaces.
- No database credentials are included. Follow `FOUNDER_CONSOLE_SETUP.md` and `SUPABASE_SETUP.sql` to connect the founder console.
