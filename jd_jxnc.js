/*
特别声明：
本脚本搬运自 https://github.com/whyour/hundun/blob/master/quanx/jx_nc.js
感谢 @whyour 大佬

无需京喜token,只需京东cookie即可.

京喜农场:脚本更新地址 https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jxnc.js
更新时间：2021-05-25
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
 *Progcessed By JSDec in 0.74s
 *JSDec - JSDec.js.org
 */
$['maxHelpNum'] = $['isNode']() ? 0x8 : 0x4;
$['helpNum'] = 0x0;
let assistUserShareCode = 0x0;
!(async () => {
    var _0x56d476 = {
        'hupHQ': function(_0xc15b19, _0x56ad40) {
            return _0xc15b19 >= _0x56ad40;
        },
        'KFHEl': '获取随机助力码失败 API 返回异常',
        'Npgus': '【提示】请先获取京东账号一cookie\x0a直接使用NobyDa的京东签到获取',
        'SHzLh': 'https://bean.m.jd.com/bean/signIndex.action',
        'kvfdw': function(_0x225d48, _0x32bf6b) {
            return _0x225d48 !== _0x32bf6b;
        },
        'UmmGM': 'pvnZS',
        'KBamj': function(_0x3efa15, _0x3a6faf) {
            return _0x3efa15(_0x3a6faf);
        },
        'zoepQ': function(_0x1aad76, _0x437aeb) {
            return _0x1aad76 + _0x437aeb;
        },
        'XIFvY': function(_0x5043ef) {
            return _0x5043ef();
        },
        'mnyFN': 'https://bean.m.jd.com/',
        'MGtBp': 'pt_pin',
        'ioOyO': function(_0x5312d7, _0x45b965) {
            return _0x5312d7 !== _0x45b965;
        },
        'ilnES': 'GZpOm',
        'aeIiG': 'xJazz'
    };
    await requireConfig();
    if (!cookieArr[0x0]) {
        if ('fqtCX' !== 'VXSix') {
            $['msg']($['name'], _0x56d476['Npgus'], 'https://bean.m.jd.com/bean/signIndex.action', {
                'open-url': _0x56d476['SHzLh']
            });
            return;
        } else {
            $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + e + '!', '');
            console['log'](e);
        }
    }
    for (let _0x414150 = 0x0; _0x414150 < cookieArr['length']; _0x414150++) {
        if (cookieArr[_0x414150]) {
            if (_0x56d476['kvfdw'](_0x56d476['UmmGM'], _0x56d476['UmmGM'])) {
                notifyBool = notifyBool && _0x56d476['hupHQ'](notifyLevel, 0x2);
            } else {
                currentCookie = cookieArr[_0x414150];
                $['UserName'] = _0x56d476['KBamj'](decodeURIComponent, currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/) && currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
                $['index'] = _0x56d476['zoepQ'](_0x414150, 0x1);
                $['isLogin'] = !![];
                $['nickName'] = '';
                $['log']('\n************* 检查【京东账号' + $['index'] + '】' + $['UserName'] + ' cookie 是否有效 *************');
                await _0x56d476['XIFvY'](TotalBean);
                $['log']('开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '\x0a');
                if (!$['isLogin']) {
                    $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
                        'open-url': _0x56d476['mnyFN']
                    });
                    if ($['isNode']()) {
                        await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\n请重新登录获取cookie');
                    }
                    continue;
                }
                if (currentCookie['includes'](_0x56d476['MGtBp'])) await _0x56d476['XIFvY'](getJxToken);
                subTitle = '';
                message = '';
                option = {};
                $['answer'] = 0x3;
                $['helpNum'] = 0x0;
                notifyBool = notifyLevel > 0x0;
                await shareCodesFormat();
                await _0x56d476['XIFvY'](jdJXNC);
            }
        }
    }
    if ($['isNode']() && allMessage) {
        if (_0x56d476['ioOyO'](_0x56d476['ilnES'], _0x56d476['aeIiG'])) {
            await notify['sendNotify']('' + $['name'], '' + allMessage);
        } else {
            $['log'](_0x56d476['KFHEl']);
        }
    }
})()['catch'](_0x30ecbe => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x30ecbe + '!', '');
    console['log'](_0x30ecbe);
})['finally'](() => {
    $['done']();
});

function changeShareCodeJson(_0x38a099) {
    var _0x4b304f = {
        'zPVPI': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'tFsAo': '助力码与当前账号相同，跳过助力。准备进行下一个助力',
        'FNVQb': function(_0x4160bb, _0x1c4bdd) {
            return _0x4160bb === _0x1c4bdd;
        },
        'fyIaV': 'uxnGE',
        'alGsh': 'NVYmv',
        'Otrjj': 'active',
        'QigDW': function(_0xbf47d2, _0x268e92) {
            return _0xbf47d2 !== _0x268e92;
        },
        'nAPIr': 'gxJJd'
    };
    try {
        if (_0x4b304f['FNVQb'](_0x4b304f['fyIaV'], _0x4b304f['alGsh'])) {
            try {
                return JSON['parse'](str);
            } catch (_0x5c97cd) {
                console['log'](_0x5c97cd);
                $['msg']($['name'], '', _0x4b304f['zPVPI']);
                return [];
            }
        } else {
            let _0x1f843d = _0x38a099 && JSON['parse'](_0x38a099);
            return _0x1f843d['smp'] && _0x1f843d[_0x4b304f['Otrjj']] && _0x1f843d['joinnum'] ? _0x1f843d : '';
        }
    } catch (_0x4546d1) {
        if (_0x4b304f['QigDW'](_0x4b304f['nAPIr'], _0x4b304f['nAPIr'])) {
            $['log'](_0x4b304f['tFsAo']);
            resolve(!![]);
        } else {
            return '';
        }
    }
}

