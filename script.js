document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const completedDaysEl = document.getElementById('completed-days');
    let completedDaysCount = 0; // 完了日数のカウンター

    // 年と月をキーとしたオブジェクトを用意して、選択された日付を保存
    const selectedDates = JSON.parse(localStorage.getItem('selectedDates')) || {}; // ローカルストレージからデータを取得

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',

        // 月が切り替わったときに選択済みの日付を再表示
        datesSet: function(info) {
            const currentMonth = info.start.getMonth(); // 現在の月
            const currentYear = info.start.getFullYear(); // 現在の年
            const currentYearMonthKey = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;

            completedDaysCount = 0; // カウントをリセット
            
            // 現在表示中の月の選択済み日付を確認して、再度表示
            document.querySelectorAll('.fc-daygrid-day').forEach(function(dayEl) {
                const dayDate = dayEl.getAttribute('data-date');
                const [year, month, day] = dayDate.split('-').map(Number);
                const dateKey = `${year}-${month.toString().padStart(2, '0')}`;

                // 現在の月と年に一致する日付が選択されている場合は再度マーク
                if (dateKey in selectedDates && selectedDates[dateKey][day]) {
                    dayEl.classList.add('selected-date');
                    completedDaysCount++; // カウントを増やす
                }
            });

            updateCompletedDaysCount(); // 完了日数を更新
        },
        
        dateClick: function(info) {
            const clickedDate = info.dateStr; // クリックした日付の文字列形式 "YYYY-MM-DD"
            const clickedMonth = info.date.getMonth(); // クリックした日付の月（0: 1月, 1: 2月, ..., 9: 10月）
            const currentMonth = calendar.getDate().getMonth(); // 現在表示中の月
            const coinSound = document.getElementById("coin-sound"); // 追加時クリックの際の効果音

            if (clickedMonth !== currentMonth) {
                return; // 他の月の日付なら何もしない
            }

            const clickedYearMonthKey = `${info.date.getFullYear()}-${(info.date.getMonth() + 1).toString().padStart(2, '0')}`;
            
            // 選択された日付オブジェクトが存在しない場合は作成
            if (!selectedDates[clickedYearMonthKey]) {
                selectedDates[clickedYearMonthKey] = {};
            }

            // クリックした日付が既に選択されているかを確認
            if (info.dayEl.classList.contains('selected-date')) {
                // 確認アラートを表示
                if (confirm("削除しますか？")) {
                    // アラートでOKを押したら、完了済みの日付を解除する
                    info.dayEl.classList.remove('selected-date');
                    delete selectedDates[clickedYearMonthKey][info.date.getDate()]; // 保存した選択日から削除
                    completedDaysCount--; // カウンターを減らす
                }
            } else {
                // 新しく日付を完了としてマーク
                info.dayEl.classList.add('selected-date');
                selectedDates[clickedYearMonthKey][info.date.getDate()] = true; // 選択された日付を保存
                completedDaysCount++; // カウンターを増やす
                // 効果音：追加音の再生
                coinSound.currentTime = 0; // 先頭に戻す
                coinSound.play();
            }

            // localStorageに選択された日付を保存
            localStorage.setItem('selectedDates', JSON.stringify(selectedDates));

            // 完了日数を画面に表示
            updateCompletedDaysCount();
        }
    });

    calendar.render();

    // 完了日数を画面に表示する関数
    function updateCompletedDaysCount() {
        completedDaysEl.textContent = completedDaysCount;
    }
});
