#  磊科N60PRO安装istore商店以及U盘扩容软件包方法
  
磊科N60PRO到手折腾了几天，PRO升级了512MB大内存+2个2.5G网口+USB3.0接口，其他与N60一致。性价比很高，237大佬的高功率固件也挺好用，唯一的缺点是128MB闪存太小了，刷好固件，软件包可用空间只有60MB左右，安装不了几个插件。  
  
  
分享一下如何把插件安装到U盘里，并且如果你的固件没有istore商店，也可以安装一下，方便使用。  
  
**一：安装istore商店**  
SSH连接路由器后，逐条输入下面代码：  

```bash
opkg update || exit 1
cd /tmp
wget https://github.com/linkease/openwrt-app-actions/raw/main/applications/luci-app-systools/root/usr/share/systools/istore-reinstall.run
chmod 755 istore-reinstall.run
./istore-reinstall.run
```

有报错也没有关系，安装完成后退出登录、重新进入后台，就有istore商店了  
  
  
**二：插件安装到U盘，扩容overlay空间**  
使用外置U盘扩容overlay分区，带有USB接口的OP路由器都可以用这个方法。  
  
使用DiskGenius工具U盘格式化为EXT4格式，分区表类型要GUID格式(即GPT)，建议把U盘分成3个分区 ：
一个5G左右给软件包/overlay使用 一个1G给虚拟内存使用（如果物理内存不足，闲置数据可自动移到交换设备暂存，以增加可用的 RAM。）
最后一个分区给网络共享（轻NAS）使用  
  
**未安装插件**  

1、插入U盘，来到系统→挂载点→已挂载的文件系统，点击卸载分区，先卸载挂载好的U盘。  
  
2、挂载点→添加一个挂载点，UUID选择自己的U盘，挂载点“作为外部 /overlay 使用”  
  
3、保存并应用最后，重启路由器，即可生效。  
  
**已经安装插件**  
已经用了一段时间，系统有安装插件，需要迁移overlay分区数据到U盘，再挂载overlay分区，SSH连接路由器：  

```bash
把U盘挂载到/mnt/sda1
#迁移 /overlay 分区， 使用cp命令，将原/overlay分区文件，全部复制到 新建空间的挂载目录
cp -r /overlay/*  /mnt/sda1
cp -r /overlay/.fs_state /mnt/sda1
```

剩下的步骤和前面一样，卸载掉sda1分区，然后重新把/dev/sda1的挂载点换成：作为外部overlay使用，重启路由器生效，已经安装的插件不会丢失。  
  
<LastUpdated />
<confetti />