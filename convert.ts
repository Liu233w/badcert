import { walk, readFileStr, writeFileStr, ensureDir, exists } from "https://deno.land/std/fs/mod.ts"

await ensureDir("cer");

for await (const file of walk("pem")) {
  if (!file.isFile || !file.path.endsWith('.pem')) {
    continue
  }

  let fileContent = await readFileStr(file.path)
  fileContent = fileContent.trim()

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

  fileContent = fileContent.substr(fileContent.indexOf("-----BEGIN CERTIFICATE-----"))

  await writeFileStr(validName, fileContent)
}