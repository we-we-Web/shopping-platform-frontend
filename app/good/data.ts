const data = [
    {
        title: '斜跨包',
        categories: 'bag',
        description: ' 【ARC\'TERYX / アークテリクス】\nカナダのアウトドアブランド。ブランド名は、恐竜と鳥類をつなぐ始祖鳥、アーキオプテリクス・リトグラフィカに由来。進化を加速することで、アウトドアにおける人間の進歩の推進に役立つということを象徴している。始祖鳥は、アークテリクスのブランドロゴにもなっている。\n高性能の登山者用ウェアを発売し、人気となる。素材にゴアテックスなど、機能性の高いものを使用。クライミングに特化したウェアや、ハイキングアイテム、スキーウェア、トレイルランニングウェアなど、それぞれのアクティビティに対応したアイテムを揃える。都会的なデザインによってアウトドア用ではなく、ファッションとしてもアークテリクスのウェアやバッグ、アクセサリーなどが人気。',
        price: 8470,
        image: 'https://images.daytona-park.com/items/original/1063044900196/1063044900196-_16.jpg'
    },
    {
        title: '登山外套',
        categories: 'shirt',
        description: 'ブランド名の由来は、創立者のイボン・シュイナードが遠征のために訪れた南米大陸最南端パタゴニア地方の厳しい環境に適したウェアを作ることから。 日本、ヨーロッパに支社を置き、グローバルに事業展開をする米国アウトドア衣料品製造・販売会社。 クライミング､スキー､スノーボード､サーフィン、フライフィッシングなど、機械に頼らないアウトドア・スポーツに必要な機能を兼ね備えたウェア、ラゲージ、ギアをはじめ、キッズウェアなどを自社ブランド（patagonia（R））で展開する。 『最高の製品を作り、環境に与える不必要な悪影響を最小限に抑える。そしてビジネスを手段として環境危機に警鐘を鳴らし、解決に向けて実行する』 というミッションステートメント（社是）のもと、製品作りをすすめる。徹底した品質主義と環境行動主義で国際的に知られる。',
        price: 20900,
        image: 'https://images.daytona-park.com/items/original/1157216500107/1157216500107-_16.jpg'
    },
    {
        title: '毛絨皮卡丘（大）',
        categories: 'doll',
        description: '■與丹尼爾·阿爾沙姆和口袋妖怪的合作項目。\n■人氣角色“皮卡丘”的毛絨玩具（大）。\n■說明從破碎的部分出現水晶晶體的設計插圖，這是在假設它會在1000年後變成化石和發現的情況下創建的。',
        price: 44275,
        image: 'https://images.daytona-park.com/items/original/1157216500107/1157216500107-_16.jpg'
    },
    {
        title: '毛絨皮卡丘（小）',
        categories: 'doll',
        description: 'Daniel Arsham 和 Pokemon 之間的合作項目。\n人氣角色「皮卡丘」的毛絨玩具（小）。\n假設它是在 1000 年後被化石化和發現的，並且從損壞的部分出現水晶晶體的設計通過插圖表現出來。',
        price: 34275,
        image: 'https://images.daytona-park.com/items/original/3589182300860/3589182300860-_26.jpg'
    },
    {
        title: '防水登山背包',
        categories: 'bag',
        description: '這款高性能登山背包採用防水材料製作,容量40升,適合2-3天的短途徒步旅行。背包配有人體工學肩帶和腰帶,可以均勻分散重量,減輕背部壓力。多個外部口袋方便存取小物品,內部隔層可以有序收納裝備。背包底部有單獨的鞋子收納區,保持其他物品乾燥清潔。',
        price: 12800,
        image: 'https://example.com/images/hiking-backpack.jpg'
    },
    {
        title: '輕量速乾T恤',
        categories: 'shirt',
        description: '這款運動T恤採用輕量速乾面料,吸濕排汗效果出色。衣服重量僅120克,穿著輕盈舒適。布料添加抗菌處理,有效抑制異味產生。衣服採用無縫技術製作,減少摩擦,適合各種戶外運動。提供多種顏色選擇,適合男女穿著。',
        price: 3600,
        image: 'https://example.com/images/quick-dry-tshirt.jpg'
    },
    {
        title: '多功能露營燈',
        categories: 'gear',
        description: '這款露營燈集多種功能於一身。可作為手電筒、營地燈和應急照明使用。內置5200mAh鋰電池,可連續照明長達72小時。燈具防水等級達IPX6,適合各種戶外環境。還可作為移動電源為手機等設備充電。燈光亮度可調節,有冷白光和暖黃光兩種色溫可選。',
        price: 5900,
        image: 'https://example.com/images/camping-lantern.jpg'
    },
    {
        title: '便攜摺疊椅',
        categories: 'furniture',
        description: '這款輕量化摺疊椅僅重900克,收納後體積小巧,方便攜帶。椅子承重可達120公斤,採用航空級鋁合金框架,堅固耐用。座椅和靠背使用透氣網布,舒適不悶熱。附帶收納袋,可掛在背包外側。適合露營、釣魚、野餐等戶外活動使用。',
        price: 4200,
        image: 'https://example.com/images/folding-chair.jpg'
    },
    {
        title: '超輕量睡袋',
        categories: 'sleeping',
        description: '這款睡袋重量僅700克,非常適合背包客和極簡主義者。採用高品質鵝絨填充,保暖性能出色,適用溫度範圍為0°C至-10°C。外層使用20D尼龍面料,具有良好的防水性能。可以快速打包成小型包裹,方便攜帶和存儲。',
        price: 8900,
        image: 'https://example.com/images/ultralight-sleeping-bag.jpg'
    },
    {
        title: '多功能登山杖',
        categories: 'gear',
        description: '這款登山杖採用航空級鋁合金製造,重量輕且強度高。長度可在65cm到135cm之間調節,適合不同身高的使用者。握把採用EVA泡沫材料,舒適防滑。杖尖可更換,適應不同地形。還可作為帳篷支撐桿或自拍桿使用。',
        price: 3200,
        image: 'https://example.com/images/trekking-pole.jpg'
    },
    {
        title: '防水相機包',
        categories: 'bag',
        description: '專為戶外攝影愛好者設計的相機包,採用高密度防水尼龍材料製作。內部有可調節的隔板,可靈活收納相機機身和多個鏡頭。側面和頂部都有快速取用口袋。背部採用透氣網布設計,舒適不悶熱。附帶防雨罩,提供額外保護。',
        price: 6500,
        image: 'https://example.com/images/waterproof-camera-bag.jpg'
    },
    {
        title: '便攜濾水器',
        categories: 'gear',
        description: '這款輕巧的濾水器重量僅65克,可過濾高達1000升的水。能夠去除99.9999%的細菌和原生動物,以及99.9%的微塑料。過濾速度可達每分鐘2升。可直接連接在水壺或水袋上使用,也可作為吸管直接飲用。適合戶外探險和應急情況使用。',
        price: 2800,
        image: 'https://example.com/images/portable-water-filter.jpg'
    },
    {
        title: '太陽能充電板',
        categories: 'electronics',
        description: '這款便攜式太陽能充電板功率為21W,轉換效率達22%。重量僅500克,折疊後體積小巧。配有智能芯片,可自動調節輸出功率,兼容大多數USB設備。防水等級達IPX5,適合各種戶外環境使用。附帶掛鉤,可輕鬆掛在背包或帳篷上。',
        price: 5600,
        image: 'https://example.com/images/solar-charger.jpg'
    },
    {
        title: '防蚊露營帳篷',
        categories: 'tent',
        description: '這款三季帳篷可容納2-3人使用。採用20D硅膠塗層尼龍面料,具有excellent防水性能。全封閉式紗網設計,有效阻擋蚊蟲。搭建簡單,一人可在5分鐘內完成。帳篷重量2.5公斤,包括地釘和營繩。提供多種顏色選擇。',
        price: 15800,
        image: 'https://example.com/images/mosquito-proof-tent.jpg'
    },
    {
        title: '多功能野營刀',
        categories: 'tools',
        description: '這款多功能刀集成了10種常用工具,包括主刀、小刀、開罐器、螺絲刀等。刀身採用440C不銹鋼,堅固耐用。手柄使用G10材料,提供出色的握持感。配有尼龍套,可掛在腰帶上。總重量180克,是戶外活動的理想伴侶。',
        price: 4200,
        image: 'https://example.com/images/multi-tool-knife.jpg'
    },
    {
        title: '防水登山鞋',
        categories: 'footwear',
        description: '這款登山鞋採用全粒面皮革和Gore-Tex防水膜,確保雙腳乾爽舒適。Vibram大底提供出色的抓地力和耐磨性。鞋內使用記憶泡沫鞋墊,行走舒適。腳踝處有額外的保護和支撐。適合各種地形的中長途徒步和登山活動。',
        price: 9800,
        image: 'https://example.com/images/waterproof-hiking-boots.jpg'
    },
    {
        title: '便攜式露營爐',
        categories: 'cooking',
        description: '這款小巧的露營爐重量僅95克,可摺疊收納。使用卡式瓦斯罐作為燃料,火力強勁,可在3分鐘內將1升水燒開。爐頭可360度旋轉,穩定性好。配有防風擋板,提高燃燒效率。附帶收納袋,方便攜帶和存儲。',
        price: 3600,
        image: 'https://example.com/images/portable-camping-stove.jpg'
    },
    {
        title: '戶外急救包',
        categories: 'safety',
        description: '這款全面的戶外急救包包含40多種常用醫療用品,能夠處理大多數戶外意外情況。內含繃帶、紗布、消毒用品、藥品等。外包裝防水耐磨,採用MOLLE系統設計,可掛載在背包上。配有清晰的使用說明書,適合戶外探險和家庭使用。',
        price: 2900,
        image: 'https://example.com/images/outdoor-first-aid-kit.jpg'
    },
    {
        title: '防曬速乾長褲',
        categories: 'pants',
        description: '這款戶外長褲採用輕量速乾面料,具有UPF50+防曬等級。褲子可拆卸成短褲,適應不同天氣。多個拉鍊口袋安全存放隨身物品。膝蓋和臀部位置加固,提高耐用性。腰部採用彈性設計,活動自如。適合徒步、登山、釣魚等多種戶外活動。',
        price: 4800,
        image: 'https://example.com/images/convertible-hiking-pants.jpg'
    },
    {
        title: '輕量化登山冰斧',
        categories: 'gear',
        description: '這款登山冰斧採用航空級鋁合金製造,重量僅340克。長度50cm,適合一般的冰雪攀登和高山徒步。斧頭採用高強度合金鋼,可有效破冰。握把包裹防滑橡膠,即使戴著手套也能牢固抓握。底部有腕帶孔,可繫上防丟繩。附帶保護套。',
        price: 7200,
        image: 'https://example.com/images/lightweight-ice-axe.jpg'
    }
]