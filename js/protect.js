(function(){
    'use strict';
    function editable(el){
        return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    }

    document.addEventListener('contextmenu', function(e){
        if (!editable(e.target)) e.preventDefault();
    });

    document.addEventListener('copy', function(e){
        e.preventDefault();
        if (e.clipboardData) e.clipboardData.setData('text/plain', '');
    });

    document.addEventListener('cut', function(e){ e.preventDefault(); });

    document.addEventListener('dragstart', function(e){ e.preventDefault(); });

    document.addEventListener('selectstart', function(e){
        if (!editable(e.target)) e.preventDefault();
    });

    document.addEventListener('keydown', function(e){
        var k = (e.key || '').toLowerCase();
        var mod = e.ctrlKey || e.metaKey;

        if (k === 'f12') { e.preventDefault(); return; }

        if (mod && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) {
            e.preventDefault();
            return;
        }

        if (mod && (k === 's' || k === 'u' || k === 'c' || k === 'x' || k === 'a' || k === 'p')) {
            e.preventDefault();
            return;
        }
    }, true);

    setInterval(function(){
        try { console.clear(); } catch(err) {}
    }, 2000);

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    var strikes = 0;

    setInterval(function(){
        if (isFirefox || window.devicePixelRatio !== 1) return;

        var dockedRight = window.outerWidth - window.innerWidth > 160;
        var dockedBottom = window.outerHeight - window.innerHeight > 160;

        if ((dockedRight || dockedBottom) && window.outerWidth > 0) {
            strikes++;
        } else {
            strikes = 0;
        }

        var shield = document.getElementById('dt-shield');

        if (strikes >= 3 && !shield) {
            shield = document.createElement('div');
            shield.id = 'dt-shield';
            shield.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14pt;letter-spacing:3px;font-style:italic;';
            shield.textContent = 'nice try.';
            document.body.appendChild(shield);
        } else if (shield && strikes === 0) {
            shield.parentNode.removeChild(shield);
        }
    }, 600);
})();
