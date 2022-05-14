import { generate } from "./api-generate";
import { Lifecycle, LifecycleName } from "./lifecycle";
import { mkdirIfNotExist, writeFile } from "../utils/file";

interface Api {
  title: string;
  name: string;
  method: string;
  path: string;
}

interface Module {
  name: string;
  commonPath: string;
  list: Api[];
}

export interface Plugin {
  name: string;
  lifecycle: LifecycleName;
  execute: (config?: Config) => Config | void;
}

export interface Config {
  outPath: string;
  requestPath: string;
  modules: Module[];
  plugins?: Plugin[];
  before?: Function;
  after?: Function;
}

export class Generator {
  lifecycle: Lifecycle;
  constructor(public config: Config) {
    this.lifecycle = new Lifecycle(config);
  }

  generate() {
    this.lifecycle.before();
    this.generateAll();
    this.lifecycle.after();
  }

  generateAll() {
    const { outPath, modules } = this.config;
    const [apiPath, modelPath] = [`./${outPath}/apis/`, `./${outPath}/models/`];
    mkdirIfNotExist(apiPath);
    mkdirIfNotExist(modelPath);
    modules.forEach((module) => {
      const { apiModuleContent, modelModuleContent } =
        this.generateModule(module);
      writeFile(`${apiPath}${module.name.toLowerCase()}.ts`, apiModuleContent);
      writeFile(
        `${modelPath}${module.name.toLowerCase()}.ts`,
        modelModuleContent
      );
    });
  }

  generateModule(module: Module) {
    const { name, list } = module;
    let apiModuleHeader =
      `/**\n` +
      ` *\n` +
      ` * Module: ${name}\n` +
      ` *\n` +
      `*/\n` +
      `import request from "${this.config.requestPath}";\n\n`;
    let modelModuleHeader =
      `/**\n` +
      ` *\n` +
      ` * Module: ${name}\n` +
      ` *\n` +
      `*/\n`;
    let apiContent = "";
    let modelContent = "";
    list.forEach((api) => {
      modelContent += this.generateModel(api, module);
      apiContent += this.generateApi(api, module);
    });
    return {
      apiModuleContent: apiModuleHeader + apiContent,
      modelModuleContent: modelModuleHeader + modelContent,
    };
  }

  generateModel(api: Api, module: Module) {
    const { name: moduleName } = module;
    const { name, title } = api;
    return (
      `/**\n` +
      ` * @description: ${title}\n` +
      ` * @param {ExtraParams} extraParmas \n` +
      `*/\n` +
      `export interface ${moduleName + name} {\n` +
      `  \n` +
      `  \n` +
      `};\n\n`
    );
  }

  generateApi(api: Api, module: Module) {
    const { name: moduleName, commonPath } = module;
    const { name, path, title, method } = api;
    return (
      `/**\n` +
      ` * @description: ${title}\n` +
      ` * @param {ExtraParams} extraParmas \n` +
      `*/\n` +
      `export const ${
        method.toLowerCase() + moduleName + name
      } = (params?, extraParmas?: ExtraParams): Promise<BaseResponse<>> => {\n` +
      `  const url = \`${commonPath}${path.replace(
        /\/{/g,
        "/${params?."
      )}\`;\n` +
      `  return request({ url, params, ...extraParmas });\n` +
      `};\n\n`
    );
  }
}
