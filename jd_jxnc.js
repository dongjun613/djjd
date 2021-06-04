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
 *Progcessed By JSDec in 0.66s
 *JSDec - JSDec.js.org
 */
$['maxHelpNum'] = $['isNode']() ? 0x8 : 0x4;
$['helpNum'] = 0x0;
let assistUserShareCode = 0x0;
!(async () => {
    var _0x221a28 = {
        'CmFjS': function(_0x7fcdfe) {
            return _0x7fcdfe();
        },
        'GWbAn': 'base',
        'VmhaU': 'CookieJD2',
        'mlrFu': function(_0x143e04, _0x45bb49) {
            return _0x143e04(_0x45bb49);
        },
        'LHxTr': 'CookiesJD',
        'ddgww': function(_0x42d72f, _0x167f42) {
            return _0x42d72f !== _0x167f42;
        },
        'lgkCH': 'hIDth',
        'qgblg': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'soyDQ': 'https://bean.m.jd.com/bean/signIndex.action',
        'KgAEb': function(_0x28a54b, _0x1e0b8b) {
            return _0x28a54b < _0x1e0b8b;
        },
        'FBmXy': function(_0x314105, _0x3757b3) {
            return _0x314105 + _0x3757b3;
        },
        'VLvwR': function(_0x1a5c33) {
            return _0x1a5c33();
        },
        'PHwwR': function(_0x35d323, _0x434a0a) {
            return _0x35d323 !== _0x434a0a;
        },
        'MShct': 'pt_pin',
        'qQbnU': function(_0x38f279) {
            return _0x38f279();
        },
        'nvbpE': 'Ixkfe'
    };
    await _0x221a28['CmFjS'](requireConfig);
    if (!cookieArr[0x0]) {
        if (_0x221a28['ddgww']('hIDth', _0x221a28['lgkCH'])) {
            var _0x47f443 = {
                'gtmLV': function(_0x3ae1a7) {
                    return _0x221a28['CmFjS'](_0x3ae1a7);
                }
            };
            return new Promise(async _0x4ab5e1 => {
                if (jxncShareCodeArr[$['index'] - 0x1]) {
                    currentShareCode = jxncShareCodeArr[$['index'] - 0x1]['split']('@');
                    currentShareCode['push'](...shareCode['split']('@'));
                } else {
                    $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                    currentShareCode = shareCode['split']('@');
                }
                $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
                _0x47f443['gtmLV'](_0x4ab5e1);
            });
        } else {
            $['msg']($['name'], _0x221a28['qgblg'], _0x221a28['soyDQ'], {
                'open-url': _0x221a28['soyDQ']
            });
            return;
        }
    }
    for (let _0x118b0c = 0x0; _0x221a28['KgAEb'](_0x118b0c, cookieArr['length']); _0x118b0c++) {
        if (cookieArr[_0x118b0c]) {
            currentCookie = cookieArr[_0x118b0c];
            $['UserName'] = decodeURIComponent(currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/) && currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            $['index'] = _0x221a28['FBmXy'](_0x118b0c, 0x1);
            $['isLogin'] = !![];
            $['nickName'] = '';
            $['log']('\n************* 检查【京东账号' + $['index'] + '】' + $['UserName'] + ' cookie 是否有效 *************');
            await _0x221a28['VLvwR'](TotalBean);
            $['log']('开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '\x0a');
            if (!$['isLogin']) {
                if (_0x221a28['PHwwR']('ANKji', 'iczRe')) {
                    $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
                        'open-url': 'https://bean.m.jd.com/'
                    });
                    if ($['isNode']()) {
                        await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\x0a请重新登录获取cookie');
                    }
                    continue;
                } else {
                    $['nickName'] = data[_0x221a28['GWbAn']] && data[_0x221a28['GWbAn']]['nickname'] || $['UserName'];
                }
            }
            if (currentCookie['includes'](_0x221a28['MShct'])) await getJxToken();
            subTitle = '';
            message = '';
            option = {};
            $['answer'] = 0x3;
            $['helpNum'] = 0x0;
            notifyBool = notifyLevel > 0x0;
            await _0x221a28['qQbnU'](shareCodesFormat);
            await jdJXNC();
        }
    }
    if ($['isNode']() && allMessage) {
        if (_0x221a28['nvbpE'] === 'zxzfh') {
            cookieArr = [$['getdata']('CookieJD'), $['getdata'](_0x221a28['VmhaU']), ..._0x221a28['mlrFu'](jsonParse, $['getdata'](_0x221a28['LHxTr']) || '[]')['map'](_0x51fa55 => _0x51fa55['cookie'])]['filter'](_0x237042 => !!_0x237042);
        } else {
            await notify['sendNotify']('' + $['name'], '' + allMessage);
        }
    }
})()['catch'](_0x2970b1 => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x2970b1 + '!', '');
    console['log'](_0x2970b1);
})['finally'](() => {
    $['done']();
});

function changeShareCodeJson(_0x59fb32) {
    var _0x15f7e4 = {
        'dsQWB': function(_0xd97a74) {
            return _0xd97a74();
        },
        'aXvEW': function(_0x13fb6b, _0x133962) {
            return _0x13fb6b !== _0x133962;
        },
        'yaBYE': 'pdtKU',
        'MdHuk': 'zqHFU',
        'mkkVD': 'smp',
        'OxQEl': 'joinnum',
        'htkPr': function(_0x3e967f, _0x40dc9d) {
            return _0x3e967f === _0x40dc9d;
        },
        'jldOg': 'EyVPW'
    };
    try {
        if (_0x15f7e4['aXvEW'](_0x15f7e4['yaBYE'], _0x15f7e4['MdHuk'])) {
            let _0x3164e7 = _0x59fb32 && JSON['parse'](_0x59fb32);
            return _0x3164e7[_0x15f7e4['mkkVD']] && _0x3164e7['active'] && _0x3164e7[_0x15f7e4['OxQEl']] ? _0x3164e7 : '';
        } else {
            _0x15f7e4['dsQWB'](resolve);
            return;
        }
    } catch (_0x2eb9d9) {
        if (_0x15f7e4['htkPr']('xLOdZ', _0x15f7e4['jldOg'])) {
            return ![];
        } else {
            return '';
        }
    }
}

