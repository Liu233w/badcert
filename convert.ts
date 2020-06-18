import { walk, readFileStr, writeFileStr, ensureDir, exists } from "https://deno.land/std/fs/mod.ts"

await ensureDir("cer");

for await (const file of walk("pem")) {
  if (!file.isFile || !file.path.endsWith('.pem')) {
    continue
  }

  let fileContent = await readFileStr(file.path)
  fileContent = fileContent.trim()
  await writeFileStr("./cer/temp.pem", fileContent)

  const cn = fileContent.split(/\r?\n/)[0]
    .match(/CN = (.*)/)![1];

  // console.log('cn', cn)

  let name
  if (cn.startsWith('"')) {
    name = cn.substr(1, cn.length - 2)
  } else if (cn.startsWith("\\")) {
    name = new TextDecoder("utf-8").decode(
      new Uint8Array(cn.split('\\').slice(1).map(n => parseInt(n, 16))));
  } else {
    name = cn
  }
  console.log('name', name)

  // from https://stackoverflow.com/a/42210346
  const validName = name.replace(/[/\\?%*:|"<>]/g, '-')

  let resultName = `cer/${validName}.cer`
  if (await exists(resultName)) {
    let number = 2;
    resultName = `cer/${validName}-${number}.cer`
    while (await exists(resultName)) {
      ++number;
      resultName = `cer/${validName}-${number}.cer`
    }
  }

  await Deno.run({
    cmd: ["openssl", "x509", "-outform", "der", "-in", "cer/temp.pem", "-out", resultName],
    stderr: "piped",
    stdout: "piped",
  }).status()
}

await Deno.remove("cer/temp.pem")

// const a = String.raw`\E7\A6\8F\E5\BB\BA\E5\8D\9A\E7\91\9E\E7\BD\91\E7\BB\9C\E7\A7\91\E6\8A\80\E6\9C\89\E9\99\90\E5\85\AC\E5\8F\B8`
// const b = a.split('\\').slice(1)
// console.log(b)
// console.log(new TextDecoder("utf-8").decode(
//   new Uint8Array(b.map(n => parseInt(n, 16)))))