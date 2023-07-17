export class Component {
  status = true;
  log = "hi";

  constructor(service) {
    this.service = service;
    setTimeout(() => {
      this.status = false;
      this.service.overviewReload();
      this.service.viewReload();
    }, 5000);

    setTimeout(() => {
      this.log = "hello";
      this.service.viewUpdate("sm-process", "log-widget");
    }, 7000);
  }

  functions = {
    start: async () => {},

    stop: async () => {},
  };

  getData = (widget) => {
    if (widget == "small-widget" || widget == "main-widget") return this.status;
    if (widget == "log-widget") return this.log;
  };

  smallWidgets = ["small-widget"];
  mainWidgets = ["main-widget", "log-widget"];

  configConfig = [
    {
      name: "run",
      input: "text",
      value: "node .",
    },
    {
      name: "autoStart",
      input: "bool",
      value: true,
    },
    {
      name: "autoRestart",
      input: "bool",
      value: false,
    },
  ];
}
