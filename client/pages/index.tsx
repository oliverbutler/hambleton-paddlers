import Head from "next/head";
import Events from "components/Events";
import About from "components/About/About";

export default function Home({ content }) {
  return (
    <main>
      <div>
        <section className="hero is-medium is-primary">
          <div className="hero-body" id="header">
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
  const res = await fetch("http://localhost:1337/home-page");
  const content = await res.json();

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
