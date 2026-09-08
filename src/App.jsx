import { useState, useLayoutEffect, useEffect } from "react";
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

const iconMap = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  email: EmailIcon,
};

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  wheelMultiplier: 0.8,
  duration: 2.5,
  // duration: 3,
});

function App() {
  /* Initializing Smooth Scroll */
  useEffect(() => {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // const container = useRef(null);
  return (
    <div className={styles.container}>
      <Main>
        <Home>
          <Title />
          <RightCol />
        </Home>
        <About />
        <CourseLoad />
        <Projects />
        {/* <Resume /> */}
        <Contact />
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

  // useGSAP(() => {
  //   const target1 = lettersRef.current.filter(Boolean);
  //   const target2 = lettersRef2.current.filter(Boolean);
  //   const targets = [...target1, ...target2];

  //   const cursorEl = cursor.current;

  //   const isAtTop = window.scrollY < 50;
  //   let entrancetl;

  //   gsap.set(cursorEl, {
  //     autoAlpha: 0,
  //   });

  //   gsap.set(targets, {
  //     autoAlpha: 0,
  //   });

  //   function titleAnimation() {
  //     gsap.set(cursorEl, { autoAlpha: 1 });
  //     gsap.set(targets, { autoAlpha: 1 });
  //     gsap.to(cursorEl, {
  //       opacity: 0,
  //       ease: "power3.inOut",
  //       repeat: -1,
  //       yoyo: true,
  //       duration: 0.5,
  //     });

  //     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  //     // 2. Set the initial position to BOTH the starting X and starting Y of the first letter
  //     const firstWrapper = targets[0].parentElement;
  //     gsap.set(cursorEl, {
  //       x: firstWrapper.offsetLeft,
  //       y: firstWrapper.offsetTop,
  //     });

  //     targets.forEach((letter, index) => {
  //       const wrapper = letter.parentElement;

  //       // Calculate coordinates relative to the parent .title box
  //       const targetX = wrapper.offsetLeft + wrapper.offsetWidth;
  //       const targetY = wrapper.offsetTop + 10; // 👈 GRAB THE DYNAMIC HEIGHT OF THE CURRENT LINE

  //       tl.from(
  //         letter,
  //         {
  //           autoAlpha: 0,
  //           // duration: 0.125,
  //           duration: 0.04,
  //           // ease: Power3.easeOut,
  //           // stagger: 1,
  //         },
  //         index * 0.125,
  //       ).to(
  //         cursorEl,
  //         {
  //           x: targetX,
  //           y: targetY, // 👈 ANIMATE COORDS ALONG BOTH AXES SIMULTANEOUSLY!
  //           duration: 0.11,
  //           ease: "power1.inOut",
  //         },
  //         index * 0.125,
  //       );
  //     });
  //   }

  //   function createParallaxTimeline() {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: image_container.current,
  //         // start: "top 120px",
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: true,
  //         // markers: true,
  //         // onEnter: () => entrancetl.progress(1), // MIGHT BE CAUSING LAG
  //         // onLeaveBack: () => mastertl.progress(0),
  //       },
  //     });
  //     tl.to(
  //       imagesRef.current[0],
  //       {
  //         y: -50,
  //         x: 140,
  //         autoAlpha: 0,
  //         // display: "none",
  //         immediateRender: false,
  //         // duration: 1,
  //       },
  //       0,
  //     );
  //   }

  //   if (!isAtTop) {
  //     gsap.set(imagesRef.current, { autoAlpha: 1 });
  //     titleAnimation();
  //     createParallaxTimeline();

  //     return;
  //   }

  //   lenis.stop();
  //   document.documentElement.style.overflow = "hidden";
  //   // Declaring timeline
  //   entrancetl = gsap.timeline({
  //     onComplete: () => {
  //       document.documentElement.style.overflow = "";
  //       lenis.start();
  //       titleAnimation();
  //       createParallaxTimeline();
  //     },
  //   });

  //   entrancetl.from(imagesRef.current, {
  //     autoAlpha: 0,
  //     duration: 0.7,
  //     stagger: 0.5,
  //     ease: Power3.easeInOut,
  //     overwrite: "auto",
  //   });
  // }, []);

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
    "My name is Diego. I specialize in mathematics and computer science  at New York University.  I love learning how to use math in combination with computer science to build unique algorithms to solve a myriad a problems or to gain more insight. For example, mathematical modeling to better understand physical phenomena.";
  const paragraph2 =
    "My hobbies include playing piano, digital sculpting, and drawing.";

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

function CourseLoad() {
  return (
    <div>
      <h3>COURSE LOAD</h3>
    </div>
  );
}

function Projects() {
  return (
    <div className={styles.portfolio}>
      <h3>Check out my projects!</h3>
      <ul className={styles.portfolio_list}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>
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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        // start: "top 120px",
        start: "-1000px top",
        end: "-450px top",
        scrub: true,
        // markers: true,
        // onEnter: () => entrancetl.progress(1),
        // onLeaveBack: () => mastertl.progress(0),
      },
    });
    tl.from(contactRef.current, {
      autoAlpha: 0,
      y: 300,
      ease: Power3.easeInOut,
    });
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const data = {
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     message: formData.get("message"),
  //   };
  //   console.log(data.name);
  //   console.log(data.email);
  //   console.log(data.message);

  //   // Clear each input after submit
  //   setFormData({ name: "", email: "", message: "" });

  //   // Block that sends data to backend (using vercel) <= DO LATER
  // }

  const [state, handleSubmit] = useForm("meaqzndj");

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <section className={styles.section_contact} ref={contactRef}>
      <div className={styles.contact}>
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
        <div className={styles.contact_social_container}>
          <div className={styles.contact_form_heading2}>
            <h1>Contact</h1>
          </div>
          <div className={styles.contact_social_container_icons}>
            <div className={styles.contact_social_container_icons_container}>
              <div className={styles.contact_social_container_icons_group}>
                <a
                  href="mailto:diego@dlprd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <Icon
                  name="email"
                  size={32}
                  className={styles.footer_iconContainer_icon}
                /> */}
                  <h2>Email</h2>
                </a>
              </div>

              <div className={styles.contact_social_container_icons_group}>
                <a
                  href="https://www.linkedin.com/in/ddlpr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <Icon
                  name="linkedin"
                  size={32}
                  className={styles.footer_iconContainer_icon}
                /> */}
                  <h2>LinkedIn</h2>
                </a>
              </div>
              <div className={styles.contact_social_container_icons_group}>
                <a
                  href="https://www.instagram.com/ddelapaz333/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <Icon
                  name="instagram"
                  size={32}
                  className={styles.footer_iconContainer_icon}
                /> */}
                  <h2>Instagram</h2>
                </a>
              </div>
              <div className={styles.contact_social_container_icons_group}>
                <a
                  href="https://www.facebook.com/diego.de.la.paz.90317/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <Icon
                  name="facebook"
                  size={32}
                  className={styles.footer_iconContainer_icon}
                /> */}
                  <h2>Facebook</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  function scrollToTop() {
    lenis.scrollTo(0, {
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }

  return (
    <footer className={styles.footer_gridContainer}>
      {/* <div>
        <picture>
          <source />
          <img />
        </picture>
      </div>
      <div className={styles.footer_row}>
        <ul className={styles.footer_row_list}>
          <li>Company</li>
          <li>Contact us</li>
          <li>Privacy Policy</li>
          <li>Terms</li>
        </ul>
        <p>
          This is digital property of dlprd.com. Copyright &copy; by Diego De La
          Paz Ruiz. Created with React.
        </p>
      </div> */}

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
          financial, physical, and spiritual harm.
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
          href="https://www.facebook.com/diego.de.la.paz.90317/"
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
        <button onClick={scrollToTop}>To the Top</button>
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
