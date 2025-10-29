import React, { useState } from 'react';
import { motion } from 'framer-motion';
import darkEdition from './assets/darkEdition.png';
import originalEdition from './assets/originalEdition.png';

export default function BVDWebsite() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 'dark-edition',
      title: 'BVD - DARK EDITION TEE AND CAP',
      price: 25000,
      desc: 'Bold black tee and cap set featuring the cracked heart + cross print. "Light Lives In My Darkness." Limited drop.',
      img: darkEdition,
    },
    {
      id: 'original-edition',
      title: 'BVD ORIGINAL TEE AND CAP',
      price: 20000,
      desc: 'Classic BVD logo tee and cap set. “AM NOT BAD JUST BVD.” Signature 17 & Dangerous collection.',
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

  // Framer motion variants
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur bg-black/60 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">BVD</div>
            <nav className="hidden md:flex gap-6 text-sm opacity-90">
              <a href="#music" className="hover:underline">
                Music
              </a>
              <a href="#shop" className="hover:underline">
                Clothing
              </a>
              <a href="#label" className="hover:underline">
                Label
              </a>
              <a href="#story" className="hover:underline">
                Story
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="text-sm py-2 px-3 border border-white/10 rounded">
              Contact
            </a>
            <button
              className="text-sm py-2 px-3 bg-white text-black rounded"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              Join the List
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">AM NOT BAD — JUST BVD</h1>
            <p className="mt-6 max-w-xl text-gray-300">
              A creative universe where music, fashion and stories collide. From SOHBVD — streetwear with a soul.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#shop" className="px-6 py-3 bg-red-600 rounded text-sm font-semibold">
                Shop Dark Edition
              </a>
              <a href="#music" className="px-6 py-3 border border-white/10 rounded text-sm">
                Listen
              </a>
            </div>
            <div className="mt-8 text-sm text-gray-400">
              <strong>Drop 1:</strong> Original BVD & Dark Edition — limited stock.
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl">
              <div
                className="bg-gradient-to-br from-gray-900 via-black to-black p-12 flex items-center justify-center"
                style={{ height: 380 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">BVD</div>
                  <div className="mt-3 text-sm text-gray-400">SOHBVD • 17 & Dangerous</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <motion.section
        id="shop"
        className="max-w-6xl mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-3xl font-bold" variants={fadeUp}>
          Shop — Featured Drops
        </motion.h2>
        <motion.p className="text-gray-400 mt-2" variants={fadeUp}>
          Black, red, and white — streetwear that speaks.
        </motion.p>

        <motion.div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
          {products.map((p) => (
            <motion.div key={p.id} className="bg-white/5 rounded-lg p-5 flex flex-col" variants={fadeUp}>
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
                  <button
                    className="px-3 py-2 text-sm border border-white/10 rounded"
                    onClick={() => addToCart(p)}
                  >
                    Add
                  </button>
                  <a className="px-3 py-2 text-sm bg-red-600 rounded" href="#checkout">
                    Buy
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cart preview */}
        <div className="fixed right-6 bottom-6 bg-black/80 border border-white/5 rounded-lg p-4 w-64">
          <div className="flex items-center justify-between">
            <div className="text-sm">Cart</div>
            <div className="text-sm font-semibold">Items: {cart.length}</div>
          </div>
          <div className="mt-3 max-h-40 overflow-auto text-xs text-gray-300">
            {cart.length === 0 && <div className="text-gray-500">Cart is empty</div>}
            {cart.map((c, i) => (
              <div key={i} className="flex items-center justify-between mt-2">
                <div className="truncate">{c.title}</div>
                <div className="flex items-center gap-2">
                  <div>₦{c.price.toLocaleString()}</div>
                  <button className="text-red-500 text-xs" onClick={() => removeFromCart(i)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <div>Total</div>
            <div className="font-bold">₦{total.toLocaleString()}</div>
          </div>
        </div>
      </motion.section>

      {/* MUSIC */}
      <motion.section
        id="music"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div className="md:flex md:gap-8" variants={fadeUp}>
          <div className="md:flex-1">
            <h2 className="text-3xl font-bold">Music & Studio</h2>
            <p className="text-gray-400 mt-2">Latest releases, beats, and studio booking info.</p>

            <motion.div className="mt-6" variants={fadeUp}>
              <iframe
                src="https://open.spotify.com/embed/artist/7v5P2hsoBz1pYlD8Rhc60V?utm_source=generator&theme=0"
                width="100%"
                height="380"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                title="Spotify Player"
              ></iframe>
            </motion.div>

            <motion.div className="mt-6" variants={fadeUp}>
              <h3 className="font-semibold">Studio Booking</h3>
              <p className="text-sm text-gray-400">
                Mixing, mastering, and sessions by appointment. Email bookings@bvdworld.com
              </p>
            </motion.div>
          </div>

          <motion.div className="md:w-96 mt-8 md:mt-0" variants={fadeUp}>
            <div className="bg-white/5 p-4 rounded">
              <h4 className="font-semibold">Latest Drop — 17 & Dangerous</h4>
              <p className="text-xs text-gray-400 mt-2">Preorder merch bundles and exclusive sounds.</p>
              <div className="mt-4">
                <a className="block text-center px-4 py-2 bg-red-600 rounded" href="#shop">
                  Preorder Bundle
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* LABEL */}
      <motion.section
        id="label"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-3xl font-bold" variants={fadeUp}>BVD Records</motion.h2>
        <motion.p className="text-gray-400 mt-2" variants={fadeUp}>A space for raw voices — demos, development, and releases.</motion.p>

        <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerContainer}>
          <motion.div variants={fadeUp}>
            <h4 className="font-semibold">Demo Submission</h4>
            <p className="text-xs text-gray-400 mt-2">Send your best track. We listen and respond to the most promising artists.</p>
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Demo submitted — replace with backend endpoint');
              }}
            >
              <input className="w-full bg-white/5 rounded p-2 text-sm" placeholder="Artist name" required />
              <input className="w-full bg-white/5 rounded p-2 text-sm" placeholder="Email" type="email" required />
              <input className="w-full bg-white/5 rounded p-2 text-sm" placeholder="Link to track (YouTube / Audiomack)" required />
              <button className="w-full px-4 py-2 bg-white text-black rounded text-sm">Submit Demo</button>
            </form>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-semibold">Roster & Vision</h4>
            <p className="text-xs text-gray-400 mt-2">Feature upcoming artists and label philosophy here.</p>
            <div className="mt-4 space-y-3">
              <div className="bg-white/5 rounded p-3">Artist slot — coming soon</div>
              <div className="bg-white/5 rounded p-3">Artist slot — coming soon</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* STORY */}
      <motion.section
        id="story"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-3xl font-bold" variants={fadeUp}>The Story</motion.h2>
        <motion.p className="text-gray-400 mt-2" variants={fadeUp}>Why BVD exists — the emotion behind the brand and the music.</motion.p>

        <motion.div className="mt-8 grid md:grid-cols-3 gap-6" variants={staggerContainer}>
          <motion.article className="bg-white/5 p-4 rounded" variants={fadeUp}>
            <h4 className="font-semibold">Origin</h4>
            <p className="text-xs text-gray-400 mt-2">From music to fashion — the path to BVD.</p>
          </motion.article>

          <motion.article className="bg-white/5 p-4 rounded" variants={fadeUp}>
            <h4 className="font-semibold">Philosophy</h4>
            <p className="text-xs text-gray-400 mt-2">"Light lives in my darkness" — the heart of the brand.</p>
          </motion.article>

          <motion.article className="bg-white/5 p-4 rounded" variants={fadeUp}>
            <h4 className="font-semibold">Community</h4>
            <p className="text-xs text-gray-400 mt-2">How we uplift creators and fans.</p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div className="md:flex md:gap-8" variants={fadeUp}>
          <div className="md:flex-1">
            <h2 className="text-2xl font-bold">Contact & Bookings</h2>
            <p className="text-gray-400 mt-2">Business inquiries, bookings, and press.</p>
            <div className="mt-4 bg-white/5 p-4 rounded">
              <p className="text-xs">Email: sohbadmusics@gmail.com</p>
              <p className="text-xs mt-1">WhatsApp: 08074317573</p>
            </div>
          </div>

          <motion.div className="md:w-96 mt-6 md:mt-0" variants={fadeUp}>
            <h4 className="font-semibold">Join the mailing list</h4>
            <form
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed — replace with real endpoint');
              }}
            >
              <input
                className="w-full bg-white/5 rounded p-2 text-sm"
                placeholder="Email address"
                type="email"
                required
              />
              <button className="w-full mt-3 px-4 py-2 bg-red-600 rounded text-sm">Subscribe</button>
            </form>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SOCIAL LINKS */}
      <motion.section
        id="socials"
        className="max-w-6xl mx-auto px-6 py-10 border-t border-white/5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-2xl font-bold mb-4" variants={fadeUp}>Connect with SOHBVD</motion.h2>
        <motion.div className="flex flex-wrap justify-center gap-4 text-sm" variants={fadeUp}>
          <a href="https://open.spotify.com/artist/7v5P2hsoBz1pYlD8Rhc60V" target="_blank" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Spotify</a>
          <a href="https://www.instagram.com/sohbvd_684/" target="_blank" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Instagram</a>
          <a href="https://m.youtube.com/@SOHBVD/playlists" target="_blank" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">YouTube</a>
          <a href="mailto:sohbadmusics@gmail.com" className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">Email</a>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-8 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} BVD World — Built in the Dark Ends
        </div>
      </footer>
    </div>
  );
}
