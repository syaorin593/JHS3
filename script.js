// --- 設定 & データ定義 ---
const SAVE_KEY = 'english_quest_jhs3_v7_trans_final'; 

// --- ステージ定義（中3カリキュラム） ---
const STAGE_TITLES = {
    1: "現在完了(完了・経験)",
    2: "現在完了(継続・進行形)",
    3: "SVOO・不定詞構文",
    4: "使役動詞・原形不定詞",
    5: "現在分詞(後置修飾)",
    6: "過去分詞(後置修飾)",
    7: "関係代名詞(主格)",
    8: "関係代名詞(目的格)",
    9: "仮定法",
    10: "中3総復習",
    11: "Final Review",
    12: "EX:記述の塔(超難問)"
};

// --- 称号データ ---
const ACHIEVEMENTS = [
    {id:'c1', name:'完了の証', desc:'Stage 1 クリア', icon:'🏁'},
    {id:'c2', name:'継続の力', desc:'Stage 2 クリア', icon:'⏳'},
    {id:'c3', name:'伝達の達人', desc:'Stage 3 クリア', icon:'🎁'},
    {id:'c4', name:'使役の使い手', desc:'Stage 4 クリア', icon:'🫡'},
    {id:'c5', name:'現在分詞マスター', desc:'Stage 5 クリア', icon:'🏃'},
    {id:'c6', name:'過去分詞マスター', desc:'Stage 6 クリア', icon:'🗿'},
    {id:'c7', name:'関係詞の使い手', desc:'Stage 7 クリア', icon:'🔗'},
    {id:'c8', name:'省略の美学', desc:'Stage 8 クリア', icon:'🌫️'},
    {id:'c9', name:'夢想家', desc:'Stage 9 クリア', icon:'💭'},
    {id:'c10', name:'中3英語制覇', desc:'Stage 10 クリア', icon:'🎓'},
    {id:'c11', name:'グランドマスター', desc:'Final Quest クリア', icon:'👑'},
    {id:'c12', name:'神話の領域', desc:'EX Stage クリア', icon:'🐉'},
    
    {id:'combo_10', name:'リズム', desc:'10コンボ達成', icon:'🎵'},
    {id:'rank_s', name:'完璧主義', desc:'ランクSを獲得', icon:'✨'},
    {id:'rank_f', name:'挫折を知る', desc:'ゲームオーバーになる', icon:'💀'},
    {id:'no_miss', name:'ノーミス', desc:'全問正解でクリア', icon:'🎯'},
    {id:'rich', name:'大富豪', desc:'1000G 貯める', icon:'💰'},
    {id:'item_user', name:'道具使い', desc:'アイテムを使用する', icon:'💊'},
    {id:'boss_killer', name:'ボス撃破', desc:'ボスに勝利する', icon:'👹'},
    
    {id:'total_100', name:'知識の蕾', desc:'累計100問正解', icon:'🥉'},
    {id:'total_300', name:'大賢者', desc:'累計300問正解', icon:'🥈'},
    {id:'total_500', name:'伝説', desc:'累計500問正解', icon:'🥇'},
    {id:'end_10', name:'サバイバー', desc:'エンドレス10問正解', icon:'⛺'}
];

