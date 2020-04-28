const arrNumber = []
const arrOperator = []

//Tách biểu thức thành 2 vế bởi dấu '='
var txt = "x^2 + 3x - 4x^2 + 5 - x - 2 = -2x^2 +2x"
txt = txt.toLowerCase();
var str = txt.split('=');
console.log(txt);

var str1 = str[0].split(/(?:\+|-)+/);
//console.log(str1);

var regexObj = new RegExp(/([\da-z\^]+)|([+\-\=]+)/g);//Lấy số và dấu
let match = txt.match(regexObj);

match.forEach(function(item){
	if(item == "+" || item =="-" || item == "="){
		arrOperator.push(item);
	}
	else{
		arrNumber.push(item);
	}
});

var vt = arrOperator.indexOf("="); // vị trí của dấu '='

console.log(arrOperator);
var sptt = str1.length;// đếm số phần tử trước dấu '='
var spts = arrNumber.length - sptt;// đếm số phần tử trước dấu '='
var sds = arrOperator.length - vt -1; //đếm số dấu sau dấu '='
var sdt = arrOperator.length - sds -1;


//console.log(sptt + " " + spts +" " +sdt + " "+sds)
if(sptt > sdt)
{
	arrOperator.unshift("+");
}
if(spts > sds)
{
	arrOperator.splice(arrOperator.indexOf("=")+1,0,"+");
}


//console.log(arrNumber);
//console.log(arrOperator);

var a = 0, b = 0, c = 0;
var vt = arrOperator.indexOf("=");
arrOperator.splice(arrOperator.indexOf("="),1) // remove dấu '='
chuyenve = "";
console.log(arrOperator);
for (let i = 0; i < arrNumber.length; i++)
{       
	if (i >= vt) //đổi dấu nếu ở phía sau dấu '='
	{
		if (arrOperator[i] == "+")
			arrOperator[i] = "-";
		else if (arrOperator[i] == "-")
			arrOperator[i] = "+";
	}                       	
	if (arrNumber[i].indexOf("x^2") >= 0) // lấy hệ số của x^2 rồi cộng 
	{
		num = arrNumber[i].substr(0, arrNumber[i].indexOf("x^2"));
		if(num == ""){
			num = "1";
		}
		num = arrOperator[i].concat(num);
		a += Number(num);
	}
	else if(arrNumber[i].indexOf("x") >= 0){ //hệ số của x
		num = arrNumber[i].substr(0, arrNumber[i].indexOf("x"));
		if(num == ""){
			num = "1";
		}
		num = arrOperator[i].concat(num);
		b += Number(num);
	}
	else{
		num = arrOperator[i].concat(arrNumber[i]); //hệ số c
		c += Number(num);
	}
	chuyenve += arrOperator[i] + " " + arrNumber[i] + " "; //Chuyển về dạng = 0
}
if (arrOperator[0] == "+")
	chuyenve = chuyenve.slice(2,); // bỏ đi dấu '+' ở số đầu tiên

console.log("Chuyen ve: " + chuyenve + " = 0"); //Chuyển về ax^2 + bx + c = 0

var heso = [a.toString(),b.toString(),c.toString()]
for(let i =1; i < heso.length; i++){
	if(Number(heso[i])>=0){
		heso[i] = "+" + heso[i];
	}
}//lấy hệ số và dấu để trình bày

//text là biến để in ra HTML, mà t kh in ra được nên đổi lại console.log để test
console.log("Rut gon bieu thuc: %sx^2 %sx %s = 0", heso[0], heso[1], heso[2]);
//text = "Rut gon bieu thuc: "+ heso[0] +"x^2 " + heso[1]+ "x " + heso[2]+" = 0";

console.log("a=%d,b=%d,c=%d", a, b, c);
//text= "a=" + a + ", b=" + b + ", c=" +c;
if (a != 0){
	var delta = b*b - 4*a*c;

	console.log("Tim delta: b^2 - 4ac = (%d)^2 - 4*%d*%d = %d", b, a, c, delta);
//text = "Tim delta: b^2 - 4ac = (" + b +")^2 - 4*" + a + "*" + c + " = " + delta;

	if(delta < 0)
	{
		console.log("Delta < 0: Phuong trinh vo nghiem");
		//text = "Delta < 0: Phuong trinh vo nghiem";
	
	}
	else if(delta == 0)
	{
		console.log("Delta = 0: Phuong trinh co nghiem kep: x1=x2= -b/2*a = -(%d)/2*%d = %f",b,a,(float)-b/(2*a).toFixed(2));
	//text = "Delta = 0: Phuong trinh co nghiem kep: x1 = x2 = -b/a = -("+ b +")/2*" + a + " = " + (-b/(2*a).toFixed(2));
	}
	else
	{
		x1 = (-b + Math.sqrt(delta)) / 2 * a;
		x2 = (-b - Math.sqrt(delta)) / 2 * a;

		console.log("Delta > 0: Phuong trinh co 2 nghiem phan biet x1= %f, x2= %f", x1.toFixed(2), x2.toFixed(2));
		//text = "Delta > 0: Phuong trinh co 2 nghiem phan biet x1= "+ x1.toFixed(2) +", x2= "+ x2.toFixed(2);
	}
}
else{
	console.log("Phuong trinh co nghiem: x= -c/b = %d/%d = %f",-c,b,(-c/b).toFixed(2));
}




