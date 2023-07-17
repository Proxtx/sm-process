export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.button = this.document.getElementById("button");
    this.status = this.document.getElementById("status");
    this.indicator = this.document.getElementById("indicator");
  }

  setData(data) {
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