// --- シャッフル関数 ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- 問題データ生成 ---
function getStageData(stageId) {
    let q = [];
    const add = (type, qText, ans, opts, expl, trans) => {
        q.push({ 
            id: `${stageId}_${q.length}_${Date.now()}_${Math.random()}`, 
            stage: stageId, type, q: qText, a: ans, o: opts, expl, t: trans || "" 
        });
    };

    // --- Stage 1: 現在完了 (完了・経験) ---
    if (stageId === 1 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'I have ( ) finished my homework.', 'just', ['just','yet','ever','never'], '「ちょうど〜したところ」は have just p.p.', '私はちょうど宿題を終えたところです。');
        add('choice', 'Have you eaten lunch ( )?', 'yet', ['yet','already','just','ever'], '疑問文の「もう」は文末に yet', 'あなたはもう昼食を食べましたか？');
        add('choice', 'I haven\'t read the book ( ).', 'yet', ['yet','already','just','ever'], '否定文の「まだ」は文末に yet', '私はまだその本を読んでいません。');
        add('choice', 'I have ( ) seen a panda.', 'never', ['never','ever','yet','not'], '「一度も〜ない」は never', '私は一度もパンダを見たことがありません。');
        add('choice', 'Have you ( ) been to Hawaii?', 'ever', ['ever','never','yet','since'], '経験を問う「今までに」は ever', 'あなたは今までにハワイに行ったことがありますか？');
        add('sort', '私はちょうど宿題を終えたところです。', 'I have just finished my homework', ['I','have','just','finished','my','homework'], 'have just p.p.', '並べ替え: 私はちょうど宿題を終えたところです。');
        add('sort', 'あなたはもう昼食を食べましたか？', 'Have you eaten lunch yet', ['Have','you','eaten','lunch','yet'], 'Have you ... yet?', '並べ替え: あなたはもう昼食を食べましたか？');
        add('sort', '私は一度もその映画を見たことがありません。', 'I have never seen the movie', ['I','have','never','seen','the','movie'], 'have never p.p.', '並べ替え: 私は一度もその映画を見たことがありません。');
        add('fill', '私はすでにその手紙を書きました。 I have ( ) written the letter.', 'already', null, '肯定文の「すでに」', '私はすでにその手紙を書きました。');
        add('fill', '私は3回、京都に行ったことがあります。 I have been to Kyoto three ( ).', 'times', null, '回数(times)', '私は3回、京都に行ったことがあります。');
        add('full', '私は以前、彼に会ったことがあります。', 'I have met him before.', null, 'before(以前に)', '私は以前、彼に会ったことがあります。');
        add('choice', 'He has ( ) to the station.', 'gone', ['gone','been','went','go'], 'have gone to(行ってしまってここにはいない)', '彼は駅へ行ってしまいました。');
    }

    // --- Stage 2: 現在完了 (継続・進行形) ---
    if (stageId === 2 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'I have lived here ( ) ten years.', 'for', ['for','since','during','until'], '期間を表す「〜の間」は for', '私はここに10年間住んでいます。');
        add('choice', 'She has been busy ( ) this morning.', 'since', ['since','for','from','until'], '起点を表す「〜以来」は since', '彼女は今朝からずっと忙しいです。');
        add('choice', 'How ( ) have you known him?', 'long', ['long','much','many','often'], '「どのくらいの間」と期間を尋ねる表現', 'あなたはどのくらい彼を知っていますか？');
        add('choice', 'It has been ( ) since yesterday.', 'raining', ['raining','rain','rained','to rain'], '現在完了進行形 (ずっと〜している)', '昨日からずっと雨が降っています。');
        add('sort', '私は昨日からずっと眠い。', 'I have been sleepy since yesterday', ['I','have','been','sleepy','since','yesterday'], '状態の継続', '並べ替え: 私は昨日からずっと眠いです。');
        add('sort', 'あなたはどのくらい英語を勉強していますか？', 'How long have you been studying English', ['How','long','have','you','been','studying','English'], '現在完了進行形の疑問文', '並べ替え: あなたはどのくらい英語を勉強していますか？');
        add('sort', '私たちは長い間彼を知っています。', 'We have known him for a long time', ['We','have','known','him','for','a','long','time'], 'knowは進行形にしない', '並べ替え: 私たちは長い間彼を知っています。');
        add('fill', '私は3年間、このペンを使っています。 I have used this pen ( ) three years.', 'for', null, 'for + 期間', '私は3年間、このペンを使っています。');
        add('fill', '彼は2時間ずっと本を読んでいます。 He has been ( ) a book for two hours.', 'reading', null, 'have been reading', '彼は2時間ずっと本を読んでいます。');
        add('full', '私は先週からずっと風邪をひいています。', 'I have had a cold since last week.', null, 'have had a cold', '私は先週からずっと風邪をひいています。');
        add('choice', 'They have ( ) soccer for two hours.', 'been playing', ['been playing','played','playing','play'], '動作の継続＝進行形', '彼らは2時間サッカーをし続けています。');
    }

    // --- Stage 3: SVOO・不定詞構文 ---
    if (stageId === 3 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'My father gave ( ) a watch.', 'me', ['me','I','my','mine'], 'give 人 物 (目的格)', '父は私に時計をくれました。');
        add('choice', 'Please show ( ) your passport.', 'me', ['me','I','to me','for me'], 'show 人 物', '私にあなたのパスポートを見せてください。');
        add('choice', 'I want ( ) to clean the room.', 'you', ['you','your','yours','me'], 'want 人 to (人に〜してほしい)', '私はあなたに部屋を掃除してほしい。');
        add('choice', 'My mother told me ( ) study hard.', 'to', ['to','for','that','of'], 'tell 人 to (人に〜するように言う)', '母は私に一生懸命勉強するように言いました。');
        add('choice', 'I asked him ( ) help me.', 'to', ['to','for','of','about'], 'ask 人 to (人に〜するように頼む)', '私は彼に手伝ってくれるよう頼みました。');
        add('sort', '私にその写真を見せてください。', 'Please show me the picture', ['Please','show','me','the','picture'], 'SVOO', '並べ替え: 私にその写真を見せてください。');
        add('sort', '私はあなたに英語を教えてほしい。', 'I want you to teach English', ['I','want','you','to','teach','English'], 'want 人 to', '並べ替え: 私はあなたに英語を教えてほしい。');
        add('sort', '先生は私たちに静かにするように言いました。', 'The teacher told us to be quiet', ['The','teacher','told','us','to','be','quiet'], 'tell 人 to', '並べ替え: 先生は私たちに静かにするように言いました。');
        add('fill', '彼に電話するように頼んでくれませんか？ Could you ask ( ) to call me?', 'him', null, 'ask 人 to', '彼に電話するように頼んでくれませんか？');
        add('fill', '父は私に自転車を買ってくれました。 My father bought ( ) a bike.', 'me', null, 'buy 人 物', '父は私に自転車を買ってくれました。');
        add('full', '私は彼にドアを開けるように頼みました。', 'I asked him to open the door.', null, 'ask 人 to', '私は彼にドアを開けるように頼みました。');
        add('choice', 'He showed the picture ( ) me.', 'to', ['to','for','of','at'], 'show 物 to 人', '彼はその写真を私に見せました。');
    }

    // --- Stage 4: 使役動詞・原形不定詞 ---
    if (stageId === 4 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'The news made me ( ).', 'happy', ['happy','happily','happiness','to happy'], 'make O C(形容詞)', 'その知らせは私を幸せにしました。');
        add('choice', 'His jokes made us ( ).', 'laugh', ['laugh','to laugh','laughing','laughed'], 'make O do(原形) 〜させる', '彼の冗談は私たちを笑わせました。');
        add('choice', 'Let me ( ) it.', 'do', ['do','to do','doing','done'], 'Let me do(原形) 〜させて', '私にそれをやらせてください。');
        add('choice', 'I will help you ( ) your homework.', 'do', ['do','doing','done','did'], 'help 人 (to) do', '私はあなたの宿題を手伝います。');
        add('sort', 'その知らせは彼女を悲しませました。', 'The news made her sad', ['The','news','made','her','sad'], 'make O C', '並べ替え: その知らせは彼女を悲しませました。');
        add('sort', '母は私に皿洗いをさせました。', 'My mother made me wash the dishes', ['My','mother','made','me','wash','the','dishes'], 'make 人 do(強制)', '並べ替え: 母は私に皿洗いをさせました。');
        add('sort', '私がカバンを持つのを手伝いましょうか？', 'Shall I help you carry your bag', ['Shall','I','help','you','carry','your','bag'], 'help 人 do', '並べ替え: 私がカバンを持つのを手伝いましょうか？');
        add('fill', '私に自己紹介させてください。 Let me ( ) myself.', 'introduce', null, 'Let me introduce', '私に自己紹介させてください。');
        add('full', 'その歌はいつも私を幸せにします。', 'The song always makes me happy.', null, 'make O C', 'その歌はいつも私を幸せにします。');
        add('choice', 'This song makes me ( ) of my hometown.', 'think', ['think','to think','thinking','thought'], 'make me think', 'この歌は私に故郷を思い出させます。');
    }

    // --- Stage 5: 現在分詞 (後置修飾) ---
    if (stageId === 5 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'The boy ( ) soccer is Ken.', 'playing', ['playing','played','plays','play'], '〜している少年', 'サッカーをしている少年はケンです。');
        add('choice', 'Do you know the girl ( ) by the door?', 'standing', ['standing','stood','stands','stand'], '〜立っている少女', 'ドアのそばに立っている少女を知っていますか？');
        add('choice', 'Look at the dog ( ) in the park.', 'running', ['running','run','ran','runs'], '〜走っている犬', '公園で走っている犬を見てください。');
        add('sort', '向こうで走っている少年を見てください。', 'Look at the boy running over there', ['Look','at','the','boy','running','over','there'], 'the boy running', '並べ替え: 向こうで走っている少年を見てください。');
        add('sort', '英語を話しているあの男性は誰ですか？', 'Who is that man speaking English', ['Who','is','that','man','speaking','English'], 'that man speaking', '並べ替え: 英語を話しているあの男性は誰ですか？');
        add('sort', 'ステージで歌っている少女は私の妹です。', 'The girl singing on the stage is my sister', ['The','girl','singing','on','the','stage','is','my','sister'], 'The girl singing', '並べ替え: ステージで歌っている少女は私の妹です。');
        add('fill', 'ピアノを弾いている女性は私の母です。 The woman ( ) the piano is my mother.', 'playing', null, 'playing', 'ピアノを弾いている女性は私の母です。');
        add('full', '公園で走っている少年たちは私の友達です。', 'The boys running in the park are my friends.', null, '複数形に注意', '公園で走っている少年たちは私の友達です。');
        add('choice', 'Who is the boy ( ) with Tom?', 'talking', ['talking','talk','talked','talks'], 'talking with', 'トムと話している少年は誰ですか？');
    }

    // --- Stage 6: 過去分詞 (後置修飾) ---
    if (stageId === 6 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'This is a camera ( ) in Japan.', 'made', ['made','making','make','makes'], '〜作られたカメラ', 'これは日本で作られたカメラです。');
        add('choice', 'I read a book ( ) by Soseki.', 'written', ['written','writing','wrote','writes'], '〜書かれた本', '私は漱石によって書かれた本を読みました。');
        add('choice', 'English is a language ( ) in many countries.', 'spoken', ['spoken','speaking','spoke','speaks'], '〜話されている言語', '英語は多くの国で話されている言語です。');
        add('sort', 'これは英語で書かれた手紙です。', 'This is a letter written in English', ['This','is','a','letter','written','in','English'], 'letter written', '並べ替え: これは英語で書かれた手紙です。');
        add('sort', '彼女によって作られたケーキは美味しかった。', 'The cake made by her was delicious', ['The','cake','made','by','her','was','delicious'], 'The cake made by her', '並べ替え: 彼女によって作られたケーキは美味しかった。');
        add('sort', '彼はみんなに愛されている歌手です。', 'He is a singer loved by everyone', ['He','is','a','singer','loved','by','everyone'], 'singer loved', '並べ替え: 彼はみんなに愛されている歌手です。');
        add('fill', 'その店で売られているクッキーは人気があります。 The cookies ( ) at the shop are popular.', 'sold', null, 'sold (sellの過去分詞)', 'その店で売られているクッキーは人気があります。');
        add('full', 'ドイツ製の車（ドイツで作られた車）は高い。', 'Cars made in Germany are expensive.', null, 'Cars made in...', 'ドイツで作られた車は高いです。');
        add('choice', 'Have you ever seen the mountain ( ) Fuji?', 'called', ['called','calling','calls','call'], '〜と呼ばれる', 'あなたは富士山と呼ばれる山を見たことがありますか？');
    }

    // --- Stage 7: 関係代名詞 (主格) ---
    if (stageId === 7 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'I have a friend ( ) lives in Tokyo.', 'who', ['who','which','whom','whose'], '先行詞が人', '私には東京に住んでいる友人がいます。');
        add('choice', 'This is a bus ( ) goes to the station.', 'which', ['which','who','whom','whose'], '先行詞が物', 'これは駅へ行くバスです。');
        add('choice', 'I want a dog ( ) runs fast.', 'that', ['that','who','whom','whose'], '先行詞が動物(that/which)', '私は速く走る犬が欲しいです。');
        add('sort', '公園で走っている少年を見てください。', 'Look at the boy who is running in the park', ['Look','at','the','boy','who','is','running','in','the','park'], 'who + be + ing (分詞との書き換え)', '並べ替え: 公園で走っている少年を見てください。');
        add('sort', 'これは私たちの学校へ行くバスです。', 'This is the bus which goes to our school', ['This','is','the','bus','which','goes','to','our','school'], 'bus which goes', '並べ替え: これは私たちの学校へ行くバスです。');
        add('sort', '彼女は英語を上手に話す先生です。', 'She is a teacher who speaks English well', ['She','is','a','teacher','who','speaks','English','well'], 'teacher who speaks', '並べ替え: 彼女は英語を上手に話す先生です。');
        add('fill', '私には父が医者である友人がいます。(※所有格)', 'I have a friend ( ) father is a doctor.', 'whose', null, 'whose + 名詞', '私には父が医者である友人がいます。');
        add('full', '彼は速く走る犬を飼っています。', 'He has a dog which runs fast.', null, 'dog which runs', '彼は速く走る犬を飼っています。');
        add('choice', 'The man ( ) is standing there is Ken.', 'who', ['who','which','whom','whose'], 'The man who...', 'あそこに立っている男性はケンです。');
    }

    // --- Stage 8: 関係代名詞 (目的格) ---
    if (stageId === 8 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'This is the book ( ) I bought yesterday.', 'which', ['which','who','whom','whose'], '目的格(物)', 'これは私が昨日買った本です。');
        add('choice', 'The man ( ) I met yesterday was kind.', 'whom', ['whom','which','whose','what'], '目的格(人・硬い表現)', '私が昨日会った男性は親切でした。');
        add('choice', 'The movie ( ) I saw last night was exciting.', 'that', ['that','who','whom','what'], '目的格(that)', '私が昨夜見た映画はワクワクしました。');
        add('sort', 'これは彼が作ったケーキです。', 'This is the cake he made', ['This','is','the','cake','he','made'], '接触節(省略)', '並べ替え: これは彼が作ったケーキです。');
        add('sort', '私が一番好きな科目は数学です。', 'The subject I like the best is math', ['The','subject','I','like','the','best','is','math'], 'The subject (that) I like', '並べ替え: 私が一番好きな科目は数学です。');
        add('sort', 'あれは彼が欲しがっているギターです。', 'That is the guitar which he wants', ['That','is','the','guitar','which','he','wants'], 'guitar which he wants', '並べ替え: あれは彼が欲しがっているギターです。');
        add('fill', 'これは私が撮った写真です。 This is the picture I ( ).', 'took', null, 'picture I took', 'これは私が撮った写真です。');
        add('full', 'これは私が昨日買った本です。', 'This is the book I bought yesterday.', null, 'book I bought', 'これは私が昨日買った本です。');
        add('choice', 'The curry ( ) my father made was delicious.', 'that', ['that','who','whom','whose'], 'curry (that) my father made', '父が作ったカレーは美味しかったです。');
    }

    // --- Stage 9: 仮定法 ---
    if (stageId === 9 || (stageId >= 10 && stageId !== 12)) {
        add('choice', 'I wish I ( ) a bird.', 'were', ['were','am','was','be'], 'be動詞はwere', '私が鳥だったらいいのになあ。');
        add('choice', 'If I ( ) rich, I could buy the car.', 'were', ['were','am','was','be'], 'If I were', 'もし私が金持ちなら、その車を買えるのに。');
        add('choice', 'I wish I ( ) play the piano.', 'could', ['could','can','will','do'], 'wish + 助動詞過去', 'ピアノが弾けたらいいのになあ。');
        add('sort', 'もっとお金があればいいのになあ。', 'I wish I had more money', ['I','wish','I','had','more','money'], 'wish I had(一般動詞過去)', '並べ替え: もっとお金があればいいのになあ。');
        add('sort', 'もし私があなたなら、そんなことはしないでしょう。', 'If I were you I would not do that', ['If','I','were','you','I','would','not','do','that'], 'If I were you', '並べ替え: もし私があなたなら、そんなことはしないでしょう。');
        add('sort', '英語が話せればいいのになあ。', 'I wish I could speak English', ['I','wish','I','could','speak','English'], 'wish I could', '並べ替え: 英語が話せればいいのになあ。');
        add('fill', 'もし時間があれば、行けるのに。 If I ( ) time, I could go.', 'had', null, 'If I had', 'もし時間があれば、行けるのに。');
        add('full', 'もし雨でなければ、野球ができるのに。', 'If it were not rainy, we could play baseball.', null, 'If it were not', 'もし雨でなければ、野球ができるのに。');
        add('choice', 'If I knew his number, I ( ) call him.', 'would', ['would','will','can','shall'], '帰結節の助動詞過去', 'もし彼の番号を知っていたら、電話するのに。');
    }

    // --- Stage 12: EX (中3難問記述) ---
    if (stageId === 12) {
        add('full', '私は彼に、なぜそんなに悲しいのか尋ねました。', 'I asked him why he was so sad.', null, 'ask人 + 間接疑問', '私は彼に、なぜそんなに悲しいのか尋ねました。');
        add('full', 'この本は夏目漱石によって書かれましたか？', 'Was this book written by Soseki Natsume?', null, '受動態の疑問文', 'この本は夏目漱石によって書かれましたか？');
        add('full', '私の父は私に、毎日英語を勉強するように言います。', 'My father tells me to study English every day.', null, 'tell 人 to', '私の父は私に、毎日英語を勉強するように言います。');
        add('full', '私は彼がどこに住んでいるか知りません。', 'I do not know where he lives.', null, '間接疑問文', '私は彼がどこに住んでいるか知りません。');
        add('full', '私は10年間ずっと彼を知っています。', 'I have known him for ten years.', null, 'knowは進行形不可', '私は10年間ずっと彼を知っています。');
        add('full', 'これは私が今までに見た中で最も面白い映画です。', 'This is the most interesting movie that I have ever seen.', null, '最上級 + 関係代名詞 + 現在完了', 'これは私が今までに見た中で最も面白い映画です。');
        add('full', 'もし私に翼があれば、あなたのところへ飛んでいけるのに。', 'If I had wings, I could fly to you.', null, '仮定法過去', 'もし私に翼があれば、あなたのところへ飛んでいけるのに。');
        return q;
    }

    return q;
}

