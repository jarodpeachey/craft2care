(function () {
  const notBuild = typeof window !== "undefined";

  function addScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    console.log("Appended script: ", script);
  }
})();
