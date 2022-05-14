import { Config, Plugin } from "./generator";

interface PluginMap {
  [key: string]: Plugin[];
}

export enum LifecycleName {
  Before = "before",
  After = "after",
}

export class Lifecycle {
  pluginMap: PluginMap = {};
  constructor(public config: Config) {
    config.plugins?.forEach((plugin) => {
      let plugins = this.pluginMap[plugin.lifecycle];
      if (plugins) {
        plugins.push(plugin);
      } else {
        this.pluginMap[plugin.lifecycle] = [plugin];
      }
    });
  }
  before() {
    this.pluginMap[LifecycleName.Before]?.forEach((plugin) => {
      this.config = plugin.execute(this.config) || this.config;
    });
  }
  after() {
    this.pluginMap[LifecycleName.After]?.forEach((plugin) => {
      this.config = plugin.execute(this.config) || this.config;
    });
  }
}
