// Rolagem suave (Lenis) ligada ao GSAP; exposta em window para o resto do site poder pausar/retomar
const lenis = new Lenis;
window.lenis = lenis;
gsap.registerPlugin(ScrollTrigger), lenis.on("scroll", ScrollTrigger.update), gsap.ticker.add(time => {
  lenis.raf(time * 1e3)
}), gsap.ticker.lagSmoothing(0);
const overlay = document.querySelector(".overlay"),
  menuOverlay = document.querySelector(".overlay-menu"),
  parallaxHeros = document.querySelectorAll(".Hero_Wrapper .Parallax_Back_Hero");
window.innerWidth > 768 && parallaxHeros.forEach(parallaxHero2 => {
  gsap.timeline({
    scrollTrigger: {
      trigger: parallaxHero2,
      start: "top top",
      end: "bottom top",
      scrub: !0
    }
  }).to(parallaxHero2, {
    ease: "none",
    y: "70%"
  }), gsap.timeline({
    scrollTrigger: {
      trigger: parallaxHero2,
      start: "top top",
      end: "bottom top",
      scrub: !0
    }
  }).to(parallaxHero2.closest(".Hero_Wrapper"), {
    ease: "none",
    borderRadius: "0 0 5rem 5rem"
  })
});
const startParallaxBacks = document.querySelectorAll(".Parallax_Back_Start");
startParallaxBacks.forEach(item => {
  if (parallaxHeros[0] != item) {
    const displacement = item.dataset.pDisplace || "50%";
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top top",
        end: "bottom top",
        scrub: !0
      }
    }).to(item, {
      ease: "none",
      y: displacement
    })
  }
});
const parallaxBacks = document.querySelectorAll(".Parallax_Back");
parallaxBacks.forEach(item => {
  if (parallaxHeros[0] != item) {
    const displacement = item.dataset.pDisplace || "50%";
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: !0
      }
    }).to(item, {
      ease: "none",
      y: displacement
    })
  }
});
const parallaxFronts = document.querySelectorAll(".Parallax_Front");
parallaxFronts.forEach(item => {
  const displacement = item.dataset.pDisplace || "-75%";
  gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      scrub: !0
    }
  }).to(item, {
    ease: "none",
    y: displacement
  })
});
const parallaxHero = document.querySelector(".Hero_Wrapper.Parallax_Wrapper"),
  parallaxHeroFronts = document.querySelectorAll(".Parallax_Hero_Front");
parallaxHeroFronts.forEach(item => {
  const displacement = item.dataset.pDisplace || "-75%";
  gsap.timeline({
    scrollTrigger: {
      trigger: parallaxHero,
      start: "top top",
      end: "bottom top",
      scrub: !0
    }
  }).to(item, {
    ease: "none",
    y: displacement
  })
});
const darkSections = document.querySelectorAll(".Dark_Section");
darkSections.forEach(section => {
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top+=20px",
      end: "bottom top+=20px",
      onEnter: () => {
        setMenuColor("var(--beige)")
      },
      onEnterBack: () => {
        setMenuColor("var(--beige)")
      },
      onLeave: () => {
        setMenuColor("var(--dark)")
      },
      onLeaveBack: () => {
        setMenuColor("var(--dark)")
      }
    }
  })
});
const darkLogo = document.querySelector(".Logo_Dark"),
  lightLogo = document.querySelector(".Logo_Light"),
  menu = document.querySelector("header");

function setMenuColor(color) {
  document.documentElement.style.setProperty("--menu-text-color", color), color == "var(--beige)" ? (darkLogo.classList.remove("Shown"), lightLogo.classList.add("Shown"), menu.classList.remove("Filled")) : color == "var(--dark)" && (lightLogo.classList.remove("Shown"), darkLogo.classList.add("Shown"), menu.classList.add("Filled"))
}
const firstSection = document.querySelector("section");
firstSection.classList.contains(".Dark_Section") || setMenuColor("var(--dark)");
const imagesDisplayContainers = document.querySelectorAll(".Images_Display_Container");
imagesDisplayContainers.forEach(container => {
  gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      onEnter: () => {
        container.classList.add("Animate")
      }
    }
  })
});
const windowImages = document.querySelectorAll(".Window_Image");
let currentDelay = 0,
  currentParent = null;
