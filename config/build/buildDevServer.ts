import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions) : DevServerConfiguration 
{ return {
        port: options.port ?? 3000,
        open: true,
        //если раздавать статику через nginx то нужно проксирование на Index.html
        historyApiFallback: true
    }
}

// ,
//         historyApiFallback: true,
//         hot: true