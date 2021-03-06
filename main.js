var chess_board_aviable_height=0;
var box=0;
for (var create_array=0;create_array<15;create_array++)
{
	eval("var x"+create_array+"=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7];")
}
var x15=[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];

$(document).ready(function(){
	var chess_board_height=$(".chess_board").height();
	$(".chess_board").width(chess_board_height);
	chess_board_aviable_height=$(".chess_board_aviable").height();
	$(".chess_board_aviable").width(chess_board_aviable_height);
	var temp_canvas=document.getElementById("chess_canvas");
	temp_canvas.width=chess_board_aviable_height;
	temp_canvas.height=chess_board_aviable_height;
	draw_box();
	box=chess_board_height/15;
	for (var x=0;x<=14;x++)
	{
		for (var y=0;y<=14;y++)
		{
			var box_top=y*box;
			var box_left=x*box;
			var div_text="<div onclick=\"play('"+x+"','"+y+"')\" id='box_"+x+"_"+y+"' style='transition:all 0.1s;transform:scale(0.9,0.9);position:absolute;top:"+box_top+"px;left:"+box_left+"px;border-radius:"+(box/2)+"px;width:"+box+"px;height:"+box+"px;'></div>";
			$("#board").append(div_text);
		}
	}
})

window.onresize=function(){
	var chess_board_height=$(".chess_board").height();
	$(".chess_board").width(chess_board_height);
	chess_board_aviable_height=$(".chess_board_aviable").height();
	$(".chess_board_aviable").width(chess_board_aviable_height);	
	var temp_canvas=document.getElementById("chess_canvas");
	temp_canvas.width=chess_board_aviable_height;
	temp_canvas.height=chess_board_aviable_height;
	draw_box();
	box=chess_board_height/15;
	for (var x2=0;x2<=14;x2++)
	{
		for (var y2=0;y2<=14;y2++)
		{
			var box_top=y2*box;
			var box_left=x2*box;
			var temp_box=document.getElementById("box_"+x2+"_"+y2);
			temp_box.style.width=box+"px";
			temp_box.style.height=box+"px";
			temp_box.style.borderRadius=box/2+"px";
			temp_box.style.top=box_top;
			temp_box.style.left=box_left;
		}
	}
}

function draw_box()
{
	var c=document.getElementById("chess_canvas");
	var cxt=c.getContext("2d");
	var temp=chess_board_aviable_height/14;
	for (var i=1;i<=13;i++)
	{
		cxt.moveTo(0,temp*i);
		cxt.lineTo(chess_board_aviable_height,temp*i);
	}
	for (var j=1;j<=13;j++)
	{
		cxt.moveTo(temp*j,0);
		cxt.lineTo(temp*j,chess_board_aviable_height);
	}
	cxt.fillStyle="#000";
	cxt.moveTo(3*temp,3*temp);
	cxt.arc(3*temp,3*temp,3,0,Math.PI*2,true);
	cxt.moveTo(11*temp,3*temp);
	cxt.arc(11*temp,3*temp,3,0,Math.PI*2,true);
	cxt.moveTo(3*temp,11*temp);
	cxt.arc(3*temp,11*temp,3,0,Math.PI*2,true);
	cxt.moveTo(11*temp,11*temp);
	cxt.arc(11*temp,11*temp,3,0,Math.PI*2,true);
	cxt.moveTo(7*temp,7*temp);
	cxt.arc(7*temp,7*temp,3,0,Math.PI*2,true);
	cxt.fill();
	cxt.stroke();
}

var turn="black";
var x_2=0;
var y_2=0;
var times=0;
function play(x,y)
{
	x=parseInt(x);
	y=parseInt(y);
	if (eval("x"+x+"["+y+"]")==0 && msg_permission==1)
	{
		if (turn=="black")
		{
			if (times!=0)
				{document.getElementById("box_"+x_2+"_"+y_2).style.border="1px solid #aaa";}
			eval("x"+x+"["+y+"]='black'");
			document.getElementById("box_"+x+"_"+y).style.backgroundColor="black";
			document.getElementById("box_"+x+"_"+y).style.boxSizing="border-box";
			document.getElementById("box_"+x+"_"+y).style.border="1px solid #00cc47";
			document.getElementById("box_"+x+"_"+y).style.boxShadow="5px 5px 10px #ccc";
			turn="white";
		}
		else
		{
			document.getElementById("box_"+x_2+"_"+y_2).style.border="1px solid #000";
			eval("x"+x+"["+y+"]='white'");
			document.getElementById("box_"+x+"_"+y).style.backgroundColor="white";
			document.getElementById("box_"+x+"_"+y).style.boxSizing="border-box";
			document.getElementById("box_"+x+"_"+y).style.border="1px solid #00cc47";
			document.getElementById("box_"+x+"_"+y).style.boxShadow="5px 5px 10px #ccc";
			turn="black";
		}
		charge(x,y);
		x_2=x;
		y_2=y;
		times++;
	}
}

function charge(x,y)
{
	x=parseInt(x);
	y=parseInt(y);
	eval("var temp_color=x"+x+"["+y+"]");
	for (var create_p=1;create_p<=8;create_p++)
		{
			eval("p"+create_p+"=1");
		}
	for (var create_i=1;create_i<=4;create_i++)
	{
		eval("i"+create_i+"=0");
	}
	while (eval("x"+x+"["+(y+p1)+"]")==temp_color && (y+p1)<=14)
	{
		p1++;
		i1++;
	}
	while (eval("x"+x+"["+(y-p2)+"]")==temp_color && (y-p2)>=0)
	{
		p2++;
		i1++;
	}
	while (eval("x"+(x-p3)+"["+y+"]")==temp_color && (x-p3)>=0)
	{
		p3++;
		i2++;
	}
	if ((x+p4)<=14)
	{
		while (eval("x"+(x+p4)+"["+y+"]")==temp_color && (x+p4)<=14)
		{
			p4++;
			i2++;
		}
	}
	while (eval("x"+(x-p5)+"["+(y+p5)+"]")==temp_color && (x-p5)>=0 && (y+p5)<=14)
	{
		p5++;
		i3++;
	}
	if ((x+p6)<=14)
	{
		while (eval("x"+(x+p6)+"["+(y-p6)+"]")==temp_color && (x+p6)<=14 && (y-p6)>=0)
		{
			p6++;
			i3++;
		}
	}
	if ((x+p7)<=14)
	{
		while (eval("x"+(x+p7)+"["+(y+p7)+"]")==temp_color && (x+p7)<=14 && (y+p7)<=14)
		{
			p7++;
			i4++;
		}
	}
	while (eval("x"+(x-p8)+"["+(y-p8)+"]")==temp_color && (x-p8)>=0 && (y-p8)>=0)
	{
		p8++;
		i4++;
	}
	for (var z=1;z<=4;z++)
	{
		if(eval("i"+z)>=4)
		{
			if (temp_color=="black")
				{msg("黑方胜")}
			else
				{msg("白方胜")}
		}
	}
}

var msg_permission=1;
function msg(text)
{
	if (msg_permission==1)
	{
		$(".msg_box").css({"transform":"translate(-50%,-50%) scale(1,1)"});
		$("#text").text(text);
		if (text=="黑方胜")
		{
			$(".msg_box").css({
				"backgroundColor":"#000",
				"color":"white",
			});
		}
		msg_permission=0;
	}
}