windowImages.forEach(windowImage => {
  windowImage.closest("section") != currentParent ? (currentDelay = 0, currentParent = windowImage.closest("section")) : currentDelay += .15;
  const limit = windowImage.querySelector(".Window_Image_Limit"),
    container = windowImage.querySelector(".Window_Image_Container img");
  let delay = currentDelay;
  if (!windowImage.classList.contains("No_Anim")) {
    if (windowImage.classList.contains("Instant")) {
      gsap.to(limit, {
        scrollTrigger: {
          trigger: windowImage,
          start: "top bottom-=100px"
        },
        ease: "power2.out",
        width: "100%",
        height: "100%",
        duration: .75,
        delay
      }), gsap.to(container, {
        scrollTrigger: {
          trigger: windowImage,
          start: "top bottom-=100px"
        },
        ease: "power1.out",
        scale: "1",
        duration: .8,
        delay
      });
      return
    }
    gsap.timeline({
      scrollTrigger: {
        trigger: windowImage,
        start: "top bottom",
        end: "bottom center+=200px",
        scrub: !0
      }
    }).to(limit, {
      ease: "power1.out",
      width: "100%",
      height: "100%"
    }), gsap.timeline({
      scrollTrigger: {
        trigger: windowImage,
        start: "top bottom",
        end: "top center",
        scrub: !0
      }
    }).to(container, {
      ease: "linear",
      scale: "1"
    })
  }
});
const collectionCTAButtons = document.querySelectorAll(".Collections_CTA_Button");
collectionCTAButtons.forEach(button => {
  gsap.to(button, {
    scrollTrigger: button,
    scale: 1.2,
    ease: "expo.out",
    duration: 1.5
  })
});
const dynamicSeparators = document.querySelectorAll(".Dynamic_Separator"),
  footer = document.querySelector("footer");
dynamicSeparators.forEach(separator => {
  const path = separator.querySelector(".Dynamic_Path"),
    target = path.dataset.target;
  gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "top bottom+=150px",
      end: "bottom bottom",
      scrub: !0
    }
  }).to(path, {
    ease: "linear",
    attr: {
      d: target
    }
  })
});
const arches = document.querySelectorAll(".Arches_Display_Container .Window_Image");
for (let i = 0; i < 3; i++) {
  let pattern = coinFlip();
  for (let index = i * arches.length / 6; index < i * arches.length / 6 + arches.length / 6; index++) {
    const arch = arches[index],
      archCopy = arches[index + arches.length / 2];
    pattern ? (random = index % 2, arch.style.setProperty("--random", random), archCopy.style.setProperty("--random", random)) : (random = (index + 1) % 2, arch.style.setProperty("--random", random), archCopy.style.setProperty("--random", random))
  }
}

function coinFlip() {
  return Math.random() < .5
}
// Seletor de quantidade (+ / -) dos formulários de produto
const quantitySelectors = document.querySelectorAll(".Quantity_Selector");
quantitySelectors.forEach(selector => {
  const minus = selector.querySelector(".Minus_Button"),
    plus = selector.querySelector(".Plus_Button"),
    input = selector.querySelector("input");
  let count = parseInt(input.value);
  plus.addEventListener("click", add), minus.addEventListener("click", remove);

  function add() {
    count = Math.min(999, count + 1), input.value = count, input.dispatchEvent(new Event("change"))
  }

  function remove() {
    count = Math.max(1, count - 1), input.value = count, input.dispatchEvent(new Event("change"))
  }
});
const tabs = document.querySelectorAll(".Collection_Browser_Tab_Button"),
  containers = document.querySelectorAll(".Collection_Browser_Products_Container");
let canUseTabs = !0;
tabs.forEach(tab => {
  const id = tab.dataset.id,
    container = document.querySelector(`.Collection_Browser_Products_Container[data-id='${id}']`);
  tab.addEventListener("click", onTabClick);

  function onTabClick(e) {
    canUseTabs && !tab.classList.contains("Selected") && (canUseTabs = !1, updateTabs(e), updateContainers(e))
  }

  function updateTabs(e) {
    tabs.forEach(t => {
      t != tab && t.classList.remove("Selected")
    }), tab.classList.add("Selected")
  }

  function updateContainers(e) {
    containers.forEach(c => {
      if (c != container && c.classList.contains("Open")) {
        const products = c.querySelectorAll(".Collection_Browser_Product_Page.Open .Collection_Browser_Product form");
        setTimeout(() => {
          container.classList.add("Open"), c.classList.remove("Open")
        }, 1200), hideProducts(products)
      }
    });
    const newProducts = container.querySelectorAll(".Collection_Browser_Product_Page.Open .Collection_Browser_Product form");
    showProducts(newProducts, () => {
      canUseTabs = !0, ScrollTrigger.refresh(), window.dispatchEvent(new Event("resize"))
    })
  }
});

