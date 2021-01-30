import path from "path";
import { Command } from "commander";
import { serve } from "@jsxrunner/local-api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("open a file for editting")
  .option("-p, --port <number>", "port to run the server on", "4005")
  .action(async (filename = "codefile.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate http://localhost:${options.port} to edit`
      );
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        console.error("port in use. Try running on a different port");
      } else {
        console.log("Problem:", err);
      }
      process.exit(1);
    }
  });
