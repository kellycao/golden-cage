// ── Quest Chain: 赌神×荷官 ──
const questChain_god_he = [
  // 0: 初来乍到
  {
    id:'task-0', title:'初来乍到', grade:'B', category:'事业',
    location:'hall',
    type:'fixed',
    description:'金笼赌场，烟雾缭绕。你刚踏入大厅，就被守门人拦下——金笼的规矩，外来人必须赢过守门人才能留下。\n\n守门人上下打量了你一眼，随手把一枚筹码弹到桌上："明天这个时候，三局两胜。输了，永远别来。"',
    characters:{ female:'hall', male:'hall', npcs:[{id:'guard',name:'守门人',area:'hall'}] },
    actionLabel:'接受约定',
    result:{ text:'约定已立，你有一天时间准备。大厅里赌客来来往往，守门人回到他的牌桌继续和别人赌。你决定先观察他的打法。', maleReaction:'发牌台后面站着一个年轻荷官，动作利落，表情淡漠。他扫了你一眼，又低下头继续洗牌。' },
    next:1
  },
  // 1: 鹰眼观察
  {
    id:'task-1', title:'鹰眼观察', grade:'B', category:'事业',
    location:'hall',
    type:'fixed',
    description:'你端着茶站在人群后方，看守门人和其他赌客对局。鹰眼启动：\n\n· 右手——虚张声势时习惯性敲无名指\n· 牌背——细微刮痕，做了记号\n· 但更重要的发现：荷官在发牌时有极其微小的手法偏差——他在帮守门人作弊。\n\n你没有点破。牌局结束后，荷官收拾好牌桌，不动声色地走向后台。',
    characters:{ female:'hall', male:'hall', npcs:[{id:'guard',name:'守门人',area:'hall'}] },
    actionLabel:'完成观察',
    result:{ text:'你默默记下了一切。守门人的弱点、荷官的作弊手法——以及荷官离开的方向。', maleReaction:'他收完桌走向后台时脚步不快不慢，没有回头。一个训练有素的人。' },
    next:2
  },
  // 2: 备器 [A·事业]
  {
    id:'task-2', title:'备器', grade:'A', category:'事业',
    location:'back',
    type:'choice',
    description:'你悄悄跟到后台，看到荷官打开一个旧柜子，把出千工具藏了进去——特制的记号墨水、微型刮刀、一副做过手脚的备用牌。\n\n他锁上柜子离开了。你站在空无一人的走廊里，面前是那个旧柜子。明天的对决，荷官还是发牌员。',
    characters:{ female:'back', male:'hall', npcs:[] },
    choices:[
      { label:'提前掉包', tag:'A',
        desc:'趁没人把工具偷走或调换。没了工具，荷官就没法帮守门人作弊——但你也欠下了一笔。',
        result:{ text:'你撬开旧柜子，把关键工具掉了包。在翻找过程中，柜子角落里滚出一枚金色筹码——比普通筹码更重、更亮，没有赌桌编号。', maleReaction:'（荷官不在场。但明天的牌局，他会发现工具不对。）' }
      },
      { label:'自信硬打', tag:'B',
        desc:'你是赌神。不需要靠拆别人的台来赢。',
        result:{ text:'你转身离开。后台走廊尽头的杂物架上，你注意到一枚金色筹码被随意塞在旧报纸后面——比普通筹码更重、更亮。', maleReaction:'（荷官不在场。但你离开后台的背影，被谁看到了也未可知。）' }
      }
    ],
    keyPickup:{ num:1, type:'exploration', desc:'后台旧柜/杂物架中发现金筹码' },
    next:3
  },
  // 3: 门槛局
  {
    id:'task-3', title:'门槛局', grade:'B', category:'事业',
    location:'hall',
    type:'fixed',
    description:function(state){
      if(state.choices['task-2']==='A'){
        return '三局两胜。守门人坐在对面，指关节轻轻敲着桌面。荷官站在发牌位上，面无表情。\n\n你知道守门人今天的工具已经被你调了包——他习惯依赖的手法将全部失灵。';
      }
      return '三局两胜。守门人坐在对面，指关节轻轻敲着桌面。荷官站在发牌位上，面无表情。\n\n守门人有工具加持，你没有——但你有鹰眼，读得懂他每一个微表情。';
    },
    characters:{ female:'hall', male:'hall', npcs:[{id:'guard',name:'守门人',area:'hall'}] },
    actionLabel:'牌局胜利',
    failLabel:'牌局失败',
    result:function(state){
      if(state.choices['task-2']==='A'){
        return { text:'守门人开局就不对劲——他习惯依赖的手法全部失灵。第一局他皱起了眉，第二局他开始烦躁，第三局他已经在出汗。你干净利落地赢下。\n\n全场安静了一秒，然后爆发出欢呼声。守门人把牌摔在桌上站起来，临走时低头凑近荷官耳边，恶狠狠地说了一句话。荷官的脸一瞬间变白了。', maleReaction:'他低头收牌，手指有一瞬间的僵硬。他发现工具不对了。' };
      }
      return { text:'鹰眼全程运转。守门人有工具加持，你没有——但你读得懂他每一个微表情。三局鏖战，最后一手你靠读心翻盘。\n\n全场欢呼。', maleReaction:'他收桌时多看了你一眼，那种看法像是在重新评估一个人。' };
    },
    canFail:true,
    failEndingId:'funny-1',
    next:function(state){
      return state.choices['task-2']==='A' ? 4 : 5;
    }
  },
  // 4: 跟上荷官（仅掉包线）
  {
    id:'task-3-1', title:'跟上荷官', grade:'B', category:'事业',
    location:'back',
    type:'fixed',
    description:'守门人先走了。荷官低着头快步走向后台。你跟了过去。\n\n后台走廊的拐角，你听到守门人的声音："工具怎么回事？"荷官沉默。守门人抓住他的衣领："不想干就赶紧滚。"\n\n荷官没有提工具被调换的事。守门人推开他走了。\n\n他一个人站在走廊里，理了理衣领。你从暗处走了进去。',
    characters:{ female:'back', male:'back', npcs:[] },
    actionLabel:'走进去',
    result:{ text:'他看到你，愣了一下。他知道你看到了。两人面对面站在昏暗的走廊里。', maleReaction:'他看着你的眼神很复杂——不是害怕，更像是在衡量。然后他说："赢了守门人的人，我请得起一杯茶。"' },
    next:5
  },
  // 5: 一杯茶 [A·情感]
  {
    id:'task-4', title:'一杯茶', grade:'A', category:'情感',
    location:'back',
    type:'choice',
    description:function(state){
      if(state.choices['task-2']==='A'){
        return '后台小隔间，他给你倒了杯茶。"牌术不错，偷东西的技术也不错。"他端着茶杯，语气像是在聊天气。';
      }
      return '荷官约你在后台见面，递过一杯茶。"不靠工具赢守门人，金笼开场以来头一个。"他打量你的目光里多了正经的敬意。';
    },
    characters:{ female:'back', male:'back', npcs:[] },
    choices:function(state){
      var conv = '\n\n你们最终达成了交易——你教他牌术，他帮你打听金筹码的下落。教学约在明天晚上，地点是他的秘密基地：钟楼天台。';
      if(state.choices['task-2']==='A'){
        return [
          { label:'反问："你为什么不揭发我？"', tag:'A',
            desc:'把问题抛给他——他的沉默同样值得追问。',
            result:{ text:'他放下茶杯，看了你几秒。"良禽择木而栖。"他说守门人迟早会完，他需要一个更强的人——你赢了守门人，你就是那个人。他想跟着你。这话里有算计，但也有几分真诚。' + conv, maleReaction:'他说这话时身体微微前倾，像在递什么东西过来。不是讨好，是谈条件。' }
          },
          { label:'对峙："你和守门人的出千把戏，我随时可以公布"', tag:'B',
            desc:'亮底牌——你知道他的秘密，掌握主动权。',
            result:{ text:'他的手顿了一下，然后慢慢放下茶杯。"你不会的。"他看着你。"因为你也需要我。"沉默了几秒，他叹了口气——看来他和你一样，有必须留在金笼的理由。' + conv, maleReaction:'他没有服软，但也没有硬顶。他把茶杯转了半圈，像在转一个筹码。"我有我非留在这里不可的原因。"' }
          }
        ];
      }
      return [
        { label:'主动："我可以教你。不用再靠他，自己站稳脚跟。"', tag:'A',
          desc:'拉他一把——主动伸出手。',
          result:{ text:'他愣住了。好一会儿没说话。然后他笑了——不是客套的笑，是意外的笑。"你要教我？"他显然没想到会被一个刚来的人主动拉一把。' + conv, maleReaction:'他端着茶杯的手放松了下来。"……为什么？"但他没等你回答就点了头。' }
        },
        { label:'疏离："牌技和人心都要算。"', tag:'B',
          desc:'暗示你知道他帮守门人出千——保持距离。',
          result:{ text:'他的表情变了一瞬——你比他想的更锐利。片刻之后他放下茶杯，"看来你什么都看到了。"他不再装了。' + conv, maleReaction:'他的眼神从试探变成了正视。像是终于遇到一个不用演的人。"那你还愿意坐在这里喝茶？"' }
        }
      ];
    },
    next:6
  },
  // 6: 大厅调查（多步骤）
  {
    id:'task-5', title:'大厅调查', grade:'B', category:'事业',
    location:'hall',
    type:'multi-action',
    description:'教学时间还没到，你回到大厅里找金筹码的线索。赌客中有人在议论过几天的"天局"——金笼有史以来最大的锦标赛。\n\n你还没找到金筹码，倒先发现了几件不对劲的事。',
    characters:{ female:'hall', male:'hall', npcs:[{id:'wu',name:'吴半城',area:'accounts'}] },
    actions:[
      { label:'观察排班表', area:'hall',
        result:'鹰眼发现排班被反复涂改，有人在频繁调整安保部署。' },
      { label:'检查VIP区', area:'vip',
        result:'VIP包厢的锁被换过，而且是最近换的。绸缎阁里有人低声提到"沈老板的人最近来得勤"。' },
      { label:'留意守门人', area:'hall',
        result:'守门人袖口有一枚陌生的徽章，不是金笼的标志。' },
      { label:'查看账目', area:'hall',
        result:'大厅公告栏的赌场月报上有蹊跷——鹰眼捕捉到几处数字涂改痕迹，账目对不上。' }
    ],
    result:{ text:'金笼内部有裂痕，有外部势力在渗透。金筹码还没找到，但线索指向赌场的核心人物。', maleReaction:'' },
    next:7
  },
  // 7: 获取金筹码② [A·事业]
  {
    id:'task-6', title:'获取金筹码②', grade:'A', category:'事业',
    location:'accounts',
    type:'choice',
    description:'荷官来大厅找你，压低声音说："我打听到了。金笼创始时铸了一批金筹码，创始人每人留了一枚。现在管账的吴半城是创始人之一，他那枚还在。"\n\n吴半城——赌场三十年老臣，精明多疑。',
    characters:{ female:'accounts', male:'accounts', npcs:[{id:'wu',name:'吴半城',area:'accounts'}] },
    choices:[
      { label:'赌一局赢走', tag:'A',
        desc:'吴半城好赌但手气差，在自己赌场从不上桌怕丢脸。提出私下赌一局。',
        result:{ text:'鹰眼发现吴半城紧张时摸左耳——你一步步收紧，最终赢下。\n\n"拿走拿走，这破东西也就你当个宝。"\n\n事后你调侃荷官："怎么不帮我做点手脚？"', maleReaction:'他发牌时规规矩矩，手法干净。你调侃他时他嘴角翘了一下，收牌的动作轻快了些。"你又不需要。"' }
      },
      { label:'用情报交换', tag:'B',
        desc:'你把调查中发现的账目问题摆在吴半城面前。',
        result:{ text:'他脸色难看，半晌从保险柜里取出金筹码丢在桌上。"拿去。"\n\n事后荷官问你为什么不用自己最擅长的方式。你说："要给自己多留点运气，不然容易被老千害死。"', maleReaction:'听到"被老千害死"那句时，他低下头笑了一声——不是苦笑，更像被意外戳到了什么。' }
      }
    ],
    keyPickup:{ num:2, type:'mainline', desc:'从吴半城手中获得金筹码' },
    next:8
  },
  // 8: 锦标赛报名
  {
    id:'task-7', title:'锦标赛报名', grade:'B', category:'事业',
    location:'hall',
    type:'fixed',
    description:'金笼管事敲响铜锣，当众公布天局锦标赛大奖：巨额奖金——以及一枚金筹码。\n\n你看到那枚金筹码被放在展示台上，和你手中的一模一样。\n\n报名表贴出来的第一个名字是守门人。你提笔签下了自己的名字。旁边的赌客开始议论："上次赢了守门人的那个人……二次对决。"',
    characters:{ female:'hall', male:'hall', npcs:[{id:'guard',name:'守门人',area:'hall'}] },
    actionLabel:'签下名字',
    result:{ text:'大家都在期待你和守门人的再战。但你的目的只有一个——那枚金筹码。', maleReaction:'他站在发牌台后面看到你签名，手里的牌停了一拍。然后继续洗牌，像什么都没发生。' },
    next:9
  },
  // 9: 天台教学 [A·情感]
  {
    id:'task-8', title:'天台教学', grade:'A', category:'情感',
    location:'tower',
    type:'choice',
    description:'夜晚。钟楼天台，风很大，能俯瞰整个街区。荷官已经在了，地上摊着一副牌。\n\n你教他基本的读牌技巧——怎么从对手的微表情判断底牌，怎么在不做记号的情况下追踪关键牌。他学得很快，手指灵活。\n\n你给他看你手上的茧子——指腹上常年摩挲牌面留下的薄茧，中指关节因反复洗牌而微微变形。他低头看了很久。\n\n教学间隙，他问你："你的牌术是怎么练出来的？"',
    characters:{ female:'tower', male:'tower', npcs:[] },
    choices:[
      { label:'坦诚："如果我停下来，就没有活路了。"', tag:'A',
        desc:'告诉他更深层的东西——赌术对你来说不是才华，是生存。',
        result:{ text:'你告诉他那些年在各种赌场之间辗转的日子。没有师父，没有靠山，一副牌一双手，输了就饿肚子。\n\n他沉默了很久，夜风把他的头发吹到额前。\n\n教学结束后，你跟他提起锦标赛的大奖就是你在找的金筹码，你志在必得。他的动作停了。手里的牌没有放下也没有翻开，就那么捏着。过了好几秒他才说："嗯。"', maleReaction:'他没有接话。过了很久，他把自己的手摊开给你看——掌心有一道旧疤。"我也一样。"他没有解释那道疤的来历。\n\n他站起来收牌的时候，背对着你。你看不到他的表情。' }
      },
      { label:'敷衍："因为有趣啊。赢的感觉谁不喜欢。"', tag:'B',
        desc:'笑着带过。不想说太多。',
        result:{ text:'你笑着带过。他看了你一眼，没有追问——但你感觉他不太信。\n\n教学结束后，你跟他提起锦标赛的大奖就是你在找的金筹码，你志在必得。他的动作停了。手里的牌没有放下也没有翻开，就那么捏着。过了好几秒他才说："嗯。"', maleReaction:'他低头摆弄手里的牌，"有趣……"他重复了一遍，嘴角是一个看不懂的弧度。像是在说：你不想说就算了。\n\n他站起来收牌的时候，背对着你。你看不到他的表情。' }
      }
    ],
    next:10
  },
  // 10: 天局·锦标赛 [S·事业]
  {
    id:'task-9', title:'天局 · 锦标赛', grade:'S', category:'事业',
    location:'hall',
    type:'choice',
    description:'金笼大厅灯火通明，赌桌铺上红绒布，人声鼎沸。奖池展示台上，金筹码在灯光下闪闪发亮。\n\n你志得意满地一路赢到决赛。最终对手——守门人。荷官，仍然是发牌员。\n\n第一场，守门人意外地手感火热。你皱了皱眉，但没在意。\n\n第二场，当你再拿到小牌时，鹰眼自动运转——你仔细检视了手中的牌。\n\n发牌的节奏、换牌的手法、控底的技巧……全是你教他的。\n\n他背叛了你。他把你教他的东西，用在了你身上。',
    characters:{ female:'hall', male:'hall', npcs:[{id:'guard',name:'守门人',area:'hall'}] },
    choices:[
      { label:'揭穿', tag:'A',
        desc:'站起来，当着全场的面指出发牌手的出千手法。',
        result:{ text:'你把手中的牌翻过来，指着牌背上细微的指甲压痕——你教他的标记方式。"这张牌被动过。发牌手在控牌。"\n\n全场哗然。管事冲上来检查，果然发现了痕迹。守门人的脸铁青，荷官被两个安保架住胳膊。锦标赛判你胜，守门人因作弊取消资格。\n\n你赢了。但你亲手把自己的学生送上了台。', maleReaction:'被架走的时候他没有挣扎，也没有看你。下巴绷得很紧，嘴唇抿成一条线。人群的嘈杂声中，他一句话都没说。' },
        keyPickup:{ num:3, type:'mainline', desc:'锦标赛奖池·揭穿作弊后判定获胜' }
      },
      { label:'沉默', tag:'B',
        desc:'你什么都没说。让自己输了。',
        result:{ text:'你放下牌。守门人赢了。全场的掌声和欢呼不是给你的。\n\n一瞬间，你从新晋赌神变成了昙花一现的赌客。风评随胜负而定，这就是赌场。\n\n最重要的是——那枚金筹码，归了守门人。', maleReaction:'宣布结果的时候，他在收牌。他的手停了一瞬——非常短，只有你这种人才看得出来。然后他继续收牌，像什么都没发生过。' }
      }
    ],
    next:11
  },
  // 11: 调查真相（多步骤）
  {
    id:'task-10', title:'调查真相', grade:'B', category:'事业',
    location:'hall',
    type:'multi-action',
    description:'你坐在大厅角落，茶已经凉了。他明明向你示好、请求庇护，为什么转头就倒戈？直接问他不会有答案。你决定从旁人那里查。',
    characters:{ female:'hall', male:'hall', npcs:[{id:'wu',name:'吴半城',area:'accounts'}] },
    actions:[
      { label:'向吴半城打听守门人', area:'accounts',
        result:'"守门人？那位爷可不简单。和做军火生意的沈老板来往密切，平时穿戴的都不是赌场能买得起的。他有一个自己的小金库，每次和沈见面之前，都会去金库里拿出一本账本带上。"' },
      { label:'向吴半城打听荷官', area:'accounts',
        result:'"荷官是守门人的心腹嘛，大家都知道。守门人每次赢了大的，就让荷官去金库里挑个珠宝首饰。大家都说这小子爱财，贪图守门人的金库，所以打也打不走骂也骂不走。"' }
    ],
    result:{ text:'线索拼合——守门人和军火商沈有深度勾连，金库里藏着沈的账本。而荷官一次次进金库，也许不是贪财，而是另有目的。他忍受打骂也不肯离开，是因为金库里有他需要的东西。', maleReaction:'' },
    next:12
  },
  // 12: 骚乱 [A·情感]
  {
    id:'task-11', title:'骚乱', grade:'A', category:'情感',
    location:'hall',
    type:'choice',
    description:function(state){
      if(state.choices['task-9']==='A'){
        return '你正消化调查到的信息，大厅里突然起了骚动。几个守门人的手下围住了荷官——锦标赛的丑闻让守门人颜面尽失，他临走前留了话："给我教训他。"';
      }
      return '你正想怎么办，大厅里突然起了骚动。安保围着一个人拳打脚踢——守门人的金筹码不见了。陪他最后进过金库的人就是荷官。守门人命令搜身，翻遍了他身上每个口袋，什么都没找到，但打没有停。';
    },
    characters:{ female:'hall', male:'hall', npcs:[] },
    choices:function(state){
      var isReveal = state.choices['task-9']==='A';
      return [
        { label:'挺身介入', tag:'A',
          desc:'你站出来，走进人群。',
          result:{
            text: isReveal
              ? '你走到他们中间。"锦标赛的事是管事判的，和他有什么关系。再打下去，我叫管事来。"几个打手互相看了看，不情愿地散了。\n\n你暴露了和荷官的关系。但他记住了你站出来那一刻。'
              : '"搜过了，东西不在他身上。还想打到什么时候？"你的声音不高，但整个大厅安静了一瞬。安保们松了手。\n\n你暴露了和荷官的关系。但他记住了你站出来那一刻。',
            maleReaction:'他从地上爬起来，擦了一下嘴角的血。看了你一眼——那个眼神很短，但很重。然后他低下头，一瘸一拐地走了。'
          }
        },
        { label:'暗中观察', tag:'B',
          desc:'你站在人群外面，没有动。',
          result:{
            text: isReveal
              ? '你看着他被打，没有出手。你需要看清局势——谁在指挥，有多少人参与，这件事背后还有没有其他含义。\n\n你没有暴露关系，但你站在人群里看着他挨打。这件事你们彼此都会记得。'
              : '你站在围观的人群里。搜身搜不到东西，打了一阵也就散了。荷官从地上爬起来，他扫了一眼人群——你不确定他有没有看到你。\n\n你没有暴露关系，但你站在人群里看着他挨打。这件事你们彼此都会记得。',
            maleReaction:'他爬起来时动作很慢，用袖子擦了脸上的血，头也不回地往后台走了。'
          }
        }
      ];
    },
    next:13
  },
  // 13: 天台重逢 [S·情感]
  {
    id:'task-12', title:'天台重逢', grade:'S', category:'情感',
    location:'tower',
    type:'choice',
    description:function(state){
      if(state.choices['task-9']==='A'){
        return '晚上你来到天台。他果然在这里——但不是在等你。他蜷在角落里，脸上青一块紫一块。他看到你来，没有躲开，也没有站起来。';
      }
      return '晚上你来到天台。满脸是伤的他坐在天台边缘，听到脚步声回过头。看到是你，他望着你，从怀里摸出一枚金筹码递过来。\n\n"你看，老师教的我多少还是学到了一些。"';
    },
    characters:{ female:'tower', male:'tower', npcs:[] },
    choices:function(state){
      var conv = '\n\n两人在天台上聊了各自的处境。他提到自己有"非留在金笼不可的理由"。你没有追问细节。夜风，灯火，各怀心事的两个人。';
      if(state.choices['task-9']==='A'){
        return [
          { label:'追问："你为什么要帮他？"', tag:'A',
            desc:'你求我教你，又拿学的东西帮他对付我。为什么？',
            result:{ text:'你站在他面前。"你求我教你，又拿学的东西帮他对付我。为什么？"\n\n他沉默了很久，然后抬起头——一只眼睛肿得几乎睁不开。\n\n"因为他手里有我必须拿到的东西。沈的账本，在他金库里。我每次进金库都在找。"\n\n' + conv, maleReaction:'他说最后一句话时，目光从你脸上移开，看向远处的灯火。嘴角有干涸的血痂。' }
          },
          { label:'不问，在他旁边坐下', tag:'B',
            desc:'什么都不问。只是陪着。',
            result:{ text:'你走过去，在他旁边坐下。什么都没问。天台上只有风声。\n\n过了很久他自己开口了："……我做了一笔很差的买卖。"他没有解释更多。但他的肩膀松了下来——你没有追问这件事，比什么都重。' + conv, maleReaction:'他侧过头看了你一眼。那只没肿的眼睛里，有什么东西在发亮。然后他又转回去看灯火，像是把那个眼神藏了起来。' }
          }
        ];
      }
      return [
        { label:'接过金筹码，问他："疼吗？"', tag:'A',
          desc:'接过筹码，但你先关心的是他。',
          result:{ text:'你接过金筹码，然后看着他的脸。"疼吗？"\n\n他愣了一下——他大概准备了很多说辞，唯独没准备这一句。\n\n"……还行。"他别过脸去。但你看到他的喉结动了一下。' + conv, maleReaction:'他低下头，用袖口蹭了一下鼻子。手在发抖——不是因为冷。' },
          keyPickup:{ num:3, type:'exploration', desc:'荷官偷来的金筹码·天台交给你' }
        },
        { label:'接过金筹码："我们扯平了。"', tag:'B',
          desc:'你背叛我，我没揭穿。你偷了筹码挨了打。扯平了。',
          result:{ text:'你接过金筹码掂了掂。"你背叛我，我没揭穿。你偷了筹码挨了打。我们扯平了。"\n\n他看着你，过了好几秒才点头。"扯平。"\n\n界限画清楚了，但谁也没有转身走。' + conv, maleReaction:'他的嘴角动了一下——可能是想笑没笑出来。他用手背擦了一下脸上的血，把手在裤腿上蹭了蹭。"扯平。"他重复了一遍，声音比刚才轻。' },
          keyPickup:{ num:3, type:'exploration', desc:'荷官偷来的金筹码·天台交给你' }
        }
      ];
    },
    next:14
  },
  // 14: 发现炸弹
  {
    id:'task-13', title:'发现炸弹', grade:'B', category:'事业',
    location:'hall',
    type:'fixed',
    description:'转天白天。你正坐在大厅里喝茶，突然安保跑进来大喊："牢房区域发现炸弹！所有人疏散！"\n\n人群开始慌乱涌向出口。嘈杂声中，你看到荷官逆着人流，急匆匆地朝牢房区域跑去。',
    characters:{ female:'hall', male:'underground', npcs:[] },
    actionLabel:'去牢房区域看看',
    failLabel:'逃离赌场',
    result:{ text:'你跟着荷官的方向跑进地下层。', maleReaction:'他跑得很急，外套都没穿，衬衫袖子还卷着。他没注意到你跟在后面。' },
    canFail:true,
    failEndingId:'funny-3',
    next:15
  },
  // 15: 严九
  {
    id:'task-14', title:'严九', grade:'B', category:'事业',
    location:'underground',
    type:'fixed',
    description:'牢房最深处。炸弹绑在一个老囚犯身上——严九。他被绑在椅子上，脖子上挂着一枚金筹码，脸上是出奇的平静。\n\n他喃喃自语："马上就好了。陆老板一死，就没人抢沈的军火生意了。"\n\n你准备走上前查看，荷官一把拉住你的手臂。你拍了拍他的手："没事。"\n\n鹰眼启动——炸药外观很大，但里面的火药粉很少。小范围爆炸的剂量，不足以破坏赌场，但足以炸死绑着的人。\n\n你们与严九攀谈。他是金笼创始人之一，中途做了错事，被老板陆鹤声关在这里多年。沈时常派人来"关心"他，他感恩，自愿帮沈对付陆。\n\n你点破："沈要真在乎你，怎么不来救你？炸弹绑在你身上，他全然不顾你的死活。"\n\n严九的表情裂了。愤怒中他脱口而出："沈当然留了后手！骚乱时混进来的都是他的人，很快就会里应外合围剿赌场。陆老板必死！"',
    characters:{ female:'underground', male:'underground', npcs:[{id:'yan',name:'严九',area:'underground'}] },
    actionLabel:'继续',
    result:{ text:'荷官听到"围剿"两个字，脸色骤变。他转向你——', maleReaction:'他的眼神突然变得锋利。"我必须去保护陆老板。"他已经在往外走了。走了两步回头看你："密室——老板在密室里。他那里也有一枚金筹码。"然后他消失在走廊尽头。' },
    next:16
  },
  // 16: 严九与炸弹 [A·事业]
  {
    id:'task-15', title:'严九与炸弹', grade:'A', category:'事业',
    location:'underground',
    type:'choice',
    description:'荷官走了。牢房里只剩你和绑着炸弹的严九。他脖子上的金筹码在昏暗灯光下晃动。\n\n炸弹还在走。你要做选择。',
    characters:{ female:'underground', male:'secret', npcs:[{id:'yan',name:'严九',area:'underground'}] },
    choices:[
      { label:'拆弹', tag:'A',
        desc:'鹰眼分析炸弹结构——火药量虽小，但引爆装置是正经的。',
        result:{ text:'两根线，一根连接计时器，一根连接雷管。鹰眼锁定正确的线路——连接线分离，炸弹解除。\n\n严九看着你，表情里的敌意消了大半。他扯断脖子上的金筹码项链，扔在牢房地上。\n\n"拿去。我再也不需要了。"', maleReaction:'（荷官不在场。但后来他知道了这件事。你在密室里见到他时，他看你的目光不一样了。）' }
      },
      { label:'取走金筹码，不管炸弹', tag:'B',
        desc:'你做了内奸该做的事，现在承担内奸该有的代价。',
        result:{ text:'你蹲下来，从他脖子上解下金筹码。严九盯着你："你——"\n\n你站起来，把金筹码收好。"你做了内奸该做的事，现在承担内奸该有的代价。"\n\n严九嘴唇颤了一下，然后闭上了眼睛。你转身离开牢房。身后传来他的声音："老板的密室里……也有一枚。"', maleReaction:'（荷官不在场。）' }
      }
    ],
    keyPickup:{ num:4, type:'exploration', desc:'从严九处获得金筹码' },
    next:17
  },
  // 17: 进入密室
  {
    id:'task-16', title:'进入密室', grade:'B', category:'事业',
    location:'secret',
    type:'fixed',
    description:'你朝密室方向走去。后台走廊上空无一人，所有保安都被调去应对骚乱了。\n\n密室的门虚掩着。里面空无一人，地上躺着几个陌生的守卫——不是金笼的人。\n\n鹰眼扫视：暗门把手上有新鲜的手印、地面磨损痕迹指向一个方向、角落里有一颗纽扣——荷官衬衫上的。保险箱藏在墙壁暗格后面。\n\n你打开保险箱。里面是赌场地契、一叠秘密文件——以及最后一枚金筹码。',
    characters:{ female:'secret', male:'hall', npcs:[] },
    actionLabel:'打开保险箱',
    result:{ text:'五枚金筹码全部到手。', maleReaction:'' },
    keyPickup:{ num:5, type:'mainline', desc:'密室保险箱中获得最后一枚金筹码' },
    next:18
  },
  // 18: 围剿 [S·情感]
  {
    id:'task-17', title:'围剿', grade:'S', category:'情感',
    location:'secret',
    type:'choice',
    description:'你刚收好金筹码，密室的门被推开了。\n\n是荷官。衬衫上有血——不知道是谁的。他扫了一眼倒在地上的陌生守卫，然后看向你。\n\n"陆老板已经带着情报从密道撤离了。"\n\n外面传来急促的脚步声和喊杀声。围剿到了。\n\n他走到你面前，从怀里掏出一把钥匙塞到你手里。"密道在书架后面。走，别回头。"\n\n他转身走向密室大门。在门口停了一下。\n\n"我得在外面拖一阵子。给老板争取时间。"\n\n他推开门，走了出去。门在身后重重关上。\n\n外面的声音更大了。',
    characters:{ female:'secret', male:'secret', npcs:[] },
    choices:[
      { label:'从密道撤离', tag:'A',
        desc:'你握着钥匙，打开书架后的密道。黑暗的通道向下延伸。',
        result:{ text:'你走进密道。黑暗的通道向下延伸。\n\n身后密室大门外面，传来搏斗声和东西摔碎的声音。\n\n你没有回头。', maleReaction:'（他在门外独自迎敌。你听到搏斗声渐渐远去。）' }
      },
      { label:'打开门，和他共同迎战', tag:'B',
        desc:'你把钥匙揣进口袋，走到密室门前。拉开门。',
        result:{ text:'他正一个人顶着走廊里冲上来的人。听到门响，他回头看到你——\n\n"你怎么还没走？！"\n\n你走到他旁边站定。没有回答。', maleReaction:'他愣了一瞬。然后他转回身面对走廊，但你注意到他的站位变了——从一个人挡住整个门口，变成留了半个身位给你。' }
      }
    ],
    next:19
  },
  // 19: 结局
  {
    id:'ending', title:'结局', grade:'', category:'',
    location:'',
    type:'ending'
  }
];