function requireConfig() {
    var _0x3a4f83 = {
        'fyEWM': function(_0x31a8a5, _0x324d01) {
            return _0x31a8a5 !== _0x324d01;
        },
        'IvaME': '活动太火爆了',
        'EroSr': '任务进行中或者未到任务时间',
        'sQHUk': function(_0x107057, _0x106609) {
            return _0x107057 === _0x106609;
        },
        'OEziV': function(_0x53c5c2, _0x1ca099) {
            return _0x53c5c2(_0x1ca099);
        },
        'FaPox': 'Xijfz',
        'nIyvT': 'KYhPC',
        'YUbOo': '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。',
        'tHFLY': function(_0x40baee, _0x443385) {
            return _0x40baee >= _0x443385;
        },
        'ycDDe': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'GkoaJ': function(_0x14564d, _0x2ab193) {
            return _0x14564d === _0x2ab193;
        },
        'xImfL': '开始获取配置文件\n',
        'hGylC': './sendNotify',
        'NQcmZ': './jdCookie.js',
        'uNSxH': './jdJxncShareCodes.js',
        'xYxKX': 'tmvvD',
        'JxdaF': 'CookieJD',
        'ejHAO': 'CookiesJD',
        'iiipr': 'lHTyl',
        'atAHc': function(_0x1cc285, _0x5a3db6) {
            return _0x1cc285 === _0x5a3db6;
        },
        'HPeNW': 'GuqJx',
        'SqyMz': '互助码格式变更通知',
        'wTTLw': '互助码格式变更，请重新填写 ‼️‼️',
        'SVLSJ': function(_0x57ca70, _0x1f9f96) {
            return _0x57ca70 === _0x1f9f96;
        },
        'fGhJh': 'JxFim',
        'PTETG': 'KfzWP',
        'uXGgi': 'application/json,text/plain, */*',
        'kqciE': 'application/x-www-form-urlencoded',
        'SwELd': 'keep-alive',
        'aYuAg': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        'TALwE': function(_0x57355d) {
            return _0x57355d();
        }
    };
    return new Promise(async _0x263ad1 => {
        var _0x263d7a = {
            'zVXmS': function(_0x48dec7, _0x23060d) {
                return _0x48dec7 === _0x23060d;
            },
            'JiJEl': _0x3a4f83['FaPox'],
            'gJrXJ': 'WbJHg',
            'htSBA': function(_0x4a13fd, _0x5ebcbf) {
                return _0x4a13fd / _0x5ebcbf;
            },
            'CCSue': function(_0x4855b3, _0x3c095e) {
                return _0x3a4f83['fyEWM'](_0x4855b3, _0x3c095e);
            },
            'ZTXbt': _0x3a4f83['nIyvT'],
            'NZSbS': _0x3a4f83['YUbOo'],
            'GXCnc': function(_0x2c1fcc, _0x1a71cc) {
                return _0x3a4f83['tHFLY'](_0x2c1fcc, _0x1a71cc);
            },
            'xfOaa': _0x3a4f83['ycDDe'],
            'smvmL': function(_0x9daadc, _0x2af28c) {
                return _0x3a4f83['tHFLY'](_0x9daadc, _0x2af28c);
            },
            'awTOa': function(_0x49f45c, _0x43611e) {
                return _0x49f45c(_0x43611e);
            }
        };
        if (_0x3a4f83['GkoaJ']('ircxM', 'ircxM')) {
            $['log'](_0x3a4f83['xImfL']);
            notify = $['isNode']() ? require(_0x3a4f83['hGylC']) : '';
            const _0x35e0e5 = $['isNode']() ? _0x3a4f83['OEziV'](require, _0x3a4f83['NQcmZ']) : '';
            const _0x314440 = $['isNode']() ? require(_0x3a4f83['uNSxH']) : {};
            if ($['isNode']()) {
                Object['keys'](_0x35e0e5)['forEach'](_0x21746d => {
                    if (_0x263d7a['zVXmS'](_0x263d7a['JiJEl'], _0x263d7a['JiJEl'])) {
                        if (_0x35e0e5[_0x21746d]) {
                            if (_0x263d7a['zVXmS']('WbJHg', _0x263d7a['gJrXJ'])) {
                                cookieArr['push'](_0x35e0e5[_0x21746d]);
                            } else {
                                $['nickName'] = $['UserName'];
                            }
                        }
                    } else {
                        notifyBool = !![];
                        $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                        message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                    }
                });
                if (process['env']['JD_DEBUG'] && _0x3a4f83['GkoaJ'](process['env']['JD_DEBUG'], 'false')) console['log'] = () => {};
            } else {
                if (_0x3a4f83['GkoaJ']('tmvvD', _0x3a4f83['xYxKX'])) {
                    cookieArr = [$['getdata'](_0x3a4f83['JxdaF']), $['getdata']('CookieJD2'), ...jsonParse($['getdata'](_0x3a4f83['ejHAO']) || '[]')['map'](_0x1d2887 => _0x1d2887['cookie'])]['filter'](_0x337b96 => !!_0x337b96);
                } else {
                    let _0x537bbd = _0x263d7a['htSBA'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
                    $['detail']['forEach'](function(_0x55a42a, _0x29f69b) {
                        if (_0x55a42a['time'] >= _0x537bbd && _0x55a42a['score']) {
                            dayGet += _0x55a42a['score'];
                        }
                    });
                }
            }
            $['log']('共' + cookieArr['length'] + '个京东账号\n');
            if ($['isNode']()) {
                if (_0x3a4f83['iiipr'] === 'lHTyl') {
                    Object['keys'](_0x314440)['forEach'](_0x34a002 => {
                        if (_0x263d7a['CCSue']('tSMSh', _0x263d7a['ZTXbt'])) {
                            if (_0x314440[_0x34a002]) {
                                jxncShareCodeArr['push'](_0x314440[_0x34a002]);
                            } else {
                                jxncShareCodeArr['push']('');
                            }
                        } else {
                            if (!err) {
                                shareCode = data;
                            }
                        }
                    });
                } else {
                    const _0xc9d1e = data['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    let {
                        ret,
                        retmsg
                    } = JSON['parse'](_0xc9d1e);
                    retmsg = _0x3a4f83['fyEWM'](retmsg, '') ? retmsg : '成功';
                    $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (retmsg['indexOf'](_0x3a4f83['IvaME']) !== -0x1 ? _0x3a4f83['EroSr'] : retmsg) + '\"');
                    if (_0x3a4f83['sQHUk'](ret, 0x0)) {
                        $['drip'] += eachtimeget;
                    }
                    _0x3a4f83['OEziV'](_0x263ad1, ret);
                }
            }
            for (let _0x49ca1d = 0x0; _0x49ca1d < jxncShareCodeArr['length']; _0x49ca1d++) {
                if (_0x3a4f83['atAHc']('GuqJx', _0x3a4f83['HPeNW'])) {
                    if (jxncShareCodeArr[_0x49ca1d]) {
                        let _0x44f576 = jxncShareCodeArr[_0x49ca1d];
                        let _0x42133f = _0x44f576['split']('@');
                        if (!_0x3a4f83['OEziV'](changeShareCodeJson, _0x42133f[0x0])) {
                            $['log']('互助码格式已变更，请重新填写互助码');
                            $['msg']($['name'], _0x3a4f83['SqyMz'], _0x3a4f83['wTTLw'], option);
                            if ($['isNode']()) {
                                if (_0x3a4f83['SVLSJ'](_0x3a4f83['fGhJh'], _0x3a4f83['PTETG'])) {
                                    $['log'](_0x263d7a['NZSbS']);
                                    message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                                    notifyBool = notifyBool && _0x263d7a['GXCnc'](notifyLevel, 0x3);
                                } else {
                                    await notify['sendNotify']('' + $['name'], '互助码格式变更，请重新填写 ‼️‼️');
                                }
                            }
                        }
                        break;
                    }
                } else {
                    $['log'](_0x263d7a['NZSbS']);
                    message += _0x263d7a['xfOaa'];
                    notifyBool = notifyBool && _0x263d7a['smvmL'](notifyLevel, 0x3);
                    _0x263d7a['awTOa'](_0x263ad1, ![]);
                }
            }
            $['log']('您提供了' + jxncShareCodeArr['length'] + '个账号的京喜农场助力码');
            try {
                let _0x1d3cb9 = {
                    'url': 'http://120.76.219.92:18880/share_code/jxnc_code.txt',
                    'headers': {
                        'Accept': _0x3a4f83['uXGgi'],
                        'Content-Type': _0x3a4f83['kqciE'],
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'zh-cn',
                        'Connection': _0x3a4f83['SwELd'],
                        'User-Agent': _0x3a4f83['aYuAg']
                    },
                    'timeout': 0x2710
                };
                $['get'](_0x1d3cb9, (_0x58a1f9, _0x27f4cf, _0xcb2953) => {
                    if (!_0x58a1f9) {
                        shareCode = _0xcb2953;
                    }
                });
            } catch (_0x224ee9) {}
            _0x3a4f83['TALwE'](_0x263ad1);
        } else {
            return '';
        }
    });
}

function TotalBean() {
    var _0x4eaaea = {
        'cMpDz': function(_0x15503b, _0x189912) {
            return _0x15503b - _0x189912;
        },
        'qJjsq': 'https://bean.m.jd.com/bean/signIndex.action',
        'EmBQJ': '请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie',
        'EmTxy': 'active',
        'bpsqX': function(_0x1e3989, _0x4960b9) {
            return _0x1e3989 === _0x4960b9;
        },
        'rJxGI': 'DnQky',
        'hMETs': function(_0x24e879, _0x1f4c1f) {
            return _0x24e879 === _0x1f4c1f;
        },
        'LePTQ': 'YHyit',
        'yeCnO': 'hXgxY',
        'yukiX': function(_0x21a22a, _0x4ae9f4) {
            return _0x21a22a !== _0x4ae9f4;
        },
        'jEIgD': 'eIhcf',
        'QlEOZ': function(_0xf480d2, _0xfc17d6) {
            return _0xf480d2 === _0xfc17d6;
        },
        'RLJZx': function(_0x54b22c, _0x1ce90a) {
            return _0x54b22c !== _0x1ce90a;
        },
        'tGpOy': 'phXIr',
        'bsORf': 'base',
        'DLSVj': 'Fhkpx',
        'JOetv': function(_0x368560) {
            return _0x368560();
        },
        'nPcbm': function(_0x563b7d) {
            return _0x563b7d();
        },
        'HghOn': function(_0x46ca33, _0x34eae1) {
            return _0x46ca33 === _0x34eae1;
        },
        'bRgUc': 'EhyEI',
        'vPZQs': 'application/json,text/plain, */*',
        'XVwsn': 'gzip, deflate, br',
        'FrUMB': 'keep-alive',
        'Mffuz': './USER_AGENTS',
        'DXSwa': 'JDUA',
        'OdhbJ': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return new Promise(async _0x7e61b => {
        var _0xdb527d = {
            'ztNkj': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子',
            'Uumwu': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\x0a',
            'Epbss': function(_0x17a5f8, _0x374fb0) {
                return _0x17a5f8(_0x374fb0);
            }
        };
        if (_0x4eaaea['HghOn'](_0x4eaaea['bRgUc'], _0x4eaaea['bRgUc'])) {
            const _0x4037f6 = {
                'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
                'headers': {
                    'Accept': _0x4eaaea['vPZQs'],
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': _0x4eaaea['XVwsn'],
                    'Accept-Language': 'zh-cn',
                    'Connection': _0x4eaaea['FrUMB'],
                    'Cookie': currentCookie,
                    'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
                    'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : require(_0x4eaaea['Mffuz'])['USER_AGENT'] : $['getdata'](_0x4eaaea['DXSwa']) ? $['getdata'](_0x4eaaea['DXSwa']) : _0x4eaaea['OdhbJ']
                }
            };
            $['post'](_0x4037f6, (_0x13c713, _0x2efb84, _0x14ab27) => {
                var _0x27498e = {
                    'wbIoL': function(_0x3166ee, _0x10f7ee) {
                        return _0x4eaaea['cMpDz'](_0x3166ee, _0x10f7ee);
                    },
                    'hcJDk': _0x4eaaea['qJjsq'],
                    'dKsqD': _0x4eaaea['EmBQJ'],
                    'WhMPQ': 'smp',
                    'VwPWN': _0x4eaaea['EmTxy']
                };
                if (_0x4eaaea['bpsqX']('DnQky', _0x4eaaea['rJxGI'])) {
                    try {
                        if (_0x13c713) {
                            if (_0x4eaaea['hMETs'](_0x4eaaea['LePTQ'], _0x4eaaea['LePTQ'])) {
                                console['log']('' + JSON['stringify'](_0x13c713));
                                console['log']($['name'] + ' API请求失败，请检查网路重试');
                            } else {
                                currentToken = tokenArr[_0x27498e['wbIoL']($['index'], 0x1)];
                            }
                        } else {
                            if (_0x14ab27) {
                                if (_0x4eaaea['yeCnO'] !== _0x4eaaea['yeCnO']) {
                                    $['msg']($['name'], '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
                                        'open-url': _0x27498e['hcJDk']
                                    });
                                    return;
                                } else {
                                    _0x14ab27 = JSON['parse'](_0x14ab27);
                                    if (_0x14ab27['retcode'] === 0xd) {
                                        if (_0x4eaaea['yukiX'](_0x4eaaea['jEIgD'], 'eIhcf')) {
                                            console['log'](e);
                                            $['msg']($['name'], '', _0x27498e['dKsqD']);
                                            return [];
                                        } else {
                                            $['isLogin'] = ![];
                                            return;
                                        }
                                    }
                                    if (_0x4eaaea['QlEOZ'](_0x14ab27['retcode'], 0x0)) {
                                        if (_0x4eaaea['RLJZx'](_0x4eaaea['tGpOy'], 'phXIr')) {
                                            _0x7e61b(![]);
                                        } else {
                                            $['nickName'] = _0x14ab27[_0x4eaaea['bsORf']] && _0x14ab27[_0x4eaaea['bsORf']]['nickname'] || $['UserName'];
                                        }
                                    } else {
                                        $['nickName'] = $['UserName'];
                                    }
                                }
                            } else {
                                console['log']('京东服务器返回空数据');
                            }
                        }
                    } catch (_0x4392a7) {
                        if (_0x4eaaea['RLJZx'](_0x4eaaea['DLSVj'], _0x4eaaea['DLSVj'])) {
                            try {
                                let _0x23ba6e = code && JSON['parse'](code);
                                return _0x23ba6e[_0x27498e['WhMPQ']] && _0x23ba6e[_0x27498e['VwPWN']] && _0x23ba6e['joinnum'] ? _0x23ba6e : '';
                            } catch (_0x392b3b) {
                                return '';
                            }
                        } else {
                            $['logErr'](_0x4392a7, _0x2efb84);
                        }
                    } finally {
                        _0x4eaaea['JOetv'](_0x7e61b);
                    }
                } else {
                    $['log'](_0xdb527d['ztNkj']);
                    message += _0xdb527d['Uumwu'];
                    notifyBool = notifyBool && notifyLevel >= 0x2;
                    _0xdb527d['Epbss'](_0x7e61b, ![]);
                    return;
                }
            });
        } else {
            if (tokenArr[_0x4eaaea['cMpDz']($['index'], 0x1)] && tokenArr[$['index'] - 0x1]['farm_jstoken']) {
                currentToken = tokenArr[_0x4eaaea['cMpDz']($['index'], 0x1)];
            } else {
                currentToken = tokenNull;
            }
            _0x4eaaea['nPcbm'](_0x7e61b);
        }
    });
}

