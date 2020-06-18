import { walk } from "https://deno.land/std/fs/mod.ts"

for await (const file of  walk("pem")) {
  
}