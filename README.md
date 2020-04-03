# badcert

用来给我们所唾弃的软件签名的证书集合。
除作者收集的证书以外，还包含了 [chinawareblock](https://github.com/sharoue/chinawareblock) 中的所有证书。现有 166 个证书。

A collection of certificates that sign unwanted software.
Apart from certificates collected by the author, all certificates from [chinawareblock](https://github.com/sharoue/chinawareblock) are included. Now there are 166 certificates.

[Telegram 群 Telegram group](https://t.me/badcert)

如果你发现了未被 badcert 收录的坏证书，我们欢迎你将此证书发送到 Telegram 群中，之后它很可能就会被收录。

If you ever find a bad cert that has not been included in badcert, you are welcomed to send it to the Telegram group. It is very likely that it will be included in this certificate store.

## 一台 Windows 电脑上的安装

1. 下载 `badcerts.p7b`。
1. 运行 `mmc` 或 `certmgr`。（如果想要管理“本地计算机”的证书，则需要以管理员身份运行。）
1. (如果运行了 `mmc`) 添加控制台的证书管理单元。
1. 转到“不信任的证书”，右键空白处，在上下文菜单中选择“导入”。
1. 选择 `badcerts.p7b`。

此时，你应该可以看到列表中出现了证书。

请注意，证书存储有多个位置。“本地计算机”中的存储对这台电脑上的所有用户都有效，而“用户”中的存储只对这个用户有效。在一般情况下，你需要将证书安装到“本地计算机”中，才能阻止以管理员身份运行的程序————你应该就想要这种效果。

## Installation on a Windows computer

1. Download `badcerts.p7b`.
1. Run `mmc` or `certmgr`. (If you'd like to manage certificates in "Local Computer", you need to run as administrator.)
1. (If you ran `mmc`) add the Certificate Management snap-in to the console.
1. Navigate to "Disallowed", right-click on the blank space and choose "Import" in the context menu.
1. Choose `badcerts.p7b`.

You should see certificates appear in the list now.

Keep in mind that certificates can be stored in different places. Certificates stored in "Local Computer" are effective for all users on the computer, while those in "User" are only effective for that user. In common cases, you need to install these certificates to "Local Computer" to prevent the programs being executed by an administrator, which you would probably choose to.
