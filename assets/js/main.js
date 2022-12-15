/**
* Template Name: Personal - v4.9.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function( callback ) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

// helper functions
function randomMax(max) {
	return ~~(Math.random() * max);
}

var canvas = document.getElementById('mainCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

// globals
var twoPi = 2 * Math.PI,
	numShips = 100,
	shipTypes = [],
	shipSize = 4,
	trailLineWidth = 1,
	fireTrailWidth = 3,
	weaponPrecisionFactor = 8;

shipTypes.push({
	color : '#CAD8DB',
	warpTrailColor : 'rgba(141, 189, 240, 0.5)',
	trailLife : 30,
	impulseSpeedMax : 3,
	newDirectionCycle : 40,
	warpCycleMin : 350,
	warpCycleVar : 900,
	range : 33,
	fireColor : 'rgba(237, 209, 133, 0.8)',
	fireRecharge : 40,
	fireDischarge : 10
});

shipTypes.push({
	color : '#4E8258',
	warpTrailColor : 'rgba(111, 242, 63, 0.5)',
	trailLife : 50,
	impulseSpeedMax : 2,
	newDirectionCycle : 40,
	warpCycleMin : 500,
	warpCycleVar : 900,
	range : 30,
	fireColor : 'rgba(0, 255, 119, 0.8)',
	fireRecharge : 50,
	fireDischarge : 15
});

shipTypes.push({
	color : '#2CA3B0',
	warpTrailColor : 'rgba(232, 140, 74, 0.5)',
	trailLife : 40,
	impulseSpeedMax : 2,
	newDirectionCycle : 40,
	warpCycleMin : 700,
	warpCycleVar : 900,
	range : 40,
	fireColor : 'rgba(32, 222, 232, 0.8)',
	fireRecharge : 40,
	fireDischarge : 10
});



var Trail = function (x1, y1, x2, y2, color, trailTime) {
	this.x2 = x2;
	this.y2 = y2;

	this.x1 = x1;
	this.y1 = y1;

	this.color = color;

	var dy = (y2 - y1);
	var dx = (x2 - x1);
	this.angle = Math.atan2(dy, dx);

	var trailLifedelta = (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / trailTime);
	this.dx =  trailLifedelta * Math.cos(this.angle);
	this.dy = trailLifedelta * Math.sin(this.angle);

	this.next = undefined;
	this.previous = undefined;
};
Trail.prototype.draw = function () {

	this.x1 += this.dx;
	this.y1 += this.dy;

	ctx.strokeStyle = this.color;
	ctx.lineWidth = trailLineWidth;
	ctx.beginPath();
	var trailWidth = ~~(shipSize / 2);
	ctx.moveTo(this.x1 - trailWidth , this.y1 - trailWidth);
	ctx.lineTo(this.x2 - trailWidth, this.y2 - trailWidth);
	ctx.moveTo(this.x1 + trailWidth , this.y1 + trailWidth);
	ctx.lineTo(this.x2 + trailWidth, this.y2 + trailWidth);
	ctx.stroke();

	var dy = (this.y2 - this.y1);
	var dx = (this.x2 - this.x1);

	var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

	if (distance < 3) {
		this.next = null;
		if (this.previous) {
			this.previous.next = this.next;
		} else {
			trails.head = null;
		}
	}
};

var Trails = function () {
	this.head = null;
};
Trails.prototype.add = function (x1, y1, x2, y2, color, trailTime) {

	var newTrail = new Trail(x1, y1, x2, y2, color, trailTime);

	if (this.head === null) {
		this.head = newTrail;
	} else {
		this.head.previous = newTrail;
		newTrail.next = this.head;
		this.head = newTrail;
	}
};
Trails.prototype.draw = function () {
	var p = this.head;
	while (p) {
		p.draw();
		p = p.next;
	}
};

var trails = new Trails();

var Ship = function () {
	this.x = ~~(Math.random() * canvas.width);
	this.y = ~~(Math.random() * canvas.height);

	this.pickNewDirection();
	this.shipClass = ~~(Math.random() * shipTypes.length);

	var shipType = shipTypes[this.shipClass];

	this.color = shipType.color;
	this.warpTrailColor = shipType.warpTrailColor;
	this.trailLife = shipType.trailLife;

	this.size = shipSize;
	this.newDirectionCounter = 1;
	this.newDirectionCycle = shipType.newDirectionCycle;
	this.impulseSpeedMax = shipType.impulseSpeedMax;

	this.warpCycleCounter = 1;
	this.warpCycle = shipType.warpCycleMin + (~~(Math.random() * shipType.warpCycleVar));

	this.range = shipType.range;
	this.fireColor = shipType.fireColor;
	this.fireRecharge = shipType.fireRecharge;
	this.fireCounter = 0;
	this.fireDischarge = shipType.fireDischarge;
	this.fireDischargeCounter = 0;
	this.target = null;
	this.weaponOffsetx = ~~(weaponPrecisionFactor * (Math.random() - 0.5));
	this.weaponOffsety = ~~(weaponPrecisionFactor * (Math.random() - 0.5));
};
Ship.prototype.draw = function (index) {

	this.newDirectionCounter = (this.newDirectionCounter + 1) % this.newDirectionCycle;

	if (this.newDirectionCounter === 0) {
		this.pickNewDirection();
	}

	this.x += this.dx;
	this.y += this.dy;

	if (this.x <= 0) {
		this.x = 0;
		this.pickNewDirection();
	}
	if (this.x >= canvas.width) {
		this.x = canvas.width;
		this.pickNewDirection();
	}
	if (this.y <= 0) {
		this.y = 0;
		this.pickNewDirection();
	}
	if (this.y >= canvas.height) {
		this.y = canvas.height;
		this.pickNewDirection();
	}

	this.warpCycleCounter = (this.warpCycleCounter + 1) % this.warpCycle;

	if (this.warpCycleCounter === 0) {
		var oldx = this.x;
		var oldy = this.y;

		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		trails.add(oldx, oldy, this.x, this.y, this.warpTrailColor, this.trailLife);
		// stop the ship after warp
		this.dx = 0;
		this.dy = 0;
	}

	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, twoPi);
	ctx.fill();

	if (this.fireCounter > 0) {
		this.fireCounter--;
	} else {
		// find first enemy in the range and shoot at it
		for (var k = 0; k < ships.length; k++) {
			if (ships[k].shipClass !== this.shipClass) {
				var distance = Math.sqrt(Math.pow(ships[k].x - this.x, 2) + Math.pow(ships[k].y - this.y, 2));
				if (distance < this.range) {
					this.target = ships[k];
					this.fireCounter = this.fireRecharge;
					this.fireDischargeCounter = this.fireDischarge;

					break;
				}
			}
		}
	}

	if (this.fireDischargeCounter > 0 && this.target) {
		this.fireDischargeCounter--;

		ctx.lineWidth = fireTrailWidth;

		var firedistance = Math.sqrt(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2));
		if (firedistance < this.range) {
			ctx.beginPath();
			ctx.strokeStyle = this.fireColor;
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.target.x + this.weaponOffsetx, this.target.y + this.weaponOffsety);
			ctx.stroke();
		}
	} else {
		this.target = null;
	}
};
Ship.prototype.pickNewDirection = function () {
	this.dx = ~~((0.5 - Math.random()) * 2 * this.impulseSpeedMax);
	this.dy = ~~((0.5 - Math.random()) * 2 * this.impulseSpeedMax);
};
var ships = [];

for (var i = 0; i < numShips; i++) {
	ships.push(new Ship());
}

window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

(function animloop(){
	requestAnimFrame(animloop);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	trails.draw();
	for (var i = 0; i < ships.length; i++) {
		ships[i].draw(i);
	}
})();