function hideProducts(products) {
  gsap.to(products, {
    onStart: () => {
      products.forEach(p => {
        p.style.transformOrigin = "top left"
      })
    },
    stagger: {
      amount: .4
    },
    duration: .5,
    y: "101%",
    rotation: 15,
    ease: "power3.in"
  })
}

function showProducts(products, callback) {
  products.forEach(p => {
    p.style.transformOrigin = "top right"
  }), gsap.fromTo(products, {
    y: "101%",
    rotation: -15
  }, {
    delay: 1.2,
    stagger: {
      amount: .4
    },
    duration: .5,
    y: "0%",
    rotation: 0,
    ease: "expo.out",
    onComplete: callback
  })
}
containers.forEach(container => {
  const allPages = Array.from(container.querySelectorAll(".Collection_Browser_Product_Page")).filter(p => p.querySelector(".Collection_Browser_Product")),
    prevBtn = container.querySelector(".Collection_Browser_Arrow.Left");
  allPages.length < 2 && container.querySelectorAll(".Collection_Browser_Arrow").forEach(a => a.style.display = "none");
  prevBtn.addEventListener("click", prev);
  const nextBtn = container.querySelector(".Collection_Browser_Arrow.Right");
  nextBtn.addEventListener("click", next);
  let currentPage = 0;

  function prev() {
    changePage(currentPage - 1)
  }

  function next() {
    changePage(currentPage + 1)
  }

  function changePage(p) {
    p >= 0 && p < allPages.length && (currentPage = p, canUseTabs = !1, update())
  }

  function update() {
    allPages.forEach(p => {
      if (p.dataset.page != currentPage) {
        const products = p.querySelectorAll(".Collection_Browser_Product form");
        hideProducts(products), setTimeout(() => {
          p.classList.remove("Open")
        }, 1200)
      } else if (p.dataset.page == currentPage) {
        const products = p.querySelectorAll(".Collection_Browser_Product form");
        showProducts(products, () => {
          canUseTabs = !0, ScrollTrigger.refresh(), window.dispatchEvent(new Event("resize"))
        }), setTimeout(() => {
          p.classList.add("Open")
        }, 1200)
      }
    }), currentPage == 0 ? prevBtn.classList.add("Disabled") : prevBtn.classList.remove("Disabled"), currentPage >= allPages.length - 1 ? nextBtn.classList.add("Disabled") : nextBtn.classList.remove("Disabled")
  }
  update()
});
const anchorLinks = document.querySelectorAll("a[href*='#']");
anchorLinks.forEach(link => {
  link.href.includes("FeaturedAnchor") || link.hash.split("")[0] == "#" && link.href != "#" && link.addEventListener("click", e => {
    e.preventDefault(), lenis.scrollTo(link.hash, {
      offset: -120
    })
  })
});
const fixedProductAdd = document.querySelector(".Product_Hero_Fixed"),
  fixedProductTarget = document.querySelector(".Product_Second_Image");
