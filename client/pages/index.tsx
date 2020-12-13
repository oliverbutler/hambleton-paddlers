import Head from "next/head";
import Events from "components/Events";
import About from "components/About/About";
import Image from "next/image";
import { motion } from "framer-motion";

const index = ({ content }) => {
  return (
    <main>
      <div>
        <section
          className="hero is-medium is-primary img-gradient"
          style={{
            position: "relative",
          }}
        >
          <Image
            src={content.header_photo.url}
            layout="fill"
            alt="Header image of kayakers kayaking"
          />

          <div className="hero-body" id="header">
            <div className="container" style={{ zIndex: 10 }}>
              <h1 className="title is-1">Hambleton Paddlers</h1>
              <h2 className="subtitle"> {content.header}</h2>
            </div>
          </div>
        </section>
      </div>
      <div className="container mt-5">
        <div className="content" id="about">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <About content={content} />

            <div className="img-gradient">
              <Image
                src={content.header_photo.url}
                layout="fill"
                alt="Header image of kayakers kayaking"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default index;

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/home-page");

  var content = [];
  try {
    content = await res.json();
  } catch (err) {
    console.log("Server error");
  }

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
