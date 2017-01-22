base = new Panopticon(config);


$(function(){
	// 今日の日付を表示
	now = new Date();
	$("#date").text("今日の通信 " + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate());

	// 今日の通信が更新された時のイベント
	base.setChangeEvent("today",
	function(array, updateKey) {
		table = base.getElement("today");
		$('#today tbody *').remove();
		today = $('#today tbody');
		table["data"].forEach(function(value, index){
			today.append("<tr><td>" + value["time"] + "</td><td>" + value["domain"] + "</td><td>" + value["ipaddress"] + "</td></tr>");
		});
	});
	
	// ブラックリストが更新された時のイベント
	base.setChangeEvent("blacklist",
	function(array, updateKey) {
		table = base.getElement("blacklist");
		$('#blacklist tbody *').remove();
		blacklist = $('#blacklist tbody');
		table.forEach(function(value, index){
			blacklist.append("<tr><td>" + value + "</td></tr>");
		});
	});
});