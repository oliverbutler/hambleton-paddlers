import Axios from "axios";
import PageContent from "components/PageContent";
import { motion } from "framer-motion";
import { getInstance } from "utils/axios";
import { getToast } from "utils/functions";

const about = ({ content }) => {
  return (
    <div className="container mt-5">
      <div className="content" id="about">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="title is-3">{content?.page_title}</h3>
          <PageContent content={content?.page_content} />
        </motion.div>
      </div>
    </div>
  );
};

export default about;

export const getStaticProps = async () => {
  const content = await getInstance()
    .get("/about-page")
    .then((res) => res.data)
    .catch(() => null);

  if (!content) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
