<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\GManage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::transaction(function () {

            Group::insert([
                [
                    'group_name' => 'eggnam',
                    'created_by' => 1,
                    'category_id' => 5,
                    'people_limit' => 500,
                    'header_path' => '/storage/images/groupHeader/5c4b4987c6.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => 'あなたの好きなプリは何？私は97%!新しく入ってきたmy parettもうるみ盛れで最高!みんなでプリを撮ってポーズとかを共有しよう。',
                ]
            ]);

            GManage::insert([
                ['group_id' => 1, 'user_id' => 1],
                ['group_id' => 1, 'user_id' => 2],
                ['group_id' => 1, 'user_id' => 3],
                ['group_id' => 1, 'user_id' => 4],
                ['group_id' => 1, 'user_id' => 8],
            ]);

            Group::insert([
                [
                    'group_name' => 'ワンピカード＊サークル',
                    'created_by' => 3,
                    'category_id' => 1,
                    'people_limit' => 20,
                    'header_path' => '/storage/images/groupHeader/mv_01.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => 'みんなでワンピカードをプレイしていろんなデッキと対決しよう！ちなみにぼくは赤緑ローのリーパラで華麗にシャンブルズ!みんなはどう戦う!?',
                ]
            ]);

            GManage::create([
                'group_id' => 2,
                'user_id' => 3
            ]);
            GManage::insert([
                ['group_id' => 2, 'user_id' => 1],
                ['group_id' => 2, 'user_id' => 2],
                ['group_id' => 2, 'user_id' => 5],
                ['group_id' => 2, 'user_id' => 4],
            ]);

            Group::insert([
                [
                    'group_name' => '邦ロック同好会',
                    'created_by' => 2,
                    'category_id' => 8,
                    'people_limit' => 850,
                    'header_path' => '/storage/images/groupHeader/ss-hourock-670x372.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => '邦ロックをみんなで聞いて楽しんじゃおー!マイナーなバンドから有名なバンドまで個々のファンと繋がろう。同担拒否？推しはみんなのもの!'
                ]
            ]);
            GManage::create([
                'group_id' => 3,
                'user_id' => 2
            ]);

            GManage::insert([
                ['group_id' => 3, 'user_id' => 1],
                ['group_id' => 3, 'user_id' => 8],
                ['group_id' => 3, 'user_id' => 5],
                ['group_id' => 3, 'user_id' => 4],
            ]);
            Group::insert([
                [
                    'group_name' => 'キャンプサークル',
                    'created_by' => 4,
                    'category_id' => 6,
                    'people_limit' => 110,
                    'header_path' => '/storage/images/groupHeader/tegan-mierle-fDostElVhN8-unsplash.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => '初心者歓迎！キャンプの名所をみんなで教えあっていろんなとこでキャンプしよう。主のお気には琵琶湖でキャンプ!'
                ]
            ]);

            GManage::create([
                'group_id' => 4,
                'user_id' => 4
            ]);

            GManage::insert([
                ['group_id' => 4, 'user_id' => 1],
                ['group_id' => 4, 'user_id' => 8],
                ['group_id' => 4, 'user_id' => 5],
                ['group_id' => 3, 'user_id' => 6],
            ]);

            Group::insert([
                [
                    'group_name' => 'ガジェットマニア集まれ！',
                    'created_by' => 5,
                    'category_id' => 7,
                    'people_limit' => 30,
                    'header_path' => '/storage/images/groupHeader/609b72b788f580d255704640cb2cc68a0a5d3bd0.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => 'いろんなコンパクトガジェット,新作ガジェット共有しよー、新商品発表イベントにも参戦しようぜ!俺はAnker信者!'
                ]
            ]);

            GManage::create([
                'group_id' => 5,
                'user_id' => 5
            ]);

            GManage::insert([
                ['group_id' => 5, 'user_id' => 1],
                ['group_id' => 5, 'user_id' => 8],
                ['group_id' => 5, 'user_id' => 9],
                ['group_id' => 5, 'user_id' => 6],
            ]);

            Group::insert([
                [
                    'group_name' => 'ジブリだいちゅき',
                    'created_by' => 6,
                    'category_id' => 8,
                    'people_limit' => 100,
                    'header_path' => '/storage/images/groupHeader/GHIBLI.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => '私たちの家は、ジブリ村。にわかの人でも大歓迎 、'
                ]
            ]);

            GManage::create([
                'group_id' => 6,
                'user_id' => 6
            ]);

            GManage::insert([
                ['group_id' => 6, 'user_id' => 1],
                ['group_id' => 6, 'user_id' => 8],
                ['group_id' => 6, 'user_id' => 9],
                ['group_id' => 6, 'user_id' => 7],
            ]);
            Group::insert([
                [
                    'group_name' => 'オカルト同好会',
                    'created_by' => 7,
                    'category_id' => 8,
                    'people_limit' => 930,
                    'header_path' => '/storage/images/groupHeader/okaruto.jpg',
                    'prefecture' => 'Osaka,Japan',
                    'desc' => 'この世の陰謀を世間に広めるのが我々の務め。何が真実で何が嘘なのか、信じるのはあなた次第です。'
                ]
            ]);

            GManage::create([
                'group_id' => 7,
                'user_id' => 7
            ]);

            GManage::insert([
                ['group_id' => 7, 'user_id' => 1],
                ['group_id' => 7, 'user_id' => 8],
                ['group_id' => 7, 'user_id' => 9],
                ['group_id' => 7, 'user_id' => 6],
            ]);
        });
    }
}
