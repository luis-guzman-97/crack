$(document).ready(function() {
    // Crear la tabla de 15x15 celdas
    
  });

  function randomTable(){
    for (var i = 0; i < 15; i++) {
        var row = $("<tr></tr>");
        for (var j = 0; j < 15; j++) {
          var cell = $("<td></td>").text(getRandomLetter());
          row.append(cell);
        }
        $("#sopa-letras").append(row);
      }
      
      // Colocar la palabra "YOUWIN" en la sopa de letras
      var horizontal = Math.random() < 0.5; // Decidir si la palabra va en posición horizontal o vertical
      var x, y;
      if (horizontal) {
        // Colocar la palabra en posición horizontal
        y = Math.floor(Math.random() * 15); // Seleccionar una fila aleatoria
        x = Math.floor(Math.random() * 10); // Seleccionar una columna aleatoria para que la palabra no se corte con el lateral derecho
        for (var i = 0; i < 6; i++) {
          $("#sopa-letras tr:eq(" + y + ") td:eq(" + (x + i) + ")").text("YOUWIN".charAt(i));
        }
      } else {
        // Colocar la palabra en posición vertical
        x = Math.floor(Math.random() * 15); // Seleccionar una columna aleatoria
        y = Math.floor(Math.random() * 10); // Seleccionar una fila aleatoria para que la palabra no se corte con el lateral inferior
        for (var i = 0; i < 6; i++) {
          $("#sopa-letras tr:eq(" + (y + i) + ") td:eq(" + x + ")").text("YOUWIN".charAt(i));
        }
      }
  }
  
  function getRandomLetter() {
    // Generar una letra aleatoria entre A y Z
    var charCode = 65 + Math.floor(Math.random() * 26);
    return String.fromCharCode(charCode);
  }
  