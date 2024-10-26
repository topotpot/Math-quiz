let question = document.querySelector(".question")
let answer_btns = document.querySelectorAll(".answer")
let con_3 = document.querySelector(".con_3")
let btn_start = document.querySelector(".btn-start")
let con_start = document.querySelector(".start")
let con_main = document.querySelector(".main")
let cookie = false
let cookies = document.cookie.split("; ")
for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split("=")[0] == "score") {
        cookie = cookies[i].split("=")[1]
        break
    }
}
if(cookie){
    let d = cookie.split("/")
    con_3.innerHTML=`Минулого разу ви дали ${d[1]} правильних відповідей із ${d[0]}.<br>Точність-${Math.round(d[1] * 100 / d[0])}%`
}
function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
let signs = ["+", "-", "*", "/"]
function getRandomSign() {
    return signs[randint(0, 3)]
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()


        this.question = `${a} ${sign} ${b}`

        if (sign == "+") {
            this.correct_answer = a + b
        }
        else if (sign == "-") {
            this.correct_answer = a - b
        }
        else if (sign == "*") {
            this.correct_answer = a * b
        }
        else if (sign == "/") {
            this.correct_answer = Math.round((a / b) * 100) / 100;
        }

        this.answers = [
            this.correct_answer,
            randint(this.correct_answer - 15, this.correct_answer - 1),
            randint(this.correct_answer - 15, this.correct_answer - 1),
            randint(this.correct_answer + 15, this.correct_answer + 1),
            randint(this.correct_answer + 15, this.correct_answer + 1),
        ]
        shuffle(this.answers)
    }
    display() {
        question.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_btns[i].innerHTML = this.answers[i]

        }
    }
}
let correct_answer_given
let total_answers_given
let current_question
btn_start.addEventListener("click", function () {
    con_start.style.display = 'none'
    con_main.style.display = 'flex'

    current_question = new Question()
    current_question.display()

    correct_answer_given = 0
    total_answers_given = 0

    setTimeout(function () {
        let new_cookie=`score=${total_answers_given}/${correct_answer_given};max-age=100000000000000`
        document.cookie=new_cookie
        con_3.innerHTML = `Ви дали ${correct_answer_given} правильних відповідей із  ${total_answers_given}.
    <br>Точність - ${Math.round(correct_answer_given * 100 / total_answers_given)}%`
        con_start.style.display = 'flex'
        con_main.style.display = 'none'
    }, 10000)
})




for (let i = 0; i < answer_btns.length; i += 1) {
    answer_btns[i].addEventListener("click", function () {
        if (answer_btns[i].innerHTML == current_question.correct_answer) {
            console.log("Правильно")
            correct_answer_given += 1
            answer_btns[i].style.background = '#00FF00'
            anime({
                targets: answer_btns[i],
                background: '#F1E2CA',
                duration: 500,
                delay: 100,
                easing: "linear"
            })
        }
        else {
            console.log("Неправильно")
            answer_btns[i].style.background = '#FF0000'
            anime({
                targets: answer_btns[i],
                background: '#F1E2CA',
                duration: 500,
                delay: 100,
                easing: "linear"
            })
        }
        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}
