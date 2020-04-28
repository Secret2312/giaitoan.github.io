const arrPT1 = [];
const arrPT2 = [];



var input = "3x-2y=11, 3x-5 y = 3";
var arr =[]

var regexObj1 = new RegExp(/(?:[+\-=]\s*|\d|[a-z]|,)/g);//quy phương trình về dang ax +by =c;
let match = input.match(regexObj1);
match.forEach(function(item){
	arr.push(item);
});
input = "";
for(let i =0 ; i < arr.length; i++){
	if(arr[i].indexOf('x') >= 0 || arr[i].indexOf('y')>=0){
		arr[i] = arr[i] + " ";
	}
	input += arr[i];
}
console.log(input);

var str = input.split(',');

console.log("Phuong trinh 1: " + str[0] +"\n"+ "Phuong thinh 2: " + str[1]);
var regexObj = new RegExp(/(?:[+\-=]\s*|\d|[a-z])+/g);//Lấy số và dấu
let match1 = str[0].match(regexObj);

match1.forEach(function(item){
	arrPT1.push(item)
});

match2 = str[1].match(regexObj);
match2.forEach(function(item){
	arrPT2.push(item)
});

function remove_space(arr){
	//vd: - 2x -> -2x
	for(let i=0; i < arr.length; i++){
		arr[i] = arr[i].replace(/\s/g, '');
	}
	return arr;
}
remove_space(arrPT1);
remove_space(arrPT2);



function tachdaubang(arr){
	var vtequal = arr.findIndex(item => item.indexOf('=') >= 0); //vị trí trong mảng có dấu bằng
	var temp = arr[vtequal];

	var ssdb = temp.substr(temp.indexOf('=')+1,temp.length) //số sau dấu bằng

	arr[vtequal] = temp.substr(temp.indexOf('='),temp.indexOf('=')+1)
	arr.splice(vtequal+1,0,ssdb)

	return arr;
}
tachdaubang(arrPT1); //vd [ '-2x', '-y', '+x', '= 5', '-2y' ] => [ '-2x', '-y', '+x', '=', '5', '-2y' ]
tachdaubang(arrPT2);
function doidau(item){
	if(item.includes('+')){
		item = item.replace('+','-');
	}else if(item.includes('-'))
		item = item.replace('-','+');
	else
		item = '-' + item;
	return item;
}

var in_ra = "";

function chuyenve(arr){
	var arrtemp = [];
	var vtequal = arr.findIndex(item => item.indexOf('=') >= 0);
	arr.splice(arr.indexOf("="),1) // remove dấu '='
	var a=0,b=0,c=0;
	for(let i = 0; i < arr.length; i++){
		 //vị trí trong mảng có dấu bằng
		if(i >= vtequal){
			arr[i] = doidau(arr[i]);
		}
		if(arr[i].indexOf("x") >= 0){ //lay nhung phan tu co bien 'x'
			num = arr[i].substr(0, arr[i].indexOf('x'));			
			if(!/[0-9]/.test(num)){
				if(!/[+-]/.test(num))
					num = "+1";
				else
					num = num[0] + "1";
			}
			a += Number(num);
		}
		else if(arr[i].includes('y')){//lay nhung phan tu co bien 'y'
			num = arr[i].substr(0, arr[i].indexOf('y'));

			if(!/\d/.test(num)){
				if(i==0 && /^[+-]/.test(num)){
					num = "1";
				}
				else{
					num = num[0] + "1";
				}

			}
			b += Number(num);
		}
		else{
		 //hệ số c
		c += Number(arr[i]);
		}	
		arrtemp.push(arr[i]);
	}
	arrtemp.push('=');
	for(i = 0; i < arrtemp.length; i++){
		var vt = arrtemp.indexOf('=');
		if(!/x|y|=/.test(arrtemp[i]) && i < vt){		
			temp = arrtemp[i];
			arrtemp.splice(i,1);
			temp = doidau(temp);
			arrtemp.push(temp);								
		}
	}
	var vt = arrtemp.indexOf('=')+1;
	if(/\+/.test(arrtemp[vt])){
		arrtemp[vt] = Number(arrtemp[vt]);
	}
	in_ra = "";
	arrtemp.forEach(function(item){
		 in_ra += item + " ";
	});

	arr.splice(0,arr.length,Number(a),Number(b),Number(c));
	arr[2] = doidau(arr[2].toString());
	arr[2] = Number(arr[2]);
	if(arr[1] > 0){
		arr[1] = "+" + arr[1];
	}

	return in_ra;
}

