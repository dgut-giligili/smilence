// JavaScript Document
//@version 1.1.0
//@writer Ksar, Kzjnet

var flowTable = document.getElementsByClassName("flowTable")[0];
while (flowTable.rows.length != 2)
	flowTable.deleteRow(1);
flowTable.rows[1].cells[1].innerHTML = "无限流量包";
flowTable.rows[1].cells[4].innerHTML = "<span class=\"green\">可购买</span>";

var myFlow = document.getElementsByClassName("myFlow")[0];
while (myFlow.getElementsByTagName("li").length != 1)
	myFlow.getElementsByTagName("li")[myFlow.getElementsByTagName("li").length - 1].remove();
myFlow.getElementsByTagName("label")[0].innerHTML = myFlow.getElementsByTagName("label")[0].innerHTML.replace(/[0-9]{1,4}\ [A-Z]{2}（(([0-9]\.[0-9])|[0-9])\ [A-Z]{2}）/, flowTable.rows[1].cells[3].innerHTML);
document.getElementById("my1").checked = true;

if (Number(document.getElementsByClassName("score")[0].innerHTML.match("[0-9].[0-9]{2}$")) >= 2.5)
	myFlow.getElementsByTagName("input")[0].value = 6;
else
	myFlow.getElementsByTagName("input")[0].value = 2;
