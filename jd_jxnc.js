/*
特别声明：
本脚本搬运自 https://github.com/whyour/hundun/blob/master/quanx/jx_nc.js
感谢 @whyour 大佬

无需京喜token,只需京东cookie即可.

京喜农场:脚本更新地址 https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js
更新时间：2021-03-16
活动入口：京喜APP我的-京喜农场
东东农场活动链接：https://wqsh.jd.com/sns/201912/12/jxnc/detail.html?ptag=7155.9.32&smp=b47f4790d7b2a024e75279f55f6249b9&active=jdnc_1_chelizi1205_2
已支持IOS,Node.js支持N个京东账号
理论上脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
助力码shareCode请先手动运行脚本查看打印可看到

==========================Quantumultx=========================
[task_local]
0 9,12,18 * * * https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js, tag=京喜农场, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxnc.png, enabled=true
=========================Loon=============================
[Script]
cron "0 9,12,18 * * *" script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js,tag=京喜农场

=========================Surge============================
京喜农场 = type=cron,cronexp="0 9,12,18 * * *",timeout=3600,script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js

=========================小火箭===========================
京喜农场 = type=cron,script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js, cronexpr="0 9,12,18 * * *", timeout=3600, enable=true
*/

const $ = new Env('京喜农场');
let notify = ''; // nodejs 发送通知脚本
let notifyLevel = $.isNode() ? process.env.JXNC_NOTIFY_LEVEL || 1 : 1; // 通知级别 0=只通知成熟;1=本次获得水滴>0;2=任务执行;3=任务执行+未种植种子;
let notifyBool = true; // 代码内部使用，控制是否通知
let cookieArr = []; // 用户 cookie 数组
let currentCookie = ''; // 当前用户 cookie
let tokenNull = {'farm_jstoken': '', 'phoneid': '', 'timestamp': ''}; // 内置一份空的 token
let tokenArr = []; // 用户 token 数组
let currentToken = {}; // 当前用户 token
let shareCode = ''; // 内置助力码
let jxncShareCodeArr = []; // 用户 助力码 数组
let currentShareCode = []; // 当前用户 要助力的助力码
const openUrl = `openjd://virtual?params=${encodeURIComponent('{ "category": "jump", "des": "m", "url": "https://wqsh.jd.com/sns/201912/12/jxnc/detail.html?ptag=7155.9.32&smp=b47f4790d7b2a024e75279f55f6249b9&active=jdnc_1_chelizi1205_2"}',)}`; // 打开京喜农场
let subTitle = '', message = '', option = {'open-url': openUrl}; // 消息副标题，消息正文，消息扩展参数
const JXNC_API_HOST = 'https://wq.jd.com/';
let allMessage = '';
$.detail = []; // 今日明细列表
$.helpTask = null;
$.allTask = []; // 任务列表
$.info = {}; // 用户信息
$.answer = 3;
$.drip = 0;

/*
 *Progcessed By JSDec in 1.72s
 *JSDec - JSDec.js.org
 */
$['maxHelpNum'] = $['isNode']() ? 0x8 : 0x4;
$['helpNum'] = 0x0;
let assistUserShareCode = 0x0;
!(async () => {
    var _0x22c2c3 = {
        'DuMLc': function (_0xcb21f1) {
            return _0xcb21f1();
        },
        'CJlRx': function (_0x26221f, _0x37a1a9) {
            return _0x26221f !== _0x37a1a9;
        },
        'lOQUE': 'QZbgT',
        'INSmh': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'uhiKC': 'https://bean.m.jd.com/bean/signIndex.action',
        'EPbOZ': function (_0xd7aa54, _0x331a47) {
            return _0xd7aa54 < _0x331a47;
        },
        'pkqZL': function (_0x338714, _0x2fad3a) {
            return _0x338714(_0x2fad3a);
        },
        'DcsGb': function (_0xc2687e, _0x32dde8) {
            return _0xc2687e + _0x32dde8;
        },
        'qdUsI': function (_0x4968c9) {
            return _0x4968c9();
        },
        'fYAMX': 'https://bean.m.jd.com/',
        'JjZAo': 'pt_pin',
        'ORoSe': function (_0x444a76, _0x1ef09e) {
            return _0x444a76 > _0x1ef09e;
        },
        'kEKNT': function (_0x42769e, _0xe7c042) {
            return _0x42769e === _0xe7c042;
        },
        'ASpuL': 'Wbwne',
        'TsaFK': 'WiJuH'
    };
    await _0x22c2c3['DuMLc'](requireConfig);
    if (!cookieArr[0x0]) {
        if (_0x22c2c3['CJlRx'](_0x22c2c3['lOQUE'], _0x22c2c3['lOQUE'])) {
            jxncShareCodeArr['push']('');
        } else {
            $['msg']($['name'], _0x22c2c3['INSmh'], _0x22c2c3['uhiKC'], {'open-url': _0x22c2c3['uhiKC']});
            return;
        }
    }
    for (let _0x4e6eb9 = 0x0; _0x22c2c3['EPbOZ'](_0x4e6eb9, cookieArr['length']); _0x4e6eb9++) {
        if (cookieArr[_0x4e6eb9]) {
            currentCookie = cookieArr[_0x4e6eb9];
            $['UserName'] = _0x22c2c3['pkqZL'](decodeURIComponent, currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/) & ¤tCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            $['index'] = _0x22c2c3['DcsGb'](_0x4e6eb9, 0x1);
            $['isLogin'] = !![];
            $['nickName'] = '';
            $['log']('\n************* 检查【京东账号' + $['index'] + '】' + $['UserName'] + ' cookie 是否有效 *************');
            await _0x22c2c3['qdUsI'](TotalBean);
            $['log']('开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '\x0a');
            if (!$['isLogin']) {
                $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + '\x20' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {'open-url': _0x22c2c3['fYAMX']});
                if ($['isNode']()) {
                    await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + '\x20' + $['UserName'] + '\n请重新登录获取cookie');
                }
                continue;
            }
            if (currentCookie['includes'](_0x22c2c3['JjZAo'])) await _0x22c2c3['qdUsI'](getJxToken);
            subTitle = '';
            message = '';
            option = {};
            $['answer'] = 0x3;
            $['helpNum'] = 0x0;
            notifyBool = _0x22c2c3['ORoSe'](notifyLevel, 0x0);
            await _0x22c2c3['qdUsI'](shareCodesFormat);
            await _0x22c2c3['qdUsI'](jdJXNC);
        }
    }
    if ($['isNode']() && allMessage) {
        if (_0x22c2c3['kEKNT'](_0x22c2c3['ASpuL'], _0x22c2c3['TsaFK'])) {
            $['logErr'](e, resp);
        } else {
            await notify['sendNotify']('' + $['name'], '' + allMessage);
        }
    }
})()['catch'](_0x1bd7cb => {
    $['log']('', '❌\x20' + $['name'] + ', 失败! 原因: ' + _0x1bd7cb + '!', '');
    console['log'](_0x1bd7cb);
})['finally'](() => {
    $['done']();
});

function changeShareCodeJson(_0x2845ce) {
    var _0x592dc9 = {
        'RskrD': function (_0x5342f0, _0x440291) {
            return _0x5342f0 === _0x440291;
        }, 'mjHWJ': 'SUDrc', 'svEnL': 'KoQgJ', 'GWlcS': 'smp', 'QNCth': 'active', 'RbAOb': 'joinnum'
    };
    try {
        if (_0x592dc9['RskrD'](_0x592dc9['mjHWJ'], _0x592dc9['svEnL'])) {
            notifyBool = !![];
            $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
            message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
        } else {
            let _0x12f8b9 = _0x2845ce && JSON['parse'](_0x2845ce);
            return _0x12f8b9[_0x592dc9['GWlcS']] && _0x12f8b9[_0x592dc9['QNCth']] && _0x12f8b9[_0x592dc9['RbAOb']] ? _0x12f8b9 : '';
        }
    } catch (_0x1a235a) {
        return '';
    }
}

