const Discord = require('discord.js');
const client = new Discord.Client();
const timeoutPromise = require('util').promisify(setTimeout);


const prefix = ".";
const prefix2 = "!";

var pythonActive = false;


client.on('error', console.error);


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//On new member
client.on("guildMemberAdd", (member) => {
  //console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  
	var count = member.guild.members.filter(member => !member.user.bot).size;

	if(count % 50 == 0)
	{
		member.guild.channels.get("532744017981472768").send(`@here We've reached ${count} total members! Congratz to ${member.user.username} for being member #${count}!`);
	}
	
	//Tell about Google doc
	member.send("```Welcome to Democratic Republic of Kratom! I'm Liberty, the local bot. Check out #rules before you get started. Looking for vendors? Here's a list!``` https://goo.gl/EuNzbw")
  	//console.log("DM'd " + member.username)
  
	console.log(count);
});




client.on("message", async message =>
{	
	//console.log(message.channel.id)

	/*if(message.channel.id === "530355551599853588")
	{
		if(pending === false)
		{
			var interval = setInterval (function () {
			message.channel.send("Testing123 please ignore this message.");
			pending = false;
			}, 1000 * 10); 
			
			console.log("test")
			pending = true;
		}
		
		
	}*/
	
	if(message.content.startsWith(prefix + "reddit"))
	{
		var bool1 = false; 
		var bool2 = false;
		
		if(message.member.permissions.has('ADMINISTRATOR'))
		{
			bool1 = true;
		}
		else
		{
			message.channel.send("Missing required permissions! Administrators only.")
		}
		
		if(message.channel.id == "543228684744523776")
		{
			bool2 = true;
		}
		else
		{
			message.channel.send("Incorrect channel! This command is only allowed in the proper channel")
		}
		
		if(bool1 && bool2)
		{
			if(pythonActive == false)
			{
				message.channel.send("WARNING: Please wait until command is finished to do another command.");
				
				pythonActive = true;
				//Message
				var python = require('python-shell');

				let options = {
					mode: 'text',
					scriptPath: 'C:\\Users\\jdbch\\Desktop\\Reddit',
					pythonOptions: ['-u'], // get print results in real-time
					args: ['--function', 'scrape', '--sub', 'kratom']
				};

				let shell = new python.PythonShell('controller.py', options);

				shell.on('message', function (msg) {
					//print results
					console.log(msg);
					message.channel.send(msg);
				});
				
				shell.on('close', function () {
					message.channel.send("Command finished. Now ready for an additional command.");
					pythonActive = false;
				});				
			}
			else
			{
				message.channel.send("Command already active, please wait until it's finished.")
			}
		}
	}
	
	if(message.content.startsWith(prefix + "libertyquitsecret"))
	{
		process.exit();
	}

	/*if(message.content.startsWith(prefix2 + "vendor") || message.content.startsWith(prefix2 + "vendors") || message.content.startsWith(prefix2 + "vendorlist") || message.content.startsWith(prefix2 + "vendorslist"))
	{
		await message.channel.send("```Here is the official DRK vendor list. You can also find this link in:``` \<#533126825786736640> \n https://goo.gl/EuNzbw");
	}*/

	if(message.content.startsWith(prefix + "quote"))
	{
		var quoteArray = [
		"Liberty Prime is online.",
		"All systems nominal.",
		"Weapons: hot.",
		"Mission: the destruction of any and all Chinese communists.",
		"America will never fall to communist invasion.",
		"Obstruction detected. Composition: titanium alloy supplemented by photonic resonance barrier.",
		"Probability of mission hindrance: zero percent.",
		"Democracy.... is non-negotiable.",
		"Death is a preferable alternative to communism.",
		"Communist detected on American soil. Lethal force engaged.",
		"Tactical assessment: Red Chinese victory - impossible.",
		"Communism is the very definition of failure.",
		"Communism is a temporary setback on the road to freedom.",
		"Embrace democracy or you will be eradicated.",
		"Democracy will never be defeated.",
		"Voice module online. Audio functionality test initialized. Designation: Liberty Prime. Mission: the liberation of Anchorage, Alaska. Primary Targets: any and all Red Chinese invaders. Emergency Communist Acquisition Directive: immediate self destruct. Better dead, than Red."
		];
		
		var rand = Math.floor(Math.random()*quoteArray.length);
		
		var quote = quoteArray[rand];
		
		await message.channel.send(quote);
	}
	
	if(message.content.startsWith(prefix + "memberc"))
	{
		client.emit("guildMemberAdd", message.member);
	}
	
	/*if(message.content.startsWith(prefix + "memberc"))
	{
		var count = message.guild.members.filter(member => !member.user.bot).size;
  
		//await message.channel.send("Member count test: " + count);
		
		if(count % 50 == 0)
		{
			var user = message.member.username;
			var channels = message.member.guild.channels;
			console.log(channels)
			message.channel.send(`TEST PLEASE IGNORE: We've reached ${count} total members! Congratz to ${message.member.user.username} for being member #${count}!`);
		}
	}*/


	if(message.content.startsWith(prefix + "creator"))
	{
		await message.channel.send("All hail my creator, Joshchamp!");
	}

	if(message.content.startsWith(prefix + "poll"))
	{	
		createBasicPoll(message, "Title test", "Description test", 5000);
		
		//await poll.react(`💩`);
	}
	
	if(message.content.startsWith(prefix + "anonpoll"))
	{
		createAnonymousPoll(message, "Should Xyz be banned from the server?", "This is an anonymous poll and will determine if Xyz is banned.\n Please vote by PMing Liberty.", 5000);
	}
});

