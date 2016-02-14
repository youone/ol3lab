function zoomed() {
	vis.select(".x.axis").call(xAxis);
	vis.select(".y.axis").call(yAxis);
	vis.selectAll(".line").attr("d", lineFunc(lineData));
	vis.selectAll(".datarect").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var lineData = [
                {'x':1,  'y':5},
                {'x':20, 'y':20},
                {'x':40, 'y':10},
                {'x':60, 'y':40},
                {'x':80, 'y':5},
                {'x':100,'y':60}
                ];

var vis = d3.select("body").append("svg")
.attr("width", 1000)
.attr("height", 500)

var WIDTH = 1000;
var HEIGHT = 500;
var MARGINS = {top : 20, right : 20, bottom : 20, left : 50};

var xScale = d3.scale.linear()
.range([ MARGINS.left, 
         WIDTH - MARGINS.right ])
.domain([ d3.min(lineData, function(d) {return d.x;}), 
          d3.max(lineData, function(d) {return d.x;}) ]);

var yScale = d3.scale.linear()
.range([ HEIGHT - MARGINS.top, 
       MARGINS.bottom ])
.domain([ d3.min(lineData, function(d) {return d.y;}), 
        d3.max(lineData, function(d) {return d.y;}) ]);

var xAxis = d3.svg.axis()
.scale(xScale)
//.tickSize(-HEIGHT + MARGINS.top)
.tickSize(5)
.tickSubdivide(true);

var yAxis = d3.svg.axis()
.scale(yScale)
//.tickSize(-WIDTH + MARGINS.right)
.tickSize(5)
.orient("left")
.tickSubdivide(true);

vis.append("g")
.attr("class", "x axis")
.attr("transform","translate(0," + (HEIGHT - MARGINS.bottom) + ")")
.call(xAxis)

vis.append("g")
.attr("class", "y axis")
.attr("transform", "translate(" + (MARGINS.left) + ",0)")
.call(yAxis)


var lineFunc = d3.svg.line()
.x(function(d) {return xScale(d.x);})
.y(function(d) {return yScale(d.y);})
.interpolate('linear');

vis.append("path")
.attr("d", lineFunc(lineData))
.attr("stroke", "blue")
.attr("stroke-width", 2).attr("fill", "none")
.attr("class","line")
.attr("clip-path", "url(#clip)")

vis.selectAll("rect").data(lineData).enter().append("rect")
  .attr('x', function(d) {return xScale(d.x);})
  .attr('y', function(d) {return yScale(d.y);})
  .attr('width', 10) // sets the width of bar
  .attr('height', 10)
  .attr('fill', 'grey')   // fills the bar with grey color
  .attr("clip-path", "url(#clip)")
  .attr('class','datarect')
  
var zoomOverlay = vis.append("rect")
.attr("width", WIDTH)
.attr("height", HEIGHT)
.attr("class", "zoomOverlay")
.call(d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1, 10]).on("zoom", zoomed))
//.on("mousedown.zoom", null)
//.on("touchstart.zoom", null)
//.on("touchmove.zoom", null)
//.on("touchend.zoom", null);
  
  
  
  
  
  
  
//var width = 500,
//    height = 500;
//
//var randomX = d3.random.normal(width / 2, 80),
//    randomY = d3.random.normal(height / 2, 80);
//
//var data = d3.range(1000).map(function() {
//  return [
//    randomX(),
//    randomY()
//  ];
//});
//
//var svg = d3.select("body").append("svg")
//    .attr("width", width)
//    .attr("height", height)
//  .append("g")
//    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom2))
//  .append("g");
//
//svg.append("rect")
//.attr("class", "overlay")
//.attr("width", width)
//.attr("height", height);
//
////svg.selectAll("circle").data(data).enter().append("circle")
////.attr("r", 2.5)
////.attr("transform", function(d) { return "translate(" + d + ")"; });
//
//svg.selectAll("rect").data(data).enter().append("rect")
//.attr('x', function(d) {return d[0];})
//.attr('y', function(d) {return d[1];})
//.attr('width', 2) // sets the width of bar
//.attr('height', 2)
//.attr('fill', 'grey')   // fills the bar with grey color
////.attr("transform", function(d) { return "translate(" + d + ")"; });
//
//
//function zoom2() {
//  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//}
 
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var imgData=ctx.createImageData(1024,500);
var iLine = 1;

