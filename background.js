
var ID_OPEN_LINKS = "open-links-in-selection-text";

chrome.contextMenus.create({
	title: "選択範囲内のURLをすべて開く",
	contexts: ["selection"],
	id: ID_OPEN_LINKS
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === ID_OPEN_LINKS) {
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