// --- ゲーム変数 ---
let gameState = {
    mode: '', 
    stageId: 1,
    queue: [],
    qIndex: 0,
    score: 0,
    combo: 0,
    mistakes: [],
    hp: 5,
    maxHp: 5, 
    expGained: 0,
    goldGained: 0,
    endlessWave: 0,
    endlessCorrectCount: 0, 
    writeCorrectCount: 0,
    shieldActive: false,
    pencilUsed: false,
    coinActive: false,
    debugClicks: 0 // デバッグ用カウンタ
};

// --- セーブデータ管理 ---
function loadGameData() {
    let data = localStorage.getItem(SAVE_KEY);
    let parsed = data ? JSON.parse(data) : {};
    return {
        cleared: parsed.cleared || [],
        achieved: parsed.achieved || [],
        level: parsed.level || 1,
        exp: parsed.exp || 0,
        gold: parsed.gold || 0,
        items: {
            potion: (parsed.items && parsed.items.potion) || 0,
            bomb: (parsed.items && parsed.items.bomb) || 0,
            hint: (parsed.items && parsed.items.hint) || 0,
            pencil: (parsed.items && parsed.items.pencil) || 0,
            shield: (parsed.items && parsed.items.shield) || 0,
            coin: (parsed.items && parsed.items.coin) || 0
        },
        totalSolved: parsed.totalSolved || 0,
        writeCount: parsed.writeCount || 0,
        maxEndlessScore: parsed.maxEndlessScore || 0 
    };
}
let saveData = loadGameData();

