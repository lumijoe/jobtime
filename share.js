// 精算共有機能

// 精算共有機能
document.addEventListener('DOMContentLoaded', function() {
  
  // ポップアップ表示
  document.getElementById('settlementBtn').addEventListener('click', () => {
    document.getElementById('settlementPopup').style.display = 'block';
  });

  // ポップアップを閉じる
  document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('settlementPopup').style.display = 'none';
  });

  // 共有ボタン
  document.getElementById('shareBtn').addEventListener('click', () => {
    const amount = 1500; // とりあえず仮の金額
    shareToLine(amount);
  });

  // LINE共有関数
  function shareToLine(amount) {
    const text = `精算金額: ${amount.toLocaleString()}円`;
    
    if (navigator.share) {
      navigator.share({
        title: '精算結果',
        text: text
      }).catch(err => console.log('共有キャンセル'));
    } else {
      window.location.href = `https://line.me/R/share?text=${encodeURIComponent(text)}`;
    }
  }
  
});