if (fixedProductAdd != null) {
  let checkAnchor2 = function() {
    let bounding = fixedProductTarget.getBoundingClientRect(),
      diff = windowHeight - bounding.bottom - windowBotPadding;
    diff >= 0 && (fixedProductAdd.style.bottom = Math.max(0, diff) + "px")
  };
  var checkAnchor = checkAnchor2;
  let anchored = !1,
    windowBotPadding = window.innerWidth / 25,
    windowHeight = window.innerHeight;
  window.addEventListener("resize", e => {
    if (windowHeight != window.innerHeight) {
      windowHeight = window.innerHeight;
      return
    }
    windowBotPadding = window.innerWidth / 25, windowHeight = window.innerHeight, fixedProductAdd.style.maxWidth = fixedProductTarget.getBoundingClientRect().width + "px"
  }), fixedProductAdd.style.maxWidth = fixedProductTarget.getBoundingClientRect().width + "px", lenis.on("scroll", e => {
    checkAnchor2()
  })
}
const wordAnims = document.querySelectorAll(".Cool_Text_Anim.Words"),
  format = /[^0-9A-Za-zÀ-ÖØ-öø-ÿ\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g;
wordAnims.forEach(anim => {
  let text = anim.textContent.split(" ");
  text.ariaLabel = anim.textContent, anim.textContent = "";
  let spans = [];
  text.forEach(t => {
    const newT = t.replace(format, "");
    if (newT.length !== 0) {
      let span = document.createElement("span");
      span.ariaHidden = "true", span.classList.add("Word");
      let innerSpan = document.createElement("span");
      innerSpan.textContent = newT, spans.push(innerSpan), span.appendChild(innerSpan), anim.appendChild(span)
    }
  }), gsap.from(spans, {
    delay: .3,
    scrollTrigger: anim,
    stagger: {
      amount: .5
    },
    ease: "expo.out",
    duration: 1.5,
    rotation: 12,
    y: "101%"
  })
});
// Títulos animados linha a linha. As quebras de linha agora são lidas do próprio layout do navegador
// (antes eram estimadas com um canvas, o que errava e deixava palavras vazando da tela). Só roda depois
// que a fonte carregou e refaz a divisão quando a largura da tela muda (girar o celular, redimensionar).
const lineAnims = document.querySelectorAll(".Cool_Text_Anim.Lines");
lineAnims.forEach(anim => {
  const original = anim.textContent.replace(/\s+/g, " ").trim();
  if (!original) return;
  anim.ariaLabel = original;
  let tween = null,
    lastWidth = -1;

  function setupLines() {
    const width = Math.round(anim.getBoundingClientRect().width);
    if (width === lastWidth) return;
    lastWidth = width;
    tween && (tween.scrollTrigger && tween.scrollTrigger.kill(), tween.kill(), tween = null);
    // 1) coloca as palavras em linha corrida para o navegador decidir onde quebrar
    anim.innerHTML = "";
    anim.classList.add("Measuring");
    const wordEls = original.split(" ").filter(w => w.replace(format, "").length !== 0).map(w => {
      const span = document.createElement("span");
      span.textContent = w;
      anim.appendChild(span);
      return span
    });
    // 2) agrupa por linha pela posição vertical de cada palavra
    const rows = [];
    let lastTop = null;
    wordEls.forEach(w => {
      const top = w.offsetTop;
      (lastTop === null || Math.abs(top - lastTop) > 2) && (rows.push([]), lastTop = top), rows[rows.length - 1].push(w.textContent)
    });
    // 3) monta a estrutura final: cada linha com sua máscara
    anim.innerHTML = "";
    anim.classList.remove("Measuring"), anim.classList.add("Split");
    const inners = rows.map(words => {
      const inner = document.createElement("span"),
        line = document.createElement("span");
      words.forEach(t => {
        const w = document.createElement("span");
        w.textContent = t, inner.appendChild(w)
      });
      line.classList.add("Line"), line.ariaHidden = "true", line.appendChild(inner), anim.appendChild(line);
      return inner
    });
    tween = gsap.from(inners, {
      delay: .3,
      scrollTrigger: anim,
      stagger: {
        amount: .3
      },
      ease: "expo.out",
      duration: 1.2,
      rotation: 12,
      y: "101%"
    })
  }
  // espera a fonte do título carregar (senão a medição usa a fonte reserva e erra as quebras de linha)
  const cs = window.getComputedStyle(anim, null),
    fontSpec = `${cs.getPropertyValue("font-weight")} ${cs.getPropertyValue("font-size")} ${cs.getPropertyValue("font-family")}`,
    fontReady = document.fonts && document.fonts.load ? document.fonts.load(fontSpec, original).catch(() => {}) : Promise.resolve();
  Promise.race([fontReady, new Promise(r => setTimeout(r, 2500))]).then(setupLines);
  let resizeTimer, pageWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (pageWidth === window.innerWidth) return;
    pageWidth = window.innerWidth, clearTimeout(resizeTimer), resizeTimer = setTimeout(setupLines, 200)
  })
});
const animsGrow = document.querySelectorAll(".Cool_Anim.Grow");
animsGrow.forEach(anim => {
  gsap.from(anim, {
    scrollTrigger: anim,
    duration: 1,
    scale: .6,
    delay: .5,
    ease: "expo.out"
  })
});
const fadeAnims = document.querySelectorAll(".Cool_Anim.Fade");
fadeAnims.forEach(anim => {
  gsap.from(anim, {
    scrollTrigger: anim,
    duration: 1,
    opacity: 0,
    y: "4rem",
    delay: .5,
    ease: "expo.out"
  })
});
const fadeAnimsMultiple = document.querySelectorAll(".Cool_Anim.Fade.Multiple");
fadeAnimsMultiple.forEach(anim => {
  const elems = anim.querySelectorAll(".Cool_Anim>div");
  gsap.from(elems, {
    scrollTrigger: anim,
    stagger: {
      amount: .4
    },
    duration: 1,
    opacity: 0,
    y: "4rem",
    delay: .5,
    ease: "expo.out"
  })
});
const menuGrowAnims = document.querySelectorAll(".Grow_Anim"),
  measureCtx = document.createElement("canvas").getContext("2d");