function getNextLevelExp(level) { return level * 50 + Math.floor(Math.pow(level, 1.5)) * 10; }

window.onload = () => {
    updateTitleStats();
    updateStageList();
    
    // デバッグモードトリガー
    document.getElementById('game-title').onclick = () => {
        gameState.debugClicks++;
        if(gameState.debugClicks >= 7) {
            document.getElementById('debug-btn').classList.remove('hidden');
            gameState.debugClicks = 0; // リセット
            alert("デバッグモードが有効になりました。左上のボタンを押してください。");
        }
    };
};

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id === 'screen-stages') {
        const goldEl = document.getElementById('stage-gold');
        if(goldEl) goldEl.innerText = saveData.gold;
    }
}

function updateTitleStats() {
    const nextExp = getNextLevelExp(saveData.level);
    document.getElementById('title-level').innerText = saveData.level;
    document.getElementById('title-next-exp').innerText = nextExp - saveData.exp;
    const pct = Math.min(100, (saveData.exp / nextExp) * 100);
    document.getElementById('title-exp-bar').style.width = `${pct}%`;
    const recEl = document.getElementById('endless-record-display');
    if(recEl) recEl.innerText = `Survival Record: ${saveData.maxEndlessScore} 問`;
}

function updateStageList() {
    const list = document.getElementById('stage-list');
    list.innerHTML = '';
    const maxStage = saveData.cleared.length >= 11 ? 12 : 11;

    for(let i=1; i<=maxStage; i++) {
        const btn = document.createElement('button');
        const isLocked = i > 1 && !saveData.cleared.includes(i-1);
        btn.innerText = `Stage ${i}: ${STAGE_TITLES[i]}`;
        if(saveData.cleared.includes(i)) btn.innerText += " ✅";
        
        if(isLocked) {
            btn.classList.add('locked');
            btn.disabled = true;
            btn.innerText = "🔒 Locked";
        } else {
            btn.onclick = () => startStage(i);
        }
        list.appendChild(btn);
    }
    
    const endBtn = document.getElementById('btn-endless');
    const recEl = document.getElementById('endless-record-display');
    
    if(saveData.cleared.includes(10)) { 
        endBtn.classList.remove('locked');
        endBtn.classList.remove('hidden');
        endBtn.innerText = "♾️ サバイバルモード";
        endBtn.disabled = false;
        if(recEl) recEl.classList.remove('hidden'); 
    } else {
        endBtn.classList.add('locked');
        endBtn.classList.add('hidden');
        endBtn.disabled = true;
        if(recEl) recEl.classList.add('hidden'); 
    }
    
    const goldEl = document.getElementById('stage-gold');
    if(goldEl) goldEl.innerText = saveData.gold;
}