//addLine();
//shiftImage()

function addLine() {
	console.log('adding line ' + iLine)
	for (var i = 499; i>0; i--){
		shiftLine(i);
	}
	drawLine(1);
	ctx.putImageData(imgData,0,0);
	setTimeout(addLine, 100);
}

function shiftImage() {
	imgData.data.set(deleteLastLine(), 4 * 1024)
	drawLine(1);
	ctx.putImageData(imgData,0,0);
	setTimeout(shiftImage, 10);
}


function shiftLine(lineNo) {
	for (var i = (lineNo-1) * 4 * 1024; i < lineNo * 4 * 1024; i += 4) {
		imgData.data[i + 4*1024 + 0] = imgData.data[i + 0];
		imgData.data[i + 4*1024 + 1] = imgData.data[i + 1];
		imgData.data[i + 4*1024 + 2] = imgData.data[i + 2];
		imgData.data[i + 4*1024 + 3] = imgData.data[i + 3];
	}
}


function drawLine(lineNo) {
	var lightValue = Math.floor((Math.random() * 255) + 1);
	for (var i = (lineNo-1) * 4 * 1024; i < lineNo * 4 * 1024; i += 4) {
		imgData.data[i + 0] = Math.floor((Math.random() * 255) + 1);
		imgData.data[i + 1] = Math.floor((Math.random() * 255) + 1);
		imgData.data[i + 2] = Math.floor((Math.random() * 255) + 1);
		imgData.data[i + 3] = lightValue;
	}
}

function deleteLastLine() {
	return(imgData.data.subarray(0,(500-1) * 4 * 1024))
}



//var img = new Image();
//img.src = '../images/rhino.png';
//img.onload = function() {
//  draw(this);
//};
//
//function draw(img) {
//  var canvas = document.getElementById('canvas');
//  var ctx = canvas.getContext('2d');
//  ctx.drawImage(img, 0, 0);
//  img.style.display = 'none';
//  var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
//  var data = imageData.data;
//  
//  var invert = function() {
//    for (var i = 0; i < data.length; i += 4) {
//      data[i]     = 255 - data[i];     // red
//      data[i + 1] = 255 - data[i + 1]; // green
//      data[i + 2] = 255 - data[i + 2]; // blue
//    }
//    ctx.putImageData(imageData, 0, 0);
//  };
//
//  var grayscale = function() {
//    for (var i = 0; i < data.length; i += 4) {
//      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
//      data[i]     = avg; // red
//      data[i + 1] = avg; // green
//      data[i + 2] = avg; // blue
//    }
//    ctx.putImageData(imageData, 0, 0);
//  };
//
//  invert();
//  var invertbtn = document.getElementById('invertbtn');
//  invertbtn.addEventListener('click', invert);
//  var grayscalebtn = document.getElementById('grayscalebtn');
//  grayscalebtn.addEventListener('click', grayscale);
//}

//var imageObj = new Image();
//imageObj.src = '../images/darth-vader.jpg';
//
//imageObj.onload = function() {
//	var canvas = document.getElementById('myCanvas');
//	var context = canvas.getContext('2d');
//	context.drawImage(imageObj, 0, 0);
//	imageData = context.getImageData(0, 0, 100, 100);
//	data = imageData.data;
//	    for (var i = 0; i < data.length; i += 4) {
//	      data[i]     = 255 - data[i];     // red
//	      data[i + 1] = 255 - data[i + 1]; // green
//	      data[i + 2] = 255 - data[i + 2]; // blue
//	    }
//	    context.putImageData(imageData, 0, 0);
//  };

