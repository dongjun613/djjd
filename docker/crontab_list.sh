# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

##############短期活动##############
# 金榜年终奖
3 2,10 * * * node /scripts/jd_split.js >> /scripts/logs/jd_split.log 2>&1
# 我的理想家
3 1,8 * * * node /scripts/jd_ls_lxLottery.js >> /scripts/logs/jd_ls_lxLottery.log 2>&1
# 飞利浦
40 11,14 * * * node /scripts/jd_ls_FLP.js >> /scripts/logs/jd_ls_FLP.log 2>&1
35 1,23 * * * node /scripts/jd_nzmh.js >> /scripts/logs/jd_nzmh.log 2>&1
#饭粒
20 0,14 * * * node /scripts/jd_ls_fanli.js >> /scripts/logs/jd_ls_fanli.log 2>&1
# 热血心跳,狂解压
10 2,9,17 * * * node /scripts/jd_ls_vivo.js >> /scripts/logs/jd_ls_vivo.log 2>&1
# 牛牛福利
40 8,17 * * * node /scripts/jd_ls_nnfls.js >> /scripts/logs/jd_ls_nnfls.log 2>&1
# 特物
21 5,12 * * * node /scripts/jd_ls_superBrand.js >> /scripts/logs/jd_ls_superBrand.log 2>&1
# 品质女装
23 1,11 * * * node /scripts/jd_ls_pznz.js >> /scripts/logs/jd_ls_pznz.log 2>&1
# 品质女装
23 1,11 * * * node /scripts/jd_ls_huiju11.js >> /scripts/logs/jd_ls_huiju11.log 2>&1
# 品质女装
23 1,11 * * * node /scripts/jd_ls_huiju2.js >> /scripts/logs/jd_ls_huiju2.log 2>&1
# 惊喜大作战
50 1 * * * node /scripts/jd_ls_jxdzz.js >> /scripts/logs/jd_ls_jxdzz.log 2>&1
# 时尚宠粉趴
20 2 * * * node /scripts/jd_ls_fashion.js >> /scripts/logs/jd_ls_fashion.log 2>&1
# APP-美妆馆-右侧浮窗
23 9,10 * * * node /scripts/jd_ls_selectionOfficer.js >> /scripts/logs/jd_ls_selectionOfficer.log 2>&1
43 10 * * * node /scripts/jd_ls_sign_graphics1.js >> /scripts/logs/jd_ls_sign_graphics1.log 2>&1
# 京东小魔方
31 2,8 * * * node /scripts/jd_ls_mf.js >> /scripts/logs/jd_ls_mf.js.log 2>&1
# 攥金币
10 5,10 * * * node /scripts/jd_GoldcoinToGift.js >> /scripts/logs/jd_GoldcoinToGift.log 2>&1
# 许愿池
40 0,2 * * * node /scripts/jd_ls_wish.js >> /scripts/logs/jd_ls_wish.log 2>&1
# 动人影像
43 15 13-26 9 * node /scripts/jd_star_wind_film_museum.js >> /scripts/logs/jd_star_wind_film_museum.log 2>&1
# 东东世界
20 20 * * * node /scripts/jd_ddworld.js >> /scripts/logs/jd_ddworld.log 2>&1
#内容鉴赏官
30 10,15 * * * node /scripts/jd_connoisseur.js >> /scripts/logs/jd_connoisseur.log 2>&1
#欧洲狂欢
36 10 * * * node /scripts/jd_wind8_wind_europeancup.js >> /scripts/logs/jd_europeancup.log 2>&1
#开卡瓜分
30 16 1 7 * node /scripts/jd_wind5_zooCaptain01.js >> /scripts/logs/jd_wind5_zooCaptain01.log 2>&1
#汪汪乐园开工位
1 13 7 7 * node /scripts/jd_wind_joypark_open.js >> /scripts/logs/jd_wind_joypark_open.log 2>&1
#汪汪乐园每日任务
11 13 * * * node /scripts/jd_wind_joypark_task.js >> /scripts/logs/jd_wind_joypark_task.log 2>&1
#汪汪乐园
11 12 * * * node /scripts/jd_wind_joy_park.js >> /scripts/logs/jd_wind_joy_park.log 2>&1
#超级直播间红包雨(活动时间不定期，出现异常提示请忽略。红包雨期间会正常)
1,31 0-23/1 * * * node /scripts/jd_live_redrain.js >> /scripts/logs/jd_live_redrain.log 2>&1
#金榜创造营 活动时间：2021-05-21至2021-12-31
0 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1
#省钱大赢家之翻翻乐
10,40 * * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1
#早起福利
30 6 * * * node /scripts/jd_wind_goodMorning.js >> /scripts/logs/jd_goodMorning.log 2>&1
#半点红包雨
30 0-23/1 * * * node /scripts/jd_ls_half_redrain.js >> /scripts/logs/jd_ls_half_redrain.log 2>&1
# MM领京豆
20 9 * * * node /scripts/jd_smiek_gua_MMdou.js >> /scripts/logs/jd_smiek_gua_MMdou.log 2>&1
#店铺签到
12 13 * * * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log 2>&1
# 京喜领88元红包
4 2,10 * * * node /scripts/jd_jxlhb.js >> /scripts/logs/jd_jxlhb.log 2>&1
##############长期活动##############
#京喜签到
11 0 * * * node /scripts/jx_sign.js >> /scripts/logs/jx_sign.log 2>&1
# 领卷中心签到
45 */4 * * * node /scripts/jd_ccSign.js >> /scripts/logs/jd_ccSign.log 2>&1
# 签到
7 0,17 * * * cd /scripts && node jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
# 东东超市兑换奖品
0,30 0 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
# 摇京豆
6 0,23 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
# 东东农场
15 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
# 宠汪汪
#56 7,15 * * * node /scripts/jd_dj_joy_reward_20.js >> /scripts/logs/jd_dj_joy_reward_20.log 2>&1
#59 7,15 * * * node /scripts/jd_dj_joy_reward_20.js >> /scripts/logs/jd_dj_joy_reward_20.log 2>&1
#56 23 * * * node /scripts/jd_dj_joy_reward_new.js >> /scripts/logs/jd_dj_joy_reward_new.log 2>&1
#59 23 * * * node /scripts/jd_dj_joy_reward_new.js >> /scripts/logs/jd_dj_joy_reward_new.log 2>&1
# 宠汪汪赛跑
#45 9,14,19 * * * node /scripts/jd_joy_run.js >> /scripts/logs/jd_joy_run.log 2>&1
#宠汪汪任务喂食
#35 */4 * * * node /scripts/jd_joy.js >> /scripts/logs/jd_joy.log 2>&1
#宠汪汪偷狗粮
#10 5,9,13 * * * node /scripts/jd_joy_steal.js >> /scripts/logs/jd_joy_steal.log 2>&1
# 摇钱树
23 */2 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
# 东东萌宠
35 6-18/6 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
# 京东种豆得豆
10 7-22/1 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
# 京东全民开红包
12 0-23/4 * * * node /scripts/jd_redPacket.js >> /scripts/logs/jd_redPacket.log 2>&1
# 进店领豆
6 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
# 东东超市
31 0,1-23/2 * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
# 取关京东店铺商品
45 23 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1
# 京豆变动通知
20 10 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log 2>&1
# 京东抽奖机
0 0,12,23 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
# 京东排行榜
21 9 * * * node /scripts/jd_rankingList.js >> /scripts/logs/jd_rankingList.log 2>&1
# 天天提鹅
28 * * * * node /scripts/jd_daily_egg.js >> /scripts/logs/jd_daily_egg.log 2>&1
# 金融养猪
32 0-23/6 * * * node /scripts/jd_pigPet.js >> /scripts/logs/jd_pigPet.log 2>&1
# 京喜工厂
50 * * * * node /scripts/jd_dreamFactory.js >> /scripts/logs/jd_dreamFactory.log 2>&1
# 东东小窝
46 6,23 * * * node /scripts/jd_small_home.js >> /scripts/logs/jd_small_home.log 2>&1
# 东东工厂
26 * * * * node /scripts/jd_jdfactory.js >> /scripts/logs/jd_jdfactory.log 2>&1
# 赚京豆(微信小程序)
12 * * * * node /scripts/jd_syj.js >> /scripts/logs/jd_syj.log 2>&1
# 京东快递签到
47 1 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
# 京东汽车(签到满500赛点可兑换500京豆)
0 0 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
# 领京豆额外奖励(每日可获得3京豆)
23 1,12,22 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
# 微信小程序京东赚赚
6 0-5/1,11 * * * node /scripts/jd_jdzz.js >> /scripts/logs/jd_jdzz.log 2>&1
# 导到所有互助码
23 7 * * * node /scripts/jd_get_share_code.js >> /scripts/logs/jd_get_share_code.log 2>&1
# 口袋书店
38 8,12,18 * * * node /scripts/jd_wind8_chinnkarahoi_wind_bookshop.js >> /scripts/logs/jd_bookshop.log 2>&1
# 京喜农场
30 9,12,18 * * * node /scripts/jd_jxnc.js >> /scripts/logs/jd_jxnc.log 2>&1
# 送豆得豆(京东赚赚)
47 2,13 * * * node /scripts/jd_sendBeans.js >> /scripts/logs/jd_sendBeans.log 2>&1
# 签到领现金
10 */4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
# 闪购盲盒
47 8,22 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
# 京东秒秒币
10 6,21 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#美丽研究院
41 7,12,19 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
#京东保价
#41 0,23 * * * node /scripts/jd_price.js >> /scripts/logs/jd_price.log 2>&1
#京东极速版签到+赚现金任务
21 1,6 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
#京喜财富岛
20 0-23/3 * * * node /scripts/jd_ls_cfd.js >> /scripts/logs/jd_ls_cfd.log 2>&1
30 0-23/3 * * * node /scripts/jd_ls_cfd_loop.js >> /scripts/logs/jd_ls_cfd_loop.log 2>&1
40 0-23/3 * * * node /scripts/jd_ls_cfd_mooncake.js >> /scripts/logs/jd_ls_cfd_mooncake.log 2>&1
# 财富大陆互助
18 0,1,9,14,18 * * * node /scripts/jd_smiek_gua_wealth_island_help.js >> /scripts/logs/jd_smiek_gua_wealth_island_help.log 2>&1
# 删除优惠券(默认注释，如需要自己开启，如有误删，已删除的券可以在回收站中还原，慎用)
#20 9 * * 6 node /scripts/jd_delCoupon.js >> /scripts/logs/jd_delCoupon.log 2>&1
#京东直播（又回来了）
30-50/5 12,23 * * * node /scripts/jd_live.js >> /scripts/logs/jd_live.log 2>&1
#京东健康社区
13 1,6,22 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log 2>&1
#京东健康社区收集健康能量
5-45/20 * * * * node /scripts/jd_health_collect.js >> /scripts/logs/jd_health_collect.log 2>&1
# 幸运大转盘
10 10,23 * * * node /scripts/jd_market_lottery.js >> /scripts/logs/jd_market_lottery.log 2>&1
# 领金贴
5 0 * * * node /scripts/jd_jin_tie.js >> /scripts/logs/jd_jin_tie.log 2>&1
#京喜牧场
15 */2 * * * node /scripts/jd_jxmc.js >> /scripts/logs/jd_jxmc.log 2>&1
#东东乐园
30 7 * * * node /scripts/jd_ddnc_farmpark.js >> /scripts/logs/jd_ddnc_farmpark.log 2>&1
#京东到家鲜豆任务
0 0 */1 * * node /scripts/jd_winddj_bean.js >> /scripts/logs/jd_winddj_bean.log 2>&1
#京东零食街
15 11 * * * node /scripts/jd_lsj.js >> /scripts/logs/jd_lsj.log 2>&1
#柠檬全民挖现金
0 10 * * * node /scripts/jd_wxj.js >> /scripts/logs/jd_wxj.log 2>&1
#图形签到
20 5,23 * * * node /scripts/jd_sign_graphics.js >> /scripts/logs/jd_sign_graphics.log 2>&1