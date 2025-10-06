// 精算共有機能

// 精算共有機能
document.addEventListener('DOMContentLoaded', function() {
  // 基準の計算金額
  const DAILY_RATE = 400;
  
  // 計算結果とオップアップ表示
  document.getElementById('settlementBtn').addEventListener('click', () => {
    // Completed Daysの値を取得
    const completedDays = parseInt(document.getElementById('completed-days').textContent);
    // 日数と基準金額の計算
    const amount = completedDays * DAILY_RATE;
    // ポップアップUI
    document.getElementById('settlementPopup').style.display = 'block';
    document.getElementById('settlementAmount').textContent = `${amount.toLocaleString()}円`;
  });

  // ポップアップを閉じる
  document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('settlementPopup').style.display = 'none';
  });

  // 共有ボタン
  document.getElementById('shareBtn').addEventListener('click', () => {
    shareToLine();
  });

  // LINE共有関数
  function shareToLine() {
    const completedDays = parseInt(document.getElementById('completed-days').textContent);
    const amountText = document.getElementById('settlementAmount').textContent;
    const title = `今月のバイト精算金額`;
    const text = `${amountText} (${completedDays}日)`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text
      }).catch(err => console.log('共有キャンセル'));
    } else {
      window.location.href = `https://line.me/R/share?text=${encodeURIComponent(text)}`;
    }
  }
  
});