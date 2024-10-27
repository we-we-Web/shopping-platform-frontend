const product = 
    {
        title: '斜跨包',
        categories: 'bag',
        description: ' 【ARC\'TERYX / アークテリクス】\nカナダのアウトドアブランド。ブランド名は、恐竜と鳥類をつなぐ始祖鳥、アーキオプテリクス・リトグラフィカに由来。進化を加速することで、アウトドアにおける人間の進歩の推進に役立つということを象徴している。始祖鳥は、アークテリクスのブランドロゴにもなっている。\n高性能の登山者用ウェアを発売し、人気となる。素材にゴアテックスなど、機能性の高いものを使用。クライミングに特化したウェアや、ハイキングアイテム、スキーウェア、トレイルランニングウェアなど、それぞれのアクティビティに対応したアイテムを揃える。都会的なデザインによってアウトドア用ではなく、ファッションとしてもアークテリクスのウェアやバッグ、アクセサリーなどが人気。',
        price: 8470,
        image: 'https://images.daytona-park.com/items/original/1063044900196/1063044900196-_16.jpg'
    };

export default function detailProduct(){
    return (
        <div className="flex h-[100%] w-[100%] items-center pt-[10vh]">
            <div className="flex-col basis-1/2 pl-[15vw]">
                <img src={product.image} className="h-[70vh] rounded-lg"/>
            </div>
            <div className="flex-col basis-1/2 pr-[10vw]">
                <h1 className="text-[4em] font-bold">{product.title}</h1>
                <div className="text-[3em] text-red-700 font-bold">{product.price} <span className="text-[0.5em]">yen</span> </div>
                <div>{product.description}</div>
                <button className="bg-red-700 w-[10em] h-[2em] text-white mt-[5em] ml-[3em] hover:opacity-60">add to cart</button>
            </div>
        </div>
    );
}