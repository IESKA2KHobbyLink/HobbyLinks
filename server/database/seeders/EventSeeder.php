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
                    'address' => 'Tokyo Ginza',
                    'created_by' => 1,
                    'group_id' => 2,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/ffff.jpeg',
                    'desc' => '毎年激戦のIPアドレス計算大会！何十人の超っ戦車に立ちはだかるのは、8年連続チャンピョン「」',
                    'date' => '2023-08-30',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',
                    'deleted_at' => '2023-06-19',
                ]
            ]);



            Event::insert([
                [
                    'event_name' => 'プリ撮り放題！！',
                    'prefecture' => 'Osaka',
                    'address' => '大阪府吹田市',
                    'created_by' => 4,
                    'group_id' => 1,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/puriga.jpg',
                    'desc' => '当社のURLにアクセスしてキャンペーンに参加!参加してくれたら全員にカラコン割引券プレゼント!!しかし目玉は一日プリおり放題券？！他にもいろいろなうれしい特典ご用意しています!',
                    'date' => '2023-09-25',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',
                    'deleted_at' => '2023-06-19',
                ]
            ]);



            Event::insert([
                [
                    'event_name' => 'Anker新商品発表会だってよ!!',
                    'prefecture' => 'Kanagawa',
                    'address' => 'Kanagawa Yokohama',
                    'created_by' => 5,
                    'group_id' => 5,
                    'type' => 'Inperson',
                    'header_path' => '/storage/images/eventHeader/anker.jpg',
                    'desc' => 'コスパ良き、性能良きなAnkerが新商品発表するって!行くやつは、なんやかんや手続きしなあかんから管理者である私に連絡してくれよな,,
                    でも応募者多かったら抽選するからよろしく!!',
                    'date' => '2023-08-30',
                    'created_at' => '2023-06-19',
                    'updated_at' => '2023-06-19',
                    'deleted_at' => '2023-06-19',
                ]
            ]);

            EManage::create([
                'event_id' => 3,
                'group_id' => 3,
                'user_id' => 5
            ]);

            EManage::insert([
                ['event_id' => 1, 'group_id' => 2, 'user_id' => 1],
                ['event_id' => 1, 'group_id' => 2, 'user_id' => 3], // 既存のイベントにも追加
                ['event_id' => 1, 'group_id' => 2, 'user_id' => 2],
                ['event_id' => 1, 'group_id' => 2, 'user_id' => 5],
            ]);

            EManage::insert([
                ['event_id' => 2, 'group_id' => 1, 'user_id' => 1],
                ['event_id' => 2, 'group_id' => 1, 'user_id' => 3], // 既存のイベントにも追加
            ]);

            EManage::create([
                'event_id' => 2,
                'group_id' => 2,
                'user_id' => 2
            ]);
        });
    }
}
