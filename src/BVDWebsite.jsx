// src/BVDWebsite.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import darkEdition from "./assets/darkEdition.png";
import originalEdition from "./assets/originalEdition.png";

/**
 * Full BVDWebsite.jsx
 * - Paystack dynamic loader
 * - Formspree for contact/demo/subscribe
 * - Framer Motion animations
 * - Spotify + Audiomack embeds
 * - Fixed reCAPTCHA v2 behavior
 */

export default function BVDWebsite() {
  const [cart, setCart] = useState([]);
  const [loadingPaystack, setLoadingPaystack] = useState(false);
  const [verified, setVerified] = useState(false);
  const recaptchaRef = useRef(null);

  const products = [
    {
      id: "dark-edition",
      title: "BVD - DARK EDITION TEE AND CAP",
      price: 25000,
      desc:
        'Bold black tee and cap set featuring the cracked heart + cross print. "Light Lives In My Darkness." Limited drop.',
      img: darkEdition,
    },
    {
      id: "original-edition",
      title: "BVD ORIGINAL TEE AND CAP",
      price: 20000,
      desc:
        'Classic BVD logo tee and cap set. “AM NOT BAD JUST BVD.” Signature 17 & Dangerous collection.',
      img: originalEdition,
    },
  ];

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  const total = cart.reduce((s, p) => s + p.price, 0);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

  useEffect(() => {
    if (!window.PaystackPop) {
      setLoadingPaystack(true);
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      s.onload = () => setLoadingPaystack(false);
      s.onerror = () => {
        setLoadingPaystack(false);
        console.error("Failed to load Paystack script");
      };
      document.body.appendChild(s);
    }
  }, []);

  function openPaystack({ email, amountNGN, metadata = {} }) {
    if (!window.PaystackPop) {
      alert("Payment unavailable right now — try again in a moment.");
      return;
    }
    if (!PAYSTACK_PUBLIC_KEY) {
      alert("Paystack key missing. Add VITE_PAYSTACK_PUBLIC_KEY to .env");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amountNGN * 100,
      currency: "NGN",
      metadata,
      callback: (response) => alert("Payment successful! Ref: " + response.reference),
    });
    handler.openIframe();
  }

  function buyPreorderBundle() {
    openPaystack({
      email: "sohbadmusics@gmail.com",
      amountNGN: 20000,
      metadata: { product: "17 & Dangerous Preorder Bundle" },
    });
  }

  function buyProduct(product) {
    openPaystack({
      email: "sohbadmusics@gmail.com",
      amountNGN: product.price,
      metadata: { product: product.title },
    });
  }

  const FORMSPREE_URL = "https://formspree.io/f/mnnovalk";

  async function submitToFormspree(formType, data, onSuccess, onError) {
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: formType }),
      });
      if (res.ok) onSuccess?.();
      else onError?.(await res.json());
    } catch (e) {
      onError?.(e);
    }
  }

  function handleCaptcha(value) {
    setVerified(!!value);
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur bg-black/60 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">BVD</div>
            <nav className="hidden md:flex gap-6 text-sm opacity-90">
              <a href="#music" className="hover:underline">Music</a>
              <a href="#shop" className="hover:underline">Clothing</a>
              <a href="#label" className="hover:underline">Label</a>
              <a href="#story" className="hover:underline">Story</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="text-sm py-2 px-3 border border-white/10 rounded">Contact</a>
            <button
              className="text-sm py-2 px-3 bg-white text-black rounded"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
              Join the List
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">AM NOT BAD — JUST BVD</h1>
            <p className="mt-6 max-w-xl text-gray-300">
              A creative universe where music, fashion and stories collide. From SOHBVD — streetwear with a soul.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#shop" className="px-6 py-3 bg-red-600 rounded text-sm font-semibold">Shop Dark Edition</a>
              <a href="#music" className="px-6 py-3 border border-white/10 rounded text-sm">Listen</a>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1 text-center">
            <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-gray-900 via-black to-black p-12 flex items-center justify-center" style={{ height: 380 }}>
                <div className="text-center">
                  <div className="text-3xl font-bold">BVD</div>
                  <div className="mt-3 text-sm text-gray-400">SOHBVD • 17 & Dangerous</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PREORDER */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/5 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Preorder Bundle — 17 & Dangerous</h3>
            <p className="text-sm text-gray-400 mt-2">Get the exclusive preorder bundle — limited stock.</p>
          </div>
          <button onClick={buyPreorderBundle} className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:opacity-90 transition">
            Buy Preorder Bundle — ₦20,000
          </button>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Shop — Featured Drops</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <motion.div key={p.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 rounded-lg p-5 flex flex-col">
              <div className="h-56 bg-black/60 rounded overflow-hidden flex items-center justify-center">
                <img src={p.img} alt={p.title} className="object-cover w-full h-full" />
              </div>
              <div className="mt-4 flex-1">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-xs text-gray-400 mt-2">{p.desc}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-bold">₦{p.price.toLocaleString()}</div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 text-sm border border-white/10 rounded" onClick={() => addToCart(p)}>Add</button>
                  <button onClick={() => buyProduct(p)} className="px-3 py-2 text-sm bg-red-600 rounded">Buy</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-3xl font-bold">Music & Studio</h2>
        <div className="mt-6">
          <iframe
            src="https://open.spotify.com/embed/artist/7v5P2hsoBz1pYlD8Rhc60V?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="mt-6">
          <iframe
            src="https://audiomack.com/embed/SOHBVD/album/17-and-dangerous"
            scrolling="no"
            width="100%"
            height="352"
            frameBorder="0"
            title="17 AND DANGEROUS"
          ></iframe>
        </div>
      </section>

      {/* LABEL / DEMO SUBMIT */}
      <section id="label" className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-3xl font-bold">BVD Records</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold">Demo Submission</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target;
                if (!verified) {
                  alert("Please verify you are not a robot before submitting.");
                  return;
                }
                submitToFormspree(
                  "Demo submission",
                  { artist: f.artist.value, email: f.email.value, link: f.link.value },
                  () => {
                    alert("Demo submitted — we'll be in touch.");
                    f.reset();
                    setVerified(false);
                    recaptchaRef.current?.reset();
                  },
                  () => alert("Submit failed — try again.")
                );
              }}
              className="mt-4 space-y-3"
            >
              <input name="artist" placeholder="Artist name" className="w-full bg-white/5 rounded p-2 text-sm" required />
              <input name="email" placeholder="Email" className="w-full bg-white/5 rounded p-2 text-sm" type="email" required />
              <input name="link" placeholder="Link to track (YouTube / Audiomack)" className="w-full bg-white/5 rounded p-2 text-sm" required />
              <button type="submit" className="w-full px-4 py-2 bg-white text-black rounded text-sm">Submit Demo</button>
              <div className="mt-3 flex justify-center">
                <ReCAPTCHA
                  sitekey="6LdwV_srAAAAAE2SIvRQ_AFfC3EtnmI-GXvs_HqN"
                  onChange={handleCaptcha}
                  onExpired={() => setVerified(false)}
                  ref={recaptchaRef}
                />
              </div>
            </form>
          </div>
          <div>
            <h4 className="font-semibold">Roster & Vision</h4>
            <p className="text-xs text-gray-400 mt-2">Upcoming artists and brand vision.</p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-3xl font-bold">The Story</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded">
            <h4 className="font-semibold">Origin</h4>
            <p className="text-xs text-gray-400 mt-2">From music to fashion — the path to BVD.</p>
          </div>
          <div className="bg-white/5 p-4 rounded">
            <h4 className="font-semibold">Philosophy</h4>
            <p className="text-xs text-gray-400 mt-2">“Light lives in my darkness.”</p>
          </div>
          <div className="bg-white/5 p-4 rounded">
            <h4 className="font-semibold">Community</h4>
            <p className="text-xs text-gray-400 mt-2">How we uplift creators and fans.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="md:flex md:gap-8">
          <div className="md:flex-1">
            <h2 className="text-2xl font-bold">Contact & Bookings</h2>
            <p className="text-gray-400 mt-2">Business inquiries, bookings, and press.</p>
            <div className="mt-4 bg-white/5 p-4 rounded">
              <p className="text-xs">Email: sohbadmusics@gmail.com</p>
              <p className="text-xs mt-1">WhatsApp: 08074317573</p>
            </div>
          </div>

          <div className="md:w-96 mt-6 md:mt-0">
            <h4 className="font-semibold">Join the mailing list</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target;
                if (!verified) {
                  alert("Please verify you are not a robot before subscribing.");
                  return;
                }
                submitToFormspree(
                  "Subscribe",
                  { email: f.email.value },
                  () => {
                    alert("Subscribed — thanks!");
                    f.reset();
                    setVerified(false);
                    recaptchaRef.current?.reset();
                  },
                  () => alert("Subscribe failed — try again.")
                );
              }}
              className="mt-3"
            >
              <input name="email" placeholder="Email address" className="w-full bg-white/5 rounded p-2 text-sm" type="email" required />
              <button type="submit" className="w-full mt-3 px-4 py-2 bg-red-600 rounded text-sm">Subscribe</button>
              <div className="mt-3 flex justify-center">
                <ReCAPTCHA
                  sitekey="6LdwV_srAAAAAE2SIvRQ_AFfC3EtnmI-GXvs_HqN"
                  onChange={handleCaptcha}
                  onExpired={() => setVerified(false)}
                  ref={recaptchaRef}
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section id="socials" className="max-w-6xl mx-auto px-6 py-10 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Connect with SOHBVD</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="https://open.spotify.com/artist/7v5P2hsoBz1pYlD8Rhc60V" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Spotify</a>
          <a href="https://www.instagram.com/sohbvd_684/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Instagram</a>
          <a href="https://audiomack.com/SOHBVD" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Audiomack</a>
          <a href="https://music.apple.com/ng/artist/sohbadmusics/1643165171" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Apple Music</a>
          <a href="https://youtube.com/@sohbvd" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">YouTube</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SOHBVD / BVD — All Rights Reserved
      </footer>
    </div>
  );
}
