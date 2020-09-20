import React from "react";
import styles from "./Documents.module.scss";
import Link from "next/link";

const Documents = ({ documents }) => {
  return (
    <div>
      {documents.map((document, index) => (
        <Link href={document.file.url}>
          <div
            key={`document-${index}`}
            className={styles.document + " py-2 px-2 mb-3"}
          >
            <div className={"pr-3 " + styles.img}>
              <ion-icon name="document-outline"></ion-icon>
            </div>
            <div>
              <p>
                <b>{document.name}</b> <br />
                {document.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Documents;
