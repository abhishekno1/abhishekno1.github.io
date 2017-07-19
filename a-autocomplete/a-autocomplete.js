function automata (id,data){
	var auto = document.getElementById(id)
	var val = data;
	autores = document.createElement('ul')
	autores.setAttribute('id','autores')
	auto.parentNode.insertBefore(autores, auto.nextSibling)

	var tempVal = ''
	var leftval = auto.getBoundingClientRect().left
	var topval = auto.getBoundingClientRect().top

	topval = topval + 5;
	topval = topval+'px';
	leftval = leftval+'px';

	if(auto.style.width == "" && auto.style.height == ""){
		var liwidth = '171px';
		var liheight = '18px';
	}
	else{
		var liwidth = auto.style.width;
		var liheight = auto.style.height;
	}

	Object.assign(autores.style,{listStyle:'none',width:'100%',position:'absolute',top:topval,left:leftval,padding:'0px'});
	auto.addEventListener('keyup', function(){
		//console.log(document.getElementById('auto').style.left)
		window.tempVal = auto.value

		while (autores.hasChildNodes()) { 
		autores.removeChild(autores.firstChild);
		}
		while(auto.value == ''){
			autores.removeChild(autores.firstChild);
		}

		function matcher(match) {
		if (match.includes(auto.value)){
			return match
		}
		}

		res = val.filter(matcher);
		for(let i = 0; i < res.length; i++){
			var li = document.createElement('li')
			li.setAttribute('id','autolist')
			li.setAttribute('tabindex',0)
			li.setAttribute('onkeyup','automata.rotate(this)')
			li.setAttribute('onclick','automata.select(this.innerHTML)')
			Object.assign(li.style,{border:'1px solid',width:liwidth,height:liheight});
			li.innerHTML = res[i]
			autores.appendChild(li)
		}
		auto.addEventListener('keydown',function(e){
			if(e.keyCode == 40){
				autores.firstChild.focus()
				auto.value = autores.firstChild.innerHTML
				autores.firstChild.style.backgroundColor = "blue"
				autores.firstChild.style.color = "white"
			}
		})
	})					
}
automata.rotate = function(y){
	y.addEventListener('keydown',function(e){
		if(e.keyCode == 40 && y.nextSibling){
			y.nextSibling.style.backgroundColor = "blue"
			y.nextSibling.style.color = "white"
			this.style.color = "black"
			this.style.backgroundColor = "white"
			y.nextSibling.focus()
			auto.value = y.nextSibling.innerHTML
		}
		else if(e.keyCode == 38){
			if(!y.previousSibling){
				auto.value = window.tempVal
				auto.focus()
				auto.value = auto.value
			}
			else{
				y.previousSibling.style.backgroundColor = "blue"
				y.previousSibling.style.color = "white"
				this.style.color = "black"
				this.style.backgroundColor = "white"
				y.previousSibling.focus()
				auto.value = y.previousSibling.innerHTML
			}
		}
		else if(e.keyCode == 13){
			auto.value = y.innerHTML
			while(auto.value == y.innerHTML){
				autores.removeChild(autores.firstChild);	
			}
		}
	})
}	
automata.select = function(x){
	auto.value = x
	while(auto.value == x){
		autores.removeChild(autores.firstChild);	
	}
}
