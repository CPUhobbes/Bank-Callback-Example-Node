var fs = require('fs');

var trans = process.argv[2];
var amount = parseFloat(process.argv[3]);
var total = 0;

switch(trans){
	case "total":
		getData(getTotal, null);
		break;

	case "deposit":
		if(typeof amount ===  'number'){
			getData(deposit, amount);
		}
		else{
			console.log("Transaction Failed")
		}
		break;

	case "withdraw":
		if(typeof amount ===  'number'){
			getData(withdraw, amount);
		}
		else{
			console.log("Transaction Failed")
		}
		break;

	case "lotto":
		getData(lotto, null);
		break;

	default:
			console.log("Please Use a Correct Transaction (total, deposit, withdraw, lotto)")
}

function getData(callback, amount){
	fs.readFile("account.txt",'utf8', function(err, data){
		if(err){
			console.log(err);
		}

		var fileArr = data.split(", ");
		
		for(var i = 0; i<fileArr.length;++i){
			fileArr[i] =parseFloat(fileArr[i]);
		}
		return callback(fileArr, amount);
	});
}

function getTotal(arr){
	var total=0;
	for(var i =0;i<arr.length;++i){
		total+=arr[i];
	}
	console.log("Your account total: "+(Math.floor(total*100))/100);
}

function deposit(arr, amount){
	arr.push(amount);
	writeArray(arr);
	getTotal(arr);
}

function writeArray(arr){
	var str = "";
	for(var i=0;i<arr.length;++i){
		if(i!= arr.length-1){
			str+=(arr[i]+", ");
		}
		else{
			str+=arr[i];
		}
	}
	fs.writeFile("account.txt", str, function(err) {
		if(err){
			console.log(err);
		}
	});
}

function withdraw(arr, amount){
	arr.push((-1*amount));
	writeArray(arr);
	getTotal(arr);
}

function lotto (arr){
	var ball = Math.ceil(Math.random()*10);
	if(ball === 5){ // Random num is 5, can be any number
		deposit(arr, 10);
		console.log("You Win!");
	}
	else{
		withdraw(arr,2);
		console.log("You Lose!");
	}
}



