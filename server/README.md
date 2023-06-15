# Laravel-api-example

## インストール

1. リポジトリをクローンする: `git clone https://github.com/IESKA2KHobbyLink/Laravel-api-exmple.git`
2. 必要なパッケージをインストールする: `composer install`
3. .env.example ファイルを.env にコピーして、データベースの認証情報を更新する
4. MySQL は autocommit (自動コミットモード)を無効化する方は　 autocommit を設定してください。
5. アプリケーションキーを生成する: `php artisan key:generate`
6. データベースマイグレーションを実行する: `php artisan migrate`
7. 開発用サーバーを起動する: `php artisan serve`

## Routings
```
GET /api/users: すべてのユーザーを取得する
GET /api/users/{id}: ユーザーをIDで取得する
POST /api/users: ユーザー制作
PUT /api/users/{id}: IDでユーザーの情報を更新
DELETE /api/users/{id}: IDでユーザー削除する
```
