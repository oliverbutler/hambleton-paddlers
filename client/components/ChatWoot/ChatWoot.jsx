import React, { useEffect } from "react";

const ChatWoot = () => {
  function loadChatWoot() {
    (function (d, t) {
      var BASE_URL = "https://app.chatwoot.com";
      var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      s.parentNode.insertBefore(g, s);
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: "CKXK4KF1rAoggXBaaiZw3HFP",
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }

  useEffect(() => {
    loadChatWoot();
  }, []);

  return <div></div>;
};

export default ChatWoot;
