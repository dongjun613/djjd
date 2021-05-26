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
 *Progcessed By JSDec in 0.72s
 *JSDec - JSDec.js.org
 */
$['maxHelpNum'] = $['isNode']() ? 0x8 : 0x4;
$['helpNum'] = 0x0;
let assistUserShareCode = 0x0;
!(async () => {
    var _0x1b9a7f = {
        'YRsWu': function(_0x5e2087, _0x43258b) {
            return _0x5e2087(_0x43258b);
        },
        'udVLf': function(_0x1f3b15) {
            return _0x1f3b15();
        },
        'ttqMJ': '【提示】请先获取京东账号一cookie\x0a直接使用NobyDa的京东签到获取',
        'AxppU': 'https://bean.m.jd.com/bean/signIndex.action',
        'GCTBW': function(_0x15deb6, _0x1ffbbd) {
            return _0x15deb6 < _0x1ffbbd;
        },
        'KhYgZ': function(_0x51917d, _0xa056f7) {
            return _0x51917d !== _0xa056f7;
        },
        'FpIhx': 'aqGhF',
        'tFftX': function(_0x16360f, _0x349b28) {
            return _0x16360f(_0x349b28);
        },
        'nUlvE': function(_0x5c2a2d, _0xbbd7ad) {
            return _0x5c2a2d + _0xbbd7ad;
        },
        'bmUAK': function(_0x57fc69) {
            return _0x57fc69();
        },
        'rrWYS': 'https://bean.m.jd.com/',
        'UfAsA': 'pt_pin',
        'HJCTo': function(_0x2f6fe1) {
            return _0x2f6fe1();
        },
        'HKpax': function(_0x338add, _0x165c1b) {
            return _0x338add !== _0x165c1b;
        },
        'DVseA': 'JxsFw'
    };
    await _0x1b9a7f['udVLf'](requireConfig);
    if (!cookieArr[0x0]) {
        $['msg']($['name'], _0x1b9a7f['ttqMJ'], _0x1b9a7f['AxppU'], {
            'open-url': _0x1b9a7f['AxppU']
        });
        return;
    }
    for (let _0x3ea1ec = 0x0; _0x1b9a7f['GCTBW'](_0x3ea1ec, cookieArr['length']); _0x3ea1ec++) {
        if (_0x1b9a7f['KhYgZ']('OMxlD', _0x1b9a7f['FpIhx'])) {
            if (cookieArr[_0x3ea1ec]) {
                currentCookie = cookieArr[_0x3ea1ec];
                $['UserName'] = _0x1b9a7f['tFftX'](decodeURIComponent, currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/) && currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
                $['index'] = _0x1b9a7f['nUlvE'](_0x3ea1ec, 0x1);
                $['isLogin'] = !![];
                $['nickName'] = '';
                $['log']('\n************* 检查【京东账号' + $['index'] + '】' + $['UserName'] + ' cookie 是否有效 *************');
                await _0x1b9a7f['bmUAK'](TotalBean);
                $['log']('开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '\x0a');
                if (!$['isLogin']) {
                    $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
                        'open-url': _0x1b9a7f['rrWYS']
                    });
                    if ($['isNode']()) {
                        await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\n请重新登录获取cookie');
                    }
                    continue;
                }
                if (currentCookie['includes'](_0x1b9a7f['UfAsA'])) await getJxToken();
                subTitle = '';
                message = '';
                option = {};
                $['answer'] = 0x3;
                $['helpNum'] = 0x0;
                notifyBool = notifyLevel > 0x0;
                await shareCodesFormat();
                await _0x1b9a7f['HJCTo'](jdJXNC);
            }
        } else {
            _0x1b9a7f['YRsWu'](resolve, !![]);
        }
    }
    if ($['isNode']() && allMessage) {
        if (_0x1b9a7f['HKpax'](_0x1b9a7f['DVseA'], _0x1b9a7f['DVseA'])) {
            resolve();
        } else {
            await notify['sendNotify']('' + $['name'], '' + allMessage);
        }
    }
})()['catch'](_0xb4557 => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0xb4557 + '!', '');
    console['log'](_0xb4557);
})['finally'](() => {
    $['done']();
});

function changeShareCodeJson(_0x56bed4) {
    var _0x26208b = {
        'fCwZB': '请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie',
        'WJRoY': 'iksgN',
        'DpViE': 'smp',
        'VEihI': 'joinnum',
        'sKVmT': function(_0xc35fa9, _0x5c7784) {
            return _0xc35fa9 !== _0x5c7784;
        },
        'AdyVj': 'bwGZX'
    };
    try {
        if (_0x26208b['WJRoY'] === _0x26208b['WJRoY']) {
            let _0x218e1e = _0x56bed4 && JSON['parse'](_0x56bed4);
            return _0x218e1e[_0x26208b['DpViE']] && _0x218e1e['active'] && _0x218e1e[_0x26208b['VEihI']] ? _0x218e1e : '';
        } else {
            try {
                return JSON['parse'](str);
            } catch (_0x58bca7) {
                console['log'](_0x58bca7);
                $['msg']($['name'], '', _0x26208b['fCwZB']);
                return [];
            }
        }
    } catch (_0x593ed3) {
        if (_0x26208b['sKVmT'](_0x26208b['AdyVj'], 'HkHiZ')) {
            return '';
        } else {
            message += '【邀请码】提交成功！\x0a';
        }
    }
}

