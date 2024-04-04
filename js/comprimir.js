const img_comp = document.getElementById('f_subir')
var	calidad = document.getElementById('calidad')//Elemento HTML

//Aquí se comprime la imagen. Se recibe el archivo y la calidad
const comprimirImagen = (imagenComoArchivo, porcentajeCalidad) => {
	return new Promise((resolve, reject) => {
		//Crear un elemento canvas
		const canvas = document.createElement("canvas");
		const nva_imagen = new Image(); //Crear elemento imagen

		nva_imagen.onload = () => {//Evento Onlad
			//La imagen es cargada en el canvas
			canvas.width = nva_imagen.width;
			canvas.height = nva_imagen.height;
			canvas.getContext("2d").drawImage(nva_imagen, 0, 0);
			//elemento-HTML.toBlob(), recibe el elemento tipo canvas y la calidad para devolver el archivo tipo blob con la compresión aplicada. Sintaxis: elemento.toBlob(callback, type, quality)
			canvas.toBlob(
				(blob) => {
					blob === null ? reject(blob) : resolve(blob);
				}, "image/jpeg",
				porcentajeCalidad / 100
			);
		}

		//La fuente src de la nueva imagen representa la URL (objeto file) ligada al documento DOM de la ventana actual
		nva_imagen.src = URL.createObjectURL(imagenComoArchivo);
	});
}

//Se lee el evento clic del botón comprimir
document.getElementById('btn_comprimir').addEventListener("click",
async () => {
	//Verificar que el elemento file contenga la imagen
	if (img_comp.files.length <= 0) {//No hay imagen, notificar error mediante un cuadro tipo alert
		alert("Debe cargar un archivo.");
		return//Terminar la función actual
	}

	//Llamas la función y esperar a que termine
	const blob = await comprimirImagen(img_comp.files[0], parseInt(calidad.value));//parseInt, convertir valor string a Int

	//Mostrar imagen con compresión aplicada
	let vista_previa = document.getElementById('vista_previa_02')
	//Crear nuevo elemento en el DOM de tipo imagen
	let img_vp = document.createElement('img')
	img_vp.classList = "img-thumbnail"; //Colocar una clase
	img_vp.src = URL.createObjectURL(blob)
	vista_previa.innerHTML = '';
	vista_previa.append(img_vp); //Agregar la imagen a la vista previa
	document.getElementById('div_comp02').classList.remove("d-none");
	document.getElementById('div_comp02').classList.add("d-block");

	mostrar_descargar(URL.createObjectURL(blob));
});

	function mostrar_descargar(url) {
		const icono_desc = document.getElementById("btn_descargar");
		icono_desc.href = url;
		icono_desc.download = "Imagen_comprimida.jpg";
		document.getElementById('div_desc').classList.remove("d-none");
		document.getElementById('div_desc').classList.add("d-block");
	}

function abrir_exp_foto() {//Al dar clic sobre la imagen se abre el navegador de archivos del explorador web
	document.getElementById('f_subir').click();
}

function mostrar_valor_calidad() {
	document.getElementById('valor_calidad').innerHTML = "CALIDAD " + calidad.value + " Deslice para cambiar.";
}

function obtener_vista_previa(){
	//Genera la vista previa de la imagen seleccionada
//Se ejecuta cuando el elemento input file cambia
	let reader = new FileReader();
  reader.readAsDataURL(img_comp.files[0]);
  reader.onload = function(){
    let vista_previa = document.getElementById('vista_previa')
		//Se crea el elemento en el DOM de tipo imagen
		let img_vp = document.createElement('img')
		img_vp.classList = "img-thumbnail" //Se le proporciona una clase
    img_vp.src = reader.result;
    vista_previa.innerHTML = '';
		//Se agrega elemento al DOM dentro de div vista_previa
    vista_previa.append(img_vp)
		document.getElementById('div_comp').classList.remove("d-none");
		document.getElementById('div_comp').classList.add("d-block");
  }
}