menuGrowAnims.forEach(anim => {
  const text = anim.textContent.split("");
  anim.ariaLabel = anim.textContent, anim.textContent = "";
  let wordSpan = document.createElement("span");
  wordSpan.classList.add("word"), wordSpan.ariaHidden = !0;
  let wordLength = 0;
  const cs = window.getComputedStyle(anim, null),
    fontWeight = cs.getPropertyValue("font-weight") || "normal",
    fontSize = cs.getPropertyValue("font-size"),
    fontFamily = cs.getPropertyValue("font-family") || "Times New Roman";
  measureCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  text.forEach(letter => {
    if (letter == " ") wordSpan.style.minWidth = wordLength + "px", anim.appendChild(wordSpan), wordSpan = document.createElement("span"), wordSpan.classList.add("word"), wordSpan.ariaHidden = !0, wordLength = 0;
    else {
      const span = document.createElement("span");
      span.classList.add("letter"), span.textContent = letter, wordSpan.appendChild(span), wordLength += measureCtx.measureText(letter).width, wordLength += 3
    }
  }), wordSpan.innerHTML != "" && (wordSpan.style.minWidth = wordLength + "px", anim.appendChild(wordSpan))
});
const textPathAnims = document.querySelectorAll(".Collections_CTA_Title_SVG");
textPathAnims.forEach(anim => {
  const text = anim.querySelector("textPath");
  gsap.timeline({
    scrollTrigger: {
      trigger: anim,
      start: "top bottom+=40",
      end: "bottom top",
      scrub: !0
    }
  }).to(text, {
    ease: "linear",
    attr: {
      startOffset: 20
    }
  })
});
let pageIsLoaded = !1;
const pageLoadAnim = gsap.timeline({
    paused: !0
  }),
  pageHideAnim = gsap.timeline({
    paused: !0
  }),
  pageLoad = document.querySelector(".pageload .anim-path"),
  pageHide = document.querySelector(".pagehide .anim-path");
pageLoadAnim.to(pageLoad, {
  duration: 1.2,
  attr: {
    d: pageLoad.dataset.endPath
  },
  ease: "power2.inOut"
}), pageHideAnim.to(pageHide, {
  duration: 1.2,
  attr: {
    d: pageHide.dataset.endPath
  },
  ease: "power2.inOut"
}), document.addEventListener("DOMContentLoaded", () => {
  onHeroLoaded(() => {
    pageLoadAnim.play(), clearInterval(pageLoadInterval), initDynamicFavicon()
  })
});
const pageLinks = document.querySelectorAll("a"),
  isMobileNav = () => window.matchMedia("(max-width:768px)").matches,
  reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
