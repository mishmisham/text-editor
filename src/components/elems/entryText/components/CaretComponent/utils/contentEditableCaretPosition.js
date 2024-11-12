
export const getCaretPosition = (element) => {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection !== "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type !== "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

const notExcludedNode = (node, excludedParentNodeClasses) => {
    if (!node.parentNode || !node.parentNode.classList) {
      return true;
    }
    
    let excluded = false;
    excludedParentNodeClasses.forEach(className => {
      if (node.parentNode.classList.contains(className)) {
        excluded = true;
      }
    })

    return !excluded;
}

export const setCaretPosition = (el, pos, excludedParentNodeClasses=['real-br']) => {
    // Loop through all child nodes
    for(var node of el.childNodes){
        if(node.nodeType === 3 ){ // we have a text node
            if(node.length >= pos && notExcludedNode(node, excludedParentNodeClasses)){
                // finally add our range
                var range = document.createRange(),
                    sel = window.getSelection();
                range.setStart(node,pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return -1; // we are done
            } else {
                pos -= node.length;
            }
        }else{
            pos = setCaretPosition(node, pos);
            if (pos === -1) {
                return -1; // no need to finish the for loop
            }
        }
    }
    return pos; // needed because of recursion stuff
}
 

export const getSelectionRange = (element) => {
  var start = 0;
  var end = 0;
  var doc = element.ownerDocument || element.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel;
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      start = preCaretRange.toString().length;
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      end = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== "Control") {
    var textRange = sel.createRange();
    var preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToStart", textRange);
    start = preCaretTextRange.text.length;
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    end = preCaretTextRange.text.length;
  }
  return { start: start, end: end };
}

export const setSelectionRange = (element, start, end) => {
    let startPos = start;
    let endPos = end;
    var rng = document.createRange(),
    sel = getSelection(),
    n, o = 0,
    tw = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, null);
    while (n = tw.nextNode()) {
        o += n.nodeValue.length;
        if (o > start) {
            rng.setStart(n, n.nodeValue.length + startPos - o);
            start = Infinity;
        }
        if (o >= end) {
            rng.setEnd(n, n.nodeValue.length + endPos - o);
            break;
        }
    }
    sel.removeAllRanges();
    sel.addRange(rng);
}