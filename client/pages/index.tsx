import Head from "next/head";
import Events from "components/Events";
import About from "components/About/About";
import { getInstance } from "utils/axios";

export default function Home({ content }) {
  return (
    <main>
      <div>
        <section className="hero is-medium is-primary">
          <div
            className="hero-body"
            id="header"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url("${content.header_photo.url}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container">
              <h1 className="title is-1">Hambleton Paddlers</h1>
              <h2 className="subtitle"> {content.header}</h2>
            </div>
          </div>
        </section>
      </div>
      <div className="container mt-6">
        <div className="content">
          <About content={content} />
        </div>
      </div>
    </main>
  );
}

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
