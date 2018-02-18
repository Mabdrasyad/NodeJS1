const serialport=require('serialport');//import package
const portNumber=process.argv[2];//ambil argumen ke 2 dari command argv
console.log("Argument 2: "+ portNumber);//nampilin port number
const myport=new serialport(portNumber,{
	baudRate:57600
});//buat object serial port

//parser biar nggak nampilin buffer
const parsers=serialport.parsers;
const parser=new parsers.Readline({
	delimiter:'\r\n'
});
myport.pipe(parser);//pake parser

//even yang dipanggil pas port connected
myport.on('open',()=>{
	console.log("Arduino connected on:"+portNumber);
	let timeout=3000//3detik
	setTimeout(()=>{
		//kirim command 1 string ke arduino
		myport.write('1',(err)=>{
			if(err)
				console.log(err);//munculin error
			else
				console.log("Success");//kalo nggak error
		});
	},timeout);
})
//event yang muncul dari arduino pake data.
parser.on('data',(data)=>{
	console.log(data);
})