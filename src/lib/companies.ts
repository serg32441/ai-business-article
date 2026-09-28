import type { Company, SourceRef } from "./types";

const wiki = (title: string, label = "Википедия"): SourceRef => ({
  url: `https://en.wikipedia.org/wiki/${title}`,
  label,
});

export const companies: Company[] = [
  {
    slug: "deepseek",
    nameEn: "DeepSeek",
    nameZh: "深度求索",
    summary:
      "Ханчжоуская лаборатория больших языковых моделей с открытыми весами и одноимённым чатом.",
    description:
      "DeepSeek разрабатывает большие языковые модели и публичный чат с доступом через приложение и API. Английская Википедия описывает компанию как разработчика моделей с открытыми весами; штаб-квартира находится в Ханчжоу. На сайте лаборатории в числе текущих моделей указана линейка DeepSeek-V4.",
    founded: { year: 2023, source: wiki("DeepSeek") },
    headquarters: { text: "Ханчжоу", source: wiki("DeepSeek") },
    categories: ["llm"],
    models: [
      {
        name: "DeepSeek-V3",
        note: "Линейка больших языковых моделей с открытыми весами.",
        source: wiki("DeepSeek"),
      },
      {
        name: "DeepSeek-R1",
        note: "Модель, которую Википедия относит к открытым весам DeepSeek.",
        source: wiki("DeepSeek"),
      },
      {
        name: "DeepSeek-V4",
        note: "Линейка, которую сайт компании показывает как актуальную.",
        source: { url: "https://www.deepseek.com/", label: "Сайт DeepSeek" },
      },
    ],
    products: [
      {
        name: "DeepSeek",
        note: "Чат и открытая платформа API.",
        source: { url: "https://www.deepseek.com/", label: "Сайт DeepSeek" },
      },
    ],
    website: { url: "https://www.deepseek.com/", label: "deepseek.com" },
    status: "active",
    notes: [
      {
        text: "Английская Википедия описывает DeepSeek как компанию, которую основал Лян Вэньфэн и которая принадлежит фонду High-Flyer. Суммы финансирования каталог не приводит.",
        source: wiki("DeepSeek"),
      },
    ],
  },
  {
    slug: "alibaba",
    nameEn: "Alibaba (Qwen)",
    nameZh: "阿里巴巴",
    summary:
      "Ханчжоуская группа, чья лаборатория Tongyi выпускает семейство Qwen и визуальные модели.",
    description:
      "Alibaba Group основана в Ханчжоу и наряду с торговыми площадками развивает облако и собственные модели. В перечне продуктов английской Википедии указана Tongyi Qianwen (Qwen). Публичная витрина лаборатории Tongyi объединяет языковые модели «Цяньвэнь» и визуальное направление «Ваньсян».",
    founded: { year: 1999, source: wiki("Alibaba_Group", "Википедия: Alibaba Group") },
    headquarters: {
      text: "Ханчжоу",
      source: wiki("Alibaba_Group", "Википедия: Alibaba Group"),
    },
    categories: ["llm", "vision", "video", "cloud"],
    models: [
      {
        name: "Qwen",
        note: "通义千问, семейство языковых и мультимодальных моделей.",
        source: wiki("Alibaba_Group", "Википедия: Alibaba Group"),
      },
      {
        name: "Tongyi Wanxiang",
        note: "通义万相, визуальное направление лаборатории Tongyi.",
        source: { url: "https://tongyi.aliyun.com/", label: "Сайт лаборатории Tongyi" },
      },
    ],
    products: [
      {
        name: "Qwen",
        note: "Публичный чат на моделях лаборатории.",
        source: { url: "https://chat.qwen.ai/", label: "chat.qwen.ai" },
      },
      {
        name: "Alibaba Cloud",
        note: "Облачная платформа группы.",
        source: wiki("Alibaba_Group", "Википедия: Alibaba Group"),
      },
    ],
    website: { url: "https://www.alibabagroup.com/", label: "alibabagroup.com" },
    status: "active",
  },
  {
    slug: "baidu",
    nameEn: "Baidu (ERNIE)",
    nameZh: "百度",
    summary:
      "Пекинская поисковая компания. Флагманская модель — ERNIE, публичный чат известен как 文心一言.",
    description:
      "Baidu — интернет-компания из Пекина, для которой искусственный интеллект является отдельным направлением наряду с поиском. Английская Википедия относит к продуктам Ernie Bot и описывает автономное вождение Apollo, а также полный стек: модели, облако и прикладные системы. Отдельный адрес прежнего сайта чата в момент проверки каталога не открывался, поэтому продукт указан по Википедии, а не по мёртвой ссылке.",
    founded: { year: 2000, source: wiki("Baidu") },
    headquarters: { text: "Пекин", source: wiki("Baidu") },
    categories: ["llm", "vision", "speech", "cloud", "other"],
    models: [
      {
        name: "ERNIE",
        note: "Семейство моделей; публичный чат — Ernie Bot (文心一言).",
        source: wiki("Baidu"),
      },
    ],
    products: [
      {
        name: "Ernie Bot",
        note: "Чат Baidu на базе ERNIE.",
        source: wiki("Baidu"),
      },
      {
        name: "Apollo",
        note: "Направление автономного вождения.",
        source: wiki("Baidu"),
      },
      {
        name: "Baidu AI Cloud",
        note: "Облачная платформа.",
        source: { url: "https://cloud.baidu.com/", label: "cloud.baidu.com" },
      },
    ],
    website: { url: "https://www.baidu.com/", label: "baidu.com" },
    status: "active",
  },
  {
    slug: "tencent",
    nameEn: "Tencent (Hunyuan)",
    nameZh: "腾讯",
    summary: "Шэньчжэньская интернет-группа. Собственное семейство моделей называется Hunyuan (混元).",
    description:
      "Tencent основана в 1998 году, штаб-квартира находится в Шэньчжэне. Помимо связи, игр и облака компания публикует семейство моделей Hunyuan. Отдельная витрина hunyuan.tencent.com описывает эту линейку как продукт Tencent.",
    founded: {
      year: 1998,
      source: {
        url: "https://www.tencent.com/en-us/about.html",
        label: "Tencent: о компании",
      },
    },
    headquarters: {
      text: "Шэньчжэнь",
      source: {
        url: "https://www.tencent.com/en-us/about.html",
        label: "Tencent: о компании",
      },
    },
    categories: ["llm", "video", "cloud"],
    models: [
      {
        name: "Hunyuan",
        note: "混元, семейство моделей Tencent.",
        source: { url: "https://hunyuan.tencent.com/", label: "Сайт Hunyuan" },
      },
    ],
    products: [
      {
        name: "Hunyuan",
        note: "Публичная витрина моделей.",
        source: { url: "https://hunyuan.tencent.com/", label: "Сайт Hunyuan" },
      },
      {
        name: "Tencent Cloud",
        note: "Облачные сервисы, которые компания указывает среди направлений.",
        source: {
          url: "https://www.tencent.com/en-us/about.html",
          label: "Tencent: о компании",
        },
      },
    ],
    website: { url: "https://www.tencent.com/", label: "tencent.com" },
    status: "active",
  },
  {
    slug: "bytedance",
    nameEn: "ByteDance (Doubao)",
    nameZh: "字节跳动",
    summary:
      "Пекинская компания Douyin и TikTok. В Китае её языковой помощник называется Doubao (豆包).",
    description:
      "ByteDance основана в Пекине и известна короткими видео. Английская Википедия отдельно перечисляет генеративные продукты Doubao, Seed, Seedance и Seedream: языковые модели, генерацию видео и изображений. Потребительский чат Doubao открыт на doubao.com.",
    founded: { year: 2012, source: wiki("ByteDance") },
    headquarters: { text: "Пекин", source: wiki("ByteDance") },
    categories: ["llm", "video", "vision"],
    models: [
      { name: "Doubao", note: "豆包, потребительская модельная линейка.", source: wiki("ByteDance") },
      { name: "Seed", note: "Исследовательская линейка моделей.", source: wiki("ByteDance") },
      { name: "Seedance", note: "Модели генерации видео.", source: wiki("ByteDance") },
      { name: "Seedream", note: "Модели изображений.", source: wiki("ByteDance") },
    ],
    products: [
      {
        name: "Doubao",
        note: "Чат и приложение.",
        source: { url: "https://www.doubao.com/", label: "doubao.com" },
      },
      {
        name: "Trae",
        note: "Среда разработки, указанная среди продуктов в Википедии.",
        source: wiki("ByteDance"),
      },
    ],
    website: { url: "https://www.bytedance.com/", label: "bytedance.com" },
    status: "active",
  },
  {
    slug: "zhipu",
    nameEn: "Zhipu / Z.ai",
    nameZh: "智谱",
    summary:
      "Пекинская компания языковых моделей GLM. За пределами Китая с 2025 года выступает под маркой Z.ai.",
    description:
      "Z.ai, до 2025 года известная за пределами Китая как Zhipu AI, разрабатывает семейство GLM и выросла из среды Университета Цинхуа. Английская Википедия относит основание к Пекину и 2019 году. Китайское название компании — 智谱, публичные сайты — z.ai и zhipuai.cn.",
    founded: { year: 2019, source: wiki("Z.ai", "Википедия: Z.ai") },
    headquarters: { text: "Пекин", source: wiki("Z.ai", "Википедия: Z.ai") },
    categories: ["llm", "vision"],
    models: [
      {
        name: "GLM",
        note: "General Language Model, основная открытая линейка.",
        source: wiki("Z.ai", "Википедия: Z.ai"),
      },
    ],
    products: [
      {
        name: "智谱清言",
        note: "Потребительский чат, указанный на сайте компании.",
        source: { url: "https://www.zhipuai.cn/", label: "zhipuai.cn" },
      },
      {
        name: "Z.ai",
        note: "Международная витрина.",
        source: { url: "https://z.ai/", label: "z.ai" },
      },
    ],
    website: { url: "https://z.ai/", label: "z.ai" },
    status: "active",
    notes: [
      {
        text: "Компания торгуется на Гонконгской бирже. Капитализацию и раунды каталог намеренно не приводит.",
        source: wiki("Z.ai", "Википедия: Z.ai"),
      },
    ],
  },
  {
    slug: "moonshot",
    nameEn: "Moonshot AI",
    nameZh: "月之暗面",
    summary: "Пекинская лаборатория. Потребительский помощник называется Kimi.",
    description:
      "Moonshot AI (月之暗面) основана в Пекине в марте 2023 года. Английская Википедия называет основной продукт Kimi и перечисляет отдельные режимы: исследовательский помощник, агенты, код и аудио. Компания входит в группу стартапов, которую в отрасли называют «шестью тиграми» больших моделей.",
    founded: { year: 2023, source: wiki("Moonshot_AI", "Википедия: Moonshot AI") },
    headquarters: { text: "Пекин", source: wiki("Moonshot_AI", "Википедия: Moonshot AI") },
    categories: ["llm", "speech"],
    models: [
      {
        name: "Kimi",
        note: "Флагманская модельная линейка помощника.",
        source: wiki("Moonshot_AI", "Википедия: Moonshot AI"),
      },
    ],
    products: [
      { name: "Kimi", note: "Чат.", source: { url: "https://kimi.com/", label: "kimi.com" } },
      {
        name: "Kimi Researcher",
        source: wiki("Moonshot_AI", "Википедия: Moonshot AI"),
      },
      {
        name: "Kimi Code",
        source: wiki("Moonshot_AI", "Википедия: Moonshot AI"),
      },
      {
        name: "Kimi Audio",
        source: wiki("Moonshot_AI", "Википедия: Moonshot AI"),
      },
    ],
    website: { url: "https://moonshot.ai/", label: "moonshot.ai" },
    status: "active",
  },
  {
    slug: "minimax",
    nameEn: "MiniMax",
    nameZh: "稀宇科技",
    summary:
      "Шанхайская лаборатория языковых, голосовых и видеомоделей. Потребительское видео известно как Hailuo.",
    description:
      "MiniMax выпускает языковые модели, генерацию видео, речь и музыку. Юридическое лицо 上海稀宇极智科技有限公司, по энциклопедической справке Baidu, зарегистрировано в Шанхае в ноябре 2021 года. Основатель и генеральный директор Янь Цзюньцзе указан на странице руководства для инвесторов. Публичные витрины — minimaxi.com и Hailuo.",
    founded: {
      year: 2021,
      source: {
        url: "https://baike.baidu.com/item/%E4%B8%8A%E6%B5%B7%E7%A8%80%E5%AE%87%E6%9E%81%E6%99%BA%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/64639115",
        label: "Байду Байкэ: 稀宇极智",
      },
    },
    headquarters: {
      text: "Шанхай",
      source: {
        url: "https://baike.baidu.com/item/%E4%B8%8A%E6%B5%B7%E7%A8%80%E5%AE%87%E6%9E%81%E6%99%BA%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/64639115",
        label: "Байду Байкэ: 稀宇极智",
      },
    },
    categories: ["llm", "video", "speech"],
    models: [
      {
        name: "MiniMax M",
        note: "Языковые модели.",
        source: { url: "https://www.minimaxi.com/", label: "Сайт MiniMax" },
      },
      {
        name: "MiniMax H",
        note: "Видеомодели, на сайте связанные с Hailuo.",
        source: { url: "https://www.minimaxi.com/", label: "Сайт MiniMax" },
      },
      {
        name: "MiniMax Speech",
        note: "Речь и музыка.",
        source: { url: "https://www.minimaxi.com/", label: "Сайт MiniMax" },
      },
    ],
    products: [
      {
        name: "Hailuo",
        note: "Потребительская генерация видео.",
        source: { url: "https://hailuoai.com/", label: "hailuoai.com" },
      },
      {
        name: "MiniMax",
        note: "Платформа моделей и API.",
        source: { url: "https://www.minimaxi.com/", label: "Сайт MiniMax" },
      },
    ],
    website: { url: "https://www.minimaxi.com/", label: "minimaxi.com" },
    status: "active",
    notes: [
      {
        text: "Янь Цзюньцзе указан основателем, председателем совета и генеральным директором.",
        source: {
          url: "https://ir.minimax.cn/zh-HK/corporate-information/management",
          label: "MiniMax: руководство",
        },
      },
    ],
  },
  {
    slug: "01-ai",
    nameEn: "01.AI",
    nameZh: "零一万物",
    summary: "Пекинская лаборатория Ли Кайфу. Открытая линейка моделей называется Yi.",
    description:
      "01.AI (零一万物) основана в Пекине в марте 2023 года Ли Кайфу. Компания публикует открытые модели семейства Yi и прикладного помощника Wanzhi. Английская Википедия описывает её как одну из шести заметных китайских лабораторий больших моделей.",
    founded: { year: 2023, source: wiki("01.AI") },
    headquarters: { text: "Пекин", source: wiki("01.AI") },
    categories: ["llm"],
    models: [
      {
        name: "Yi",
        note: "Семейство открытых языковых моделей. Размеры в названии каталог не раскрывает.",
        source: wiki("01.AI"),
      },
    ],
    products: [
      {
        name: "Wanzhi",
        note: "Прикладной помощник, описанный в Википедии.",
        source: wiki("01.AI"),
      },
      {
        name: "01.AI",
        note: "Сайт лаборатории.",
        source: { url: "https://www.01.ai/", label: "01.ai" },
      },
    ],
    website: { url: "https://www.01.ai/", label: "01.ai" },
    status: "active",
  },
  {
    slug: "baichuan",
    nameEn: "Baichuan",
    nameZh: "百川智能",
    summary: "Пекинская лаборатория Ван Сяочуаня, бывшего главы Sogou. Модели носят имя Baichuan.",
    description:
      "Baichuan (百川智能) основана в Пекине в апреле 2023 года Ван Сяочуанем. Компания выпускает одноимённую серию больших языковых моделей и входит в ту же группу «шести тигров», что Zhipu, Moonshot, MiniMax, 01.AI и StepFun.",
    founded: { year: 2023, source: wiki("Baichuan", "Википедия: Baichuan") },
    headquarters: { text: "Пекин", source: wiki("Baichuan", "Википедия: Baichuan") },
    categories: ["llm"],
    models: [
      {
        name: "Baichuan",
        note: "Серия языковых моделей. Число параметров в карточках не приводится.",
        source: wiki("Baichuan", "Википедия: Baichuan"),
      },
    ],
    products: [
      {
        name: "Baichuan",
        note: "Сайт и доступ к моделям.",
        source: { url: "https://www.baichuan-ai.com/", label: "baichuan-ai.com" },
      },
    ],
    website: { url: "https://www.baichuan-ai.com/", label: "baichuan-ai.com" },
    status: "active",
  },
  {
    slug: "stepfun",
    nameEn: "StepFun",
    nameZh: "阶跃星辰",
    summary: "Шанхайская лаборатория мультимодальных моделей Step, включая язык, изображение и видео.",
    description:
      "StepFun (阶跃星辰) — шанхайская компания, основанная в апреле 2023 года выходцами из Microsoft, среди них Цзян Дасинь. Английская Википедия описывает линейку Step как мультимодальную: языковые модели, визуальные Step-1.5V и генерацию изображений Step-1X.",
    founded: { year: 2023, source: wiki("StepFun") },
    headquarters: { text: "Шанхай", source: wiki("StepFun") },
    categories: ["llm", "vision", "video"],
    models: [
      { name: "Step", note: "Языковая линейка, включая Step-2 и Step 3.", source: wiki("StepFun") },
      { name: "Step-1.5V", note: "Мультимодальная модель.", source: wiki("StepFun") },
      { name: "Step-1X", note: "Генерация изображений.", source: wiki("StepFun") },
    ],
    products: [
      {
        name: "StepFun",
        note: "Сайт лаборатории.",
        source: { url: "https://www.stepfun.com/", label: "stepfun.com" },
      },
    ],
    website: { url: "https://www.stepfun.com/", label: "stepfun.com" },
    status: "active",
  },
  {
    slug: "iflytek",
    nameEn: "iFlytek",
    nameZh: "科大讯飞",
    summary: "Хэфэйская компания речевых технологий. Большая модель называется Spark (讯飞星火).",
    description:
      "iFlytek выросла из речевой лаборатории Университета науки и технологий Китая и с 1999 года базируется в Хэфэе. Историческое ядро — распознавание и синтез речи. Языковая модель компании опубликована как 讯飞星火 на xinghuo.xfyun.cn.",
    founded: { year: 1999, source: wiki("IFLYTEK", "Википедия: iFlytek") },
    headquarters: { text: "Хэфэй", source: wiki("IFLYTEK", "Википедия: iFlytek") },
    categories: ["speech", "llm"],
    models: [
      {
        name: "Spark",
        note: "讯飞星火, большая языковая модель iFlytek.",
        source: { url: "https://xinghuo.xfyun.cn/", label: "Сайт 讯飞星火" },
      },
    ],
    products: [
      {
        name: "讯飞星火",
        note: "Чат и платформа модели Spark.",
        source: { url: "https://xinghuo.xfyun.cn/", label: "Сайт 讯飞星火" },
      },
      {
        name: "iFlytek",
        note: "Речевые продукты и корпоративный сайт.",
        source: { url: "https://www.iflytek.com/", label: "iflytek.com" },
      },
    ],
    website: { url: "https://www.iflytek.com/", label: "iflytek.com" },
    status: "active",
    notes: [
      {
        text: "Английская Википедия пишет, что правозащитные группы и власти США обвиняли компанию в причастности к массовой слежке. Каталог фиксирует это как публичное обвинение, а не как установленный судом факт.",
        source: wiki("IFLYTEK", "Википедия: iFlytek"),
      },
    ],
  },
  {
    slug: "sensetime",
    nameEn: "SenseTime",
    nameZh: "商汤科技",
    summary:
      "Китайская компания компьютерного зрения. По Википедии штаб-квартира зарегистрирована в Гонконге.",
    description:
      "SenseTime основана в октябре 2014 года и разрабатывает распознавание лиц и изображений, детектирование объектов, анализ видео и смежные системы. Английская Википедия указывает штаб-квартиру в Гонконгском научном парке, поэтому компания выходит за формальное правило «штаб в материковом Китае», но остаётся в справочнике как явно китайская лаборатория, которую нельзя опустить. Большие модели компания маркирует как SenseNova (日日新) на собственном сайте.",
    founded: { year: 2014, source: wiki("SenseTime") },
    headquarters: { text: "Гонконг", source: wiki("SenseTime") },
    categories: ["vision", "llm", "other"],
    models: [
      {
        name: "SenseNova",
        note: "日日新, модельное семейство на сайте SenseTime.",
        source: { url: "https://www.sensetime.com/", label: "Сайт SenseTime" },
      },
    ],
    products: [
      {
        name: "SenseTime",
        note: "Платформа компьютерного зрения и прикладных систем.",
        source: wiki("SenseTime"),
      },
    ],
    website: { url: "https://www.sensetime.com/", label: "sensetime.com" },
    status: "active",
    notes: [
      {
        text: "С 2019 года компания неоднократно попадала под санкции США из-за обвинений в использовании распознавания лиц для слежки. SenseTime обвинения отрицает. Каталог не разбирает спор по существу.",
        source: wiki("SenseTime"),
      },
    ],
  },
  {
    slug: "megvii",
    nameEn: "Megvii",
    nameZh: "旷视",
    summary: "Пекинская компания компьютерного зрения. Основная платформа — Face++.",
    description:
      "Megvii основана в Пекине в 2011 году и разрабатывает распознавание изображений и глубокое обучение для бизнеса и госсектора. Платформа Face++ запущена в 2012 году. Позже компания открыла фреймворк MegEngine. Это одна из лабораторий волны компьютерного зрения вместе с SenseTime, CloudWalk и Yitu.",
    founded: { year: 2011, source: wiki("Megvii") },
    headquarters: { text: "Пекин", source: wiki("Megvii") },
    categories: ["vision"],
    models: [
      {
        name: "Face++",
        note: "Платформа распознавания лиц и изображений.",
        source: wiki("Megvii"),
      },
      {
        name: "MegEngine",
        note: "Открытый фреймворк глубокого обучения.",
        source: wiki("Megvii"),
      },
    ],
    products: [
      {
        name: "Face++",
        source: { url: "https://www.megvii.com/", label: "megvii.com" },
      },
    ],
    website: { url: "https://www.megvii.com/", label: "megvii.com" },
    status: "active",
    notes: [
      {
        text: "В октябре 2019 года компания внесена в Entity List США. Википедия связывает это с обвинениями в использовании технологии против уйгуров.",
        source: wiki("Megvii"),
      },
    ],
  },
  {
    slug: "huawei",
    nameEn: "Huawei (Pangu)",
    nameZh: "华为",
    summary: "Шэньчжэньский производитель оборудования и облака. Большие модели называются Pangu (盘古).",
    description:
      "Huawei основана в Шэньчжэне в 1987 году. Помимо телеком-оборудования и потребительской электроники компания развивает облако. На Huawei Cloud опубликовано семейство моделей Pangu (盘古), ориентированное на отраслевые сценарии.",
    founded: { year: 1987, source: wiki("Huawei") },
    headquarters: { text: "Шэньчжэнь", source: wiki("Huawei") },
    categories: ["llm", "cloud", "chips"],
    models: [
      {
        name: "Pangu",
        note: "盘古, семейство моделей Huawei Cloud.",
        source: {
          url: "https://www.huaweicloud.com/product/pangu.html",
          label: "Huawei Cloud: Pangu",
        },
      },
    ],
    products: [
      {
        name: "Huawei Cloud Pangu",
        source: {
          url: "https://www.huaweicloud.com/product/pangu.html",
          label: "Huawei Cloud: Pangu",
        },
      },
      {
        name: "Ascend",
        note: "昇腾, вычислительная платформа для искусственного интеллекта.",
        source: { url: "https://www.hiascend.com/", label: "Сайт Ascend" },
      },
    ],
    website: { url: "https://www.huawei.com/", label: "huawei.com" },
    status: "active",
  },
  {
    slug: "kunlun",
    nameEn: "Kunlun Tech (Skywork)",
    nameZh: "昆仑万维",
    summary:
      "Пекинская группа, с 2022 года сместившая акцент на AGI. Модели и агент публикуются как Skywork и «Тяньгун».",
    description:
      "Куньлунь Ваньвэй основана в 2008 году и с 2015 года торгуется на бирже Шэньчжэня. На корпоративном сайте штаб указан в Пекине, район Дунчэн. С 2022 года компания описывает стратегию вокруг AGI и AIGC: семейство «Тяньгун» (Skywork), короткое видео SkyReels, музыку Mureka и агентную оболочку Skywork Super Agents.",
    founded: { year: 2008, source: { url: "https://www.kunlun.com/", label: "Сайт Kunlun" } },
    headquarters: { text: "Пекин", source: { url: "https://www.kunlun.com/", label: "Сайт Kunlun" } },
    categories: ["llm", "video", "speech", "other"],
    models: [
      {
        name: "Skywork",
        note: "天工, семейство моделей Kunlun.",
        source: { url: "https://www.kunlun.com/", label: "Сайт Kunlun" },
      },
    ],
    products: [
      {
        name: "天工",
        note: "Китайская витрина помощника.",
        source: { url: "https://www.tiangong.cn/", label: "tiangong.cn" },
      },
      {
        name: "SkyReels",
        note: "Платформа короткого видео, названная на сайте компании.",
        source: { url: "https://www.kunlun.com/", label: "Сайт Kunlun" },
      },
      {
        name: "Mureka",
        note: "Музыка и аудио.",
        source: { url: "https://www.kunlun.com/", label: "Сайт Kunlun" },
      },
    ],
    website: { url: "https://www.kunlun.com/", label: "kunlun.com" },
    status: "active",
  },
  {
    slug: "modelbest",
    nameEn: "ModelBest",
    nameZh: "面壁智能",
    summary: "Пекинская лаборатория с корнями в Цинхуа. Компактные модели публикуются как MiniCPM.",
    description:
      "ModelBest (面壁智能) — пекинская компания, которая по профилю LinkedIn основана в августе 2022 года и связана с исследовательской группой Цинхуа. Открытая линейка MiniCPM развивается вместе с сообществом OpenBMB. Сайт компании — modelbest.cn.",
    founded: {
      year: 2022,
      source: {
        url: "https://www.linkedin.com/company/modelbest",
        label: "LinkedIn: ModelBest",
      },
    },
    headquarters: {
      text: "Пекин",
      source: {
        url: "https://www.linkedin.com/company/modelbest",
        label: "LinkedIn: ModelBest",
      },
    },
    categories: ["llm", "vision"],
    models: [
      {
        name: "MiniCPM",
        note: "Компактные мультимодальные модели OpenBMB и ModelBest.",
        source: {
          url: "https://github.com/OpenBMB/MiniCPM",
          label: "GitHub: MiniCPM",
        },
      },
    ],
    products: [
      {
        name: "ModelBest",
        source: { url: "https://modelbest.cn/", label: "modelbest.cn" },
      },
    ],
    website: { url: "https://modelbest.cn/", label: "modelbest.cn" },
    status: "active",
  },
  {
    slug: "qihoo-360",
    nameEn: "Qihoo 360 (Zhinao)",
    nameZh: "三六零",
    summary: "Пекинская компания кибербезопасности. Собственная большая модель называется 360 Zhinao (智脑).",
    description:
      "360 Security Technology, известная как Qihoo 360, основана в Пекине в 2005 году Чжоу Хунъи и Ци Сяндуном. Основной бизнес — защита и браузер. В 2023 году компания открыла для пользователей модель «360 Чжинао». Позже публично показывала и инструменты ИИ для поиска уязвимостей.",
    founded: { year: 2005, source: wiki("Qihoo_360", "Википедия: Qihoo 360") },
    headquarters: { text: "Пекин", source: wiki("Qihoo_360", "Википедия: Qihoo 360") },
    categories: ["llm", "other"],
    models: [
      {
        name: "360 Zhinao",
        note: "360智脑.",
        source: {
          url: "https://www.aigcdaily.cn/news/a23m7lnka942o7w/",
          label: "Сообщение о допуске моделей, 2023",
        },
      },
    ],
    products: [
      {
        name: "360",
        note: "Антивирус, браузер и портал.",
        source: wiki("Qihoo_360", "Википедия: Qihoo 360"),
      },
    ],
    website: { url: "https://www.360.cn/", label: "360.cn" },
    status: "active",
    notes: [
      {
        text: "В мае 2020 года компания внесена в Entity List США. Википедия излагает американскую мотивировку как претензии, связанные с наблюдением.",
        source: wiki("Qihoo_360", "Википедия: Qihoo 360"),
      },
    ],
  },
  {
    slug: "kuaishou",
    nameEn: "Kuaishou (Kling)",
    nameZh: "快手",
    summary: "Пекинская платформа коротких видео. Генеративная модель называется Kling (可灵).",
    description:
      "Kuaishou основана в Пекине в 2011 году и развивает короткое видео, прямые эфиры и связанную коммерцию. Генеративная модель компании называется Kling, публичная витрина открыта на klingai.com.",
    founded: { year: 2011, source: wiki("Kuaishou") },
    headquarters: { text: "Пекин", source: wiki("Kuaishou") },
    categories: ["video", "vision"],
    models: [
      {
        name: "Kling",
        note: "可灵, генерация видео.",
        source: wiki("Kuaishou"),
      },
    ],
    products: [
      {
        name: "Kling AI",
        source: { url: "https://klingai.com/", label: "klingai.com" },
      },
      {
        name: "Kuaishou",
        note: "Приложение коротких видео. За пределами Китая известно как Kwai.",
        source: wiki("Kuaishou"),
      },
    ],
    website: { url: "https://www.kuaishou.com/", label: "kuaishou.com" },
    status: "active",
  },
  {
    slug: "shengshu",
    nameEn: "Shengshu (Vidu)",
    nameZh: "生数科技",
    summary: "Пекинская команда генеративного видео. Публичный продукт — Vidu.",
    description:
      "Пекинская 生数科技, по карточке OpenI, основана в марте 2023 года. Ядро команды каталог OpenI связывает с Институтом искусственного интеллекта Университета Цинхуа. Компания делает мультимодальные генеративные модели. Потребительская и партнёрская витрина видео — Vidu на vidu.com.",
    founded: {
      year: 2023,
      source: { url: "https://openi.cn/sites/140165.html", label: "OpenI: 生数科技" },
    },
    headquarters: {
      text: "Пекин",
      source: { url: "https://openi.cn/sites/140165.html", label: "OpenI: 生数科技" },
    },
    categories: ["video", "vision"],
    models: [
      {
        name: "Vidu",
        note: "Модель и сервис генерации видео.",
        source: { url: "https://www.vidu.com/", label: "vidu.com" },
      },
    ],
    products: [
      {
        name: "Vidu",
        source: { url: "https://www.vidu.com/", label: "vidu.com" },
      },
    ],
    website: { url: "https://www.vidu.com/", label: "vidu.com" },
    status: "active",
  },
  {
    slug: "cambricon",
    nameEn: "Cambricon",
    nameZh: "寒武纪",
    summary: "Пекинский разработчик процессоров для искусственного интеллекта, вышедший из Академии наук.",
    description:
      "Cambricon проектирует процессоры и ускорители для задач искусственного интеллекта. Компания выделена в самостоятельный бизнес в марте 2016 года из одноимённого проекта Академии наук Китая. Штаб-квартира в Пекине, акции торгуются на STAR Market Шанхайской биржи.",
    founded: { year: 2016, source: wiki("Cambricon", "Википедия: Cambricon") },
    headquarters: { text: "Пекин", source: wiki("Cambricon", "Википедия: Cambricon") },
    categories: ["chips"],
    models: [],
    products: [
      {
        name: "Cambricon",
        note: "Процессоры для обучения и вывода моделей.",
        source: wiki("Cambricon", "Википедия: Cambricon"),
      },
    ],
    website: { url: "https://www.cambricon.com/", label: "cambricon.com" },
    status: "active",
    notes: [
      {
        text: "В декабре 2022 года компания внесена в Entity List США.",
        source: wiki("Cambricon", "Википедия: Cambricon"),
      },
    ],
  },
  {
    slug: "horizon-robotics",
    nameEn: "Horizon Robotics",
    nameZh: "地平线",
    summary: "Пекинский разработчик автомобильных чипов для помощи водителю и автономного вождения.",
    description:
      "Horizon Robotics основана в Пекине в июле 2015 года, среди основателей — Юй Кай, ранее руководивший направлением беспилотных автомобилей в Baidu. Компания проектирует процессоры для автомобилей. Акции торгуются в Гонконге. Рабочий сайт бренда — horizon.auto.",
    founded: { year: 2015, source: wiki("Horizon_Robotics", "Википедия: Horizon Robotics") },
    headquarters: {
      text: "Пекин",
      source: wiki("Horizon_Robotics", "Википедия: Horizon Robotics"),
    },
    categories: ["chips", "other"],
    models: [],
    products: [
      {
        name: "Horizon",
        note: "Автомобильные вычислительные платформы.",
        source: { url: "https://www.horizon.auto/", label: "horizon.auto" },
      },
    ],
    website: { url: "https://www.horizon.auto/", label: "horizon.auto" },
    status: "active",
  },
  {
    slug: "moore-threads",
    nameEn: "Moore Threads",
    nameZh: "摩尔线程",
    summary: "Пекинский разработчик графических процессоров, основанный бывшим руководителем Nvidia в Китае.",
    description:
      "Moore Threads основана в Пекине в октябре 2020 года Чжан Цзяньчжуном. Компания проектирует GPU для настольных систем и серверов под архитектурой MUSA. Английская Википедия относит к первым продуктам ускорители MTT. В декабре 2025 года компания вышла на Шанхайскую биржу.",
    founded: { year: 2020, source: wiki("Moore_Threads", "Википедия: Moore Threads") },
    headquarters: { text: "Пекин", source: wiki("Moore_Threads", "Википедия: Moore Threads") },
    categories: ["chips"],
    models: [],
    products: [
      {
        name: "MTT",
        note: "Линейка графических процессоров.",
        source: wiki("Moore_Threads", "Википедия: Moore Threads"),
      },
    ],
    website: { url: "https://www.mthreads.com/", label: "mthreads.com" },
    status: "active",
    notes: [
      {
        text: "В октябре 2023 года компания внесена в Entity List США.",
        source: wiki("Moore_Threads", "Википедия: Moore Threads"),
      },
    ],
  },
  {
    slug: "biren",
    nameEn: "Biren Technology",
    nameZh: "壁仞科技",
    summary: "Шанхайский разработчик ускорителей общего назначения для ИИ и высокопроизводительных вычислений.",
    description:
      "Biren Technology — шанхайская бесфабричная компания, основанная в 2019 году выходцами из Nvidia, Alibaba и STMicroelectronics. Английская Википедия называет ускорители BR100 и BR104, рассчитанные на искусственный интеллект и HPC.",
    founded: { year: 2019, source: wiki("Biren_Technology", "Википедия: Biren") },
    headquarters: { text: "Шанхай", source: wiki("Biren_Technology", "Википедия: Biren") },
    categories: ["chips"],
    models: [],
    products: [
      {
        name: "BR100",
        source: wiki("Biren_Technology", "Википедия: Biren"),
      },
      {
        name: "BR104",
        source: wiki("Biren_Technology", "Википедия: Biren"),
      },
    ],
    website: { url: "https://www.birentech.com/", label: "birentech.com" },
    status: "active",
    notes: [
      {
        text: "Википедия указывает, что компания находится под санкциями США, связанными с контролем над передовыми чипами.",
        source: wiki("Biren_Technology", "Википедия: Biren"),
      },
    ],
  },
  {
    slug: "enflame",
    nameEn: "Enflame",
    nameZh: "燧原科技",
    summary: "Шанхайский разработчик ускорителей для облачного искусственного интеллекта.",
    description:
      "Enflame (燧原科技) основана в Шанхае в марте 2018 года и разрабатывает ускорители общего назначения для облачных и ИИ-нагрузок. Английская Википедия описывает компанию как китайского разработчика таких чипов.",
    founded: { year: 2018, source: wiki("Enflame") },
    headquarters: { text: "Шанхай", source: wiki("Enflame") },
    categories: ["chips", "cloud"],
    models: [],
    products: [
      {
        name: "Enflame",
        note: "Ускорители для облачного вывода и обучения.",
        source: wiki("Enflame"),
      },
    ],
    website: { url: "https://www.enflame-tech.com/", label: "enflame-tech.com" },
    status: "active",
  },
  {
    slug: "unitree",
    nameEn: "Unitree",
    nameZh: "宇树科技",
    summary: "Ханчжоуский производитель четвероногих и человекоподобных роботов.",
    description:
      "Unitree (宇树) основана Ван Синсином в Ханчжоу в августе 2016 года. Компания начинала с потребительских и промышленных четвероногих роботов, затем добавила человекоподобные платформы. Английская Википедия и собственный сайт описывают её как производителя шагающих роботов.",
    founded: { year: 2016, source: wiki("Unitree_Robotics", "Википедия: Unitree") },
    headquarters: { text: "Ханчжоу", source: wiki("Unitree_Robotics", "Википедия: Unitree") },
    categories: ["robotics"],
    models: [],
    products: [
      {
        name: "Unitree",
        note: "Четвероногие и человекоподобные роботы.",
        source: { url: "https://www.unitree.com/", label: "unitree.com" },
      },
    ],
    website: { url: "https://www.unitree.com/", label: "unitree.com" },
    status: "active",
  },
  {
    slug: "ubtech",
    nameEn: "UBTECH",
    nameZh: "优必选",
    summary: "Шэньчжэньский производитель человекоподобных и сервисных роботов.",
    description:
      "UBTECH основана в Китае в марте 2012 года, штаб-квартира в Шэньчжэне. Компания выпускает человекоподобных и сервисных роботов для образования, сервиса и промышленности. Акции торгуются в Гонконге.",
    founded: { year: 2012, source: wiki("UBtech_Robotics", "Википедия: UBTECH") },
    headquarters: { text: "Шэньчжэнь", source: wiki("UBtech_Robotics", "Википедия: UBTECH") },
    categories: ["robotics"],
    models: [],
    products: [
      {
        name: "UBTECH",
        note: "Человекоподобные и сервисные роботы.",
        source: { url: "https://www.ubtrobot.com/", label: "ubtrobot.com" },
      },
    ],
    website: { url: "https://www.ubtrobot.com/", label: "ubtrobot.com" },
    status: "active",
  },
  {
    slug: "agibot",
    nameEn: "AgiBot",
    nameZh: "智元机器人",
    summary: "Шанхайская компания воплощённого интеллекта: роботы, алгоритмы и собственная операционная среда.",
    description:
      "AgiBot (智元创新) на странице о компании описывает себя как фирму воплощённого интеллекта. Юридическое имя на английской витрине — AGIBOT Innovation (Shanghai) Technology. В китайской хронике названы человекоподобный робот «Юаньчжэн», серия «Линси» и операционная система «Линцюй». Год регистрации в проверенном тексте не выделен отдельной датой, поэтому в карточке его нет.",
    headquarters: {
      text: "Шанхай",
      source: { url: "https://www.agibot.com/about", label: "AgiBot: о компании" },
    },
    categories: ["robotics"],
    models: [],
    products: [
      {
        name: "远征",
        note: "Линейка человекоподобных роботов, названная на сайте.",
        source: {
          url: "https://www.agibot.com.cn/company/profile",
          label: "AgiBot: хроника компании",
        },
      },
      {
        name: "灵渠 OS",
        note: "Операционная система воплощённого интеллекта.",
        source: {
          url: "https://www.agibot.com.cn/company/profile",
          label: "AgiBot: хроника компании",
        },
      },
    ],
    website: { url: "https://www.agibot.com/", label: "agibot.com" },
    status: "active",
  },
  {
    slug: "fourier",
    nameEn: "Fourier",
    nameZh: "傅利叶",
    summary: "Шанхайская компания, которая начинала с реабилитационных роботов и делает человекоподобные платформы.",
    description:
      "Fourier (傅利叶) — шанхайская робототехническая компания, основанная в 2015 году. Английская Википедия описывает исходный фокус как реабилитационную робототехнику и последующий выход к человекоподобным роботам. Сайт — fftai.cn.",
    founded: { year: 2015, source: wiki("Fourier_(company)", "Википедия: Fourier") },
    headquarters: { text: "Шанхай", source: wiki("Fourier_(company)", "Википедия: Fourier") },
    categories: ["robotics"],
    models: [],
    products: [
      {
        name: "Fourier",
        note: "Реабилитационные и человекоподобные роботы.",
        source: { url: "https://www.fftai.cn/", label: "fftai.cn" },
      },
    ],
    website: { url: "https://www.fftai.cn/", label: "fftai.cn" },
    status: "active",
  },
  {
    slug: "cloudwalk",
    nameEn: "CloudWalk",
    nameZh: "云从科技",
    summary: "Гуанчжоуская компания распознавания лиц. Позже выпустила языковую модель Comfort.",
    description:
      "CloudWalk основана в Гуанчжоу в 2015 году Чжоу Си и занимается распознаванием лиц. Компания торгуется на STAR Market. Английская Википедия также называет языковую модель Comfort, поэтому профиль шире классического компьютерного зрения.",
    founded: { year: 2015, source: wiki("CloudWalk_Technology", "Википедия: CloudWalk") },
    headquarters: {
      text: "Гуанчжоу",
      source: wiki("CloudWalk_Technology", "Википедия: CloudWalk"),
    },
    categories: ["vision", "llm"],
    models: [
      {
        name: "Comfort",
        note: "Языковая модель, упомянутая в Википедии.",
        source: wiki("CloudWalk_Technology", "Википедия: CloudWalk"),
      },
    ],
    products: [
      {
        name: "CloudWalk",
        note: "Системы распознавания лиц для банков и городских сценариев.",
        source: wiki("CloudWalk_Technology", "Википедия: CloudWalk"),
      },
    ],
    website: { url: "https://www.cloudwalk.cn/", label: "cloudwalk.cn" },
    status: "active",
    notes: [
      {
        text: "В мае 2020 года компания внесена в Entity List США. Википедия связывает это с обвинениями в участии в слежке в Синьцзяне.",
        source: wiki("CloudWalk_Technology", "Википедия: CloudWalk"),
      },
    ],
  },
  {
    slug: "yitu",
    nameEn: "Yitu",
    nameZh: "依图科技",
    summary: "Шанхайская компания распознавания лиц. Программная марка, описанная в Википедии, — Dragonfly Eye.",
    description:
      "Yitu основана в Шанхае в 2012 году Лео Чжу и Линь Чэньси. Английская Википедия описывает системы распознавания лиц и марку Dragonfly Eye, которую использовали бюро общественной безопасности. Свежих модельных релизов в источниках этой карточки нет, поэтому языковые модели не указаны.",
    founded: { year: 2012, source: wiki("Yitu_Technology", "Википедия: Yitu") },
    headquarters: { text: "Шанхай", source: wiki("Yitu_Technology", "Википедия: Yitu") },
    categories: ["vision"],
    models: [],
    products: [
      {
        name: "Dragonfly Eye",
        note: "Система распознавания, описанная в Википедии.",
        source: wiki("Yitu_Technology", "Википедия: Yitu"),
      },
    ],
    website: { url: "https://www.yitutech.com/", label: "yitutech.com" },
    status: "active",
  },
  {
    slug: "4paradigm",
    nameEn: "4Paradigm",
    nameZh: "第四范式",
    summary: "Пекинская компания корпоративного искусственного интеллекта и платформ для предприятий.",
    description:
      "4Paradigm основана в Пекине в сентябре 2014 года и поставляет предприятиям платформы и приложения искусственного интеллекта. Компания торгуется в Гонконге. На странице «о компании» среди продуктов названы платформа трансформации и мультимодальная модель SageGPT (式说).",
    founded: { year: 2014, source: wiki("4Paradigm") },
    headquarters: { text: "Пекин", source: wiki("4Paradigm") },
    categories: ["llm", "other"],
    models: [
      {
        name: "SageGPT",
        note: "式说, мультимодальная модель, названная на сайте компании.",
        source: {
          url: "https://www.4paradigm.com/about/index.html",
          label: "4Paradigm: о компании",
        },
      },
    ],
    products: [
      {
        name: "4Paradigm Sage",
        note: "Корпоративная платформа и магазин приложений.",
        source: {
          url: "https://www.4paradigm.com/about/index.html",
          label: "4Paradigm: о компании",
        },
      },
    ],
    website: { url: "https://www.4paradigm.com/", label: "4paradigm.com" },
    status: "active",
  },
  {
    slug: "mobvoi",
    nameEn: "Mobvoi",
    nameZh: "出门问问",
    summary: "Пекинская компания распознавания речи, поиска и носимой электроники.",
    description:
      "Mobvoi (出门问问) основана в Пекине в октябре 2012 года. Английская Википедия описывает собственные распознавание китайской речи, обработку языка и вертикальный поиск, а также потребительскую электронику. Компания ближе к речевым продуктам, чем к лабораториям общих моделей 2023 года.",
    founded: { year: 2012, source: wiki("Mobvoi") },
    headquarters: { text: "Пекин", source: wiki("Mobvoi") },
    categories: ["speech", "other"],
    models: [],
    products: [
      {
        name: "Mobvoi",
        note: "Речевые технологии и носимые устройства.",
        source: { url: "https://www.mobvoi.com/", label: "mobvoi.com" },
      },
    ],
    website: { url: "https://www.mobvoi.com/", label: "mobvoi.com" },
    status: "active",
  },
  {
    slug: "meituan",
    nameEn: "Meituan (LongCat)",
    nameZh: "美团",
    summary: "Пекинская платформа локальных сервисов. Открытые модели публикует под маркой LongCat.",
    description:
      "Meituan основана в Пекине в 2010 году Ван Сином и известна доставкой и локальными сервисами. Отдельная команда публикует семейство LongCat: языковые, видео- и графические модели. Официальный сайт моделей — longcat.ai, веса и код лежат в организации GitHub meituan-longcat. Корпоративное сообщение Meituan подтверждает, что LongCat-2.0 выпущен самой компанией.",
    founded: { year: 2010, source: wiki("Meituan") },
    headquarters: { text: "Пекин", source: wiki("Meituan") },
    categories: ["llm", "video", "vision", "other"],
    models: [
      {
        name: "LongCat",
        note: "Семейство языковых и мультимодальных моделей Meituan.",
        source: { url: "https://longcat.ai/", label: "longcat.ai" },
      },
    ],
    products: [
      {
        name: "LongCat",
        note: "Сайт и API моделей.",
        source: { url: "https://longcat.ai/", label: "longcat.ai" },
      },
      {
        name: "Meituan",
        note: "Платформа локальных сервисов.",
        source: { url: "https://www.meituan.com/", label: "meituan.com" },
      },
    ],
    website: { url: "https://www.meituan.com/", label: "meituan.com" },
    status: "active",
    notes: [
      {
        text: "Новость на сайте Meituan прямо связывает открытие LongCat-2.0 с компанией. Число параметров каталог не повторяет.",
        source: {
          url: "https://www.meituan.com/news/NN260706216009547",
          label: "Meituan: новость о LongCat",
        },
      },
    ],
  },
  {
    slug: "pony-ai",
    nameEn: "Pony.ai",
    nameZh: "小马智行",
    summary: "Компания автономного вождения. По Википедии на 2025 год штаб-квартира указана в Гуанчжоу.",
    description:
      "Pony.ai разрабатывает технологию автономных автомобилей. Компания основана в декабре 2016 года. Английская Википедия отмечает присутствие в Кремниевой долине, Пекине и Гуанчжоу и указывает Гуанчжоу как штаб-квартиру по состоянию на 2025 год.",
    founded: { year: 2016, source: wiki("Pony.ai") },
    headquarters: { text: "Гуанчжоу", source: wiki("Pony.ai") },
    categories: ["other", "vision", "robotics"],
    models: [],
    products: [
      {
        name: "Pony.ai",
        note: "Стек автономного вождения и роботакси.",
        source: { url: "https://www.pony.ai/", label: "pony.ai" },
      },
    ],
    website: { url: "https://www.pony.ai/", label: "pony.ai" },
    status: "active",
  },
  {
    slug: "weride",
    nameEn: "WeRide",
    nameZh: "文远知行",
    summary: "Гуанчжоуская компания автономного вождения.",
    description:
      "WeRide (文远知行) — компания автономного вождения со штаб-квартирой в Гуанчжоу, основанная в 2017 году. Английская Википедия описывает развёртывание беспилотных сервисов. Карточка не повторяет перечень стран и разрешения: они меняются быстрее, чем устроен справочник.",
    founded: { year: 2017, source: wiki("WeRide") },
    headquarters: { text: "Гуанчжоу", source: wiki("WeRide") },
    categories: ["other", "vision", "robotics"],
    models: [],
    products: [
      {
        name: "WeRide",
        note: "Автономные автомобили и сопутствующие сервисы.",
        source: { url: "https://www.weride.ai/", label: "weride.ai" },
      },
    ],
    website: { url: "https://www.weride.ai/", label: "weride.ai" },
    status: "active",
  },
  {
    slug: "inspur",
    nameEn: "Inspur",
    nameZh: "浪潮",
    summary: "Цзинаньская группа серверов, облака и корпоративного программного обеспечения, включая направление ИИ.",
    description:
      "Inspur — китайский конгломерат информационных технологий из Цзинаня, существующий с 1983 года. Английская Википедия относит к продуктам облако, серверы, хранение и искусственный интеллект. Отдельную публичную модель в этой карточке нет оснований называть: проверенный источник описывает направление, а не конкретный релиз.",
    founded: { year: 1983, source: wiki("Inspur") },
    headquarters: { text: "Цзинань", source: wiki("Inspur") },
    categories: ["cloud", "other"],
    models: [],
    products: [
      {
        name: "Inspur",
        note: "Серверы, облако и корпоративные системы.",
        source: wiki("Inspur"),
      },
    ],
    website: { url: "https://www.inspur.com/", label: "inspur.com" },
    status: "active",
  },
];

const slugs = new Set<string>();
for (const company of companies) {
  if (slugs.has(company.slug)) {
    throw new Error(`Повторяющийся slug: ${company.slug}`);
  }
  slugs.add(company.slug);
}

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}

export function companiesByName(): Company[] {
  return [...companies].sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"));
}

export function collectSources(company: Company): SourceRef[] {
  const found: SourceRef[] = [];
  const push = (source?: SourceRef) => {
    if (!source) return;
    if (!found.some((item) => item.url === source.url)) found.push(source);
  };

  push(company.founded?.source);
  push(company.headquarters.source);
  push(company.website);
  for (const item of company.models) push(item.source);
  for (const item of company.products) push(item.source);
  for (const note of company.notes ?? []) push(note.source);
  return found;
}
