$(document).ready(function () {
  // Detectar cuando se envía el formulario
  $("#palabra-form").submit(function (e) {
    e.preventDefault(); // Detener la acción por defecto
    // Obtener la palabra del campo de entrada de texto
    var palabra = $("#palabra").val().toUpperCase(); // Convertir la palabra a mayúsculas
    // Crear la tabla de 20x20 celdas
    var tabla = '<table class="table table-bordered">';
    for (var i = 0; i < 15; i++) {
      tabla += "<tr>";
      for (var j = 0; j < 15; j++) {
        // Generar una letra aleatoria en mayúscula y agregarla a la celda
        var letra = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        tabla += "<td>" + letra + "</td>";
      }
      tabla += "</tr>";
    }
    tabla += "</table>";
    // Mostrar la tabla en el contenedor
    $("#tabla-container").html(tabla);

    // Buscar los posibles lugares donde puede caber la palabra
    var filas = $("#tabla-container tr");
    var posibles = [];
    for (var i = 0; i < filas.length; i++) {
      var celdas = $(filas[i]).find("td");
      for (var j = 0; j < celdas.length; j++) {
        // Horizontal
        if (j <= 15 - palabra.length) {
          var horizontal = "";
          for (var k = j; k < j + palabra.length; k++) {
            horizontal += $(celdas[k]).text();
          }
          posibles.push([i, j, horizontal]);
        }
        // Vertical
        if (i <= 15 - palabra.length) {
          var vertical = "";
          for (var k = i; k < i + palabra.length; k++) {
            var celda = $(filas[k]).find("td")[j];
            vertical += $(celda).text();
          }
          posibles.push([i, j, vertical]);
        }
      }
    }

    // Insertar la palabra en un lugar posible al azar
    if (posibles.length > 0) {
      var aleatorio = Math.floor(Math.random() * posibles.length);
      var fila = posibles[aleatorio][0];
      var columna = posibles[aleatorio][1];
      var direccion =
        posibles[aleatorio][2].indexOf(palabra) !== -1
          ? "horizontal"
          : "vertical";

      if (direccion === "horizontal") {
        console.log("direccion", direccion);
        for (var i = columna; i < columna + palabra.length; i++) {
          $(filas[fila]).find("td")[i].textContent = palabra[i - columna];
        }
      } else {
        console.log("direccion", direccion);
        for (var i = fila; i < fila + palabra.length; i++) {
          $(filas[i]).find("td")[columna].textContent =
            "x" + palabra[i - fila] + "x";
        }
      }
    }
  });
});

var seleccionadas = [];
var clickadas = [];
var tiempox = null;

function randomTable() {
  seleccionadas = [];
  clickadas = [];
  detenerTiempo();

  $("#sopa-letras").empty();
  for (var i = 0; i < 20; i++) {
    var row = $("<tr></tr>");
    for (var j = 0; j < 20; j++) {
      var button = $(
        "<button  class='btn btn-default btn-sm opt'></button>"
      ).text(getRandomLetter());
      var cell = $("<td></td>").append(button);
      row.append(cell);
    }
    $("#sopa-letras").append(row);
  }

  // Colocar la palabra "YOUWIN" en la sopa de letras
  var horizontal = Math.random() < 0.5; // Decidir si la palabra va en posición horizontal o vertical
  var x, y;
  if (horizontal) {
    // Colocar la palabra en posición horizontal
    y = Math.floor(Math.random() * 20); // Seleccionar una fila aleatoria
    x = Math.floor(Math.random() * 15); // Seleccionar una columna aleatoria para que la palabra no se corte con el lateral derecho
    for (var i = 0; i < 5; i++) {
      var button = $(
        "<button class='btn btn-default  btn-sm opt' ></button>"
      ).text("CRACK".charAt(i));
      var cell = $("#sopa-letras tr:eq(" + y + ") td:eq(" + (x + i) + ")");
      seleccionadas.push(
        "#sopa-letras tr:eq(" + y + ") td:eq(" + (x + i) + ")"
      );

      cell.empty();
      cell.append(button);
    }
    console.log(seleccionadas);
  } else {
    // Colocar la palabra en posición vertical
    x = Math.floor(Math.random() * 20); // Seleccionar una columna aleatoria
    y = Math.floor(Math.random() * 15); // Seleccionar una fila aleatoria para que la palabra no se corte con el lateral inferior
    for (var i = 0; i < 5; i++) {
      var button = $(
        "<button class='btn btn-default   btn-sm opt'></button>"
      ).text("CRACK".charAt(i));
      var cell = $("#sopa-letras tr:eq(" + (y + i) + ") td:eq(" + x + ")");
      seleccionadas.push(
        "#sopa-letras tr:eq(" + (y + i) + ") td:eq(" + x + ")"
      );
      cell.empty();
      cell.append(button);
    }
    console.log(seleccionadas);
  }

  $(".opt").removeAttr("disabled");

  $(".opt").click(function () {
    var row = $(this).closest("tr").index();
    var col = $(this).closest("td").index();
    var comparar = "#sopa-letras tr:eq(" + row + ") td:eq(" + col + ")";

    if (seleccionadas.includes(comparar)) {
      console.log("Fila: " + row + ", Columna: " + col);
      if (!clickadas.includes(comparar)) {
        clickadas.push(comparar);
        $(this).removeClass("opt");
        $(this).removeClass("btn-success");
        $(this).removeClass("btn-default");
        $(this).addClass("btn-primary");
      }
    } else {
      $(this).removeClass("btn-success");
      $(this).removeClass("btn-default");
      $(this).addClass("btn-danger");
      $(".opt").prop("disabled", true);

      for (let d of seleccionadas) {
        $(d + " button").removeClass("btn-success");
        $(d + " button").addClass("btn-primary");
        $(d + " button").removeAttr("disabled");
      }

      detenerTiempo();
    }

    clickadas.sort();
    seleccionadas.sort();

    // Verificar si los arrays ordenados son iguales
    var areEqual = JSON.stringify(clickadas) === JSON.stringify(seleccionadas);

    console.log("clickadas", clickadas);

    if (areEqual) {
      detenerTiempo();
      alert("Eres un carak");
      $(".opt").prop("disabled", true);
    } else {
      console.log("Los arrays no tienen los mismos valores");
    }
  });

  tiempo();
}

function tiempo() {
  var seconds = 0;
  tiempox = setInterval(function () {
    seconds++;
    $("#timer").html(seconds + " segundos");
  }, 1000);
}

function detenerTiempo() {
  clearInterval(tiempox);
}

function getRandomLetter() {
  // Generar una letra aleatoria entre A y Z
  var charCode = 65 + Math.floor(Math.random() * 26);
  return String.fromCharCode(charCode);
}