function requireConfig() {
    var _0x3c0275 = {
        'FlPmO': function(_0x3aa24a, _0x41fa12) {
            return _0x3aa24a === _0x41fa12;
        },
        'sCAuX': function(_0x537bfd, _0x1b64eb) {
            return _0x537bfd(_0x1b64eb);
        },
        'fmnxp': function(_0x488387, _0xa73243) {
            return _0x488387(_0xa73243);
        },
        'euhoX': 'XVpnq',
        'Goqps': 'lNRMh',
        'vjkaQ': 'smp',
        'LTLXV': 'joinnum',
        'nnvGm': 'LAuru',
        'lGpxx': './sendNotify',
        'zEfbE': './jdCookie.js',
        'GtuMr': function(_0x49f9fc, _0x336a0c) {
            return _0x49f9fc(_0x336a0c);
        },
        'AqFgc': './jdJxncShareCodes.js',
        'ZObMh': 'CookieJD2',
        'tFQWl': function(_0x40aa2a, _0x3f642a) {
            return _0x40aa2a(_0x3f642a);
        },
        'vGZEU': 'CookiesJD',
        'hSWSY': function(_0x40a597, _0x554f8b) {
            return _0x40a597 < _0x554f8b;
        },
        'LEpfz': 'eKalc',
        'USLoz': 'guadJ',
        'eHwch': '互助码格式已变更，请重新填写互助码',
        'yXVlP': '互助码格式变更，请重新填写 ‼️‼️',
        'NTTWD': 'application/json,text/plain, */*',
        'HpRwN': 'gzip, deflate, br',
        'Qscxw': 'zh-cn',
        'DrfAj': 'keep-alive',
        'efPtF': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    };
    return new Promise(async _0x59d886 => {
        var _0x3b4cc0 = {
            'kTBBx': _0x3c0275['euhoX'],
            'KuXkF': _0x3c0275['Goqps'],
            'IfAtn': function(_0x24a616, _0x2c18e6) {
                return _0x3c0275['FlPmO'](_0x24a616, _0x2c18e6);
            },
            'cSObB': 'IvntS',
            'FJgrc': 'VZGUb',
            'YvyYL': _0x3c0275['vjkaQ'],
            'CEfkw': _0x3c0275['LTLXV'],
            'Ttglg': _0x3c0275['nnvGm']
        };
        $['log']('开始获取配置文件\x0a');
        notify = $['isNode']() ? _0x3c0275['fmnxp'](require, _0x3c0275['lGpxx']) : '';
        const _0x2d19d0 = $['isNode']() ? _0x3c0275['fmnxp'](require, _0x3c0275['zEfbE']) : '';
        const _0x525ebf = $['isNode']() ? _0x3c0275['GtuMr'](require, _0x3c0275['AqFgc']) : {};
        if ($['isNode']()) {
            Object['keys'](_0x2d19d0)['forEach'](_0x164ba9 => {
                if (_0x2d19d0[_0x164ba9]) {
                    if (_0x3b4cc0['kTBBx'] === _0x3b4cc0['KuXkF']) {
                        notifyBool = !![];
                        $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                        message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                    } else {
                        cookieArr['push'](_0x2d19d0[_0x164ba9]);
                    }
                }
            });
            if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === 'false') console['log'] = () => {};
        } else {
            cookieArr = [$['getdata']('CookieJD'), $['getdata'](_0x3c0275['ZObMh']), ..._0x3c0275['tFQWl'](jsonParse, $['getdata'](_0x3c0275['vGZEU']) || '[]')['map'](_0x228588 => _0x228588['cookie'])]['filter'](_0x2a3d4b => !!_0x2a3d4b);
        }
        $['log']('共' + cookieArr['length'] + '个京东账号\n');
        if ($['isNode']()) {
            Object['keys'](_0x525ebf)['forEach'](_0x537173 => {
                if (_0x525ebf[_0x537173]) {
                    if (_0x3b4cc0['IfAtn'](_0x3b4cc0['cSObB'], _0x3b4cc0['FJgrc'])) {
                        $['logErr'](e, resp);
                    } else {
                        jxncShareCodeArr['push'](_0x525ebf[_0x537173]);
                    }
                } else {
                    jxncShareCodeArr['push']('');
                }
            });
        }
        for (let _0xf88426 = 0x0; _0x3c0275['hSWSY'](_0xf88426, jxncShareCodeArr['length']); _0xf88426++) {
            if (jxncShareCodeArr[_0xf88426]) {
                if (_0x3c0275['LEpfz'] === 'eKalc') {
                    let _0x443da0 = jxncShareCodeArr[_0xf88426];
                    let _0x1a5ec8 = _0x443da0['split']('@');
                    if (!_0x3c0275['tFQWl'](changeShareCodeJson, _0x1a5ec8[0x0])) {
                        if (_0x3c0275['USLoz'] === _0x3c0275['USLoz']) {
                            $['log'](_0x3c0275['eHwch']);
                            $['msg']($['name'], '互助码格式变更通知', _0x3c0275['yXVlP'], option);
                            if ($['isNode']()) {
                                await notify['sendNotify']('' + $['name'], '互助码格式变更，请重新填写 ‼️‼️');
                            }
                        } else {
                            let _0x469935 = code && JSON['parse'](code);
                            return _0x469935[_0x3b4cc0['YvyYL']] && _0x469935['active'] && _0x469935[_0x3b4cc0['CEfkw']] ? _0x469935 : '';
                        }
                    }
                    break;
                } else {
                    res = res[0x1];
                    const {
                        ret,
                        retmsg = ''
                    } = JSON['parse'](res);
                    $['log']('助力结果：ret=' + ret + ' retmsg="' + (retmsg ? retmsg : 'OK') + '\"');
                    if (_0x3c0275['FlPmO'](ret, 0x93) || ret === 0x3f8) {
                        if (ret === 0x93) {
                            $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                        }
                        _0x3c0275['sCAuX'](_0x59d886, ![]);
                        return;
                    }
                    _0x3c0275['fmnxp'](_0x59d886, !![]);
                }
            }
        }
        $['log']('您提供了' + jxncShareCodeArr['length'] + '个账号的京喜农场助力码');
        try {
            let _0x3d223 = {
                'url': 'http://120.76.219.92:18880/share_code/jxnc_code.txt',
                'headers': {
                    'Accept': _0x3c0275['NTTWD'],
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': _0x3c0275['HpRwN'],
                    'Accept-Language': _0x3c0275['Qscxw'],
                    'Connection': _0x3c0275['DrfAj'],
                    'User-Agent': _0x3c0275['efPtF']
                },
                'timeout': 0x2710
            };
            $['get'](_0x3d223, (_0x3b1870, _0x22fb89, _0x343768) => {
                var _0x2e695c = {
                    'ynjqO': function(_0x3f3d24) {
                        return _0x3f3d24();
                    }
                };
                if (!_0x3b1870) {
                    if (_0x3b4cc0['Ttglg'] === _0x3b4cc0['Ttglg']) {
                        shareCode = _0x343768;
                    } else {
                        _0x2e695c['ynjqO'](_0x59d886);
                    }
                }
            });
        } catch (_0x557361) {}
        _0x59d886();
    });
}

