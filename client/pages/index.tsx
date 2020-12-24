import Image from "components/Image";
import PageContent from "components/PageContent";
import { motion } from "framer-motion";
import Markdown from "components/Markdown";
import Axios from "axios";
import axios from "axios";

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
            image={content.header_photo}
            alt="Header image of kayakers kayaking"
            style={{ position: "absolute" }}
            blur
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
            <PageContent content={content.dynamic_content} />

            {content.alerts?.map((alert, alertIndex) => (
              <article
                className={`mt-4 message is-${alert.type}`}
                key={`alert-${alertIndex}`}
              >
                <div className="message-header">
                  <p>{alert.header}</p>
                </div>
                <div className="message-body">
                  <Markdown>{alert.body}</Markdown>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default index;

export const getStaticProps = async () => {
  // console.log(process.env.NEXT_PUBLIC_HOST + "/home-page");

  // const options = {
  //   url: process.env.NEXT_PUBLIC_HOST + "/home-page",
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json;charset=UTF-8",
  //   },
  // };

  // var response = await Axios(options);

  // var response = await Axios.get(process.env.NEXT_PUBLIC_HOST + "/home-page");

  // console.log(response);

  // var data = await fetch(process.env.NEXT_PUBLIC_HOST + "/home-page");

  // console.log(await data.json());

  const content = await Axios.get(process.env.NEXT_PUBLIC_HOST + "/home-page")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