function requireConfig() {
    var _0x22d5a7 = {
        'lFYyB': function (_0x55cf4a, _0x1fb798) {
            return _0x55cf4a !== _0x1fb798;
        },
        'viDVQ': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'iAcAl': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'qzMBq': function (_0x234b02, _0x1f004a) {
            return _0x234b02 >= _0x1f004a;
        },
        'IEYdH': function (_0xe4f9b1) {
            return _0xe4f9b1();
        },
        'hyvzI': function (_0x1de7dc, _0x4ef982) {
            return _0x1de7dc === _0x4ef982;
        },
        'OBvCs': 'YGsBa',
        'obyoq': '4|3|2|1|0',
        'lKDBz': function (_0x547e62, _0x3c122c) {
            return _0x547e62(_0x3c122c);
        },
        'kxkob': function (_0x170984, _0x39a5c5) {
            return _0x170984 >= _0x39a5c5;
        },
        'CKsNk': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n',
        'bHlBq': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子',
        'FQMKu': 'pOatw',
        'uGmJp': '开始获取配置文件\n',
        'qIJoF': './sendNotify',
        'uiMQD': function (_0x21cd06, _0x402f4a) {
            return _0x21cd06(_0x402f4a);
        },
        'izZAj': './jdCookie.js',
        'orHDb': './jdJxncShareCodes.js',
        'fapfE': function (_0x49d73e, _0xa87bd6) {
            return _0x49d73e !== _0xa87bd6;
        },
        'WqISZ': 'gZlsp',
        'VOQQH': 'IhpXb',
        'NCZOM': function (_0x2b22b7, _0x2857ef) {
            return _0x2b22b7 === _0x2857ef;
        },
        'ypNfB': 'false',
        'jgfRr': 'CookieJD',
        'NKkkQ': 'CookieJD2',
        'IXekw': 'CookiesJD',
        'Fqyxa': function (_0x2742da, _0x296c54) {
            return _0x2742da !== _0x296c54;
        },
        'RnVnX': 'cpLKS',
        'gBiEJ': function (_0x1cf8ff, _0x267918) {
            return _0x1cf8ff < _0x267918;
        },
        'HJtrY': function (_0x2c503d, _0x4d1505) {
            return _0x2c503d !== _0x4d1505;
        },
        'INEhL': 'AJmdL',
        'iOPRU': 'vTPxN',
        'eSRfh': '互助码格式已变更，请重新填写互助码',
        'czntZ': '互助码格式变更通知',
        'jJPmU': '互助码格式变更，请重新填写 ‼️‼️',
        'jHmvn': 'application/json,text/plain, */*',
        'oyeMC': 'application/x-www-form-urlencoded',
        'Tyzmc': 'gzip, deflate, br',
        'hDKie': 'zh-cn',
        'dyXxb': 'keep-alive',
        'QmrvT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    };
    return new Promise(async _0x532d1c => {
        var _0x1b14f3 = {
            'vncXp': function (_0x655e) {
                return _0x22d5a7['IEYdH'](_0x655e);
            }, 'XBlze': function (_0x556b7c, _0x48c59c) {
                return _0x22d5a7['hyvzI'](_0x556b7c, _0x48c59c);
            }, 'MvaVk': _0x22d5a7['OBvCs'], 'yACWS': _0x22d5a7['obyoq'], 'XQKgS': function (_0x37fe90, _0x3f5b52) {
                return _0x22d5a7['lKDBz'](_0x37fe90, _0x3f5b52);
            }, 'cmaLE': function (_0x27fa66, _0x5934ef) {
                return _0x22d5a7['kxkob'](_0x27fa66, _0x5934ef);
            }, 'ChcrL': _0x22d5a7['CKsNk'], 'PlVJp': _0x22d5a7['bHlBq'], 'EsSIu': function (_0x47ec00, _0x57baa1) {
                return _0x22d5a7['hyvzI'](_0x47ec00, _0x57baa1);
            }, 'gtYGI': _0x22d5a7['FQMKu']
        };
        $['log'](_0x22d5a7['uGmJp']);
        notify = $['isNode']() ? _0x22d5a7['lKDBz'](require, _0x22d5a7['qIJoF']) : '';
        const _0x58bc11 = $['isNode']() ? _0x22d5a7['uiMQD'](require, _0x22d5a7['izZAj']) : '';
        const _0x224e28 = $['isNode']() ? _0x22d5a7['uiMQD'](require, _0x22d5a7['orHDb']) : '';
        if ($['isNode']()) {
            if (_0x22d5a7['fapfE'](_0x22d5a7['WqISZ'], _0x22d5a7['VOQQH'])) {
                Object['keys'](_0x58bc11)['forEach'](_0x550b83 => {
                    var _0x10057c = {
                        'WMsyB': function (_0xf738a9) {
                            return _0x1b14f3['vncXp'](_0xf738a9);
                        }
                    };
                    if (_0x58bc11[_0x550b83]) {
                        if (_0x1b14f3['XBlze'](_0x1b14f3['MvaVk'], _0x1b14f3['MvaVk'])) {
                            cookieArr['push'](_0x58bc11[_0x550b83]);
                        } else {
                            _0x10057c['WMsyB'](_0x532d1c);
                        }
                    }
                });
                if (process['env']['JD_DEBUG'] && _0x22d5a7['NCZOM'](process['env']['JD_DEBUG'], _0x22d5a7['ypNfB'])) console['log'] = () => {
                };
            } else {
                $['drip'] += eachtimeget;
            }
        } else {
            cookieArr = [$['getdata'](_0x22d5a7['jgfRr']), $['getdata'](_0x22d5a7['NKkkQ']), ..._0x22d5a7['uiMQD'](jsonParse, $['getdata'](_0x22d5a7['IXekw']) || '[]')['map'](_0x1ce266 => _0x1ce266['cookie'])]['filter'](_0x1883e0 => !!_0x1883e0);
        }
        $['log']('共' + cookieArr['length'] + '个京东账号\n');
        if ($['isNode']()) {
            if (_0x22d5a7['Fqyxa'](_0x22d5a7['RnVnX'], _0x22d5a7['RnVnX'])) {
                $['msg']($['name'], subTitle, message, option);
                if ($['isNode']()) {
                    allMessage += subTitle + '\x0a' + message + (_0x22d5a7['lFYyB']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                }
            } else {
                Object['keys'](_0x224e28)['forEach'](_0x5ad503 => {
                    var _0x28771c = {
                        'uBpHJ': _0x1b14f3['yACWS'], 'YOXgW': function (_0x3063cd, _0x13de86) {
                            return _0x1b14f3['XQKgS'](_0x3063cd, _0x13de86);
                        }, 'UIWGJ': function (_0x2dac44, _0x5618c0) {
                            return _0x1b14f3['cmaLE'](_0x2dac44, _0x5618c0);
                        }, 'WWFyQ': _0x1b14f3['ChcrL'], 'WcdZm': _0x1b14f3['PlVJp']
                    };
                    if (_0x224e28[_0x5ad503]) {
                        jxncShareCodeArr['push'](_0x224e28[_0x5ad503]);
                    } else {
                        if (_0x1b14f3['EsSIu'](_0x1b14f3['gtYGI'], _0x1b14f3['gtYGI'])) {
                            jxncShareCodeArr['push']('');
                        } else {
                            var _0x238131 = _0x28771c['uBpHJ']['split']('|'), _0x4d84dd = 0x0;
                            while (!![]) {
                                switch (_0x238131[_0x4d84dd++]) {
                                    case'0':
                                        return;
                                    case'1':
                                        _0x28771c['YOXgW'](_0x532d1c, ![]);
                                        continue;
                                    case'2':
                                        notifyBool = notifyBool && _0x28771c['UIWGJ'](notifyLevel, 0x2);
                                        continue;
                                    case'3':
                                        message += _0x28771c['WWFyQ'];
                                        continue;
                                    case'4':
                                        $['log'](_0x28771c['WcdZm']);
                                        continue;
                                }
                                break;
                            }
                        }
                    }
                });
            }
        }
        for (let _0x4da6e6 = 0x0; _0x22d5a7['gBiEJ'](_0x4da6e6, jxncShareCodeArr['length']); _0x4da6e6++) {
            if (jxncShareCodeArr[_0x4da6e6]) {
                if (_0x22d5a7['HJtrY'](_0x22d5a7['INEhL'], _0x22d5a7['iOPRU'])) {
                    let _0xb3da21 = jxncShareCodeArr[_0x4da6e6];
                    let _0xe13cb = _0xb3da21['split']('@');
                    if (!_0x22d5a7['uiMQD'](changeShareCodeJson, _0xe13cb[0x0])) {
                        $['log'](_0x22d5a7['eSRfh']);
                        $['msg']($['name'], _0x22d5a7['czntZ'], _0x22d5a7['jJPmU'], option);
                        if ($['isNode']()) {
                            await notify['sendNotify']('' + $['name'], '互助码格式变更，请重新填写 ‼️‼️');
                        }
                    }
                    break;
                } else {
                    $['log'](_0x22d5a7['viDVQ']);
                    message += _0x22d5a7['iAcAl'];
                    notifyBool = notifyBool && _0x22d5a7['qzMBq'](notifyLevel, 0x3);
                }
            }
        }
        $['log']('您提供了' + jxncShareCodeArr['length'] + '个账号的京喜农场助力码');
        try {
            let _0x38227e = {
                'url': 'https://gitee.com/dongjun613/djjd2/raw/master/share_code/jxnc.json',
                'headers': {
                    'Accept': _0x22d5a7['jHmvn'],
                    'Content-Type': _0x22d5a7['oyeMC'],
                    'Accept-Encoding': _0x22d5a7['Tyzmc'],
                    'Accept-Language': _0x22d5a7['hDKie'],
                    'Connection': _0x22d5a7['dyXxb'],
                    'User-Agent': _0x22d5a7['QmrvT']
                },
                'timeout': 0x2710
            };
            $['get'](_0x38227e, (_0x4cbbc0, _0x41126a, _0x169c59) => {
                if (!_0x4cbbc0) {
                    shareCode = _0x169c59;
                }
            });
        } catch (_0x41dea2) {
        }
        _0x22d5a7['IEYdH'](_0x532d1c);
    });
}

function TotalBean() {
    var _0x5413ce = {
        'AnCUi': function (_0x3eede0) {
            return _0x3eede0();
        },
        'SSOKo': function (_0x1b412a, _0x3f3120) {
            return _0x1b412a === _0x3f3120;
        },
        'rokOH': 'OiBlF',
        'CznRd': 'ICzeq',
        'OHBDU': 'retcode',
        'OOkww': 'MLrmU',
        'sCLsY': 'base',
        'wAEyX': function (_0x40c66c, _0x1adf7b) {
            return _0x40c66c === _0x1adf7b;
        },
        'sfsIG': 'UWZjC',
        'mORYc': 'application/json,text/plain, */*',
        'lzNDP': 'application/x-www-form-urlencoded',
        'fiRGQ': 'gzip, deflate, br',
        'jwECi': 'zh-cn',
        'mvnks': 'keep-alive',
        'HeUMq': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'QQaoz': function (_0x3a1f16, _0x4341ee) {
            return _0x3a1f16(_0x4341ee);
        },
        'wABOZ': './USER_AGENTS',
        'bMqUt': 'JDUA',
        'gpsGH': 'jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0'
    };
    return new Promise(async _0x571ca6 => {
        var _0x2f0014 = {
            'OTbHz': function (_0x465794) {
                return _0x5413ce['AnCUi'](_0x465794);
            }, 'mZBSt': function (_0x563dfe, _0x1b8013) {
                return _0x5413ce['SSOKo'](_0x563dfe, _0x1b8013);
            }, 'ClCiE': _0x5413ce['rokOH'], 'Etpyj': _0x5413ce['CznRd'], 'SbFOy': function (_0x5e9476, _0x1042ed) {
                return _0x5413ce['SSOKo'](_0x5e9476, _0x1042ed);
            }, 'mSWUC': _0x5413ce['OHBDU'], 'fLzNb': function (_0x3c9fce, _0x304658) {
                return _0x5413ce['SSOKo'](_0x3c9fce, _0x304658);
            }, 'yrwdo': _0x5413ce['OOkww'], 'TCiqz': _0x5413ce['sCLsY'], 'xIBRC': function (_0x3b82c8, _0x172023) {
                return _0x5413ce['wAEyX'](_0x3b82c8, _0x172023);
            }, 'ejRIk': _0x5413ce['sfsIG']
        };
        const _0x3daf01 = {
            'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
            'headers': {
                'Accept': _0x5413ce['mORYc'],
                'Content-Type': _0x5413ce['lzNDP'],
                'Accept-Encoding': _0x5413ce['fiRGQ'],
                'Accept-Language': _0x5413ce['jwECi'],
                'Connection': _0x5413ce['mvnks'],
                'Cookie': currentCookie,
                'Referer': _0x5413ce['HeUMq'],
                'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x5413ce['QQaoz'](require, _0x5413ce['wABOZ'])['USER_AGENT'] : $['getdata'](_0x5413ce['bMqUt']) ? $['getdata'](_0x5413ce['bMqUt']) : _0x5413ce['gpsGH']
            }
        };
        $['post'](_0x3daf01, (_0x451cb2, _0x4a345a, _0x14da13) => {
            try {
                if (_0x451cb2) {
                    if (_0x2f0014['mZBSt'](_0x2f0014['ClCiE'], _0x2f0014['Etpyj'])) {
                        if (!_0x451cb2) {
                            shareCode = _0x14da13;
                        }
                    } else {
                        console['log']('' + JSON['stringify'](_0x451cb2));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    }
                } else {
                    if (_0x14da13) {
                        _0x14da13 = JSON['parse'](_0x14da13);
                        if (_0x2f0014['SbFOy'](_0x14da13[_0x2f0014['mSWUC']], 0xd)) {
                            $['isLogin'] = ![];
                            return;
                        }
                        if (_0x2f0014['SbFOy'](_0x14da13[_0x2f0014['mSWUC']], 0x0)) {
                            if (_0x2f0014['fLzNb'](_0x2f0014['yrwdo'], _0x2f0014['yrwdo'])) {
                                $['nickName'] = _0x14da13[_0x2f0014['TCiqz']] && _0x14da13[_0x2f0014['TCiqz']]['nickname'] || $['UserName'];
                            } else {
                                _0x2f0014['OTbHz'](_0x571ca6);
                            }
                        } else {
                            $['nickName'] = $['UserName'];
                        }
                    } else {
                        console['log']('京东服务器返回空数据');
                    }
                }
            } catch (_0x4e8a25) {
                $['logErr'](_0x4e8a25, _0x4a345a);
            } finally {
                if (_0x2f0014['xIBRC'](_0x2f0014['ejRIk'], _0x2f0014['ejRIk'])) {
                    _0x2f0014['OTbHz'](_0x571ca6);
                } else {
                    if (jdJxncShareCodeNode[item]) {
                        jxncShareCodeArr['push'](jdJxncShareCodeNode[item]);
                    } else {
                        jxncShareCodeArr['push']('');
                    }
                }
            }
        });
    });
}

function tokenFormat() {
    var _0x48e509 = {
        'wKALZ': function (_0x210bf2, _0x59b2c1) {
            return _0x210bf2 === _0x59b2c1;
        }, 'WLOSM': 'OoYWB', 'IDQpj': function (_0x4b71ca, _0x512186) {
            return _0x4b71ca - _0x512186;
        }, 'JeCBi': function (_0x10725f, _0x1944bd) {
            return _0x10725f - _0x1944bd;
        }, 'cxnFV': function (_0x43b2c8) {
            return _0x43b2c8();
        }
    };
    return new Promise(async _0x1952a1 => {
        if (_0x48e509['wKALZ'](_0x48e509['WLOSM'], _0x48e509['WLOSM'])) {
            if (tokenArr[_0x48e509['IDQpj']($['index'], 0x1)] && tokenArr[_0x48e509['IDQpj']($['index'], 0x1)]['farm_jstoken']) {
                currentToken = tokenArr[_0x48e509['JeCBi']($['index'], 0x1)];
            } else {
                currentToken = tokenNull;
            }
            _0x48e509['cxnFV'](_0x1952a1);
        } else {
            $['log']('获取随机助力码失败 ' + code);
        }
    });
}

function shareCodesFormat() {
    var _0x3a7c18 = {
        'ZwgrX': function (_0x3f2a8b, _0x2d39b5) {
            return _0x3f2a8b - _0x2d39b5;
        }, 'blepT': function (_0xafddab, _0x53f88d) {
            return _0xafddab - _0x53f88d;
        }, 'Roltf': function (_0x304e2f) {
            return _0x304e2f();
        }
    };
    return new Promise(async _0x18e452 => {
        if (jxncShareCodeArr[_0x3a7c18['ZwgrX']($['index'], 0x1)]) {
            currentShareCode = jxncShareCodeArr[_0x3a7c18['blepT']($['index'], 0x1)]['split']('@');
            currentShareCode['push'](...shareCode['split']('@'));
        } else {
            $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
            currentShareCode = shareCode['split']('@');
        }
        $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
        _0x3a7c18['Roltf'](_0x18e452);
    });
}

async function jdJXNC() {
    var _0x22f099 = {
        'vySOe': function (_0x3a05b1, _0x322ab3) {
            return _0x3a05b1 - _0x322ab3;
        },
        'Izltb': function (_0x302c15, _0xe3168c) {
            return _0x302c15 === _0xe3168c;
        },
        'sAKVg': 'retcode',
        'qxIfg': 'base',
        'qLzMT': function (_0xa9772b) {
            return _0xa9772b();
        },
        'vOVhr': 'diWzb',
        'SEqnq': 'BgGVk',
        'nOlyt': function (_0x121fe9, _0x50016e) {
            return _0x121fe9 <= _0x50016e;
        },
        'qJudY': function (_0x275f6a, _0x175bf6) {
            return _0x275f6a === _0x175bf6;
        },
        'DdKKS': function (_0x2d594e, _0x389cf8) {
            return _0x2d594e === _0x389cf8;
        },
        'DOeSI': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'ZgvNb': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'ZLSoG': function (_0x5bae6f, _0x1d3ebe) {
            return _0x5bae6f >= _0x1d3ebe;
        },
        'BKqVv': function (_0x1ff8d9, _0xece2a8) {
            return _0x1ff8d9 !== _0xece2a8;
        },
        'BELIP': 'rKDjP',
        'WTksx': 'yHvKS',
        'EIxyb': function (_0x4a5587, _0x4345f2) {
            return _0x4a5587 + _0x4345f2;
        },
        'ioPkc': function (_0x36a582, _0x263d63, _0x3fd319) {
            return _0x36a582(_0x263d63, _0x3fd319);
        },
        'eSgoo': function (_0x8b2b1a, _0x18aae4) {
            return _0x8b2b1a(_0x18aae4);
        },
        'zOUTW': 'nBtsS',
        'wsyCH': 'pdXJh',
        'gkKwh': function (_0x39b598, _0x37318c) {
            return _0x39b598 < _0x37318c;
        },
        'qIfYq': function (_0x2015d3) {
            return _0x2015d3();
        },
        'UgoQG': function (_0x382cd8, _0x1be4ad, _0x50025f, _0x53b3eb) {
            return _0x382cd8(_0x1be4ad, _0x50025f, _0x53b3eb);
        },
        'GVoWK': 'smp',
        'iXciH': 'active',
        'JnrPi': 'joinnum',
        'RINHA': function (_0x1fd049, _0x5c5370) {
            return _0x1fd049 !== _0x5c5370;
        },
        'sdIoH': 'KmkgU'
    };
    subTitle = '【京东账号' + $['index'] + '】' + $['nickName'];
    $['log']('获取用户信息 & 任务列表');
    const _0x7e5351 = await _0x22f099['qLzMT'](getTaskList);
    if (_0x7e5351) {
        if (_0x22f099['Izltb'](_0x22f099['vOVhr'], _0x22f099['SEqnq'])) {
            currentToken = tokenArr[_0x22f099['vySOe']($['index'], 0x1)];
        } else {
            message += '【水果名称】' + _0x7e5351['prizename'] + '\x0a';
            if (_0x22f099['nOlyt'](_0x7e5351['target'], _0x7e5351['score'])) {
                if (_0x22f099['qJudY'](_0x7e5351['activestatus'], 0x2)) {
                    notifyBool = !![];
                    $['log']('【成熟】水果已成熟请及时收取，activestatus：' + _0x7e5351['activestatus'] + '\x0a');
                    message += '【成熟】水果已成熟请及时收取，activestatus：' + _0x7e5351['activestatus'] + '\x0a';
                } else if (_0x22f099['DdKKS'](_0x7e5351['activestatus'], 0x0)) {
                    $['log'](_0x22f099['DOeSI']);
                    message += _0x22f099['ZgvNb'];
                    notifyBool = notifyBool && _0x22f099['ZLSoG'](notifyLevel, 0x3);
                }
            } else {
                if (_0x22f099['BKqVv'](_0x22f099['BELIP'], _0x22f099['WTksx'])) {
                    let _0xd0649d = {
                        'smp': $['info']['smp'],
                        'active': $['info']['active'],
                        'joinnum': $['info']['joinnum']
                    };
                    $['log'](_0x22f099['EIxyb']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】', JSON['stringify'](_0xd0649d)));
                    await $['wait'](0x1f4);
                    const _0x459923 = await _0x22f099['qLzMT'](browserTask);
                    if (_0x459923) {
                        await $['wait'](0x1f4);
                        await _0x22f099['qLzMT'](answerTask);
                        await $['wait'](0x1f4);
                        const _0x4eb92c = await _0x22f099['qLzMT'](getTaskList);
                        _0x22f099['ioPkc'](getMessage, _0x4eb92c, _0x7e5351);
                        await _0x22f099['eSgoo'](submitInviteId, $['UserName']);
                        await $['wait'](0x1f4);
                        let _0x9a96e5 = await _0x22f099['qLzMT'](helpFriends);
                        if (_0x9a96e5) {
                            if (_0x22f099['BKqVv'](_0x22f099['zOUTW'], _0x22f099['wsyCH'])) {
                                while (_0x22f099['gkKwh']($['helpNum'], $['maxHelpNum'])) {
                                    $['helpNum']++;
                                    assistUserShareCodeJson = await _0x22f099['qIfYq'](getAssistUser);
                                    if (assistUserShareCodeJson) {
                                        await $['wait'](0x1f4);
                                        _0x9a96e5 = await _0x22f099['UgoQG'](helpShareCode, assistUserShareCodeJson[_0x22f099['GVoWK']], assistUserShareCodeJson[_0x22f099['iXciH']], assistUserShareCodeJson[_0x22f099['JnrPi']]);
                                        if (_0x9a96e5) {
                                            if (_0x22f099['RINHA'](_0x22f099['sdIoH'], _0x22f099['sdIoH'])) {
                                                data = JSON['parse'](data);
                                                if (_0x22f099['Izltb'](data[_0x22f099['sAKVg']], 0xd)) {
                                                    $['isLogin'] = ![];
                                                    return;
                                                }
                                                if (_0x22f099['Izltb'](data[_0x22f099['sAKVg']], 0x0)) {
                                                    $['nickName'] = data[_0x22f099['qxIfg']] && data[_0x22f099['qxIfg']]['nickname'] || $['UserName'];
                                                } else {
                                                    $['nickName'] = $['UserName'];
                                                }
                                            } else {
                                                await $['wait'](0x3e8);
                                                continue;
                                            }
                                        }
                                    }
                                    break;
                                }
                            } else {
                                return JSON['parse'](str);
                            }
                        }
                    }
                } else {
                    $['logErr'](e, resp);
                }
            }
        }
    }
    await _0x22f099['qIfYq'](showMsg);
}

function getTaskList() {
    var _0x508bda = {
        'vTbBS': function (_0xd83e9f, _0x264a34) {
            return _0xd83e9f - _0x264a34;
        },
        'oEIjw': function (_0x448b8d) {
            return _0x448b8d();
        },
        'SjBEb': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'RJtGC': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'kThLm': function (_0x131b3f, _0x3a36a7) {
            return _0x131b3f >= _0x3a36a7;
        },
        'DyBLz': function (_0x26384b, _0x2ea038) {
            return _0x26384b(_0x2ea038);
        },
        'sAzJe': function (_0x1221ec, _0x16a2df) {
            return _0x1221ec(_0x16a2df);
        },
        'pvHUk': function (_0x5bc5a8, _0x445a71) {
            return _0x5bc5a8 !== _0x445a71;
        },
        'pqiME': 'cbFrY',
        'imxQZ': function (_0x5a063d, _0x1e06c5, _0x1a50bb) {
            return _0x5a063d(_0x1e06c5, _0x1a50bb);
        },
        'QBCXQ': 'query'
    };
    return new Promise(async _0x1879dc => {
        var _0x32091a = {
            'CAIqT': _0x508bda['SjBEb'],
            'mFhMP': _0x508bda['RJtGC'],
            'sWcUp': function (_0x3bcf5d, _0x1abc03) {
                return _0x508bda['kThLm'](_0x3bcf5d, _0x1abc03);
            },
            'qwciQ': function (_0x11e947, _0x1d0595) {
                return _0x508bda['DyBLz'](_0x11e947, _0x1d0595);
            },
            'zvgLs': function (_0x3739f1, _0x516374) {
                return _0x508bda['DyBLz'](_0x3739f1, _0x516374);
            },
            'EGSFb': function (_0x1770e3, _0x162361) {
                return _0x508bda['sAzJe'](_0x1770e3, _0x162361);
            }
        };
        if (_0x508bda['pvHUk'](_0x508bda['pqiME'], _0x508bda['pqiME'])) {
            var _0x47679f = {
                'iwboV': function (_0x36a0d, _0x3835ad) {
                    return _0x508bda['vTbBS'](_0x36a0d, _0x3835ad);
                }, 'dCArU': function (_0x52009b) {
                    return _0x508bda['oEIjw'](_0x52009b);
                }
            };
            return new Promise(async _0xb5b9da => {
                if (jxncShareCodeArr[_0x47679f['iwboV']($['index'], 0x1)]) {
                    currentShareCode = jxncShareCodeArr[_0x47679f['iwboV']($['index'], 0x1)]['split']('@');
                    currentShareCode['push'](...shareCode['split']('@'));
                } else {
                    $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                    currentShareCode = shareCode['split']('@');
                }
                $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
                _0x47679f['dCArU'](_0xb5b9da);
            });
        } else {
            $['get'](_0x508bda['imxQZ'](taskUrl, _0x508bda['QBCXQ'], 'type=1'), async (_0x165b6e, _0x468e1d, _0xc20ee1) => {
                try {
                    const _0x4b87f2 = _0xc20ee1['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    const {detail, msg, task = [], retmsg, ..._0x5b4c9a} = JSON['parse'](_0x4b87f2);
                    $['detail'] = detail;
                    $['helpTask'] = task['filter'](_0x108047 => _0x108047['tasktype'] === 0x2)[0x0] || {
                        'eachtimeget': 0x0,
                        'limit': 0x0
                    };
                    $['allTask'] = task['filter'](_0x4f1db6 => _0x4f1db6['tasktype'] !== 0x3 && _0x4f1db6['tasktype'] !== 0x2 && parseInt(_0x4f1db6['left']) > 0x0);
                    $['info'] = _0x5b4c9a;
                    $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                    if (!$['info']['active']) {
                        $['log'](_0x32091a['CAIqT']);
                        message += _0x32091a['mFhMP'];
                        notifyBool = notifyBool && _0x32091a['sWcUp'](notifyLevel, 0x3);
                        _0x32091a['qwciQ'](_0x1879dc, ![]);
                    }
                    _0x32091a['zvgLs'](_0x1879dc, _0x5b4c9a);
                } catch (_0x44a38a) {
                    $['logErr'](_0x44a38a, _0x468e1d);
                } finally {
                    _0x32091a['EGSFb'](_0x1879dc, !![]);
                }
            });
        }
    });
}

function browserTask() {
    var _0x24308e = {
        'wXhrF': function (_0x4818b2) {
            return _0x4818b2();
        },
        'oktHy': '【邀请码】提交成功！\n',
        'VvKEx': function (_0x450e28, _0x27d730) {
            return _0x450e28 < _0x27d730;
        },
        'WWkSK': function (_0x2d841d, _0x37b971) {
            return _0x2d841d + _0x37b971;
        },
        'mpSRH': function (_0x2b02d2, _0x211fea) {
            return _0x2b02d2 * _0x211fea;
        },
        'MjUDe': function (_0x134f94, _0x43f23f) {
            return _0x134f94 === _0x43f23f;
        },
        'CAxhJ': function (_0x5614ee, _0x1bee07) {
            return _0x5614ee(_0x1bee07);
        },
        'kEiBZ': function (_0x36902f, _0x4118b7) {
            return _0x36902f !== _0x4118b7;
        },
        'IrQcx': function (_0x53bcc8, _0x953bf1) {
            return _0x53bcc8 === _0x953bf1;
        },
        'CeKXa': 'impzG',
        'XSRfq': 'NIaiP',
        'cHQjp': '水滴已满，果实成熟，跳过所有任务',
        'kHZJx': 'pciuf',
        'jxPIv': '4|1|0|2|3',
        'BnLRb': function (_0x4d0537, _0x323328) {
            return _0x4d0537 >= _0x323328;
        },
        'qgIPA': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n',
        'VKRwZ': function (_0x222358, _0x57f3ee) {
            return _0x222358(_0x57f3ee);
        },
        'LCzoe': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子',
        'PTCLY': function (_0x160d85, _0xb3ef17) {
            return _0x160d85(_0xb3ef17);
        }
    };
    return new Promise(async _0x22142b => {
        const _0x43104d = $['allTask']['filter'](_0x29ed9c => _0x29ed9c['tasklevel'] !== 0x6);
        const _0x565891 = Math['max'](...[..._0x43104d]['map'](_0x4fcc21 => _0x4fcc21['limit']));
        for (let _0x4fb245 = 0x0; _0x24308e['VvKEx'](_0x4fb245, _0x43104d['length']); _0x4fb245++) {
            const _0x45c01c = _0x43104d[_0x4fb245];
            $['log']('开始第' + _0x24308e['WWkSK'](_0x4fb245, 0x1) + '个任务：' + _0x45c01c['taskname']);
            const _0x47e572 = [0x0];
            for (let _0x4fb245 = 0x0; _0x24308e['VvKEx'](_0x4fb245, _0x565891); _0x4fb245++) {
                const _0x442ac3 = _0x24308e['mpSRH'](Math['random'](), 0x3);
                await $['wait'](_0x24308e['mpSRH'](_0x442ac3, 0x3e8));
                if (_0x24308e['MjUDe'](_0x47e572[0x0], 0x0)) {
                    _0x47e572[0x0] = await _0x24308e['CAxhJ'](doTask, _0x45c01c);
                }
                if (_0x24308e['kEiBZ'](_0x47e572[0x0], 0x0)) {
                    break;
                }
            }
            if (_0x24308e['IrQcx'](_0x47e572[0x0], 0x3f9)) {
                if (_0x24308e['IrQcx'](_0x24308e['CeKXa'], _0x24308e['XSRfq'])) {
                    _0x24308e['wXhrF'](_0x22142b);
                } else {
                    $['log'](_0x24308e['cHQjp']);
                    _0x24308e['CAxhJ'](_0x22142b, !![]);
                    break;
                }
            }
            if (_0x24308e['IrQcx'](_0x47e572[0x0], 0x408)) {
                if (_0x24308e['IrQcx'](_0x24308e['kHZJx'], _0x24308e['kHZJx'])) {
                    var _0x1d6895 = _0x24308e['jxPIv']['split']('|'), _0x4c34b4 = 0x0;
                    while (!![]) {
                        switch (_0x1d6895[_0x4c34b4++]) {
                            case'0':
                                notifyBool = notifyBool && _0x24308e['BnLRb'](notifyLevel, 0x2);
                                continue;
                            case'1':
                                message += _0x24308e['qgIPA'];
                                continue;
                            case'2':
                                _0x24308e['VKRwZ'](_0x22142b, ![]);
                                continue;
                            case'3':
                                return;
                            case'4':
                                $['log'](_0x24308e['LCzoe']);
                                continue;
                        }
                        break;
                    }
                } else {
                    message += _0x24308e['oktHy'];
                }
            }
            $['log']('结束第' + _0x24308e['WWkSK'](_0x4fb245, 0x1) + '个任务：' + _0x45c01c['taskname']);
        }
        _0x24308e['PTCLY'](_0x22142b, !![]);
    });
}

function answerTask() {
    var _0x27b4f6 = {
        'ENKNy': function (_0xac9c69, _0xdd3d03) {
            return _0xac9c69 !== _0xdd3d03;
        }, 'LCQvt': 'GnwSi', 'fZbNv': function (_0x4d9c99, _0x43e284) {
            return _0x4d9c99 !== _0x43e284;
        }, 'mDkyF': '活动太火爆了', 'aSnjJ': '任务进行中或者未到任务时间', 'uhPyU': function (_0xab3d87, _0xe8e517) {
            return _0xab3d87 === _0xe8e517;
        }, 'pMrAF': function (_0x5bc056) {
            return _0x5bc056();
        }, 'RiuPa': function (_0x31428f, _0x5b13e3) {
            return _0x31428f !== _0x5b13e3;
        }, 'GTBiv': function (_0xf055d9, _0x2760dd) {
            return _0xf055d9 === _0x2760dd;
        }, 'UmLzE': 'ans err', 'qqqXe': function (_0x276879, _0x27e529) {
            return _0x276879 > _0x27e529;
        }, 'nhTTz': function (_0x4195db, _0x37d107) {
            return _0x4195db <= _0x37d107;
        }, 'LQaVu': function (_0x44abba, _0x4dc53f) {
            return _0x44abba(_0x4dc53f);
        }, 'vdKAQ': function (_0x485ecf, _0x231a68) {
            return _0x485ecf !== _0x231a68;
        }, 'jgEYU': 'jlRVd', 'JRCvi': function (_0x1664a9, _0x24bbc8, _0x382e9d) {
            return _0x1664a9(_0x24bbc8, _0x382e9d);
        }, 'UZrti': 'dotask', 'zygsT': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    const _0x4b95a7 = $['allTask']['filter'](_0x53ee95 => _0x53ee95['tasklevel'] === 0x6);
    if (!_0x4b95a7 || !_0x4b95a7[0x0]) return;
    const {tasklevel, left, taskname, eachtimeget} = _0x4b95a7[0x0];
    $['log']('准备做答题任务：' + taskname);
    return new Promise(async _0x1976ae => {
        var _0x5d6a21 = {
            'mgFEE': function (_0x3a55ad, _0x3c8eb7) {
                return _0x27b4f6['ENKNy'](_0x3a55ad, _0x3c8eb7);
            }, 'stRiQ': _0x27b4f6['LCQvt'], 'Qrjok': function (_0x3285c2, _0x130b63) {
                return _0x27b4f6['fZbNv'](_0x3285c2, _0x130b63);
            }, 'FoAOv': _0x27b4f6['mDkyF'], 'fOneA': _0x27b4f6['aSnjJ'], 'FIiBo': function (_0x927137, _0x1fff29) {
                return _0x27b4f6['uhPyU'](_0x927137, _0x1fff29);
            }, 'bUfBJ': function (_0x2b7bcd) {
                return _0x27b4f6['pMrAF'](_0x2b7bcd);
            }, 'uOvUj': function (_0x41102c, _0x2b509d) {
                return _0x27b4f6['RiuPa'](_0x41102c, _0x2b509d);
            }, 'uIZSW': function (_0x598ef8, _0xfb420e) {
                return _0x27b4f6['GTBiv'](_0x598ef8, _0xfb420e);
            }, 'pJEjY': _0x27b4f6['UmLzE'], 'KMiQp': function (_0x991909, _0xe0351) {
                return _0x27b4f6['qqqXe'](_0x991909, _0xe0351);
            }, 'tWxJo': function (_0x2d7c35) {
                return _0x27b4f6['pMrAF'](_0x2d7c35);
            }
        };
        if (_0x27b4f6['nhTTz'](_0x27b4f6['LQaVu'](parseInt, left), 0x0)) {
            if (_0x27b4f6['vdKAQ'](_0x27b4f6['jgEYU'], _0x27b4f6['jgEYU'])) {
                if (notifyBool) {
                    $['msg']($['name'], subTitle, message, option);
                    if ($['isNode']()) {
                        allMessage += subTitle + '\x0a' + message + (_0x5d6a21['mgFEE']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                    }
                } else {
                    $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                }
            } else {
                _0x27b4f6['LQaVu'](_0x1976ae, ![]);
                $['log'](taskname + '[做任务]： 任务已完成，跳过');
                return;
            }
        }
        $['get'](_0x27b4f6['JRCvi'](taskUrl, _0x27b4f6['UZrti'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':' + ['A', 'B', 'C', 'D'][$['answer']] + ':0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0x27b4f6['LQaVu'](encodeURIComponent, _0x27b4f6['zygsT'])), async (_0x4f0430, _0x3d9807, _0xa2b56) => {
            if (_0x5d6a21['mgFEE'](_0x5d6a21['stRiQ'], _0x5d6a21['stRiQ'])) {
                console['log']('京东服务器返回空数据');
            } else {
                try {
                    const _0x164aca = _0xa2b56['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    let {ret, retmsg, right} = JSON['parse'](_0x164aca);
                    retmsg = _0x5d6a21['Qrjok'](retmsg, '') ? retmsg : '成功';
                    $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x5d6a21['Qrjok'](retmsg['indexOf'](_0x5d6a21['FoAOv']), -0x1) ? _0x5d6a21['fOneA'] : retmsg) + '\x22');
                    if (_0x5d6a21['FIiBo'](ret, 0x0) && _0x5d6a21['FIiBo'](right, 0x1)) {
                        $['drip'] += eachtimeget;
                    }
                    if (_0x5d6a21['FIiBo'](ret, 0x3f9) || _0x5d6a21['FIiBo'](ret, 0x3f4)) {
                        _0x5d6a21['bUfBJ'](_0x1976ae);
                        return;
                    }
                    if ((_0x5d6a21['uOvUj'](ret, 0x0) && _0x5d6a21['uOvUj'](ret, 0x405) || _0x5d6a21['uIZSW'](retmsg, _0x5d6a21['pJEjY'])) && _0x5d6a21['KMiQp']($['answer'], 0x0)) {
                        $['answer']--;
                        await $['wait'](0x3e8);
                        await _0x5d6a21['bUfBJ'](answerTask);
                    }
                } catch (_0x394221) {
                    $['logErr'](_0x394221, _0x3d9807);
                } finally {
                    _0x5d6a21['tWxJo'](_0x1976ae);
                }
            }
        });
    });
}

function getMessage(_0x13e80c, _0x19d787) {
    var _0x2571af = {
        'Dixcw': function (_0x3b45b0, _0x3a725a) {
            return _0x3b45b0 !== _0x3a725a;
        },
        'qiUkp': function (_0x25fdb7, _0x1e434f) {
            return _0x25fdb7 !== _0x1e434f;
        },
        'xDQkU': '活动太火爆了',
        'FzMaK': '任务进行中或者未到任务时间',
        'PzNtY': function (_0x35f17f, _0x17fcee) {
            return _0x35f17f === _0x17fcee;
        },
        'Vyaga': function (_0x4688e1, _0x4f7269) {
            return _0x4688e1(_0x4f7269);
        },
        'qviCb': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'PJOif': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'DpbyY': function (_0x287ade, _0x11876d) {
            return _0x287ade >= _0x11876d;
        },
        'YAzhm': function (_0x3900d6, _0x4870d3) {
            return _0x3900d6 === _0x4870d3;
        },
        'dQPwW': 'dAGzU',
        'QXnVc': 'nuUvl',
        'FPsxe': function (_0x313b99, _0x28caca) {
            return _0x313b99 >= _0x28caca;
        },
        'JUKOV': 'AsyIi',
        'TPJZv': 'gvgdk',
        'rarWY': '获取随机助力码失败 API 返回异常',
        'Lqryb': function (_0x5739e2, _0xe6d5a2) {
            return _0x5739e2 - _0xe6d5a2;
        },
        'wMege': 'kSVua',
        'xosWW': function (_0x161edc, _0x35d0d2) {
            return _0x161edc / _0x35d0d2;
        },
        'AwTCP': function (_0x5d068a, _0x56af3e) {
            return _0x5d068a <= _0x56af3e;
        },
        'zkdzj': function (_0x1e839e, _0x41a776) {
            return _0x1e839e > _0x41a776;
        },
        'CjWMI': function (_0x17a8e3, _0x575e9e) {
            return _0x17a8e3 > _0x575e9e;
        },
        'TkRHs': function (_0x369891, _0x127656) {
            return _0x369891 === _0x127656;
        },
        'wzHVU': 'vuVwv',
        'lwHXN': function (_0x52b017, _0x2850aa) {
            return _0x52b017 / _0x2850aa;
        },
        'OyfmG': function (_0x57506d, _0x37e418) {
            return _0x57506d + _0x37e418;
        },
        'FnqLg': function (_0x5974, _0x3bf305) {
            return _0x5974 > _0x3bf305;
        },
        'jOkFc': function (_0x109746, _0x33f673) {
            return _0x109746 > _0x33f673;
        },
        'GQTmQ': function (_0x3fbb38, _0x399d11) {
            return _0x3fbb38 !== _0x399d11;
        },
        'ftABG': 'uJDBv',
        'iThck': function (_0x3b1487, _0xd8e7d3) {
            return _0x3b1487 >= _0xd8e7d3;
        }
    };
    const _0x3ff580 = _0x2571af['Lqryb'](_0x13e80c['target'], _0x13e80c['score']);
    const _0x46c49f = _0x13e80c['modifyscore'];
    const _0xfc4dc4 = _0x19d787['modifyscore'];
    let _0x2fafd5 = 0x0;
    if ($['detail']) {
        if (_0x2571af['qiUkp'](_0x2571af['wMege'], _0x2571af['wMege'])) {
            const _0x36439e = data['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
            let {ret, retmsg} = JSON['parse'](_0x36439e);
            retmsg = _0x2571af['Dixcw'](retmsg, '') ? retmsg : '成功';
            $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x2571af['qiUkp'](retmsg['indexOf'](_0x2571af['xDQkU']), -0x1) ? _0x2571af['FzMaK'] : retmsg) + '\x22');
            if (_0x2571af['PzNtY'](ret, 0x0)) {
                $['drip'] += eachtimeget;
            }
            _0x2571af['Vyaga'](resolve, ret);
        } else {
            let _0x4e58fb = _0x2571af['xosWW'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
            $['detail']['forEach'](function (_0x1fb7fe, _0x243f69) {
                if (_0x2571af['YAzhm'](_0x2571af['dQPwW'], _0x2571af['QXnVc'])) {
                    currentToken = tokenNull;
                } else {
                    if (_0x2571af['FPsxe'](_0x1fb7fe['time'], _0x4e58fb) && _0x1fb7fe['score']) {
                        if (_0x2571af['qiUkp'](_0x2571af['JUKOV'], _0x2571af['TPJZv'])) {
                            _0x2fafd5 += _0x1fb7fe['score'];
                        } else {
                            $['log'](_0x2571af['qviCb']);
                            message += _0x2571af['PJOif'];
                            notifyBool = notifyBool && _0x2571af['DpbyY'](notifyLevel, 0x3);
                            _0x2571af['Vyaga'](resolve, ![]);
                        }
                    }
                }
            });
        }
    }
    message += '【水滴】本次获得' + _0x46c49f + ' 离线获得' + _0xfc4dc4 + ' 今日获得' + _0x2fafd5 + ' 还需水滴' + _0x3ff580 + '\x0a';
    if (_0x2571af['AwTCP'](_0x3ff580, 0x0)) {
        notifyBool = !![];
        message += '【成熟】水果已成熟请及时收取，deliverState：' + _0x13e80c['deliverState'] + '\x0a';
        return;
    }
    if (_0x2571af['zkdzj'](_0x46c49f, 0x0) || _0x2571af['zkdzj'](_0xfc4dc4, 0x0) || _0x2571af['CjWMI'](_0x2fafd5, 0x0)) {
        if (_0x2571af['TkRHs'](_0x2571af['wzHVU'], _0x2571af['wzHVU'])) {
            const _0x49efb4 = Math['ceil'](_0x2571af['lwHXN'](_0x3ff580, _0x2571af['CjWMI'](_0x2fafd5, 0x0) ? _0x2fafd5 : _0x2571af['OyfmG'](_0x46c49f, _0xfc4dc4)));
            message += '【预测】还需 ' + _0x49efb4 + ' 天\n';
        } else {
            $['log'](_0x2571af['rarWY']);
        }
    }
    if (_0x2571af['FnqLg'](_0x46c49f, 0x0) || _0x2571af['jOkFc'](_0xfc4dc4, 0x0)) {
        if (_0x2571af['GQTmQ'](_0x2571af['ftABG'], _0x2571af['ftABG'])) {
            shareCode = data;
        } else {
            notifyBool = notifyBool && _0x2571af['FPsxe'](notifyLevel, 0x1);
        }
    } else {
        notifyBool = notifyBool && _0x2571af['iThck'](notifyLevel, 0x2);
    }
}

function submitInviteId(_0x58b994) {
    var _0x5ee1a3 = {
        'eUnET': function (_0x413c91, _0x5d6684) {
            return _0x413c91 >= _0x5d6684;
        },
        'qJTll': 'farm_jstoken',
        'jQJAQ': 'phoneid',
        'EdRsw': 'timestamp',
        'gPSvS': function (_0x1ac04e, _0x2f2f8e) {
            return _0x1ac04e(_0x2f2f8e);
        },
        'TgFJx': './USER_AGENTS',
        'hruBf': 'JDUA',
        'LJJHo': 'jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0',
        'PYoIh': function (_0x514da7, _0x38282b) {
            return _0x514da7 !== _0x38282b;
        },
        'CEINQ': 'zqlWK',
        'dZWMp': 'SLVhw',
        'vJkIu': '【邀请码】提交成功！\n',
        'BwVze': '邀请码提交失败 API 返回异常',
        'qZQFZ': function (_0x47ba12, _0x164f7a) {
            return _0x47ba12 === _0x164f7a;
        },
        'WxHIb': 'Ozfje',
        'gBIxP': 'mKCWQ',
        'UGxNz': function (_0x593812) {
            return _0x593812();
        },
        'xpaLg': function (_0x3f938f, _0x743469) {
            return _0x3f938f / _0x743469;
        },
        'XLusN': 'smp',
        'Tqjoa': 'active',
        'fomrL': 'joinnum'
    };
    return new Promise(_0x495d95 => {
        var _0xdba469 = {
            'ucEBL': function (_0x3d36f8, _0x913c60) {
                return _0x5ee1a3['xpaLg'](_0x3d36f8, _0x913c60);
            }, 'aXUFC': _0x5ee1a3['XLusN'], 'hTrCF': _0x5ee1a3['Tqjoa'], 'yWtCx': _0x5ee1a3['fomrL']
        };
        if (!$['info'] || !$['info']['smp']) {
            _0x5ee1a3['UGxNz'](_0x495d95);
            return;
        }
        try {
            $['post']({
                'url': 'https://api.ninesix.cc/api/jx-nc/' + $['info']['smp'] + '/' + _0x5ee1a3['gPSvS'](encodeURIComponent, _0x58b994) + '?active=' + $['info']['active'] + '&joinnum=' + $['info']['joinnum'],
                'timeout': 0x2710
            }, (_0x1a8bdf, _0x349b24, _0xf42fb2) => {
                var _0x2de8f9 = {
                    'vHiHW': function (_0x13ca65, _0x47306e) {
                        return _0x5ee1a3['eUnET'](_0x13ca65, _0x47306e);
                    },
                    'QvWPu': _0x5ee1a3['qJTll'],
                    'eujFY': _0x5ee1a3['jQJAQ'],
                    'wNTdc': _0x5ee1a3['EdRsw'],
                    'GZwoO': function (_0x18bc08, _0xd0c80f) {
                        return _0x5ee1a3['gPSvS'](_0x18bc08, _0xd0c80f);
                    },
                    'DlgdO': _0x5ee1a3['TgFJx'],
                    'yYBlb': _0x5ee1a3['hruBf'],
                    'ioOkK': _0x5ee1a3['LJJHo']
                };
                if (_0x5ee1a3['PYoIh'](_0x5ee1a3['CEINQ'], _0x5ee1a3['CEINQ'])) {
                    let _0x747dd5 = _0xdba469['ucEBL'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
                    $['detail']['forEach'](function (_0x456fcb, _0x1fc569) {
                        if (_0x2de8f9['vHiHW'](_0x456fcb['time'], _0x747dd5) && _0x456fcb['score']) {
                            dayGet += _0x456fcb['score'];
                        }
                    });
                } else {
                    try {
                        if (_0x5ee1a3['PYoIh'](_0x5ee1a3['dZWMp'], _0x5ee1a3['dZWMp'])) {
                            return {
                                'url': JXNC_API_HOST + 'cubeactive/farm/' + function_path + '?' + body + '&farm_jstoken=' + currentToken[_0x2de8f9['QvWPu']] + '&phoneid=' + currentToken[_0x2de8f9['eujFY']] + '×tamp=' + currentToken[_0x2de8f9['wNTdc']] + '&sceneval=2&g_login_type=1&callback=whyour&_=' + Date['now']() + '&g_ty=ls',
                                'headers': {
                                    'Cookie': currentCookie,
                                    'Accept': '*/*',
                                    'Connection': 'keep-alive',
                                    'Referer': 'https://st.jingxi.com/pingou/dream_factory/index.html',
                                    'Accept-Encoding': 'gzip, deflate, br',
                                    'Host': 'wq.jd.com',
                                    'Accept-Language': 'zh-cn',
                                    'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x2de8f9['GZwoO'](require, _0x2de8f9['DlgdO'])['USER_AGENT'] : $['getdata'](_0x2de8f9['yYBlb']) ? $['getdata'](_0x2de8f9['yYBlb']) : _0x2de8f9['ioOkK']
                                },
                                'timeout': 0x2710
                            };
                        } else {
                            const {code, data = {}} = JSON['parse'](_0xf42fb2);
                            $['log']('邀请码提交：' + code);
                            if (data['value']) {
                                message += _0x5ee1a3['vJkIu'];
                            }
                        }
                    } catch (_0x3b092f) {
                        $['log'](_0x5ee1a3['BwVze']);
                    } finally {
                        if (_0x5ee1a3['qZQFZ'](_0x5ee1a3['WxHIb'], _0x5ee1a3['gBIxP'])) {
                            try {
                                let _0x4605f4 = code && JSON['parse'](code);
                                return _0x4605f4[_0xdba469['aXUFC']] && _0x4605f4[_0xdba469['hTrCF']] && _0x4605f4[_0xdba469['yWtCx']] ? _0x4605f4 : '';
                            } catch (_0x200661) {
                                return '';
                            }
                        } else {
                            _0x5ee1a3['UGxNz'](_0x495d95);
                        }
                    }
                }
            });
        } catch (_0x17af5d) {
            _0x5ee1a3['UGxNz'](_0x495d95);
        }
    });
}

function getAssistUser() {
    var _0x5c38fb = {
        'dpaZQ': function (_0x53b8a8, _0x455b51) {
            return _0x53b8a8 === _0x455b51;
        },
        'fLgpF': function (_0x19f570, _0x941107) {
            return _0x19f570 === _0x941107;
        },
        'ivwiZ': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'SDaec': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'EEXoN': function (_0x40589e, _0x2a7f69) {
            return _0x40589e >= _0x2a7f69;
        },
        'doMsa': 'CookieJD',
        'ezcZi': 'CookieJD2',
        'DLZTz': function (_0x5d52cf, _0x54fe7d) {
            return _0x5d52cf(_0x54fe7d);
        },
        'XSuEX': 'CookiesJD',
        'ivVqk': function (_0x1f600b, _0x5e8649) {
            return _0x1f600b !== _0x5e8649;
        },
        'uSHsB': 'wqMWJ',
        'pMaZQ': 'pKamN',
        'hvwsx': function (_0x4a7b0e, _0x28a923) {
            return _0x4a7b0e + _0x28a923;
        },
        'JGZer': '获取随机助力码失败 API 返回异常',
        'mvdSs': 'fbUqi',
        'ePrnW': function (_0x17261d, _0x2fd049) {
            return _0x17261d !== _0x2fd049;
        },
        'tWLse': 'xQwWv',
        'JUtyD': 'EefRl'
    };
    return new Promise(_0xd5ff02 => {
        var _0x387f62 = {
            'sXOJU': _0x5c38fb['doMsa'],
            'EuFPW': _0x5c38fb['ezcZi'],
            'fWUrg': function (_0x58093f, _0x3fbc14) {
                return _0x5c38fb['DLZTz'](_0x58093f, _0x3fbc14);
            },
            'Qdzvm': _0x5c38fb['XSuEX'],
            'UGXrw': function (_0x14e9c3, _0x24786a) {
                return _0x5c38fb['ivVqk'](_0x14e9c3, _0x24786a);
            },
            'PRvJd': _0x5c38fb['uSHsB'],
            'vLSWb': _0x5c38fb['pMaZQ'],
            'Cswzf': function (_0x33df21, _0x4a9f40) {
                return _0x5c38fb['hvwsx'](_0x33df21, _0x4a9f40);
            },
            'gFzFQ': _0x5c38fb['JGZer'],
            'ASyUm': function (_0x4a018f, _0x7c5f66) {
                return _0x5c38fb['fLgpF'](_0x4a018f, _0x7c5f66);
            },
            'gGglg': _0x5c38fb['mvdSs']
        };
        try {
            $['get']({
                'url': 'https://api.ninesix.cc/api/jx-nc?active=' + $['info']['active'],
                'timeout': 0x2710
            }, async (_0x11e7ff, _0x476f83, _0x5824f0) => {
                var _0x3c6172 = {
                    'ThJRv': _0x387f62['sXOJU'],
                    'yKVIP': _0x387f62['EuFPW'],
                    'MHowX': function (_0x210ac9, _0x913fec) {
                        return _0x387f62['fWUrg'](_0x210ac9, _0x913fec);
                    },
                    'MzXCx': _0x387f62['Qdzvm'],
                    'aCkQP': function (_0x398f0a, _0x352a70) {
                        return _0x387f62['fWUrg'](_0x398f0a, _0x352a70);
                    }
                };
                try {
                    const {code, data: {value, extra = {}} = {}} = JSON['parse'](_0x5824f0);
                    if (value && extra['active']) {
                        if (_0x387f62['UGXrw'](_0x387f62['PRvJd'], _0x387f62['vLSWb'])) {
                            let _0x583c07 = {
                                'smp': value,
                                'active': extra['active'],
                                'joinnum': extra['joinnum'] || 0x1
                            };
                            $['log'](_0x387f62['Cswzf']('获取随机助力码成功 ', JSON['stringify'](_0x583c07)));
                            _0x387f62['fWUrg'](_0xd5ff02, _0x583c07);
                            return;
                        } else {
                            cookieArr = [$['getdata'](_0x3c6172['ThJRv']), $['getdata'](_0x3c6172['yKVIP']), ..._0x3c6172['MHowX'](jsonParse, $['getdata'](_0x3c6172['MzXCx']) || '[]')['map'](_0x664a95 => _0x664a95['cookie'])]['filter'](_0x22e392 => !!_0x22e392);
                        }
                    } else {
                        $['log']('获取随机助力码失败 ' + code);
                    }
                } catch (_0x3c1e6c) {
                    $['log'](_0x387f62['gFzFQ']);
                } finally {
                    if (_0x387f62['ASyUm'](_0x387f62['gGglg'], _0x387f62['gGglg'])) {
                        _0x387f62['fWUrg'](_0xd5ff02, ![]);
                    } else {
                        _0x3c6172['aCkQP'](_0xd5ff02, ![]);
                        $['log'](taskname + '[做任务]： 任务已完成，跳过');
                        return;
                    }
                }
            });
        } catch (_0x5a892f) {
            if (_0x5c38fb['ePrnW'](_0x5c38fb['tWLse'], _0x5c38fb['JUtyD'])) {
                _0x5c38fb['DLZTz'](_0xd5ff02, ![]);
            } else {
                if (_0x5c38fb['dpaZQ'](startInfo['activestatus'], 0x2)) {
                    notifyBool = !![];
                    $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                    message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                } else if (_0x5c38fb['fLgpF'](startInfo['activestatus'], 0x0)) {
                    $['log'](_0x5c38fb['ivwiZ']);
                    message += _0x5c38fb['SDaec'];
                    notifyBool = notifyBool && _0x5c38fb['EEXoN'](notifyLevel, 0x3);
                }
            }
        }
    });
}

async function helpFriends() {
    var _0x1f4bb5 = {
        'GcVoW': function (_0xb7e2c0, _0x198ddd) {
            return _0xb7e2c0 !== _0x198ddd;
        }, 'vtVKm': function (_0x47ebd9, _0x5eaaa9) {
            return _0x47ebd9 === _0x5eaaa9;
        }, 'JzbgB': 'gqCzl', 'ZUqVW': function (_0x40df55, _0x473eea) {
            return _0x40df55(_0x473eea);
        }, 'wvKJV': '助力码非 json 格式，跳过', 'AdwKV': function (_0x3dcd4f, _0x2cafc4, _0x2306df, _0x460977) {
            return _0x3dcd4f(_0x2cafc4, _0x2306df, _0x460977);
        }, 'eRQkd': 'smp', 'sYqIB': 'active', 'OgEVe': 'joinnum', 'WhanY': function (_0x349840, _0x3cc0de) {
            return _0x349840 !== _0x3cc0de;
        }, 'bVkLU': 'rXpOG', 'FNxYv': 'gkwGw'
    };
    for (let _0x5f442d of currentShareCode) {
        if (_0x1f4bb5['vtVKm'](_0x1f4bb5['JzbgB'], _0x1f4bb5['JzbgB'])) {
            if (!_0x5f442d) {
                continue;
            }
            let _0x5a17e4 = _0x1f4bb5['ZUqVW'](changeShareCodeJson, _0x5f442d);
            if (!_0x5a17e4) {
                console['log'](_0x1f4bb5['wvKJV']);
                continue;
            }
            const _0x497b49 = await _0x1f4bb5['AdwKV'](helpShareCode, _0x5a17e4[_0x1f4bb5['eRQkd']], _0x5a17e4[_0x1f4bb5['sYqIB']], _0x5a17e4[_0x1f4bb5['OgEVe']]);
            if (!_0x497b49) {
                if (_0x1f4bb5['WhanY'](_0x1f4bb5['bVkLU'], _0x1f4bb5['FNxYv'])) {
                    return ![];
                } else {
                    allMessage += subTitle + '\x0a' + message + (_0x1f4bb5['GcVoW']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                }
            }
            await $['wait'](0x3e8);
        } else {
            if (jdCookieNode[item]) {
                cookieArr['push'](jdCookieNode[item]);
            }
        }
    }
    return !![];
}

function helpShareCode(_0x99dbbd, _0x88b179, _0x33270b) {
    var _0x212353 = {
        'OxAwi': function (_0x3cdc84, _0x3f3f59) {
            return _0x3cdc84 === _0x3f3f59;
        },
        'RNpgs': function (_0x5dc454, _0xdc1d8b) {
            return _0x5dc454 === _0xdc1d8b;
        },
        'qCkpl': function (_0x374911, _0x53e645) {
            return _0x374911 === _0x53e645;
        },
        'ygOvj': 'UTJVZ',
        'qXelv': 'Olvac',
        'LqRYz': function (_0x549a4e, _0x82d387) {
            return _0x549a4e !== _0x82d387;
        },
        'FaUcz': 'MpJea',
        'VOAZa': function (_0x5207ea, _0xf955f3) {
            return _0x5207ea(_0xf955f3);
        },
        'qXgFO': function (_0x5bec8c, _0x37e574) {
            return _0x5bec8c(_0x37e574);
        },
        'Pcxla': function (_0x52c81b, _0x29b09d) {
            return _0x52c81b === _0x29b09d;
        },
        'gshdL': 'KyIjF',
        'GRAoD': 'ndcbZ',
        'nDRjx': function (_0xce62da, _0x25b658) {
            return _0xce62da(_0x25b658);
        },
        'bbwDJ': function (_0x2003fa) {
            return _0x2003fa();
        },
        'azFBq': function (_0x364d67, _0x29de69) {
            return _0x364d67(_0x29de69);
        },
        'PAfbD': function (_0xefbb1b, _0x5d8a85) {
            return _0xefbb1b + _0x5d8a85;
        },
        'ZXecS': 'smp',
        'NdCVr': 'active',
        'vdGtM': 'joinnum',
        'YDNcj': 'zhKrz',
        'uIQYl': function (_0x5a85a2, _0x203bb2) {
            return _0x5a85a2 === _0x203bb2;
        },
        'xSAaJ': function (_0x361991, _0x586a1a) {
            return _0x361991 === _0x586a1a;
        },
        'CvKkH': 'qqOEY',
        'OgKJo': 'dlpNn',
        'QpmWh': '助力码与当前账号相同，跳过助力。准备进行下一个助力',
        'ytZXH': function (_0x152797, _0x175023, _0x123221) {
            return _0x152797(_0x175023, _0x123221);
        },
        'OHhsD': 'help'
    };
    return new Promise(async _0x4762f2 => {
        var _0x550d25 = {
            'NKIAO': function (_0x428222) {
                return _0x212353['bbwDJ'](_0x428222);
            }, 'AESpK': function (_0x56d388, _0x5999f8) {
                return _0x212353['azFBq'](_0x56d388, _0x5999f8);
            }, 'cbQiS': function (_0x3432d2, _0x548960) {
                return _0x212353['PAfbD'](_0x3432d2, _0x548960);
            }, 'XzBlL': _0x212353['ZXecS'], 'AGfrY': _0x212353['NdCVr'], 'beEwL': _0x212353['vdGtM']
        };
        if (_0x212353['Pcxla'](_0x212353['YDNcj'], _0x212353['YDNcj'])) {
            if (_0x212353['uIQYl'](_0x99dbbd, $['info']['smp'])) {
                if (_0x212353['xSAaJ'](_0x212353['CvKkH'], _0x212353['OgKJo'])) {
                    _0x550d25['NKIAO'](_0x4762f2);
                } else {
                    $['log'](_0x212353['QpmWh']);
                    _0x212353['azFBq'](_0x4762f2, !![]);
                }
            }
            $['log']('即将助力 share {"smp":"' + _0x99dbbd + '","active":"' + _0x88b179 + '","joinnum":"' + _0x33270b + '\x22}');
            $['get'](_0x212353['ytZXH'](taskUrl, _0x212353['OHhsD'], 'active=' + _0x88b179 + '&joinnum=' + _0x33270b + '&smp=' + _0x99dbbd), async (_0x9fd7e, _0x2105ce, _0x57aa9f) => {
                try {
                    const _0x59204c = _0x57aa9f['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    const {ret, retmsg = ''} = JSON['parse'](_0x59204c);
                    $['log']('助力结果：ret=' + ret + ' retmsg="' + (retmsg ? retmsg : 'OK') + '\x22');
                    if (_0x212353['OxAwi'](ret, 0x93) || _0x212353['RNpgs'](ret, 0x3f8)) {
                        if (_0x212353['qCkpl'](_0x212353['ygOvj'], _0x212353['qXelv'])) {
                            notifyBool = !![];
                            message += '【成熟】水果已成熟请及时收取，deliverState：' + endInfo['deliverState'] + '\x0a';
                            return;
                        } else {
                            if (_0x212353['qCkpl'](ret, 0x93)) {
                                if (_0x212353['LqRYz'](_0x212353['FaUcz'], _0x212353['FaUcz'])) {
                                    console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\n');
                                    _0x550d25['AESpK'](_0x4762f2, null);
                                } else {
                                    $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                                }
                            }
                            _0x212353['VOAZa'](_0x4762f2, ![]);
                            return;
                        }
                    }
                    _0x212353['qXgFO'](_0x4762f2, !![]);
                    return;
                } catch (_0x2b7f05) {
                    $['logErr'](_0x2b7f05, _0x2105ce);
                } finally {
                    if (_0x212353['Pcxla'](_0x212353['gshdL'], _0x212353['GRAoD'])) {
                        const {code, data: {value, extra = {}} = {}} = JSON['parse'](_data);
                        if (value && extra['active']) {
                            let _0x4145d3 = {
                                'smp': value,
                                'active': extra['active'],
                                'joinnum': extra['joinnum'] || 0x1
                            };
                            $['log'](_0x550d25['cbQiS']('获取随机助力码成功 ', JSON['stringify'](_0x4145d3)));
                            _0x550d25['AESpK'](_0x4762f2, _0x4145d3);
                            return;
                        } else {
                            $['log']('获取随机助力码失败 ' + code);
                        }
                    } else {
                        _0x212353['nDRjx'](_0x4762f2, ![]);
                    }
                }
            });
        } else {
            let _0x5eacdd = code && JSON['parse'](code);
            return _0x5eacdd[_0x550d25['XzBlL']] && _0x5eacdd[_0x550d25['AGfrY']] && _0x5eacdd[_0x550d25['beEwL']] ? _0x5eacdd : '';
        }
    });
}

function doTask({tasklevel, left, taskname, eachtimeget}) {
    var _0x25bd13 = {
        'WJvQW': function (_0x4c8042, _0x5bd811) {
            return _0x4c8042 === _0x5bd811;
        },
        'EdvnZ': function (_0x29c10c, _0x27a24f) {
            return _0x29c10c(_0x27a24f);
        },
        'QhlGa': function (_0x5f427d, _0x44c4ea) {
            return _0x5f427d !== _0x44c4ea;
        },
        'jBviF': '活动太火爆了',
        'Nubpm': '任务进行中或者未到任务时间',
        'mYGjl': 'wvZfq',
        'jVjyB': 'gcEAZ',
        'SWuNu': function (_0x472a2f, _0x3dcf93) {
            return _0x472a2f(_0x3dcf93);
        },
        'DQExn': 'QYbXM',
        'rdewt': function (_0xe21f94) {
            return _0xe21f94();
        },
        'Cpsoa': 'HJnNI',
        'nTVXl': function (_0x526662, _0x43326f) {
            return _0x526662 <= _0x43326f;
        },
        'oQmXx': function (_0x255f2f, _0x1eb945) {
            return _0x255f2f(_0x1eb945);
        },
        'wdPVq': function (_0x4ae986, _0x1cfb93) {
            return _0x4ae986(_0x1cfb93);
        },
        'OGilc': function (_0x502bd0, _0x3eeb69, _0x72bcfc) {
            return _0x502bd0(_0x3eeb69, _0x72bcfc);
        },
        'ztWkC': 'dotask',
        'baGSi': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    return new Promise(async _0x1cfc6d => {
        var _0x2086b3 = {
            'eTmCX': function (_0x5a51f8, _0x3bf6ce) {
                return _0x25bd13['WJvQW'](_0x5a51f8, _0x3bf6ce);
            }, 'CaYMw': function (_0x34736d, _0x2ae4c0) {
                return _0x25bd13['WJvQW'](_0x34736d, _0x2ae4c0);
            }, 'LbDSZ': function (_0x56352c, _0x1bd047) {
                return _0x25bd13['EdvnZ'](_0x56352c, _0x1bd047);
            }, 'ickeq': function (_0x1eb116, _0x42a19d) {
                return _0x25bd13['QhlGa'](_0x1eb116, _0x42a19d);
            }, 'AZpmF': function (_0x5607cc, _0x2037b6) {
                return _0x25bd13['QhlGa'](_0x5607cc, _0x2037b6);
            }, 'ETJDb': _0x25bd13['jBviF'], 'btTqz': _0x25bd13['Nubpm'], 'ysftZ': function (_0xcb04c3, _0x14a7e0) {
                return _0x25bd13['WJvQW'](_0xcb04c3, _0x14a7e0);
            }, 'tSidz': _0x25bd13['mYGjl'], 'XpyKa': _0x25bd13['jVjyB'], 'SeXbT': function (_0x71b9ba, _0x6e21b2) {
                return _0x25bd13['SWuNu'](_0x71b9ba, _0x6e21b2);
            }, 'XIBef': _0x25bd13['DQExn'], 'FIyYY': function (_0x2cf9fc) {
                return _0x25bd13['rdewt'](_0x2cf9fc);
            }
        };
        if (_0x25bd13['QhlGa'](_0x25bd13['Cpsoa'], _0x25bd13['Cpsoa'])) {
            const _0x49fe46 = data['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
            const {ret, retmsg = ''} = JSON['parse'](_0x49fe46);
            $['log']('助力结果：ret=' + ret + ' retmsg="' + (retmsg ? retmsg : 'OK') + '\x22');
            if (_0x2086b3['eTmCX'](ret, 0x93) || _0x2086b3['CaYMw'](ret, 0x3f8)) {
                if (_0x2086b3['CaYMw'](ret, 0x93)) {
                    $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                }
                _0x2086b3['LbDSZ'](_0x1cfc6d, ![]);
                return;
            }
            _0x2086b3['LbDSZ'](_0x1cfc6d, !![]);
            return;
        } else {
            if (_0x25bd13['nTVXl'](_0x25bd13['oQmXx'](parseInt, left), 0x0)) {
                $['log'](taskname + '[做任务]： 任务已完成，跳过');
                _0x25bd13['wdPVq'](_0x1cfc6d, ![]);
            }
            $['get'](_0x25bd13['OGilc'](taskUrl, _0x25bd13['ztWkC'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':D:0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0x25bd13['wdPVq'](encodeURIComponent, _0x25bd13['baGSi'])), (_0x5ed41b, _0x33fb47, _0x27dff6) => {
                try {
                    const _0x3378df = _0x27dff6['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    let {ret, retmsg} = JSON['parse'](_0x3378df);
                    retmsg = _0x2086b3['ickeq'](retmsg, '') ? retmsg : '成功';
                    $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x2086b3['AZpmF'](retmsg['indexOf'](_0x2086b3['ETJDb']), -0x1) ? _0x2086b3['btTqz'] : retmsg) + '\x22');
                    if (_0x2086b3['CaYMw'](ret, 0x0)) {
                        if (_0x2086b3['ysftZ'](_0x2086b3['tSidz'], _0x2086b3['XpyKa'])) {
                            return ![];
                        } else {
                            $['drip'] += eachtimeget;
                        }
                    }
                    _0x2086b3['SeXbT'](_0x1cfc6d, ret);
                } catch (_0x3f3b9a) {
                    if (_0x2086b3['AZpmF'](_0x2086b3['XIBef'], _0x2086b3['XIBef'])) {
                        $['logErr'](_0x3f3b9a, _0x33fb47);
                    } else {
                        $['logErr'](_0x3f3b9a, _0x33fb47);
                    }
                } finally {
                    _0x2086b3['FIyYY'](_0x1cfc6d);
                }
            });
        }
    });
}

function taskUrl(_0x3f5365, _0x392e3a) {
    var _0x5912da = {
        'GAtDH': 'farm_jstoken',
        'itolp': 'phoneid',
        'GczxH': 'timestamp',
        'ujRRZ': function (_0x56519a, _0x1c3086) {
            return _0x56519a(_0x1c3086);
        },
        'AFLxF': './USER_AGENTS',
        'IxDKu': 'JDUA',
        'bTRUM': 'jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0'
    };
    return {
        'url': JXNC_API_HOST + 'cubeactive/farm/' + _0x3f5365 + '?' + _0x392e3a + '&farm_jstoken=' + currentToken[_0x5912da['GAtDH']] + '&phoneid=' + currentToken[_0x5912da['itolp']] + '×tamp=' + currentToken[_0x5912da['GczxH']] + '&sceneval=2&g_login_type=1&callback=whyour&_=' + Date['now']() + '&g_ty=ls',
        'headers': {
            'Cookie': currentCookie,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://st.jingxi.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'wq.jd.com',
            'Accept-Language': 'zh-cn',
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x5912da['ujRRZ'](require, _0x5912da['AFLxF'])['USER_AGENT'] : $['getdata'](_0x5912da['IxDKu']) ? $['getdata'](_0x5912da['IxDKu']) : _0x5912da['bTRUM']
        },
        'timeout': 0x2710
    };
}

async function showMsg() {
    var _0x214c81 = {
        'TrPdV': function (_0x4eb852, _0xf7a6b7) {
            return _0x4eb852 >= _0xf7a6b7;
        }, 'LzDXZ': function (_0x549ac4, _0x5e4dfc) {
            return _0x549ac4 === _0x5e4dfc;
        }, 'xCpTu': 'QnwwC', 'nsvuh': function (_0x3507cb, _0x2b6cc5) {
            return _0x3507cb !== _0x2b6cc5;
        }
    };
    if (notifyBool) {
        $['msg']($['name'], subTitle, message, option);
        if ($['isNode']()) {
            if (_0x214c81['LzDXZ'](_0x214c81['xCpTu'], _0x214c81['xCpTu'])) {
                allMessage += subTitle + '\x0a' + message + (_0x214c81['nsvuh']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
            } else {
                notifyBool = notifyBool && _0x214c81['TrPdV'](notifyLevel, 0x1);
            }
        }
    } else {
        $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
    }
}

function getJxToken() {
    var _0x430524 = {
        'IGSrq': function (_0xf1da02, _0x20c343) {
            return _0xf1da02 - _0x20c343;
        },
        'LIEPN': function (_0x15011c) {
            return _0x15011c();
        },
        'dvjst': function (_0x12300a, _0x1da464) {
            return _0x12300a !== _0x1da464;
        },
        'jOQjt': 'DxMHx',
        'eWLfW': 'aRYiL',
        'sGWGj': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'kxqUb': function (_0x142406, _0x1a3ffe) {
            return _0x142406 < _0x1a3ffe;
        },
        'VbcfY': function (_0x51c130, _0x983fef) {
            return _0x51c130(_0x983fef);
        },
        'YkHbh': function (_0x105e20, _0x3c6f79) {
            return _0x105e20 * _0x3c6f79;
        },
        'SrOZe': function (_0x40069d, _0x426b07) {
            return _0x40069d(_0x426b07);
        },
        'EmgSo': function (_0x539f4f, _0x4b5769) {
            return _0x539f4f === _0x4b5769;
        },
        'EAqfd': 'WLPyF',
        'uKbCs': function (_0x4d5031, _0x5ed4c2) {
            return _0x4d5031(_0x5ed4c2);
        },
        'KdVPX': function (_0x526856) {
            return _0x526856();
        }
    };

    function _0x2ae11a(_0x1b1d43) {
        var _0x4ff4ae = {
            'SddjI': function (_0x442c54, _0x37cd21) {
                return _0x430524['IGSrq'](_0x442c54, _0x37cd21);
            }, 'iMuTK': function (_0x598cbc, _0x65a24a) {
                return _0x430524['IGSrq'](_0x598cbc, _0x65a24a);
            }, 'GbBgX': function (_0x5911ed) {
                return _0x430524['LIEPN'](_0x5911ed);
            }
        };
        if (_0x430524['dvjst'](_0x430524['jOQjt'], _0x430524['eWLfW'])) {
            let _0x27e84a = _0x430524['sGWGj'];
            let _0x171158 = '';
            for (let _0x57a310 = 0x0; _0x430524['kxqUb'](_0x57a310, _0x1b1d43); _0x57a310++) {
                _0x171158 += _0x27e84a[_0x430524['VbcfY'](parseInt, _0x430524['YkHbh'](Math['random'](), _0x27e84a['length']))];
            }
            return _0x171158;
        } else {
            if (jxncShareCodeArr[_0x4ff4ae['SddjI']($['index'], 0x1)]) {
                currentShareCode = jxncShareCodeArr[_0x4ff4ae['iMuTK']($['index'], 0x1)]['split']('@');
                currentShareCode['push'](...shareCode['split']('@'));
            } else {
                $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                currentShareCode = shareCode['split']('@');
            }
            $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
            _0x4ff4ae['GbBgX'](resolve);
        }
    }

    return new Promise(_0x4bc046 => {
        let _0x5d9d6b = _0x430524['SrOZe'](_0x2ae11a, 0x28);
        let _0x232405 = (+new Date())['toString']();
        if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
            if (_0x430524['EmgSo'](_0x430524['EAqfd'], _0x430524['EAqfd'])) {
                console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\n');
                _0x430524['uKbCs'](_0x4bc046, null);
            } else {
                $['nickName'] = $['UserName'];
            }
        }
        let _0x102bc4 = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
        let _0x1babcc = $['md5']('' + _0x430524['uKbCs'](decodeURIComponent, _0x102bc4) + _0x232405 + _0x5d9d6b + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
        currentToken = {'timestamp': _0x232405, 'phoneid': _0x5d9d6b, 'farm_jstoken': _0x1babcc};
        _0x430524['KdVPX'](_0x4bc046);
    });
}

function jsonParse(_0x81478f) {
    var _0x18a6f6 = {
        'QKGro': function (_0x592604, _0x5ab179) {
            return _0x592604 == _0x5ab179;
        }, 'koIdo': 'string', 'Hoelj': function (_0x2d93c8, _0xd97a4a) {
            return _0x2d93c8 !== _0xd97a4a;
        }, 'tjuPj': 'eIOjY', 'GNoyO': 'wdaFo', 'YUHnP': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'
    };
    if (_0x18a6f6['QKGro'](typeof _0x81478f, _0x18a6f6['koIdo'])) {
        try {
            return JSON['parse'](_0x81478f);
        } catch (_0x1bfd72) {
            if (_0x18a6f6['Hoelj'](_0x18a6f6['tjuPj'], _0x18a6f6['GNoyO'])) {
                console['log'](_0x1bfd72);
                $['msg']($['name'], '', _0x18a6f6['YUHnP']);
                return [];
            } else {
                $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
            }
        }
    }
};_0xodq = 'jsjiami.com.v6'

// prettier-ignore
!function (n) {
    "use strict";

    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }

    function r(n, t) {
        return n << t | n >>> 32 - t
    }

    function e(n, e, o, u, c, f) {
        return t(r(t(t(e, n), t(u, f)), c), o)
    }

    function o(n, t, r, o, u, c, f) {
        return e(t & r | ~t & o, n, t, u, c, f)
    }

    function u(n, t, r, o, u, c, f) {
        return e(t & o | r & ~o, n, t, u, c, f)
    }

    function c(n, t, r, o, u, c, f) {
        return e(t ^ r ^ o, n, t, u, c, f)
    }

    function f(n, t, r, o, u, c, f) {
        return e(r ^ (t | ~o), n, t, u, c, f)
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878;
        for (e = 0; e < n.length; e += 16) i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h);
        return [l, g, v, m]
    }

    function a(n) {
        var t, r = "", e = 32 * n.length;
        for (t = 0; t < e; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function d(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function h(n) {
        return a(i(d(n), 8 * n.length))
    }

    function l(n, t) {
        var r, e, o = d(n), u = [], c = [];
        for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
        return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
    }

    function g(n) {
        var t, r, e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
        return e
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function m(n) {
        return h(v(n))
    }

    function p(n) {
        return g(m(n))
    }

    function s(n, t) {
        return l(v(n), v(t))
    }

    function C(n, t) {
        return g(s(n, t))
    }

    function A(n, t, r) {
        return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n)
    }

    $.md5 = A
}(this);

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}