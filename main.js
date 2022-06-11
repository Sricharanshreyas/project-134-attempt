object=[];
status=false;
alarm=""
function preload(){
  alarm=loadSound("ringing_old_phone.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.position(400,100);
    video=createCapture(VIDEO);
    video.hide();
    cocoSSD=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status:Detecting objects";
}
function draw(){
    image(video,0,0,500,500);
    if(status==true){
    for(i=0;i<objects.length;i++){
        if(objects[i].label=="person"){
            cocoSSD.detect(video,gotresults);
            text(objects[i].label + " " + percent + "%",objects[i].x-25,objects[i].y-10);
            textSize(30);
            noFill();
            stroke("green");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("baby").innerHTML="Baby found";
            alarm.stop();
            
        }
        else{
            document.getElementById("baby").innerHTML="Baby not found";
            alarm.play();
        }
    }
}

}
function modelloaded(){
    console.log("cocossd is loaded");
    status=true;
 
  
}
function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
   
  

}