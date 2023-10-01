//variables
var conf_model = "";
var input_ = "";
objetos = [];
conf = "";
sound = "";
//funciones

//p5 funciones
function preload()
{
    sound = loadSound("bullshitter_alert.mp3");
}
function setup()
{
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 450);
video.hide();
obj_detect = ml5.objectDetector("cocossd", modelLoaded)
}



function draw()
{
    image(video, 0, 0, 450, 450);
    obj_detect.detect(video, gotResult);
    for (i=0; i < objetos.length; i++)
{
    stroke("blue");
   
    fill("blue");
    percent =Math.floor(objetos[i].confidence * 100);
    text(objetos[i].label +" porsentaje"+ percent + "% ",objetos[i].x ,objetos[i].y - 3);
    text("posisionX" + objetos[i].x + "posisionY"+ objetos[i].y ,objetos[i].x  ,objetos[i].y + 7);
  
  
  
    
    noFill();
    rect(objetos[i].x, objetos[i].y ,objetos[i].width, objetos[i].height);
    fill("blue");
}
}


//empesar la busqueda de objeto
function start()
{
    
    input_ = document.getElementById("inp").value;
    document.getElementById("obj").innerHTML = "objeto:" + input_ + " -> buscando";
    obj_detect.detect(video, gotResult);
}

function modelLoaded()
{
console.log("modelo cargado");
conf_model = true;
}

function gotResult(error,result)
{
    if (error)
    {
      console.error(error);
    }else{
        console.log(result);
        objetos = result;
      conf = sound.isPlaying();
      //estados
        for (i = 0; i < result.length; i++)
        {
            //Encontrado
            if ((input_ != "") && (result[i].label == input_))
            {
                document.getElementById("obj").innerHTML = "objeto:" + input_ + " -> encontrado";
                sound.isPlaying();
                
               
            if (conf == false)
            {
            sound.play();
            }

            }else if (input_ == "")//no objeto a reconoser
            {
                document.getElementById("obj").innerHTML = "objeto: " + input_ + " -> no establesido";
                if (conf == true)
                {
                sound.stop();
                }
            }else if (result[i].label != input_)//no objeto encotrado
            {
                document.getElementById("obj").innerHTML = "objeto: " + input_ + " -> no encontrado";
                if (conf == true)
                {
                sound.stop();
                }
            }
          
        }
        if (result.length < 1)//no resultados a analisar
        {
         document.getElementById("obj").innerHTML = "objeto: " + input_ + " -> no encontrado";
         if (conf == true)
         {
         sound.stop();
         }
        }
    }
}