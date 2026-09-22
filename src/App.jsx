import { useState, useLayoutEffect, useEffect, Children } from "react";
import { useRef } from "react";

// FORMSPREE NPM PACKAGE
import { useForm, ValidationError } from "@formspree/react";

import Lenis from "lenis";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./App.module.scss";
import { TweenMax, Power3 } from "gsap";

// The ?react query is required by the Vite plugin
import LinkedinIcon from "./assets/linkedin.svg?react";
import FacebookIcon from "./assets/facebook.svg?react";
import InstagramIcon from "./assets/instagram.svg?react";
import EmailIcon from "./assets/email.svg?react";

import square2 from "./assets/square_headshot_2_gs.jpg";
import bodySuitGs from "./assets/body_blazer_gs.jpg";

import magImg1 from "./assets/magneticfield-gl-img 1.jpg";
import magImg2 from "./assets/magneticfield-gl-img 2.jpg";

const iconMap = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  email: EmailIcon,
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

const lenis = new Lenis({
  wheelMultiplier: 0.8,
  duration: 2.5,
  // duration: 3,
});

function App() {
  /* Initializing Smooth Scroll */
  // useEffect(() => {
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  useEffect(() => {
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // const container = useRef(null);
  const stackArrayNames1 = [
    "C++",
    "OpenGL API",
    "Graphic Shaders",
    "Linear Algebra",
    "CMake",
  ];
  const imagesMag = [magImg1, magImg2];
  const imagesGSP = [];
  return (
    <div className={styles.container}>
      <Main>
        <CoverStack>
          <Home>
            <Title />
            <RightCol />
          </Home>
          <About />
          <CourseLoad>
            <Course
              courseName="Analysis"
              courseDescription="Intro to rigorous analysis on the real line. Topics include: the real number system, 
sequences and series of numbers, functions of a real variable (continuity and differentiability), 
the Riemann integral, basic topological notions in a metric space, sequences and series of 
functions including Taylor and Fourier series."
            />
            <Course
              courseName="Discrete Mathematics"
              courseDescription="One-semester introduction to discrete mathematics with an emphasis on the 
understanding, composition and critiquing of mathematical proofs."
            />
            <Course
              courseName="Intro to Comp Sci"
              courseDescription="Students learn how to design algorithms to solve problems and how to translate these algorithms into working computer programs. Experience is acquired through programming projects in a high level programming language."
            />
          </CourseLoad>
          <Projects>
            {/* Let images be an array of images */}
            {/* Let stackArrayNames be an array of strings with each string being the name of a tool. */}
            <Project
              projectDescription="A 3D magnetic field visualizer made with an OpenGL backend. Implements lighting and 
vectors to show the direction and strength of the field at different cartesian coordinates. 
Field strength is also contingent on the object shape and material just like in real life. 
Also implements a 3D camera for user control."
              projectTitle="magneticfield-gl"
              images={imagesMag}
              stackArrayNames={stackArrayNames1}
              repoName="magneticfield-gl"
            />
            <Project
              projectDescription="A gsap based portfolio made in Next.js, React, SCSS, and GSAP"
              projectTitle="gsap-portfolio"
              images={imagesGSP}
              stackArrayNames={[
                "React",
                "Next.JS",
                "GSAP library",
                "SCSS",
                "HTML",
                "JavaScript",
              ]}
              repoName="gsap_portfolio"
            />
            <Project
              projectDescription="Visit my Github to see what I've been working on."
              projectTitle="coming soon..."
              images={imagesGSP}
              stackArrayNames={[]}
              repoName=""
            />
          </Projects>

          {/* <Resume /> */}
          <Contact />
        </CoverStack>
        <Footer />
      </Main>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className={styles.nav_bar}>{children}</nav>;
}

function Name() {
  return (
    <div className={styles.name}>
      <span>🚀</span>
      <h1>dlprd.com</h1>
    </div>
  );
}

function Tabs() {
  return (
    <ul className={styles.tabs}>
      <li>Home</li>
      <li>About</li>
      <li>Portfolio</li>
      <li>Contact</li>
    </ul>
  );
}

function Sandwich() {
  return (
    <div className={styles.sandwich}>
      <h2>+</h2>
    </div>
  );
}

function Main({ children }) {
  return <main className={styles.main}>{children}</main>;
}

// function Main({ children }) {
//   const root = useRef(null);

//   useGSAP(
//     () => {
//       // direct children of <main>: Home, About, CourseLoad, Projects, Contact, Footer
//       const sections = gsap.utils.toArray(root.current.children);

//       // skip Home (index 0, already on screen) and Footer (last)
//       sections.slice(1, -1).forEach((section) => {
//         gsap.fromTo(
//           section,
//           { xPercent: 100 },
//           {
//             xPercent: 0,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: section,
//               start: "top bottom",
//               end: "top 30%",
//               scrub: 1,
//               invalidateOnRefresh: true,
//             },
//           },
//         );
//       });

//       // Your Course/Project cards expand on hover, which changes the page height
//       // and would leave the trigger positions below them stale. Refresh when
//       // the height changes.
//       let timeout;
//       const ro = new ResizeObserver(() => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => ScrollTrigger.refresh(), 150);
//       });
//       ro.observe(root.current);

//       return () => {
//         ro.disconnect();
//         clearTimeout(timeout);
//       };
//     },
//     { scope: root },
//   );

//   return (
//     <main ref={root} className={styles.main}>
//       {children}
//     </main>
//   );
// }

// Easing for one panel-to-panel slide. The timeline is scrubbed, so this is
// what each transition feels like as you scroll through it: "none" tracks the
// wheel linearly, an inOut curve eases off both ends of the slide. Raise the
// power (power3/power4.inOut) for a harder snap into place.
const PANEL_EASE = "power2.inOut";

function CoverStack({ children }) {
  const outer = useRef(null);
  const inner = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(inner.current.children);
      if (panels.length < 2) return;

      // Later panels sit on top of earlier ones, and every panel but the first
      // starts parked off-screen right. This has to be an explicit set: the
      // fromTo() tweens below run with immediateRender:false, so their "from"
      // values are not applied until each tween's turn comes up.
      panels.forEach((p, i) =>
        gsap.set(p, { zIndex: i, xPercent: i === 0 ? 0 : 100 }),
      );

      // The outer wrapper is n * 100vh tall and the stack inside it is
      // `position: sticky`, so the browser does the pinning natively. We
      // deliberately do NOT use ScrollTrigger's `pin: true` here: it wraps the
      // section in a .pin-spacer, which (a) gets no padding when its parent is
      // a flex container like <main>, and (b) reparents a DOM node React owns,
      // which crashes StrictMode's unmount.
      outer.current.style.height = panels.length * 100 + "vh";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          // Snap has to be handed off to Lenis. ScrollTrigger's own snap uses
          // native scrolling, which Lenis immediately overrides -> jitter.
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.6,
            onStart: () => lenis.stop(),
            onComplete: () => lenis.start(),
          },
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        // Both panels in a transition must share an ease, or the outgoing one
        // drifts out of step with the incoming one and the seam between them
        // opens up mid-slide.
        // force3D keeps each panel on its own compositing layer for the whole
        // scrub. Without it the 1px divider pseudo-elements inside .projects
        // land on fractional pixels every frame and flicker.
        tl.fromTo(
          panel,
          { xPercent: 100 },
          {
            xPercent: 0,
            ease: PANEL_EASE,
            immediateRender: false,
            force3D: true,
          },
          i - 1,
        ).fromTo(
          panels[i - 1],
          { xPercent: 0 },
          {
            xPercent: -30,
            ease: PANEL_EASE,
            immediateRender: false,
            force3D: true,
          },
          i - 1,
        );
      });

      ScrollTrigger.refresh();

      // The Course/Project cards grow on hover, which changes page height and
      // leaves every trigger position below them stale.
      let timeout;
      const ro = new ResizeObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      ro.observe(document.body);

      return () => {
        ro.disconnect();
        clearTimeout(timeout);
      };
    },
    { scope: outer },
  );

  // Each child is wrapped in its own panel div. The panel owns the geometry
  // (full bleed, opaque, clipped); the section inside keeps whatever height it
  // was designed with. Without this, a section shorter than the viewport --
  // .about is 90vh, .section_contact is 65vh -- leaves a transparent strip that
  // the panel below shows through.
  return (
    <div ref={outer} className={styles.coverStackOuter}>
      <section className={styles.coverStack}>
        <div ref={inner} className={styles.coverStackInner}>
          {Children.map(children, (child) => (
            <div className={styles.coverStackPanel}>{child}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

function HorizontalTrack({ children, snap = true }) {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(track.current.children);
      if (panels.length < 2) return;

      // how far the row must travel to bring the last panel flush left
      const distance = () => track.current.scrollWidth - window.innerWidth;

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          start: "top top",
          end: () => "+=" + distance(), // vertical scroll budget == horizontal travel
          snap: snap ? 1 / (panels.length - 1) : false, // the "PowerPoint" click
          invalidateOnRefresh: true, // recompute on resize
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hTrack}>
      <div ref={track} className={styles.hTrackInner}>
        {children}
      </div>
    </section>
  );
}

function Home({ children }) {
  return <div className={styles.home}>{children}</div>;
}

function Title() {
  // const [finished, setFinished] = useState(false);
  const container = useRef(null);
  const image_container = useRef(null);
  const lettersRef = useRef([]);
  const lettersRef2 = useRef([]);
  const cursor = useRef(null);
  const imagesRef = useRef([]);
  const title = "PORTFOLIO";

  return (
    <div className={styles.title_image_cont}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <Images />
    </div>
  );
}

function Images() {
  return (
    <div className={styles.imageContainer}>
      <img src={bodySuitGs} alt="Body Blazar" />
      <img src={square2} alt="Portrait" />
    </div>
  );
}

function RightCol() {
  return (
    <div className={styles.rightCol}>
      <div className={styles.rightCol_child}>
        <ul>
          <li>About</li>
          <li>Portfolio</li>
          <li>Work</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className={styles.rightCol_child}>
        <h3>Diego</h3>
        <p>Comp sci + math major @ NYU interested in machine learning</p>
      </div>
      <div className={styles.rightCol_child}>
        <h2>1</h2>
        <p>COURSE LOAD THIS SEMESTER</p>
      </div>
      <div className={styles.rightCol_child}>
        <h2>2</h2>
        <p>magneticfield-gl</p>
      </div>
      <div className={styles.rightCol_child}>
        <h2>3</h2>
        <p>ASK A QUESTION</p>
      </div>
    </div>
  );
}

function About() {
  const paragraph1 =
    "I'm Diego, a Computer Science and Mathematics student at New York University. I'm drawn to the intersection of the two fields, using mathematical reasoning to design algorithms that solve real problems and to uncover deeper insight into how systems behave. One area I find especially compelling is mathematical modeling, particularly as a tool for understanding physical phenomena.";
  const paragraph2 =
    "Outside of my academic work, I play piano, sculpt digitally, and draw, creative outlets that keep me engaged with process and craft in ways that complement the analytical side of my studies.";

  return (
    <section className={styles.about}>
      <div className={styles.about_title}>
        <h1>ABOUT</h1>
      </div>
      <div className={styles.about_paragraphs}>
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
      </div>
    </section>
  );
}

function CourseLoad({ children }) {
  return (
    <section className={styles.courseLoad}>
      <h1>COURSE LOAD</h1>
      {children}
    </section>
  );
}

function Course({ courseName, courseDescription }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.courseLoad_course}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2>{courseName}</h2>
      <div
        className={
          isHovered
            ? `${styles.courseLoad_course_content}`
            : `${styles.courseLoad_course_minimized}`
        }
      >
        <p>{courseDescription}</p>
      </div>
    </div>
  );
}

