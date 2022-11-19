  const fs = require('fs')
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  let attributes = {};
  let options = {};
  let cropper;

  /***********************************************************************
   * evento "onchange" de los inputs en una sola funcion sin jquery      *
   ***********************************************************************/
  document.querySelector('#images-to-crop').onchange = function (event) {
      console.log("evento ativado: "+event.target.name);
      addImage(event);
      getFileAttrs(event);
  }

  /***********************************************************************
   * capturar el evento "onchange" de los inputs por separado con jquery *
   ***********************************************************************/

  // $('#file-account-cover').on( 'change', function(e){
  //   addImage(e);
  //   getFileAttrs(e);
  // });
  // $('#file-logo').on( 'change', function(e){
  //   addImage(e);
  //   getFileAttrs(e);
  // });
  // $('#file-profile-cover').on( 'change', function(e){
  //   addImage(e);
  //   getFileAttrs(e);
  // });
  // $('#file-profile-picture').on( 'change', function(e){
  //   addImage(e);
  //   getFileAttrs(e);
  // });

  /***********************************************************************
   *        atributos del input que activo el evento "onchange"          *
   ***********************************************************************/
  function getFileAttrs(e){
    attributes = {
        id: e.target.id,                             //id del input file
        img: e.target.labels[0].children[1].id,      //id de la <img> donde se mostrara la imagen recortada
        name: e.target.name,                         //name del input file
        arW: parseInt(e.target.getAttribute('w')),   //aspect ratio width             
        arH: parseInt(e.target.getAttribute('h'))    //aspect ratio height            
    }
    setOptions(attributes);
  }

  /***********************************************************************
   *            opciones necesarias para crear el cropper                *
   *            https://github.com/fengyuanchen/cropperjs                *
   ***********************************************************************/
  function setOptions(attrs){
    options = {
        aspectRatio: attrs.arW/attrs.arH,
        viewMode: 2,
        minCropBoxWidth: 225,
        minCropBoxHeight: 300,
        dragMode: 'move',
        data: {//tamaño inicial del recuadro azul del cropper
                width: 225,
                height: 300
              },
        preview: '.img-preview'
    }
  }

  /***********************************************************************
   *      obtener la imagen del input y convertirla en base64            *
   ***********************************************************************/
  function addImage(e) {
    var file = e.target.files[0],
      imageType = /image.*/;

    if (!file.type.match(imageType))
      return;

    var reader = new FileReader();
    reader.onload = fileOnload;
    reader.readAsDataURL(file);//base64
  }

  function fileOnload(e) {
    var result = e.target.result;
    $('#imageToCrop').attr("src", result);//imagen sobre la cual se crea el cropper
    $('#imageToCropModal').modal('show'); //se activa la modal
    $(`#${attributes.id}`).val(null);     //se vacia el input
  }

  /***********************************************************************
   * acciones al abrir y cerrar la modal y activacion de los tooltips    *
   ***********************************************************************/
  $('#imageToCropModal').on('shown.bs.modal', function () {
    if (cropper) {
      cropper.destroy();
    }

    cropper = new Cropper(image, options);

  }).on('hidden.bs.modal', function () {

    cropper.destroy();
    cropper = null;

  });

  $('[data-toggle="tooltip"]').tooltip();

  /***********************************************************************
   *     funciones del menu inferior del cropper en la modal             *
   ***********************************************************************/
  document.querySelector('#actions').onclick = function(event){
  var target = event.target || event.srcElement;

  //necesario para el funcionamiento correcto de los botones del menu
  while (target !== this) {
    if (target.getAttribute('data-method')) {
      break;
    }
    target = target.parentNode;
  }

  if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
    return;
  }

  //objeto de atributos del input que activo el evento "onclick"
  data = {
    method: target.getAttribute('data-method'),
    title: target.getAttribute('title'),
    option: target.getAttribute('data-option') || undefined,
    secondOption: target.getAttribute('data-second-option') || undefined
  };
  //se evalua el atributo "data-method" del input para seleccionar la accion correspondiente
  switch (data.method) {
    case 'setDragMode':

      if(data.option === 'move')
        cropper.setDragMode('move');
      if(data.option === 'crop') 
        cropper.setDragMode('crop');

      break;
    case 'zoom':

      if(data.title === 'Zoom In')
        cropper.zoom(0.1);
      if(data.title === 'Zoom Out') 
        cropper.zoom(-0.1);

      break;
    case 'rotate':

      if(data.title === 'Rotate Left')
        cropper.rotate(-45);
      if(data.title === 'Rotate Right') 
        cropper.rotate(45);

      break;
    case 'scaleX':

      let valX = -parseInt(data.option);
      cropper.scaleX(-valX);
      target.setAttribute('data-option', valX);

      break;
    case 'scaleY':

        let valY = -parseInt(data.option);
        cropper.scaleY(-valY);
        target.setAttribute('data-option', valY);

      break;
    case 'reset':

        cropper.reset();

      break;
    case 'crop':
          //obtener la imagen recocrtada                                                   
          var croppedImage = cropper.getCroppedCanvas({// tamaño del imagen de salida
                                                        width:225,
                                                        height:300
                                                      }).toDataURL("image/png"); //se convierte la imagen obtenida en formato base64

          //boton para descargar la imagen recortada como png
          $(`#descargar`).prop('href', croppedImage); 

          //inicio guardar archivo png
          let base64Image = croppedImage.split(';base64,').pop();
          fs.writeFile('src/img/image.png', base64Image, {encoding: 'base64'}, function(err) {
            console.log('File created');
          });
          //fin guardar archivo png

          $(`#${attributes.img}`).prop('src', croppedImage);
          $('#imageToCropModal').modal('hide');

      break;
    case 'cancel':

      $('#imageToCropModal').modal('hide');

      break;
    case 'move':

      if(data.title === 'Move Left')
        cropper.move(-10, 0);
      if(data.title === 'Move Right') 
        cropper.move(10, 0);
      if(data.title === 'Move Up')
        cropper.move(0, -10);
      if(data.title === 'Move Down') 
        cropper.move(0, 10);

      break;
  
    default:
      break;
  }
}

/***********************************************************************
*  funcion que permite reemplazar la imagen que tenemos en el cropper  *
***********************************************************************/
$('#replace').on( 'change', function(e){
   
  var file = e.target.files[0],             //se obtiene la imagen del input
    imageType = /image.*/;
  if (!file.type.match(imageType))          //se comprueba si es un archivo de imagen
    return;

  var reader = new FileReader();
  reader.onload = fileOnload;
  reader.readAsDataURL(file);               //base64

  function fileOnload(e) {                  //al cargar la imagen en el input
    var result = e.target.result;           //imagen en formato base64
    $('#imageToCrop').attr("src", result);  //imagen sobre la cual se crea el cropper

    if (cropper) {                          //se verifica si existe algun cropper
      cropper.destroy();                    //se elimina el cropper activo
    }
    
    cropper = new Cropper(image, options);  //se crea un nuevo cropper con la imagen nueva
    this.value = null;                      //se vacia el input
  }

});