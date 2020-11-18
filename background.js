var googleTranslationId = "google-translation";
var fromLang = "auto";
var toLang = browser.i18n.getUILanguage();

var ccLangs = [
    "zh-CN",
    "zh-TW"
];

if (toLang.includes("-") && !ccLangs.includes(toLang)) {
    toLang = toLang.split("-")[0];
}

var goToGoogleTranslate = function(data) {
    var text = data.shift();

    if (! text) {
        return;
    }

    browser.tabs.create({
        url: "https://translate.google.com/#view=home&op=translate&sl=" + fromLang + "&tl=" + toLang + "&text=" + text
    });

};



browser.contextMenus.create({
    id: googleTranslationId,
    title: "Google Translation (" + fromLang + " -> " + toLang + ")",
    contexts: ["all"]
});


browser.contextMenus.onClicked.addListener(function(info, tab) {
    var text = info.selectionText;

    if (info.menuItemId != googleTranslationId){
        return;
    }

    if (info.menuItemId == googleTranslationId) {
        if (text) {
            goToGoogleTranslate([text]);
    
            return;
        }else{
            var executing = browser.tabs.executeScript(
                tab.id,
                {
                    code: "window.prompt(\"Text to translate (" + fromLang + " -> " + toLang + ")?\");"
                }
            );
            executing.then(goToGoogleTranslate);
        }
    }
});
