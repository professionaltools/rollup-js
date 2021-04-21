import path from "path"
import {nodeResolve} from "@rollup/plugin-node-resolve"
// import {terser} from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"
import vue from "rollup-plugin-vue"

const root = path.resolve(__dirname, "..")
export default {
  input: path.join(root, "components/index.js"),
  output: [{
    format: "es",
    file: "es/index.js",
  },{
    format: "cjs",
    file: "lib/index.js",
  }],
  external(id) {
    return /^vue/.test(id)
  },
  plugins: [
    // terser(),
    nodeResolve(),
    vue({
      target: "browser",
      css: false,
      exposeFilename: false,
    }),
    postcss({
      extensions: [".scss", ".css"],
    }),
  ],
}