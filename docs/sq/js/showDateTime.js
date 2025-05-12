function showDateTime() {
    const birthDay = new Date("2023-11-12T08:00:00");
    const today = new Date();
    const timeDiff = Math.floor((today - birthDay) / 1000); // 秒数差
    const days = Math.floor(timeDiff / (24 * 60 * 60));
    const hrs = Math.floor((timeDiff % (24 * 60 * 60)) / (60 * 60));
    const mins = Math.floor((timeDiff % (60 * 60)) / 60);
    const secs = timeDiff % 60;

    document.getElementById('runtime-display').innerHTML =
        `<span style="color: #C40000;">${days}</span> 天 ` +
        `<span style="color: #C40000;">${hrs}</span> 时 ` +
        `<span style="color: #C40000;">${mins}</span> 分 ` +
        `<span style="color: #C40000;">${secs}</span> 秒`;

    setTimeout(showDateTime, 1000);
}

// 初始化计时器
showDateTime();