// --- ショップ機能 ---
function showShop() {
    showScreen('screen-shop');
    updateShopUI();
}

function updateShopUI() {
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    setTxt('shop-gold', `${saveData.gold} G`);
    setTxt('inv-potion', saveData.items.potion);
    setTxt('inv-bomb', saveData.items.bomb);
    setTxt('inv-hint', saveData.items.hint);
    setTxt('inv-pencil', saveData.items.pencil);
    setTxt('inv-shield', saveData.items.shield);
    setTxt('inv-coin', saveData.items.coin);
}

function buyItem(item, price) {
    if(saveData.gold >= price) {
        saveData.gold -= price;
        saveData.items[item] = (saveData.items[item] || 0) + 1;
        saveGame();
        updateShopUI();
    } else {
        alert("ゴールドが足りません！");
    }
}

// --- アイテム使用 ---
function updateItemButtons() {
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    
    setTxt('game-inv-potion', saveData.items.potion || 0);
    setTxt('game-inv-bomb', saveData.items.bomb || 0);
    setTxt('game-inv-hint', saveData.items.hint || 0);
    setTxt('game-inv-pencil', saveData.items.pencil || 0);
    setTxt('game-inv-shield', saveData.items.shield || 0);
    setTxt('game-inv-coin', saveData.items.coin || 0);
    
    const currentQ = gameState.queue[gameState.qIndex];
    if(!currentQ) return;

    const btnPotion = document.getElementById('btn-use-potion');
    if(btnPotion) btnPotion.disabled = !(saveData.items.potion > 0 && gameState.hp < gameState.maxHp);

    const btnBomb = document.getElementById('btn-use-bomb');
    if(btnBomb) btnBomb.disabled = !(saveData.items.bomb > 0 && currentQ.type === 'choice');
    
    const btnHint = document.getElementById('btn-use-hint');
    if(btnHint) btnHint.disabled = !(saveData.items.hint > 0 && (currentQ.type === 'fill' || currentQ.type === 'full' || currentQ.type === 'sort'));
    
    const btnPencil = document.getElementById('btn-use-pencil');
    if(btnPencil) btnPencil.disabled = !(saveData.items.pencil > 0 && !gameState.pencilUsed && (currentQ.type === 'fill' || currentQ.type === 'full'));
    
    const btnShield = document.getElementById('btn-use-shield');
    if(btnShield) btnShield.disabled = !(saveData.items.shield > 0 && !gameState.shieldActive);
    
    const btnCoin = document.getElementById('btn-use-coin');
    if(btnCoin) btnCoin.disabled = !(saveData.items.coin > 0 && !gameState.coinActive);
}

function usePotion() {
    if(saveData.items.potion > 0 && gameState.hp < gameState.maxHp) {
        saveData.items.potion--;
        gameState.hp++;
        updateHpBar();
        updateItemButtons();
        unlockAchievement('item_user');
        saveGame();
    }
}

function useBomb() {
    if(saveData.items.bomb > 0) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'choice') {
            saveData.items.bomb--;
            saveGame();
            const container = document.getElementById('choices-container');
            const buttons = Array.from(container.children);
            let removed = 0;
            for(let btn of buttons) {
                if(btn.innerText !== q.a) {
                    btn.style.visibility = 'hidden';
                    removed++;
                    if(removed >= 2) break;
                }
            }
            updateItemButtons();
        }
    }
}

function useHint() {
    if(saveData.items.hint > 0) {
        saveData.items.hint--;
        saveGame();
        unlockAchievement('item_user');
        
        const q = gameState.queue[gameState.qIndex];
        
        if(q.type === 'sort') {
            alert(`最初の単語は "${q.a.split(' ')[0]}" です`);
        } else if(q.type === 'fill' || q.type === 'full') {
            const words = q.a.split(' ');
            const firstWord = words[0];
            const inp = document.getElementById('writing-input');
            inp.value = firstWord + " ";
            inp.focus();
            
            let hintPattern = words.map(w => w[0] + "_".repeat(Math.max(0, w.length-1))).join(' ');
            hintPattern = hintPattern.replace(/_/g, '_');
            document.getElementById('writing-hint').innerText = "Hint: " + hintPattern;
        }
        updateItemButtons();
    }
}

