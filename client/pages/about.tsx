import PageContent from "components/PageContent";
import { motion } from "framer-motion";

const about = ({ content }) => {
  return (
    <div className="container mt-5">
      <div className="content" id="about">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="title is-3">{content.page_title}</h3>
          <PageContent content={content.page_content} />
        </motion.div>
      </div>
    </div>
  );
};

export default about;

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/about-page");

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
