/*
特别声明：
本脚本搬运自 https://github.com/whyour/hundun/blob/master/quanx/jx_nc.js
感谢 @whyour 大佬

无需京喜token,只需京东cookie即可.

京喜农场:脚本更新地址 https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js
更新时间：2021-06-3
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
 *Progcessed By JSDec in 0.71s
 *JSDec - JSDec.js.org
 */
$['maxHelpNum'] = $['isNode']() ? 0x8 : 0x4;
$['helpNum'] = 0x0;
let assistUserShareCode = 0x0;
!(async () => {
    var _0x15313c = {
        'woQKM': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'RsWuc': function(_0x570a35, _0xedcdbc) {
            return _0x570a35 >= _0xedcdbc;
        },
        'WQnZt': function(_0xce4b2a, _0x1ac418) {
            return _0xce4b2a(_0x1ac418);
        },
        'ACXkG': function(_0x17eb74) {
            return _0x17eb74();
        },
        'NbKhY': 'OMxlD',
        'xKdFp': 'aqGhF',
        'KgtFf': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'dYbCY': 'https://bean.m.jd.com/bean/signIndex.action',
        'CYoox': function(_0x9ce5a2, _0x1f6242) {
            return _0x9ce5a2 < _0x1f6242;
        },
        'UAKqo': 'Iiksg',
        'rrWYS': function(_0x34bd38, _0x339691) {
            return _0x34bd38(_0x339691);
        },
        'HJCTo': function(_0x4b732c, _0xbf9d1a) {
            return _0x4b732c !== _0xbf9d1a;
        },
        'SbHKp': 'JxsFw',
        'eAvhb': 'pt_pin',
        'fEpKC': function(_0x541943, _0x31c3fc) {
            return _0x541943 > _0x31c3fc;
        }
    };
    await _0x15313c['ACXkG'](requireConfig);
    if (!cookieArr[0x0]) {
        if (_0x15313c['NbKhY'] !== _0x15313c['xKdFp']) {
            $['msg']($['name'], _0x15313c['KgtFf'], _0x15313c['dYbCY'], {
                'open-url': _0x15313c['dYbCY']
            });
            return;
        } else {
            $['log']('账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。');
            message += _0x15313c['woQKM'];
            notifyBool = notifyBool && _0x15313c['RsWuc'](notifyLevel, 0x3);
            _0x15313c['WQnZt'](resolve, ![]);
        }
    }
    for (let _0x5df65b = 0x0; _0x15313c['CYoox'](_0x5df65b, cookieArr['length']); _0x5df65b++) {
        if (_0x15313c['UAKqo'] === _0x15313c['UAKqo']) {
            if (cookieArr[_0x5df65b]) {
                currentCookie = cookieArr[_0x5df65b];
                $['UserName'] = _0x15313c['rrWYS'](decodeURIComponent, currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/) && currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
                $['index'] = _0x5df65b + 0x1;
                $['isLogin'] = !![];
                $['nickName'] = '';
                $['log']('\x0a************* 检查【京东账号' + $['index'] + '】' + $['UserName'] + ' cookie 是否有效 *************');
                await TotalBean();
                $['log']('开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '\x0a');
                if (!$['isLogin']) {
                    $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
                        'open-url': 'https://bean.m.jd.com/'
                    });
                    if ($['isNode']()) {
                        if (_0x15313c['HJCTo'](_0x15313c['SbHKp'], _0x15313c['SbHKp'])) {
                            $['log']('邀请码提交失败 API 返回异常');
                        } else {
                            await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\n请重新登录获取cookie');
                        }
                    }
                    continue;
                }
                if (currentCookie['includes'](_0x15313c['eAvhb'])) await _0x15313c['ACXkG'](getJxToken);
                subTitle = '';
                message = '';
                option = {};
                $['answer'] = 0x3;
                $['helpNum'] = 0x0;
                notifyBool = _0x15313c['fEpKC'](notifyLevel, 0x0);
                await shareCodesFormat();
                await jdJXNC();
            }
        } else {
            return '';
        }
    }
    if ($['isNode']() && allMessage) {
        await notify['sendNotify']('' + $['name'], '' + allMessage);
    }
})()['catch'](_0x17abbd => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x17abbd + '!', '');
    console['log'](_0x17abbd);
})['finally'](() => {
    $['done']();
});

function changeShareCodeJson(_0x57992a) {
    var _0x104c6c = {
        'UUTGr': function(_0x1ad843, _0x2d0f90) {
            return _0x1ad843 >= _0x2d0f90;
        },
        'YcVgb': 'ZXfHk',
        'umXDp': 'iZHEn',
        'VEihI': 'smp',
        'dsKVm': 'active'
    };
    try {
        if (_0x104c6c['YcVgb'] !== _0x104c6c['umXDp']) {
            let _0xa4b3a1 = _0x57992a && JSON['parse'](_0x57992a);
            return _0xa4b3a1[_0x104c6c['VEihI']] && _0xa4b3a1[_0x104c6c['dsKVm']] && _0xa4b3a1['joinnum'] ? _0xa4b3a1 : '';
        } else {
            notifyBool = notifyBool && _0x104c6c['UUTGr'](notifyLevel, 0x2);
        }
    } catch (_0x432e49) {
        return '';
    }
}