function usePencil() {
    if(saveData.items.pencil > 0 && !gameState.pencilUsed) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'fill' || q.type === 'full') {
            saveData.items.pencil--;
            gameState.pencilUsed = true;
            saveGame();
            
            let dummies = ["I don't know.", "She is happy.", "He plays tennis."];
            if(gameState.queue.length > 3) {
                dummies = gameState.queue.filter(bq => bq !== q).slice(0,3).map(bq => bq.a);
            }
            
            document.getElementById('writing-container').classList.add('hidden');
            const c = document.getElementById('choices-container');
            c.classList.remove('hidden');
            c.innerHTML = '';
            
            let opts = [q.a, ...dummies].sort(() => Math.random() - 0.5);
            opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(opt === q.a, q);
                c.appendChild(btn);
            });
            updateItemButtons();
        }
    }
}

function useShield() {
    if(saveData.items.shield > 0 && !gameState.shieldActive) {
        saveData.items.shield--;
        gameState.shieldActive = true;
        document.getElementById('shield-overlay').classList.remove('hidden');
        saveGame();
        updateItemButtons();
    }
}

function useCoin() {
    if(saveData.items.coin > 0 && !gameState.coinActive) {
        saveData.items.coin--;
        gameState.coinActive = true;
        document.getElementById('coin-overlay').classList.remove('hidden');
        saveGame();
        updateItemButtons();
    }
}

// --- ゲーム開始初期化 ---
function initGame(mode) {
    gameState.mode = mode;
    gameState.queue = [];
    gameState.score = 0;
    gameState.combo = 0;
    gameState.qIndex = 0;
    gameState.mistakes = [];
    gameState.hp = 5;
    gameState.maxHp = 5; 
    gameState.expGained = 0;
    gameState.goldGained = 0;
    gameState.endlessWave = 1;
    gameState.endlessCorrectCount = 0; 
    gameState.writeCorrectCount = 0;
    gameState.shieldActive = false;
    gameState.pencilUsed = false;
    gameState.coinActive = false;
    updateHpBar();
    showScreen('screen-game');
    updateItemButtons();
    
    const qArea = document.getElementById('question-area');
    if(qArea) {
        qArea.classList.remove('anim-wrong');   
        qArea.classList.remove('anim-correct'); 
        qArea.style.borderColor = "#dfe6e9";    
    }

    const gameScreen = document.getElementById('screen-game');
    gameScreen.classList.remove('boss-mode');
    document.getElementById('boss-overlay').classList.add('hidden');
    document.getElementById('shield-overlay').classList.add('hidden');
    document.getElementById('coin-overlay').classList.add('hidden');
}

// --- ステージ開始 ---
function startStage(id) {
    initGame('stage');
    gameState.stageId = id;
    
    let pool = [];
    if(id === 12) {
        pool = getStageData(12);
        gameState.queue = pool.sort(() => Math.random() - 0.5).slice(0, 15);
    } else {
        let pool = (id === 11) ? [] : getStageData(id);
        if(id === 11) {
            for(let i=1; i<=10; i++) pool = pool.concat(getStageData(i));
        }
        const choices = pool.filter(q => q.type === 'choice');
        const sorts = pool.filter(q => q.type === 'sort');
        const writes = pool.filter(q => q.type === 'fill' || q.type === 'full');
        const pick = (arr, n) => arr.sort(() => Math.random() - 0.5).slice(0, n);
        
        let set = [];
        set = set.concat(pick(choices, 4));
        set = set.concat(pick(sorts, 3));
        set = set.concat(pick(writes, 3));
        
        while(set.length < 10 && pool.length >= 10) {
            let c = pool[Math.floor(Math.random()*pool.length)];
            if(!set.some(s=>s.id===c.id)) set.push(c);
        }
        gameState.queue = set.sort(() => Math.random() - 0.5);
    }
    
    if(gameState.queue.length === 0) { alert("Data Error"); return; }
    document.getElementById('q-category').innerText = `Stage ${id}`;
    showQuestion();
}

// --- サバイバル(エンドレス)モード ---
function startEndless() {
    initGame('endless');
    addEndlessQuestions();
    showQuestion();
}

function addEndlessQuestions() {
    let pool = [];
    for(let i=1; i<=10; i++) {
        pool = pool.concat(getStageData(i));
    }
    pool = shuffleArray(pool);
    gameState.queue = gameState.queue.concat(pool.slice(0, 10));
}

// --- 問題表示 ---
function showQuestion() {
    if (gameState.mode === 'endless' && gameState.qIndex >= gameState.queue.length) {
        showEndlessModal();
        return;
    }
    if (gameState.qIndex >= gameState.queue.length) {
        finishGame(true);
        return;
    }

    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === gameState.queue.length - 1);
    const gameScreen = document.getElementById('screen-game');
    const bossOverlay = document.getElementById('boss-overlay');
    
    if(isBoss) {
        gameScreen.classList.add('boss-mode');
        bossOverlay.classList.remove('hidden');
        setTimeout(() => bossOverlay.classList.add('hidden'), 2000);
    } else {
        gameScreen.classList.remove('boss-mode');
        bossOverlay.classList.add('hidden');
    }

    const q = gameState.queue[gameState.qIndex];
    document.getElementById('q-text').innerText = q.q;
    
    // 日本語訳の表示
    const transEl = document.getElementById('q-trans');
    if(q.t) {
        transEl.innerText = q.t;
        transEl.classList.remove('hidden');
    } else {
        transEl.classList.add('hidden');
    }

    document.getElementById('q-type-badge').innerText = getTypeLabel(q.type);

    if (gameState.mode === 'endless') {
        document.getElementById('q-category').innerText = `正解数: ${gameState.endlessCorrectCount} (Best: ${saveData.maxEndlessScore})`;
    } else {
        document.getElementById('q-category').innerText = `Stage ${gameState.stageId}`;
    }

    let total = gameState.queue.length;
    let current = gameState.qIndex;
    if(gameState.mode === 'endless') {
        total = 10;
        current = gameState.qIndex % 10;
    }
    const pct = (current / total) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    ['choices-container', 'sort-container', 'writing-container'].forEach(id => 
        document.getElementById(id).classList.add('hidden')
    );
    document.getElementById('writing-status').classList.add('hidden');
    document.getElementById('writing-hint').innerText = ""; 
    gameState.pencilUsed = false;
    updateItemButtons();

    if(q.type === 'choice') {
        const c = document.getElementById('choices-container');
        c.classList.remove('hidden');
        c.innerHTML = '';
        let opts = shuffleArray([...q.o]);
        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(opt === q.a, q);
            c.appendChild(btn);
        });
    } else if(q.type === 'sort') {
        const c = document.getElementById('sort-container');
        c.classList.remove('hidden');
        gameState.sortAns = [];
        gameState.shuffledSortOptions = shuffleArray([...q.o]);
        renderSortUI(q);
    } else {
        const c = document.getElementById('writing-container');
        c.classList.remove('hidden');
        const ws = document.getElementById('writing-status');
        const wordCount = q.a.trim().split(/\s+/).length;
        ws.innerText = `単語数: ${wordCount}`;
        ws.classList.remove('hidden');
        const inp = document.getElementById('writing-input');
        inp.value = '';
        inp.focus();
        inp.onkeydown = (e) => { if(e.key==='Enter') checkWritingAnswer(); };
    }
}

