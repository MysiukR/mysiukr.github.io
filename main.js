document.documentElement.style.setProperty('--swiper-pagination-bottom', '-50px');
document.addEventListener('DOMContentLoaded', function () {
    const cardData = [
        {title: 'Бабухівський Віталій', subtitle: '17', content: 'Я дуже люблю програмування. Зараз мені подобається вивчати  HTML, CSS  та JavaScript. Я завжди вражаюся магією, яку можна створити, працюючи з цими технологіями. Мій шлях у програмуванні — це постійне вдосконалення та вивчення нових інструментів.', imageSrc: '/images/people/pic1.jpg'},
        {title: 'Болюбаш Назар', subtitle: '17', content: 'Граю бравл старс', imageSrc: '/images/people/pic2.jpg'},
        {title: 'Войченко Ігор', subtitle: '17', content: '', imageSrc: '/images/people/pic3.jpg'},
        {title: 'Горовий Микита', subtitle: '17', content: 'Дотєр.', imageSrc: '/images/people/pic4.jpg'},
        {title: 'Гринів Богдан', subtitle: '17', content: 'сі плюс плюс найкраща мова.', imageSrc: '/images/people/pic5.jpg'},
        {title: 'Card 6 Title', subtitle: 'Card 6 Subtitle', content: 'Card 6 Content', imageSrc: 'pic6.png'},
        {title: 'Загорянський Максим', subtitle: '17', content: 'Гатяться в туза якось два клоуни, і один каже іншому: «Щось уже не смішно(', imageSrc: '/images/people/pic7.png'},
        {title: 'Капустін Денис', subtitle: '17', content: 'Якщо я буду таким як всі. То хто ж буде таким, як я? Банан.', imageSrc: '/images/people/pic8.png'},
        {title: 'Касянюк Олександра', subtitle: '17', content: 'Хто тримає цей район? Пес Патрон, пес Патрон. Хто крутіший за iPhone? Пес Патрон, пес Патрон. Хто не ходить на газон? Пес Патрон, пес Патрон', imageSrc: '/images/people/pic9.jpg'},
        {title: 'Катело Анастасія', subtitle: '18', content: 'Староста цих бєздарєй. P.S. насправді вони найкращі ❤️', imageSrc: '/images/people/pic10.jpg'},
        {title: 'Корабльов Максим', subtitle: '18', content: 'Люблю футбол, захоплююсь 3d моделюванням та web розробкою', imageSrc: '/images/people/pic11.png'},
        {title: 'Крамарський Дмитро', subtitle: '17', content: 'Май наме іс діма', imageSrc: '/images/people/pic12.png'},
        {title: 'Лавренюк Андрій', subtitle: '18', content: 'я кукурудза', imageSrc: '/images/people/pic13.jpg'},
        {title: 'Малий Андрій', subtitle: 'Card 14 Subtitle', content: 'Card 14 Content', imageSrc: '/images/people/pic14.png'},
        {title: 'Очеретний Денис', subtitle: '17', content: 'Хочеш жити? -хочу! ЛНУ - місце де хочеться жити', imageSrc: '/images/people/pic15.png'},
        {title: 'Володимир Репчинський', subtitle: '16', content: 'Вітя поганий одногрупник', imageSrc: '/images/people/pic16.jpeg'},
        {title: 'Сумцов Дмитро', subtitle: '18', content: 'Питають дружину, де ти береш гроші. Вона каже: "У тумбочці". Їй кажуть: "А хто кладе в тумбочку гроші?". Вона каже: "Не знаю". Так де ти береш гроші?"', imageSrc: '/images/people/pic17.jpg'},
        {title: 'Хоміцький Богуслав', subtitle: '17', content: 'Афроамериканця, який вкрав банкомат, не пустили з ним до автобуса. Які ще потрібні докази расизму в Америці?', imageSrc: '/images/people/pic18.png'},
        {title: 'Чубара Влас', subtitle: '17', content: 'Не фотографуюсь', imageSrc: '/images/people/pic19.png'},
        {title: 'Щегельський Віктор', subtitle: '17', content: 'Я великий фанат програмування. Моє серце належить мовам веб-розробки, зокрема HTML, CSS та JavaScript. Я завжди вражаюся магією, яку можна створити, працюючи з цими технологіями.', imageSrc: '/images/people/pic20.jpg'},
        {title: 'Ящук Софія', subtitle: '17', content: 'Йде дві зубочистки лісом, і бачать їжачок біжить. Каже одна зубочистка другій: "ого тут маршрутки їздять".', imageSrc: '/images/people/pic21.png'},
    ];

    const cardContainer = document.getElementById('cardContainer');
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1.8,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    cardData.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('swiper-slide', 'card');
        cardElement.id = `card${index + 1}`;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card__inner');

        const frontFace = document.createElement('div');
        frontFace.classList.add('card__face', 'card__face--front');
        frontFace.innerHTML = `<h2>${card.title}</h2>`;

        const backFace = document.createElement('div');
        backFace.classList.add('card__face', 'card__face--back');
        backFace.innerHTML = `
                <div class="card__content">
                    <div class="card__header">
                        <img src="${card.imageSrc}" alt="" class="pp" />
                        <h2>${card.title}</h2>
                    </div>
                    <div class="card__body">
                        <h3>${card.subtitle}</h3>
                        <p>${card.content}</p>
                    </div>
                </div>
            `;

        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
        cardElement.appendChild(cardInner);

        cardContainer.appendChild(cardElement);
    });

    const cards = document.querySelectorAll(".card__inner");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            card.classList.toggle('is-flipped');
        });
    });

    const scrollToTarget = event => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({behavior: 'smooth'});
        }
    };

    const navigationLinks = document.querySelectorAll('.nav__link');
    navigationLinks.forEach(link => link.addEventListener('click', scrollToTarget));
});
