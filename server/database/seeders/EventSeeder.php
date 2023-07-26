<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EManage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\DBAL\TimestampType;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            Event::insert([
                [
                    'event_name' => 'FFFF:FFFF:FFFF:FFFF',
                    'prefecture' => 'Tokyo',
                    'address' => 'Ginza Tenryu, 銀座2-5-19, Tokyo, Tokyo Prefecture 104-0061, Japan',
                    'lng' => 139.7099450000,
                    'lat' => 35.7308460000,
                    'created_by' => 1,
                    'group_id' => 2,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/ffff.jpeg',
                    'desc' => '毎年激戦のIPアドレス計算大会！何十人の超っ戦車に立ちはだかるのは、8年連続チャンピョン「」',
                    'date' => '2023-08-30',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',

                ]
            ]);

            EManage::insert(
                [
                    ['group_id' => 2, 'user_id' => 1, 'event_id' => 1],
                    ['group_id' => 2, 'user_id' => 2, 'event_id' => 1],
                    ['group_id' => 2, 'user_id' => 3, 'event_id' => 1],
                    ['group_id' => 2, 'user_id' => 4, 'event_id' => 1],
                    ['group_id' => 2, 'user_id' => 8, 'event_id' => 1],
                ]
            );

            Event::insert([
                [
                    'event_name' => 'プリ撮り放題！！',
                    'prefecture' => 'Osaka',
                    'address' => '大阪府吹田市',
                    'lng' => 135.51735,
                    'lat' => 34.764884,
                    'created_by' => 4,
                    'group_id' => 1,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/puriga.jpg',
                    'desc' => '当社のURLにアクセスしてキャンペーンに参加!参加してくれたら全員にカラコン割引券プレゼント!!しかし目玉は一日プリおり放題券？！他にもいろいろなうれしい特典ご用意しています!',
                    'date' => '2023-09-25',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',

                ]
            ]);

            EManage::insert(
                [
                    ['group_id' => 1, 'user_id' => 4, 'event_id' => 2],
                    ['group_id' => 1, 'user_id' => 2, 'event_id' => 2],
                    ['group_id' => 1, 'user_id' => 3, 'event_id' => 2],
                    ['group_id' => 1, 'user_id' => 1, 'event_id' => 2],
                    ['group_id' => 1, 'user_id' => 8, 'event_id' => 2],
                ]
            );


            Event::insert([
                [
                    'event_name' => 'Anker新商品発表会だってよ!!',
                    'prefecture' => 'Kanagawa',
                    'address' => 'Kanagawa Yokohama',
                    'lng' => 139.6318,
                    'lat' => 35.4758,
                    'created_by' => 5,
                    'group_id' => 5,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/anker.jpg',
                    'desc' => 'コスパ良き、性能良きなAnkerが新商品発表するって!行くやつは、なんやかんや手続きしなあかんから管理者である私に連絡してくれよな,,
                    でも応募者多かったら抽選するからよろしく!!',
                    'date' => '2023-08-30',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',

                ]
            ]);
            EManage::insert(
                [
                    ['group_id' => 5, 'user_id' => 5, 'event_id' => 3],
                    ['group_id' => 5, 'user_id' => 2, 'event_id' => 3],
                    ['group_id' => 5, 'user_id' => 3, 'event_id' => 3],
                    ['group_id' => 5, 'user_id' => 4, 'event_id' => 3],
                    ['group_id' => 5, 'user_id' => 8, 'event_id' => 3],
                ]
            );
            Event::insert([
                [
                    'event_name' => 'プリ撮り放題！！',
                    'prefecture' => 'Osaka',
                    'address' => 'HEP FIVE Ferris Wheel, 北区角田町5-15, Osaka-shi, Osaka 530-0017, Japan',
                    'lng' => 135.500107,
                    'lat' => 34.703989,
                    'created_by' => 4,
                    'group_id' => 1,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/puriga.jpg',
                    'desc' => '当社のURLにアクセスしてキャンペーンに参加!参加してくれたら全員にカラコン割引券プレゼント!!しかし目玉は一日プリおり放題券？！他にもいろいろなうれしい特典ご用意しています!',
                    'date' => '2023-09-25',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',

                ]
            ]);

            EManage::insert(
                [
                    ['group_id' => 2, 'user_id' => 2, 'event_id' => 4],
                    ['group_id' => 2, 'user_id' => 3, 'event_id' => 4],
                    ['group_id' => 2, 'user_id' => 5, 'event_id' => 4],
                    ['group_id' => 2, 'user_id' => 8, 'event_id' => 4],
                ]
            );

            Event::insert([
                [
                    'event_name' => '淀川花火大会',
                    'prefecture' => 'Osaka',
                    'address' => 'Yodogawa Station, 福島区海老江8-17-13, Osaka-shi, Osaka 553-0001, Japan',
                    'lng' => 135.465079,
                    'lat' => 34.6962955,
                    'created_by' => 5,
                    'group_id' => 5,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/osaka-yodogawa-fireworks-218191.jpg',
                    'desc' => '花火大会一覧視たいよね？',
                    'date' => '2023-08-10',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',

                ]
            ]);

            EManage::insert(
                [
                    ['group_id' => 2, 'user_id' => 5, 'event_id' => 5],
                    ['group_id' => 2, 'user_id' => 2, 'event_id' => 5],
                    ['group_id' => 2, 'user_id' => 3, 'event_id' => 5],
                    ['group_id' => 2, 'user_id' => 4, 'event_id' => 5],
                    ['group_id' => 2, 'user_id' => 8, 'event_id' => 5],
                ]
            );

            Event::insert([
                [
                    'event_name' => '隅田川花火大会',
                    'prefecture' => 'Tokyo',
                    'address' => 'Asakusa-jinja Shrine, 浅草2-3-1, Tokyo, Tokyo Prefecture 111-0032, Japan',
                    'lng' => 139.797492,
                    'lat' => 35.71491775,
                    'created_by' => 8,
                    'group_id' => 7,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/sumidagawa-fireworks-skytree-iStock-497394068-1280x600.jpg',
                    'desc' => '隅田川の花火見たいよね',
                    'date' => '2023-08-20',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',

                ]
            ]);

            EManage::insert(
                [
                    ['group_id' => 2, 'user_id' => 8, 'event_id' => 6],
                    ['group_id' => 2, 'user_id' => 2, 'event_id' => 6],
                    ['group_id' => 2, 'user_id' => 3, 'event_id' => 6],
                    ['group_id' => 2, 'user_id' => 4, 'event_id' => 6],
                    ['group_id' => 2, 'user_id' => 9, 'event_id' => 6],
                ]
            );
        });
    }
}
