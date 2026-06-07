### **开箱＆官方固件**

外包装和磊科N60一致，黄色的纸箱尺寸还挺大的，质感不错。

![](https://pic4.zhimg.com/v2-faaf374703af417c0e6133c474da5591_1440w.jpg)
▲ 12V/2A的电源、6类网线、说明书、路由器本体，有些人觉得造型很丑，我觉得还好，像飞碟。

![](https://pica.zhimg.com/v2-63dabce8e939ec42c53a4f8a46114920_1440w.jpg)
▲ 升级的USB3.0接口、WAN口和LAN1口是2.5G，其余3个LAN是1G，DC电源、电源开关键，独立开关机有个好处是，进入uboot的时候开关电源很方便，不需要来回插拔。

![](https://pic2.zhimg.com/v2-84e1d97e1a778a1a56cf5f91f532c58d_1440w.jpg)
▲ 官方固件后台首页UI、有网速显示，后台地址：192.168.0.1

![](https://picx.zhimg.com/v2-69ee66025e7dfa54b357429c0ab20c5d_1440w.jpg)
▲ 磊科不锁SSH，方便我们刷机

![](https://pica.zhimg.com/v2-f26609029a3a4ccfed1dfc4e90e5f5c0_1440w.jpg)
▲ 官方固件USB接口只能当做共享文件使用，开启SMB共享设置一下用户名和密码以及权限，保存即可生效

![](https://pic3.zhimg.com/v2-87c62dcdfcadec891994fd504b064406_1440w.jpg)
▲ 路由器USB接口插入了固态硬盘、使用Win系统拖动文件，读取速度43MB/秒，写入速度47MB/秒；这个读写速度比较一般，有提升空间。

其他没什么看的了，官方固件功能有限，不支持端口聚合、自定义网口、USB上网、USB共享打印机等功能，无法发挥出硬件的实力，我们下面进入刷机OpenWrt环节。

### **备份官方固件**

刷机之前最好是备份一下系统分区，万一出故障后方便恢复官方系统。

使用SSH工具（推荐`MobaXter`）连接路由器（192.168.0.1），用户名：useradmin 密码：管理密码，注意用户名不是root

![](https://pic1.zhimg.com/v2-5bb9307776dd26519725e216aa3a49b8_1440w.jpg)
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

![](https://picx.zhimg.com/v2-e6d758efa10281a8f530cef8fb0f0f83_1440w.jpg)
▲ 使用Winscp工具或者MobaXter到tmp目录下载刚备份的4个文件到电脑保存备用

### **刷入Uboot**

U-Boot源自 hanwckf/bl-mt798x项目，由1715173329大佬制作，支持DHCP下发IP地址，无需手动配置 IP 地址。

> Uboot地址：<https://drive.wrt.moe/uboot/mediatek>

**磊科N60PRO刷机资料包：**

**链接：<https://pan.quark.cn/s/60389c4bbdc2>**

**提取码：Qryi**

![](https://pic4.zhimg.com/v2-4a8b53a050f876679a7d4066b9172b91_1440w.jpg)

下载`mt7986-netcore_n60-pro-fip.bin`文件，将下载好的uboot传到/tmp 目录下，运行下面代码：
    
```bash
mtd write /tmp/mt7986-netcore_n60-pro-fip.bin FIP  
``` 

![](https://pic4.zhimg.com/v2-aa7c81ee0fdbd6881eead61d0b0ceba1_1440w.jpg)
▲ 如图显示则uboot刷入成功

**然后路由器断电、把网线插入千兆LAN口接入电脑，**

![](https://pic2.zhimg.com/v2-221071795db70d515ab645a96e4e5d53_1440w.jpg) 
▲ 使用顶针按住机身底部的Reset按键不动再接通电、8s后电源灯变成蓝灯慢闪进入uboot模式了，再松开。

### **刷入大功率immortalwrt固件**

OpenWrt固件采用237176253大佬的闭源大功率固件，

![](https://pica.zhimg.com/v2-5463ae3cd34c9ebc7855256c93ed455a_1440w.jpg)
▲ 电脑浏览器输入：192.168.1.1 进入uboot界面，选择下载好的的`immortalwrt-mediatek-
mt7986-netcore_n60-pro-squashfs-sysupgrade.bin`固件，上传刷入固件即可。

### **恢复官方固件**

![](https://pica.zhimg.com/v2-d606f1d61096722fec9c8c6967a36e98_1440w.jpg)

如果需要恢复原厂固件，进入uboot后选择之前备份的`mtd5_ubi.bin`文件刷入即可。

### **5G无线信号测试**

采用自建speedtest服务，测试户型如图，路由器放置客厅角落弱电箱旁，测试穿墙效果如何

![](https://pic3.zhimg.com/v2-1c100f102fd8b00e0e5bd1512850885e_1440w.jpg)
▲ 主卧靠墙角与路由器所在位置有两面墙、有部分是承重墙体比较厚，信号衰减的很严重，难度比较大

![](https://pic1.zhimg.com/v2-77f2576f189a51fc2e701138f74304e6_1440w.jpg)
▲ 近距离和中距离都很稳定能跑满千兆带宽，死角位置大功率固件有一定的提升、但不多。

### **immortalwrt系统**

默认IP：192.168.6.1 用户名：root 密码无

![](https://pic1.zhimg.com/v2-0663a56151f628eca9ca635933ac20b8_1440w.jpg)
▲ immortalwrt固件大家很熟悉了，剩下的可以随便折腾了、这个固件支持USB上网，插入手机或者上网卡后新建一个接口，设置下即可。

### **FAST网速测试**

![](https://pica.zhimg.com/v2-105ce086a3caf7ae2f99c578144fe902_1440w.jpg) 
▲ FAST测速在800到900Mbps之间，属于MT7986A处理器正常水平，接近跑满千兆带宽了。

### **SMB网络共享**

来到服务→网络共享，

![](https://pic3.zhimg.com/v2-d203d0a95413be0fa68c65fdb4341cb4_1440w.jpg)
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

![](https://picx.zhimg.com/v2-6c5287e73809130e398200d5779a3a93_1440w.jpg)
▲ 这次读写速度比官方固件快多了，拖动文件读取速度大概100MB左右，略微超越了千兆带宽，写入速度70MB左右。

### **安装istore商店**

为了方便我们安装插件，推荐安装一个istore商店，里面有很多实用的插件方便使用，

![](https://pic2.zhimg.com/v2-d866306a874c7bb8dc10a5c8fd8a20cd_1440w.jpg)
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

![](https://pic2.zhimg.com/v2-44275872d16630b0c41fb2512ba3729d_1440w.jpg)
▲ 我安装了几款插件后还剩余40MB左右的空间。

### **功耗**

![](https://pic3.zhimg.com/v2-42217e125907146715f64ff9728fd268_1440w.jpg) 
▲ 没有插入USB硬盘，待机功耗6W左右，算是比较低。

### **总结**

::: danger
磊科N60PRO的双2.5G网口+512MB大内存在WiFi7时代也够用了，是一个一步到位的性价比之选，还有这个价位少见的USB3.0接口，给路由器可玩性上升了一个台阶，官方固件虽然功能有限，但我们刷入OpenWrt系统后，直接起飞~
::: 


<LastUpdated />
<confetti />