function tokenFormat() {
    var _0x1b2ac4 = {
        'Xuydu': function(_0xf6f115, _0x36ffc1) {
            return _0xf6f115 === _0x36ffc1;
        },
        'VIqDV': 'retcode',
        'feFlU': function(_0x51bfd5, _0x3108d0) {
            return _0x51bfd5 === _0x3108d0;
        },
        'JzbAg': 'base',
        'iVgvG': function(_0x57bc38, _0x57507e) {
            return _0x57bc38 === _0x57507e;
        },
        'qaRwz': 'BQSKF',
        'PCJhC': function(_0x362ec2, _0x49335d) {
            return _0x362ec2 - _0x49335d;
        },
        'rwYni': function(_0x29d29b, _0x31299a) {
            return _0x29d29b - _0x31299a;
        },
        'KQbBx': function(_0x51015c, _0x3a64b6) {
            return _0x51015c === _0x3a64b6;
        },
        'SLVtl': 'cgyce',
        'tyhkt': 'fTZpj',
        'rvHTK': function(_0x33cde3) {
            return _0x33cde3();
        }
    };
    return new Promise(async _0x31f9f3 => {
        if (_0x1b2ac4['iVgvG'](_0x1b2ac4['qaRwz'], _0x1b2ac4['qaRwz'])) {
            if (tokenArr[_0x1b2ac4['PCJhC']($['index'], 0x1)] && tokenArr[_0x1b2ac4['rwYni']($['index'], 0x1)]['farm_jstoken']) {
                currentToken = tokenArr[_0x1b2ac4['rwYni']($['index'], 0x1)];
            } else {
                if (_0x1b2ac4['KQbBx'](_0x1b2ac4['SLVtl'], _0x1b2ac4['tyhkt'])) {
                    data = JSON['parse'](data);
                    if (_0x1b2ac4['Xuydu'](data[_0x1b2ac4['VIqDV']], 0xd)) {
                        $['isLogin'] = ![];
                        return;
                    }
                    if (_0x1b2ac4['feFlU'](data[_0x1b2ac4['VIqDV']], 0x0)) {
                        $['nickName'] = data[_0x1b2ac4['JzbAg']] && data[_0x1b2ac4['JzbAg']]['nickname'] || $['UserName'];
                    } else {
                        $['nickName'] = $['UserName'];
                    }
                } else {
                    currentToken = tokenNull;
                }
            }
            _0x1b2ac4['rvHTK'](_0x31f9f3);
        } else {
            _0x31f9f3(!![]);
        }
    });
}

