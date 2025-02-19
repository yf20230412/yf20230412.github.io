const {
    ref
} = Vue;


function padTo16Byte(str) {
    console.log("str", typeof str, str)
    return CryptoJS.enc.Utf8.parse(str.toString().padEnd(16, '0'));
}
/**
 * AES加密:word加密字符串，以及字符串key、iv  返回Hex
 */
function Encrypt(word, keyStr, ivStr) {
    const key = padTo16Byte(keyStr);
    const iv = padTo16Byte(ivStr);
    const encrypted = CryptoJS.AES.encrypt(word, key, {
        iv
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}
/**
 * 解密:字符串 key iv  返回Utf8
 */
function Decrypt(word, keyStr, ivStr) {
    const key = padTo16Byte(keyStr);
    const iv = padTo16Byte(ivStr);
    const ciphertext = CryptoJS.enc.Hex.parse(word);
    const decrypt = CryptoJS.AES.decrypt({
        ciphertext
    }, key, {
        iv
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}



function decryptAesBCB(encryptedData) {
    var dataArr = encryptedData.split("");
    var prefixCode = CryptoJS.enc.Utf8.parse("$#").toString();
    var suffixCode = CryptoJS.enc.Utf8.parse("#$").toString();
    var pwdMix = dataArr
        .splice(0, encryptedData.indexOf(suffixCode) + 4)
        .join("");
    var roundtimeInHax = dataArr.splice(dataArr.length - 26, 26).join("");
    var encryptedText = dataArr.join("");
    var pwdInHax = pwdMix.substring(
        prefixCode.length,
        pwdMix.length - suffixCode.length
    );
    var roundTime = CryptoJS.enc.Utf8.stringify(
        CryptoJS.enc.Hex.parse(roundtimeInHax)
    );
    var pwd = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(pwdInHax));
    var iv = CryptoJS.enc.Utf8.parse(roundTime.padEnd(16, "0"));
    var pkBlocks = CryptoJS.enc.Utf8.parse(pwd.padEnd(16, "0"));
    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(encryptedText),
    });
    var decryptedData = CryptoJS.enc.Utf8.stringify(
        CryptoJS.AES.decrypt(cipherParams, pkBlocks, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
    );
    console.log(decryptedData);
    return decryptedData;
};
// 字符串转Hex
function convertToHex(value) {
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(value));
}
// Hex转字符串
function convertToString(value) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(value));
}

Vue.createApp({
    components: {
        ElInput: window.ElementPlus.ElInput,
        ElButton: window.ElementPlus.ElButton,
        ElSelect: window.ElementPlus.ElSelect,
        ElOption: window.ElementPlus.ElOption,
        ElCheckbox: window.ElementPlus.ElCheckbox,
        ElUpload: window.ElementPlus.ElUpload,
    },
    setup() {
        const jsonData = ref("");
        const key = ref("123456");
        const iv = ref(new Date().getTime());
        const result = ref("");
        const selectValue = ref(1);
        const checked = ref(false);
        const options = [{
                value: 1,
                label: "加密",
            },
            {
                value: 0,
                label: "解密",
            },
        ];

        const encryptAes = async () => {
            if (!jsonData.value) {
                return;
            }

            try {
                const resultData = Encrypt(jsonData.value, key.value, iv.value);
                const keyHex = convertToHex(`$#${key.value}#$`);
                const ivHex = convertToHex(iv.value);
                result.value = `${keyHex}${resultData}${ivHex}`;
                downloadFile(result.value);
            } catch (err) {
                console.error(err);
            }
        };

        const decryptAes = async () => {
            if (!jsonData.value) {
                return;
            }
            try {
                var encryptedData = jsonData.value;
                if (checked.value) {
                    encryptedData = window.atob(
                        encryptedData?.split("**")?.[1] || encryptedData
                    );
                }
                const resultData = decryptAesBCB(encryptedData);
                result.value = resultData;
            } catch (err) {
                console.error(err);
            }
        };

        const handleUpload = (files) => {
            const file = files.raw;
            const reader = new FileReader();
            reader.onload = () => {
                //   const data = JSON.parse(reader.result);
                //   jsonData.value = JSON.stringify(data, null, 2);
                jsonData.value = reader.result;
            };
            reader.readAsText(file);
        };

        const downloadFile = (dataStr) => {
            const blob = new Blob([dataStr], {
                type: "text/plain"
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "file.json"; // 文件名可以根据需要更改
            link.click();
            URL.revokeObjectURL(url);
        };

        return {
            jsonData,
            key,
            iv,
            result,
            selectValue,
            checked,
            options,
            encryptAes,
            decryptAes,
            handleUpload,
            downloadFile
        };
    },
}).mount("#app");