function Projects({ children }) {
  return (
    <section className={styles.projects}>
      <h1>PROJECTS</h1>
      {children}
    </section>
  );
}

function Project({
  projectDescription,
  projectTitle,
  images,
  stackArrayNames,
  repoName,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Let images be an array of images
  // Let stackArrayNames be an array of strings with each string being the name of a tool.
  return (
    <div
      className={styles.projects_project}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.projects_project_description}>
        <h2>{projectTitle}</h2>
        <div
          className={
            isHovered
              ? `${styles.projects_project_description_details}`
              : `${styles.projects_project_minimized}`
          }
        >
          <p>{projectDescription}</p>
          <a
            href={`https://github.com/dlpcube/${repoName}`}
            target="_blank"
            rel="noopenner noreferrer"
          >
            visit repo &rArr;
          </a>
        </div>
      </div>
      <div
        className={
          isHovered
            ? `${styles.projects_project_images}`
            : `${styles.projects_project_minimized}`
        }
      >
        {images.map((image, index) => (
          <img src={image} key={index} alt={`Image ${index}`} />
        ))}
      </div>
      <div
        className={
          isHovered
            ? `${styles.projects_project_stack}`
            : `${styles.projects_project_minimized}`
        }
      >
        <ul>
          {stackArrayNames.map((name) => (
            <li>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div>
      <h3>Check out my resume!</h3>
    </div>
  );
}

function Contact() {
  /* REFS FOR CONTACT SECTION SCROLL TRIGGER */
  const contactRef = useRef(null);

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: contactRef.current,
  //       // start: "top 120px",
  //       start: "-1000px top",
  //       end: "-450px top",
  //       scrub: true,
  //       // markers: true,
  //       // onEnter: () => entrancetl.progress(1),
  //       // onLeaveBack: () => mastertl.progress(0),
  //     },
  //   });
  //   tl.from(contactRef.current, {
  //     autoAlpha: 0,
  //     y: 300,
  //     ease: Power3.easeInOut,
  //   });
  // });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [state, handleSubmit] = useForm("meaqzndj");

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <section className={styles.section_contact} ref={contactRef}>
      <div className={styles.section_contact_form_title}>
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_inputs}>
            <div className={styles.form_group}>
              <input
                id="name"
                name="name"
                className={styles.form_input}
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <label
                className={
                  formData.name
                    ? `${styles.form_group_label} ${styles.form_group_label_end}`
                    : `${styles.form_group_label} ${styles.form_group_label_begin}`
                }
                for="name"
              >
                Full Name
              </label>
            </div>
            {/* Email */}
            <div className={styles.form_group}>
              <input
                id="email"
                name="email"
                className={styles.form_input}
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <label
                className={
                  formData.email
                    ? `${styles.form_group_label} ${styles.form_group_label_end}`
                    : `${styles.form_group_label} ${styles.form_group_label_begin}`
                }
                for="email"
              >
                Email Address
              </label>
            </div>
            {/* Message */}
            <div className={styles.form_group}>
              <textarea
                id="message"
                name="message"
                className={styles.form_input}
                type="text"
                placeholder="Enter your message."
                value={formData.message}
                onChange={
                  (e) => setFormData({ ...formData, message: e.target.value })
                  // USING THE SPREAD OPERATOR
                }
                required
              />
              <label
                className={
                  formData.message
                    ? `${styles.form_group_label} ${styles.form_group_label_end_textarea}`
                    : `${styles.form_group_label} ${styles.form_group_label_begin}`
                }
                for="message"
              >
                Enter your message.
              </label>
            </div>
          </div>
          <div className={styles.form_group}>
            <button
              type="submit"
              disabled={state.submitting}
              className={styles.button_contact}
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
      <div className={styles.contact_social_container}>
        <div className={styles.contact_social_container_icons}>
          <div
            className={styles.contact_social_container_icons_container}
          ></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  //function scrollToTop() {
  lenis.scrollTo(0, {
    duration: 2.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  //}

  return (
    <footer className={styles.footer_gridContainer}>
      <div className={styles.footer_gridContainer_logo}>
        <span>💥</span>
        <h3>dlprd.com</h3>
      </div>
      <div className={styles.footer_gridContainer_paragraph}>
        <p>
          This is digital property of dlprd.com. Copyright &copy; by Diego De La
          Paz Ruiz. This digital asset was created with the help of the
          JavaScript libraries such as React&trade;, GSAP&trade;, Lenis&trade;,
          and Next.JS&trade;. Terms and conditions may apply. dlprd.com&trade;
          is not responsible for any judgments or actions that may cause
          financial and physical harm.
        </p>
      </div>
      <div className={styles.footer_gridContainer_socialIcon1}>
        <a
          href="https://www.linkedin.com/in/ddlpr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            name="linkedin"
            size={32}
            className={styles.footer_iconContainer_icon}
          />
        </a>
      </div>
      <div className={styles.footer_gridContainer_socialIcon2}>
        <a
          href="https://www.instagram.com/ddelapaz333/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            name="instagram"
            size={32}
            className={styles.footer_iconContainer_icon}
          />
        </a>
      </div>
      <div className={styles.footer_gridContainer_socialIcon3}>
        <a
          // href="https://www.facebook.com/diego.de.la.paz.90317/"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            name="facebook"
            size={32}
            className={styles.footer_iconContainer_icon}
          />
        </a>
      </div>
      <div className={styles.footer_gridContainer_socialIcon4}>
        <a
          href="mailto:diego@dlprd.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            name="email"
            size={32}
            className={styles.footer_iconContainer_icon}
          />
        </a>
      </div>
      <div className={styles.footer_gridContainer_button}>
        <a href="#" className={styles.button_contact}>
          To the Top
        </a>
      </div>
      <div className={styles.footer_gridContainer_empty} />
      <div className={styles.footer_gridContainer_head1}>
        <h3>Legal</h3>
      </div>
      <ul className={styles.footer_gridContainer_list1}>
        <li className={styles.footer_gridContainer_list_item}>
          <a href="#">Privacy Policy</a>
        </li>
        <li className={styles.footer_gridContainer_list_item}>
          <a href="#">Terms and Conditions</a>
        </li>
        <li className={styles.footer_gridContainer_list_item}>
          <a href="mailto:diego@dlprd.com">Contact</a>
        </li>
      </ul>
      <ul className={styles.footer_gridContainer_list2}>
        <li className={styles.footer_gridContainer_list_item}>
          <a href="#">Portfolio</a>
        </li>
        <li className={styles.footer_gridContainer_list_item}>
          <a href="#">University</a>
        </li>
        <li className={styles.footer_gridContainer_list_item}>
          <a href="#">Blog</a>
        </li>
      </ul>
    </footer>
  );
}

function Icon({ name, size = 24, className, color }) {
  const SelectedIcon = iconMap[name];

  return (
    <SelectedIcon
      width={size}
      height={size}
      className={className}
      style={{ flexShrink: 0 }}
    />
  );
}

export default App;