function shareCodesFormat() {
    var _0x1915e3 = {
        'xnjSP': function(_0x153e44, _0x331767) {
            return _0x153e44 !== _0x331767;
        },
        'vZIvl': 'dEUKm',
        'wRzLB': function(_0x54ce23, _0x419371) {
            return _0x54ce23 - _0x419371;
        },
        'EOnUs': function(_0x2a1a40) {
            return _0x2a1a40();
        }
    };
    return new Promise(async _0x2ca380 => {
        if (_0x1915e3['xnjSP'](_0x1915e3['vZIvl'], 'dEUKm')) {
            $['done']();
        } else {
            if (jxncShareCodeArr[_0x1915e3['wRzLB']($['index'], 0x1)]) {
                currentShareCode = jxncShareCodeArr[_0x1915e3['wRzLB']($['index'], 0x1)]['split']('@');
                currentShareCode['push'](...shareCode['split']('@'));
            } else {
                $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                currentShareCode = shareCode['split']('@');
            }
            $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
            _0x1915e3['EOnUs'](_0x2ca380);
        }
    });
}
async function jdJXNC() {
    var _0x560498 = {
        'dnJZP': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'uYQYg': function(_0x463a74, _0x1d0966) {
            return _0x463a74 < _0x1d0966;
        },
        'uPTRZ': function(_0x3f5065, _0x419d6c) {
            return _0x3f5065(_0x419d6c);
        },
        'pIlsw': function(_0x206471, _0x1a72c1) {
            return _0x206471 <= _0x1a72c1;
        },
        'dsOuK': function(_0x5ea35f, _0x401c2f) {
            return _0x5ea35f === _0x401c2f;
        },
        'UbQfK': '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。',
        'AYYnb': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'adzqn': function(_0x220997, _0x6c070f) {
            return _0x220997 >= _0x6c070f;
        },
        'CMWUv': function(_0x6a248f, _0x21ef41) {
            return _0x6a248f + _0x21ef41;
        },
        'vIOYy': function(_0x1da869) {
            return _0x1da869();
        },
        'HFnok': 'GBavY',
        'tCiyR': function(_0x4cb9fe, _0x1b02e1, _0x564728) {
            return _0x4cb9fe(_0x1b02e1, _0x564728);
        },
        'ofudW': function(_0x13de33, _0x21d354) {
            return _0x13de33(_0x21d354);
        },
        'kVXkC': function(_0xdea7ff) {
            return _0xdea7ff();
        },
        'KuGAr': 'active',
        'lwtaV': 'CWEzx',
        'osmGB': function(_0x1515a4) {
            return _0x1515a4();
        }
    };
    subTitle = '【京东账号' + $['index'] + '】' + $['nickName'];
    $['log']('获取用户信息 & 任务列表');
    const _0x5e37ea = await getTaskList();
    if (_0x5e37ea) {
        message += '【水果名称】' + _0x5e37ea['prizename'] + '\x0a';
        if (_0x560498['pIlsw'](_0x5e37ea['target'], _0x5e37ea['score'])) {
            if (_0x560498['dsOuK'](_0x5e37ea['activestatus'], 0x2)) {
                notifyBool = !![];
                $['log']('【成熟】水果已成熟请及时收取，activestatus：' + _0x5e37ea['activestatus'] + '\x0a');
                message += '【成熟】水果已成熟请及时收取，activestatus：' + _0x5e37ea['activestatus'] + '\x0a';
            } else if (_0x560498['dsOuK'](_0x5e37ea['activestatus'], 0x0)) {
                $['log'](_0x560498['UbQfK']);
                message += _0x560498['AYYnb'];
                notifyBool = notifyBool && _0x560498['adzqn'](notifyLevel, 0x3);
            }
        } else {
            let _0xb3e3aa = {
                'smp': $['info']['smp'],
                'active': $['info']['active'],
                'joinnum': $['info']['joinnum']
            };
            $['log'](_0x560498['CMWUv']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】', JSON['stringify'](_0xb3e3aa)));
            await $['wait'](0x1f4);
            const _0x4f0791 = await _0x560498['vIOYy'](browserTask);
            if (_0x4f0791) {
                if (_0x560498['dsOuK']('GwQod', _0x560498['HFnok'])) {
                    $['drip'] += eachtimeget;
                } else {
                    await $['wait'](0x1f4);
                    await _0x560498['vIOYy'](answerTask);
                    await $['wait'](0x1f4);
                    const _0x1227a8 = await _0x560498['vIOYy'](getTaskList);
                    _0x560498['tCiyR'](getMessage, _0x1227a8, _0x5e37ea);
                    await _0x560498['ofudW'](submitInviteId, $['UserName']);
                    await $['wait'](0x1f4);
                    let _0x166ae7 = await helpFriends();
                    if (_0x166ae7) {
                        while (_0x560498['uYQYg']($['helpNum'], $['maxHelpNum'])) {
                            $['helpNum']++;
                            assistUserShareCodeJson = await _0x560498['kVXkC'](getAssistUser);
                            if (assistUserShareCodeJson) {
                                await $['wait'](0x1f4);
                                _0x166ae7 = await helpShareCode(assistUserShareCodeJson['smp'], assistUserShareCodeJson[_0x560498['KuGAr']], assistUserShareCodeJson['joinnum']);
                                if (_0x166ae7) {
                                    if (_0x560498['lwtaV'] !== _0x560498['lwtaV']) {
                                        let _0x75ebfb = _0x560498['dnJZP'];
                                        let _0x2f2650 = '';
                                        for (let _0x43af33 = 0x0; _0x560498['uYQYg'](_0x43af33, count); _0x43af33++) {
                                            _0x2f2650 += _0x75ebfb[_0x560498['uPTRZ'](parseInt, Math['random']() * _0x75ebfb['length'])];
                                        }
                                        return _0x2f2650;
                                    } else {
                                        await $['wait'](0x3e8);
                                        continue;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    await _0x560498['osmGB'](showMsg);
}

function getTaskList() {
    var _0x117556 = {
        'AiuAl': 'qArIW',
        'ijkLE': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'udBCe': function(_0x258b7d, _0x1e6f82) {
            return _0x258b7d >= _0x1e6f82;
        },
        'fbTWx': function(_0x4264b5, _0xc6ef4b) {
            return _0x4264b5(_0xc6ef4b);
        },
        'ZPvmd': function(_0x373735, _0x3433e5) {
            return _0x373735(_0x3433e5);
        },
        'GqVvC': function(_0x282b7c, _0x5084c8) {
            return _0x282b7c === _0x5084c8;
        },
        'LPCrY': function(_0x1bc76e, _0x2431a5) {
            return _0x1bc76e !== _0x2431a5;
        },
        'VcsNi': 'AOpas',
        'FShYe': 'query'
    };
    return new Promise(async _0x135955 => {
        if (_0x117556['LPCrY'](_0x117556['VcsNi'], 'EQNAR')) {
            $['get'](taskUrl(_0x117556['FShYe'], 'type=1'), async (_0x1bb881, _0x18dfaa, _0x5224ec) => {
                try {
                    const _0x12b0ce = _0x5224ec['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    const {
                        detail,
                        msg,
                        task = [],
                        retmsg,
                        ..._0x4891eb
                    } = JSON['parse'](_0x12b0ce);
                    $['detail'] = detail;
                    $['helpTask'] = task['filter'](_0x5b39f5 => _0x5b39f5['tasktype'] === 0x2)[0x0] || {
                        'eachtimeget': 0x0,
                        'limit': 0x0
                    };
                    $['allTask'] = task['filter'](_0x720123 => _0x720123['tasktype'] !== 0x3 && _0x720123['tasktype'] !== 0x2 && parseInt(_0x720123['left']) > 0x0);
                    $['info'] = _0x4891eb;
                    $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                    if (!$['info']['active']) {
                        if (_0x117556['AiuAl'] !== 'bZHRp') {
                            $['log']('账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。');
                            message += _0x117556['ijkLE'];
                            notifyBool = notifyBool && _0x117556['udBCe'](notifyLevel, 0x3);
                            _0x117556['fbTWx'](_0x135955, ![]);
                        } else {
                            jxncShareCodeArr['push']('');
                        }
                    }
                    _0x117556['ZPvmd'](_0x135955, _0x4891eb);
                } catch (_0x2fa543) {
                    $['logErr'](_0x2fa543, _0x18dfaa);
                } finally {
                    if (_0x117556['GqVvC']('SySUy', 'SySUy')) {
                        _0x135955(!![]);
                    } else {
                        if (jdCookieNode[item]) {
                            cookieArr['push'](jdCookieNode[item]);
                        }
                    }
                }
            });
        } else {
            shareCode = data;
        }
    });
}

function browserTask() {
    var _0x1615eb = {
        'flpOS': function(_0x308851, _0x7fa962) {
            return _0x308851(_0x7fa962);
        },
        'JdgBy': function(_0x20e196, _0x5dfb2e) {
            return _0x20e196 - _0x5dfb2e;
        },
        'tLYwZ': function(_0x33662f) {
            return _0x33662f();
        },
        'BvhKl': 'fBtrP',
        'nCuDW': function(_0x36659e, _0x2e71f0) {
            return _0x36659e < _0x2e71f0;
        },
        'yYoyd': function(_0x2a0d15, _0x50c29a) {
            return _0x2a0d15 * _0x50c29a;
        },
        'EbSHo': function(_0x1a4308, _0x25b964) {
            return _0x1a4308 === _0x25b964;
        },
        'SByJj': function(_0x2e7143, _0x103f2d) {
            return _0x2e7143 !== _0x103f2d;
        },
        'vMsal': 'GPiWS',
        'cUUcE': 'cYGAj',
        'NFjDJ': function(_0x268f0c, _0x548b70) {
            return _0x268f0c === _0x548b70;
        },
        'OmeOc': 'hiFdr',
        'RtARh': '水滴已满，果实成熟，跳过所有任务',
        'airch': function(_0x31f8c2, _0x2db43d) {
            return _0x31f8c2(_0x2db43d);
        },
        'sywZN': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子',
        'evxHj': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\x0a',
        'HJWWV': function(_0x4f82a2, _0x1fdd53) {
            return _0x4f82a2 >= _0x1fdd53;
        },
        'RgxfL': function(_0x54116a, _0x4790ea) {
            return _0x54116a(_0x4790ea);
        }
    };
    return new Promise(async _0x297f71 => {
        var _0x5082c5 = {
            'IuSGY': function(_0xcca0b4, _0x3a030d) {
                return _0x1615eb['JdgBy'](_0xcca0b4, _0x3a030d);
            },
            'FETaT': function(_0x553281) {
                return _0x1615eb['tLYwZ'](_0x553281);
            }
        };
        if ('fBtrP' !== _0x1615eb['BvhKl']) {
            return new Promise(async _0x299d44 => {
                if (jxncShareCodeArr[$['index'] - 0x1]) {
                    currentShareCode = jxncShareCodeArr[_0x5082c5['IuSGY']($['index'], 0x1)]['split']('@');
                    currentShareCode['push'](...shareCode['split']('@'));
                } else {
                    $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                    currentShareCode = shareCode['split']('@');
                }
                $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
                _0x5082c5['FETaT'](_0x299d44);
            });
        } else {
            const _0xdb451c = $['allTask']['filter'](_0x18a640 => _0x18a640['tasklevel'] !== 0x6);
            const _0x126e5d = Math['max'](...[..._0xdb451c]['map'](_0x5f94b4 => _0x5f94b4['limit']));
            for (let _0x5d69cf = 0x0; _0x5d69cf < _0xdb451c['length']; _0x5d69cf++) {
                const _0x278282 = _0xdb451c[_0x5d69cf];
                $['log']('开始第' + (_0x5d69cf + 0x1) + '个任务：' + _0x278282['taskname']);
                const _0x5cc827 = [0x0];
                for (let _0x5d69cf = 0x0; _0x1615eb['nCuDW'](_0x5d69cf, _0x126e5d); _0x5d69cf++) {
                    const _0x590b82 = _0x1615eb['yYoyd'](Math['random'](), 0x3);
                    await $['wait'](_0x1615eb['yYoyd'](_0x590b82, 0x3e8));
                    if (_0x1615eb['EbSHo'](_0x5cc827[0x0], 0x0)) {
                        if (_0x1615eb['SByJj'](_0x1615eb['vMsal'], _0x1615eb['cUUcE'])) {
                            _0x5cc827[0x0] = await doTask(_0x278282);
                        } else {
                            $['logErr'](e, resp);
                        }
                    }
                    if (_0x5cc827[0x0] !== 0x0) {
                        if (_0x1615eb['NFjDJ'](_0x1615eb['OmeOc'], 'GfuQf')) {
                            _0x1615eb['flpOS'](_0x297f71, ![]);
                            $['log'](taskname + '[做任务]： 任务已完成，跳过');
                            return;
                        } else {
                            break;
                        }
                    }
                }
                if (_0x1615eb['NFjDJ'](_0x5cc827[0x0], 0x3f9)) {
                    $['log'](_0x1615eb['RtARh']);
                    _0x1615eb['airch'](_0x297f71, !![]);
                    break;
                }
                if (_0x5cc827[0x0] === 0x408) {
                    $['log'](_0x1615eb['sywZN']);
                    message += _0x1615eb['evxHj'];
                    notifyBool = notifyBool && _0x1615eb['HJWWV'](notifyLevel, 0x2);
                    _0x1615eb['RgxfL'](_0x297f71, ![]);
                    return;
                }
                $['log']('结束第' + (_0x5d69cf + 0x1) + '个任务：' + _0x278282['taskname']);
            }
            _0x1615eb['RgxfL'](_0x297f71, !![]);
        }
    });
}

function answerTask() {
    var _0xe18296 = {
        'kJfhk': function(_0x152230, _0x4f8a8b) {
            return _0x152230(_0x4f8a8b);
        },
        'owubm': function(_0xfd5a24, _0xb1c0c7) {
            return _0xfd5a24 !== _0xb1c0c7;
        },
        'ZIrmJ': '活动太火爆了',
        'cApjI': '任务进行中或者未到任务时间',
        'jxqQa': 'HFVGp',
        'wpwpG': 'rZpFm',
        'hcjIN': function(_0x3ebd53) {
            return _0x3ebd53();
        },
        'CeeiQ': function(_0x2003e1, _0x477596) {
            return _0x2003e1 !== _0x477596;
        },
        'Gpuyo': function(_0x394555, _0x38d93e) {
            return _0x394555 > _0x38d93e;
        },
        'VrSll': function(_0x1104c9, _0xc09fd4) {
            return _0x1104c9 !== _0xc09fd4;
        },
        'XDrAd': 'KGfMa',
        'BAPwQ': function(_0x4663aa, _0x470abb) {
            return _0x4663aa !== _0x470abb;
        },
        'yqDvi': 'uFfyP',
        'aQXUq': function(_0x35aa3d, _0x4f8b27) {
            return _0x35aa3d <= _0x4f8b27;
        },
        'CTAQp': function(_0x508b6c, _0x3cf607) {
            return _0x508b6c(_0x3cf607);
        },
        'KjZQT': function(_0x23ec63, _0x2a1bfb, _0xaaa482) {
            return _0x23ec63(_0x2a1bfb, _0xaaa482);
        },
        'uhnsJ': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    const _0xba5263 = $['allTask']['filter'](_0x19f1b4 => _0x19f1b4['tasklevel'] === 0x6);
    if (!_0xba5263 || !_0xba5263[0x0]) return;
    const {
        tasklevel,
        left,
        taskname,
        eachtimeget
    } = _0xba5263[0x0];
    $['log']('准备做答题任务：' + taskname);
    return new Promise(async _0x141105 => {
        var _0x11fdf1 = {
            'RmOAo': function(_0x2a6f27, _0x3305c1) {
                return _0xe18296['kJfhk'](_0x2a6f27, _0x3305c1);
            },
            'UbEdp': function(_0x4e1af5, _0x44267b) {
                return _0x4e1af5 + _0x44267b;
            },
            'pAcLq': function(_0x2e5d68, _0x201d74) {
                return _0xe18296['owubm'](_0x2e5d68, _0x201d74);
            },
            'yIyph': _0xe18296['ZIrmJ'],
            'NqTIk': _0xe18296['cApjI'],
            'JLHQN': function(_0x32b703, _0x10cfde) {
                return _0x32b703 === _0x10cfde;
            },
            'jIppC': function(_0xd3c633, _0x1ef829) {
                return _0xd3c633 === _0x1ef829;
            },
            'aRLQI': _0xe18296['jxqQa'],
            'PxaSR': _0xe18296['wpwpG'],
            'BXTde': function(_0x12f924) {
                return _0xe18296['hcjIN'](_0x12f924);
            },
            'lxtJU': function(_0x1cca9b, _0x3c311c) {
                return _0xe18296['CeeiQ'](_0x1cca9b, _0x3c311c);
            },
            'hZDNR': 'ans err',
            'Pghyd': function(_0x5e2794, _0x2d0058) {
                return _0xe18296['Gpuyo'](_0x5e2794, _0x2d0058);
            },
            'ScFZH': function(_0xbe650a, _0x3c3def) {
                return _0xe18296['VrSll'](_0xbe650a, _0x3c3def);
            },
            'bdoYt': _0xe18296['XDrAd'],
            'JPuum': 'UaDjC',
            'kaxFH': function(_0x37a6fb) {
                return _0x37a6fb();
            }
        };
        if (_0xe18296['BAPwQ'](_0xe18296['yqDvi'], 'uFfyP')) {
            str += _sym[_0x11fdf1['RmOAo'](parseInt, Math['random']() * _sym['length'])];
        } else {
            if (_0xe18296['aQXUq'](_0xe18296['CTAQp'](parseInt, left), 0x0)) {
                _0xe18296['CTAQp'](_0x141105, ![]);
                $['log'](taskname + '[做任务]： 任务已完成，跳过');
                return;
            }
            $['get'](_0xe18296['KjZQT'](taskUrl, 'dotask', 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':' + ['A', 'B', 'C', 'D'][$['answer']] + ':0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + encodeURIComponent(_0xe18296['uhnsJ'])), async (_0x5c3f9a, _0x13ddc4, _0x3f6a77) => {
                var _0x3fd075 = {
                    'LIKsp': function(_0x44e237, _0x376b8b) {
                        return _0x11fdf1['UbEdp'](_0x44e237, _0x376b8b);
                    },
                    'LHbOO': function(_0x2edfdb, _0xfa50d2) {
                        return _0x11fdf1['RmOAo'](_0x2edfdb, _0xfa50d2);
                    }
                };
                try {
                    if (_0x11fdf1['pAcLq']('dAPCK', 'GUYLe')) {
                        const _0x314aa5 = _0x3f6a77['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                        let {
                            ret,
                            retmsg,
                            right
                        } = JSON['parse'](_0x314aa5);
                        retmsg = retmsg !== '' ? retmsg : '成功';
                        $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:\"' + (retmsg['indexOf'](_0x11fdf1['yIyph']) !== -0x1 ? _0x11fdf1['NqTIk'] : retmsg) + '\"');
                        if (_0x11fdf1['JLHQN'](ret, 0x0) && _0x11fdf1['JLHQN'](right, 0x1)) {
                            $['drip'] += eachtimeget;
                        }
                        if (_0x11fdf1['jIppC'](ret, 0x3f9) || ret === 0x3f4) {
                            if (_0x11fdf1['aRLQI'] === _0x11fdf1['PxaSR']) {
                                jxncShareCodeArr['push'](jdJxncShareCodeNode[item]);
                            } else {
                                _0x11fdf1['BXTde'](_0x141105);
                                return;
                            }
                        }
                        if ((ret !== 0x0 && _0x11fdf1['lxtJU'](ret, 0x405) || _0x11fdf1['jIppC'](retmsg, _0x11fdf1['hZDNR'])) && _0x11fdf1['Pghyd']($['answer'], 0x0)) {
                            if (_0x11fdf1['ScFZH'](_0x11fdf1['bdoYt'], 'JapNp')) {
                                $['answer']--;
                                await $['wait'](0x3e8);
                                await answerTask();
                            } else {
                                $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                            }
                        }
                    } else {
                        let _0x5c171c = {
                            'smp': value,
                            'active': extra['active'],
                            'joinnum': extra['joinnum'] || 0x1
                        };
                        $['log'](_0x3fd075['LIKsp']('获取随机助力码成功 ', JSON['stringify'](_0x5c171c)));
                        _0x3fd075['LHbOO'](_0x141105, _0x5c171c);
                        return;
                    }
                } catch (_0x2624dd) {
                    $['logErr'](_0x2624dd, _0x13ddc4);
                } finally {
                    if (_0x11fdf1['ScFZH']('JLAeK', _0x11fdf1['JPuum'])) {
                        _0x11fdf1['kaxFH'](_0x141105);
                    } else {
                        console['log']('京东服务器返回空数据');
                    }
                }
            });
        }
    });
}

function getMessage(_0x15770d, _0x468fda) {
    var _0x317936 = {
        'FcFKO': function(_0x134d6b, _0x3a9511) {
            return _0x134d6b >= _0x3a9511;
        },
        'conEf': function(_0x4e8edb, _0x59e157) {
            return _0x4e8edb <= _0x59e157;
        },
        'aFlKo': function(_0x1dd75e, _0x1c352d) {
            return _0x1dd75e > _0x1c352d;
        },
        'bAVse': function(_0x588636, _0x2ce32e) {
            return _0x588636 > _0x2ce32e;
        },
        'tYJhc': function(_0x46eab1, _0x2f5295) {
            return _0x46eab1 > _0x2f5295;
        },
        'oOiRQ': function(_0x4162e0, _0x78a3f1) {
            return _0x4162e0 !== _0x78a3f1;
        },
        'HEZZl': 'AksRB',
        'nAdQf': function(_0x508658, _0x1a80e3) {
            return _0x508658 / _0x1a80e3;
        },
        'dOybv': function(_0x3f96db, _0x1fe927) {
            return _0x3f96db + _0x1fe927;
        },
        'iNwxu': function(_0x13d72e, _0xd7d22d) {
            return _0x13d72e >= _0xd7d22d;
        }
    };
    const _0x10690a = _0x15770d['target'] - _0x15770d['score'];
    const _0x19c54a = _0x15770d['modifyscore'];
    const _0x33ec69 = _0x468fda['modifyscore'];
    let _0xfb799e = 0x0;
    if ($['detail']) {
        let _0x1e60b4 = new Date(new Date()['toLocaleDateString']())['getTime']() / 0x3e8;
        $['detail']['forEach'](function(_0x5b3afd, _0x4699e0) {
            if (_0x317936['FcFKO'](_0x5b3afd['time'], _0x1e60b4) && _0x5b3afd['score']) {
                _0xfb799e += _0x5b3afd['score'];
            }
        });
    }
    message += '【水滴】本次获得' + _0x19c54a + ' 离线获得' + _0x33ec69 + ' 今日获得' + _0xfb799e + ' 还需水滴' + _0x10690a + '\x0a';
    if (_0x317936['conEf'](_0x10690a, 0x0)) {
        notifyBool = !![];
        message += '【成熟】水果已成熟请及时收取，deliverState：' + _0x15770d['deliverState'] + '\x0a';
        return;
    }
    if (_0x317936['aFlKo'](_0x19c54a, 0x0) || _0x317936['bAVse'](_0x33ec69, 0x0) || _0x317936['tYJhc'](_0xfb799e, 0x0)) {
        if (_0x317936['oOiRQ']('AksRB', _0x317936['HEZZl'])) {
            $['logErr'](e, resp);
        } else {
            const _0x3e6b94 = Math['ceil'](_0x317936['nAdQf'](_0x10690a, _0x317936['tYJhc'](_0xfb799e, 0x0) ? _0xfb799e : _0x317936['dOybv'](_0x19c54a, _0x33ec69)));
            message += '【预测】还需 ' + _0x3e6b94 + ' 天\x0a';
        }
    }
    if (_0x317936['tYJhc'](_0x19c54a, 0x0) || _0x33ec69 > 0x0) {
        notifyBool = notifyBool && _0x317936['FcFKO'](notifyLevel, 0x1);
    } else {
        notifyBool = notifyBool && _0x317936['iNwxu'](notifyLevel, 0x2);
    }
}

function submitInviteId(_0x2b177c) {
    var _0x1d1132 = {
        'GhozP': function(_0x21759d, _0x524fdb) {
            return _0x21759d === _0x524fdb;
        },
        'vfsHu': 'qpvqc',
        'GZfOG': function(_0x4fa69d, _0x4b4f25) {
            return _0x4fa69d !== _0x4b4f25;
        },
        'uXBjp': 'qZAed',
        'QlnCI': 'DeLID',
        'rzamn': function(_0x5468c2) {
            return _0x5468c2();
        },
        'FNvKM': 'base',
        'jKkVv': function(_0x225d67, _0x490e6f) {
            return _0x225d67 !== _0x490e6f;
        },
        'icWGq': function(_0x10c84e) {
            return _0x10c84e();
        },
        'SSOcC': 'OJcxi',
        'Mmiec': function(_0x24ea7f, _0x58e38e) {
            return _0x24ea7f(_0x58e38e);
        },
        'ZUTsO': function(_0x2cee6b) {
            return _0x2cee6b();
        }
    };
    return new Promise(_0x562b10 => {
        var _0x42135d = {
            'IlyvV': _0x1d1132['FNvKM']
        };
        if (!$['info'] || !$['info']['smp']) {
            if (_0x1d1132['jKkVv']('wABYd', 'wABYd')) {
                $['nickName'] = data[_0x42135d['IlyvV']] && data[_0x42135d['IlyvV']]['nickname'] || $['UserName'];
            } else {
                _0x1d1132['icWGq'](_0x562b10);
                return;
            }
        }
        try {
            if (_0x1d1132['jKkVv'](_0x1d1132['SSOcC'], _0x1d1132['SSOcC'])) {
                return JSON['parse'](str);
            } else {
                $['post']({
                    'url': 'https://api.ninesix.cc/api/jx-nc/' + $['info']['smp'] + '/' + _0x1d1132['Mmiec'](encodeURIComponent, _0x2b177c) + '?active=' + $['info']['active'] + '&joinnum=' + $['info']['joinnum'],
                    'timeout': 0x2710
                }, (_0x8beb14, _0x4b9a8c, _0x27fdda) => {
                    if (_0x1d1132['GhozP'](_0x1d1132['vfsHu'], _0x1d1132['vfsHu'])) {
                        try {
                            const {
                                code,
                                data = {}
                            } = JSON['parse'](_0x27fdda);
                            $['log']('邀请码提交：' + code);
                            if (data['value']) {
                                message += '【邀请码】提交成功！\n';
                            }
                        } catch (_0x468a51) {
                            if (_0x1d1132['GZfOG'](_0x1d1132['uXBjp'], _0x1d1132['QlnCI'])) {
                                $['log']('邀请码提交失败 API 返回异常');
                            } else {
                                $['log']('邀请码提交失败 API 返回异常');
                            }
                        } finally {
                            _0x1d1132['rzamn'](_0x562b10);
                        }
                    } else {
                        $['isLogin'] = ![];
                        return;
                    }
                });
            }
        } catch (_0x3be6c8) {
            _0x1d1132['ZUTsO'](_0x562b10);
        }
    });
}

function getAssistUser() {
    var _0xf57353 = {
        'hrFlK': 'WkMcR',
        'SYJUO': 'NkRmB',
        'nAglS': function(_0x349b11, _0x38ebe5) {
            return _0x349b11 !== _0x38ebe5;
        },
        'yWgES': 'zaUyB',
        'nhRup': function(_0xd12099, _0x33749a) {
            return _0xd12099 + _0x33749a;
        },
        'iycTP': 'WKvsH',
        'HFdDM': function(_0x2e4c34, _0x2cb769) {
            return _0x2e4c34(_0x2cb769);
        },
        'BvzxB': 'QIikF',
        'wRpty': function(_0xe75961, _0x4dd419) {
            return _0xe75961 === _0x4dd419;
        },
        'HBerR': 'weBVR',
        'CsORi': 'ThoiR',
        'STkeN': function(_0x411ca5, _0x2516be) {
            return _0x411ca5(_0x2516be);
        }
    };
    return new Promise(_0x761e34 => {
        var _0x2ef772 = {
            'hbYiK': function(_0x51bb03, _0x10e429) {
                return _0x51bb03 !== _0x10e429;
            },
            'lXSvJ': _0xf57353['hrFlK'],
            'xqeKF': _0xf57353['SYJUO'],
            'Nszat': function(_0x5afdeb, _0x5e5848) {
                return _0xf57353['nAglS'](_0x5afdeb, _0x5e5848);
            },
            'qGWfz': _0xf57353['yWgES'],
            'dFMEw': function(_0x44624d, _0x5e1b4a) {
                return _0xf57353['nhRup'](_0x44624d, _0x5e1b4a);
            },
            'QbYVg': _0xf57353['iycTP'],
            'ODXYs': function(_0x516539, _0x5e4493) {
                return _0xf57353['HFdDM'](_0x516539, _0x5e4493);
            }
        };
        try {
            if (_0xf57353['nAglS'](_0xf57353['BvzxB'], 'XkGpM')) {
                $['get']({
                    'url': 'http://120.76.219.92:18880/api/jx-nc?active=' + $['info']['active'],
                    'timeout': 0x2710
                }, async (_0x4a8ad7, _0x36dfbf, _0x3cfede) => {
                    if (_0x2ef772['lXSvJ'] === _0x2ef772['lXSvJ']) {
                        try {
                            if (_0x2ef772['hbYiK'](_0x2ef772['xqeKF'], _0x2ef772['xqeKF'])) {
                                cookieArr['push'](jdCookieNode[item]);
                            } else {
                                const {
                                    code,
                                    data: {
                                        value,
                                        extra = {}
                                    } = {}
                                } = JSON['parse'](_0x3cfede);
                                if (value && extra['active']) {
                                    if (_0x2ef772['Nszat']('zaUyB', _0x2ef772['qGWfz'])) {
                                        $['log'](taskname + '[做任务]： 任务已完成，跳过');
                                        _0x761e34(![]);
                                    } else {
                                        let _0x1d0a6c = {
                                            'smp': value,
                                            'active': extra['active'],
                                            'joinnum': extra['joinnum'] || 0x1
                                        };
                                        $['log'](_0x2ef772['dFMEw']('获取随机助力码成功 ', JSON['stringify'](_0x1d0a6c)));
                                        _0x761e34(_0x1d0a6c);
                                        return;
                                    }
                                } else {
                                    $['log']('获取随机助力码失败 ' + code);
                                }
                            }
                        } catch (_0x1621e2) {
                            if ('pvxuE' === _0x2ef772['QbYVg']) {
                                Object['keys'](jdJxncShareCodeNode)['forEach'](_0x25f896 => {
                                    if (jdJxncShareCodeNode[_0x25f896]) {
                                        jxncShareCodeArr['push'](jdJxncShareCodeNode[_0x25f896]);
                                    } else {
                                        jxncShareCodeArr['push']('');
                                    }
                                });
                            } else {
                                $['log']('获取随机助力码失败 API 返回异常');
                            }
                        } finally {
                            if ('NLZtw' !== 'ZMnyU') {
                                _0x761e34(![]);
                            } else {
                                if (notifyBool) {
                                    $['msg']($['name'], subTitle, message, option);
                                    if ($['isNode']()) {
                                        allMessage += subTitle + '\x0a' + message + (_0x2ef772['hbYiK']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                                    }
                                } else {
                                    $['log']($['name'] + ' - notify 通知已关闭\x0a账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                                }
                            }
                        }
                    } else {
                        currentToken = tokenNull;
                    }
                });
            } else {
                $['logErr'](e, resp);
            }
        } catch (_0x258d3a) {
            if (_0xf57353['wRpty'](_0xf57353['HBerR'], _0xf57353['CsORi'])) {
                const {
                    code,
                    data: {
                        value,
                        extra = {}
                    } = {}
                } = JSON['parse'](_data);
                if (value && extra['active']) {
                    let _0x38b4ed = {
                        'smp': value,
                        'active': extra['active'],
                        'joinnum': extra['joinnum'] || 0x1
                    };
                    $['log'](_0x2ef772['dFMEw']('获取随机助力码成功 ', JSON['stringify'](_0x38b4ed)));
                    _0x2ef772['ODXYs'](_0x761e34, _0x38b4ed);
                    return;
                } else {
                    $['log']('获取随机助力码失败 ' + code);
                }
            } else {
                _0xf57353['STkeN'](_0x761e34, ![]);
            }
        }
    });
}
async function helpFriends() {
    var _0x2ebc1b = {
        'llDfP': function(_0x375c18, _0x287bf5) {
            return _0x375c18 === _0x287bf5;
        },
        'YMQYC': function(_0x3414b9, _0x1cd61d) {
            return _0x3414b9(_0x1cd61d);
        },
        'yoWGD': 'eyCFs',
        'bpbuZ': function(_0x57daf0, _0x271733) {
            return _0x57daf0 !== _0x271733;
        },
        'WUlfQ': 'BKYrI',
        'HJMtR': function(_0x188afa, _0x36db82) {
            return _0x188afa(_0x36db82);
        },
        'KeRlF': '助力码非 json 格式，跳过',
        'YGJEt': function(_0x561e90, _0x66cec, _0x317f09, _0x2abcf2) {
            return _0x561e90(_0x66cec, _0x317f09, _0x2abcf2);
        },
        'Dbvqw': 'smp',
        'KxJHG': 'NObXq',
        'elRjo': 'Ayrcy'
    };
    for (let _0x5331c5 of currentShareCode) {
        if (_0x2ebc1b['yoWGD'] === 'xssmP') {
            if (_0x2ebc1b['llDfP'](ret, 0x93)) {
                $['log']('\x0a\x0a  !!!!!!!!   当前账号黑号了  !!!!!!!!  \x0a\x0a');
            }
            resolve(![]);
            return;
        } else {
            if (!_0x5331c5) {
                if (_0x2ebc1b['bpbuZ'](_0x2ebc1b['WUlfQ'], _0x2ebc1b['WUlfQ'])) {
                    console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\x0a');
                    _0x2ebc1b['YMQYC'](resolve, null);
                } else {
                    continue;
                }
            }
            let _0x13518c = _0x2ebc1b['HJMtR'](changeShareCodeJson, _0x5331c5);
            if (!_0x13518c) {
                console['log'](_0x2ebc1b['KeRlF']);
                continue;
            }
            const _0x2948d4 = await _0x2ebc1b['YGJEt'](helpShareCode, _0x13518c[_0x2ebc1b['Dbvqw']], _0x13518c['active'], _0x13518c['joinnum']);
            if (!_0x2948d4) {
                if (_0x2ebc1b['KxJHG'] !== _0x2ebc1b['elRjo']) {
                    return ![];
                } else {
                    let _0x3e7088 = uuid(0x28);
                    let _0x3e20f2 = (+new Date())['toString']();
                    if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
                        console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\x0a');
                        resolve(null);
                    }
                    let _0x39408f = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
                    let _0x205b83 = $['md5']('' + _0x2ebc1b['YMQYC'](decodeURIComponent, _0x39408f) + _0x3e20f2 + _0x3e7088 + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
                    currentToken = {
                        'timestamp': _0x3e20f2,
                        'phoneid': _0x3e7088,
                        'farm_jstoken': _0x205b83
                    };
                    resolve();
                }
            }
            await $['wait'](0x3e8);
        }
    }
    return !![];
}

function helpShareCode(_0x3dcceb, _0x565d9f, _0x1b916d) {
    var _0x3faad8 = {
        'BRiGl': function(_0x22471f, _0x814692) {
            return _0x22471f !== _0x814692;
        },
        'fbcIo': 'false',
        'oTRnK': 'RKIMF',
        'ZcBUO': 'iPWur',
        'rvNcg': function(_0x5f53ab, _0x255403) {
            return _0x5f53ab === _0x255403;
        },
        'CKGou': 'bXRhO',
        'Iibpb': 'FVOuk',
        'yjSCJ': 'epHli',
        'sDkqB': '助力码与当前账号相同，跳过助力。准备进行下一个助力',
        'nMDKq': function(_0x18da6a, _0x4bdbfe, _0x131fc0) {
            return _0x18da6a(_0x4bdbfe, _0x131fc0);
        },
        'QRTHU': 'help'
    };
    return new Promise(async _0x56ba6e => {
        var _0x2b382e = {
            'mmhtu': _0x3faad8['fbcIo'],
            'FgNHi': 'application/json,text/plain, */*',
            'ADyID': function(_0x3cd6fd, _0x144011) {
                return _0x3cd6fd !== _0x144011;
            },
            'MyHhT': 'GdXlm',
            'MOmtr': function(_0xd30bea, _0x13e1c6) {
                return _0xd30bea === _0x13e1c6;
            },
            'GtWEm': _0x3faad8['oTRnK'],
            'eFnov': function(_0x109c63, _0x3b7508) {
                return _0x109c63 === _0x3b7508;
            },
            'uRXzJ': _0x3faad8['ZcBUO'],
            'ZOdlJ': function(_0x53f853, _0x37be50) {
                return _0x53f853(_0x37be50);
            },
            'PUMao': function(_0x143de3, _0x285d37) {
                return _0x143de3(_0x285d37);
            },
            'Olvlx': function(_0x415e76, _0x53feaf) {
                return _0x415e76(_0x53feaf);
            }
        };
        if (_0x3faad8['rvNcg']('bXRhO', _0x3faad8['CKGou'])) {
            if (_0x3faad8['rvNcg'](_0x3dcceb, $['info']['smp'])) {
                if (_0x3faad8['Iibpb'] !== _0x3faad8['yjSCJ']) {
                    $['log'](_0x3faad8['sDkqB']);
                    _0x56ba6e(!![]);
                } else {
                    allMessage += subTitle + '\x0a' + message + (_0x3faad8['BRiGl']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                }
            }
            $['log']('即将助力 share {\"smp\":\"' + _0x3dcceb + '","active":"' + _0x565d9f + '","joinnum":"' + _0x1b916d + '\"}');
            $['get'](_0x3faad8['nMDKq'](taskUrl, _0x3faad8['QRTHU'], 'active=' + _0x565d9f + '&joinnum=' + _0x1b916d + '&smp=' + _0x3dcceb), async (_0x385c74, _0x10e941, _0x39d3d4) => {
                if (_0x2b382e['ADyID'](_0x2b382e['MyHhT'], _0x2b382e['MyHhT'])) {
                    Object['keys'](jdCookieNode)['forEach'](_0x35d1f9 => {
                        if (jdCookieNode[_0x35d1f9]) {
                            cookieArr['push'](jdCookieNode[_0x35d1f9]);
                        }
                    });
                    if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === _0x2b382e['mmhtu']) console['log'] = () => {};
                } else {
                    try {
                        const _0x2a1fb4 = _0x39d3d4['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                        const {
                            ret,
                            retmsg = ''
                        } = JSON['parse'](_0x2a1fb4);
                        $['log']('助力结果：ret=' + ret + ' retmsg="' + (retmsg ? retmsg : 'OK') + '\"');
                        if (_0x2b382e['MOmtr'](ret, 0x93) || _0x2b382e['MOmtr'](ret, 0x3f8)) {
                            if ('joEyX' !== _0x2b382e['GtWEm']) {
                                if (_0x2b382e['eFnov'](ret, 0x93)) {
                                    if (_0x2b382e['eFnov']('mFxmn', _0x2b382e['uRXzJ'])) {
                                        if (item['time'] >= dayTime && item['score']) {
                                            dayGet += item['score'];
                                        }
                                    } else {
                                        $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                                    }
                                }
                                _0x2b382e['ZOdlJ'](_0x56ba6e, ![]);
                                return;
                            } else {
                                let _0x2083ca = {
                                    'url': 'http://120.76.219.92:18880/share_code/jxnc_code.txt',
                                    'headers': {
                                        'Accept': _0x2b382e['FgNHi'],
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'Accept-Encoding': 'gzip, deflate, br',
                                        'Accept-Language': 'zh-cn',
                                        'Connection': 'keep-alive',
                                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
                                    },
                                    'timeout': 0x2710
                                };
                                $['get'](_0x2083ca, (_0x2896c4, _0x1f5c4e, _0xbfd448) => {
                                    if (!_0x2896c4) {
                                        shareCode = _0xbfd448;
                                    }
                                });
                            }
                        }
                        _0x2b382e['PUMao'](_0x56ba6e, !![]);
                        return;
                    } catch (_0x38c8bf) {
                        $['logErr'](_0x38c8bf, _0x10e941);
                    } finally {
                        _0x2b382e['Olvlx'](_0x56ba6e, ![]);
                    }
                }
            });
        } else {
            _0x56ba6e();
            return;
        }
    });
}

function doTask({
                    tasklevel,
                    left,
                    taskname,
                    eachtimeget
                }) {
    var _0x42defd = {
        'rWkPZ': 'cGCDJ',
        'DwMhw': function(_0x5a9696, _0x2e9646) {
            return _0x5a9696 !== _0x2e9646;
        },
        'xDjEH': '活动太火爆了',
        'NjdwG': function(_0x3a95ee, _0xe1d1eb) {
            return _0x3a95ee === _0xe1d1eb;
        },
        'zJrQi': function(_0x21fa8c, _0x1eb8e4) {
            return _0x21fa8c(_0x1eb8e4);
        },
        'grqiN': 'lIEED',
        'FpVtM': '【邀请码】提交成功！\n',
        'EZTcB': function(_0x470f47, _0x192ff5) {
            return _0x470f47 === _0x192ff5;
        },
        'UsnCK': function(_0x1b233a, _0x50a683) {
            return _0x1b233a <= _0x50a683;
        },
        'jxBOk': function(_0x100757, _0xb2d4) {
            return _0x100757 !== _0xb2d4;
        },
        'fanav': 'kYJhB',
        'ShDkd': 'dotask',
        'nBjsr': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    return new Promise(async _0x5e3861 => {
        var _0x11edba = {
            'dfSqY': _0x42defd['FpVtM'],
            'BjGxy': function(_0x13dd31, _0x124a24) {
                return _0x13dd31 === _0x124a24;
            },
            'muhqn': function(_0x5906ba, _0x44e983) {
                return _0x42defd['EZTcB'](_0x5906ba, _0x44e983);
            },
            'NBuSx': function(_0x3fd701, _0x306eed) {
                return _0x3fd701(_0x306eed);
            }
        };
        if (_0x42defd['UsnCK'](parseInt(left), 0x0)) {
            if (_0x42defd['jxBOk'](_0x42defd['fanav'], 'kYJhB')) {
                message += _0x11edba['dfSqY'];
            } else {
                $['log'](taskname + '[做任务]： 任务已完成，跳过');
                _0x5e3861(![]);
            }
        }
        $['get'](taskUrl(_0x42defd['ShDkd'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':D:0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0x42defd['zJrQi'](encodeURIComponent, _0x42defd['nBjsr'])), (_0x173975, _0x5a32b1, _0x4f73a6) => {
            if (_0x42defd['rWkPZ'] === 'cGCDJ') {
                try {
                    const _0x441401 = _0x4f73a6['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    let {
                        ret,
                        retmsg
                    } = JSON['parse'](_0x441401);
                    retmsg = retmsg !== '' ? retmsg : '成功';
                    $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x42defd['DwMhw'](retmsg['indexOf'](_0x42defd['xDjEH']), -0x1) ? '任务进行中或者未到任务时间' : retmsg) + '\"');
                    if (_0x42defd['NjdwG'](ret, 0x0)) {
                        $['drip'] += eachtimeget;
                    }
                    _0x42defd['zJrQi'](_0x5e3861, ret);
                } catch (_0x1cd8b7) {
                    if (_0x42defd['grqiN'] === _0x42defd['grqiN']) {
                        $['logErr'](_0x1cd8b7, _0x5a32b1);
                    } else {
                        notifyBool = !![];
                        message += '【成熟】水果已成熟请及时收取，deliverState：' + endInfo['deliverState'] + '\x0a';
                        return;
                    }
                } finally {
                    _0x5e3861();
                }
            } else {
                const _0x318e2c = _0x4f73a6['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                const {
                    ret,
                    retmsg = ''
                } = JSON['parse'](_0x318e2c);
                $['log']('助力结果：ret=' + ret + ' retmsg="' + (retmsg ? retmsg : 'OK') + '\"');
                if (_0x11edba['BjGxy'](ret, 0x93) || _0x11edba['muhqn'](ret, 0x3f8)) {
                    if (_0x11edba['muhqn'](ret, 0x93)) {
                        $['log']('\x0a\x0a  !!!!!!!!   当前账号黑号了  !!!!!!!!  \x0a\x0a');
                    }
                    _0x5e3861(![]);
                    return;
                }
                _0x11edba['NBuSx'](_0x5e3861, !![]);
                return;
            }
        });
    });
}

function taskUrl(_0x267172, _0xaebbe2) {
    var _0xed4aa = {
        'vzyuU': function(_0x23cde4, _0x29adbc) {
            return _0x23cde4(_0x29adbc);
        },
        'FTYEs': './USER_AGENTS',
        'alfGF': 'JDUA',
        'LXndA': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return {
        'url': JXNC_API_HOST + 'cubeactive/farm/' + _0x267172 + '?' + _0xaebbe2 + '&farm_jstoken=' + currentToken['farm_jstoken'] + '&phoneid=' + currentToken['phoneid'] + '×tamp=' + currentToken['timestamp'] + '&sceneval=2&g_login_type=1&callback=whyour&_=' + Date['now']() + '&g_ty=ls',
        'headers': {
            'Cookie': currentCookie,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://st.jingxi.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'wq.jd.com',
            'Accept-Language': 'zh-cn',
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0xed4aa['vzyuU'](require, _0xed4aa['FTYEs'])['USER_AGENT'] : $['getdata'](_0xed4aa['alfGF']) ? $['getdata'](_0xed4aa['alfGF']) : _0xed4aa['LXndA']
        },
        'timeout': 0x2710
    };
}
async function showMsg() {
    var _0x8228e = {
        'JEumh': 'CookieJD',
        'wLDtc': 'CookieJD2',
        'eKRFn': function(_0x4891d5, _0x5425ce) {
            return _0x4891d5(_0x5425ce);
        },
        'gBepd': function(_0x382b36) {
            return _0x382b36();
        },
        'IuGzh': function(_0x2241af, _0x2196d3) {
            return _0x2241af === _0x2196d3;
        },
        'GnTkt': 'lSivh',
        'KGMQm': function(_0x4cc820, _0x45d56f) {
            return _0x4cc820 !== _0x45d56f;
        },
        'aLStA': 'Ratcd'
    };
    if (notifyBool) {
        $['msg']($['name'], subTitle, message, option);
        if ($['isNode']()) {
            if (_0x8228e['IuGzh'](_0x8228e['GnTkt'], _0x8228e['GnTkt'])) {
                allMessage += subTitle + '\x0a' + message + ($['index'] !== cookieArr['length'] ? '\x0a\x0a' : '');
            } else {
                cookieArr = [$['getdata'](_0x8228e['JEumh']), $['getdata'](_0x8228e['wLDtc']), ..._0x8228e['eKRFn'](jsonParse, $['getdata']('CookiesJD') || '[]')['map'](_0x513371 => _0x513371['cookie'])]['filter'](_0x2ef39a => !!_0x2ef39a);
            }
        }
    } else {
        if (_0x8228e['KGMQm'](_0x8228e['aLStA'], 'Ratcd')) {
            _0x8228e['gBepd'](resolve);
        } else {
            $['log']($['name'] + ' - notify 通知已关闭\x0a账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
        }
    }
}

function getJxToken() {
    var _0x2c6f91 = {
        'Ppzwx': function(_0x464421, _0x243922) {
            return _0x464421 - _0x243922;
        },
        'uacQh': function(_0x50736a, _0x2e26b1) {
            return _0x50736a - _0x2e26b1;
        },
        'JDQLl': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'FKqkK': function(_0x15fe33, _0x347506) {
            return _0x15fe33 < _0x347506;
        },
        'rFOEH': 'KGdox',
        'ztqrM': function(_0x583d02, _0x233507) {
            return _0x583d02(_0x233507);
        },
        'CnLCK': function(_0xd221d1, _0x3ace3e) {
            return _0xd221d1 * _0x3ace3e;
        },
        'SFwsJ': function(_0x3f7281) {
            return _0x3f7281();
        }
    };

    function _0x26357f(_0x1e3e93) {
        let _0x25f282 = _0x2c6f91['JDQLl'];
        let _0x40da55 = '';
        for (let _0x3847c9 = 0x0; _0x2c6f91['FKqkK'](_0x3847c9, _0x1e3e93); _0x3847c9++) {
            if (_0x2c6f91['rFOEH'] === 'KGdox') {
                _0x40da55 += _0x25f282[_0x2c6f91['ztqrM'](parseInt, _0x2c6f91['CnLCK'](Math['random'](), _0x25f282['length']))];
            } else {
                if (jxncShareCodeArr[_0x2c6f91['Ppzwx']($['index'], 0x1)]) {
                    currentShareCode = jxncShareCodeArr[_0x2c6f91['uacQh']($['index'], 0x1)]['split']('@');
                    currentShareCode['push'](...shareCode['split']('@'));
                } else {
                    $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                    currentShareCode = shareCode['split']('@');
                }
                $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
                resolve();
            }
        }
        return _0x40da55;
    }
    return new Promise(_0x56c636 => {
        let _0x28c226 = _0x26357f(0x28);
        let _0x408618 = (+new Date())['toString']();
        if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
            console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\x0a');
            _0x56c636(null);
        }
        let _0x2f766a = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
        let _0x3d1b58 = $['md5']('' + decodeURIComponent(_0x2f766a) + _0x408618 + _0x28c226 + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
        currentToken = {
            'timestamp': _0x408618,
            'phoneid': _0x28c226,
            'farm_jstoken': _0x3d1b58
        };
        _0x2c6f91['SFwsJ'](_0x56c636);
    });
}

function jsonParse(_0x1af32d) {
    var _0x3f889d = {
        'sewKy': 'string',
        'Ulmex': function(_0x57eb2b, _0x2b79b5) {
            return _0x57eb2b !== _0x2b79b5;
        },
        'jZBKh': 'QNPcI',
        'NErAZ': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'
    };
    if (typeof _0x1af32d == _0x3f889d['sewKy']) {
        if (_0x3f889d['Ulmex']('QNPcI', _0x3f889d['jZBKh'])) {
            $['logErr'](e, resp);
        } else {
            try {
                return JSON['parse'](_0x1af32d);
            } catch (_0xbc359a) {
                console['log'](_0xbc359a);
                $['msg']($['name'], '', _0x3f889d['NErAZ']);
                return [];
            }
        }
    }
};
_0xodm = 'jsjiami.com.v6'

// prettier-ignore
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}