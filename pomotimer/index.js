const notifier = require('node-notifier');
const moment = require('moment');
const argTime = process.argv.slice(2);

const POMODORE_TIME = argTime[0];
const BREAK_TIME = argTime[1];

let isWorking = false;
let remainingTime = 0;

function formattingTime(totalSecond) {
    const duration = moment.duration(totalSecond, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
      
    return `${hours}:${minutes}:${seconds}`;
}


function startTimer(duration) {
    isWorking = !isWorking;
    remainingTime = duration * 60;

    const timer = setInterval(() => {
        remainingTime --;

        const formattedTime = formattingTime(remainingTime);
    
        console.log(`${isWorking ? 'Working' : 'Break'} : ${formattedTime}`);

        if (remainingTime === 0) {
            clearInterval(timer);
            notifier.notify({
                title: isWorking ? 'Working' : 'Break',
                message: isWorking ? 'Working' : 'Break',
                sound: true,
                wait: true,

            });
            startTimer(isWorking ? POMODORE_TIME : BREAK_TIME);
        } 
    }, 1000);
}


startTimer(POMODORE_TIME);