function requireConfig() {
    var _0x4dec20 = {
        'fRvOv': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'ufBFe': function(_0x4291c8, _0x2d4f6d) {
            return _0x4291c8(_0x2d4f6d);
        },
        'DVOUx': function(_0x1d705a, _0x449a1f) {
            return _0x1d705a !== _0x449a1f;
        },
        'LwwBp': 'XtIQa',
        'vNuWi': 'AYcFx',
        'euTTI': 'smp',
        'VNEsx': 'active',
        'nsCng': 'joinnum',
        'AofBS': 'pYwmN',
        'cEYMa': '开始获取配置文件\n',
        'ieJTY': function(_0x1b8c45, _0x128355) {
            return _0x1b8c45(_0x128355);
        },
        'pRCvW': function(_0x84b762, _0x1f8eb3) {
            return _0x84b762(_0x1f8eb3);
        },
        'nLTbt': './jdCookie.js',
        'HxsxI': './jdJxncShareCodes.js',
        'dPJJm': 'CookieJD',
        'iMVLp': 'CookieJD2',
        'hYwpR': 'CookiesJD',
        'Opmdb': function(_0x4c652d, _0xb4557) {
            return _0x4c652d !== _0xb4557;
        },
        'TDwmo': 'gspzg',
        'OYFWa': 'qTvVd',
        'zbcaH': function(_0x372b61, _0x34b227) {
            return _0x372b61 < _0x34b227;
        },
        'KQEKB': 'IRgHL',
        'OtsIG': function(_0x3c5c32, _0x411c54) {
            return _0x3c5c32(_0x411c54);
        },
        'felqj': '互助码格式已变更，请重新填写互助码',
        'LBJzh': '互助码格式变更通知',
        'ddnks': '互助码格式变更，请重新填写 ‼️‼️',
        'SLPii': function(_0x1691ef, _0x6783c8) {
            return _0x1691ef === _0x6783c8;
        },
        'gILSH': 'nABVe',
        'Lbvxi': 'application/json,text/plain, */*',
        'CyETU': 'application/x-www-form-urlencoded',
        'tKAsU': 'gzip, deflate, br',
        'JVbKU': 'keep-alive',
        'WmWGo': function(_0x4624cb) {
            return _0x4624cb();
        }
    };
    return new Promise(async _0x218e1e => {
        var _0xbcb90b = {
            'YjIrp': function(_0x4b1444, _0x36f168) {
                return _0x4dec20['DVOUx'](_0x4b1444, _0x36f168);
            },
            'WFqyu': 'JIqhO',
            'UAwtW': _0x4dec20['LwwBp'],
            'fEEWM': _0x4dec20['vNuWi'],
            'GEtmf': _0x4dec20['euTTI'],
            'Udoyy': _0x4dec20['VNEsx'],
            'AYYwf': _0x4dec20['nsCng'],
            'peBeo': _0x4dec20['AofBS']
        };
        $['log'](_0x4dec20['cEYMa']);
        notify = $['isNode']() ? _0x4dec20['ieJTY'](require, './sendNotify') : '';
        const _0x263b99 = $['isNode']() ? _0x4dec20['pRCvW'](require, _0x4dec20['nLTbt']) : '';
        const _0x427ea0 = $['isNode']() ? _0x4dec20['pRCvW'](require, _0x4dec20['HxsxI']) : {};
        if ($['isNode']()) {
            Object['keys'](_0x263b99)['forEach'](_0x28de62 => {
                if (_0xbcb90b['YjIrp'](_0xbcb90b['WFqyu'], _0xbcb90b['UAwtW'])) {
                    if (_0x263b99[_0x28de62]) {
                        cookieArr['push'](_0x263b99[_0x28de62]);
                    }
                } else {
                    _0x218e1e();
                }
            });
            if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === 'false') console['log'] = () => {};
        } else {
            cookieArr = [$['getdata'](_0x4dec20['dPJJm']), $['getdata'](_0x4dec20['iMVLp']), ..._0x4dec20['pRCvW'](jsonParse, $['getdata'](_0x4dec20['hYwpR']) || '[]')['map'](_0x35da65 => _0x35da65['cookie'])]['filter'](_0xea9b0d => !!_0xea9b0d);
        }
        $['log']('共' + cookieArr['length'] + '个京东账号\n');
        if ($['isNode']()) {
            if (_0x4dec20['Opmdb'](_0x4dec20['TDwmo'], _0x4dec20['OYFWa'])) {
                Object['keys'](_0x427ea0)['forEach'](_0x1d9e70 => {
                    var _0x3ef936 = {
                        'NfKor': '请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie'
                    };
                    if (_0x427ea0[_0x1d9e70]) {
                        jxncShareCodeArr['push'](_0x427ea0[_0x1d9e70]);
                    } else {
                        if (_0xbcb90b['fEEWM'] === 'AYcFx') {
                            jxncShareCodeArr['push']('');
                        } else {
                            try {
                                return JSON['parse'](str);
                            } catch (_0x3627dd) {
                                console['log'](_0x3627dd);
                                $['msg']($['name'], '', _0x3ef936['NfKor']);
                                return [];
                            }
                        }
                    }
                });
            } else {
                try {
                    let _0x4b81bb = code && JSON['parse'](code);
                    return _0x4b81bb[_0xbcb90b['GEtmf']] && _0x4b81bb[_0xbcb90b['Udoyy']] && _0x4b81bb[_0xbcb90b['AYYwf']] ? _0x4b81bb : '';
                } catch (_0x40430d) {
                    return '';
                }
            }
        }
        for (let _0xcfa3e4 = 0x0; _0x4dec20['zbcaH'](_0xcfa3e4, jxncShareCodeArr['length']); _0xcfa3e4++) {
            if (_0x4dec20['KQEKB'] !== 'pnjuE') {
                if (jxncShareCodeArr[_0xcfa3e4]) {
                    let _0x3f5ffd = jxncShareCodeArr[_0xcfa3e4];
                    let _0x1a28b3 = _0x3f5ffd['split']('@');
                    if (!_0x4dec20['OtsIG'](changeShareCodeJson, _0x1a28b3[0x0])) {
                        $['log'](_0x4dec20['felqj']);
                        $['msg']($['name'], _0x4dec20['LBJzh'], _0x4dec20['ddnks'], option);
                        if ($['isNode']()) {
                            if (_0x4dec20['SLPii'](_0x4dec20['gILSH'], _0x4dec20['gILSH'])) {
                                await notify['sendNotify']('' + $['name'], '互助码格式变更，请重新填写 ‼️‼️');
                            } else {
                                _0x218e1e(![]);
                            }
                        }
                    }
                    break;
                }
            } else {
                let _0xb49b63 = _0x4dec20['fRvOv'];
                let _0x44ba40 = '';
                for (let _0x3d07f3 = 0x0; _0x3d07f3 < count; _0x3d07f3++) {
                    _0x44ba40 += _0xb49b63[_0x4dec20['ufBFe'](parseInt, Math['random']() * _0xb49b63['length'])];
                }
                return _0x44ba40;
            }
        }
        $['log']('您提供了' + jxncShareCodeArr['length'] + '个账号的京喜农场助力码');
        try {
            let _0xafbaad = {
                'url': 'http://120.76.219.92:18880/share_code/jxnc_code.txt',
                'headers': {
                    'Accept': _0x4dec20['Lbvxi'],
                    'Content-Type': _0x4dec20['CyETU'],
                    'Accept-Encoding': _0x4dec20['tKAsU'],
                    'Accept-Language': 'zh-cn',
                    'Connection': _0x4dec20['JVbKU'],
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
                },
                'timeout': 0x2710
            };
            $['get'](_0xafbaad, (_0x300a82, _0x55f1d8, _0x276be0) => {
                if ('hJDoK' === _0xbcb90b['peBeo']) {
                    if (!_0x300a82) {
                        shareCode = _0x276be0;
                    }
                } else {
                    if (!_0x300a82) {
                        shareCode = _0x276be0;
                    }
                }
            });
        } catch (_0x357212) {}
        _0x4dec20['WmWGo'](_0x218e1e);
    });
}