function requireConfig() {
    var _0x4b5fee = {
        'HtaYY': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'kdWFq': function(_0x427ea0, _0x5bc296) {
            return _0x427ea0 < _0x5bc296;
        },
        'GmUAw': function(_0x2943d9, _0xa23004) {
            return _0x2943d9(_0xa23004);
        },
        'ErwYE': function(_0x245c16, _0x56eec3) {
            return _0x245c16 * _0x56eec3;
        },
        'iZSUd': '邀请码提交失败 API 返回异常',
        'WvXBP': 'GirfJ',
        'saSAO': function(_0x2d359c, _0x7c6e3d) {
            return _0x2d359c !== _0x7c6e3d;
        },
        'peBeo': 'oqaIR',
        'bnhdA': 'HLRpn',
        'icDVO': '开始获取配置文件\n',
        'rkLww': function(_0x46ca7e, _0x376a04) {
            return _0x46ca7e(_0x376a04);
        },
        'dOvNu': './sendNotify',
        'TIJkZ': './jdCookie.js',
        'nsCng': './jdJxncShareCodes.js',
        'Sguim': function(_0x51c4ac, _0x685c4b) {
            return _0x51c4ac === _0x685c4b;
        },
        'MaFjE': 'false',
        'YLFYr': 'CookieJD',
        'btwae': function(_0x49516a, _0xc31db5) {
            return _0x49516a < _0xc31db5;
        },
        'DSHxs': function(_0x5c339c, _0x3b08fe) {
            return _0x5c339c !== _0x3b08fe;
        },
        'DTOXU': 'cwoYg',
        'ClOiM': '互助码格式变更通知',
        'OBRwh': 'eYYTy',
        'wvfTD': 'zh-cn',
        'WgOYF': 'keep-alive',
        'mJnlz': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        'KtKQE': function(_0x35da65) {
            return _0x35da65();
        }
    };
    return new Promise(async _0x15944f => {
        var _0x1e5613 = {
            'WHIQn': '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。',
            'TOjXw': function(_0xea9b0d, _0x16f2c6) {
                return _0xea9b0d !== _0x16f2c6;
            },
            'EEWMW': _0x4b5fee['WvXBP'],
            'BqfRv': function(_0x2f388b, _0x10ac8e) {
                return _0x4b5fee['saSAO'](_0x2f388b, _0x10ac8e);
            },
            'LbDMu': 'KDDSn'
        };
        if (_0x4b5fee['peBeo'] === _0x4b5fee['bnhdA']) {
            let _0x2c03e6 = _0x4b5fee['HtaYY'];
            let _0x31a423 = '';
            for (let _0x4a706c = 0x0; _0x4b5fee['kdWFq'](_0x4a706c, count); _0x4a706c++) {
                _0x31a423 += _0x2c03e6[_0x4b5fee['GmUAw'](parseInt, _0x4b5fee['ErwYE'](Math['random'](), _0x2c03e6['length']))];
            }
            return _0x31a423;
        } else {
            $['log'](_0x4b5fee['icDVO']);
            notify = $['isNode']() ? _0x4b5fee['rkLww'](require, _0x4b5fee['dOvNu']) : '';
            const _0x361d12 = $['isNode']() ? _0x4b5fee['rkLww'](require, _0x4b5fee['TIJkZ']) : '';
            const _0x1bff8d = $['isNode']() ? _0x4b5fee['rkLww'](require, _0x4b5fee['nsCng']) : {};
            if ($['isNode']()) {
                Object['keys'](_0x361d12)['forEach'](_0x960983 => {
                    if (_0x1e5613['TOjXw'](_0x1e5613['EEWMW'], 'qhOkX')) {
                        if (_0x361d12[_0x960983]) {
                            cookieArr['push'](_0x361d12[_0x960983]);
                        }
                    } else {
                        $['log'](_0x1e5613['WHIQn']);
                        message += '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。\x0a';
                        notifyBool = notifyBool && notifyLevel >= 0x3;
                        _0x15944f(![]);
                    }
                });
                if (process['env']['JD_DEBUG'] && _0x4b5fee['Sguim'](process['env']['JD_DEBUG'], _0x4b5fee['MaFjE'])) console['log'] = () => {};
            } else {
                cookieArr = [$['getdata'](_0x4b5fee['YLFYr']), $['getdata']('CookieJD2'), ...jsonParse($['getdata']('CookiesJD') || '[]')['map'](_0x4c31b5 => _0x4c31b5['cookie'])]['filter'](_0x357a27 => !!_0x357a27);
            }
            $['log']('共' + cookieArr['length'] + '个京东账号\n');
            for (let _0x2cf806 = 0x0; _0x4b5fee['btwae'](_0x2cf806, jxncShareCodeArr['length']); _0x2cf806++) {
                if (_0x4b5fee['DSHxs'](_0x4b5fee['DTOXU'], 'cwoYg')) {
                    $['log'](_0x4b5fee['iZSUd']);
                } else {
                    if (jxncShareCodeArr[_0x2cf806]) {
                        let _0x41b395 = jxncShareCodeArr[_0x2cf806];
                        let _0x167f8a = _0x41b395['split']('@');
                        if (!changeShareCodeJson(_0x167f8a[0x0])) {
                            $['log']('互助码格式已变更，请重新填写互助码');
                            $['msg']($['name'], _0x4b5fee['ClOiM'], '互助码格式变更，请重新填写 ‼️‼️', option);
                            if ($['isNode']()) {
                                if (_0x4b5fee['Sguim'](_0x4b5fee['OBRwh'], 'eYYTy')) {
                                    await notify['sendNotify']('' + $['name'], '互助码格式变更，请重新填写 ‼️‼️');
                                } else {
                                    if (_0x361d12[item]) {
                                        cookieArr['push'](_0x361d12[item]);
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            }
            $['log']('您提供了' + jxncShareCodeArr['length'] + '个账号的京喜农场助力码');
            try {
                let _0x3c0c71 = {
                    'url': 'http://120.76.219.92:18880/share_code/jxnc_code.txt',
                    'headers': {
                        'Accept': 'application/json,text/plain, */*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': _0x4b5fee['wvfTD'],
                        'Connection': _0x4b5fee['WgOYF'],
                        'User-Agent': _0x4b5fee['mJnlz']
                    },
                    'timeout': 0x2710
                };
                $['get'](_0x3c0c71, (_0x895c00, _0x3b6917, _0x76c6c3) => {
                    if (!_0x895c00) {
                        if (_0x1e5613['BqfRv']('qTvVd', _0x1e5613['LbDMu'])) {
                            shareCode = _0x76c6c3;
                        } else {
                            currentToken = tokenNull;
                        }
                    }
                });
            } catch (_0x1db39e) {}
            _0x4b5fee['KtKQE'](_0x15944f);
        }
    });
}

function TotalBean() {
    var _0x6b37de = {
        'ruLPQ': function(_0x508999, _0x2fc2c6) {
            return _0x508999 - _0x2fc2c6;
        },
        'YiUpK': function(_0x8e8052, _0x5be577) {
            return _0x8e8052 + _0x5be577;
        },
        'kyIBN': function(_0xc494b5, _0x3a5910) {
            return _0xc494b5(_0x3a5910);
        },
        'lgGOf': 'sECDb',
        'qhqYz': function(_0xcfb5b0, _0x5b2f9b) {
            return _0xcfb5b0 === _0x5b2f9b;
        },
        'doTUM': 'RtahJ',
        'WxAtZ': 'uJTmE',
        'pPEAV': 'UDHlU',
        'LLDEV': 'JxxSY',
        'GRwlv': 'LIABX',
        'lSAKM': 'application/json,text/plain, */*',
        'cWylE': 'application/x-www-form-urlencoded',
        'KCcDT': 'keep-alive',
        'lgXlE': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'bbKvc': './USER_AGENTS',
        'zmMGR': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return new Promise(async _0x583749 => {
        var _0x2f04b9 = {
            'HCQby': function(_0x7e07c1, _0x41e10b) {
                return _0x6b37de['ruLPQ'](_0x7e07c1, _0x41e10b);
            },
            'TUMDv': function(_0x6aa162, _0x26c796) {
                return _0x6aa162 !== _0x26c796;
            },
            'sGWmW': function(_0x14f839, _0x545f7e) {
                return _0x6b37de['YiUpK'](_0x14f839, _0x545f7e);
            },
            'fFyYE': function(_0x3955be, _0x418b13) {
                return _0x6b37de['kyIBN'](_0x3955be, _0x418b13);
            },
            'pBEtO': function(_0x5b7631, _0x2feafd) {
                return _0x5b7631 !== _0x2feafd;
            },
            'rIOYM': _0x6b37de['lgGOf'],
            'swczq': function(_0x40964b, _0x3a15fe) {
                return _0x6b37de['qhqYz'](_0x40964b, _0x3a15fe);
            },
            'iGezx': _0x6b37de['doTUM'],
            'DTkVM': _0x6b37de['WxAtZ'],
            'iUMcz': function(_0x4f0542, _0x1a5a9e) {
                return _0x4f0542 === _0x1a5a9e;
            },
            'DEtpr': function(_0x5ecad7, _0x18dad4) {
                return _0x6b37de['qhqYz'](_0x5ecad7, _0x18dad4);
            },
            'DzcUf': _0x6b37de['pPEAV'],
            'MLmcY': _0x6b37de['LLDEV'],
            'HcrrL': 'base',
            'hZriQ': _0x6b37de['GRwlv']
        };
        const _0x3021ac = {
            'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
            'headers': {
                'Accept': _0x6b37de['lSAKM'],
                'Content-Type': _0x6b37de['cWylE'],
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-cn',
                'Connection': _0x6b37de['KCcDT'],
                'Cookie': currentCookie,
                'Referer': _0x6b37de['lgXlE'],
                'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : require(_0x6b37de['bbKvc'])['USER_AGENT'] : $['getdata']('JDUA') ? $['getdata']('JDUA') : _0x6b37de['zmMGR']
            }
        };
        $['post'](_0x3021ac, (_0x1e32c7, _0x2329fd, _0x4ab922) => {
            var _0x10aff9 = {
                'lqjFu': function(_0x3a32bb) {
                    return _0x3a32bb();
                }
            };
            if (_0x2f04b9['pBEtO'](_0x2f04b9['rIOYM'], 'YHqwl')) {
                try {
                    if (_0x1e32c7) {
                        if (_0x2f04b9['swczq'](_0x2f04b9['iGezx'], 'oKMpY')) {
                            _0x10aff9['lqjFu'](_0x583749);
                            return;
                        } else {
                            console['log']('' + JSON['stringify'](_0x1e32c7));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        }
                    } else {
                        if (_0x2f04b9['pBEtO']('Fyayp', 'IoptG')) {
                            if (_0x4ab922) {
                                if (_0x2f04b9['swczq'](_0x2f04b9['DTkVM'], _0x2f04b9['DTkVM'])) {
                                    _0x4ab922 = JSON['parse'](_0x4ab922);
                                    if (_0x2f04b9['iUMcz'](_0x4ab922['retcode'], 0xd)) {
                                        $['isLogin'] = ![];
                                        return;
                                    }
                                    if (_0x2f04b9['DEtpr'](_0x4ab922['retcode'], 0x0)) {
                                        if (_0x2f04b9['DEtpr'](_0x2f04b9['DzcUf'], _0x2f04b9['MLmcY'])) {
                                            $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                                        } else {
                                            $['nickName'] = _0x4ab922[_0x2f04b9['HcrrL']] && _0x4ab922[_0x2f04b9['HcrrL']]['nickname'] || $['UserName'];
                                        }
                                    } else {
                                        $['nickName'] = $['UserName'];
                                    }
                                } else {
                                    currentToken = tokenArr[_0x2f04b9['HCQby']($['index'], 0x1)];
                                }
                            } else {
                                if ('LIABX' === _0x2f04b9['hZriQ']) {
                                    console['log']('京东服务器返回空数据');
                                } else {
                                    $['msg']($['name'], subTitle, message, option);
                                    if ($['isNode']()) {
                                        allMessage += subTitle + '\x0a' + message + (_0x2f04b9['TUMDv']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                                    }
                                }
                            }
                        } else {
                            let _0x2d2bfb = {
                                'smp': value,
                                'active': extra['active'],
                                'joinnum': extra['joinnum'] || 0x1
                            };
                            $['log'](_0x2f04b9['sGWmW']('获取随机助力码成功 ', JSON['stringify'](_0x2d2bfb)));
                            _0x2f04b9['fFyYE'](_0x583749, _0x2d2bfb);
                            return;
                        }
                    }
                } catch (_0x4eb4ea) {
                    $['logErr'](_0x4eb4ea, _0x2329fd);
                } finally {
                    _0x583749();
                }
            } else {
                cookieArr['push'](jdCookieNode[item]);
            }
        });
    });
}

function tokenFormat() {
    var _0x12b1cd = {
        'uKWVn': function(_0x4843f6, _0xf8cf8b) {
            return _0x4843f6 === _0xf8cf8b;
        },
        'OgYNd': 'false',
        'NBaKY': 'CookieJD2',
        'WPniR': 'vDhvb',
        'xwzkU': 'nPBKx',
        'wLncB': function(_0x1fe936, _0x2807a0) {
            return _0x1fe936 - _0x2807a0;
        },
        'CZSIY': 'yZRhV',
        'GdZsZ': 'biAGi'
    };
    return new Promise(async _0xe4ab9f => {
        var _0x228ffd = {
            'bnwkH': function(_0xfa60de, _0x2e963a) {
                return _0x12b1cd['uKWVn'](_0xfa60de, _0x2e963a);
            },
            'yrYdn': _0x12b1cd['OgYNd'],
            'DeKlv': 'CookieJD',
            'CARed': _0x12b1cd['NBaKY'],
            'YDHLB': function(_0x5bdff9, _0x47b5af) {
                return _0x5bdff9(_0x47b5af);
            }
        };
        if (_0x12b1cd['uKWVn'](_0x12b1cd['WPniR'], 'vDhvb')) {
            if (tokenArr[$['index'] - 0x1] && tokenArr[$['index'] - 0x1]['farm_jstoken']) {
                if (_0x12b1cd['xwzkU'] !== _0x12b1cd['xwzkU']) {
                    Object['keys'](jdCookieNode)['forEach'](_0x2dc776 => {
                        if (jdCookieNode[_0x2dc776]) {
                            cookieArr['push'](jdCookieNode[_0x2dc776]);
                        }
                    });
                    if (process['env']['JD_DEBUG'] && _0x228ffd['bnwkH'](process['env']['JD_DEBUG'], _0x228ffd['yrYdn'])) console['log'] = () => {};
                } else {
                    currentToken = tokenArr[_0x12b1cd['wLncB']($['index'], 0x1)];
                }
            } else {
                if (_0x12b1cd['uKWVn'](_0x12b1cd['CZSIY'], _0x12b1cd['GdZsZ'])) {
                    cookieArr = [$['getdata'](_0x228ffd['DeKlv']), $['getdata'](_0x228ffd['CARed']), ...jsonParse($['getdata']('CookiesJD') || '[]')['map'](_0x362d54 => _0x362d54['cookie'])]['filter'](_0x2576f4 => !!_0x2576f4);
                } else {
                    currentToken = tokenNull;
                }
            }
            _0xe4ab9f();
        } else {
            _0x228ffd['YDHLB'](_0xe4ab9f, ![]);
        }
    });
}

function shareCodesFormat() {
    var _0x4ff25f = {
        'qfjui': function(_0x88e250, _0x553f33) {
            return _0x88e250 !== _0x553f33;
        },
        'lsKKO': 'TtYaS',
        'nrPWX': function(_0x36794d, _0x35465b) {
            return _0x36794d - _0x35465b;
        },
        'sfbae': function(_0x5f04a6) {
            return _0x5f04a6();
        }
    };
    return new Promise(async _0x4d2c50 => {
        if (_0x4ff25f['qfjui'](_0x4ff25f['lsKKO'], _0x4ff25f['lsKKO'])) {
            $['drip'] += eachtimeget;
        } else {
            if (jxncShareCodeArr[_0x4ff25f['nrPWX']($['index'], 0x1)]) {
                currentShareCode = jxncShareCodeArr[$['index'] - 0x1]['split']('@');
                currentShareCode['push'](...shareCode['split']('@'));
            } else {
                $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                currentShareCode = shareCode['split']('@');
            }
            $['log']('第' + $['index'] + '个京东账号将要助力的好友' + JSON['stringify'](currentShareCode));
            _0x4ff25f['sfbae'](_0x4d2c50);
        }
    });
}
async function jdJXNC() {
    var _0x790bee = {
        'FnEXM': function(_0x38c4d3, _0x1be130) {
            return _0x38c4d3(_0x1be130);
        },
        'ZAZaZ': 'active',
        'WZmnx': 'joinnum',
        'bIuuC': function(_0x3178c2) {
            return _0x3178c2();
        },
        'GoyiH': function(_0x38b6c1, _0x48b61f) {
            return _0x38b6c1 <= _0x48b61f;
        },
        'PrEpD': 'cEKmZ',
        'lscOX': function(_0x534112, _0x44a732) {
            return _0x534112 === _0x44a732;
        },
        'XMFbg': function(_0x3f4b06, _0x492ef6) {
            return _0x3f4b06 !== _0x492ef6;
        },
        'MKnVh': 'MirBz',
        'ZXIYW': function(_0x509155, _0x3c79a1) {
            return _0x509155 !== _0x3c79a1;
        },
        'UqHUw': 'XWFKF',
        'fAnOj': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'lJnbU': function(_0x1b8112, _0x529226) {
            return _0x1b8112 + _0x529226;
        },
        'hWrtc': function(_0x28b8cb) {
            return _0x28b8cb();
        },
        'rRttT': 'TKYtG',
        'aIXhQ': 'CbSdM',
        'MJmWA': function(_0xfffa19, _0x3e3517, _0x5463c1) {
            return _0xfffa19(_0x3e3517, _0x5463c1);
        },
        'LCcHu': function(_0x1d0d86) {
            return _0x1d0d86();
        },
        'TNYPO': 'YlJne',
        'Fsbda': function(_0x284565, _0x1406ed) {
            return _0x284565 < _0x1406ed;
        },
        'kTwXH': function(_0xc8670b, _0x42c24d) {
            return _0xc8670b === _0x42c24d;
        },
        'nVqpO': 'ENLYq',
        'umNBB': function(_0x1e4c19, _0x1a31be, _0x45b085, _0x296c77) {
            return _0x1e4c19(_0x1a31be, _0x45b085, _0x296c77);
        },
        'oAnkB': 'smp',
        'iytIv': function(_0x3f0e27) {
            return _0x3f0e27();
        }
    };
    subTitle = '【京东账号' + $['index'] + '】' + $['nickName'];
    $['log']('获取用户信息 & 任务列表');
    const _0x236440 = await _0x790bee['bIuuC'](getTaskList);
    if (_0x236440) {
        message += '【水果名称】' + _0x236440['prizename'] + '\x0a';
        if (_0x790bee['GoyiH'](_0x236440['target'], _0x236440['score'])) {
            if (_0x790bee['PrEpD'] !== 'cEKmZ') {
                $['log'](taskname + '[做任务]： 任务已完成，跳过');
                _0x790bee['FnEXM'](resolve, ![]);
            } else {
                if (_0x790bee['lscOX'](_0x236440['activestatus'], 0x2)) {
                    if (_0x790bee['XMFbg']('MirBz', _0x790bee['MKnVh'])) {
                        $['logErr'](e, resp);
                    } else {
                        notifyBool = !![];
                        $['log']('【成熟】水果已成熟请及时收取，activestatus：' + _0x236440['activestatus'] + '\x0a');
                        message += '【成熟】水果已成熟请及时收取，activestatus：' + _0x236440['activestatus'] + '\x0a';
                    }
                } else if (_0x236440['activestatus'] === 0x0) {
                    if (_0x790bee['ZXIYW']('iPylT', _0x790bee['UqHUw'])) {
                        $['log'](_0x790bee['fAnOj']);
                        message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                        notifyBool = notifyBool && notifyLevel >= 0x3;
                    } else {
                        $['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码');
                        currentShareCode = shareCode['split']('@');
                    }
                }
            }
        } else {
            let _0x43676e = {
                'smp': $['info']['smp'],
                'active': $['info']['active'],
                'joinnum': $['info']['joinnum']
            };
            $['log'](_0x790bee['lJnbU']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】', JSON['stringify'](_0x43676e)));
            await $['wait'](0x1f4);
            const _0xad3825 = await _0x790bee['hWrtc'](browserTask);
            if (_0xad3825) {
                if (_0x790bee['ZXIYW'](_0x790bee['rRttT'], _0x790bee['aIXhQ'])) {
                    await $['wait'](0x1f4);
                    await _0x790bee['hWrtc'](answerTask);
                    await $['wait'](0x1f4);
                    const _0x567079 = await getTaskList();
                    _0x790bee['MJmWA'](getMessage, _0x567079, _0x236440);
                    await _0x790bee['FnEXM'](submitInviteId, $['UserName']);
                    await $['wait'](0x1f4);
                    let _0x792d2d = await _0x790bee['LCcHu'](helpFriends);
                    if (_0x792d2d) {
                        if (_0x790bee['ZXIYW']('lXDMx', _0x790bee['TNYPO'])) {
                            while (_0x790bee['Fsbda']($['helpNum'], $['maxHelpNum'])) {
                                $['helpNum']++;
                                assistUserShareCodeJson = await getAssistUser();
                                if (assistUserShareCodeJson) {
                                    if (_0x790bee['kTwXH'](_0x790bee['nVqpO'], _0x790bee['nVqpO'])) {
                                        await $['wait'](0x1f4);
                                        _0x792d2d = await _0x790bee['umNBB'](helpShareCode, assistUserShareCodeJson[_0x790bee['oAnkB']], assistUserShareCodeJson[_0x790bee['ZAZaZ']], assistUserShareCodeJson['joinnum']);
                                        if (_0x792d2d) {
                                            await $['wait'](0x3e8);
                                            continue;
                                        }
                                    } else {
                                        const {
                                            code,
                                            data = {}
                                        } = JSON['parse'](_data);
                                        $['log']('邀请码提交：' + code);
                                        if (data['value']) {
                                            message += '【邀请码】提交成功！\n';
                                        }
                                    }
                                }
                                break;
                            }
                        } else {
                            $['nickName'] = $['UserName'];
                        }
                    }
                } else {
                    try {
                        let _0x4b81bb = code && JSON['parse'](code);
                        return _0x4b81bb['smp'] && _0x4b81bb[_0x790bee['ZAZaZ']] && _0x4b81bb[_0x790bee['WZmnx']] ? _0x4b81bb : '';
                    } catch (_0x21875c) {
                        return '';
                    }
                }
            }
        }
    }
    await _0x790bee['iytIv'](showMsg);
}

function getTaskList() {
    var _0x28ebf4 = {
        'iKcbw': function(_0x582b1c, _0x5af663) {
            return _0x582b1c(_0x5af663);
        },
        'yCKHC': function(_0x217cb8, _0x137861, _0x3e34cd) {
            return _0x217cb8(_0x137861, _0x3e34cd);
        },
        'IqBid': 'query'
    };
    return new Promise(async _0x3f8240 => {
        var _0x958cc4 = {
            'MSXOo': function(_0x42f7da, _0x2fce6e) {
                return _0x28ebf4['iKcbw'](_0x42f7da, _0x2fce6e);
            },
            'LOxXP': function(_0x580c06, _0x38c5dc) {
                return _0x580c06(_0x38c5dc);
            }
        };
        $['get'](_0x28ebf4['yCKHC'](taskUrl, _0x28ebf4['IqBid'], 'type=1'), async (_0x43b04a, _0x1e98ba, _0x5146bc) => {
            try {
                const _0x3555a6 = _0x5146bc['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                const {
                    detail,
                    msg,
                    task = [],
                    retmsg,
                    ..._0x5698e8
                } = JSON['parse'](_0x3555a6);
                $['detail'] = detail;
                $['helpTask'] = task['filter'](_0x41f71e => _0x41f71e['tasktype'] === 0x2)[0x0] || {
                    'eachtimeget': 0x0,
                    'limit': 0x0
                };
                $['allTask'] = task['filter'](_0xfaf8c => _0xfaf8c['tasktype'] !== 0x3 && _0xfaf8c['tasktype'] !== 0x2 && parseInt(_0xfaf8c['left']) > 0x0);
                $['info'] = _0x5698e8;
                $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                if (!$['info']['active']) {
                    $['log']('账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。');
                    message += '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。\x0a';
                    notifyBool = notifyBool && notifyLevel >= 0x3;
                    _0x958cc4['MSXOo'](_0x3f8240, ![]);
                }
                _0x3f8240(_0x5698e8);
            } catch (_0x557fbc) {
                $['logErr'](_0x557fbc, _0x1e98ba);
            } finally {
                _0x958cc4['LOxXP'](_0x3f8240, !![]);
            }
        });
    });
}

function browserTask() {
    var _0x35a20c = {
        'PZWVA': function(_0x49a343, _0x195a66) {
            return _0x49a343 !== _0x195a66;
        },
        'BgkYJ': function(_0x4e742d, _0x3bc3a9) {
            return _0x4e742d !== _0x3bc3a9;
        },
        'OnBdT': '活动太火爆了',
        'hJXck': function(_0x3fec4a, _0x4f6746) {
            return _0x3fec4a === _0x4f6746;
        },
        'qdpYn': function(_0x1514f2, _0x22f319) {
            return _0x1514f2(_0x22f319);
        },
        'IpXzx': function(_0x1ffceb) {
            return _0x1ffceb();
        },
        'loqfA': function(_0x91ad49, _0xd66000) {
            return _0x91ad49 * _0xd66000;
        },
        'BXBnW': function(_0x5c30b7, _0x42f9da) {
            return _0x5c30b7 - _0x42f9da;
        },
        'PNpJH': function(_0x2528d6) {
            return _0x2528d6();
        },
        'hyLjR': function(_0x51c790, _0x1bfc58) {
            return _0x51c790 < _0x1bfc58;
        },
        'LXyIp': 'TnqlX',
        'YtmsJ': function(_0x1e2cb3, _0x44d614) {
            return _0x1e2cb3 + _0x44d614;
        },
        'gfYch': function(_0x2eba43, _0xfaf269) {
            return _0x2eba43 * _0xfaf269;
        },
        'cGkEv': 'qRBGa',
        'PgqSY': function(_0x18ba2, _0x5e177d) {
            return _0x18ba2 !== _0x5e177d;
        },
        'eCAMg': 'jJXxJ',
        'hODOw': '水滴已满，果实成熟，跳过所有任务',
        'zPLQM': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子',
        'Pyqlz': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n'
    };
    return new Promise(async _0x1a8dbe => {
        const _0x10ae7c = $['allTask']['filter'](_0x3d2eeb => _0x3d2eeb['tasklevel'] !== 0x6);
        const _0x281f1d = Math['max'](...[..._0x10ae7c]['map'](_0x37ffe2 => _0x37ffe2['limit']));
        for (let _0x1d2f8e = 0x0; _0x35a20c['hyLjR'](_0x1d2f8e, _0x10ae7c['length']); _0x1d2f8e++) {
            if (_0x35a20c['hJXck'](_0x35a20c['LXyIp'], 'ybLkh')) {
                const _0x4c61f8 = data['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                let {
                    ret,
                    retmsg
                } = JSON['parse'](_0x4c61f8);
                retmsg = _0x35a20c['PZWVA'](retmsg, '') ? retmsg : '成功';
                $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:\"' + (_0x35a20c['BgkYJ'](retmsg['indexOf'](_0x35a20c['OnBdT']), -0x1) ? '任务进行中或者未到任务时间' : retmsg) + '\"');
                if (_0x35a20c['hJXck'](ret, 0x0)) {
                    $['drip'] += eachtimeget;
                }
                _0x35a20c['qdpYn'](_0x1a8dbe, ret);
            } else {
                const _0x239225 = _0x10ae7c[_0x1d2f8e];
                $['log']('开始第' + _0x35a20c['YtmsJ'](_0x1d2f8e, 0x1) + '个任务：' + _0x239225['taskname']);
                const _0x446618 = [0x0];
                for (let _0x1d2f8e = 0x0; _0x1d2f8e < _0x281f1d; _0x1d2f8e++) {
                    const _0x21c78e = _0x35a20c['loqfA'](Math['random'](), 0x3);
                    await $['wait'](_0x35a20c['gfYch'](_0x21c78e, 0x3e8));
                    if (_0x35a20c['hJXck'](_0x446618[0x0], 0x0)) {
                        if (_0x35a20c['hJXck']('hblNT', 'hblNT')) {
                            _0x446618[0x0] = await _0x35a20c['qdpYn'](doTask, _0x239225);
                        } else {
                            _0x35a20c['IpXzx'](_0x1a8dbe);
                            return;
                        }
                    }
                    if (_0x446618[0x0] !== 0x0) {
                        if (_0x35a20c['cGkEv'] !== 'qRBGa') {
                            str += _sym[_0x35a20c['qdpYn'](parseInt, _0x35a20c['loqfA'](Math['random'](), _sym['length']))];
                        } else {
                            break;
                        }
                    }
                }
                if (_0x35a20c['hJXck'](_0x446618[0x0], 0x3f9)) {
                    if (_0x35a20c['PgqSY']('jJXxJ', _0x35a20c['eCAMg'])) {
                        if (tokenArr[_0x35a20c['BXBnW']($['index'], 0x1)] && tokenArr[_0x35a20c['BXBnW']($['index'], 0x1)]['farm_jstoken']) {
                            currentToken = tokenArr[$['index'] - 0x1];
                        } else {
                            currentToken = tokenNull;
                        }
                        _0x35a20c['PNpJH'](_0x1a8dbe);
                    } else {
                        $['log'](_0x35a20c['hODOw']);
                        _0x1a8dbe(!![]);
                        break;
                    }
                }
                if (_0x35a20c['hJXck'](_0x446618[0x0], 0x408)) {
                    $['log'](_0x35a20c['zPLQM']);
                    message += _0x35a20c['Pyqlz'];
                    notifyBool = notifyBool && notifyLevel >= 0x2;
                    _0x35a20c['qdpYn'](_0x1a8dbe, ![]);
                    return;
                }
                $['log']('结束第' + _0x35a20c['YtmsJ'](_0x1d2f8e, 0x1) + '个任务：' + _0x239225['taskname']);
            }
        }
        _0x1a8dbe(!![]);
    });
}

function answerTask() {
    var _0x121c71 = {
        'WNcAw': function(_0x4731fb, _0x34db54) {
            return _0x4731fb + _0x34db54;
        },
        'UFgti': function(_0x2370af) {
            return _0x2370af();
        },
        'gDfvz': function(_0x30d340, _0x295517) {
            return _0x30d340 !== _0x295517;
        },
        'OCSLb': function(_0x38a76d, _0x1db5ce) {
            return _0x38a76d === _0x1db5ce;
        },
        'RmtqW': 'khizg',
        'FavRg': 'IROZo',
        'RnBUF': function(_0x570d61, _0x24afe0) {
            return _0x570d61 <= _0x24afe0;
        },
        'jQDWC': function(_0x26c94c, _0x1b85cd) {
            return _0x26c94c(_0x1b85cd);
        },
        'UkWom': 'jEPSM',
        'Szifu': 'JAogj',
        'BzcQE': function(_0x573b9c, _0x42c54b, _0x4671cf) {
            return _0x573b9c(_0x42c54b, _0x4671cf);
        },
        'mcNoU': function(_0x3f73c1, _0x51b30d) {
            return _0x3f73c1(_0x51b30d);
        }
    };
    const _0x20e91a = $['allTask']['filter'](_0x33e419 => _0x33e419['tasklevel'] === 0x6);
    if (!_0x20e91a || !_0x20e91a[0x0]) return;
    const {
        tasklevel,
        left,
        taskname,
        eachtimeget
    } = _0x20e91a[0x0];
    $['log']('准备做答题任务：' + taskname);
    return new Promise(async _0x8bcd3c => {
        var _0x237032 = {
            'AzCyr': function(_0x10dfb3, _0x210e74) {
                return _0x121c71['WNcAw'](_0x10dfb3, _0x210e74);
            },
            'XsIwO': function(_0x506edb, _0x4152e3) {
                return _0x506edb(_0x4152e3);
            },
            'htxuu': function(_0x41677f) {
                return _0x121c71['UFgti'](_0x41677f);
            },
            'sSAFG': function(_0x44f4ca, _0x590369) {
                return _0x44f4ca === _0x590369;
            },
            'pETWc': function(_0x24468b, _0x4abddc) {
                return _0x121c71['gDfvz'](_0x24468b, _0x4abddc);
            },
            'EyCHv': '活动太火爆了',
            'jbvCB': function(_0x2af2c2, _0x1e222f) {
                return _0x121c71['OCSLb'](_0x2af2c2, _0x1e222f);
            },
            'yXXmm': function(_0x1679d1, _0x2004be) {
                return _0x121c71['gDfvz'](_0x1679d1, _0x2004be);
            },
            'weCzv': _0x121c71['RmtqW'],
            'XOFoQ': function(_0x16f02d, _0x11d9f6) {
                return _0x16f02d !== _0x11d9f6;
            },
            'OQzFE': 'fdaCW',
            'cwuIv': _0x121c71['FavRg']
        };
        if (_0x121c71['RnBUF'](_0x121c71['jQDWC'](parseInt, left), 0x0)) {
            if (_0x121c71['UkWom'] !== _0x121c71['Szifu']) {
                _0x121c71['jQDWC'](_0x8bcd3c, ![]);
                $['log'](taskname + '[做任务]： 任务已完成，跳过');
                return;
            } else {
                const {
                    code,
                    data: {
                        value,
                        extra = {}
                    } = {}
                } = JSON['parse'](_data);
                if (value && extra['active']) {
                    let _0x5d541a = {
                        'smp': value,
                        'active': extra['active'],
                        'joinnum': extra['joinnum'] || 0x1
                    };
                    $['log'](_0x237032['AzCyr']('获取随机助力码成功 ', JSON['stringify'](_0x5d541a)));
                    _0x237032['XsIwO'](_0x8bcd3c, _0x5d541a);
                    return;
                } else {
                    $['log']('获取随机助力码失败 ' + code);
                }
            }
        }
        $['get'](_0x121c71['BzcQE'](taskUrl, 'dotask', 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':' + ['A', 'B', 'C', 'D'][$['answer']] + ':0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0x121c71['mcNoU'](encodeURIComponent, 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp')), async (_0x12e7d5, _0x5259a8, _0x1740d1) => {
            try {
                if (_0x237032['sSAFG']('MMeUl', 'MCMEc')) {
                    return ![];
                } else {
                    const _0x28bccf = _0x1740d1['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    let {
                        ret,
                        retmsg,
                        right
                    } = JSON['parse'](_0x28bccf);
                    retmsg = retmsg !== '' ? retmsg : '成功';
                    $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x237032['pETWc'](retmsg['indexOf'](_0x237032['EyCHv']), -0x1) ? '任务进行中或者未到任务时间' : retmsg) + '\"');
                    if (_0x237032['jbvCB'](ret, 0x0) && _0x237032['jbvCB'](right, 0x1)) {
                        $['drip'] += eachtimeget;
                    }
                    if (ret === 0x3f9 || _0x237032['jbvCB'](ret, 0x3f4)) {
                        _0x237032['htxuu'](_0x8bcd3c);
                        return;
                    }
                    if ((_0x237032['pETWc'](ret, 0x0) && _0x237032['yXXmm'](ret, 0x405) || retmsg === 'ans err') && $['answer'] > 0x0) {
                        if (_0x237032['jbvCB'](_0x237032['weCzv'], 'khizg')) {
                            $['answer']--;
                            await $['wait'](0x3e8);
                            await _0x237032['htxuu'](answerTask);
                        } else {
                            _0x8bcd3c(![]);
                            $['log'](taskname + '[做任务]： 任务已完成，跳过');
                            return;
                        }
                    }
                }
            } catch (_0x2d7616) {
                $['logErr'](_0x2d7616, _0x5259a8);
            } finally {
                if (_0x237032['XOFoQ'](_0x237032['OQzFE'], _0x237032['cwuIv'])) {
                    _0x8bcd3c();
                } else {
                    var _0x56be39 = {
                        'MoxnL': function(_0x5f5f2e, _0x16915b) {
                            return _0x5f5f2e - _0x16915b;
                        },
                        'AXYZv': function(_0x59cf95) {
                            return _0x237032['htxuu'](_0x59cf95);
                        }
                    };
                    return new Promise(async _0x85168a => {
                        if (tokenArr[_0x56be39['MoxnL']($['index'], 0x1)] && tokenArr[$['index'] - 0x1]['farm_jstoken']) {
                            currentToken = tokenArr[_0x56be39['MoxnL']($['index'], 0x1)];
                        } else {
                            currentToken = tokenNull;
                        }
                        _0x56be39['AXYZv'](_0x85168a);
                    });
                }
            }
        });
    });
}

function getMessage(_0x472b29, _0x414638) {
    var _0x11caee = {
        'nKJRW': function(_0x27b90f, _0x5b2cff) {
            return _0x27b90f >= _0x5b2cff;
        },
        'OGIBu': function(_0x4fb9b1, _0x12d1c7) {
            return _0x4fb9b1 !== _0x12d1c7;
        },
        'ojpiu': 'OTFrl',
        'GpxYF': function(_0x43ffd8, _0x3e971b) {
            return _0x43ffd8 / _0x3e971b;
        },
        'DbEDl': function(_0x35ff53, _0x1048d2) {
            return _0x35ff53 <= _0x1048d2;
        },
        'GWXmX': function(_0xb717b5, _0x24cfee) {
            return _0xb717b5 === _0x24cfee;
        },
        'yFGZn': function(_0x4478cb, _0x4a4cf4) {
            return _0x4478cb > _0x4a4cf4;
        },
        'MdYpT': function(_0x435e1f, _0x1ca1b8) {
            return _0x435e1f > _0x1ca1b8;
        },
        'wAnpT': function(_0xb0b4f2, _0x20d4e0) {
            return _0xb0b4f2 > _0x20d4e0;
        },
        'SYQja': function(_0x35979c, _0x13795f) {
            return _0x35979c >= _0x13795f;
        },
        'OAzFF': function(_0x200433, _0x4857da) {
            return _0x200433 !== _0x4857da;
        },
        'yUflq': 'OZZyN',
        'jOuAG': function(_0x2852aa, _0x19d616) {
            return _0x2852aa >= _0x19d616;
        }
    };
    const _0xa00279 = _0x472b29['target'] - _0x472b29['score'];
    const _0x15e7f4 = _0x472b29['modifyscore'];
    const _0x514bfd = _0x414638['modifyscore'];
    let _0x259144 = 0x0;
    if ($['detail']) {
        let _0x42acd4 = _0x11caee['GpxYF'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
        $['detail']['forEach'](function(_0x4cd0f8, _0x3dc23f) {
            if (_0x11caee['nKJRW'](_0x4cd0f8['time'], _0x42acd4) && _0x4cd0f8['score']) {
                if (_0x11caee['OGIBu'](_0x11caee['ojpiu'], _0x11caee['ojpiu'])) {
                    if (_0x4cd0f8['time'] >= _0x42acd4 && _0x4cd0f8['score']) {
                        _0x259144 += _0x4cd0f8['score'];
                    }
                } else {
                    _0x259144 += _0x4cd0f8['score'];
                }
            }
        });
    }
    message += '【水滴】本次获得' + _0x15e7f4 + ' 离线获得' + _0x514bfd + ' 今日获得' + _0x259144 + ' 还需水滴' + _0xa00279 + '\x0a';
    if (_0x11caee['DbEDl'](_0xa00279, 0x0)) {
        if (_0x11caee['GWXmX']('LPzGK', 'zpRSk')) {
            allMessage += subTitle + '\x0a' + message + (_0x11caee['OGIBu']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
        } else {
            notifyBool = !![];
            message += '【成熟】水果已成熟请及时收取，deliverState：' + _0x472b29['deliverState'] + '\x0a';
            return;
        }
    }
    if (_0x11caee['yFGZn'](_0x15e7f4, 0x0) || _0x11caee['yFGZn'](_0x514bfd, 0x0) || _0x11caee['MdYpT'](_0x259144, 0x0)) {
        const _0x78edb5 = Math['ceil'](_0x11caee['GpxYF'](_0xa00279, _0x11caee['wAnpT'](_0x259144, 0x0) ? _0x259144 : _0x15e7f4 + _0x514bfd));
        message += '【预测】还需 ' + _0x78edb5 + ' 天\x0a';
    }
    if (_0x11caee['wAnpT'](_0x15e7f4, 0x0) || _0x11caee['wAnpT'](_0x514bfd, 0x0)) {
        notifyBool = notifyBool && _0x11caee['SYQja'](notifyLevel, 0x1);
    } else {
        if (_0x11caee['OAzFF'](_0x11caee['yUflq'], _0x11caee['yUflq'])) {
            return JSON['parse'](str);
        } else {
            notifyBool = notifyBool && _0x11caee['jOuAG'](notifyLevel, 0x2);
        }
    }
}

function submitInviteId(_0x5c9312) {
    var _0x3f7fde = {
        'slxxS': 'base',
        'ucFhW': function(_0x26ab5f, _0xd911ca) {
            return _0x26ab5f >= _0xd911ca;
        },
        'nqEEW': function(_0x31cec4, _0x23fed4) {
            return _0x31cec4 === _0x23fed4;
        },
        'hgtdV': 'Osrue',
        'eKRCZ': '邀请码提交失败 API 返回异常',
        'cJgft': function(_0x59bfdc) {
            return _0x59bfdc();
        },
        'HXzit': function(_0xf94f7c, _0x428b71) {
            return _0xf94f7c == _0x428b71;
        },
        'jgala': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'sHWLy': 'QmwvN',
        'BNfZC': function(_0x17ddbd, _0xeb2a8f) {
            return _0x17ddbd !== _0xeb2a8f;
        },
        'CgsYS': 'hwQpj',
        'QYJpN': 'aBOph'
    };
    return new Promise(_0x416348 => {
        var _0x1a9ce5 = {
            'cLQPN': function(_0x708468, _0x1a8828) {
                return _0x3f7fde['HXzit'](_0x708468, _0x1a8828);
            },
            'LQSMp': 'string',
            'pVlGd': _0x3f7fde['jgala']
        };
        if (_0x3f7fde['sHWLy'] !== _0x3f7fde['sHWLy']) {
            $['nickName'] = data[_0x3f7fde['slxxS']] && data['base']['nickname'] || $['UserName'];
        } else {
            if (!$['info'] || !$['info']['smp']) {
                if (_0x3f7fde['BNfZC'](_0x3f7fde['CgsYS'], 'AglYf')) {
                    _0x3f7fde['cJgft'](_0x416348);
                    return;
                } else {
                    notifyBool = notifyBool && _0x3f7fde['ucFhW'](notifyLevel, 0x2);
                }
            }
            try {
                if (_0x3f7fde['nqEEW']('gqcXL', _0x3f7fde['QYJpN'])) {
                    notifyBool = !![];
                    $['log']('【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a');
                    message += '【成熟】水果已成熟请及时收取，activestatus：' + startInfo['activestatus'] + '\x0a';
                } else {
                    $['post']({
                        'url': 'https://api.ninesix.cc/api/jx-nc/' + $['info']['smp'] + '/' + encodeURIComponent(_0x5c9312) + '?active=' + $['info']['active'] + '&joinnum=' + $['info']['joinnum'],
                        'timeout': 0x2710
                    }, (_0x4edf95, _0x19a66f, _0x10444f) => {
                        if (_0x3f7fde['nqEEW'](_0x3f7fde['hgtdV'], _0x3f7fde['hgtdV'])) {
                            try {
                                const {
                                    code,
                                    data = {}
                                } = JSON['parse'](_0x10444f);
                                $['log']('邀请码提交：' + code);
                                if (data['value']) {
                                    message += '【邀请码】提交成功！\n';
                                }
                            } catch (_0x3c3f77) {
                                $['log'](_0x3f7fde['eKRCZ']);
                            } finally {
                                _0x3f7fde['cJgft'](_0x416348);
                            }
                        } else {
                            if (_0x1a9ce5['cLQPN'](typeof str, _0x1a9ce5['LQSMp'])) {
                                try {
                                    return JSON['parse'](str);
                                } catch (_0x2ad8fa) {
                                    console['log'](_0x2ad8fa);
                                    $['msg']($['name'], '', _0x1a9ce5['pVlGd']);
                                    return [];
                                }
                            }
                        }
                    });
                }
            } catch (_0x29cd98) {
                _0x416348();
            }
        }
    });
}

function getAssistUser() {
    var _0x1b94fb = {
        'BUhjI': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。',
        'dvXPh': function(_0x226620, _0x2e47ea) {
            return _0x226620 >= _0x2e47ea;
        },
        'HhADQ': function(_0x503b73, _0xb28f29) {
            return _0x503b73(_0xb28f29);
        },
        'tnWFd': function(_0x5ccc13, _0x538f65) {
            return _0x5ccc13(_0x538f65);
        },
        'SKsrn': function(_0x509841, _0x4cba30) {
            return _0x509841(_0x4cba30);
        },
        'QOtvD': function(_0xf7ab31, _0x28ec5a) {
            return _0xf7ab31 !== _0x28ec5a;
        },
        'aHhvO': 'gEcyp',
        'OEBeY': 'nxxBJ',
        'ANmeL': '获取随机助力码失败 API 返回异常',
        'suitj': function(_0x524e90, _0x4a0665) {
            return _0x524e90 === _0x4a0665;
        },
        'NIeiR': function(_0x129015, _0x4a2d64) {
            return _0x129015 === _0x4a2d64;
        },
        'hEiza': 'njtdE',
        'ADsMB': 'APecI'
    };
    return new Promise(_0x20a924 => {
        if (_0x1b94fb['NIeiR'](_0x1b94fb['hEiza'], _0x1b94fb['hEiza'])) {
            try {
                if (_0x1b94fb['QOtvD'](_0x1b94fb['ADsMB'], 'APecI')) {
                    const _0x1f0015 = data['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                    const {
                        detail,
                        msg,
                        task = [],
                        retmsg,
                        ..._0x231fd0
                    } = JSON['parse'](_0x1f0015);
                    $['detail'] = detail;
                    $['helpTask'] = task['filter'](_0x4f680a => _0x4f680a['tasktype'] === 0x2)[0x0] || {
                        'eachtimeget': 0x0,
                        'limit': 0x0
                    };
                    $['allTask'] = task['filter'](_0x5b4826 => _0x5b4826['tasktype'] !== 0x3 && _0x5b4826['tasktype'] !== 0x2 && parseInt(_0x5b4826['left']) > 0x0);
                    $['info'] = _0x231fd0;
                    $['log']('获取任务列表 ' + retmsg + ' 总共' + $['allTask']['length'] + '个任务！');
                    if (!$['info']['active']) {
                        $['log'](_0x1b94fb['BUhjI']);
                        message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                        notifyBool = notifyBool && _0x1b94fb['dvXPh'](notifyLevel, 0x3);
                        _0x1b94fb['HhADQ'](_0x20a924, ![]);
                    }
                    _0x1b94fb['tnWFd'](_0x20a924, _0x231fd0);
                } else {
                    $['get']({
                        'url': 'http://120.76.219.92:18880/api/jx-nc?active=' + $['info']['active'],
                        'timeout': 0x2710
                    }, async (_0x32bbf9, _0x4e92bd, _0x1f17fb) => {
                        var _0x17b307 = {
                            'czbBo': function(_0x11852f, _0x88f424) {
                                return _0x1b94fb['SKsrn'](_0x11852f, _0x88f424);
                            }
                        };
                        try {
                            if (_0x1b94fb['QOtvD'](_0x1b94fb['aHhvO'], _0x1b94fb['OEBeY'])) {
                                const {
                                    code,
                                    data: {
                                        value,
                                        extra = {}
                                    } = {}
                                } = JSON['parse'](_0x1f17fb);
                                if (value && extra['active']) {
                                    let _0x43bb1b = {
                                        'smp': value,
                                        'active': extra['active'],
                                        'joinnum': extra['joinnum'] || 0x1
                                    };
                                    $['log']('获取随机助力码成功 ' + JSON['stringify'](_0x43bb1b));
                                    _0x1b94fb['SKsrn'](_0x20a924, _0x43bb1b);
                                    return;
                                } else {
                                    $['log']('获取随机助力码失败 ' + code);
                                }
                            } else {
                                _0x17b307['czbBo'](_0x20a924, ![]);
                            }
                        } catch (_0x3c5392) {
                            $['log'](_0x1b94fb['ANmeL']);
                        } finally {
                            _0x20a924(![]);
                        }
                    });
                }
            } catch (_0x39b45f) {
                _0x1b94fb['SKsrn'](_0x20a924, ![]);
            }
        } else {
            if (_0x1b94fb['suitj'](ret, 0x93)) {
                $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
            }
            _0x1b94fb['SKsrn'](_0x20a924, ![]);
            return;
        }
    });
}
async function helpFriends() {
    var _0x25139d = {
        'UFkCE': function(_0x2d53c7, _0x6c356d) {
            return _0x2d53c7 !== _0x6c356d;
        },
        'dwoVd': '1|3|0|2|4',
        'tDfKO': function(_0x13f59b, _0x4b8c16) {
            return _0x13f59b >= _0x4b8c16;
        },
        'hLukP': function(_0x1eb445, _0x148339) {
            return _0x1eb445(_0x148339);
        },
        'ICqcz': '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n',
        'wYTYa': 'OxWcL',
        'EYqnm': 'zeyAT',
        'yLFDj': function(_0x8ea194, _0x27d886) {
            return _0x8ea194 === _0x27d886;
        },
        'RIvGv': 'CAiBh',
        'FCgsC': 'smp'
    };
    for (let _0x15b35b of currentShareCode) {
        if (!_0x15b35b) {
            if (_0x25139d['wYTYa'] !== _0x25139d['EYqnm']) {
                continue;
            } else {
                if (notifyBool) {
                    $['msg']($['name'], subTitle, message, option);
                    if ($['isNode']()) {
                        allMessage += subTitle + '\x0a' + message + (_0x25139d['UFkCE']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
                    }
                } else {
                    $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                }
            }
        }
        let _0x4ba7f3 = changeShareCodeJson(_0x15b35b);
        if (!_0x4ba7f3) {
            if (_0x25139d['yLFDj']('jHybO', _0x25139d['RIvGv'])) {
                var _0x534336 = _0x25139d['dwoVd']['split']('|'),
                    _0x258f73 = 0x0;
                while (!![]) {
                    switch (_0x534336[_0x258f73++]) {
                        case '0':
                            notifyBool = notifyBool && _0x25139d['tDfKO'](notifyLevel, 0x2);
                            continue;
                        case '1':
                            $['log']('任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子');
                            continue;
                        case '2':
                            _0x25139d['hLukP'](resolve, ![]);
                            continue;
                        case '3':
                            message += _0x25139d['ICqcz'];
                            continue;
                        case '4':
                            return;
                    }
                    break;
                }
            } else {
                console['log']('助力码非 json 格式，跳过');
                continue;
            }
        }
        const _0x49fd7e = await helpShareCode(_0x4ba7f3[_0x25139d['FCgsC']], _0x4ba7f3['active'], _0x4ba7f3['joinnum']);
        if (!_0x49fd7e) {
            return ![];
        }
        await $['wait'](0x3e8);
    }
    return !![];
}

function helpShareCode(_0x9963f2, _0x59ce6f, _0x1b6d82) {
    var _0x25b184 = {
        'upbSu': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'jfPCy': 'https://bean.m.jd.com/bean/signIndex.action',
        'jrVDE': 'bHMmN',
        'oOEYx': 'exVTe',
        'XWLzx': function(_0x5b4dfe, _0x5ad453) {
            return _0x5b4dfe(_0x5ad453);
        },
        'jATpL': function(_0x2d92f2, _0x15cf62) {
            return _0x2d92f2 === _0x15cf62;
        },
        'dUqcv': 'mxAEX',
        'roLnz': '助力码与当前账号相同，跳过助力。准备进行下一个助力',
        'vWqvQ': function(_0x5a35e3, _0x20aa64) {
            return _0x5a35e3(_0x20aa64);
        },
        'nINvm': function(_0x1a029b, _0x5d635c, _0x4daae6) {
            return _0x1a029b(_0x5d635c, _0x4daae6);
        },
        'EUhvN': 'help'
    };
    return new Promise(async _0x210da2 => {
        var _0x564cfd = {
            'nonCP': function(_0x3d908a) {
                return _0x3d908a();
            },
            'drhUQ': _0x25b184['jrVDE'],
            'SVHIx': function(_0x1c0f27, _0x12c3a1) {
                return _0x1c0f27 === _0x12c3a1;
            },
            'JHZEM': _0x25b184['oOEYx'],
            'CqXVo': function(_0x3258a6, _0x51215e) {
                return _0x3258a6(_0x51215e);
            },
            'KYtNB': function(_0x400b3a, _0x5b456a) {
                return _0x25b184['XWLzx'](_0x400b3a, _0x5b456a);
            }
        };
        if (_0x25b184['jATpL'](_0x25b184['dUqcv'], 'DxfXG')) {
            $['msg']($['name'], _0x25b184['upbSu'], _0x25b184['jfPCy'], {
                'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
            });
            return;
        } else {
            if (_0x9963f2 === $['info']['smp']) {
                $['log'](_0x25b184['roLnz']);
                _0x25b184['vWqvQ'](_0x210da2, !![]);
            }
            $['log']('即将助力 share {"smp":"' + _0x9963f2 + '","active":"' + _0x59ce6f + '\",\"joinnum\":\"' + _0x1b6d82 + '\"}');
            $['get'](_0x25b184['nINvm'](taskUrl, _0x25b184['EUhvN'], 'active=' + _0x59ce6f + '&joinnum=' + _0x1b6d82 + '&smp=' + _0x9963f2), async (_0x4ec011, _0x176ecc, _0x329215) => {
                var _0x56e29c = {
                    'fNfDN': 'smp',
                    'HFFDu': 'active',
                    'HlWwD': 'joinnum'
                };
                if ('yKErL' === _0x564cfd['drhUQ']) {
                    let _0x32719f = code && JSON['parse'](code);
                    return _0x32719f[_0x56e29c['fNfDN']] && _0x32719f[_0x56e29c['HFFDu']] && _0x32719f[_0x56e29c['HlWwD']] ? _0x32719f : '';
                } else {
                    try {
                        const _0x92bfbc = _0x329215['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                        const {
                            ret,
                            retmsg = ''
                        } = JSON['parse'](_0x92bfbc);
                        $['log']('助力结果：ret=' + ret + ' retmsg=\"' + (retmsg ? retmsg : 'OK') + '\"');
                        if (_0x564cfd['SVHIx'](ret, 0x93) || _0x564cfd['SVHIx'](ret, 0x3f8)) {
                            if (_0x564cfd['SVHIx'](ret, 0x93)) {
                                if ('ijgVE' !== _0x564cfd['JHZEM']) {
                                    $['log']('\n\n  !!!!!!!!   当前账号黑号了  !!!!!!!!  \n\n');
                                } else {
                                    _0x564cfd['nonCP'](_0x210da2);
                                }
                            }
                            _0x564cfd['CqXVo'](_0x210da2, ![]);
                            return;
                        }
                        _0x564cfd['KYtNB'](_0x210da2, !![]);
                        return;
                    } catch (_0x3766b0) {
                        $['logErr'](_0x3766b0, _0x176ecc);
                    } finally {
                        _0x210da2(![]);
                    }
                }
            });
        }
    });
}

function doTask({
                    tasklevel,
                    left,
                    taskname,
                    eachtimeget
                }) {
    var _0x3be73f = {
        'VMpSv': function(_0x202436, _0x4316be) {
            return _0x202436(_0x4316be);
        },
        'UbYzr': function(_0x2ab211, _0x475c80) {
            return _0x2ab211 !== _0x475c80;
        },
        'XhHNI': 'BWJfF',
        'EFeOF': 'ieGGu',
        'TLqCD': '活动太火爆了',
        'Tznhe': '任务进行中或者未到任务时间',
        'GjaLt': function(_0x724c7c, _0x407c1d, _0x3858d2) {
            return _0x724c7c(_0x407c1d, _0x3858d2);
        },
        'JNiZx': 'dotask',
        'BqbbG': function(_0x26cfde, _0x197e60) {
            return _0x26cfde(_0x197e60);
        },
        'feucD': 'active,answer,ch,farm_jstoken,joinnum,phoneid,tasklevel,timestamp'
    };
    return new Promise(async _0x280793 => {
        var _0x1a001f = {
            'TLooA': function(_0x3e5339, _0x354e59) {
                return _0x3e5339 >= _0x354e59;
            },
            'rbjmZ': function(_0x5a17d5, _0x42f59f) {
                return _0x5a17d5 / _0x42f59f;
            },
            'LaAoO': function(_0x3f4681, _0x5eca2c) {
                return _0x3be73f['VMpSv'](_0x3f4681, _0x5eca2c);
            },
            'DmHho': function(_0x27b6a3) {
                return _0x27b6a3();
            },
            'zXDnC': function(_0x3ae188, _0xa13148) {
                return _0x3be73f['UbYzr'](_0x3ae188, _0xa13148);
            },
            'hQtNO': _0x3be73f['XhHNI'],
            'jVwuM': function(_0xecce1a, _0x51de34) {
                return _0xecce1a === _0x51de34;
            },
            'sRabL': _0x3be73f['EFeOF'],
            'aOPOf': _0x3be73f['TLqCD'],
            'cbmfk': _0x3be73f['Tznhe'],
            'Nodyy': 'gsxsu'
        };
        if (parseInt(left) <= 0x0) {
            $['log'](taskname + '[做任务]： 任务已完成，跳过');
            _0x3be73f['VMpSv'](_0x280793, ![]);
        }
        $['get'](_0x3be73f['GjaLt'](taskUrl, _0x3be73f['JNiZx'], 'active=' + $['info']['active'] + '&answer=' + $['info']['indexday'] + ':D:0&joinnum=' + $['info']['joinnum'] + '&tasklevel=' + tasklevel + '&_stk=' + _0x3be73f['BqbbG'](encodeURIComponent, _0x3be73f['feucD'])), (_0x27a0a2, _0x53f486, _0x36fd47) => {
            var _0x27a3a2 = {
                'MzCnx': function(_0x23e8bc, _0x568a07) {
                    return _0x1a001f['LaAoO'](_0x23e8bc, _0x568a07);
                },
                'xZlNp': function(_0x2f561b, _0x14439b) {
                    return _0x1a001f['LaAoO'](_0x2f561b, _0x14439b);
                },
                'mNsyn': function(_0x1c3a22) {
                    return _0x1a001f['DmHho'](_0x1c3a22);
                }
            };
            if (_0x1a001f['zXDnC'](_0x1a001f['hQtNO'], _0x1a001f['hQtNO'])) {
                var _0x3394de = {
                    'yLcfH': function(_0x155cc2, _0x4850b2) {
                        return _0x1a001f['TLooA'](_0x155cc2, _0x4850b2);
                    }
                };
                let _0x4a3682 = _0x1a001f['rbjmZ'](new Date(new Date()['toLocaleDateString']())['getTime'](), 0x3e8);
                $['detail']['forEach'](function(_0xd64a1a, _0x52f8d9) {
                    if (_0x3394de['yLcfH'](_0xd64a1a['time'], _0x4a3682) && _0xd64a1a['score']) {
                        dayGet += _0xd64a1a['score'];
                    }
                });
            } else {
                try {
                    if (_0x1a001f['jVwuM']('ieGGu', _0x1a001f['sRabL'])) {
                        const _0x2f591a = _0x36fd47['match'](/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[0x1];
                        let {
                            ret,
                            retmsg
                        } = JSON['parse'](_0x2f591a);
                        retmsg = retmsg !== '' ? retmsg : '成功';
                        $['log'](taskname + '[做任务]：ret:' + ret + ' retmsg:"' + (_0x1a001f['zXDnC'](retmsg['indexOf'](_0x1a001f['aOPOf']), -0x1) ? _0x1a001f['cbmfk'] : retmsg) + '\"');
                        if (_0x1a001f['jVwuM'](ret, 0x0)) {
                            $['drip'] += eachtimeget;
                        }
                        _0x1a001f['LaAoO'](_0x280793, ret);
                    } else {
                        $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
                    }
                } catch (_0x505dd7) {
                    $['logErr'](_0x505dd7, _0x53f486);
                } finally {
                    if (_0x1a001f['zXDnC']('LSMbp', _0x1a001f['Nodyy'])) {
                        _0x280793();
                    } else {
                        let _0x40befd = _0x27a3a2['MzCnx'](uuid, 0x28);
                        let _0xb49b63 = (+new Date())['toString']();
                        if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
                            console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\n');
                            _0x27a3a2['xZlNp'](_0x280793, null);
                        }
                        let _0x44ba40 = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
                        let _0x3d07f3 = $['md5']('' + decodeURIComponent(_0x44ba40) + _0xb49b63 + _0x40befd + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
                        currentToken = {
                            'timestamp': _0xb49b63,
                            'phoneid': _0x40befd,
                            'farm_jstoken': _0x3d07f3
                        };
                        _0x27a3a2['mNsyn'](_0x280793);
                    }
                }
            }
        });
    });
}

function taskUrl(_0x29eab3, _0x48efff) {
    var _0x1d7f09 = {
        'FUKpc': 'farm_jstoken',
        'aLsjj': function(_0x4dca2f, _0xc64c90) {
            return _0x4dca2f(_0xc64c90);
        },
        'GmxNM': './USER_AGENTS',
        'nqiPq': 'JDUA',
        'ITlgS': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return {
        'url': JXNC_API_HOST + 'cubeactive/farm/' + _0x29eab3 + '?' + _0x48efff + '&farm_jstoken=' + currentToken[_0x1d7f09['FUKpc']] + '&phoneid=' + currentToken['phoneid'] + '×tamp=' + currentToken['timestamp'] + '&sceneval=2&g_login_type=1&callback=whyour&_=' + Date['now']() + '&g_ty=ls',
        'headers': {
            'Cookie': currentCookie,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://st.jingxi.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'wq.jd.com',
            'Accept-Language': 'zh-cn',
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x1d7f09['aLsjj'](require, _0x1d7f09['GmxNM'])['USER_AGENT'] : $['getdata'](_0x1d7f09['nqiPq']) ? $['getdata'](_0x1d7f09['nqiPq']) : _0x1d7f09['ITlgS']
        },
        'timeout': 0x2710
    };
}
async function showMsg() {
    var _0x1994da = {
        'jXUPS': '账号未选择种子，请先去京喜农场选择种子。\x0a如果选择 APP 专属种子，必须提供 token。',
        'tkWwl': '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n',
        'GjyFH': function(_0x40fe84, _0x3b1493) {
            return _0x40fe84 >= _0x3b1493;
        },
        'AwfIQ': function(_0x2a2d8b, _0xb2d7a7) {
            return _0x2a2d8b !== _0xb2d7a7;
        },
        'FTtSz': 'aAwHd',
        'raiKY': 'Ogtaz'
    };
    if (notifyBool) {
        $['msg']($['name'], subTitle, message, option);
        if ($['isNode']()) {
            if (_0x1994da['AwfIQ']('mmFRb', _0x1994da['FTtSz'])) {
                allMessage += subTitle + '\x0a' + message + (_0x1994da['AwfIQ']($['index'], cookieArr['length']) ? '\x0a\x0a' : '');
            } else {
                $['log'](_0x1994da['jXUPS']);
                message += _0x1994da['tkWwl'];
                notifyBool = notifyBool && _0x1994da['GjyFH'](notifyLevel, 0x3);
            }
        }
    } else {
        if (_0x1994da['raiKY'] !== 'Ogtaz') {
            $['done']();
        } else {
            $['log']($['name'] + ' - notify 通知已关闭\n账号' + $['index'] + ' - ' + $['nickName'] + '\x0a' + subTitle + '\x0a' + message);
        }
    }
}

function getJxToken() {
    var _0x222c15 = {
        'rvlxD': 'abcdefghijklmnopqrstuvwxyz1234567890',
        'TieZA': function(_0x5ad05f, _0x34094d) {
            return _0x5ad05f(_0x34094d);
        },
        'txMlw': function(_0x2fdd14, _0x5a17da) {
            return _0x2fdd14 * _0x5a17da;
        },
        'NLnhl': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'TOFeW': function(_0x8b199d, _0x41c270) {
            return _0x8b199d(_0x41c270);
        },
        'xfYuP': 'vqiRH',
        'xxeVx': function(_0x16475, _0x45e59e) {
            return _0x16475(_0x45e59e);
        },
        'ZBQiG': function(_0x4c5826, _0x31796d) {
            return _0x4c5826(_0x31796d);
        }
    };

    function _0x54b30d(_0xb7a1cf) {
        let _0x5dad6a = _0x222c15['rvlxD'];
        let _0x293854 = '';
        for (let _0x51fac0 = 0x0; _0x51fac0 < _0xb7a1cf; _0x51fac0++) {
            _0x293854 += _0x5dad6a[_0x222c15['TieZA'](parseInt, _0x222c15['txMlw'](Math['random'](), _0x5dad6a['length']))];
        }
        return _0x293854;
    }
    return new Promise(_0x30bf4b => {
        var _0x69ecdf = {
            'yvnfJ': _0x222c15['NLnhl']
        };
        let _0x5b0337 = _0x222c15['TOFeW'](_0x54b30d, 0x28);
        let _0x23e58b = (+new Date())['toString']();
        if (!currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)) {
            if (_0x222c15['xfYuP'] !== _0x222c15['xfYuP']) {
                console['log'](e);
                $['msg']($['name'], '', _0x69ecdf['yvnfJ']);
                return [];
            } else {
                console['log']('此账号cookie填写不规范,你的pt_pin=xxx后面没分号(;)\x0a');
                _0x222c15['xxeVx'](_0x30bf4b, null);
            }
        }
        let _0x58f5c0 = currentCookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];
        let _0xc52d3b = $['md5']('' + _0x222c15['ZBQiG'](decodeURIComponent, _0x58f5c0) + _0x23e58b + _0x5b0337 + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')['toString']();
        currentToken = {
            'timestamp': _0x23e58b,
            'phoneid': _0x5b0337,
            'farm_jstoken': _0xc52d3b
        };
        _0x30bf4b();
    });
}

function jsonParse(_0x5158a1) {
    var _0x3005a3 = {
        'EepDC': 'application/x-www-form-urlencoded',
        'tnYYC': 'gzip, deflate, br',
        'ZblLq': 'keep-alive',
        'nHHAt': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        'iOLxc': function(_0x5e22f2, _0x2451c5) {
            return _0x5e22f2 == _0x2451c5;
        },
        'QsXMu': function(_0x129e17, _0x55344e) {
            return _0x129e17 !== _0x55344e;
        },
        'FJDXz': 'odmJI'
    };
    if (_0x3005a3['iOLxc'](typeof _0x5158a1, 'string')) {
        if (_0x3005a3['QsXMu']('odmJI', _0x3005a3['FJDXz'])) {
            let _0x5845c1 = {
                'url': 'http://120.76.219.92:18880/share_code/jxnc_code.txt',
                'headers': {
                    'Accept': 'application/json,text/plain, */*',
                    'Content-Type': _0x3005a3['EepDC'],
                    'Accept-Encoding': _0x3005a3['tnYYC'],
                    'Accept-Language': 'zh-cn',
                    'Connection': _0x3005a3['ZblLq'],
                    'User-Agent': _0x3005a3['nHHAt']
                },
                'timeout': 0x2710
            };
            $['get'](_0x5845c1, (_0x4fbc7a, _0x6c88bf, _0x202ed4) => {
                if (!_0x4fbc7a) {
                    shareCode = _0x202ed4;
                }
            });
        } else {
            try {
                return JSON['parse'](_0x5158a1);
            } catch (_0x5d4f25) {
                console['log'](_0x5d4f25);
                $['msg']($['name'], '', '请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie');
                return [];
            }
        }
    }
};
_0xodA = 'jsjiami.com.v6'

// prettier-ignore
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}