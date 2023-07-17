export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.log = this.document.getElementById("log");
  }

  setData(log) {
    this.log.innerText = log;
  }
}
