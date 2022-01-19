// Modal
// 開啟 modal 時， bootstrap 替 body 增加 overflow hidden
// 並且替 body、#navbar 增加 padding-right，造成整個畫面寬度邊寬
$('#reg_btn, #login_btn').on('click', function () {
  $('body,#navbar').css({
    overflow: 'auto',
    paddingRight: 0
  })
})

// section03 生物種族
$('#race a').on('click', function () {
  $('#race a').removeClass('active')
  $(this).addClass('active')
})

// Swiper ---------------------------------------------------------------------------------------------
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  spaceBetween: 15,
  centeredSlides: true,
  autoplay: {
    delay: 10000
  },
  slidesPerView: 'auto',
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    920: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

// GSAP -----------------------------------------------------------------------------------------------
// 註冊 Pligins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

$('#navbar .main-link,.backtop a').each(function (index) {
  $(this).on('click', function (e) {
    e.preventDefault(); // 阻止 a 連結的預設動作
    if ($(this).attr('href') == '#section04' || $(this).attr('href') == '#section05') {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index+1}`,
        },
        duration: 1.5,
        ease: 'back.inOut'
      })
    } else {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index+1}`,
          offsetY: 150
        },
        duration: 1.5,
        ease: 'back.inOut'
      })
    }
  })
})


// 流星 --------------------------------------------------------------------------------------------------
// 1. 創建流星數目
function createStar(starNumber) {
  for (let i = 0; i < starNumber; i++) {
    $('.shooting_star').append('<div class="star"></div>')
  }
  const stars = gsap.utils.toArray('.star')
  return stars
}
// 2. 設定補間動畫預設值
function setStarTween(stars) {
  gsap.set('.shooting_star', {
    perspective: 100
  })
  stars.forEach(function (star, index) {
    gsap.set(star, {
      transformOrigin: '0 50%',
      position: 'absolute',
      left: gsap.utils.random($(window).width() / 2, $(window).width() * 2),
      top: gsap.utils.random(-100, -200),
      rotation: -40
    })
  })
  return stars
}

// 3. 播放流星時間軸動畫
function playStarTimline(stars) {
  const tl = gsap.timeline({
    repeat: -1
  })
  tl.to(stars, {
    x: `-=${$(window).width() * 1.5}`, // 流星往左
    y: `+=${$(window).width() * 1.5}`, // 流星往下
    z: `random(-100, 500)`,
    stagger: function (index) {
      // console.log(gsap.utils.random(index + 5, (index + 5) * 2, 1))
      return gsap.utils.random(index + 5, (index + 5) * 2, 1)
    },
    stagger: 0.5,
    duration: 'random(0.5,3,0.1)',
    ease: 'none'
  })
}

// 管道流程，可以設定一系列的流程，將函式結果 return 給下一個函式，當成參數來接收
const playStar = gsap.utils.pipe(createStar, setStarTween, playStarTimline)
playStar(30)

// ScrollTrigger 滾動軸 -----------------------------------------------------------------------------------
// backtop 顯示/隱藏
gsap.to('.backtop', {
  scrollTrigger: {
    trigger: '#footer',
    start: 'top bottom',
    end: 'bottom bottom',
    toggleActions: 'play none none reverse',
    // markers: true
  },
  display: 'block',
  opacity: 1,
  duration: 1
})

// 視差效果 ------------------------------------------------------------------------------------------------
// 星空背景
gsap.to('body', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top 0%',
    end: 'bottom 0%',
    scrub: 5,
    // markers: true
  },
  backgroundPosition: '50% 100%',
  ease: 'none',
})

// 浮空的島
const float_tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'body',
    start: 'top 100%',
    end: 'bottom 100%',
    scrub: 5,
    markers: true
  },
  ease: 'none'
})

// 1. 使用 timeline 操作進場位置
float_tl
  .from('.float-wrap-01', {
    left: '-30%'
  })
  .from('.float-wrap-02', {
    right: '-30%'
  }, '<')
  .from('.float-wrap-03', {
    bottom: '-100%'
  }, '<')

// 2. 島自身上下浮動
$('.float-island').each(function (index, island) {
  gsap.to(island, {
    y: 50 * (index + 1),
    duration: 10 * (index + 1),
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})

// 霧
$('.fog').each(function (index, fog) {
  gsap.set(fog, {
    width: '100%',
    height: '100%',
    background: 'url(./images/fog.png) no-repeat center/80%',
    opacity: 0.9,
    position: 'absolute',
    top: 'random(0,100)' + '%',
    x: function () {
      return index % 2 == 0 ? -$(window).width() : $(window).width()
    }
  })
  gsap.to(fog, {
    x: function () {
      return index % 2 == 0 ? $(window).width() : -$(window).width()
    },
    onRepeat() {
      $(fog).css({
        top: gsap.utils.random(0, 100) + '%'
      })
    },
    repeat: -1,
    duration: 60,
    ease: 'none'
  })
})

// 導覽列滾動收合 --------------------------------------------------------------------------------------------
const tween1 = gsap.from('#navbar', {
  yPercent: -100,
  paused: false,
  duration: 0.5,
  lazy: false,
  scrollTrigger: {
    start: "top 60",
    end: () => '+=' + document.documentElement.scrollHeight, // end 整份文件高度
    onEnter(self) {
      // console.log(self.animation)
      self.animation.play()
      console.log(self)
      // tween1.play()
    },
    onUpdate(self) {
      // console.log(self)
      self.direction === -1 ? self.animation.play() : self.animation.reverse()
      // self.direction === -1 ? console.log(-1) : console.log(1)
    },
    markers: true
  }
})


// 導覽列 active 位置
$('.main-link').each(function (index, link) {
  let href = $(link).attr('href') // 抓 section id
  // console.log(href)
  gsap.to(link, {
    scrollTrigger: {
      trigger: `${href}`,
      start: 'top center',
      end: 'bottom center',
      toggleClass: {
        targets: link,
        className: 'active'
      },
      // markers: true
    }
  })
})

// SplitText -------------------------------------------------------------------------------------------------
gsap.set('#splitText', {
  perspective: 400
})

const tl_text = gsap.timeline({
  repeat: -1,
  repeatDelay: 8
})


// 將段落轉陣列
const paragraphs = gsap.utils.toArray('#splitText p')
// console.log(paragraphs)

// 將段落迭代循環，使用建構式 new SplitText() 將個段落每個字分割成一個陣列，最後再放入新陣列 splitTexts
const splitTexts = paragraphs.map(function (p) {
  return new SplitText(p, {
    charsClass: 'charBg'
  })
})
// console.log(splitTexts)

splitTexts.forEach(function (splitText) {
  const chars = splitText.chars
  tl_text.from(chars, {
    y: 80,
    rotationX: 180,
    rotationY: 0,
    scale: 2,
    transformOrigin: '0% 50% -100',
    opacity: 0,
    duration: 2,
    ease: 'back',
    stagger: 0.1,
    onComplete() {
      gsap.to(chars, {
        delay: 3,
        duration: 2,
        opacity: 0,
        scale: 2,
        y: 80,
        rotationX: 180,
        rotationY: 0,
        transformOrigin: '0% 50% -100',
        ease: 'back',
        stagger: 0.1
      })
    }
  }, '+=3')
})