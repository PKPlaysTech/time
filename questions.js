// questions.js
// 这是一个存放所有题目的“题库”文件。
// 游戏开始时，代码会随机从这里抽取题目给左右两边的玩家。
//
// 格式说明：
// question: 屏幕上显示的问题（可以是文字）。因为关于时间，你可以用文字描述。
// correctAnswer: 正确答案（必须是字符串格式，加上引号）。
// options: 包含正确答案在内的所有选项。屏幕上会把这些选项变成泡泡。

const questionBank = [
    // --- Basic Units & Conversions ---
    {
        question: "1 hour = ? minutes",
        correctAnswer: "60",
        options: ["30", "60", "100", "24"]
    },
    {
        question: "Half an hour is how many minutes?",
        correctAnswer: "30",
        options: ["15", "30", "45", "60"]
    },
    {
        question: "How many hours in a day?",
        correctAnswer: "24",
        options: ["12", "24", "48", "60"]
    },
    {
        question: "1 minute = ? seconds",
        correctAnswer: "60",
        options: ["10", "60", "100", "3600"]
    },
    {
        question: "Quarter of an hour is?",
        correctAnswer: "15 mins",
        options: ["10 mins", "15 mins", "20 mins", "25 mins"]
    },
    {
        question: "How many days in a week?",
        correctAnswer: "7",
        options: ["5", "6", "7", "30"]
    },
    {
        question: "How many months in a year?",
        correctAnswer: "12",
        options: ["10", "12", "24", "365"]
    },

    // --- Clock Reading (Digital & Analog Phrases) ---
    {
        question: "What time is 'Half past six'?",
        correctAnswer: "6:30",
        options: ["6:00", "6:15", "6:30", "7:30"]
    },
    {
        question: "What time is 'Quarter past eight'?",
        correctAnswer: "8:15",
        options: ["8:00", "8:15", "8:30", "8:45"]
    },
    {
        question: "What time is 'Quarter to nine'?",
        correctAnswer: "8:45",
        options: ["9:15", "9:45", "8:45", "8:15"]
    },
    {
        question: "The long hand on a clock measures?",
        correctAnswer: "Minutes",
        options: ["Hours", "Minutes", "Seconds", "Days"]
    },
    {
        question: "The short hand on a clock measures?",
        correctAnswer: "Hours",
        options: ["Hours", "Minutes", "Seconds", "Months"]
    },

    // --- Calendar: Days and Months ---
    {
        question: "What day comes after Monday?",
        correctAnswer: "Tuesday",
        options: ["Sunday", "Tuesday", "Wednesday", "Friday"]
    },
    {
        question: "What day comes before Friday?",
        correctAnswer: "Thursday",
        options: ["Wednesday", "Thursday", "Saturday", "Sunday"]
    },
    {
        question: "What is the first month of the year?",
        correctAnswer: "January",
        options: ["January", "March", "June", "December"]
    },
    {
        question: "Which month comes after January?",
        correctAnswer: "February",
        options: ["March", "February", "April", "December"]
    },
    {
        question: "Which month comes before July?",
        correctAnswer: "June",
        options: ["May", "June", "August", "September"]
    },
    {
        question: "What is the last month of the year?",
        correctAnswer: "December",
        options: ["November", "October", "December", "January"]
    },
    {
        question: "Which month comes after October?",
        correctAnswer: "November",
        options: ["September", "November", "December", "August"]
    },
    {
        question: "Which day is a weekend day?",
        correctAnswer: "Sunday",
        options: ["Monday", "Wednesday", "Friday", "Sunday"]
    },

    // --- Time of Day & Logic ---
    {
        question: "When do you usually have breakfast?",
        correctAnswer: "In the morning",
        options: ["In the morning", "At noon", "In the evening", "At night"]
    },
    {
        question: "What time is noon?",
        correctAnswer: "12:00 PM",
        options: ["12:00 AM", "12:00 PM", "6:00 AM", "6:00 PM"]
    },
    {
        question: "What time is midnight?",
        correctAnswer: "12:00 AM",
        options: ["12:00 AM", "12:00 PM", "1:00 AM", "11:00 PM"]
    },
    {
        question: "Which is longer?",
        correctAnswer: "1 hour",
        options: ["50 minutes", "1 hour", "10 minutes", "15 minutes"]
    },
    {
        question: "7:30 is?",
        correctAnswer: "Half past seven",
        options: ["Half past six", "Half past seven", "Half past eight", "Seven three zero"]
    },

    // --- Hand Positions ---
    {
        question: "Where is the long hand at 'half past'?",
        correctAnswer: "6",
        options: ["3", "6", "9", "12"]
    },
    {
        question: "Where is the long hand at 'o'clock'?",
        correctAnswer: "12",
        options: ["3", "6", "9", "12"]
    },
    {
        question: "Where is the long hand at 'quarter past'?",
        correctAnswer: "3",
        options: ["3", "6", "9", "12"]
    },
    {
        question: "Where is the long hand at 'quarter to'?",
        correctAnswer: "9",
        options: ["3", "6", "9", "12"]
    },

    // --- Calendar Deep Dive ---
    {
        question: "Which month is between May and July?",
        correctAnswer: "June",
        options: ["April", "June", "August", "September"]
    },
    {
        question: "Which month is between August and October?",
        correctAnswer: "September",
        options: ["July", "September", "November", "December"]
    },
    {
        question: "The middle of the day is called?",
        correctAnswer: "Noon",
        options: ["Midnight", "Morning", "Noon", "Evening"]
    },
    {
        question: "How many minutes in a quarter hour?",
        correctAnswer: "15",
        options: ["15", "30", "45", "60"]
    },
    {
        question: "If today is Tuesday, tomorrow is?",
        correctAnswer: "Wednesday",
        options: ["Monday", "Wednesday", "Thursday", "Friday"]
    },

    // --- Daily Routine & Tools ---
    {
        question: "Which month has Christmas?",
        correctAnswer: "December",
        options: ["October", "November", "December", "January"]
    },
    {
        question: "What is the day before Sunday?",
        correctAnswer: "Saturday",
        options: ["Friday", "Saturday", "Monday", "Tuesday"]
    },
    {
        question: "What do we use to measure time?",
        correctAnswer: "Clock",
        options: ["Ruler", "Scale", "Clock", "Thermometer"]
    },
    {
        question: "What do we use to see the date and months?",
        correctAnswer: "Calendar",
        options: ["Calendar", "Map", "Clock", "Dictionary"]
    },
    {
        question: "If today is Friday, what day was yesterday?",
        correctAnswer: "Thursday",
        options: ["Wednesday", "Thursday", "Saturday", "Sunday"]
    },

    // --- O'Clock & General Concepts ---
    {
        question: "What time is 7:00?",
        correctAnswer: "Seven o'clock",
        options: ["Six o'clock", "Seven o'clock", "Eight o'clock", "Seven thirty"]
    },
    {
        question: "What time is 10:00?",
        correctAnswer: "Ten o'clock",
        options: ["Nine o'clock", "Ten o'clock", "Eleven o'clock", "Ten thirty"]
    },
    {
        question: "Which month comes after January?",
        correctAnswer: "February",
        options: ["March", "February", "April", "May"]
    },
    {
        question: "Which month comes after March?",
        correctAnswer: "April",
        options: ["May", "June", "April", "February"]
    },
    {
        question: "Which month comes after May?",
        correctAnswer: "June",
        options: ["July", "June", "August", "September"]
    },
    {
        question: "Which month comes after August?",
        correctAnswer: "September",
        options: ["October", "September", "November", "August"]
    },
    {
        question: "Which month comes after December?",
        correctAnswer: "January",
        options: ["January", "February", "November", "October"]
    },
    {
        question: "How many days are in a week?",
        correctAnswer: "7",
        options: ["5", "6", "7", "12"]
    },
    {
        question: "If it is 2:00, where is the long hand?",
        correctAnswer: "12",
        options: ["2", "12", "6", "3"]
    },
    {
        question: "If it is 11:00, where is the long hand?",
        correctAnswer: "12",
        options: ["11", "12", "6", "9"]
    },
    {
        question: "The short hand points to 5, the long hand points to 12. What time is it?",
        correctAnswer: "5:00",
        options: ["12:05", "5:00", "5:12", "6:00"]
    },
    {
        question: "The short hand points to 8, the long hand points to 12. What time is it?",
        correctAnswer: "8:00",
        options: ["8:00", "12:08", "8:12", "9:00"]
    },
    {
        question: "Which is the long hand?",
        correctAnswer: "Minute hand",
        options: ["Hour hand", "Minute hand", "Second hand", "None"]
    },
    {
        question: "Which is the short hand?",
        correctAnswer: "Hour hand",
        options: ["Hour hand", "Minute hand", "Second hand", "None"]
    },
    {
        question: "What time is it when both hands are on 12?",
        correctAnswer: "12:00",
        options: ["12:00", "6:00", "12:12", "1:00"]
    },
    {
        question: "Is the minute hand longer than the hour hand?",
        correctAnswer: "Yes",
        options: ["Yes", "No", "They are the same", "I don't know"]
    },
    {
        question: "How many minutes in 1 hour?",
        correctAnswer: "60",
        options: ["30", "60", "100", "12"]
    },
    {
        question: "How many hours are in a day?",
        correctAnswer: "24",
        options: ["12", "24", "48", "7"]
    },
    {
        question: "Lunch time is usually at...?",
        correctAnswer: "12:00",
        options: ["12:00", "6:00", "12:30", "8:00"]
    },
    {
        question: "What is 4 o'clock in numbers?",
        correctAnswer: "4:00",
        options: ["4:00", "12:04", "4:30", "3:00"]
    },
    {
        question: "What is 10 o'clock in numbers?",
        correctAnswer: "10:00",
        options: ["10:00", "12:10", "10:30", "9:00"]
    }
];