pageLinks.forEach(link => {
  const href = link.href,
    attr = Array.from(link.attributes),
    hasData = a => a.name.includes("data");
  attr.some(hasData) || !href.includes(window.location.origin) || href == window.location.href || href.includes("#") || link.addEventListener("click", function(e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === "_blank" || isMobileNav() || reduceMotion()) return;
    e.preventDefault(), pageHideAnim.play(), setTimeout(() => {
      window.location = href
    }, 800)
  })
});
// voltar/avançar do navegador: a página volta do cache sem a cortina branca por cima
window.addEventListener("pageshow", e => {
  e.persisted && pageHideAnim.pause(0)
});
let pageLoadInterval = setInterval(() => {
  pageIsLoaded && onHeroLoaded(() => {
    pageLoadAnim.play(), clearInterval(pageLoadInterval), initDynamicFavicon()
  })
}, 200);
async function onHeroLoaded(callback) {
  const heroImage = document.querySelector(".Hero_Back_Img img");
  if (heroImage == null || heroImage.complete) {
    callback();
    return
  }
  let timeout = setTimeout(callback, 2e3);
  heroImage.addEventListener("load", e => {
    clearTimeout(timeout), callback()
  }), heroImage.addEventListener("error", () => {
    clearTimeout(timeout), callback()
  })
}
const parallaxImgs = document.querySelectorAll(".Parallax_Image");
parallaxImgs.forEach(img => {
  gsap.timeline({
    scrollTrigger: {
      trigger: img,
      start: "top bottom",
      end: "bottom top",
      scrub: !0
    }
  }).from(img, {
    ease: "linear",
    y: "-20%"
  })
});
const timelines = document.querySelectorAll(".Timeline_Line");
timelines.forEach(timeline => {
  const inner = timeline.querySelector(".Timeline_Inner"),
    anchors = timeline.querySelectorAll(".Timeline_Anchor");
  gsap.timeline({
    scrollTrigger: {
      trigger: timeline,
      start: "top center+=100px",
      end: "bottom center+=100px",
      scrub: !0
    }
  }).to(inner, {
    ease: "linear",
    height: "100%"
  }), anchors.forEach(a => {
    ScrollTrigger.create({
      trigger: a,
      start: () => "top center+=100px",
      end: () => "bottom center+=100px",
      onEnter: () => a.classList.add("Passed"),
      onLeaveBack: () => a.classList.remove("Passed")
    })
  })
});
class Queue {
  constructor() {
    this.queue = []
  }
  enqueue(element) {
    return this.queue.push(element)
  }
  dequeue() {
    if (this.queue.length > 0) return this.queue.shift()
  }
  peek() {
    return this.queue[this.queue.length - 1]
  }
  size() {
    return this.queue.length
  }
  isEmpty() {
    return this.queue.length == 0
  }
  clear() {
    this.queue = []
  }
}
const imageDisplayContainers = document.querySelectorAll(".Images_Display_Container");
imageDisplayContainers.forEach(container => {
  let imagesQueue = new Queue;
  const nodeQueue = container.querySelector(".Images_Queue"),
    baseQueue = nodeQueue.querySelectorAll("img"),
    allDisplays = container.querySelectorAll(".Image_Display");
  baseQueue.forEach(node => {
    imagesQueue.enqueue(node)
  }), allDisplays.forEach(display => {
    display.appendChild(imagesQueue.dequeue())
  });
  let interval = setInterval(changeImages, 8e3);

  function changeImages() {
    allDisplays.forEach((display, i) => {
      let current = display.querySelector("img"),
        next = imagesQueue.dequeue();
      next.classList.add("Left"), next.classList.remove("Behind"), display.appendChild(next), setTimeout(() => {
        next.classList.remove("Left"), current.classList.add("Behind")
      }, 200 + i * 120), setTimeout(() => {
        nodeQueue.appendChild(current), imagesQueue.enqueue(current)
      }, 5e3)
    })
  }
});
const favicon = document.querySelector("#favicon"),
  baseHref = favicon.href;
let faviconInterval;

function initDynamicFavicon() {
  setTimeout(() => {
    clearInterval(faviconInterval);
    let i = 1;
    faviconInterval = setInterval(() => {
      switch (i) {
        case 1:
          favicon.setAttribute("href", window.favicon1);
          break;
        case 2:
          favicon.setAttribute("href", window.favicon2);
          break;
        default:
          favicon.setAttribute("href", baseHref);
          break
      }
      i++, i > 2 && (i = 0)
    }, 1200)
  }, 1e3)
}
const mouseTrackers = document.querySelectorAll(".Relative_To_Mouse");
// A posição só é lida quando o mouse entra/sai (antes era recalculada em todo scroll/resize de cada
// elemento, o que forçava o navegador a refazer o layout a cada quadro de rolagem).
mouseTrackers.forEach(tracker => {
  function onEnterLeave(e) {
    const box = tracker.getBoundingClientRect();
    tracker.style.setProperty("--mouse-x", `${e.clientX - box.left}px`), tracker.style.setProperty("--mouse-y", `${e.clientY - box.top}px`)
  }
  tracker.addEventListener("mouseenter", onEnterLeave), tracker.addEventListener("mouseleave", onEnterLeave)
});
const burgerMenu = document.querySelector(".Menu_Drawer"),
  burgerBtns = document.querySelectorAll("a[data-action*='open-side-menu'], button[data-action*='open-side-menu']"),
  closeMenuBtns = document.querySelectorAll("a[data-action*='close-side-menu'], button[data-action*='close-side-menu']");