function getTypeLabel(t) {
    if(t==='choice') return '4択';
    if(t==='sort') return '並び替え';
    return '記述';
}

function normalizeText(text) {
    let t = text.toLowerCase().trim();
    t = t.replace(/[.?!,]/g, ''); 
    t = t.replace(/\s+/g, ' ');   
    const maps = {
        "don't": "do not", "doesn't": "does not", "didn't": "did not",
        "can't": "cannot", "won't": "will not", "isn't": "is not", "aren't": "are not",
        "wasn't": "was not", "weren't": "were not", "shouldn't": "should not", "mustn't": "must not",
        "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is",
        "we're": "we are", "they're": "they are", "it's": "it is", "that's": "that is",
        "let's": "let us", "i've": "i have", "you've": "you have"
    };
    for (let key in maps) {
        const regex = new RegExp(`\\b${key.replace("'", "")}\\b`, 'g'); 
        t = t.replace(key, maps[key]);
    }
    return t;
}

function checkAnswer(isCorrect, q) {
    const area = document.getElementById('question-area');
    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === gameState.queue.length - 1);

    if(isCorrect) {
        gameState.score += 10 + gameState.combo;
        gameState.combo++;
        gameState.expGained += 20;
        
        if(gameState.mode === 'endless') {
            gameState.endlessCorrectCount++;
            if(gameState.endlessCorrectCount > saveData.maxEndlessScore) {
                saveData.maxEndlessScore = gameState.endlessCorrectCount;
                saveGame();
            }
        }

        let gold = 20; 
        if(isBoss) { gold += 50; gameState.expGained += 50; unlockAchievement('boss_killer'); }
        gameState.goldGained += gold;

        if(q.type === 'full' || q.type === 'fill') gameState.writeCorrectCount++;
        
        area.classList.add('anim-correct');
        document.getElementById('score-display').innerText = `Score: ${gameState.score}`;
        checkInGameAchievements();
        
        setTimeout(() => {
            area.classList.remove('anim-correct');
            gameState.qIndex++;
            showQuestion();
        }, 500);
    } else {
        if(gameState.shieldActive) {
            gameState.shieldActive = false;
            document.getElementById('shield-overlay').classList.add('hidden');
            alert("🛡️ Shield blocked the damage!");
            gameState.combo = 0;
            area.classList.add('anim-wrong');
            setTimeout(() => {
                area.classList.remove('anim-wrong');
                showExplanation(q);
            }, 500);
        } else {
            let dmg = isBoss ? 2 : 1;
            gameState.hp -= dmg;
            updateHpBar();
            gameState.combo = 0;
            gameState.mistakes.push(q);
            area.classList.add('anim-wrong');
            
            if(gameState.hp <= 0) {
                setTimeout(() => finishGame(false), 500);
            } else {
                setTimeout(() => {
                    area.classList.remove('anim-wrong');
                    showExplanation(q);
                }, 500);
            }
        }
    }
}

function renderSortUI(q) {
    const area = document.getElementById('sort-answer-area');
    const opts = document.getElementById('sort-options-area');
    area.innerHTML = ''; opts.innerHTML = '';
    
    gameState.sortAns.forEach(w => {
        const sp = document.createElement('span');
        sp.className = 'sort-word';
        sp.innerText = w;
        area.appendChild(sp);
    });
    
    let remaining = [...q.o];
    gameState.sortAns.forEach(w => {
        const idx = remaining.indexOf(w);
        if(idx > -1) remaining.splice(idx, 1);
    });
    
    gameState.shuffledSortOptions.forEach(w => {
        if(remaining.includes(w)) {
            const btn = document.createElement('button');
            btn.className = 'btn-small';
            btn.innerText = w;
            btn.onclick = () => {
                gameState.sortAns.push(w);
                renderSortUI(q);
                if(gameState.sortAns.length === q.o.length) checkAnswer(gameState.sortAns.join(' ') === q.a, q);
            };
            opts.appendChild(btn);
            const idx = remaining.indexOf(w);
            if(idx > -1) remaining.splice(idx, 1);
        }
    });
}

function resetSort() { 
    gameState.sortAns = []; 
    gameState.shuffledSortOptions = shuffleArray([...gameState.queue[gameState.qIndex].o]);
    renderSortUI(gameState.queue[gameState.qIndex]); 
}

function checkWritingAnswer() {
    const val = document.getElementById('writing-input').value.trim();
    const q = gameState.queue[gameState.qIndex];
    const normUser = normalizeText(val);
    const normAns = normalizeText(q.a);
    checkAnswer(normUser === normAns, q);
}

function updateHpBar() {
    const pct = Math.max(0, (gameState.hp / gameState.maxHp) * 100);
    const bar = document.getElementById('hp-bar-fill');
    bar.style.width = `${pct}%`;
    bar.style.backgroundColor = gameState.hp <= 1 ? '#d63031' : '#00b894';
}

function showExplanation(q) {
    const m = document.getElementById('explanation-modal');
    document.getElementById('expl-answer').innerText = q.a;
    document.getElementById('expl-text').innerText = q.expl || "No explanation.";
    m.classList.remove('hidden');
}

