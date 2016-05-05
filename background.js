
chrome.contextMenus.create({
	title: "選択範囲内のURLをすべて開く",
	contexts: ["selection"],
	onclick: function (info, tab){
		var word = info.selectionText;
		var urls = word.match(/https?:[/][/][-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g);
		if (urls) {
			urls.reverse();
			chrome.windows.create({
				url: urls[0],
				top: 0,
				left: 0
			}, function (windowInfo){
				var wId = windowInfo.id;
				chrome.windows.update(wId, {
					state: "maximized"
				});
				urls.splice(0, 1);
				urls.forEach(function (url) {
					chrome.tabs.create({
						url: url,
						windowId: wId,
						index: 0
					});
				});
			});
		}
	}
});
