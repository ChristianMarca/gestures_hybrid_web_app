var app={
    inicio: function(){
        this.iniciaBotones();
        this.iniciaFasClick();
        this.iniciaHammer();
    },
    iniciaFasClick: function(){
        FastClick.attach(document.body);
    },
    iniciaBotones: function(){
        var botonClaro= document.querySelector('#claro');
        var botonOscuro=document.querySelector('#oscuro');

        botonClaro.addEventListener('click',this.ponloClaro,false);
        botonOscuro.addEventListener('click',this.ponloOscuro,false);
    },
    iniciaHammer: function(){
        var zona= document.getElementById('zona-gestos');
        var hammertime= new Hammer(zona);

        hammertime.get('pinch').set({enable:true});
        hammertime.get('rotate').set({enable: true});

        // hammertime.on('tap doubletap pan swipe press pinch rotate', function(event){
        // hammertime.on('tap doubletap swipe press rotate', function(event){
        //     // document.querySelector('#info').innerHTML=event.type+"!"
        // })
        //Detectar final de animacion
        zona.addEventListener('webkitAnimationEnd',function(event){
            zona.className='';
        });
        zona.addEventListener('animationend',function(event){
            zona.className='';
        })

        hammertime.on('doubletap',function(event){
            zona.className='doubletap';
        });
        hammertime.on('press',function(event){
            zona.className='press';
        });
        hammertime.on('swipe',function(event){
            var clase=undefined;
            var direccion=event.direction;
            if(direccion==4) clase='swipe-derecha';
            if(direccion==2) clase='swipe-izquierda';

            zona.className=clase;
        })
        hammertime.on('rotate',function(event){
            var umbral=25;
            if(event.distance>umbral) zona.className='rotate';
        });
    },

    ponloClaro: function(){
        document.body.className='claro';
    },
    ponloOscuro: function(){
        document.body.className='oscuro'
    }
};
if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        app.inicio();
    },false)
}