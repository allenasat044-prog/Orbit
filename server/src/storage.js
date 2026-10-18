import fs from "node:fs";
import path from "node:path";

export function createStorage(root) {
  const abs = path.resolve(root);
  const resolve = (rel) => {
    const p = path.resolve(abs, rel);
    if (p !== abs && !p.startsWith(abs + path.sep)) throw new Error("Path escapes the storage directory");
    return p;
  };
  return {
    root: abs,
    resolve,
    exists: (rel) => fs.existsSync(resolve(rel)),
    ensureDir: (rel) => fs.promises.mkdir(path.dirname(resolve(rel)), { recursive: true }),
    remove: (rel) => fs.promises.rm(resolve(rel), { force: true }),
  };
}
