import { spawn } from "child_process";

export class Component {
  status = false;
  log = "";

  constructor(service, config) {
    this.service = service;
    this.config = config;
    if (this.config.autoStart) this.functions.start();
  }

  updateLog(data) {
    this.log += data.toString();
    if (this.log.length > 10000)
      this.log = this.log.substring(this.log.length - 10000);
    this.service.viewUpdate("sm-process", "log-widget");
  }

  functions = {
    start: async () => {
      this.log = "";
      if (!this.process) {
        let run = this.config.run.split(" ");
	this.process = await spawn(run.shift(), run, {
          cwd: this.service.config.path,
        });
        this.process.stdout.on("data", (data) => {
          this.updateLog(data);
        });
        this.process.stderr.on("data", (data) => {
          this.updateLog(data);
        });
        this.process.addListener("close", () => {
          delete this.process;
          this.service.viewReload();
          if (this.config.autoRestart) this.functions.start();
        });
      }
      this.service.viewReload();
      this.service.overviewReload();
    },

    stop: async () => {
      this.process && this.process.kill();
      this.service.viewReload();
      this.service.overviewReload();
    },
  };

  unload() {
    this.process && this.process.kill();
  }

  getData = (widget) => {
    if (widget == "small-widget" || widget == "main-widget")
      return Boolean(this.process);
    if (widget == "log-widget") return this.log;
  };

  smallWidgets = ["small-widget"];
  mainWidgets = ["main-widget", "log-widget"];

  configConfig = [
    {
      name: "run",
      type: "text",
      value: "node .",
    },
    {
      name: "autoStart",
      type: "bool",
      value: true,
    },
    {
      name: "autoRestart",
      type: "bool",
      value: false,
    },
  ];
}
