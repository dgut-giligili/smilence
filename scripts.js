 // JavaScript Document
//@version 1.2.2
//@writer Ksar, Kzjnet

try
{
	// 绩点
	var score;
	if (document.getElementsByClassName("score").length == 0)
		score = 1.00; // 教师或新生
	else
		score = Number(document.getElementsByClassName("score")[0].innerText.match("[0-9].[0-9]{2}$"));

	var GetFlows = document.getElementById("GetFlows");
	var group, size, value;

	parse(GetFlows.innerHTML);
	refresh();
}
catch(error)
{
	alert("Smilence 插件加载失败\n\n原因：" + error);
}

function parse(html)
{
	var GetFlows_temp = document.createElement("div");
	GetFlows_temp.innerHTML = html;
	var flowTable = GetFlows_temp.getElementsByClassName("flowTable")[0];
	
	// 资费组
	group = flowTable.rows[1].cells[0].innerText;
	if (group == "教师")
		if (flowTable.rows[flowTable.rows.length - 1].cells[4].innerText == "已购买")
			throw "教师账号不可重复购买"; // 否则后台数据会溢出
	else if (group != "学生")
		throw "未知资费组" + group;

	// 流量包大小
	size = flowTable.rows[flowTable.rows.length - 1].cells[3].innerText;

	// 流量包
	if (group == "学生")
		if (score >= 2.50)
			value = 6;
		else
			value = 2;
	if (group == "教师")
		value = 12;
}

function refresh()
{
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

	var form = document.createElement("form");
	form.setAttribute("action", "/Flow/_BuyFlow");
	form.setAttribute("data-ajax", "true");
	form.setAttribute("data-ajax-begin", "onbegin");
	form.setAttribute("data-ajax-confirm", "计费按自然月结算，所购买的流量下月1日会自动清零，你确定要购买吗？");
	form.setAttribute("data-ajax-method", "Post");
	form.setAttribute("data-ajax-mode", "replace");
	form.setAttribute("data-ajax-success", "smilence_buySuc");
	form.setAttribute("data-ajax-update", "#msg");
	form.setAttribute("id", "form0");
	form.setAttribute("method", "post");
	form.setAttribute("novalidate", "novalidate");
	world.appendChild(form);

	var input_radio = document.createElement("input");
	input_radio.setAttribute("type", "hidden");
	input_radio.setAttribute("name", "myFlow");
	input_radio.setAttribute("value", value);
	form.appendChild(input_radio);

	var input_button = document.createElement("input");
	input_button.setAttribute("type", "submit");
	input_button.setAttribute("class", "btnSub");
	input_button.setAttribute("value", "无限购买");
	form.appendChild(input_button);
}

function smilence_buySuc()
{
	$.post("/flow/_GetFlows", "", function (data) {
		parse(data);
		refresh();
	});
}
