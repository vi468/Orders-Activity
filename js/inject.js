window.addEventListener('DOMContentLoaded', async () => {

    let checkDiv = document.querySelector("#market_activity_block");

    let page = document.body.innerHTML;
    let marketID = page.match(/Market_LoadOrderSpread\(\s*(\d+)\s*\);/);

    const regexp = new RegExp('eamID\\s\+=\\s\+\"(\\d+)\"');
    let steamID = page.match(regexp)[1];

    if (checkDiv != null || marketID == null) {
        return false;
    }

    let addAfterThisDiv = document.querySelector("#largeiteminfo_warning");
    let newDiv = document.createElement('div');
    newDiv.id = "market_activity_section"
    newDiv.innerHTML = `
        <h3 class="market_activity_header">Recent activity</h3>
        <div id="market_activity_block">
            <div id="market_activity_waiting_text" style="display: block;">Waiting for new activity...</div>
        </div>`;
    addAfterThisDiv.append(newDiv)

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerText = `ItemActivityTicker.Start(${marketID[1]});`;
    document.head.appendChild(script);
    script.remove();

}, false);