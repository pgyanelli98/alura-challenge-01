const key = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
}

const reverseKey = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
}

String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

// Textareas
var txtIngresado = document.querySelector('#txtIngresado');
var txtResultado = document.querySelector('#txtResultado');
var textoEncontrado = document.querySelector('.texto-encriptado');

function encriptarTexto() {
    
    var validacion = validarTexto();

    if (validacion === -1) {
        atencion("Debes ingresar un texto a encriptar");
    } else if (validacion === 1) {
        atencion("Sólo se aceptan textos en minúsculas y sin acentos.");
    } else {
        let textoEncriptado = txtIngresado.value.replace(/[aeiou]/gi, match => key[match]);
        esconderNoEncontrado();
        txtResultado.value = textoEncriptado;
        mostrarTextoEncriptado();
    }
    
}

function obtenerKey(objeto, valor) {
    return Object.keys(objeto).find(key => objeto[key] === valor);
}

function desencriptarTexto() {
    var validacion = validarTexto();
    if (validacion === -1) {
        atencion("Debes ingresar un texto a encriptar");
    } else if (validacion === 1) {
        atencion("Sólo se aceptan textos en minúsculas y sin acentos.");
    } else {
        let textoEncriptado = txtIngresado.value.allReplace(reverseKey);
        esconderNoEncontrado();
        txtResultado.value = textoEncriptado;
        mostrarTextoEncriptado();
    }
}

function esconderNoEncontrado() {
    document.querySelector('.no-encontrado').style.display = "none";
}

function mostrarTextoEncriptado() {
    textoEncontrado.style.display = "initial";
}

// Función para verificar que el texto no contenga minúsculas ni acentos
function validarTexto () {
    var caracteresAceptados = /^[0-9a-z ]+$/; 

    if (txtIngresado.value === '') {
        return -1

    } else if (!txtIngresado.value.match(caracteresAceptados)) {
        return 1
    } else {
        return 0;
    }
}

var btnEncriptar = document.querySelector('#btnEncriptar');
btnEncriptar.addEventListener('click', (evt) => {
    encriptarTexto();
});

var btnCopiar = document.querySelector('#btnCopiar');
btnCopiar.addEventListener('click', () => {
    txtResultado.select();
    txtResultado.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(txtResultado.value);
    info("Texto copiado al portapapeles");
});

var btnDesencriptar = document.querySelector('#btnDesencriptar');
btnDesencriptar.addEventListener('click', () => {
    desencriptarTexto();
});