//Define object of different product mixers end timing  in min
let mixers = {
    'cerament-g': [
        {title:'MIXING',duration: 0.5}, //start from 0 ends after 30s
        {title:'Transfer paste to ID-syringe',duration: 1},
        {title:'WAIT',duration: 4},
        {title:'INJECT',duration: 7},
        {title:'SETTING',duration: 15},
        {title:'WOUND CLOSURE DRILLING AND SCREW INSERTION',duration: 0}
    ],
    'cerament-v': [
        {title:'MIX',duration: 0.5},
        {title:'WAIT',duration: 3},
        {title:'INJECT',duration: 5},
        {title:'WAIT',duration: 8},
        {title:'MOLD',duration: 10},
        {title:'WAIT',duration: 15},
        {title:'CLOSE WOUND',duration: 0}
    ],
    'cerament-bvf': [
        {title:'MIX',duration: 0.5},
        {title:'WAIT',duration: 3},
        {title:'INJECT',duration: 5},
        {title:'WAIT',duration: 7},
        {title:'INITIATE MOLDING (max 1 min)',duration: 9},
        {title:'WAIT',duration: 15},
        {title:'DRILLING & SCREW INSERTION',duration: 0}
    ]
}
function createMixtureTimer(ID,element) {
    const parentElement = document.getElementById(element);
    parentElement.querySelector('button').style.display = 'none'
    // create a div element with class and id attributes
    const mixingTimer = document.createElement('div');
    mixingTimer.className = 'mixing-timer';
    mixingTimer.id = `mixing-timer-${ID}`;

    // create a select element with class and onChange attributes
    const selectProduct = document.createElement('select');
    selectProduct.className = 'select-product';
    selectProduct.setAttribute('onChange', "update('mixing-timer-" + ID + "')");

    //button and timer
    const timer = document.createElement('div');
    timer.className = 'timer';
    const controls = document.createElement('div');
    controls.className = 'controls';
    const playBtn = document.createElement('button');
    playBtn.id = `playbtn-no-${ID}`;
    playBtn.className = 'play';
    playBtn.setAttribute('type','button')
    playBtn.setAttribute('onClick', "countdown('mixing-timer-" + ID + "','playbtn-no-" + ID + "','resetbtn-no-" + ID + "')");
    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('style','display:none');
    resetBtn.setAttribute('type','button');
    resetBtn.id = `resetbtn-no-${ID}`;
    resetBtn.className = 'reset';
    controls.appendChild(playBtn);
    controls.appendChild(resetBtn);
    const countdown = document.createElement('div');
    countdown.className = 'countdown';
    countdown.innerHTML = '00:00';
    timer.appendChild(controls);
    timer.appendChild(countdown);



    // create option elements and add them to the select element
    const option1 = document.createElement('option');
    option1.value = '';
    option1.textContent = 'Select a product mixing timer';

    const option2 = document.createElement('option');
    option2.value = 'cerament-g';
    option2.textContent = 'CERAMENT G';

    const option3 = document.createElement('option');
    option3.value = 'cerament-v';
    option3.textContent = 'CERAMENT V';

    const option4 = document.createElement('option');
    option4.value = 'cerament-bvf';
    option4.textContent = 'CERAMENT BVF';

    selectProduct.appendChild(option1);
    selectProduct.appendChild(option2);
    selectProduct.appendChild(option3);
    selectProduct.appendChild(option4);

    // create div elements with class attributes
    const selectProductLabel = document.createElement('div');
    selectProductLabel.className = 'select-product-label';

    const progressWrap = document.createElement('div');
    progressWrap.className = 'progress-wrap';

    // add the elements to the mixingTimer div element
    mixingTimer.appendChild(selectProduct);
    mixingTimer.appendChild(selectProductLabel);
    mixingTimer.appendChild(timer);
    mixingTimer.appendChild(progressWrap);
    
    parentElement.appendChild(mixingTimer);
}
//function hasClass in JS
    function hasClass(el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }
