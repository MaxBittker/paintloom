// import esbuild from "esbuild";
import esbuildServe from "esbuild-serve";
console.log("esbuildServe");

esbuildServe(
  {
    entryPoints: ["src/app.tsx"],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: ["chrome58"],
    outfile: "dist/out.js",
    define: { "process.env.NODE_ENV": '"development"' },
  },
  {
    // serve options (optional)
    port: 8080,
    root: "dist",
  }
);

// import { createServer, request } from "http";
// import { spawn } from "child_process";

// const clients = [];

// esbuild
//   .serve(
//     {
//       servedir: "dist",
//       port: 8080,
//     },
//     {
//       banner: {
//         js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();',
//       },
//       // watch: {
//       //   onRebuild(error, result) {
//       //     clients.forEach((res) => res.write("data: update\n\n"));
//       //     clients.length = 0;
//       //     console.log(error ? error : "...");
//       //   },
//       // },
//       entryPoints: ["src/app.tsx"],
//       bundle: true,
//       minify: false,
//       sourcemap: true,
//       target: ["chrome58"],
//       outfile: "dist/out.js",
//     }
//   )
//   .then(() => {
//     createServer((req, res) => {
//       const { url, method, headers } = req;
//       if (req.url === "/esbuild")
//         return clients.push(
//           res.writeHead(200, {
//             "Content-Type": "text/event-stream",
//             "Cache-Control": "no-cache",
//             Connection: "keep-alive",
//           })
//         );
//       const path = ~url.split("/").pop().indexOf(".") ? url : `/index.html`; //for PWA with router
//       req.pipe(
//         request(
//           { hostname: "0.0.0.0", port: 8000, path, method, headers },
//           (prxRes) => {
//             res.writeHead(prxRes.statusCode, prxRes.headers);
//             prxRes.pipe(res, { end: true });
//           }
//         ),
//         { end: true }
//       );
//     }).listen(3000);

//     setTimeout(() => {
//       const op = {
//         darwin: ["open"],
//         linux: ["xdg-open"],
//         win32: ["cmd", "/c", "start"],
//       };
//       const ptf = process.platform;
//       if (clients.length === 0)
//         spawn(op[ptf][0], [...[op[ptf].slice(1)], `http://localhost:3000`]);
//     }, 1000); //open the default browser only if it is not opened yet
//   });