function closeExplanation() {
    document.getElementById('explanation-modal').classList.add('hidden');
    gameState.qIndex++;
    showQuestion();
}

function showEndlessModal() { document.getElementById('endless-modal').classList.remove('hidden'); }

function continueEndless() {
    document.getElementById('endless-modal').classList.add('hidden');
    gameState.hp = gameState.maxHp;
    updateHpBar();
    addEndlessQuestions();
    showQuestion();
}

function finishGame(isClear) {
    document.getElementById('endless-modal').classList.add('hidden');

    showScreen('screen-result');
    const title = document.getElementById('result-title');
    const badge = document.getElementById('rank-badge');
    const msg = document.getElementById('levelup-msg');
    if(msg) msg.classList.add('hidden');

    if(!isClear) {
        title.innerText = "GAME OVER";
        title.style.color = "#d63031";
        badge.innerText = "F";
        badge.className = "rank-F";
        unlockAchievement('rank_f');
    } else {
        title.innerText = "QUEST CLEAR!";
        title.style.color = "#2d3436";
        const rate = (gameState.queue.length - gameState.mistakes.length) / gameState.queue.length; 
        let rank = 'C';
        if(rate >= 1.0) rank = 'S';
        else if(rate >= 0.8) rank = 'A';
        else if(rate >= 0.6) rank = 'B';
        badge.innerText = rank;
        badge.className = `rank-${rank}`;
        
        saveData.totalSolved += (gameState.qIndex - gameState.mistakes.length);
        saveData.writeCount += gameState.writeCorrectCount;

        if(gameState.mode === 'stage' && rank !== 'C') {
            if(!saveData.cleared.includes(gameState.stageId)) {
                saveData.cleared.push(gameState.stageId);
                unlockAchievement(`c${gameState.stageId}`);
                gameState.goldGained += 500; 
            }
        }
        
        if(rank === 'S') { unlockAchievement('rank_s'); gameState.goldGained += 300; }
        if(gameState.mistakes.length === 0) unlockAchievement('no_miss');
        if(gameState.coinActive) {
            gameState.goldGained *= 2;
        }
    }

    saveData.gold += gameState.goldGained;
    document.getElementById('result-gold').innerText = `+${gameState.goldGained} G` + (gameState.coinActive && isClear ? " (x2)" : "");
    if(saveData.gold >= 1000) unlockAchievement('rich');

    processExp();
    checkGlobalAchievements();
    saveGame();
    updateStageList();
    updateTitleStats();
}

function checkInGameAchievements() {
    if(gameState.combo >= 10) unlockAchievement('combo_10');
    if(gameState.mode === 'endless') {
        const count = gameState.endlessCorrectCount;
        if(count >= 10) unlockAchievement('end_10');
    }
}

function checkGlobalAchievements() {
    if(saveData.totalSolved >= 100) unlockAchievement('total_100');
    if(saveData.totalSolved >= 300) unlockAchievement('total_300');
    if(saveData.totalSolved >= 500) unlockAchievement('total_500');
}

function unlockAchievement(id) {
    if(!saveData.achieved.includes(id)) {
        saveData.achieved.push(id);
        const a = ACHIEVEMENTS.find(x => x.id === id);
        if(a) { 
            alert(`🏆 称号獲得: ${a.name}\n${a.desc}`); 
        }
        saveGame();
    }
}

function processExp() {
    const gained = gameState.expGained;
    saveData.exp += gained;
    document.getElementById('result-exp').innerText = `+${gained} EXP`;
    let leveledUp = false;
    while(true) {
        const need = getNextLevelExp(saveData.level);
        if(saveData.exp >= need) {
            saveData.exp -= need;
            saveData.level++;
            leveledUp = true;
        } else { break; }
    }
    const nextNeed = getNextLevelExp(saveData.level);
    const pct = (saveData.exp / nextNeed) * 100;
    document.getElementById('result-exp-bar').style.width = `${pct}%`;
    const msg = document.getElementById('levelup-msg');
    if(leveledUp && msg) msg.classList.remove('hidden');
}

function saveGame() { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData)); }

function showAchievements() {
    showScreen('screen-achievements');
    const list = document.getElementById('achievement-list');
    list.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
        const u = saveData.achieved.includes(a.id);
        const div = document.createElement('div');
        div.className = `achievement-card ${u?'unlocked':''}`;
        const name = a.name;
        const desc = (!u && (a.id.includes('hidden'))) ? "???" : a.desc;
        div.innerHTML = `<div class="achieve-icon">${u?a.icon:'🔒'}</div><div><div style="font-weight:bold">${name}</div><div style="font-size:0.8rem; color:#636e72">${desc}</div></div>`;
        list.appendChild(div);
    });
}

function confirmQuit() { if(confirm("あきらめますか？")) showScreen('screen-title'); }
function retryGame() { if(gameState.mode==='stage') startStage(gameState.stageId); else startEndless(); }
function nextStage() { startStage(gameState.stageId + 1); }

function toggleDebugMenu() { 
    document.getElementById('debug-menu').classList.toggle('hidden'); 
}

function debugUnlockAll() { 
    saveData.cleared=[1,2,3,4,5,6,7,8,9,10,11,12]; 
    saveData.level = 30; saveData.gold+=10000;
    saveGame(); updateStageList(); updateTitleStats(); 
    alert("全開放しました！"); 
}

// データ削除（強制リセット）
function debugReset() { 
    if(confirm("【警告】現在のセーブデータを完全に削除して初期化します。\nよろしいですか？")) { 
        // ローカルストレージを削除
        localStorage.removeItem(SAVE_KEY);
        // メモリ上のデータも初期化
        saveData = {
            cleared: [], achieved: [], level: 1, exp: 0, gold: 0,
            items: { potion: 0, bomb: 0, hint: 0, pencil: 0, shield: 0, coin: 0 },
            totalSolved: 0, writeCount: 0
        };
        // UI更新
        updateTitleStats();
        updateStageList();
        showScreen('screen-title');
        document.getElementById('debug-btn').classList.add('hidden');
        document.getElementById('debug-menu').classList.add('hidden');
        gameState.debugClicks = 0;
        alert("データを初期化しました。");
    } 
}