burgerBtns.forEach(btn => {
  btn.addEventListener("click", onBtnClick);

  function onBtnClick(e) {
    e.preventDefault(), burgerMenu.classList.add("open"), lenis.stop()
  }
}), closeMenuBtns.forEach(btn => {
  btn.addEventListener("click", onBtnClick);

  function onBtnClick(e) {
    e.preventDefault(), burgerMenu.classList.remove("open"), lenis.start()
  }
});
const allCollectionProducts = document.querySelectorAll(".Collection_Product");
allCollectionProducts.forEach((product, id) => {
  let pos = id % 3,
    rowBros = [];
  switch (pos) {
    case 0:
      allCollectionProducts.length > id + 1 && rowBros.push(allCollectionProducts[id + 1]), allCollectionProducts.length > id + 2 && rowBros.push(allCollectionProducts[id + 2]);
      break;
    case 1:
      rowBros.push(allCollectionProducts[id - 1]), allCollectionProducts.length > id + 1 && rowBros.push(allCollectionProducts[id + 1]);
      break;
    case 2:
      rowBros.push(allCollectionProducts[id - 1]), rowBros.push(allCollectionProducts[id - 2]);
      break;
    default:
      break
  }
  let maxHeight = product.querySelector(".Product_Item_Title").getBoundingClientRect().height;
  rowBros.forEach(bro => {
    maxHeight = Math.max(maxHeight, bro.querySelector(".Product_Item_Title").getBoundingClientRect().height)
  }), rowBros.forEach(bro => {
    bro.querySelector(".Product_Item_Title").style.height = maxHeight + "px"
  })
});
const productMediaCarousels = document.querySelectorAll(".Product_Media");
productMediaCarousels.forEach(carousel => {
  const mainMedia = Array.from(carousel.querySelectorAll(".Main_Image")),
    toggles = Array.from(carousel.querySelectorAll(".Additional_Image"));
  let activeMedia = mainMedia.find(m => m.classList.contains("Active"));
  const defaultId = mainMedia.indexOf(activeMedia);
  let activeToggle = toggles[defaultId];
  activeToggle.classList.add("Active");
  let canClick = !0;

  function setDefault() {
    prepareMedias(), setActive(defaultId)
  }

  function setActive(id) {
    prepareMedias(), activeMedia = mainMedia[id], activeMedia.classList.add("Active"), activeToggle = toggles[id], activeToggle.classList.add("Active")
  }

  function prepareMedias() {
    canClick = !1;
    const lastMedia = activeMedia,
      lastToggle = activeToggle;
    lastMedia.classList.add("Deactive"), lastToggle.classList.remove("Active"), setTimeout(() => {
      lastMedia.classList.remove("Active"), lastMedia.classList.remove("Deactive"), canClick = !0
    }, 1010)
  }
  toggles.forEach((t, i) => {
    t.addEventListener("click", () => {
      canClick && t.classList.contains("Active") && i != defaultId ? setDefault() : canClick && !t.classList.contains("Active") && setActive(i)
    })
  })
});
document.addEventListener("DOMContentLoaded", () => {
  const footerWrapper = document.querySelector(".Footer_Wrapper"),
    footer2 = document.querySelector(".Footer_Wrapper footer");
  if (!footerWrapper) return;

  function onResize() {
    const footerHeight = footer2.offsetHeight;
    footerHeight < window.innerHeight ? (document.querySelector(".Footer_Space").style.height = `${footerHeight}px`, footerWrapper.classList.add("Fixed")) : (document.querySelector(".Footer_Space").style.height = "0", footerWrapper.classList.remove("Fixed"))
  }
  onResize(), window.addEventListener("resize", onResize)
});
