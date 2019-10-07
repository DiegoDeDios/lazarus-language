let editor;
let terminal;

let bExecute = document.getElementById("ejecutar");
let bClear = document.getElementById("limpiar");
let bSave = document.getElementById("guardar");
let bLoad = document.getElementById("cargar");

editor = new Editor(document.getElementById("editor"));
terminal = new Terminal(document.getElementById("terminal"));

bExecute.addEventListener('click', function () {
    terminal.print(editor.getText());
    canvas.addFigure(Canvas.SQUARE);
    canvas.addFigure(Canvas.CIRCLE);
    canvas.addFigure(Canvas.TRIANGLE);
    
});

bClear.addEventListener('click', function () {
    editor.clear();
    terminal.clear();
    canvas.clear();
});

bSave.addEventListener('click', function () {
    
});

bLoad.addEventListener('click', function () {
    
});