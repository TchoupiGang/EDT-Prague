document.addEventListener('DOMContentLoaded', function() {
    const timeslots = [
        "8:15-9:45", "10:00-11:30", "11:30-12:30", "12:30-14:00", "14:15-15:45", "16:00-17:30"
    ];

    const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const calendarTimeslots = document.getElementById('calendar-timeslots');
    const weekTitle = document.getElementById('week-title');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');


    const mob_prevWeekButton = document.getElementById('mobile-prev-week');
    const mobnextWeekButton = document.getElementById('mobile-next-week');

    let currentWeekIndex = 0;
    let scheduleData;

    const weeks = document.querySelectorAll('.static-calendar tbody tr'); // Sélectionne toutes les rangées des semaines

    function updateWeekHighlight() {
        weeks.forEach((week, index) => {
            if (index === currentWeekIndex) {
                week.classList.add('highlight-week');
            } else {
                week.classList.remove('highlight-week');
            }
        });
    }

    function loadWeekData(weekIndex) {
        const weekKeys = Object.keys(scheduleData);
        const currentWeek = scheduleData[weekKeys[weekIndex]];

        weekTitle.textContent = `Weekly Schedule - ${weekKeys[weekIndex]}`;

        calendarTimeslots.innerHTML = '';

        for (let i = 0; i < timeslots.length; i++) {
            const row = document.createElement('div');
            row.className = 'calendar-row';
            for (let j = 0; j < days.length; j++) {
                const cell = document.createElement('div');
                cell.className = 'calendar-timeslot';
                if (j === 0) {
                    const times = timeslots[i].split('-');
                    cell.innerHTML = `<span class="time-start">${times[0]}</span><span class="time-end">${times[1]}</span>`;
                    cell.className += ' time-cell';
                }
                row.appendChild(cell);
            }
            calendarTimeslots.appendChild(row);
        }

        for (const day in currentWeek) {
            currentWeek[day].forEach(event => {
                const startTime = event.time.split('-')[0];
                const endTime = event.time.split('-')[1];
                const startTimeIndex = timeslots.findIndex(slot => slot.startsWith(startTime));
                const endTimeIndex = timeslots.findIndex(slot => slot.endsWith(endTime));
                const dayIndex = days.indexOf(day);

                if (startTimeIndex >= 0 && dayIndex >= 0) {
                    const cell = calendarTimeslots.children[startTimeIndex].children[dayIndex];
                    cell.innerHTML = `${event.event}<br><strong>${event.room}</strong>`;
                    
                    if (endTimeIndex > startTimeIndex) {
                        cell.style.height = (endTimeIndex - startTimeIndex + 1) * 100 + '%';
                        cell.style.overflow = 'hidden';

                        for (let k = startTimeIndex + 1; k <= endTimeIndex; k++) {
                            const mergingCell = calendarTimeslots.children[k].children[dayIndex];
                            mergingCell.classList.add('hidden-event');
                        }
                    }
                } else if (dayIndex > 0) { 
                    const emptyCell = calendarTimeslots.children[startTimeIndex].children[dayIndex];
                    emptyCell.classList.add('empty-event');
                }
            });
        }

        for (let i = 0; i < calendarTimeslots.children.length; i++) {
            for (let j = 0; j < calendarTimeslots.children[i].children.length; j++) {
                const cell = calendarTimeslots.children[i].children[j];
                const textContent = cell.textContent;
                
                if (textContent.trim() === '') {
                    cell.classList.add('empty-event');
                } else {
                    if (textContent.includes('Probability & Statistics')) {
                        cell.classList.add('probability-statistics');
                    } else if (textContent.includes('VoIP')) {
                        cell.classList.add('voip');
                    } else if (textContent.includes('Network Securite')) {
                        cell.classList.add('network-securite');
                    } else if (textContent.includes('English')) {
                        cell.classList.add('english');
                    }
                }
            }
        }
        mob_prevWeekButton.disabled = weekIndex === 0;
        mobnextWeekButton.disabled = weekIndex === weekKeys.length - 1;
        prevWeekButton.disabled = weekIndex === 0;
        nextWeekButton.disabled = weekIndex === weekKeys.length - 1;
    }

    prevWeekButton.addEventListener('click', () => {
        if (currentWeekIndex > 0) {
            currentWeekIndex--;
            loadWeekData(currentWeekIndex);
            updateWeekHighlight();
        }
    });

    nextWeekButton.addEventListener('click', () => {
        if (currentWeekIndex < Object.keys(scheduleData).length - 1) {
            currentWeekIndex++;
            loadWeekData(currentWeekIndex);
            updateWeekHighlight();
        }
    });

    mob_prevWeekButton.addEventListener('click', () => {
        if (currentWeekIndex > 0) {
            currentWeekIndex--;
            loadWeekData(currentWeekIndex);
            updateWeekHighlight();
        }
    });

    mobnextWeekButton.addEventListener('click', () => {
        if (currentWeekIndex < Object.keys(scheduleData).length - 1) {
            currentWeekIndex++;
            loadWeekData(currentWeekIndex);
            updateWeekHighlight();
        }
    });

    fetch('calendar.json')
        .then(response => response.json())
        .then(data => {
            scheduleData = data;
            loadWeekData(currentWeekIndex);
        })
        .catch(error => console.error('Error fetching data:', error));
    updateWeekHighlight();

    var rows = document.querySelectorAll('tbody tr');
    rows.forEach(function(row) {
        row.addEventListener('click', function() {
            var idLigne = this.id;
            onclick_week_change(idLigne)
        });
    });

    function onclick_week_change(index_owo){
        index_owo--
        loadWeekData(index_owo);
        weeks.forEach((week, index) => {
            if (index === index_owo) {
                week.classList.add('highlight-week');
            } else {
                week.classList.remove('highlight-week');
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const targetYear = 2024;

    if (today.getFullYear() === targetYear) {
        const day = today.getDate().toString();
        const days = document.querySelectorAll('.static-calendar td');
        days.forEach(function(cell) {
            if (cell.textContent === day) {
                const span = document.createElement('span');
                span.textContent = cell.textContent; 
                cell.textContent = ''; 
                cell.appendChild(span); 
                cell.classList.add('current-day'); 
            }
        });
    }
});
