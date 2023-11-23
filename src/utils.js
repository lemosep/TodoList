import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rootPath = (...segments) => join(__dirname, "..", ...segments);
// spread operation
export const htmlPath = (...segments) => rootPath("src", "html", ...segments);
