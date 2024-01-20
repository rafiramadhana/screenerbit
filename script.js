function getData() {
    let h = new Array();
    document.querySelectorAll("table > thead > tr > th").forEach((v) => {
      vv = v.querySelector("div > span");
      if (vv !== null) {
        h.push(vv.innerText);
      }
    });
    let b = new Array();
    document.querySelectorAll("table > tbody > tr").forEach((v) => {
      vv = v.innerText.replace(/(\r\n|\n|\r)/gm, "").split("\t");
      b.push(vv);
    });
    b.shift(); // Remove body's index 0 because it is empty
    let data = new Array();
    data.push(h);
    data.push(...b);
    return data;
  }
  
  // https://stackoverflow.com/a/68146412
  function toCsv(data) {
    return data
      .map((row) =>
        row
          .map(String)
          .map((v) => v.replaceAll('"', '""'))
          .map((v) => `"${v}"`)
          .join(",")
      )
      .join("\r\n");
  }
  
  // https://stackoverflow.com/a/68146412
  function addDownloadCSVButton(content, filename, contentType) {
    let blob = new Blob([content], { type: contentType });
    let url = URL.createObjectURL(blob);
    let btn = document.querySelector(".ant-btn-primary"); // "Create New" button
    let newBtn = btn.cloneNode(true);
    newBtn.setAttribute("id", "download-csv");
    newBtn.innerText = "Download CSV";
    let hyper = document.createElement("a"); // Use hyperlink to make the "Download CSV" button clickable
    hyper.appendChild(newBtn);
    btn.before(hyper); // Add "Download CSV" button
    hyper.href = url;
    hyper.setAttribute("download", filename);
  }
  
  function main() {
    addDownloadCSVButton(
      toCsv(getData()),
      "screenerbit.csv",
      "text/csv;charset=utf-8;"
    );
  }
  
  main();
  