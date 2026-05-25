// api/getDoc.js
// Google DocsのデータをGAS経由で取得するサーバーレス関数

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const gasUrl = process.env.GAS_URL;

  if (!gasUrl) {
    // GAS_URLが未設定の場合はダミーデータをテキストで返す
    return res.status(200).send(`【テスト用サンプルデータ】

空き家相談窓口：佐賀市建築指導課
電話：0952-40-7113
受付時間：平日8:30〜17:15

【空き家バンク】
空き家の売却・賃貸を希望する場合は空き家バンクに登録できます。
登録は無料です。

【補助金】
・空き家解体補助金：上限50万円
・空き家リフォーム補助金：上限100万円（要件あり）

※このデータはテスト用サンプルです。`);
  }

  try {
    const response = await fetch(`${gasUrl}?action=getDoc`);
    const data = await response.json();
    // GASからのレスポンスをテキストとして返す
    const content = data.content || data.text || '';
    if (!content) {
      return res.status(500).send('データの読み込みに失敗しました');
    }
    return res.status(200).send(content);
  } catch (e) {
    return res.status(500).send('データの読み込みに失敗しました：' + e.message);
  }
}
