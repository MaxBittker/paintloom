require("esbuild").buildSync({
  entryPoints: ["src/app.tsx"],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["chrome58", "firefox57", "safari11", "edge16"],
  outfile: "dist/out.js",
});
