// Function constructor

var john = {
  name: "John",
  yearOfBirth: 1990,
  job: "teacher",
};

var Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function () {
  console.log(2020 - this.yearOfBirth);
};

Person.prototype.lastName = "Smith";

var john = new Person("John", 1990, "teacher");
var jane = new Person("Jane", 1969, "designer");
var mark = new Person("Mark", 1948, "retired");

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

// Object.create

var personProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  },
};

var john = Object.create(personProto);
john.name = "John";
john.yearOfBirth = 1990;
john.job = "teacher";

var jane = Object.create(personProto, {
  name: { value: "Jane" },
  yearOfBirth: { value: 1969 },
  job: { value: "designer" },
});

// Primitives vs objects

// Primitives
var a = 23;
var b = a;
a = 46;

console.log(a); // 46
console.log(b); // 23

// Objects
var obj1 = {
  name: "John",
  age: 26,
};
var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age); // 30
console.log(obj2.age); // 30

// Functions
var age = 27;
var obj = {
  name: "Jonas",
  city: "Lisbon",
};

function change(a, b) {
  a = 30;
  b.city = "San Francisco";
}

change(age, obj);

console.log(age); // 27
console.log(obj.city); // San Francisco

// Passing functions as arguments

var years = [1996, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - 0.67 * el);
  } else {
    return -1;
  }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(years, isFullAge);
var rates = arrayCalc(years, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(rates);

// Functions returning functions

function interviewQuestion(job) {
  if (job === "designer") {
    return function (name) {
      console.log(name + ", can you please explain what UX design is?");
    };
  } else if (job === "teacher") {
    return function (name) {
      console.log("What subject do you teach, " + name + "?");
    };
  } else {
    return function (name) {
      console.log("Hello " + name + ", what do you do?");
    };
  }
}

var teacherQuestion = interviewQuestion("teacher");
var designerQuestion = interviewQuestion("designer");

teacherQuestion("John");
designerQuestion("John");
designerQuestion("Jane");
designerQuestion("Mark");
designerQuestion("Mike");

interviewQuestion("teacher")("Mark");

// Imediately Invoked Function Expressions

// Not an IIFE
function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game();

// IIFE
(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);

// Closures

function retirement(retirementAge) {
  var a = " years left until retirement.";
  return function (yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

var retirementUS = retirement(66);
retirementUS(1990);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

// retirement(66)(1990);

// Rewrite interview function as a closure challenge
function interview(job) {
  return function (name) {
    switch (job) {
      case "designer":
        console.log(name + ", can you please explain what UX design is?");
        break;
      case "teacher":
        console.log("What subject do you teach, " + name + "?");
        break;
      default:
        console.log("Hello " + name + ", what do you do?");
    }
  };
}

interview("designer")("David");
interview("teacher")("Janis");
interview("programmer")("Meghan");

// Bind, call, and apply

var bob = {
  name: "Bob",
  age: 26,
  job: "teacher",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " +
          timeOfDay +
          ", ladies and gentlement! I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age
      );
    } else if (style === "friendly") {
      console.log(
        "Hey! What's up? I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old. Have a nice " +
          timeOfDay +
          "."
      );
    }
  },
};

var emily = {
  name: 'Emily',
  age: 35,
  job: 'designer'
}

bob.presentation('formal', 'morning');

bob.presentation.call(emily, 'friendly', 'afternoon')

bob.presentation.apply(emily, ['formal', 'morning'])

var bobFriendly = bob.presentation.bind(bob, 'friendly')

bobFriendly('morning');
bobFriendly('night');

var emilyFormal = bob.presentation.bind(emily, 'formal');

emilyFormal('evening');

console.clear();


// CODING CHALLENGE

// (() => {
//   var currentScore = 0
//   while(true) {
//     var Question = function (question, answers, correctAnswer) {
//       this.question = question;
//       this.answers = answers;
//       this.correctAnswer = correctAnswer;
//       this.displayQuestion = function() {
//         console.log(this.question)
//         for (i = 0; i < this.answers.length; i++) {
//           console.log(`${i}: ${this.answers[i]}`)
//         }
//       }
//     };
    
//     var donaldDuck = new Question("What is the color of Donald Duck’s bowtie?", ["Red", "Yellow", "Blue", "White"], "0")
//     var olympics = new Question("Which country held the 2016 Summer Olympics?", ["China", "Ireland", "Brazil", "Italy"], "2")
//     var planet = new Question("Which planet is the hottest?", ["Venus", "Saturn", "Mercury", "Mars"], "0")
    
//     var questionArray = [donaldDuck, olympics, planet]
  
//     var randomNumber = Math.floor(Math.random() * questionArray.length)
    
//     questionArray[randomNumber].displayQuestion();

//     var userAnswer = prompt(questionArray[randomNumber].question + " or type exit to quit");
//     if (userAnswer == "exit") {
//       break;
//     } else {
//       while (true) {
//         if (userAnswer !== questionArray[randomNumber].correctAnswer) {
//           console.log("Try again...")
//           userAnswer = prompt(questionArray[randomNumber].question);
//         } else {
//           currentScore++
//           console.log(`Correct! Current score: ${currentScore}`)
//           break;
//         }
//       }
//     }
//   }
// })();

(() => {
  function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
  
  Question.prototype.displayQuestion = function() {
    console.log(this.question)
  
    for (i = 0; i < this.answers.length; i++) {
      console.log(`${i}: ${this.answers[i]}`)
    }
  }
  
  Question.prototype.checkAnswer = function(answer, callback) {
    var sc;

    if (answer === this.correctAnswer) {
      console.log('Correct answer! :D');
      sc = callback(true);
    } else {
      console.log('Wrong answer. Try again :)');
      sc = callback(false);
    }

    this.displayScore(sc);
  }

  Question.prototype.displayScore = function(score) {
    console.log(`Your current score is: ${score}`)
    console.log('--------------------------------------')
  }
  
  var donaldDuck = new Question("What is the color of Donald Duck’s bowtie?", ["Red", "Yellow", "Blue", "White"], 0)
  var olympics = new Question("Which country held the 2016 Summer Olympics?", ["China", "Ireland", "Brazil", "Italy"], 2)
  var planet = new Question("Which planet is the hottest?", ["Venus", "Saturn", "Mercury", "Mars"], 0)
  
  var questionArray = [donaldDuck, olympics, planet]

  function score() {
    var sc = 0 ;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    }
  }

  var keepScore = score();
  
  function nextQuestion() {
    
    var randomNumber = Math.floor(Math.random() * questionArray.length)
    
    questionArray[randomNumber].displayQuestion();
    
    var userAnswer = prompt("Please select the correct answer or type \"exit\" to quit.");
    
    if(userAnswer !== 'exit') {
      questionArray[randomNumber].checkAnswer(parseInt(userAnswer), keepScore);
      
      nextQuestion();
    }
  }

  nextQuestion();

})();