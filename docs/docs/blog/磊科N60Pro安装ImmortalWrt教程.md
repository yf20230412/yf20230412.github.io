### **开箱＆官方固件**

外包装和磊科N60一致，黄色的纸箱尺寸还挺大的，质感不错。

![](http://2015888.xyz/static/NetcoreN60Pro/1.jpg)
▲ 12V/2A的电源、6类网线、说明书、路由器本体，有些人觉得造型很丑，我觉得还好，像飞碟。

![](http://2015888.xyz/static/NetcoreN60Pro/2.jpg)
▲ 升级的USB3.0接口、WAN口和LAN1口是2.5G，其余3个LAN是1G，DC电源、电源开关键，独立开关机有个好处是，进入uboot的时候开关电源很方便，不需要来回插拔。

![](http://2015888.xyz/static/NetcoreN60Pro/3.jpg)
▲ 官方固件后台首页UI、有网速显示，后台地址：192.168.0.1

![](http://2015888.xyz/static/NetcoreN60Pro/4.jpg)
▲ 磊科不锁SSH，方便我们刷机

![](http://2015888.xyz/static/NetcoreN60Pro/5.jpg)
▲ 官方固件USB接口只能当做共享文件使用，开启SMB共享设置一下用户名和密码以及权限，保存即可生效

![](http://2015888.xyz/static/NetcoreN60Pro/6.jpg)
▲ 路由器USB接口插入了固态硬盘、使用Win系统拖动文件，读取速度43MB/秒，写入速度47MB/秒；这个读写速度比较一般，有提升空间。

其他没什么看的了，官方固件功能有限，不支持端口聚合、自定义网口、USB上网、USB共享打印机等功能，无法发挥出硬件的实力，我们下面进入刷机OpenWrt环节。

### **备份官方固件**

刷机之前最好是备份一下系统分区，万一出故障后方便恢复官方系统。

使用SSH工具（推荐`MobaXter`）连接路由器（192.168.0.1），用户名：useradmin 密码：管理密码，注意用户名不是root

![](http://2015888.xyz/static/NetcoreN60Pro/7.jpg)
▲ 官方系统是基于Linux5.4.246内核，OpenWrt版本21.02，有5个分区，Factory
校准分区存储了MAC地址、无线射频校准参数、EEPROM等信息，每台机器都不同，必须备份。

输入下面代码、回车进行备份：

```bash
# 备份 BL2 引导分区（mtd1）
dd if=/dev/mtd1 of=/tmp/mtd1_BL2.bin

# 备份 u-boot-env 环境变量（mtd2）
dd if=/dev/mtd2 of=/tmp/mtd2_ubootenv.bin

# 备份 Factory 校准分区（mtd3，必选！）
dd if=/dev/mtd3 of=/tmp/mtd3_Factory.bin

# 备份 ubi 系统固件（mtd5）
dd if=/dev/mtd5 of=/tmp/mtd5_ubi.bin
```

![](http://2015888.xyz/static/NetcoreN60Pro/8.jpg)
▲ 使用Winscp工具或者MobaXter到tmp目录下载刚备份的4个文件到电脑保存备用

### **刷入Uboot**

U-Boot源自 hanwckf/bl-mt798x项目，由1715173329大佬制作，支持DHCP下发IP地址，无需手动配置 IP 地址。

> Uboot地址：<https://drive.wrt.moe/uboot/mediatek>

**磊科N60PRO刷机资料包：**

**链接：<https://pan.quark.cn/s/60389c4bbdc2>**

**提取码：Qryi**

![](http://2015888.xyz/static/NetcoreN60Pro/9.jpg)

下载`mt7986-netcore_n60-pro-fip.bin`文件，将下载好的uboot传到/tmp 目录下，运行下面代码：
    
```bash
mtd write /tmp/mt7986-netcore_n60-pro-fip.bin FIP  
``` 

![](http://2015888.xyz/static/NetcoreN60Pro/10.jpg)
▲ 如图显示则uboot刷入成功

**然后路由器断电、把网线插入千兆LAN口接入电脑，**

![](http://2015888.xyz/static/NetcoreN60Pro/11.jpg) 
▲ 使用顶针按住机身底部的Reset按键不动再接通电、8s后电源灯变成蓝灯慢闪进入uboot模式了，再松开。

### **刷入大功率immortalwrt固件**

OpenWrt固件采用237176253大佬的闭源大功率固件，

![](http://2015888.xyz/static/NetcoreN60Pro/12.jpg)
▲ 电脑浏览器输入：192.168.1.1 进入uboot界面，选择下载好的的`immortalwrt-mediatek-
mt7986-netcore_n60-pro-squashfs-sysupgrade.bin`固件，上传刷入固件即可。

更新过程电源灯闪烁，闪烁停止说明更新完成。

输入192.168.6.1，这个地址进入ImmortalWrt。（不要一直在192.168.1.1这里琢磨了，1.1这个界面会一直转，不用管）

注意：如果192.168.6.1不显示登录界面，两个步骤，一个是DHCP状态下不能显示界面，关闭电源重启路由器，再试。一个是修改电脑ip为6.X网段，再试。

### **恢复官方固件**

![](http://2015888.xyz/static/NetcoreN60Pro/13.jpg)

如果需要恢复原厂固件，进入uboot后选择之前备份的`mtd5_ubi.bin`文件刷入即可。

### **5G无线信号测试**

采用自建speedtest服务，测试户型如图，路由器放置客厅角落弱电箱旁，测试穿墙效果如何

![](http://2015888.xyz/static/NetcoreN60Pro/14.jpg)
▲ 主卧靠墙角与路由器所在位置有两面墙、有部分是承重墙体比较厚，信号衰减的很严重，难度比较大

![](http://2015888.xyz/static/NetcoreN60Pro/15.jpg)
▲ 近距离和中距离都很稳定能跑满千兆带宽，死角位置大功率固件有一定的提升、但不多。

### **immortalwrt系统**

默认IP：192.168.6.1 用户名：root 密码无

![](http://2015888.xyz/static/NetcoreN60Pro/16.jpg)
▲ immortalwrt固件大家很熟悉了，剩下的可以随便折腾了、这个固件支持USB上网，插入手机或者上网卡后新建一个接口，设置下即可。

### **FAST网速测试**

![](http://2015888.xyz/static/NetcoreN60Pro/17.jpg) 
▲ FAST测速在800到900Mbps之间，属于MT7986A处理器正常水平，接近跑满千兆带宽了。

### **SMB网络共享**

来到服务→网络共享，

![](http://2015888.xyz/static/NetcoreN60Pro/18.jpg)
▲ 名称随意，路径在挂载点查看挂载的路径，一般是`/mnt/sda1`，点击保存并应用。

这一步开启了smb共享文件，Mac电脑可以直接前往服务器，输入路由器IP，选择客人模式即可访问文件夹，Win系统默认不允许匿名访问共享文件夹，我们需要创建一个用户。

**SSH连接路由器，Ksmbd进行共享，添加用户和密码的步骤如下：**

```bash
ksmbd.adduser -a user  
```    

  * 统会提示输入密码。输入密码时，终端不会显示任何字符，这是正常现象,输入密码后，再次确认密码。
  
```bash
/etc/init.d/ksmbd restart  
```

  * 重启一下ksmbd服务

进入我的电脑输入`\\192.168.6.1`，输入用户名和密码，即可连接。

![](http://2015888.xyz/static/NetcoreN60Pro/19.jpg)
▲ 这次读写速度比官方固件快多了，拖动文件读取速度大概100MB左右，略微超越了千兆带宽，写入速度70MB左右。

### **安装istore商店**

为了方便我们安装插件，推荐安装一个istore商店，里面有很多实用的插件方便使用，

![](http://2015888.xyz/static/NetcoreN60Pro/20.jpg)
▲ 刚刷好系统剩余的软件包空间还有64MB，虽然不多，装7个左右常用的插件是够了的

SSH连接路由器后，逐条输入下面代码：

```bash
opkg update || exit 1
cd /tmp
wget https://github.com/linkease/openwrt-app-actions/raw/main/applications/luci-app-systools/root/usr/share/systools/istore-reinstall.run
chmod 755 istore-reinstall.run
./istore-reinstall.run
```

有报错也没有关系，安装完成后退出登录、重新进入后台，就有istore商店了

![](http://2015888.xyz/static/NetcoreN60Pro/21.jpg)
▲ 我安装了几款插件后还剩余40MB左右的空间。

### **功耗**

![](http://2015888.xyz/static/NetcoreN60Pro/22.jpg) 
▲ 没有插入USB硬盘，待机功耗6W左右，算是比较低。


###  磊科N60PRO安装istore商店以及U盘扩容软件包方法
  
磊科N60PRO升级了512MB大内存+2个2.5G网口+USB3.0接口，237大佬的高功率固件也挺好用，唯一的缺点是128MB闪存太小了，刷好固件，软件包可用空间只有60MB左右，安装不了几个插件。

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

### **总结**

::: danger
磊科N60PRO的双2.5G网口+512MB大内存在WiFi7时代也够用了，是一个一步到位的性价比之选，还有这个价位少见的USB3.0接口，给路由器可玩性上升了一个台阶，官方固件虽然功能有限，但我们刷入OpenWrt系统后，直接起飞~
::: 


<LastUpdated />
<confetti />

