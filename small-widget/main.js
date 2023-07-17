export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.statusIndicator = this.document.getElementById("statusIndicator");
  }

  setData(data) {
    this.statusIndicator.style.backgroundColor = data
      ? "var(--green)"
      : "var(--red)";
  }
}