function TotalBean() {
    var _0x4ee846 = {
        'bqVGe': function(_0x58ea01, _0x1a5d21) {
            return _0x58ea01 - _0x1a5d21;
        },
        'Gzlcw': function(_0x4827b4) {
            return _0x4827b4();
        },
        'wQgVd': function(_0x1ed714, _0x42e418) {
            return _0x1ed714 === _0x42e418;
        },
        'vuroU': 'yIKlU',
        'iJKch': 'wrVpX',
        'pTagD': function(_0xbb652a, _0x4a41f6) {
            return _0xbb652a === _0x4a41f6;
        },
        'SsXOQ': 'mbaaN',
        'kRtIF': function(_0x69249e, _0x26bd09) {
            return _0x69249e !== _0x26bd09;
        },
        'iaVEw': 'CrNuK',
        'gRobv': function(_0x342b39, _0x186417) {
            return _0x342b39 === _0x186417;
        },
        'LRAQt': 'retcode',
        'jaEOJ': 'oMcKZ',
        'FedML': 'base',
        'WMKDl': 'KnxnY',
        'QMqDt': function(_0x4fd77a, _0x2d5a95) {
            return _0x4fd77a(_0x2d5a95);
        },
        'DqhPG': function(_0x444678, _0x23391f) {
            return _0x444678 === _0x23391f;
        },
        'fyERd': 'application/x-www-form-urlencoded',
        'ykGBJ': 'gzip, deflate, br',
        'rFhHv': 'zh-cn',
        'JXpqy': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'gOdDE': function(_0x4e75b6, _0x2ba3c3) {
            return _0x4e75b6(_0x2ba3c3);
        },
        'vSjjB': './USER_AGENTS',
        'fKeto': 'JDUA',
        'sVnrx': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return new Promise(async _0x56535d => {
        var _0x527f83 = {
            'CMUBq': function(_0x33d717, _0x2e3226) {
                return _0x4ee846['QMqDt'](_0x33d717, _0x2e3226);
            },
            'ACOKA': function(_0x30f061, _0x1f1ee5) {
                return _0x30f061 === _0x1f1ee5;
            },
            'SwCpV': function(_0x2ab5a0, _0x174fc3) {
                return _0x4ee846['DqhPG'](_0x2ab5a0, _0x174fc3);
            },
            'eUtWH': function(_0xc5dee, _0x33b462) {
                return _0xc5dee(_0x33b462);
            }
        };
        const _0x30ff44 = {
            'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
            'headers': {
                'Accept': 'application/json,text/plain, */*',
                'Content-Type': _0x4ee846['fyERd'],
                'Accept-Encoding': _0x4ee846['ykGBJ'],
                'Accept-Language': _0x4ee846['rFhHv'],
                'Connection': 'keep-alive',
                'Cookie': currentCookie,
                'Referer': _0x4ee846['JXpqy'],
                'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x4ee846['gOdDE'](require, _0x4ee846['vSjjB'])['USER_AGENT'] : $['getdata']('JDUA') ? $['getdata'](_0x4ee846['fKeto']) : _0x4ee846['sVnrx']
            }
        };
        $['post'](_0x30ff44, (_0x3207ff, _0x185469, _0x2126f0) => {
            var _0x5213cf = {
                'eOpBH': function(_0x1f26f8, _0x1bd5df) {
                    return _0x4ee846['bqVGe'](_0x1f26f8, _0x1bd5df);
                },
                'qcxRt': function(_0xacce38) {
                    return _0x4ee846['Gzlcw'](_0xacce38);
                }
            };
            if (_0x4ee846['wQgVd'](_0x4ee846['vuroU'], _0x4ee846['iJKch'])) {
                _0x527f83['CMUBq'](_0x56535d, ![]);
            } else {
                try {
                    if (_0x4ee846['pTagD'](_0x4ee846['SsXOQ'], 'JpGeg')) {
                        var _0x11701a = {
                            'xDYPm': function(_0x3e947f, _0x2450e5) {
                                return _0x5213cf['eOpBH'](_0x3e947f, _0x2450e5);
                            },
                            'pJwqL': function(_0x2b8e6a) {
                                return _0x5213cf['qcxRt'](_0x2b8e6a);
                            }
                        };
                        return new Promise(async _0x298ed3 => {
                            if (tokenArr[_0x11701a['xDYPm']($['index'], 0x1)] && tokenArr[$['index'] - 0x1]['farm_jstoken']) {
                                currentToken = tokenArr[$['index'] - 0x1];
                            } else {
                                currentToken = tokenNull;
                            }
                            _0x11701a['pJwqL'](_0x298ed3);
                        });
                    } else {
                        if (_0x3207ff) {
                            console['log']('' + JSON['stringify'](_0x3207ff));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            if (_0x2126f0) {
                                if (_0x4ee846['kRtIF'](_0x4ee846['iaVEw'], 'lQMNG')) {
                                    _0x2126f0 = JSON['parse'](_0x2126f0);
                                    if (_0x4ee846['gRobv'](_0x2126f0['retcode'], 0xd)) {
                                        $['isLogin'] = ![];
                                        return;
                                    }
                                    if (_0x4ee846['gRobv'](_0x2126f0[_0x4ee846['LRAQt']], 0x0)) {
                                        if (_0x4ee846['kRtIF'](_0x4ee846['jaEOJ'], _0x4ee846['jaEOJ'])) {
                                            $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                                        } else {
                                            $['nickName'] = _0x2126f0[_0x4ee846['FedML']] && _0x2126f0[_0x4ee846['FedML']]['nickname'] || $['UserName'];
                                        }
                                    } else {
                                        $['nickName'] = $['UserName'];
                                    }
                                } else {
                                    console['log']('' + JSON['stringify'](_0x3207ff));
                                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                                }
                            } else {
                                console['log']('京东服务器返回空数据');
                            }
                        }
                    }
                } catch (_0x157779) {
                    $['logErr'](_0x157779, _0x185469);
                } finally {
                    if (_0x4ee846['gRobv']('KnxnY', _0x4ee846['WMKDl'])) {
                        _0x56535d();
                    } else {
                        let _0x398a87 = _0x2126f0['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                        if (_0x398a87) {
                            _0x398a87 = _0x398a87[0x1];
                            const {
                                ret,
                                retmsg = ''
                            } = JSON['parse'](_0x398a87);
                            $['log']('助力结果：ret=' + ret + ' retmsg="' + (retmsg ? retmsg : 'OK') + '\"');
                            if (_0x527f83['ACOKA'](ret, 0x93) || _0x527f83['SwCpV'](ret, 0x3f8)) {
                                if (_0x527f83['SwCpV'](ret, 0x93)) {
                                    $['log']('\x0a\x0a  !!!!!!!!   当前账号黑号了  !!!!!!!!  \x0a\x0a');
                                }
                                _0x527f83['eUtWH'](_0x56535d, ![]);
                                return;
                            }
                            _0x56535d(!![]);
                        }
                    }
                }
            }
        });
    });
}

function tokenFormat() {
    var _0x310aa5 = {
        'gciGO': function(_0x5258a2, _0x39e6f3) {
            return _0x5258a2 - _0x39e6f3;
        },
        'wdSkZ': function(_0x16b793, _0x27f2b4) {
            return _0x16b793 - _0x27f2b4;
        },
        'wikkJ': function(_0x366aec, _0x310b77) {
            return _0x366aec - _0x310b77;
        },
        'vXUYH': function(_0x520f67) {
            return _0x520f67();
        }
    };
    return new Promise(async _0x306623 => {
        if (tokenArr[_0x310aa5['gciGO']($['index'], 0x1)] && tokenArr[_0x310aa5['wdSkZ']($['index'], 0x1)]['farm_jstoken']) {
            currentToken = tokenArr[_0x310aa5['wikkJ']($['index'], 0x1)];
        } else {
            currentToken = tokenNull;
        }
        _0x310aa5['vXUYH'](_0x306623);
    });
}

function shareCodesFormat() {
    var _0x2f3519 = {
        'hlUgw': function(_0x24f145, _0x4d6dff) {
            return _0x24f145 - _0x4d6dff;
        },
        'eBxsB': function(_0x460f78, _0x4ba579) {
            return _0x460f78 - _0x4ba579;
        },
        'hiSex': function(_0xedac92) {
            return _0xedac92();
        }
    };
    return new Promise(async _0x46063d => {
        if (jxncShareCodeArr[_0x2f3519['hlUgw']($['index'], 0x1)]) {
            currentShareCode = jxncShareCodeArr[_0x2f3519['eBxsB']($['index'], 0x1)]['split']('@');
            currentShareCode['push'](...shareCode['split']('@'));
        } else {
            $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
            currentShareCode = shareCode['split']('@');
        }
        $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
        _0x2f3519['hiSex'](_0x46063d);
    });
}
async function jdJXNC() {
    var _0x2d82ce = {
        'lwMuq': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'yxjFB': function(_0x4761b1, _0x5ce8b1) {
            return _0x4761b1 >= _0x5ce8b1;
        },
        'wZQXs': function(_0x464aba, _0x37838e) {
            return _0x464aba(_0x37838e);
        },
        'Qfcuo': function(_0x14e1be) {
            return _0x14e1be();
        },
        'ztipV': function(_0x5845fb, _0x5e88ae) {
            return _0x5845fb <= _0x5e88ae;
        },
        'jLrRe': function(_0x378da0, _0x55a807) {
            return _0x378da0 === _0x55a807;
        },
        'JbyGd': function(_0x335de4, _0x351c83) {
            return _0x335de4 === _0x351c83;
        },
        'ZQjLZ': function(_0x55ccdb, _0x237e2b) {
            return _0x55ccdb !== _0x237e2b;
        },
        'GNbRO': 'thvrk',
        'mzBqN': function(_0x5741ed, _0x2ae00a) {
            return _0x5741ed + _0x2ae00a;
        },
        'OKsjz': function(_0x193dda, _0x1b38b9, _0x23107f) {
            return _0x193dda(_0x1b38b9, _0x23107f);
        },
        'OmmRi': function(_0xb13949) {
            return _0xb13949();
        },
        'CwNgE': 'VGlOo',
        'yWJdV': function(_0x305e58, _0x37e7f6) {
            return _0x305e58 < _0x37e7f6;
        },
        'CNZmn': function(_0x1bd7d3, _0x4f71c0) {
            return _0x1bd7d3 !== _0x4f71c0;
        },
        'pbjLI': 'xawTQ',
        'XaINA': function(_0x5a6748, _0x5e5705, _0x135863, _0x592ba1) {
            return _0x5a6748(_0x5e5705, _0x135863, _0x592ba1);
        },
        'RJwfY': 'smp',
        'LIhon': function(_0x591d19, _0x5156a6) {
            return _0x591d19 === _0x5156a6;
        },
        'iPJrA': 'xpyCE',
        'QFuUv': 'qreLg'
    };
    subTitle = '【京东账号' + $['index'] + '】' + $['nickName'];
    $['log']('获取用户信息 & 任务列表');
    const _0xb0485b = await _0x2d82ce['Qfcuo'](getTaskList);
    if (_0xb0485b) {
        message += '【水果名称】' + _0xb0485b['prizename'] + '\x0a';
        if (_0x2d82ce['ztipV'](_0xb0485b['target'], _0xb0485b['score'])) {
            if (_0x2d82ce['jLrRe'](_0xb0485b['activestatus'], 0x2)) {
                notifyBool = !![];
                $['log']('【成熟】水果已成熟请及时收取，activestatus：' + _0xb0485b['activestatus'] + '\x0a');
                message += '【成熟】水果已成熟请及时收取，activestatus：' + _0xb0485b['activestatus'] + '\x0a';
            } else if (_0x2d82ce['JbyGd'](_0xb0485b['activestatus'], 0x0)) {
                $['log'](_0x2d82ce['lwMuq']);
                message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                notifyBool = notifyBool && _0x2d82ce['yxjFB'](notifyLevel, 0x3);
            }
        } else {
            if (_0x2d82ce['ZQjLZ']('thvrk', _0x2d82ce['GNbRO'])) {
                $['log'](_0x2d82ce['lwMuq']);
                message += '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。\x0a';
                notifyBool = notifyBool && _0x2d82ce['yxjFB'](notifyLevel, 0x3);
            } else {
                let _0x595841 = {
                    'smp': $['info']['smp'],
                    'active': $['info']['active'],
                    'joinnum': $['info']['joinnum']
                };
                $['log'](_0x2d82ce['mzBqN']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】', JSON['stringify'](_0x595841)));
                await $['wait'](0x1f4);
                const _0x5ea6c4 = await browserTask();
                if (_0x5ea6c4) {
                    await $['wait'](0x1f4);
                    await answerTask();
                    await $['wait'](0x1f4);
                    const _0x2fa92a = await _0x2d82ce['Qfcuo'](getTaskList);
                    _0x2d82ce['OKsjz'](getMessage, _0x2fa92a, _0xb0485b);
                    await _0x2d82ce['wZQXs'](submitInviteId, $['UserName']);
                    await $['wait'](0x1f4);
                    let _0x852c6f = await _0x2d82ce['OmmRi'](helpFriends);
                    if (_0x852c6f) {
                        if (_0x2d82ce['CwNgE'] !== _0x2d82ce['CwNgE']) {
                            $['msg']($['name'], subTitle, message, option);
                            if ($['isNode']()) {
                                allMessage += subTitle + '\x0a' + message + ($['index'] !== cookieArr['length'] ? '\x0a\x0a' : '');
                            }
                        } else {
                            while (_0x2d82ce['yWJdV']($['helpNum'], $['maxHelpNum'])) {
                                if (_0x2d82ce['CNZmn'](_0x2d82ce['pbjLI'], 'RmRGW')) {
                                    $['helpNum']++;
                                    assistUserShareCodeJson = await _0x2d82ce['OmmRi'](getAssistUser);
                                    if (assistUserShareCodeJson) {
                                        if (_0x2d82ce['CNZmn']('RyuQg', 'hOWeV')) {
                                            await $['wait'](0x1f4);
                                            _0x852c6f = await _0x2d82ce['XaINA'](helpShareCode, assistUserShareCodeJson[_0x2d82ce['RJwfY']], assistUserShareCodeJson['active'], assistUserShareCodeJson['joinnum']);
                                            if (_0x852c6f) {
                                                if (_0x2d82ce['LIhon'](_0x2d82ce['iPJrA'], _0x2d82ce['QFuUv'])) {
                                                    $['logErr'](e, resp);
                                                } else {
                                                    await $['wait'](0x3e8);
                                                    continue;
                                                }
                                            }
                                        } else {
                                            _0x2d82ce['wZQXs'](resolve, ![]);
                                            $['log'](taskname + '[做任务]： 任务已完成，跳过');
                                            return;
                                        }
                                    }
                                    break;
                                } else {
                                    $['drip'] += eachtimeget;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    await _0x2d82ce['OmmRi'](showMsg);
}

function getTaskList() {
    var _0x154d32 = {
        'MtdIc': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'giqyw': function(_0x4c3b36, _0x1cbbee) {
            return _0x4c3b36 !== _0x1cbbee;
        },
        'KHSCR': 'UoIFw',
        'fNSpI': function(_0x55c195, _0x8090c8, _0x430313) {
            return _0x55c195(_0x8090c8, _0x430313);
        },
        'elxHh': 'query'
    };
    return new Promise(async _0x46db5f => {
        var _0x3c9a6a = {
            'neZVe': _0x154d32['MtdIc'],
            'lMfIB': '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。\x0a',
            'Wyrjv': function(_0x2b498c, _0xd83ad3) {
                return _0x2b498c >= _0xd83ad3;
            },
            'sesFm': function(_0x1b620b, _0xba9996) {
                return _0x154d32['giqyw'](_0x1b620b, _0xba9996);
            },
            'NbJEl': _0x154d32['KHSCR']
        };
        $['get'](_0x154d32['fNSpI'](taskUrl, _0x154d32['elxHh'], 'type=1'), async (_0x25a146, _0x5c1ea9, _0x200d9f) => {
            try {
                let _0x241197 = _0x200d9f['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                if (_0x241197) {
                    _0x241197 = _0x241197[0x1];
                    const {
                        detail,
                        msg,
                        task = [],
                        retmsg,
                        ..._0x2de7cc
                    } = JSON['parse'](_0x241197);
                    $['detail'] = detail;
                    $['helpTask'] = task['filter'](_0x982766 => _0x982766['tasktype'] === 0x2)[0x0] || {
                        'eachtimeget': 0x0,
                        'limit': 0x0
                    };
                    $['allTask'] = task['filter'](_0x3dcdc0 => _0x3dcdc0['tasktype'] !== 0x3 && _0x3dcdc0['tasktype'] !== 0x2 && parseInt(_0x3dcdc0['left']) > 0x0);
                    $['info'] = _0x2de7cc;
                    $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                    if (!$['info']['active']) {
                        $['log'](_0x3c9a6a['neZVe']);
                        message += _0x3c9a6a['lMfIB'];
                        notifyBool = notifyBool && _0x3c9a6a['Wyrjv'](notifyLevel, 0x3);
                        _0x46db5f(![]);
                    }
                    _0x46db5f(_0x2de7cc);
                }
            } catch (_0x46d1ca) {
                if (_0x3c9a6a['sesFm'](_0x3c9a6a['NbJEl'], _0x3c9a6a['NbJEl'])) {
                    cookieArr['push'](jdCookieNode[item]);
                } else {
                    $['logErr'](_0x46d1ca, _0x5c1ea9);
                }
            } finally {
                _0x46db5f(!![]);
            }
        });
    });
}

function browserTask() {
    var _0x5cb249 = {
        'bkmdO': '1|4|3|0|2',
        'GllYk': function(_0x28d1dc, _0x3caae5) {
            return _0x28d1dc(_0x3caae5);
        },
        'JjzIk': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子',
        'eJJhA': function(_0x47808b, _0xb9fdd6) {
            return _0x47808b >= _0xb9fdd6;
        },
        'bfMSu': function(_0x13bbe9, _0x577c5a) {
            return _0x13bbe9 === _0x577c5a;
        },
        'NpTQd': 'BgtmN',
        'cVlAS': function(_0x5ee278, _0x11b738) {
            return _0x5ee278 < _0x11b738;
        },
        'hNPvX': function(_0x4805da, _0x10b0e5) {
            return _0x4805da + _0x10b0e5;
        },
        'aVpAU': 'vRxzb',
        'JuEtW': 'UqmHY',
        'xiwnJ': function(_0x524c9f, _0x44862f) {
            return _0x524c9f * _0x44862f;
        },
        'sBOCB': function(_0x58d2b2, _0x2586aa) {
            return _0x58d2b2 === _0x2586aa;
        },
        'qCcIk': 'YdOLF',
        'EsALG': '水滴已满，果实成熟，跳过所有任务',
        'IlILL': '0|4|1|2|3',
        'ylnFe': function(_0x51908c, _0x5868ad) {
            return _0x51908c >= _0x5868ad;
        },
        'yPsRL': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n'
    };
    return new Promise(async _0x1464c3 => {
        if (_0x5cb249['bfMSu']('rqrwl', _0x5cb249['NpTQd'])) {
            var _0x3ffac8 = _0x5cb249['bkmdO']['split']('|'),
                _0x54b5be = 0x0;
            while (!![]) {
                switch (_0x3ffac8[_0x54b5be++]) {
                    case '0':
                        _0x5cb249['GllYk'](_0x1464c3, ![]);
                        continue;
                    case '1':
                        $['log'](_0x5cb249['JjzIk']);
                        continue;
                    case '2':
                        return;
                    case '3':
                        notifyBool = notifyBool && _0x5cb249['eJJhA'](notifyLevel, 0x2);
                        continue;
                    case '4':
                        message += '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n';
                        continue;
                }
                break;
            }
        } else {
            const _0x48c2bc = $['allTask']['filter'](_0x1e355c => _0x1e355c['tasklevel'] !== 0x6);
            const _0x15d830 = Math['max'](...[..._0x48c2bc]['map'](_0x5f0e00 => _0x5f0e00['limit']));
            for (let _0x1f865f = 0x0; _0x5cb249['cVlAS'](_0x1f865f, _0x48c2bc['length']); _0x1f865f++) {
                const _0x667def = _0x48c2bc[_0x1f865f];
                $['log']('开始第' + _0x5cb249['hNPvX'](_0x1f865f, 0x1) + '个任务：' + _0x667def['taskname']);
                const _0x41aefd = [0x0];
                for (let _0x1f865f = 0x0; _0x1f865f < _0x15d830; _0x1f865f++) {
                    if (_0x5cb249['bfMSu'](_0x5cb249['aVpAU'], _0x5cb249['JuEtW'])) {
                        str += _sym[parseInt(Math['random']() * _sym['length'])];
                    } else {
                        const _0x4772c8 = _0x5cb249['xiwnJ'](Math['random'](), 0x3);
                        await $['wait'](_0x4772c8 * 0x3e8);
                        if (_0x5cb249['sBOCB'](_0x41aefd[0x0], 0x0)) {
                            _0x41aefd[0x0] = await doTask(_0x667def);
                        }
                        if (_0x41aefd[0x0] !== 0x0) {
                            if ('EcKmq' !== _0x5cb249['qCcIk']) {
                                break;
                            } else {
                                if (jdCookieNode[item]) {
                                    cookieArr['push'](jdCookieNode[item]);
                                }
                            }
                        }
                    }
                }
                if (_0x41aefd[0x0] === 0x3f9) {
                    $['log'](_0x5cb249['EsALG']);
                    _0x5cb249['GllYk'](_0x1464c3, !![]);
                    break;
                }
                if (_0x41aefd[0x0] === 0x408) {
                    var _0x860f73 = _0x5cb249['IlILL']['split']('|'),
                        _0x3b8612 = 0x0;
                    while (!![]) {
                        switch (_0x860f73[_0x3b8612++]) {
                            case '0':
                                $['log']('任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子');
                                continue;
                            case '1':
                                notifyBool = notifyBool && _0x5cb249['ylnFe'](notifyLevel, 0x2);
                                continue;
                            case '2':
                                _0x5cb249['GllYk'](_0x1464c3, ![]);
                                continue;
                            case '3':
                                return;
                            case '4':
                                message += _0x5cb249['yPsRL'];
                                continue;
                        }
                        break;
                    }
                }
                $['log']('结束第' + (_0x1f865f + 0x1) + '个任务：' + _0x667def['taskname']);
            }
            _0x5cb249['GllYk'](_0x1464c3, !![]);
        }
    });
}

function answerTask() {
    var _0x3fb0c6 = {
        'tdRXp': function(_0x1b5cb7, _0x354116) {
            return _0x1b5cb7 !== _0x354116;
        },
        'dKNCX': 'ibRXX',
        'sSNVF': 'SKPDG',
        'rnpdw': function(_0x2ea585, _0x36e6b1) {
            return _0x2ea585 !== _0x36e6b1;
        },
        'zFNOz': '活动太火爆了',
        'lJbyg': '任务进行中或者未到任务时间',
        'ygikq': function(_0x186d78, _0x2945fe) {
            return _0x186d78 === _0x2945fe;
        },
        'BgtNw': function(_0x26b178, _0x2cd785) {
            return _0x26b178 !== _0x2cd785;
        },
        'BkRfm': 'ans err',
        'wgIEl': function(_0x3dc289, _0x532674) {
            return _0x3dc289 > _0x532674;
        },
        'Ennqt': 'dYHZb',
        'CmSNR': 'oLfLD',
        'rOmLv': 'cFxAK',
        'wqQcF': 'jACLi',
        'cNnyR': function(_0x57b1a1) {
            return _0x57b1a1();
        },
        'oAllk': function(_0x36c626, _0x3d609d) {
            return _0x36c626(_0x3d609d);
        },
        'ttGdo': function(_0x2f46f8, _0x129c6f) {
            return _0x2f46f8(_0x129c6f);
        },
        'ZHhAh': function(_0x2faac6, _0x5dee04, _0x3063f0) {
            return _0x2faac6(_0x5dee04, _0x3063f0);
        },
        'XFmYk': 'dotask'
    };
    const _0x18e8b6 = $['allTask']['filter'](_0x387020 => _0x387020['tasklevel'] === 0x6);
    if (!_0x18e8b6 || !_0x18e8b6[0x0]) return;
    const {
        tasklevel,
        left,
        taskname,
        eachtimeget
    } = _0x18e8b6[0x0];
    $['log']('准备做答题任务：' + taskname);
    return new Promise(async _0x462b4c => {
        var _0x2efd68 = {
            'svoTh': function(_0x286cdc, _0x5bd151) {
                return _0x3fb0c6['oAllk'](_0x286cdc, _0x5bd151);
            }
        };
        if (parseInt(left) <= 0x0) {
            _0x3fb0c6['ttGdo'](_0x462b4c, ![]);
            $['log'](taskname + '[做任务]： 任务已完成，跳过');
            return;
        }
        $['get'](_0x3fb0c6['ZHhAh'](taskUrl, _0x3fb0c6['XFmYk'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':' + ['A', 'B', 'C', 'D'][$['answer']] + ':0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + encodeURIComponent('active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp')), async (_0x39e59a, _0x23a7c4, _0x5ccc07) => {
            if (_0x3fb0c6['tdRXp'](_0x3fb0c6['dKNCX'], _0x3fb0c6['sSNVF'])) {
                try {
                    let _0x579584 = _0x5ccc07['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                    if (_0x579584) {
                        _0x579584 = _0x579584[0x1];
                        let {
                            ret,
                            retmsg,
                            right
                        } = JSON['parse'](_0x579584);
                        retmsg = _0x3fb0c6['rnpdw'](retmsg, '') ? retmsg : '成功';
                        $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x3fb0c6['rnpdw'](retmsg['indexOf'](_0x3fb0c6['zFNOz']), -0x1) ? _0x3fb0c6['lJbyg'] : retmsg) + '\"');
                        if (ret === 0x0 && _0x3fb0c6['ygikq'](right, 0x1)) {
                            $['drip'] += eachtimeget;
                        }
                        if (_0x3fb0c6['ygikq'](ret, 0x3f9) || ret === 0x3f4) {
                            _0x462b4c();
                            return;
                        }
                        if ((_0x3fb0c6['BgtNw'](ret, 0x0) && ret !== 0x405 || retmsg === _0x3fb0c6['BkRfm']) && _0x3fb0c6['wgIEl']($['answer'], 0x0)) {
                            if (_0x3fb0c6['BgtNw'](_0x3fb0c6['Ennqt'], _0x3fb0c6['CmSNR'])) {
                                $['answer']--;
                                await $['wait'](0x3e8);
                                await answerTask();
                            } else {
                                dayGet += item['score'];
                            }
                        }
                    }
                } catch (_0x390f1e) {
                    $['logErr'](_0x390f1e, _0x23a7c4);
                } finally {
                    if (_0x3fb0c6['ygikq'](_0x3fb0c6['rOmLv'], _0x3fb0c6['wqQcF'])) {
                        console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\x0a');
                        _0x2efd68['svoTh'](_0x462b4c, null);
                    } else {
                        _0x3fb0c6['cNnyR'](_0x462b4c);
                    }
                }
            } else {
                if (jdJxncShareCodeNode[item]) {
                    jxncShareCodeArr['push'](jdJxncShareCodeNode[item]);
                } else {
                    jxncShareCodeArr['push']('');
                }
            }
        });
    });
}

function getMessage(_0x4d80d9, _0x568a39) {
    var _0x1b311f = {
        'mNqwD': '请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie',
        'Kxlze': function(_0x12c585, _0xc6c42e) {
            return _0x12c585 !== _0xc6c42e;
        },
        'JPgLo': 'PTCgv',
        'vDmoj': function(_0x1b1f9d, _0x55b4bd) {
            return _0x1b1f9d >= _0x55b4bd;
        },
        'rKcvp': function(_0x64d91a, _0x505493) {
            return _0x64d91a === _0x505493;
        },
        'kjBTj': 'rGWcv',
        'MvPOU': function(_0x34cddd, _0x570871) {
            return _0x34cddd(_0x570871);
        },
        'yMyAh': function(_0x5b024b) {
            return _0x5b024b();
        },
        'jqwHX': function(_0x4ba1be, _0x5dd861) {
            return _0x4ba1be - _0x5dd861;
        },
        'skFJy': function(_0x3d578, _0x493291) {
            return _0x3d578 / _0x493291;
        },
        'GVvfg': function(_0x35db56, _0x1ddbbc) {
            return _0x35db56 <= _0x1ddbbc;
        },
        'JkDHG': function(_0x17e70c, _0x4e5882) {
            return _0x17e70c > _0x4e5882;
        },
        'gGpWM': function(_0x214069, _0x2d6d16) {
            return _0x214069 > _0x2d6d16;
        },
        'LScyr': function(_0x3ff6cd, _0x592360) {
            return _0x3ff6cd > _0x592360;
        },
        'nXhWD': function(_0x47f1af, _0x5274ab) {
            return _0x47f1af + _0x5274ab;
        },
        'qSaih': 'RrMDi',
        'xtLBX': 'gWkkm'
    };
    const _0x1406ff = _0x1b311f['jqwHX'](_0x4d80d9['target'], _0x4d80d9['score']);
    const _0x3a13c9 = _0x4d80d9['modifyscore'];
    const _0x553b04 = _0x568a39['modifyscore'];
    let _0x286241 = 0x0;
    if ($['detail']) {
        let _0x23e7a1 = _0x1b311f['skFJy'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
        $['detail']['forEach'](function(_0x70939f, _0x310daa) {
            var _0x3546be = {
                'AeMdy': function(_0x20cb72, _0x328bbb) {
                    return _0x20cb72(_0x328bbb);
                }
            };
            if (_0x1b311f['Kxlze']('PTCgv', _0x1b311f['JPgLo'])) {
                console['log'](e);
                $['msg']($['name'], '', _0x1b311f['mNqwD']);
                return [];
            } else {
                if (_0x1b311f['vDmoj'](_0x70939f['time'], _0x23e7a1) && _0x70939f['score']) {
                    if (_0x1b311f['rKcvp'](_0x1b311f['kjBTj'], _0x1b311f['kjBTj'])) {
                        _0x286241 += _0x70939f['score'];
                    } else {
                        _0x3546be['AeMdy'](resolve, ![]);
                    }
                }
            }
        });
    }
    message += '【水滴】本次获得' + _0x3a13c9 + ' 离线获得' + _0x553b04 + ' 今日获得' + _0x286241 + ' 还需水滴' + _0x1406ff + '\x0a';
    if (_0x1b311f['GVvfg'](_0x1406ff, 0x0)) {
        notifyBool = !![];
        message += '【成熟】水果已成熟请及时收取，deliverState：' + _0x4d80d9['deliverState'] + '\x0a';
        return;
    }
    if (_0x1b311f['JkDHG'](_0x3a13c9, 0x0) || _0x1b311f['gGpWM'](_0x553b04, 0x0) || _0x1b311f['gGpWM'](_0x286241, 0x0)) {
        const _0x5aa316 = Math['ceil'](_0x1b311f['skFJy'](_0x1406ff, _0x1b311f['LScyr'](_0x286241, 0x0) ? _0x286241 : _0x1b311f['nXhWD'](_0x3a13c9, _0x553b04)));
        message += '【预测】还需 ' + _0x5aa316 + ' 天\x0a';
    }
    if (_0x3a13c9 > 0x0 || _0x553b04 > 0x0) {
        notifyBool = notifyBool && _0x1b311f['vDmoj'](notifyLevel, 0x1);
    } else {
        if (_0x1b311f['qSaih'] !== _0x1b311f['xtLBX']) {
            notifyBool = notifyBool && notifyLevel >= 0x2;
        } else {
            let _0x334968 = _0x1b311f['MvPOU'](uuid, 0x28);
            let _0x276d96 = (+new Date())['toString']();
            if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
                console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\n');
                _0x1b311f['MvPOU'](resolve, null);
            }
            let _0x4d00aa = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
            let _0x1cfbfe = $['md5']('' + decodeURIComponent(_0x4d00aa) + _0x276d96 + _0x334968 + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
            currentToken = {
                'timestamp': _0x276d96,
                'phoneid': _0x334968,
                'farm_jstoken': _0x1cfbfe
            };
            _0x1b311f['yMyAh'](resolve);
        }
    }
}

function submitInviteId(_0x5331b7) {
    var _0xb6d513 = {
        'FODFV': '【邀请码】提交成功！\n',
        'SSZmV': '邀请码提交失败 API 返回异常',
        'kJvcR': function(_0x1ab805, _0x427576) {
            return _0x1ab805 === _0x427576;
        },
        'rVluT': 'QYZXB',
        'xotvH': function(_0x3a3d85, _0x4578ae) {
            return _0x3a3d85 + _0x4578ae;
        },
        'juicX': function(_0x4b5609, _0xd59550) {
            return _0x4b5609(_0xd59550);
        },
        'LwNsY': 'false',
        'kuWdc': 'NKHUk',
        'JQyur': function(_0x1a4057, _0x46be45) {
            return _0x1a4057 !== _0x46be45;
        },
        'xbHCV': 'qovJz',
        'ITvAA': function(_0x4649ea) {
            return _0x4649ea();
        },
        'Cfzab': function(_0x2b60df, _0x1a1f85) {
            return _0x2b60df !== _0x1a1f85;
        },
        'VcjOF': 'QffEI',
        'kBlaS': function(_0x5b60e5) {
            return _0x5b60e5();
        }
    };
    return new Promise(_0x52e480 => {
        var _0xb3bdd1 = {
            'FfArf': function(_0x7805ef, _0x4a10b5) {
                return _0xb6d513['kJvcR'](_0x7805ef, _0x4a10b5);
            },
            'Rpehc': _0xb6d513['LwNsY'],
            'fmYrz': _0xb6d513['FODFV']
        };
        if ('hXGVu' !== _0xb6d513['kuWdc']) {
            if (!$['info'] || !$['info']['smp']) {
                if (_0xb6d513['JQyur'](_0xb6d513['xbHCV'], _0xb6d513['xbHCV'])) {
                    $['done']();
                } else {
                    _0xb6d513['ITvAA'](_0x52e480);
                    return;
                }
            }
            try {
                if (_0xb6d513['Cfzab'](_0xb6d513['VcjOF'], _0xb6d513['VcjOF'])) {
                    Object['keys'](jdCookieNode)['forEach'](_0x3d59e7 => {
                        if (jdCookieNode[_0x3d59e7]) {
                            cookieArr['push'](jdCookieNode[_0x3d59e7]);
                        }
                    });
                    if (process['env']['JD_DEBUG'] && _0xb3bdd1['FfArf'](process['env']['JD_DEBUG'], _0xb3bdd1['Rpehc'])) console['log'] = () => {};
                } else {
                    $['post']({
                        'url': 'https://api.ninesix.cc/api/jx-nc/' + $['info']['smp'] + '/' + _0xb6d513['juicX'](encodeURIComponent, _0x5331b7) + '?active=' + $['info']['active'] + '&joinnum=' + $['info']['joinnum'],
                        'timeout': 0x2710
                    }, (_0x3ffc40, _0x2eb380, _0x4504b6) => {
                        try {
                            if ('mDmDf' !== 'mDmDf') {
                                $['logErr'](e, _0x2eb380);
                            } else {
                                const {
                                    code,
                                    data = {}
                                } = JSON['parse'](_0x4504b6);
                                $['log']('邀请码提交：' + code);
                                if (data['value']) {
                                    message += _0xb6d513['FODFV'];
                                }
                            }
                        } catch (_0x3c68cc) {
                            $['log'](_0xb6d513['SSZmV']);
                        } finally {
                            if (_0xb6d513['kJvcR'](_0xb6d513['rVluT'], _0xb6d513['rVluT'])) {
                                _0x52e480();
                            } else {
                                message += _0xb3bdd1['fmYrz'];
                            }
                        }
                    });
                }
            } catch (_0x4e514d) {
                _0xb6d513['kBlaS'](_0x52e480);
            }
        } else {
            let _0x2fd200 = {
                'smp': value,
                'active': extra['active'],
                'joinnum': extra['joinnum'] || 0x1
            };
            $['log'](_0xb6d513['xotvH']('获取随机助力码成功 ', JSON['stringify'](_0x2fd200)));
            _0xb6d513['juicX'](_0x52e480, _0x2fd200);
            return;
        }
    });
}

function getAssistUser() {
    var _0x166df2 = {
        'fBYOC': function(_0x1fac8f, _0x1c5cb2) {
            return _0x1fac8f >= _0x1c5cb2;
        },
        'GnSio': function(_0x2b5965, _0x321872) {
            return _0x2b5965 / _0x321872;
        },
        'VmCMT': function(_0x46996a, _0x5e9577) {
            return _0x46996a === _0x5e9577;
        },
        'ZplPj': 'ImTow',
        'tnriq': function(_0x245e7b, _0xe80f69) {
            return _0x245e7b(_0xe80f69);
        },
        'fOHic': function(_0x6bd8f1, _0x2779d9) {
            return _0x6bd8f1(_0x2779d9);
        }
    };
    return new Promise(_0x409efa => {
        try {
            $['get']({
                'url': 'http://120.76.219.92:18880/api/jx-nc?active=' + $['info']['active'],
                'timeout': 0x2710
            }, async (_0x1a8d35, _0x294a28, _0x363cd4) => {
                var _0x259cfd = {
                    'EOrkX': function(_0x301a8a, _0x42c1ed) {
                        return _0x166df2['fBYOC'](_0x301a8a, _0x42c1ed);
                    },
                    'MrXwk': function(_0xb20a38, _0x20ac29) {
                        return _0x166df2['GnSio'](_0xb20a38, _0x20ac29);
                    }
                };
                try {
                    if (_0x166df2['VmCMT']('dqFqp', _0x166df2['ZplPj'])) {
                        var _0x32a62d = {
                            'drlNA': function(_0x2c22ae, _0x31a99f) {
                                return _0x259cfd['EOrkX'](_0x2c22ae, _0x31a99f);
                            }
                        };
                        let _0x39ab3a = _0x259cfd['MrXwk'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
                        $['detail']['forEach'](function(_0x53a368, _0x5d86de) {
                            if (_0x32a62d['drlNA'](_0x53a368['time'], _0x39ab3a) && _0x53a368['score']) {
                                dayGet += _0x53a368['score'];
                            }
                        });
                    } else {
                        const {
                            code,
                            data: {
                                value,
                                extra = {}
                            } = {}
                        } = JSON['parse'](_0x363cd4);
                        if (value && extra['active']) {
                            let _0x1c41a5 = {
                                'smp': value,
                                'active': extra['active'],
                                'joinnum': extra['joinnum'] || 0x1
                            };
                            $['log']('获取随机助力码成功 ' + JSON['stringify'](_0x1c41a5));
                            _0x166df2['tnriq'](_0x409efa, _0x1c41a5);
                            return;
                        } else {
                            $['log']('获取随机助力码失败 ' + code);
                        }
                    }
                } catch (_0x5078b0) {
                    $['log']('获取随机助力码失败 API 返回异常');
                } finally {
                    _0x409efa(![]);
                }
            });
        } catch (_0x1d10d7) {
            _0x166df2['fOHic'](_0x409efa, ![]);
        }
    });
}
async function helpFriends() {
    var _0x55f4ac = {
        'eVUAV': function(_0x3b8218, _0x2fc39f) {
            return _0x3b8218(_0x2fc39f);
        },
        'vAVdQ': '助力码非 json 格式，跳过',
        'YKrLt': 'smp',
        'UDzBN': 'active',
        'SYucZ': 'joinnum'
    };
    for (let _0x2c9283 of currentShareCode) {
        if (!_0x2c9283) {
            continue;
        }
        let _0x470a9e = _0x55f4ac['eVUAV'](changeShareCodeJson, _0x2c9283);
        if (!_0x470a9e) {
            console['log'](_0x55f4ac['vAVdQ']);
            continue;
        }
        const _0x18b4b8 = await helpShareCode(_0x470a9e[_0x55f4ac['YKrLt']], _0x470a9e[_0x55f4ac['UDzBN']], _0x470a9e[_0x55f4ac['SYucZ']]);
        if (!_0x18b4b8) {
            return ![];
        }
        await $['wait'](0x3e8);
    }
    return !![];
}

function helpShareCode(_0x595279, _0x5342a9, _0x35eed6) {
    var _0x3f1cf5 = {
        'hZGcj': function(_0x53cbc6, _0x41b320) {
            return _0x53cbc6 - _0x41b320;
        },
        'pRSaF': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'LGjEo': '获取随机助力码失败 API 返回异常',
        'NiKuD': 'OJIYN',
        'Xfmaq': function(_0x3c5ed0, _0xb5c6de) {
            return _0x3c5ed0 !== _0xb5c6de;
        },
        'ACwbN': 'AWoPd',
        'ZQhAn': 'lqpej',
        'dcoPy': 'hHfpc',
        'oVHVU': function(_0x3091aa, _0x395ff8) {
            return _0x3091aa === _0x395ff8;
        },
        'mSHAf': function(_0x412b6b, _0x2e3d81) {
            return _0x412b6b(_0x2e3d81);
        },
        'BdwNp': 'zQEFs',
        'bcipH': '助力码与当前账号相同，跳过助力。准备进行下一个助力',
        'feEhG': function(_0x422eb4, _0x30e2c5) {
            return _0x422eb4(_0x30e2c5);
        },
        'kSAYc': function(_0x5298e5, _0x5caa23, _0x4eff9f) {
            return _0x5298e5(_0x5caa23, _0x4eff9f);
        },
        'yrlFO': 'help'
    };
    return new Promise(async _0x240604 => {
        if (_0x3f1cf5['oVHVU'](_0x595279, $['info']['smp'])) {
            $['log'](_0x3f1cf5['bcipH']);
            _0x3f1cf5['feEhG'](_0x240604, !![]);
        }
        $['log']('即将助力 share {"smp":"' + _0x595279 + '\",\"active\":\"' + _0x5342a9 + '\",\"joinnum\":\"' + _0x35eed6 + '\"}');
        $['get'](_0x3f1cf5['kSAYc'](taskUrl, _0x3f1cf5['yrlFO'], 'active=' + _0x5342a9 + '&joinnum=' + _0x35eed6 + '&smp=' + _0x595279), async (_0x45edaf, _0x54083a, _0x337768) => {
            var _0x510b10 = {
                'LGYWy': function(_0x280275, _0x2062da) {
                    return _0x280275 - _0x2062da;
                },
                'QstWu': function(_0x3471d1, _0x3bdd3c) {
                    return _0x3f1cf5['hZGcj'](_0x3471d1, _0x3bdd3c);
                },
                'Ctjob': function(_0x390ef1, _0x658a09) {
                    return _0x390ef1 === _0x658a09;
                },
                'rBWIT': _0x3f1cf5['pRSaF'],
                'HeliP': function(_0x51fa11, _0x1ecb73) {
                    return _0x51fa11 >= _0x1ecb73;
                },
                'GlBVf': _0x3f1cf5['LGjEo']
            };
            if ('dwylq' !== _0x3f1cf5['NiKuD']) {
                try {
                    if (_0x3f1cf5['Xfmaq']('AWoPd', _0x3f1cf5['ACwbN'])) {
                        if (tokenArr[_0x510b10['LGYWy']($['index'], 0x1)] && tokenArr[_0x510b10['LGYWy']($['index'], 0x1)]['farm_jstoken']) {
                            currentToken = tokenArr[_0x510b10['QstWu']($['index'], 0x1)];
                        } else {
                            currentToken = tokenNull;
                        }
                        _0x240604();
                    } else {
                        let _0x3d230c = _0x337768['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                        if (_0x3d230c) {
                            if (_0x3f1cf5['Xfmaq'](_0x3f1cf5['ZQhAn'], _0x3f1cf5['dcoPy'])) {
                                _0x3d230c = _0x3d230c[0x1];
                                const {
                                    ret,
                                    retmsg = ''
                                } = JSON['parse'](_0x3d230c);
                                $['log']('助力结果：ret=' + ret + ' retmsg=\"' + (retmsg ? retmsg : 'OK') + '\"');
                                if (_0x3f1cf5['oVHVU'](ret, 0x93) || _0x3f1cf5['oVHVU'](ret, 0x3f8)) {
                                    if (ret === 0x93) {
                                        $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                                    }
                                    _0x3f1cf5['mSHAf'](_0x240604, ![]);
                                    return;
                                }
                                _0x240604(!![]);
                            } else {
                                if (_0x510b10['Ctjob'](startInfo['activestatus'], 0x2)) {
                                    notifyBool = !![];
                                    $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                                    message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                                } else if (startInfo['activestatus'] === 0x0) {
                                    $['log'](_0x510b10['rBWIT']);
                                    message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                                    notifyBool = notifyBool && _0x510b10['HeliP'](notifyLevel, 0x3);
                                }
                            }
                        }
                    }
                } catch (_0x23e016) {
                    if (_0x3f1cf5['oVHVU']('zQEFs', _0x3f1cf5['BdwNp'])) {
                        $['logErr'](_0x23e016, _0x54083a);
                    } else {
                        $['log'](_0x510b10['GlBVf']);
                    }
                } finally {
                    _0x3f1cf5['mSHAf'](_0x240604, ![]);
                }
            } else {
                notifyBool = !![];
                message += '【成熟】水果已成熟请及时收取，deliverState：' + endInfo['deliverState'] + '\x0a';
                return;
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
    var _0xbe87cb = {
        'RztgZ': 'pvNZY',
        'uEcme': function(_0x5f37cd, _0x769378) {
            return _0x5f37cd === _0x769378;
        },
        'aEVcg': 'YIkme',
        'fgMne': function(_0x662859, _0x57f59a) {
            return _0x662859 !== _0x57f59a;
        },
        'UUDQl': '活动太火爆了',
        'OkWAT': 'BonrP',
        'IwYeB': 'rYsLG',
        'vitNL': function(_0x78c36d, _0x41285c) {
            return _0x78c36d === _0x41285c;
        },
        'oNfOA': 'pxrCm',
        'OmGKJ': function(_0x470e35) {
            return _0x470e35();
        },
        'cvsfa': function(_0x10f464, _0xe70d99) {
            return _0x10f464 !== _0xe70d99;
        },
        'ykfyp': '任务进行中或者未到任务时间',
        'MHIcq': function(_0x251399, _0x2bc329) {
            return _0x251399 === _0x2bc329;
        },
        'SEQBq': function(_0x1a2665, _0x3e8fe1) {
            return _0x1a2665(_0x3e8fe1);
        },
        'sgvNY': function(_0x31b881, _0x151f55) {
            return _0x31b881 - _0x151f55;
        },
        'dDNjA': function(_0x4a5b6c) {
            return _0x4a5b6c();
        },
        'uPrKA': 'LtrKY',
        'zsSbQ': function(_0x4a0a2d, _0xaafdb8) {
            return _0x4a0a2d <= _0xaafdb8;
        },
        'LOrvV': 'Ufrfc',
        'ARBVt': 'kuZzK',
        'zEtOZ': function(_0x58c07b, _0x2cfdaa) {
            return _0x58c07b(_0x2cfdaa);
        },
        'whiPx': function(_0x16f942, _0x1476b5, _0x3f85ff) {
            return _0x16f942(_0x1476b5, _0x3f85ff);
        },
        'DefEW': function(_0x5a8f76, _0x5f5462) {
            return _0x5a8f76(_0x5f5462);
        },
        'hOsub': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    return new Promise(async _0x3cfc1d => {
        var _0x3522a3 = {
            'iFBoI': function(_0x3941a6, _0x28c679) {
                return _0xbe87cb['sgvNY'](_0x3941a6, _0x28c679);
            },
            'oPSKs': function(_0x54ac6c) {
                return _0xbe87cb['dDNjA'](_0x54ac6c);
            }
        };
        if (_0xbe87cb['uPrKA'] === 'LtrKY') {
            if (_0xbe87cb['zsSbQ'](_0xbe87cb['SEQBq'](parseInt, left), 0x0)) {
                if (_0xbe87cb['LOrvV'] !== _0xbe87cb['ARBVt']) {
                    $['log'](taskname + '[做任务]： 任务已完成，跳过');
                    _0xbe87cb['zEtOZ'](_0x3cfc1d, ![]);
                } else {
                    $['log']('获取随机助力码失败 ' + code);
                }
            }
            $['get'](_0xbe87cb['whiPx'](taskUrl, 'dotask', 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':D:0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0xbe87cb['DefEW'](encodeURIComponent, _0xbe87cb['hOsub'])), (_0x8e75d, _0x58c3c9, _0x3c92f2) => {
                try {
                    if (_0xbe87cb['RztgZ'] === 'iWOvi') {
                        if (jxncShareCodeArr[_0x3522a3['iFBoI']($['index'], 0x1)]) {
                            currentShareCode = jxncShareCodeArr[_0x3522a3['iFBoI']($['index'], 0x1)]['split']('@');
                            currentShareCode['push'](...shareCode['split']('@'));
                        } else {
                            $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                            currentShareCode = shareCode['split']('@');
                        }
                        $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
                        _0x3522a3['oPSKs'](_0x3cfc1d);
                    } else {
                        let _0x565502 = _0x3c92f2['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/);
                        if (_0x565502) {
                            if (_0xbe87cb['uEcme']('YIkme', _0xbe87cb['aEVcg'])) {
                                _0x565502 = _0x565502[0x1];
                                let {
                                    ret,
                                    retmsg
                                } = JSON['parse'](_0x565502);
                                retmsg = _0xbe87cb['fgMne'](retmsg, '') ? retmsg : '成功';
                                $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0xbe87cb['fgMne'](retmsg['indexOf'](_0xbe87cb['UUDQl']), -0x1) ? '任务进行中或者未到任务时间' : retmsg) + '\"');
                                if (_0xbe87cb['uEcme'](ret, 0x0)) {
                                    if (_0xbe87cb['OkWAT'] === _0xbe87cb['IwYeB']) {
                                        _0x3cfc1d(![]);
                                    } else {
                                        $['drip'] += eachtimeget;
                                    }
                                }
                                _0x3cfc1d(ret);
                            } else {
                                $['logErr'](e, _0x58c3c9);
                            }
                        }
                    }
                } catch (_0x3f8bf5) {
                    if (_0xbe87cb['vitNL'](_0xbe87cb['oNfOA'], 'WXmgV')) {
                        return '';
                    } else {
                        $['logErr'](_0x3f8bf5, _0x58c3c9);
                    }
                } finally {
                    _0xbe87cb['OmGKJ'](_0x3cfc1d);
                }
            });
        } else {
            res = res[0x1];
            let {
                ret,
                retmsg
            } = JSON['parse'](res);
            retmsg = retmsg !== '' ? retmsg : '成功';
            $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0xbe87cb['cvsfa'](retmsg['indexOf'](_0xbe87cb['UUDQl']), -0x1) ? _0xbe87cb['ykfyp'] : retmsg) + '\"');
            if (_0xbe87cb['MHIcq'](ret, 0x0)) {
                $['drip'] += eachtimeget;
            }
            _0xbe87cb['SEQBq'](_0x3cfc1d, ret);
        }
    });
}

function taskUrl(_0x1ba8bf, _0x6cf1fa) {
    var _0x16d4c1 = {
        'hDYOm': 'farm_jstoken',
        'unTLD': 'timestamp',
        'qQeHX': function(_0x326b9f, _0x17e276) {
            return _0x326b9f(_0x17e276);
        },
        'CXnnq': './USER_AGENTS',
        'arpCa': 'JDUA',
        'UqfjE': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return {
        'url': JXNC_API_HOST + 'cubeactive/farm/' + _0x1ba8bf + '?' + _0x6cf1fa + '&farm_jstoken=' + currentToken[_0x16d4c1['hDYOm']] + '&phoneid=' + currentToken['phoneid'] + '×tamp=' + currentToken[_0x16d4c1['unTLD']] + '&sceneval=2&g_login_type=1&callback=whyour&_=' + Date['now']() + '&g_ty=ls',
        'headers': {
            'Cookie': currentCookie,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://st.jingxi.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'wq.jd.com',
            'Accept-Language': 'zh-cn',
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x16d4c1['qQeHX'](require, _0x16d4c1['CXnnq'])['USER_AGENT'] : $['getdata'](_0x16d4c1['arpCa']) ? $['getdata'](_0x16d4c1['arpCa']) : _0x16d4c1['UqfjE']
        },
        'timeout': 0x2710
    };
}
async function showMsg() {
    var _0x5f0e9c = {
        'NlTKg': function(_0x2808bd, _0x219cd8) {
            return _0x2808bd === _0x219cd8;
        },
        'KRtzO': 'FyRWa',
        'mrWCY': function(_0x5ded98, _0x287300) {
            return _0x5ded98 !== _0x287300;
        }
    };
    if (notifyBool) {
        $['msg']($['name'], subTitle, message, option);
        if ($['isNode']()) {
            if (_0x5f0e9c['NlTKg'](_0x5f0e9c['KRtzO'], _0x5f0e9c['KRtzO'])) {
                allMessage += subTitle + '\x0a' + message + (_0x5f0e9c['mrWCY']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
            } else {
                resolve();
            }
        }
    } else {
        $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
    }
}

function getJxToken() {
    var _0x464173 = {
        'TKsJi': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'sjjMk': function(_0x128f10, _0x366a84) {
            return _0x128f10(_0x366a84);
        },
        'rmSIy': function(_0xdc4f52, _0x3362b6) {
            return _0xdc4f52(_0x3362b6);
        },
        'EHaSq': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'xRUab': function(_0xb524ab, _0x371b48) {
            return _0xb524ab < _0x371b48;
        },
        'eDivB': function(_0xc86cd0, _0x5c955e) {
            return _0xc86cd0 !== _0x5c955e;
        },
        'bZOzc': 'PgFOX',
        'IlKzV': 'QikxY',
        'JsMpd': function(_0x58f881, _0x4f75ed) {
            return _0x58f881(_0x4f75ed);
        },
        'ohkiW': function(_0x201189, _0x358ebd) {
            return _0x201189 * _0x358ebd;
        },
        'HtlcU': function(_0xbbfc8, _0x33a28a) {
            return _0xbbfc8(_0x33a28a);
        },
        'OcIwL': function(_0x59ae5a) {
            return _0x59ae5a();
        }
    };

    function _0x175128(_0x8df08d) {
        let _0xc0f0e4 = _0x464173['EHaSq'];
        let _0x163372 = '';
        for (let _0x56d717 = 0x0; _0x464173['xRUab'](_0x56d717, _0x8df08d); _0x56d717++) {
            if (_0x464173['eDivB'](_0x464173['bZOzc'], _0x464173['IlKzV'])) {
                _0x163372 += _0xc0f0e4[_0x464173['JsMpd'](parseInt, _0x464173['ohkiW'](Math['random'](), _0xc0f0e4['length']))];
            } else {
                res = res[0x1];
                const {
                    detail,
                    msg,
                    task = [],
                    retmsg,
                    ..._0x3c3ae8
                } = JSON['parse'](res);
                $['detail'] = detail;
                $['helpTask'] = task['filter'](_0x21a540 => _0x21a540['tasktype'] === 0x2)[0x0] || {
                    'eachtimeget': 0x0,
                    'limit': 0x0
                };
                $['allTask'] = task['filter'](_0x5c7d97 => _0x5c7d97['tasktype'] !== 0x3 && _0x5c7d97['tasktype'] !== 0x2 && parseInt(_0x5c7d97['left']) > 0x0);
                $['info'] = _0x3c3ae8;
                $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                if (!$['info']['active']) {
                    $['log'](_0x464173['TKsJi']);
                    message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                    notifyBool = notifyBool && notifyLevel >= 0x3;
                    _0x464173['sjjMk'](resolve, ![]);
                }
                _0x464173['rmSIy'](resolve, _0x3c3ae8);
            }
        }
        return _0x163372;
    }
    return new Promise(_0x167556 => {
        let _0x220385 = _0x464173['JsMpd'](_0x175128, 0x28);
        let _0x49e7a4 = (+new Date())['toString']();
        if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
            console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\x0a');
            _0x167556(null);
        }
        let _0x445f8c = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
        let _0x54c92e = $['md5']('' + _0x464173['HtlcU'](decodeURIComponent, _0x445f8c) + _0x49e7a4 + _0x220385 + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
        currentToken = {
            'timestamp': _0x49e7a4,
            'phoneid': _0x220385,
            'farm_jstoken': _0x54c92e
        };
        _0x464173['OcIwL'](_0x167556);
    });
}

function jsonParse(_0x36dc21) {
    var _0x3eb4fa = {
        'qHSVG': function(_0x2d60bb, _0x9ec333) {
            return _0x2d60bb == _0x9ec333;
        },
        'jmWZX': 'string',
        'vQDai': function(_0x44bf7c, _0x149e59) {
            return _0x44bf7c !== _0x149e59;
        },
        'bmfNl': 'VEfYy',
        'btkEb': 'nPYen',
        'kFxit': '请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie'
    };
    if (_0x3eb4fa['qHSVG'](typeof _0x36dc21, _0x3eb4fa['jmWZX'])) {
        try {
            return JSON['parse'](_0x36dc21);
        } catch (_0x1b16c0) {
            if (_0x3eb4fa['vQDai'](_0x3eb4fa['bmfNl'], _0x3eb4fa['btkEb'])) {
                console['log'](_0x1b16c0);
                $['msg']($['name'], '', _0x3eb4fa['kFxit']);
                return [];
            } else {
                jxncShareCodeArr['push']('');
            }
        }
    }
};
_0xodb = 'jsjiami.com.v6'

// prettier-ignore
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}