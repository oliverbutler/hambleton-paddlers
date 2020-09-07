import Head from "next/head";
import Events from "components/Events";

export default function Home() {
  return (
    <main>
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">Hambleton Paddlers</h1>
              <h2 className="subtitle">
                {" "}
                Canoe and Kayak club for everyone from complete beginners to
                experienced paddlers
              </h2>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <p>Some content</p>s
      </div>
    </main>
  );
}
