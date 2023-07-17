export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.button = this.document.getElementById("button");
    this.status = this.document.getElementById("status");
    this.indicator = this.document.getElementById("indicator");
    this.button.addEventListener("click", async () => {
      await run("sm-process", this.data ? "stop" : "start");
    });
  }

  setData(data) {
    this.data = data;
    if (data) {
      this.status.innerText = "Running";
      this.indicator.style.backgroundColor = "var(--green)";
      this.button.innerText = "STOP";
    } else {
      this.status.innerText = "Not running";
      this.indicator.style.backgroundColor = "var(--red)";
      this.button.innerText = "Start";
    }
  }
}
