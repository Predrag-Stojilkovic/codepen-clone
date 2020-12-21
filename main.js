const code = document.querySelector(".code")
const preview = document.querySelector(".preview")
const codeEditors = Array.from(document.querySelectorAll(".editor"))
let codeHeight = code.offsetHeight
let previewHeight = preview.offsetHeight
const resizerHeight = 17
const codeResizerWidth = 18
code.style.maxHeight = `${codeHeight + previewHeight - resizerHeight}px`
let mouseStartingX
let mouseStartingY

window.addEventListener("mousedown", mouseDown)

function mouseDown(e) {
    mouseStartingX = e.x
    mouseStartingY = e.y

    if (isPreviewResizerArea(e.y)) {
        startResizingPreview(e)
    }
}

//=======================================================Code Editors========================================================
codeEditors.map(ce => ce.addEventListener("dblclick", e => stretchEditor(e, ce)))

function stretchEditor(e, codeEditor) {
    if (isCodeResizerArea(e.x, codeEditor)) {
        if (codeEditor.style.width !== "100%") {
            codeEditor.style.width = "100%"
            codeEditors.filter(ce => ce != codeEditor).map(fce => fce.style.width = "0")
        } else {
            codeEditors.map(ce => ce.style.width = "calc(100% / 3)")
        }        
    }
}

function isCodeResizerArea(mouseX, codeEditor) {
    const codeEditorRect = codeEditor.getBoundingClientRect()
    return (mouseX >= codeEditorRect.x && mouseX <= codeEditorRect.x + codeResizerWidth)
}

//==========================================================Preview==========================================================
function startResizingPreview() {
    window.addEventListener("mousemove", doResizingPreview)
    window.addEventListener("mouseup", stopResizingPreview)    
}

function doResizingPreview(e) {
    let moveDistance = mouseStartingY - e.y
    code.style.height = `${codeHeight - moveDistance}px`
    codeHeight = code.offsetHeight
    mouseStartingY = e.y
}

function stopResizingPreview() {
    window.removeEventListener("mousemove", doResizingPreview)
    window.removeEventListener("mouseup", stopResizingPreview)
}

function isPreviewResizerArea(mouseY) {
    return (mouseY >= preview.offsetTop && mouseY <= preview.offsetTop + resizerHeight)
}