function TotalBean() {
    var _0x353f94 = {
        'WxAtZ': function(_0x2d532f, _0x546744) {
            return _0x2d532f(_0x546744);
        },
        'dpRpP': 'Fyayp',
        'aPhLL': function(_0x53e4e4, _0xeeeea) {
            return _0x53e4e4 === _0xeeeea;
        },
        'KzsTG': 'xSYKg',
        'qdlSA': 'sECDb',
        'fgAcW': 'YHqwl',
        'VatyW': 'application/json,text/plain, */*',
        'TjBgb': 'application/x-www-form-urlencoded',
        'lECfT': 'gzip, deflate, br',
        'vczZm': 'keep-alive',
        'mMGRH': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'SIzTj': function(_0x277bef, _0x3df20d) {
            return _0x277bef(_0x3df20d);
        },
        'gsynd': './USER_AGENTS',
        'sonVn': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return new Promise(async _0x5cedcf => {
        var _0x513658 = {
            'nspVY': function(_0x270d14, _0x4ddc66) {
                return _0x270d14 !== _0x4ddc66;
            },
            'kndDT': function(_0x33fb2a) {
                return _0x33fb2a();
            },
            'efuSL': function(_0xfd8a70, _0x300e8f) {
                return _0x353f94['WxAtZ'](_0xfd8a70, _0x300e8f);
            },
            'prZND': function(_0x3ca773, _0x599ac0) {
                return _0x3ca773 !== _0x599ac0;
            },
            'DADzc': _0x353f94['dpRpP'],
            'HcrrL': function(_0x895c00, _0x3b6917) {
                return _0x353f94['aPhLL'](_0x895c00, _0x3b6917);
            },
            'NQnpW': _0x353f94['KzsTG'],
            'lsdmK': 'base',
            'ALuru': function(_0x25d829, _0x28f66a) {
                return _0x353f94['aPhLL'](_0x25d829, _0x28f66a);
            }
        };
        if (_0x353f94['qdlSA'] !== _0x353f94['fgAcW']) {
            const _0x2fc2c6 = {
                'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
                'headers': {
                    'Accept': _0x353f94['VatyW'],
                    'Content-Type': _0x353f94['TjBgb'],
                    'Accept-Encoding': _0x353f94['lECfT'],
                    'Accept-Language': 'zh-cn',
                    'Connection': _0x353f94['vczZm'],
                    'Cookie': currentCookie,
                    'Referer': _0x353f94['mMGRH'],
                    'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x353f94['SIzTj'](require, _0x353f94['gsynd'])['USER_AGENT'] : $['getdata']('JDUA') ? $['getdata']('JDUA') : _0x353f94['sonVn']
                }
            };
            $['post'](_0x2fc2c6, (_0x3955be, _0x418b13, _0x12d8b5) => {
                var _0x45aec0 = {
                    'swczq': function(_0x5b7631, _0x2feafd) {
                        return _0x513658['efuSL'](_0x5b7631, _0x2feafd);
                    }
                };
                try {
                    if (_0x513658['prZND'](_0x513658['DADzc'], 'IoptG')) {
                        if (_0x3955be) {
                            console['log']('' + JSON['stringify'](_0x3955be));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            if (_0x12d8b5) {
                                _0x12d8b5 = JSON['parse'](_0x12d8b5);
                                if (_0x12d8b5['retcode'] === 0xd) {
                                    $['isLogin'] = ![];
                                    return;
                                }
                                if (_0x12d8b5['retcode'] === 0x0) {
                                    if (_0x513658['HcrrL'](_0x513658['NQnpW'], _0x513658['NQnpW'])) {
                                        $['nickName'] = _0x12d8b5[_0x513658['lsdmK']] && _0x12d8b5['base']['nickname'] || $['UserName'];
                                    } else {
                                        if (notifyBool) {
                                            $['msg']($['name'], subTitle, message, option);
                                            if ($['isNode']()) {
                                                allMessage += subTitle + '\x0a' + message + (_0x513658['nspVY']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                                            }
                                        } else {
                                            $['log']($['name'] + ' - notify 通知已关闭\x0a账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                                        }
                                    }
                                } else {
                                    if (_0x513658['ALuru']('JTmEq', 'YKELI')) {
                                        if (ret === 0x93) {
                                            $['log']('\x0a\x0a  !!!!!!!!   当前账号黑号了  !!!!!!!!  \x0a\x0a');
                                        }
                                        _0x45aec0['swczq'](_0x5cedcf, ![]);
                                        return;
                                    } else {
                                        $['nickName'] = $['UserName'];
                                    }
                                }
                            } else {
                                console['log']('京东服务器返回空数据');
                            }
                        }
                    } else {
                        _0x513658['kndDT'](_0x5cedcf);
                    }
                } catch (_0x596e42) {
                    $['logErr'](_0x596e42, _0x418b13);
                } finally {
                    _0x513658['kndDT'](_0x5cedcf);
                }
            });
        } else {
            Object['keys'](jdJxncShareCodeNode)['forEach'](_0x5845c1 => {
                if (jdJxncShareCodeNode[_0x5845c1]) {
                    jxncShareCodeArr['push'](jdJxncShareCodeNode[_0x5845c1]);
                } else {
                    jxncShareCodeArr['push']('');
                }
            });
        }
    });
}

function tokenFormat() {
    var _0x4fc63c = {
        'unNYD': function(_0x500481, _0x296029) {
            return _0x500481 === _0x296029;
        },
        'kuvOz': function(_0x17a6bf, _0x1b3d0a) {
            return _0x17a6bf === _0x1b3d0a;
        },
        'ZSIGT': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'WVnBi': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'fqNBa': function(_0x549c75, _0x374155) {
            return _0x549c75 !== _0x374155;
        },
        'pnWPn': function(_0x40ef57) {
            return _0x40ef57();
        }
    };
    return new Promise(async _0x2fca87 => {
        var _0x580eb1 = {
            'dnaaV': function(_0x32e394, _0x2f05c8) {
                return _0x4fc63c['unNYD'](_0x32e394, _0x2f05c8);
            },
            'mkqWP': function(_0x16b87e, _0x4bb332) {
                return _0x4fc63c['kuvOz'](_0x16b87e, _0x4bb332);
            },
            'KlvJa': _0x4fc63c['ZSIGT'],
            'ARedc': _0x4fc63c['WVnBi']
        };
        if (tokenArr[$['index'] - 0x1] && tokenArr[$['index'] - 0x1]['farm_jstoken']) {
            if (_0x4fc63c['fqNBa']('UnPBK', 'ffVsL')) {
                currentToken = tokenArr[$['index'] - 0x1];
            } else {
                if (_0x580eb1['dnaaV'](startInfo['activestatus'], 0x2)) {
                    notifyBool = !![];
                    $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                    message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                } else if (_0x580eb1['mkqWP'](startInfo['activestatus'], 0x0)) {
                    $['log'](_0x580eb1['KlvJa']);
                    message += _0x580eb1['ARedc'];
                    notifyBool = notifyBool && notifyLevel >= 0x3;
                }
            }
        } else {
            currentToken = tokenNull;
        }
        _0x4fc63c['pnWPn'](_0x2fca87);
    });
}

function shareCodesFormat() {
    var _0x338565 = {
        'KkvXi': function(_0x531837, _0x31f087) {
            return _0x531837 !== _0x31f087;
        },
        'DonXm': function(_0x210de6, _0x45bbdd) {
            return _0x210de6 === _0x45bbdd;
        },
        'PdfXu': 'xvLcT',
        'fjuio': function(_0x48cf0f, _0x1f2e74) {
            return _0x48cf0f === _0x1f2e74;
        },
        'sKKOb': 'AGigO',
        'lHnrP': 'SPvDh'
    };
    return new Promise(async _0x2a0cf8 => {
        var _0x1a1e2c = {
            'tiHwL': function(_0x1e90f4, _0x578111) {
                return _0x338565['KkvXi'](_0x1e90f4, _0x578111);
            }
        };
        if (_0x338565['DonXm']('xvLcT', _0x338565['PdfXu'])) {
            if (jxncShareCodeArr[$['index'] - 0x1]) {
                if (_0x338565['fjuio'](_0x338565['sKKOb'], _0x338565['lHnrP'])) {
                    allMessage += subTitle + '\x0a' + message + (_0x1a1e2c['tiHwL']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                } else {
                    currentShareCode = jxncShareCodeArr[$['index'] - 0x1]['split']('@');
                    currentShareCode['push'](...shareCode['split']('@'));
                }
            } else {
                $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                currentShareCode = shareCode['split']('@');
            }
            $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
            _0x2a0cf8();
        } else {
            if (jdCookieNode[item]) {
                cookieArr['push'](jdCookieNode[item]);
            }
        }
    });
}
async function jdJXNC() {
    var _0x129052 = {
        'IIEoO': function(_0x3699af, _0x541e5e) {
            return _0x3699af >= _0x541e5e;
        },
        'CJQOf': function(_0x331a33) {
            return _0x331a33();
        },
        'cbQUP': function(_0x598c18, _0xf592a4) {
            return _0x598c18 <= _0xf592a4;
        },
        'GOAdi': function(_0x1e60d7, _0x4b98ee) {
            return _0x1e60d7 !== _0x4b98ee;
        },
        'cDXZA': 'lTrXW',
        'Zmnxx': function(_0x355832, _0x51e887) {
            return _0x355832 === _0x51e887;
        },
        'Ofogh': 'sXLMi',
        'GwbIu': 'Bzcrk',
        'dGoyi': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'hkPrE': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'mYlsc': function(_0x1cbd66, _0x168ca9) {
            return _0x1cbd66 >= _0x168ca9;
        },
        'ZXMFb': 'ENLYq',
        'nkNZx': function(_0x173ca1, _0x36ba3a) {
            return _0x173ca1 + _0x36ba3a;
        },
        'wVbHO': function(_0x10f2bb, _0x25859c, _0x27633b) {
            return _0x10f2bb(_0x25859c, _0x27633b);
        },
        'OjMGP': function(_0x495fb5, _0x434faf) {
            return _0x495fb5(_0x434faf);
        },
        'ClylJ': function(_0x501889) {
            return _0x501889();
        },
        'gZkhW': 'cEKmZ',
        'quXrR': function(_0x5c04c6, _0x2d7c1d) {
            return _0x5c04c6 < _0x2d7c1d;
        },
        'hQZVf': 'smp',
        'pYwgP': 'active'
    };
    subTitle = '【京东账号' + $['index'] + '】' + $['nickName'];
    $['log']('获取用户信息 & 任务列表');
    const _0x88e250 = await _0x129052['CJQOf'](getTaskList);
    if (_0x88e250) {
        message += '【水果名称】' + _0x88e250['prizename'] + '\x0a';
        if (_0x129052['cbQUP'](_0x88e250['target'], _0x88e250['score'])) {
            if (_0x129052['GOAdi']('lTrXW', _0x129052['cDXZA'])) {
                $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + e + '!', '');
                console['log'](e);
            } else {
                if (_0x88e250['activestatus'] === 0x2) {
                    notifyBool = !![];
                    $['log']('【成熟】水果已成熟请及时收取，activestatus：' + _0x88e250['activestatus'] + '\x0a');
                    message += '【成熟】水果已成熟请及时收取，activestatus：' + _0x88e250['activestatus'] + '\x0a';
                } else if (_0x129052['Zmnxx'](_0x88e250['activestatus'], 0x0)) {
                    if (_0x129052['GOAdi'](_0x129052['Ofogh'], _0x129052['GwbIu'])) {
                        $['log'](_0x129052['dGoyi']);
                        message += _0x129052['hkPrE'];
                        notifyBool = notifyBool && _0x129052['mYlsc'](notifyLevel, 0x3);
                    } else {
                        $['logErr'](e, resp);
                    }
                }
            }
        } else {
            if (_0x129052['ZXMFb'] === _0x129052['ZXMFb']) {
                let _0x534112 = {
                    'smp': $['info']['smp'],
                    'active': $['info']['active'],
                    'joinnum': $['info']['joinnum']
                };
                $['log'](_0x129052['nkNZx']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】', JSON['stringify'](_0x534112)));
                await $['wait'](0x1f4);
                const _0x1406ed = await browserTask();
                if (_0x1406ed) {
                    await $['wait'](0x1f4);
                    await answerTask();
                    await $['wait'](0x1f4);
                    const _0x1e4c19 = await _0x129052['CJQOf'](getTaskList);
                    _0x129052['wVbHO'](getMessage, _0x1e4c19, _0x88e250);
                    await _0x129052['OjMGP'](submitInviteId, $['UserName']);
                    await $['wait'](0x1f4);
                    let _0x27bce9 = await _0x129052['ClylJ'](helpFriends);
                    if (_0x27bce9) {
                        if (_0x129052['GOAdi'](_0x129052['gZkhW'], _0x129052['gZkhW'])) {
                            $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                        } else {
                            while (_0x129052['quXrR']($['helpNum'], $['maxHelpNum'])) {
                                $['helpNum']++;
                                assistUserShareCodeJson = await _0x129052['ClylJ'](getAssistUser);
                                if (assistUserShareCodeJson) {
                                    await $['wait'](0x1f4);
                                    _0x27bce9 = await helpShareCode(assistUserShareCodeJson[_0x129052['hQZVf']], assistUserShareCodeJson[_0x129052['pYwgP']], assistUserShareCodeJson['joinnum']);
                                    if (_0x27bce9) {
                                        await $['wait'](0x3e8);
                                        continue;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            } else {
                notifyBool = notifyBool && _0x129052['IIEoO'](notifyLevel, 0x1);
            }
        }
    }
    await showMsg();
}

function getTaskList() {
    var _0x15ed70 = {
        'dCcnV': 'KYtGj',
        'DiZeu': 'bSdMJ',
        'AnkBb': function(_0x31d14a, _0x56e105) {
            return _0x31d14a !== _0x56e105;
        },
        'KAOHi': 'lJned',
        'aJapP': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'NQtEF': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'tfNgJ': function(_0x5b6b73, _0x85260c) {
            return _0x5b6b73 >= _0x85260c;
        },
        'BCUMS': function(_0x388970, _0x1f778b) {
            return _0x388970(_0x1f778b);
        },
        'bMhTN': function(_0x349742, _0x31c1d7, _0x4d965c) {
            return _0x349742(_0x31c1d7, _0x4d965c);
        }
    };
    return new Promise(async _0x190498 => {
        $['get'](_0x15ed70['bMhTN'](taskUrl, 'query', 'type=1'), async (_0x564e2b, _0x47473d, _0x3fd631) => {
            try {
                let _0xedb598 = _0x3fd631['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                if (_0xedb598) {
                    if (_0x15ed70['dCcnV'] !== _0x15ed70['DiZeu']) {
                        _0xedb598 = _0xedb598[0x1];
                        const {
                            detail,
                            msg,
                            task = [],
                            retmsg,
                            ..._0x148c6c
                        } = JSON['parse'](_0xedb598);
                        $['detail'] = detail;
                        $['helpTask'] = task['filter'](_0x5022d8 => _0x5022d8['tasktype'] === 0x2)[0x0] || {
                            'eachtimeget': 0x0,
                            'limit': 0x0
                        };
                        $['allTask'] = task['filter'](_0x522857 => _0x522857['tasktype'] !== 0x3 && _0x522857['tasktype'] !== 0x2 && parseInt(_0x522857['left']) > 0x0);
                        $['info'] = _0x148c6c;
                        $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                        if (!$['info']['active']) {
                            if (_0x15ed70['AnkBb']('XDMxz', _0x15ed70['KAOHi'])) {
                                $['log'](_0x15ed70['aJapP']);
                                message += _0x15ed70['NQtEF'];
                                notifyBool = notifyBool && _0x15ed70['tfNgJ'](notifyLevel, 0x3);
                                _0x190498(![]);
                            } else {
                                $['nickName'] = $['UserName'];
                            }
                        }
                    } else {
                        $['logErr'](e, _0x47473d);
                    }
                }
                _0x190498(other);
            } catch (_0x3d2caa) {
                $['logErr'](_0x3d2caa, _0x47473d);
            } finally {
                _0x15ed70['BCUMS'](_0x190498, !![]);
            }
        });
    });
}

function browserTask() {
    var _0x4622f9 = {
        'kYJpH': function(_0x2b2b41, _0x465f51) {
            return _0x2b2b41 - _0x465f51;
        },
        'TkZge': function(_0x2bfab7) {
            return _0x2bfab7();
        },
        'yiAhh': function(_0x2cdd5, _0xf861f0) {
            return _0x2cdd5(_0xf861f0);
        },
        'RkdDp': function(_0x9895bf, _0x3f69db) {
            return _0x9895bf !== _0x3f69db;
        },
        'XyIpY': 'jJXxJ',
        'ZIWsn': function(_0x5d85ec, _0x1d8932) {
            return _0x5d85ec < _0x1d8932;
        },
        'YchlK': function(_0x2487d7, _0x42aed5) {
            return _0x2487d7 * _0x42aed5;
        },
        'CQYzE': function(_0x252866, _0x1d31cf) {
            return _0x252866(_0x1d31cf);
        },
        'RFaOk': function(_0x57c2d5, _0x397e4a) {
            return _0x57c2d5 === _0x397e4a;
        },
        'qSYLH': 'hblNT',
        'MgOoV': '水滴已满，果实成熟，跳过所有任务',
        'vfeZW': function(_0x41f070, _0x549c66) {
            return _0x41f070 !== _0x549c66;
        },
        'zPLQM': 'qRBGa',
        'hqkfz': function(_0x55ce6d, _0x32572) {
            return _0x55ce6d >= _0x32572;
        },
        'ZrSRv': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n',
        'NdYsG': function(_0x59d0b2, _0x4da560) {
            return _0x59d0b2 + _0x4da560;
        },
        'HtJzc': function(_0x5aa4d5, _0x5601d8) {
            return _0x5aa4d5(_0x5601d8);
        }
    };
    return new Promise(async _0x4ee94e => {
        var _0x21875c = {
            'VWmUn': '4|1|0|2|3',
            'AVlKL': function(_0x28ebf4, _0x582b1c) {
                return _0x4622f9['yiAhh'](_0x28ebf4, _0x582b1c);
            }
        };
        if (_0x4622f9['RkdDp'](_0x4622f9['XyIpY'], _0x4622f9['XyIpY'])) {
            var _0x42f7da = {
                'CfIqB': function(_0x2fce6e, _0x5b75a2) {
                    return _0x2fce6e - _0x5b75a2;
                },
                'qoXUY': function(_0x580c06, _0x38c5dc) {
                    return _0x4622f9['kYJpH'](_0x580c06, _0x38c5dc);
                },
                'qZiUH': function(_0x13ec3c, _0xbdeca9) {
                    return _0x4622f9['kYJpH'](_0x13ec3c, _0xbdeca9);
                },
                'tSkbz': function(_0x494761) {
                    return _0x4622f9['TkZge'](_0x494761);
                }
            };
            return new Promise(async _0x3dd15e => {
                if (tokenArr[_0x42f7da['CfIqB']($['index'], 0x1)] && tokenArr[_0x42f7da['qoXUY']($['index'], 0x1)]['farm_jstoken']) {
                    currentToken = tokenArr[_0x42f7da['qZiUH']($['index'], 0x1)];
                } else {
                    currentToken = tokenNull;
                }
                _0x42f7da['tSkbz'](_0x3dd15e);
            });
        } else {
            const _0x180ea4 = $['allTask']['filter'](_0x16b15c => _0x16b15c['tasklevel'] !== 0x6);
            const _0x2065ce = Math['max'](...[..._0x180ea4]['map'](_0x4a3bcf => _0x4a3bcf['limit']));
            for (let _0x296fdd = 0x0; _0x4622f9['ZIWsn'](_0x296fdd, _0x180ea4['length']); _0x296fdd++) {
                const _0x30b940 = _0x180ea4[_0x296fdd];
                $['log']('开始第' + (_0x296fdd + 0x1) + '个任务：' + _0x30b940['taskname']);
                const _0x54092c = [0x0];
                for (let _0x296fdd = 0x0; _0x296fdd < _0x2065ce; _0x296fdd++) {
                    const _0x557fbc = _0x4622f9['YchlK'](Math['random'](), 0x3);
                    await $['wait'](_0x4622f9['YchlK'](_0x557fbc, 0x3e8));
                    if (_0x54092c[0x0] === 0x0) {
                        _0x54092c[0x0] = await _0x4622f9['CQYzE'](doTask, _0x30b940);
                    }
                    if (_0x54092c[0x0] !== 0x0) {
                        break;
                    }
                }
                if (_0x4622f9['RFaOk'](_0x54092c[0x0], 0x3f9)) {
                    if (_0x4622f9['qSYLH'] === 'hblNT') {
                        $['log'](_0x4622f9['MgOoV']);
                        _0x4ee94e(!![]);
                        break;
                    } else {
                        var _0x2528d6 = _0x21875c['VWmUn']['split']('|'),
                            _0x51c790 = 0x0;
                        while (!![]) {
                            switch (_0x2528d6[_0x51c790++]) {
                                case '0':
                                    notifyBool = notifyBool && notifyLevel >= 0x2;
                                    continue;
                                case '1':
                                    message += '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n';
                                    continue;
                                case '2':
                                    _0x21875c['AVlKL'](_0x4ee94e, ![]);
                                    continue;
                                case '3':
                                    return;
                                case '4':
                                    $['log']('任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子');
                                    continue;
                            }
                            break;
                        }
                    }
                }
                if (_0x54092c[0x0] === 0x408) {
                    if (_0x4622f9['vfeZW']('qRBGa', _0x4622f9['zPLQM'])) {
                        $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                    } else {
                        var _0x45c253 = '2|4|1|3|0' ['split']('|'),
                            _0x37ffe2 = 0x0;
                        while (!![]) {
                            switch (_0x45c253[_0x37ffe2++]) {
                                case '0':
                                    return;
                                case '1':
                                    notifyBool = notifyBool && _0x4622f9['hqkfz'](notifyLevel, 0x2);
                                    continue;
                                case '2':
                                    $['log']('任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子');
                                    continue;
                                case '3':
                                    _0x4622f9['CQYzE'](_0x4ee94e, ![]);
                                    continue;
                                case '4':
                                    message += _0x4622f9['ZrSRv'];
                                    continue;
                            }
                            break;
                        }
                    }
                }
                $['log']('结束第' + _0x4622f9['NdYsG'](_0x296fdd, 0x1) + '个任务：' + _0x30b940['taskname']);
            }
            _0x4622f9['HtJzc'](_0x4ee94e, !![]);
        }
    });
}

function answerTask() {
    var _0x5af911 = {
        'ROJMv': function(_0x5a7c69, _0x23a11a) {
            return _0x5a7c69(_0x23a11a);
        },
        'TdWPc': function(_0x4c1de4, _0x438624) {
            return _0x4c1de4 !== _0x438624;
        },
        'lsSAF': function(_0x3e0c65, _0x73cf24) {
            return _0x3e0c65 !== _0x73cf24;
        },
        'ZRICR': '任务进行中或者未到任务时间',
        'Wclac': function(_0x556216, _0x1e0575) {
            return _0x556216 === _0x1e0575;
        },
        'vfXIe': function(_0x930395, _0x54495a) {
            return _0x930395 === _0x54495a;
        },
        'BXxyP': function(_0x239225) {
            return _0x239225();
        },
        'JdvmZ': function(_0xcd3ab5, _0x33bde3) {
            return _0xcd3ab5 !== _0x33bde3;
        },
        'FyXXm': 'ans err',
        'STXDt': function(_0x1ea508, _0x3dec28) {
            return _0x1ea508 > _0x3dec28;
        },
        'weCzv': function(_0x4bbb79, _0x34e0f2) {
            return _0x4bbb79 !== _0x34e0f2;
        },
        'geSiG': 'JAogj',
        'OQzFE': 'khizg',
        'Scbam': 'MMeUl',
        'jCPWN': 'MCMEc',
        'ZIheU': function(_0x4d7534) {
            return _0x4d7534();
        },
        'XQpqs': '【邀请码】提交成功！\n',
        'kRnBU': 'IROZo',
        'PjQDW': function(_0x400852, _0x33aff9) {
            return _0x400852 <= _0x33aff9;
        },
        'kWomi': function(_0x4ec11a, _0x4035d6) {
            return _0x4ec11a === _0x4035d6;
        },
        'zifuq': 'TnqlX',
        'bwuqe': 'ybLkh',
        'FHRam': function(_0x50c01d, _0x5207f0, _0x22cd33) {
            return _0x50c01d(_0x5207f0, _0x22cd33);
        },
        'UNPef': 'dotask',
        'AKAsa': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    const _0x5b8960 = $['allTask']['filter'](_0x3bc317 => _0x3bc317['tasklevel'] === 0x6);
    if (!_0x5b8960 || !_0x5b8960[0x0]) return;
    const {
        tasklevel,
        left,
        taskname,
        eachtimeget
    } = _0x5b8960[0x0];
    $['log']('准备做答题任务：' + taskname);
    return new Promise(async _0x2c917d => {
        var _0x187df0 = {
            'SuLqY': _0x5af911['XQpqs']
        };
        if (_0x5af911['weCzv']('fdaCW', _0x5af911['kRnBU'])) {
            if (_0x5af911['PjQDW'](_0x5af911['ROJMv'](parseInt, left), 0x0)) {
                if (_0x5af911['kWomi'](_0x5af911['zifuq'], _0x5af911['bwuqe'])) {
                    $['logErr'](e, resp);
                } else {
                    _0x5af911['ROJMv'](_0x2c917d, ![]);
                    $['log'](taskname + '[做任务]： 任务已完成，跳过');
                    return;
                }
            }
            $['get'](_0x5af911['FHRam'](taskUrl, _0x5af911['UNPef'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':' + ['A', 'B', 'C', 'D'][$['answer']] + ':0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0x5af911['ROJMv'](encodeURIComponent, _0x5af911['AKAsa'])), async (_0x42c54b, _0x4671cf, _0x3f73c1) => {
                var _0x51b30d = {
                    'trkBf': function(_0x20e91a, _0x11622e) {
                        return _0x5af911['ROJMv'](_0x20e91a, _0x11622e);
                    }
                };
                try {
                    let _0xbfe1d3 = _0x3f73c1['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                    if (_0xbfe1d3) {
                        _0xbfe1d3 = _0xbfe1d3[0x1];
                        let {
                            ret,
                            retmsg,
                            right
                        } = JSON['parse'](_0xbfe1d3);
                        retmsg = _0x5af911['TdWPc'](retmsg, '') ? retmsg : '成功';
                        $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x5af911['lsSAF'](retmsg['indexOf']('活动太火爆了'), -0x1) ? _0x5af911['ZRICR'] : retmsg) + '\"');
                        if (ret === 0x0 && _0x5af911['Wclac'](right, 0x1)) {
                            $['drip'] += eachtimeget;
                        }
                        if (_0x5af911['vfXIe'](ret, 0x3f9) || ret === 0x3f4) {
                            _0x5af911['BXxyP'](_0x2c917d);
                            return;
                        }
                        if ((ret !== 0x0 && _0x5af911['JdvmZ'](ret, 0x405) || _0x5af911['vfXIe'](retmsg, _0x5af911['FyXXm'])) && _0x5af911['STXDt']($['answer'], 0x0)) {
                            if (_0x5af911['weCzv']('jEPSM', _0x5af911['geSiG'])) {
                                $['answer']--;
                                await $['wait'](0x3e8);
                                await answerTask();
                            } else {
                                message += _0x187df0['SuLqY'];
                            }
                        }
                    }
                } catch (_0x158130) {
                    if (_0x5af911['vfXIe'](_0x5af911['OQzFE'], _0x5af911['OQzFE'])) {
                        $['logErr'](_0x158130, _0x4671cf);
                    } else {
                        _0x51b30d['trkBf'](_0x2c917d, ![]);
                        $['log'](taskname + '[做任务]： 任务已完成，跳过');
                        return;
                    }
                } finally {
                    if (_0x5af911['vfXIe'](_0x5af911['Scbam'], _0x5af911['jCPWN'])) {
                        return ![];
                    } else {
                        _0x5af911['ZIheU'](_0x2c917d);
                    }
                }
            });
        } else {
            if (tokenArr[$['index'] - 0x1] && tokenArr[$['index'] - 0x1]['farm_jstoken']) {
                currentToken = tokenArr[$['index'] - 0x1];
            } else {
                currentToken = tokenNull;
            }
            _0x2c917d();
        }
    });
}

function getMessage(_0x26d795, _0x2e1d16) {
    var _0x1c118a = {
        'dtRSO': function(_0x57a527, _0x5870a5) {
            return _0x57a527 === _0x5870a5;
        },
        'YtdZN': 'false',
        'dTQyG': function(_0x5bcb9b, _0x48a9fb) {
            return _0x5bcb9b === _0x48a9fb;
        },
        'OqCAD': function(_0xbaf12b, _0x322d91) {
            return _0xbaf12b - _0x322d91;
        },
        'TJKZG': function(_0x58edea, _0x4eaaa6) {
            return _0x58edea / _0x4eaaa6;
        },
        'yFGZn': function(_0x48b352, _0x2bb96d) {
            return _0x48b352 > _0x2bb96d;
        },
        'MdYpT': function(_0x5b187e, _0x2c5e78) {
            return _0x5b187e > _0x2c5e78;
        },
        'wAnpT': function(_0x34cd88, _0x2f1844) {
            return _0x34cd88 > _0x2f1844;
        },
        'SYQja': function(_0x595464, _0x1699cd) {
            return _0x595464 >= _0x1699cd;
        }
    };
    const _0x102ee6 = _0x1c118a['OqCAD'](_0x26d795['target'], _0x26d795['score']);
    const _0x12e7d5 = _0x26d795['modifyscore'];
    const _0x1740d1 = _0x2e1d16['modifyscore'];
    let _0x4df354 = 0x0;
    if ($['detail']) {
        let _0x21b16b = _0x1c118a['TJKZG'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
        $['detail']['forEach'](function(_0x14fa4a, _0x4a8d91) {
            if (_0x1c118a['dTQyG']('YOTFr', 'YxmTX')) {
                Object['keys'](jdCookieNode)['forEach'](_0x2dc776 => {
                    if (jdCookieNode[_0x2dc776]) {
                        cookieArr['push'](jdCookieNode[_0x2dc776]);
                    }
                });
                if (process['env']['JD_DEBUG'] && _0x1c118a['dtRSO'](process['env']['JD_DEBUG'], _0x1c118a['YtdZN'])) console['log'] = () => {};
            } else {
                if (_0x14fa4a['time'] >= _0x21b16b && _0x14fa4a['score']) {
                    _0x4df354 += _0x14fa4a['score'];
                }
            }
        });
    }
    message += '【水滴】本次获得' + _0x12e7d5 + ' 离线获得' + _0x1740d1 + ' 今日获得' + _0x4df354 + ' 还需水滴' + _0x102ee6 + '\x0a';
    if (_0x102ee6 <= 0x0) {
        notifyBool = !![];
        message += '【成熟】水果已成熟请及时收取，deliverState：' + _0x26d795['deliverState'] + '\x0a';
        return;
    }
    if (_0x1c118a['yFGZn'](_0x12e7d5, 0x0) || _0x1c118a['yFGZn'](_0x1740d1, 0x0) || _0x1c118a['MdYpT'](_0x4df354, 0x0)) {
        const _0x5f5f2e = Math['ceil'](_0x1c118a['TJKZG'](_0x102ee6, _0x1c118a['wAnpT'](_0x4df354, 0x0) ? _0x4df354 : _0x12e7d5 + _0x1740d1));
        message += '【预测】还需 ' + _0x5f5f2e + ' 天\n';
    }
    if (_0x1c118a['wAnpT'](_0x12e7d5, 0x0) || _0x1c118a['wAnpT'](_0x1740d1, 0x0)) {
        notifyBool = notifyBool && _0x1c118a['SYQja'](notifyLevel, 0x1);
    } else {
        notifyBool = notifyBool && _0x1c118a['SYQja'](notifyLevel, 0x2);
    }
}

function submitInviteId(_0x13bdc9) {
    var _0xebf010 = {
        'YKpVl': '【邀请码】提交成功！\x0a',
        'wKQdq': function(_0x414638, _0x11caee) {
            return _0x414638 !== _0x11caee;
        },
        'OoWsn': 'hwQpj',
        'WJmnh': 'OaYsS',
        'VDMjb': 'OZZyN',
        'xBIeK': '邀请码提交失败 API 返回异常',
        'JgftN': function(_0x3e971b, _0x35ff53) {
            return _0x3e971b(_0x35ff53);
        },
        'QqaGx': function(_0x1048d2) {
            return _0x1048d2();
        }
    };
    return new Promise(_0xb717b5 => {
        var _0x24cfee = {
            'yexhk': _0xebf010['YKpVl'],
            'FysVk': function(_0x4a4cf4, _0x435e1f) {
                return _0xebf010['wKQdq'](_0x4a4cf4, _0x435e1f);
            },
            'BucFh': _0xebf010['OoWsn'],
            'feQWI': _0xebf010['WJmnh'],
            'uSqnf': _0xebf010['VDMjb'],
            'FaXUK': _0xebf010['xBIeK'],
            'DcLQP': function(_0x2852aa) {
                return _0x2852aa();
            }
        };
        if (!$['info'] || !$['info']['smp']) {
            _0xb717b5();
            return;
        }
        try {
            $['post']({
                'url': 'https://api.ninesix.cc/api/jx-nc/' + $['info']['smp'] + '/' + _0xebf010['JgftN'](encodeURIComponent, _0x13bdc9) + '?active=' + $['info']['active'] + '&joinnum=' + $['info']['joinnum'],
                'timeout': 0x2710
            }, (_0x4cd0f8, _0x3dc23f, _0x192432) => {
                if (_0x24cfee['FysVk'](_0x24cfee['BucFh'], 'AglYf')) {
                    try {
                        const {
                            code,
                            data = {}
                        } = JSON['parse'](_0x192432);
                        $['log']('邀请码提交：' + code);
                        if (data['value']) {
                            message += _0x24cfee['yexhk'];
                        }
                    } catch (_0x126ec2) {
                        if (_0x24cfee['feQWI'] === _0x24cfee['uSqnf']) {
                            $['drip'] += eachtimeget;
                        } else {
                            $['log'](_0x24cfee['FaXUK']);
                        }
                    } finally {
                        _0x24cfee['DcLQP'](_0xb717b5);
                    }
                } else {
                    const {
                        code,
                        data = {}
                    } = JSON['parse'](_0x192432);
                    $['log']('邀请码提交：' + code);
                    if (data['value']) {
                        message += _0x24cfee['yexhk'];
                    }
                }
            });
        } catch (_0x33a766) {
            _0xebf010['QqaGx'](_0xb717b5);
        }
    });
}

function getAssistUser() {
    var _0x11a1a6 = {
        'rHtAs': 'Osrue',
        'dvXPh': function(_0x4ef745, _0x4fdcc0) {
            return _0x4ef745 + _0x4fdcc0;
        },
        'HhADQ': function(_0x4a9640, _0x93cc3a) {
            return _0x4a9640(_0x93cc3a);
        },
        'BtnWF': function(_0x36de9c, _0x78edb5) {
            return _0x36de9c === _0x78edb5;
        },
        'ERiii': 'gqcXL',
        'wEnug': 'aBOph',
        'BoYyJ': function(_0x55635a, _0x28e25b) {
            return _0x55635a !== _0x28e25b;
        },
        'VZbhj': 'QmwvN',
        'pSKsr': '获取随机助力码失败 API 返回异常',
        'XGJmo': function(_0x4acdc2, _0x498f2e) {
            return _0x4acdc2 == _0x498f2e;
        },
        'eLYpc': 'string',
        'nZNXa': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'fsuit': 'gEcyp',
        'IbROz': 'nxxBJ'
    };
    return new Promise(_0x97e9d0 => {
        var _0x204516 = {
            'sHWLy': function(_0x4e993f, _0x5c9312) {
                return _0x11a1a6['XGJmo'](_0x4e993f, _0x5c9312);
            },
            'RghTB': _0x11a1a6['eLYpc'],
            'CgsYS': _0x11a1a6['nZNXa'],
            'PQOEB': function(_0x23fed4, _0x4582d3) {
                return _0x23fed4(_0x4582d3);
            }
        };
        try {
            $['get']({
                'url': 'http://120.76.219.92:18880/api/jx-nc?active=' + $['info']['active'],
                'timeout': 0x2710
            }, async (_0x123cc2, _0x58e324, _0x17ddbd) => {
                try {
                    const {
                        code,
                        data: {
                            value,
                            extra = {}
                        } = {}
                    } = JSON['parse'](_0x17ddbd);
                    if (value && extra['active']) {
                        if (_0x11a1a6['rHtAs'] === _0x11a1a6['rHtAs']) {
                            let _0x56ac83 = {
                                'smp': value,
                                'active': extra['active'],
                                'joinnum': extra['joinnum'] || 0x1
                            };
                            $['log'](_0x11a1a6['dvXPh']('获取随机助力码成功 ', JSON['stringify'](_0x56ac83)));
                            _0x11a1a6['HhADQ'](_0x97e9d0, _0x56ac83);
                            return;
                        } else {
                            if (_0x204516['sHWLy'](typeof str, _0x204516['RghTB'])) {
                                try {
                                    return JSON['parse'](str);
                                } catch (_0x3f7e4c) {
                                    console['log'](_0x3f7e4c);
                                    $['msg']($['name'], '', _0x204516['CgsYS']);
                                    return [];
                                }
                            }
                        }
                    } else {
                        if (_0x11a1a6['BtnWF'](_0x11a1a6['ERiii'], _0x11a1a6['wEnug'])) {
                            notifyBool = !![];
                            $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                            message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                        } else {
                            $['log']('获取随机助力码失败 ' + code);
                        }
                    }
                } catch (_0x2404c8) {
                    if (_0x11a1a6['BoYyJ']('QmwvN', _0x11a1a6['VZbhj'])) {
                        console['log']('京东服务器返回空数据');
                    } else {
                        $['log'](_0x11a1a6['pSKsr']);
                    }
                } finally {
                    _0x11a1a6['HhADQ'](_0x97e9d0, ![]);
                }
            });
        } catch (_0x128318) {
            if (_0x11a1a6['fsuit'] !== _0x11a1a6['IbROz']) {
                _0x11a1a6['HhADQ'](_0x97e9d0, ![]);
            } else {
                _0x204516['PQOEB'](_0x97e9d0, ![]);
            }
        }
    });
}
async function helpFriends() {
    var _0x4decda = {
        'KQYip': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'uEllr': function(_0x56f9eb, _0x4a1ae7) {
            return _0x56f9eb >= _0x4a1ae7;
        },
        'mEEnS': function(_0x457bb7, _0x527c17) {
            return _0x457bb7(_0x527c17);
        },
        'xYvvh': function(_0x3e7eac, _0x3c3f77) {
            return _0x3e7eac(_0x3c3f77);
        },
        'IYQhm': function(_0xca988, _0x203767) {
            return _0xca988 === _0x203767;
        },
        'KHutb': 'njtdE',
        'rKZwH': function(_0x4334df, _0x11120e) {
            return _0x4334df !== _0x11120e;
        },
        'KOAKQ': 'APecI',
        'hLukP': function(_0x3701dc, _0x45f247, _0x1455ef, _0x407818) {
            return _0x3701dc(_0x45f247, _0x1455ef, _0x407818);
        },
        'XQICq': 'smp',
        'nJwBH': 'active',
        'qSbDt': 'joinnum'
    };
    for (let _0x5cd12f of currentShareCode) {
        if (_0x4decda['IYQhm'](_0x4decda['KHutb'], _0x4decda['KHutb'])) {
            if (!_0x5cd12f) {
                continue;
            }
            let _0x226620 = changeShareCodeJson(_0x5cd12f);
            if (!_0x226620) {
                if (_0x4decda['rKZwH']('APecI', _0x4decda['KOAKQ'])) {
                    let _0x231fd0 = data['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                    if (_0x231fd0) {
                        _0x231fd0 = _0x231fd0[0x1];
                        const {
                            detail,
                            msg,
                            task = [],
                            retmsg,
                            ..._0x4f680a
                        } = JSON['parse'](_0x231fd0);
                        $['detail'] = detail;
                        $['helpTask'] = task['filter'](_0x5b4826 => _0x5b4826['tasktype'] === 0x2)[0x0] || {
                            'eachtimeget': 0x0,
                            'limit': 0x0
                        };
                        $['allTask'] = task['filter'](_0x4a3682 => _0x4a3682['tasktype'] !== 0x3 && _0x4a3682['tasktype'] !== 0x2 && parseInt(_0x4a3682['left']) > 0x0);
                        $['info'] = _0x4f680a;
                        $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                        if (!$['info']['active']) {
                            $['log'](_0x4decda['KQYip']);
                            message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                            notifyBool = notifyBool && _0x4decda['uEllr'](notifyLevel, 0x3);
                            resolve(![]);
                        }
                    }
                    _0x4decda['mEEnS'](resolve, other);
                } else {
                    console['log']('助力码非 json 格式，跳过');
                    continue;
                }
            }
            const _0x793775 = await _0x4decda['hLukP'](helpShareCode, _0x226620[_0x4decda['XQICq']], _0x226620[_0x4decda['nJwBH']], _0x226620[_0x4decda['qSbDt']]);
            if (!_0x793775) {
                return ![];
            }
            await $['wait'](0x3e8);
        } else {
            _0x4decda['xYvvh'](resolve, ![]);
        }
    }
    return !![];
}

function helpShareCode(_0x3b6a9b, _0x496d7d, _0x30f109) {
    var _0x2ce31d = {
        'EMMHS': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'XVokd': function(_0x22e37f, _0x2c9280) {
            return _0x22e37f >= _0x2c9280;
        },
        'tNBkC': 'ECexV',
        'cOLvz': 'jHybO',
        'jrVDE': 'ueVwJ',
        'oOEYx': function(_0x82003b, _0x3bbd67) {
            return _0x82003b !== _0x3bbd67;
        },
        'XWLzx': 'zeyAT',
        'ATpLH': '助力码与当前账号相同，跳过助力。准备进行下一个助力',
        'VYBEa': function(_0x149e54, _0x29b934, _0x3bc12e) {
            return _0x149e54(_0x29b934, _0x3bc12e);
        },
        'LnzrY': 'help'
    };
    return new Promise(async _0x32bbf9 => {
        var _0x4e92bd = {
            'upbSu': _0x2ce31d['EMMHS'],
            'fPCyG': function(_0x11852f, _0x88f424) {
                return _0x2ce31d['XVokd'](_0x11852f, _0x88f424);
            },
            'UBbPf': function(_0x1787a4, _0x5ed7b3) {
                return _0x1787a4 !== _0x5ed7b3;
            },
            'ErMHF': _0x2ce31d['tNBkC'],
            'EdJXl': function(_0x34d1b6, _0x2bf051) {
                return _0x34d1b6 === _0x2bf051;
            },
            'cmvfn': function(_0x1fa6a3, _0xdde458) {
                return _0x1fa6a3 === _0xdde458;
            },
            'xGwwI': function(_0x4ebdb9, _0x43bb1b) {
                return _0x4ebdb9 === _0x43bb1b;
            },
            'jYslu': _0x2ce31d['cOLvz'],
            'UXWVZ': 'CAiBh',
            'rhUQz': function(_0x20f7ff, _0x370f30) {
                return _0x20f7ff(_0x370f30);
            },
            'SVHIx': _0x2ce31d['jrVDE']
        };
        if (_0x3b6a9b === $['info']['smp']) {
            if (_0x2ce31d['oOEYx']('OxWcL', _0x2ce31d['XWLzx'])) {
                $['log'](_0x2ce31d['ATpLH']);
                _0x32bbf9(!![]);
            } else {
                $['msg']($['name'], subTitle, message, option);
                if ($['isNode']()) {
                    allMessage += subTitle + '\x0a' + message + ($['index'] !== cookieArr['length'] ? '\x0a\x0a' : '');
                }
            }
        }
        $['log']('即将助力 share {"smp":"' + _0x3b6a9b + '","active":"' + _0x496d7d + '","joinnum":"' + _0x30f109 + '\"}');
        $['get'](_0x2ce31d['VYBEa'](taskUrl, _0x2ce31d['LnzrY'], 'active=' + _0x496d7d + '&joinnum=' + _0x30f109 + '&smp=' + _0x3b6a9b), async (_0x15081b, _0x3ca5dc, _0x17ce28) => {
            try {
                if (_0x4e92bd['UBbPf']('hXijg', _0x4e92bd['ErMHF'])) {
                    let _0x3f534c = _0x17ce28['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                    if (_0x3f534c) {
                        _0x3f534c = _0x3f534c[0x1];
                        const {
                            ret,
                            retmsg = ''
                        } = JSON['parse'](_0x3f534c);
                        $['log']('助力结果：ret=' + ret + ' retmsg=\"' + (retmsg ? retmsg : 'OK') + '\"');
                        if (ret === 0x93 || _0x4e92bd['EdJXl'](ret, 0x3f8)) {
                            if (_0x4e92bd['cmvfn'](ret, 0x93)) {
                                if (_0x4e92bd['xGwwI'](_0x4e92bd['jYslu'], _0x4e92bd['UXWVZ'])) {
                                    $['drip'] += eachtimeget;
                                } else {
                                    $['log']('\x0a\x0a  !!!!!!!!   当前账号黑号了  !!!!!!!!  \x0a\x0a');
                                }
                            }
                            _0x4e92bd['rhUQz'](_0x32bbf9, ![]);
                            return;
                        }
                        _0x4e92bd['rhUQz'](_0x32bbf9, !![]);
                    }
                } else {
                    _0x32bbf9();
                }
            } catch (_0x453d71) {
                $['logErr'](_0x453d71, _0x3ca5dc);
            } finally {
                if (_0x4e92bd['SVHIx'] === _0x4e92bd['SVHIx']) {
                    _0x32bbf9(![]);
                } else {
                    $['log']('账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。');
                    message += _0x4e92bd['upbSu'];
                    notifyBool = notifyBool && _0x4e92bd['fPCyG'](notifyLevel, 0x3);
                }
            }
        });
    });
}

function doTask({
                    tasklevel,
                    left,
                    taskname,
                    eachtimeget
                }) {
    var _0xcea94e = {
        'yUppZ': function(_0x4a67d4, _0x58b875) {
            return _0x4a67d4(_0x58b875);
        },
        'ALaAo': function(_0x49fd7e, _0x38bff5) {
            return _0x49fd7e === _0x38bff5;
        },
        'yUgDm': function(_0x357b5b, _0x54f030) {
            return _0x357b5b !== _0x54f030;
        },
        'sqtzX': '活动太火爆了',
        'ynQhQ': '任务进行中或者未到任务时间',
        'oEzjj': function(_0x9963f2, _0x59ce6f) {
            return _0x9963f2 === _0x59ce6f;
        },
        'wuMSB': function(_0x1b6d82) {
            return _0x1b6d82();
        },
        'bLDzF': 'uXdWw',
        'csEaO': 'MmNia',
        'fkKlU': function(_0x304556, _0x1ff66d, _0x6743f1) {
            return _0x304556(_0x1ff66d, _0x6743f1);
        },
        'oYusY': 'dotask',
        'Nodyy': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    return new Promise(async _0x5b4dfe => {
        var _0x5ad453 = {
            'ZTRyB': function(_0x2d92f2, _0x15cf62) {
                return _0xcea94e['yUppZ'](_0x2d92f2, _0x15cf62);
            },
            'Xrbjm': function(_0x4fd7e6, _0x5a35e3) {
                return _0xcea94e['ALaAo'](_0x4fd7e6, _0x5a35e3);
            },
            'MZfit': 'QiVZQ',
            'GLGQR': function(_0x4daae6, _0x510bde) {
                return _0xcea94e['yUgDm'](_0x4daae6, _0x510bde);
            },
            'WdglM': _0xcea94e['sqtzX'],
            'TNqFW': _0xcea94e['ynQhQ'],
            'xZlNp': function(_0x12c3a1, _0x12d858) {
                return _0xcea94e['oEzjj'](_0x12c3a1, _0x12d858);
            },
            'SyuDu': function(_0x51215e) {
                return _0xcea94e['wuMSB'](_0x51215e);
            }
        };
        if ('uXdWw' !== _0xcea94e['bLDzF']) {
            jxncShareCodeArr['push']('');
        } else {
            if (parseInt(left) <= 0x0) {
                if (_0xcea94e['oEzjj'](_0xcea94e['csEaO'], 'qXmxA')) {
                    $['log']('获取随机助力码失败 API 返回异常');
                } else {
                    $['log'](taskname + '[做任务]： 任务已完成，跳过');
                    _0xcea94e['yUppZ'](_0x5b4dfe, ![]);
                }
            }
            $['get'](_0xcea94e['fkKlU'](taskUrl, _0xcea94e['oYusY'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':D:0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + encodeURIComponent(_0xcea94e['Nodyy'])), (_0x50560a, _0x3d6b0c, _0x4eb32b) => {
                if (_0x5ad453['Xrbjm']('QiVZQ', _0x5ad453['MZfit'])) {
                    try {
                        let _0x48c361 = _0x4eb32b['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                        if (_0x48c361) {
                            _0x48c361 = _0x48c361[0x1];
                            let {
                                ret,
                                retmsg
                            } = JSON['parse'](_0x48c361);
                            retmsg = _0x5ad453['GLGQR'](retmsg, '') ? retmsg : '成功';
                            $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x5ad453['GLGQR'](retmsg['indexOf'](_0x5ad453['WdglM']), -0x1) ? _0x5ad453['TNqFW'] : retmsg) + '\"');
                            if (_0x5ad453['xZlNp'](ret, 0x0)) {
                                $['drip'] += eachtimeget;
                            }
                        }
                        _0x5b4dfe(ret);
                    } catch (_0x5ef566) {
                        $['logErr'](_0x5ef566, _0x3d6b0c);
                    } finally {
                        _0x5ad453['SyuDu'](_0x5b4dfe);
                    }
                } else {
                    console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\n');
                    _0x5ad453['ZTRyB'](_0x5b4dfe, null);
                }
            });
        }
    });
}

function taskUrl(_0x287ad3, _0x14f40e) {
    var _0x3766b0 = {
        'UfTIU': 'phoneid',
        'rJWQX': 'timestamp',
        'EFeOF': function(_0x4316be, _0x2ab211) {
            return _0x4316be(_0x2ab211);
        },
        'TLqCD': './USER_AGENTS',
        'znheN': 'JDUA',
        'rbhXa': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return {
        'url': JXNC_API_HOST + 'cubeactive/farm/' + _0x287ad3 + '?' + _0x14f40e + '&farm_jstoken=' + currentToken['farm_jstoken'] + '&phoneid=' + currentToken[_0x3766b0['UfTIU']] + '×tamp=' + currentToken[_0x3766b0['rJWQX']] + '&sceneval=2&g_login_type=1&callback=whyour&_=' + Date['now']() + '&g_ty=ls',
        'headers': {
            'Cookie': currentCookie,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://st.jingxi.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'wq.jd.com',
            'Accept-Language': 'zh-cn',
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x3766b0['EFeOF'](require, _0x3766b0['TLqCD'])['USER_AGENT'] : $['getdata'](_0x3766b0['znheN']) ? $['getdata']('JDUA') : _0x3766b0['rbhXa']
        },
        'timeout': 0x2710
    };
}
async function showMsg() {
    var _0x3518dd = {
        'CBqbb': function(_0x3c9730, _0x166b80) {
            return _0x3c9730 !== _0x166b80;
        }
    };
    if (notifyBool) {
        $['msg']($['name'], subTitle, message, option);
        if ($['isNode']()) {
            allMessage += subTitle + '\x0a' + message + (_0x3518dd['CBqbb']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
        }
    } else {
        $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
    }
}

function getJxToken() {
    var _0x484402 = {
        'FUKpc': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'IWyrK': function(_0x291e7e, _0x4e5a7f) {
            return _0x291e7e < _0x4e5a7f;
        },
        'jjInS': function(_0x1c3a22, _0x13bb1f) {
            return _0x1c3a22 !== _0x13bb1f;
        },
        'NMGHX': 'suaBj',
        'iPqBn': 'uBWJf',
        'MhITl': function(_0x3a082f, _0x34303f) {
            return _0x3a082f(_0x34303f);
        },
        'XUBfH': function(_0x48bf4a, _0x2d2df3) {
            return _0x48bf4a * _0x2d2df3;
        },
        'rCGpT': function(_0x3394de, _0x155cc2) {
            return _0x3394de !== _0x155cc2;
        },
        'fIQLs': '活动太火爆了',
        'TtSzs': function(_0x37aa71, _0xf0d69d) {
            return _0x37aa71 !== _0xf0d69d;
        },
        'ZUBXy': 'qemmF',
        'KYSPm': 'bBaAw',
        'ieZAu': function(_0x51b7c2) {
            return _0x51b7c2();
        }
    };

    function _0x14cb34(_0x526507) {
        let _0x15b835 = _0x484402['FUKpc'];
        let _0x2c61c1 = '';
        for (let _0x4d7210 = 0x0; _0x484402['IWyrK'](_0x4d7210, _0x526507); _0x4d7210++) {
            if (_0x484402['jjInS'](_0x484402['NMGHX'], _0x484402['iPqBn'])) {
                _0x2c61c1 += _0x15b835[_0x484402['MhITl'](parseInt, _0x484402['XUBfH'](Math['random'](), _0x15b835['length']))];
            } else {
                return JSON['parse'](_0x2c61c1);
            }
        }
        return _0x2c61c1;
    }
    return new Promise(_0x1f72f7 => {
        var _0x5261dd = {
            'kWwlQ': function(_0x27d2c2, _0x3a52c2) {
                return _0x484402['rCGpT'](_0x27d2c2, _0x3a52c2);
            },
            'ENTqZ': _0x484402['fIQLs']
        };
        if (_0x484402['TtSzs'](_0x484402['ZUBXy'], _0x484402['KYSPm'])) {
            let _0x61567f = _0x484402['MhITl'](_0x14cb34, 0x28);
            let _0x2b4a28 = (+new Date())['toString']();
            if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
                console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\n');
                _0x484402['MhITl'](_0x1f72f7, null);
            }
            let _0x18fd24 = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
            let _0x593e1c = $['md5']('' + decodeURIComponent(_0x18fd24) + _0x2b4a28 + _0x61567f + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
            currentToken = {
                'timestamp': _0x2b4a28,
                'phoneid': _0x61567f,
                'farm_jstoken': _0x593e1c
            };
            _0x484402['ieZAu'](_0x1f72f7);
        } else {
            res = res[0x1];
            let {
                ret,
                retmsg
            } = JSON['parse'](res);
            retmsg = _0x5261dd['kWwlQ'](retmsg, '') ? retmsg : '成功';
            $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x5261dd['kWwlQ'](retmsg['indexOf'](_0x5261dd['ENTqZ']), -0x1) ? '任务进行中或者未到任务时间' : retmsg) + '\"');
            if (ret === 0x0) {
                $['drip'] += eachtimeget;
            }
        }
    });
}

function jsonParse(_0x1efafd) {
    var _0x56fbb0 = {
        'Puyvn': function(_0x3fd287) {
            return _0x3fd287();
        },
        'JILSS': function(_0x1cb074, _0x3980fd) {
            return _0x1cb074 == _0x3980fd;
        },
        'xfYuP': 'string',
        'rhRxx': function(_0x484422, _0x29eab3) {
            return _0x484422 !== _0x29eab3;
        },
        'xWTax': 'iRHPz',
        'FTZBQ': 'ZtdqO',
        'VdQSz': function(_0x3c436c, _0x4dca2f) {
            return _0x3c436c !== _0x4dca2f;
        },
        'MsSHd': 'EnOgt',
        'xZIwN': 'zgZGm',
        'dDJJX': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'
    };
    if (_0x56fbb0['JILSS'](typeof _0x1efafd, _0x56fbb0['xfYuP'])) {
        if (_0x56fbb0['rhRxx'](_0x56fbb0['xWTax'], _0x56fbb0['FTZBQ'])) {
            try {
                if (_0x56fbb0['VdQSz'](_0x56fbb0['MsSHd'], _0x56fbb0['xZIwN'])) {
                    return JSON['parse'](_0x1efafd);
                } else {
                    _0x56fbb0['Puyvn'](resolve);
                    return;
                }
            } catch (_0x403dea) {
                console['log'](_0x403dea);
                $['msg']($['name'], '', _0x56fbb0['dDJJX']);
                return [];
            }
        } else {
            console['log'](e);
            $['msg']($['name'], '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
            return [];
        }
    }
};
_0xodG = 'jsjiami.com.v6'

// prettier-ignore
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}