import { LifecycleName } from "../lib/lifecycle";
import { Generator } from "../lib/generator";
// import axios from 'axios';

const exampleApiJson = [
  {
    name: "User",
    commonPath: "/user",
    list: [
      {
        title: "List",
        name: "List",
        method: "GET",
        path: "/list",
      },
      {
        title: "Info",
        name: "Info",
        method: "GET",
        path: "/info",
      },
    ],
  },
];

const config = {
    outPath: 'src/services',
    requestPath: '@/utils/request',
    modules: exampleApiJson,
    plugins: [
      {
        name: "before",
        lifecycle: LifecycleName.Before,
        execute(config: any) {
          console.log("before hook");
          console.log(config);
        },
      },
    ],
  }
new Generator(config);
