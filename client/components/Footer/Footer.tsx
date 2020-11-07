import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Hambleton Paddlers</strong> site by{" "}
          <a href="https://github.com/oliverbutler">Oliver Butler</a>
        </p>
        <hr />
        <p>
          <Link href="/documents">
            <a>Hard Copy Documents</a>
          </Link>
        </p>
        <p>
          <a href="https://strapi-hambleton-paddlers.herokuapp.com/admin/plugins/content-manager/collectionType/application::event.event">
            Admin Interface
          </a>
        </p>
        <hr />

        <p>© Hambleton Paddlers {new Date().getFullYear()}.</p>
      </div>
    </footer>
  );
};

export default Footer;
