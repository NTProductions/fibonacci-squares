var num = 10;
var aeValues = [];
var fibValues = [];
var colours = [];
var directions = ["Right", "Up", "Left", "Down"];
var totalHeight = 0;
var totalWidth = 0;
var directionCounter = 0;
var solidLayers = [];
var comp;

app.beginUndoGroup("Fib");

for(var i = 1; i <= num; i++) {
    if(i == 1) {
    aeValues.push(fib(i)*10);
    fibValues.push(fib(i));
    } else {
    aeValues.push(fib(i)*10);
    fibValues.push(fib(i));
    if(directions[directionCounter] == "Right" || directions[directionCounter] == "Left") {
        totalWidth+=aeValues[i-1];
        }
    if(directions[directionCounter] == "Up" || directions[directionCounter] == "Down") {
        totalHeight+=aeValues[i-1];
        }
    directionCounter++;
    if(directionCounter > 3) {
            directionCounter = 0;
        }
        }
    }
colours = getFibColours(fibValues)
comp = app.project.items.addComp("Fib Comp_"+totalWidth, totalWidth*2, totalHeight*2, 1, 10, 30);
directionCounter = 0;
for(var e = 0; e < aeValues.length; e++) {
    solidLayers.push(comp.layers.addSolid(generateRandomRGB(false), aeValues[e], aeValues[e],aeValues[e], 1, 10));
    if(e > 0) {
        switch(directions[directionCounter]) {
                case "Right":
                if(e > 1) {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value+[aeValues[e-1]+aeValues[e-2]*.5, -aeValues[e-2]*.5, 0]);
                    } else {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value+[aeValues[e-1], 0, 0]);    
                        }
                break;
                case "Left":
                if(e > 1) {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value-[aeValues[e-1]+aeValues[e-2]*.5, -aeValues[e-2]*.5, 0]);
                    } else {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value-[aeValues[e-1]+aeValues[0]*.5, -aeValues[0]*.5, 0]);     
                        }
                break;
                case "Up":
                if(e > 1) {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value-[aeValues[e-2]*.5, aeValues[e-1]+aeValues[e-2]*.5, 0]);
                    } else {
                     solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value-[aeValues[0]*.5, aeValues[e-1]+aeValues[0]*.5, 0]);   
                        }
                break;
                case "Down":
                if(e > 1) {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value+[aeValues[e-2]*.5, aeValues[e-1]+aeValues[e-2]*.5, 0]);
                    } else {
                    solidLayers[e].property("ADBE Transform Group").property("ADBE Position").setValue(solidLayers[e-1].property("ADBE Transform Group").property("ADBE Position").value+[aeValues[0], aeValues[e-1]+aeValues[0], 0]);    
                        }
                break;
            }
        directionCounter++;
        if(directionCounter > 3) {
        directionCounter = 0;
            }
        }
    }

comp.openInViewer();

app.endUndoGroup();

function fib(n) {
    if(n<=1) return n;
        return fib(n-1) + fib(n-2);
    }

function getFibColours(values) {
        var multiplier = 1.0 / values[values.length-1];
        var colourArray = [];
        for(var i = 0; i < values.length; i++) {
            colourArray.push([values[i]*multiplier, values[i]*multiplier, values[i]*multiplier]);
            }
        return colourArray;
    }

function generateRandomRGB(normal) {
        if(normal) {
            return [Math.floor((Math.random() * 255) + 0), Math.floor((Math.random() * 255) + 0), Math.floor((Math.random() * 255) + 0)];
            } else {
            return [(Math.random() * 1) + 0, (Math.random() * 1) + 0, (Math.random() * 1) + 0]; 
                }
    }