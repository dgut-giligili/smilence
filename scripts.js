// JavaScript Document
//@version 1.2.1
//@writer Ksar, Kzjnet

try
{
	var flowTable = document.getElementsByClassName("flowTable")[0];

	// 绩点
	var score;
	if (document.getElementsByClassName("score").length == 0)
		score = 1.00; // 教师或新生
	else
		score = Number(document.getElementsByClassName("score")[0].innerText.match("[0-9].[0-9]{2}$"));

	// 资费组
	var group = flowTable.rows[1].cells[0].innerText;
	if (group == "教师")
		if (flowTable.rows[flowTable.rows.length - 1].cells[4].innerText == "已购买")
			throw "教师账号不可重复购买"; // 否则后台数据会溢出
	else if (group != "学生")
		throw "未知资费组" + group;

	// 流量包大小
	var size = flowTable.rows[flowTable.rows.length - 1].cells[3].innerText;

	// 流量包
	var value;
	if (group == "学生")
		if (score >= 2.50)
			value = 6;
		else
			value = 2;
	if (group == "教师")
		value = 12;

	var GetFlows = document.getElementById("GetFlows");
	GetFlows.innerHTML = "";

	var world = document.createElement("center");
	world.id = "smilence_world";
	GetFlows.appendChild(world);

	var message = document.createElement("span");
	message.id = "smilence_message";
	message.innerText = group + " ，你可以花费 5.0 元，购买 1 个流量包，增加可用流量 " + size + " 。";
	world.appendChild(message);

	world.appendChild(document.createElement("br"));
	world.appendChild(document.createElement("br"));

	var buy = document.createElement("button");
	buy.id = "smilence_buy";
	buy.innerText = "购买";
	buy.onclick = smilence_buy_onclick;
	world.appendChild(buy);	
}
catch(error)
{
	alert("Smilence 插件加载失败\n\n原因：" + error);
}

function smilence_buy_onclick()
{
	$.post
	(
		"/flow/_GetFlows",
		{
			"myFlow" : value,
			"X-Requested-With" : "XMLHttpRequest"
		},
		function(data){}
	);
}
