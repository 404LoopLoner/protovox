/* =========================================================
   PROTOVOX — MAIN SCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loginBtn = document.getElementById("loginBtn");
const getStartedBtn = document.getElementById("getStartedBtn");
const shareIdeaBtn = document.getElementById("shareIdeaBtn");
const ctaShareBtn = document.getElementById("ctaShareBtn");

const searchInput = document.getElementById("projectSearch");
const menuBtn = document.getElementById("menuBtn");

const nav = document.querySelector(".nav");
const projectCards = document.querySelectorAll(".project-card");


/* =========================================================
   SIMPLE NOTIFICATION
========================================================= */

function showNotification(message) {

  const existing = document.querySelector(".proto-notification");

  if (existing) {
    existing.remove();
  }

  const notification = document.createElement("div");

  notification.className = "proto-notification";

  notification.innerHTML = `
    <span>✓</span>
    <p>${message}</p>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 20);

  setTimeout(() => {
    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);

  }, 2800);
}


/* =========================================================
   LOGIN
========================================================= */

if (loginBtn) {

  loginBtn.addEventListener("click", () => {

    showNotification(
      "Login system is coming next. Your ProtoVox account will live here."
    );

  });

}


/* =========================================================
   GET STARTED
========================================================= */

if (getStartedBtn) {

  getStartedBtn.addEventListener("click", () => {

    document
      .querySelector("#share")
      ?.scrollIntoView({
        behavior: "smooth"
      });

    setTimeout(() => {

      showNotification(
        "Welcome to ProtoVox. Start by sharing your first project idea."
      );

    }, 700);

  });

}


/* =========================================================
   SHARE IDEA
========================================================= */

function openIdeaForm() {

  const existingForm = document.querySelector(".idea-modal");

  if (existingForm) {
    existingForm.remove();
    return;
  }

  const modal = document.createElement("div");

  modal.className = "idea-modal";

  modal.innerHTML = `

    <div class="idea-modal-backdrop"></div>

    <div class="idea-modal-box">

      <button class="idea-close" aria-label="Close">
        ×
      </button>

      <div class="section-kicker">
        START YOUR PROJECT
      </div>

      <h2>
        Share Your <span>Idea.</span>
      </h2>

      <p class="idea-intro">
        Tell the ProtoVox community what you want to build.
      </p>


      <form id="ideaForm">

        <label>
          Project Title

          <input
            type="text"
            id="ideaTitle"
            placeholder="Example: Smart Waste Monitoring System"
            required
          >

        </label>


        <label>
          Category

          <select id="ideaCategory" required>

            <option value="">
              Select category
            </option>

            <option>
              Electronics & IoT
            </option>

            <option>
              AI & ML
            </option>

            <option>
              Software
            </option>

            <option>
              Research
            </option>

          </select>

        </label>


        <label>
          Tell us about your idea

          <textarea
            id="ideaDescription"
            rows="5"
            placeholder="What problem are you trying to solve?"
            required
          ></textarea>

        </label>


        <button
          type="submit"
          class="btn btn-primary idea-submit"
        >
          Submit Idea →
        </button>

      </form>

    </div>

  `;

  document.body.appendChild(modal);


  /* Close */

  const closeButton =
    modal.querySelector(".idea-close");

  const backdrop =
    modal.querySelector(".idea-modal-backdrop");


  function closeModal() {

    modal.classList.remove("open");

    setTimeout(() => {
      modal.remove();
    }, 250);

  }


  closeButton.addEventListener(
    "click",
    closeModal
  );

  backdrop.addEventListener(
    "click",
    closeModal
  );


  /* Form */

  const form =
    modal.querySelector("#ideaForm");

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const title =
      document
        .querySelector("#ideaTitle")
        .value
        .trim();

    if (!title) {
      return;
    }

    closeModal();

    setTimeout(() => {

      showNotification(
        "Your idea has been saved for the ProtoVox platform."
      );

    }, 300);

  });


  setTimeout(() => {

    modal.classList.add("open");

  }, 20);

}


if (shareIdeaBtn) {

  shareIdeaBtn.addEventListener(
    "click",
    openIdeaForm
  );

}


if (ctaShareBtn) {

  ctaShareBtn.addEventListener(
    "click",
    openIdeaForm
  );

}


/* =========================================================
   SEARCH PROJECTS
========================================================= */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();


      projectCards.forEach(card => {

        const content =
          card.textContent.toLowerCase();


        if (
          query === "" ||
          content.includes(query)
        ) {

          card.style.display = "";

        } else {

          card.style.display = "none";

        }

      });

    }
  );

}


/* =========================================================
   PROJECT CARD INTERACTION
========================================================= */

projectCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      const title =
        card.querySelector("h3")?.textContent
        || "Project";


      showNotification(
        `${title} — project details will be available soon.`
      );

    }
  );

});


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    () => {

      if (!nav) return;

      nav.classList.toggle("mobile-open");

    }
  );

}


/* =========================================================
   NAVIGATION
========================================================= */

document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const target =
          link.getAttribute("href");


        if (
          target &&
          target.startsWith("#")
        ) {

          const section =
            document.querySelector(target);


          if (section) {

            event.preventDefault();

            section.scrollIntoView({
              behavior: "smooth"
            });

          }

        }


        document
          .querySelectorAll(".nav a")
          .forEach(item => {

            item.classList.remove("active");

          });


        link.classList.add("active");


        nav?.classList.remove(
          "mobile-open"
        );

      }
    );

  });


/* =========================================================
   ACTIVE SECTION DETECTION
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        const id =
          entry.target.getAttribute("id");


        document
          .querySelectorAll(".nav a")
          .forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );

          });

      });

    },
    {
      threshold: 0.35
    }
  );


sections.forEach(section => {

  observer.observe(section);

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      const modal =
        document.querySelector(".idea-modal");

      if (modal) {
        modal.remove();
      }

    }

  }
);