//function for declaring dynamic variables
function selectMixer(element) {
    if(hasClass(element, "cerament-g")) {
      return mixers["cerament-g"]
    }
    if(hasClass(element, "cerament-v")) {
      return mixers["cerament-v"]
    }
    if(hasClass(element, "cerament-bvf")) {
      return mixers["cerament-bvf"]
    }
    
}
//function for update select box
function update(element) {
    let wrapper = document.getElementById(element);
    let select = wrapper.querySelector('.select-product')
    let option = select.options[select.selectedIndex];
    let progress = wrapper.querySelector('.progress-wrap')
    wrapper.className = `${option.value} mixing-timer active`;
    if(option.value !== '') {
            wrapper.querySelector('.select-product-label').innerHTML = option.text 
            select.style.display = 'none'
            createProgress(progress,selectMixer(wrapper))
    }	
    
}
//countdown function
function countdown(wrapperId,playbtnId,resetbtnId) {
    let wrapper = document.getElementById(wrapperId);
    var el1 = document.getElementById(playbtnId);
    var el2 = document.getElementById(resetbtnId);
    var el = wrapper.querySelector('.countdown')
    el1.style.display = 'none'
    let minutes = selectMixer(wrapper)[selectMixer(wrapper).length - 2]['duration'];

    var sec = 0, min = 0, hour = 0, progress=0, step='';
    var interval = setInterval(function() {
			progress++;
			sec++;  
			if(sec==60) {
					sec = 0;
					min++;
			}
			if(min == 60) {
					min = 0;
					hour++
			}

			if(min === minutes) {

					progress = 0;
							el.innerHTML = `Closure!`
							el2.style.display = 'none'
							clearInterval(interval);
							return;
					}
			
			for(let i=0;i<selectMixer(wrapper).length;i++) {
					step = selectMixer(wrapper)[i]['title'];
					if(i !== 0) {
							const timeduration = selectMixer(wrapper)[i]['duration']*60 - selectMixer(wrapper)[i - 1]['duration']*60;
							if(progress <= selectMixer(wrapper)[i]['duration']*60 && progress == selectMixer(wrapper)[i - 1]['duration']*60) {
							wrapper.querySelector(`.progressbar${i} div`).style.animation = `mymove ${timeduration}s`
							wrapper.querySelector(`.progressbar${i} div`).style.width = '100%'
							wrapper.querySelector(`.progressbar${eval(i)} div`).classList.add("completed"); 
							}
					}
					else {
							wrapper.querySelector(`.progressbar${i} div`).style.animation = `mymove ${selectMixer(wrapper)[i]['duration']*60}s`
							wrapper.querySelector(`.progressbar${i} div`).style.width = '100%'
					}	
			}
				minText= min ? min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}): '00';
				secText= sec ? sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}): '00';
				el.innerHTML = minText + ':' + secText;
      }, 1000);
			el2.style.display = 'inline-block'
			el2.onclick = function() {
					for(let i=0;i<selectMixer(wrapper).length;i++) {
							wrapper.querySelector(`.progressbar${i} div`).style.width = '0'
							wrapper.querySelector(`.progressbar${i} div`).style.animation = `mymove1 0s`
					}
					
					el2.style.display = 'none'
					el.innerHTML = "00:00"
					el1.style.display = 'inline-block'
					clearInterval(interval);
			}
}
//creating progressbars
function createProgress(element,array) {
	array.map((el,index)=>{
		let div = document.createElement("div")
		let progress = document.createElement("div");  
		progress.className = `progressbar progressbar${index}`
		let bar = document.createElement("div");
		bar.className = 'bar'
		progress.appendChild(bar)
		let title = document.createElement('p')
		title.className = 'title'
		title.innerHTML = el.title
		let duration = document.createElement('p')
		duration.className = 'duration'
		duration.innerHTML = (el.duration < 1) ? el.duration * 60 + " sec": `~${el.duration}min` 
		div.appendChild(progress)
		div.appendChild(title)
		div.appendChild(duration)
		element.append(div)
	})
}
