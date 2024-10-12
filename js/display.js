function createRow(container, studentName, samples) {
  const row = document.createElement("div");
  row.style = `
    display:flex;
    height: auto;`;

  const rowLabel = document.createElement("h3");
  rowLabel.innerText = studentName;
  rowLabel.style = `
    display:flex;
    align-items: center;
    width: 15%;
    padding: 12px;
    overflow: auto;
    height: auto;`;
  row.appendChild(rowLabel);

  samples.forEach((sample) => {
    const { id, label } = sample;
    const imgs = document.createElement("img");
    imgs.setAttribute("src", constants.IMG_DIR + "/" + id + ".png");
    imgs.style = `
        display: flex;
        width: 100%;
        `;
    const rowContainer = document.createElement("div");
    rowContainer.style = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10%;
        background-color: white;
        flex-direction:column;
        margin: 3px;
        border-radius: 10px;
        `;
    const imgsTitle = document.createElement("h6");
    imgsTitle.innerText = label;
    rowContainer.appendChild(imgsTitle);
    rowContainer.appendChild(imgs);
    row.appendChild(rowContainer);
  });

  container.appendChild(row);
}