async function createAnonymousPoll(message, title, description, time)
{
	const channel = message.channel;
	
	
	//Code for VOTING on poll
	/*if(channel.type === "text")
	{
		message.channel.send("This is an anonymous poll! This command is for DM's only.");
	}
	
	if(channel.type === "dm")
	{
		
	}*/
	
	let poll = await message.channel.send({embed: {
			color: 3447003,
			title: title,
			description: description,
			footer: "React to a vote!"
		}});
	
	
	//Wait for poll to end
	await timeoutPromise(time);
	
/*	var fs = require("fs");
	console.log("\n *STARTING* \n");
	// Get content from file
	var contents = fs.readFileSync("jsoncontent.json");
	// Define to JSON type
	var jsonContent = JSON.parse(contents);
	
	//console.log(message.channel);
	
	*/
}

async function createBasicPoll(message, title, description, time)
{
	//Create poll
	let poll = await message.channel.send({embed: {
			color: 3447003,
			title: title,
			description: description,
			footer: "React to a vote!"
		}});
		
	message.delete();
		
	await poll.react(`👍`);
	poll.react(`👎`);
		
		
	//List initial reactions
	const thumbUp = await poll.react('👍');
	const thumbDown = await poll.react('👎');
	
	//Wait for poll to end
	await timeoutPromise(time);
		
	//Gather reactions
	const up = thumbUp.count;
	const down = thumbDown.count;
		
	//Test wins election
	var response = "XYZ ";
		
	if(up > down)
	{
		response += "wins the election!"
	}
	else
	{
		response += "loses the election!";
	}
		
		await message.channel.send(response);
		
}

async function collectThumbsUp(poll)
{	

	const filter = (reaction, user) => reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
	const collected = await poll.awaitReactions(filter, { time: 5000 });
	const count = collected.get('👍').count;
	const down = collected.get('👎').count;

	return count;
}

async function collectThumbsDown(poll)
{	

	const filter = (reaction, user) => reaction.emoji.name === '👎';
	const collected = await poll.awaitReactions(filter, { time: 5000 });
	const count = collected.get('👎').count;

	return count;
}



client.login('NDkzOTI1OTIzMDg3ODQzMzM5.DosI0w.xNsWAPY-fpwgCfTvDh97O47ctA0');