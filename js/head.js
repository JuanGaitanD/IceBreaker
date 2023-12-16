/* Recarga de preguntas */
var preguntas = [];

window.onload = function() {
    db.collection('questions').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            doc.question = doc.data().question;
            doc.use = false;
            this.preguntas.push(
                {
                    "question": doc.question, 
                    "use": doc.use
                }
            );
        })
    });
}
// console.log(preguntas);

function agregar_preguntas(){
    var preguntas = document.querySelector('#preguntas');

    db.collection('questions').add({
        question: preguntas.value,
        use: false
    })
    .then(() => {
        console.log('pregunta agregada');
        preguntas.value = '';
    })
    .catch((error) =>{
        console.log('Error al agregar pregunta' + error);
    });
}

function sort(){
    var preguntas = [];

    /* Separamos las preguntas que no han salido */
    for(var i = 0; i < this.preguntas.length; i++){
        if(this.preguntas[i].use == false) {
            preguntas.push([this.preguntas[i].question, this.preguntas[i].use]);
        }
    }

    /* Evaluamos que aún existan preguntas disponibles */
    if(preguntas.length == 0){
        alert('Ya no hay preguntas disponibles');
        document.querySelector('#pregunta').innerHTML = "Se acabaron, recarga la página para más";

        return;
    } else {
        var pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
    
        for(var i = 0; i < this.preguntas.length; i++){
            if(this.preguntas[i].question == pregunta[0]){
                this.preguntas[i].use = true;
            }
        }
    
        document.querySelector('#pregunta').innerHTML = pregunta[0];
    }
}

function next(n){
    switch(n){
        case 1:
            document.querySelector('#home').style.display = 'none';
            document.querySelector('#pre').style.display = 'block';
            break;
        case 2:
            document.querySelector('#home').style.display = 'block';
            document.querySelector('#pre').style.display = 'none';
            break;
    }
}