console.log("Phuong trinh sau khi chuyen ve:\n" + chuyenve(arrPT1) + "\n" + chuyenve(arrPT2));
arr1 = arrPT1.slice(0);
arr2 = arrPT2.slice(0);

if(!(JSON.stringify(arrPT1)==JSON.stringify(arr1) && JSON.stringify(arrPT2)==JSON.stringify(arr2))){
console.log("Phuong trinh sau khi rut gon:\n" + arrPT1[0]  +"x "+ arrPT1[1] + "y = " + arrPT1[2]);
console.log(arrPT2[0]  +"x "+ arrPT2[1] + "y = " + arrPT2[2]);
}

function UCLN(a, b) {
    if (b == 0) return a;
    return Math.abs(UCLN(b, a % b));
}

function BCNN(a, b){
	return Math.abs(a*b)/UCLN(a,b);
}

function ktra_zero(arr1,arr2){ //kiểm tra hệ số của pt có bằng 0 hay kh?
	if(arr1[0] == 0 && arr2[0] != 0){ //nếu a1=0 bà a2!=0
		y = (arr1[2]/arr1[1]);
		y = Math.round(y * 100) / 100
		console.log("=> y= " + y);		
		var x = (arr2[2] - arr2[1]*y)/arr2[0];
		x = Math.round(x * 100) / 100
		console.log("Thay vao pt con lai ta duoc: " + arr2[0] + "x " + arr2[1] + "*(" + y + ") = " + arr2[2] +" => x= " + x);
		console.log("Vay nghiem cua pt la : x = " + x +", y = " + y);
		return true;
	}
	else if(arr1[1] == 0 && arr2[1] != 0){
		x = (arr1[2]/arr1[0]).toFixed(2);
		console.log("=> x= " + x);		
		var y = (arr2[2] - arr2[0]*y)/arr2[1];
		console.log("Thay vao pt con lai ta duoc: " + arr2[0] + "*(" + x + ") " + arr2[1]+"y "+ " = " + arr2[2] +" => y= " + y);
		console.log("Vay nghiem cua pt la : x = " + x +", y = " + y);
		return true;
	}
	return false;
}

function giaihpt(arr1,arr2){
	if(ktra_zero(arr1,arr2) ||ktra_zero(arr2,arr1)){

	}else{

	var arrtemp = [] // mảng tạm để lưu kết quả của 2 phương trình trừ nhau;
	var bcnn = BCNN(arr1[0],arr2[0]);
	a1 = (bcnn/arr1[0]);
	a2 = (bcnn/arr2[0]);
	for(let i = 0; i < arr1.length ;i++){
		arr1[i] = arr1[i]*a1;
		arr2[i] = arr2[i]*a2;
		arrtemp.push(arr1[i]-arr2[i]);
	}

	if(arr1[1] > 0){
		arr1[1] = '+'+arr1[1]
	}
	if(arr2[1] > 0){
		arr2[1] = '+'+arr2[1];
	}
	console.log(arrtemp);
	if(arr1[0] != arr2[0]){
		console.log("Nhan ca 2 ve cua 2 phuong trinh ta duoc: \n" + arr1[0]  +"x "+ arr1[1] + "y = " + arr1[2] + " (1) (nhan voi " + a1 +")");
		console.log(arr2[0]  +"x "+ arr2[1] + "y = " + arr2[2] + " (2) (nhan voi " +a2+ ")");
	}
	var y = arrtemp[2]/arrtemp[1];
	y= Math.round(y * 100) / 100
	console.log("Tru pt (1) cho pt (2) ta duoc: " + arrtemp[1] + "y = " + arrtemp[2] +" => y = " + y + " (3)");
	var x = (arr2[2] - arr2[1]*y)/arr2[0];
	x = Math.round(x * 100) / 100
	console.log("Thay (3) vao pt (2) ta duoc: " + arr2[0] + "x " + arr2[1] + "*(" + y.toFixed(2) + ") = " + arr2[2] + " => x = "+ x);
	console.log("Vay nghiem cua pt la : x = " + x +", y = " + y);
}
}

giaihpt(arrPT1,arrPT2);
